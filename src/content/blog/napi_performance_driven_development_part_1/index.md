---
postTitle: 'Performance Driven Development of Cross Runtime Node-API Native Addons (Part 1)'
focusKeyphrase: 'cross runtime node native addon performance research'
seoMetaDescription: 'A performance/benchmarking driven approach to writing Node Native Addons when targetting multiple Javascript runtimes.'
featuredImage: 'napi_performance.jpg'
datePublished: '2023-01-11T01:33:39+0000'
featuredImageAlt: 'Depiction of the bidirectional flow of data from Javascript to C++ and vice versa.'
ogImage: 'napi_performance_open_graph.jpg'
ogSquareImage: 'napi_performance_open_graph_square.jpg'
twitterImage: 'napi_performance_twitter.jpg'
categories: ''
tags: ''
---

<script>
  import ExternalLink from '$lib/ux/blog/ExternalLink.svelte';
</script>

With the relatively recent release of the <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun</ExternalLink> Javascript runtime, I'd been inspired to start working on a new Javascript Machine Learning library targeting Bun (read: a viable alternative to Tensorflow.js). Taking a page out of Jarred Sumner's book, I naïvely decided to write the library from scratch in Zig and started hacking away. Now this wasn't an inherently a bad idea, but as a self taught developer, I had definitely bitten off a bit more than I could chew.

Fortunately, I discovered <ExternalLink ariaLabel="Learn more about shumai, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript)." href="https://github.com/facebookresearch/shumai">shumai</ExternalLink>, a fast, network-connected, differentiable tensor library for TypeScript/Javascript, which was in its infancy at the time, and was able to connect with <ExternalLink ariaLabel="@bwasti Github profile." href="https://github.com/bwasti">@bwasti</ExternalLink> and <ExternalLink ariaLabel="@jacobkahn Github profile." href="https://github.com/jacobkahn">@jacobkahn</ExternalLink> to help contribute to the project.

Fast forward a few months and shumai is more fully featured/production-ready (at least, to the same extent that <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun</ExternalLink> is production ready), but currently only supports Bun as the present implementation relies on Bun's Foreign Function Interface (FFI) to call into shumai's native bindings.

Check out the current implementation of shumai <ExternalLink ariaLabel="Check out the shumai codebase." href="https://github.com/facebookresearch/shumai">here</ExternalLink>.

Given our longer term goal of adding support for all popular Javascript runtimes (namely, Node.js and Deno) to shumai, we set our sights on implementing shumai bindings via Node-API, which is supported by Node.js, Bun, and Deno. This is the first in a series of posts on our journey to implement shumai bindings via Node-API; we'll detail our approach to performance driven development of cross runtime Node-API native addons and attempt to provide some, generally speaking, "best practices" for optimizing the execution time and memory usage Node-API native addons.

## Identifying Areas to Optimize

While Bun's FFI API is incredibly low overhead, we'll still want to profile the code to look for low-hanging fruits in terms of areas where we can optimize the logic. This will give us a good idea of where we can best leverage Node-API to improve performance.

Using Bun's `startSamplingProfiler` (exported by `bun:jsc`), it's incredibly simple to profile a simple loop to look for any performance issues:

```js
// bun run toArrayBuffer/index.ts
import * as sm from '@shumai/shumai';
import { startSamplingProfiler } from 'bun:jsc';

startSamplingProfiler('toArrayBuffer');
const array1 = new Float32Array(128);
const array2 = new Float32Array(128);
for (let i = 0; i < 128; ++i) {
	array1[i] = Math.random();
	array2[i] = Math.random();
}
const a = new sm.Tensor(array1);
const b = new sm.Tensor(array2);

let res: Float32Array;
for (let i = 0; i < 100000; ++i) {
	const c = a.add(b);
	res = c.toFloat32Array();
}
```

The output indicates that the most expensive calls are:

- `_float32Buffer`, which returns the underlying buffer backing the Tensor.
- `toArrayBuffer`, which is called internally by `toFloat32Array`, and used to convert a pointer to an ArrayBuffer:

```
Sampling rate: 1000.000000 microseconds. Total samples: 912
Top functions as <numSamples  'functionName#hash:sourceID'>
   729    '_float32Buffer#<nil>:4294967295'
    43    'toArrayBuffer#<nil>:4294967295'
    39    '_add#<nil>:4294967295'
    39    'wrapFLTensor#<nil>:5'
    // ...
```

Notably, calls to the `toArrayBuffer` method exported by Bun's `bun:ffi` module seems potentially avoidable if we were to leverage Node-API (NAPI). This is consistent with conversations with Jarred Sumner on Bun's Discord with regards to optimizing performance of Bun's FFI/NAPI implementations; <ExternalLink ariaLabel="read the discord convo RE FFI/NAPI performance" href="https://ptb.discord.com/channels/876711213126520882/1004133980272078938/1055064340501364756">per Jarred</ExternalLink>, "`toArrayBuffer()` is a cycle through JS & native... You should use NAPI for that."

Given the above, we'll likely find the largest performance gains will be realized if we can leverage Node-API when initializing a new Tensor from an existing Javascript TypedArray and when returning a Tensor's underlying buffer as a Javascript TypedArray (both rely on calls to `toArrayBuffer` in the current implementation).

## "Wrapping" Native Objects for Javascript

N.B. Given that shumai's backend is built with <ExternalLink ariaLabel="Learn more about Flashlight, a fast, flexible machine learning library written entirely in C++ from the Facebook AI Research and the creators of Torch, TensorFlow, Eigen and Deep Speech." href="https://github.com/flashlight/flashlight">Flashlight</ExternalLink>, which is written in C++, we'll be leveraging the <ExternalLink ariaLabel="Check out the node-addon-api docs." href="https://github.com/nodejs/node-addon-api">node-addon-api</ExternalLink> module to write our Node-API native addons. Additionally, given that building shumai's FFI bindings is done via CMake, we'll be employing <ExternalLink ariaLabel="Check out the Cmake.js repository." href="https://github.com/cmake-js/cmake-js">Cmake.js</ExternalLink> to build the Node-API native addons.

## TODO: Happy with the article through here (mostly); needs editing below

If you're anything like me, you'll briefly research how to wrap a Native Object using NAPI and quickly assume that best practices would dictate the usage of `Napi::ObjectWrap` to expose a native object that contains a field that will hold the reference to the native object we're attempting to expose to Javascript; something along these lines:

```cpp
class Tensor : public Napi::ObjectWrap<Tensor> {
 public:
  Tensor(const Napi::CallbackInfo&);
  static Napi::FunctionReference* constructor;
  // stores pointer to the native `fl::Tensor` being wrapped
  fl::Tensor* _tensor;
  // class methods, `Finalize`, etc. omitted for brevity...
};
```

While this design works, it's overkill for our use case given we ultimately only need to expose a pointer to the native `fl::Tensor` to Javascript and will not be making use of any of the features unique to `Napi::ObjectWrap`; rather, we can simplify the logic by simply returning `Napi::External<fl::Tensor>`directly:

```cpp
  auto* tensor = new fl::Tensor(t);
  Napi::External<fl::Tensor> wrapped = Napi::External<fl::Tensor>::New(env, tensor, DeleteTensor);
  return wrapped;
```

## TODO: ADD BENCHMARKING/GRAPHS/CHARTS

## Future Areas to Explore

At least in Bun runtime, it's feasible to use a hybrid approach where Node-API and Bun's FFI can be used in tandem to optimize performance. For example, we could use Bun's FFI to initialize a new Tensor and return the underlying data backing the array as a Javascript TypedArray, while leveraging Bun FFI for Tensor operations. Such an approach allows us to escape the bottlenecks of `toArrayBuffer` while simulataneously getting the performance benefits provided by Bun FFI "doing as much as possible inline directly." (<ExternalLink ariaLabel="Jarred Sumner discussion of FFI performance in Discord" href="https://ptb.discord.com/channels/876711213126520882/1004133980272078938/1055064571955650630">source: Jarred Sumner</ExternalLink>)

### Shoutouts

<p><ExternalLink ariaLabel="@Jarred-Sumner Github profile." href="https://github.com/Jarred-Sumner">@Jarred-Sumner</ExternalLink> - Bun has been a joy to work with; thanks for being accessible in <ExternalLink ariaLabel="Join Bun's Discord server." href="https://bun.sh/discord">Bun's Discord</ExternalLink> to field questions, help point us in the right direction, quick bug fixes (<ExternalLink ariaLabel="oven-sh/bun Issue #1733 - closed with fix." href="https://github.com/oven-sh/bun/issues/1733">#1733</ExternalLink>, <ExternalLink ariaLabel="oven-sh/bun Issue #1739 - closed with fix." href="https://github.com/oven-sh/bun/issues/1739">#1739</ExternalLink>), quick to add features, and for being generally awesome!</p>

<p><ExternalLink ariaLabel="@bwasti Github profile." href="https://github.com/bwasti">@bwasti</ExternalLink> & <ExternalLink ariaLabel="@jacobkahn Github profile." href="https://github.com/jacobkahn">@jacobkahn</ExternalLink> - Thanks a ton for helping me get up to speed working on shumai and for greatly accelerating my C++ learning curve by pushing me to work on logic a bit more outside of my comfort zone.</p>
