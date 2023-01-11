---
postTitle: 'Performance Driven Development of Cross Runtime Node-API Native Addons (Part 1)'
focusKeyphrase: 'cross runtime node native addon performance research'
seoMetaDescription: 'A performance/benchmarking driven approach to writing Node Native Addons when targetting multiple Javascript runtimes.'
featuredImage: 'napi_performance.jpeg'
featuredImageAlt: 'Depiction of the bidirectional flow of data from Javascript to C++ and vice versa.'
ogImage: 'napi_performance.jpeg'
ogSquareImage: 'napi_performance.jpeg'
twitterImage: 'napi_performance.jpeg'
categories: ''
tags: ''
---

<script>
  import ExternalLink from '$lib/ux/blog/ExternalLink.svelte';
</script>

## Background

With the relatively recent release of the <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun Javascript runtime</ExternalLink>, I'd been inspired to start working on a new Javascript Machine Learning library targeting Bun (read: a viable alternative to Tensorflow.js). Taking a page out of Jarred Sumner's book, I naïvely decided to write the library from scratch in Zig and started hacking away. Now this wasn't an inherently a bad idea, but as a self taught developer, I had definitely bitten off a bit more than I could chew.

Fortunately, I learned about <ExternalLink ariaLabel="Learn more about shumai, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript)." href="https://github.com/facebookresearch/shumai">shumai</ExternalLink>, a fast, network-connected, differentiable tensor library for TypeScript/Javascript, which was in its infancy at the time, and was able to connect with @bwasti and @jacobkahn to help contribute to the project.

Fast forward a few months and shumai is more fully featured/production-ready (at least, to the same extent that <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun</ExternalLink> is production ready), but currently only supports Bun as the present implementation relies on Bun's Foreign Function Interface (FFI) to call into shumai's native bindings. While Bun's FFI API is incredibly low overhead, our use case had a few pain points when it came to performance. Notably, calls to the `toArrayBuffer` and `ptr` methods exported by Bun's `bun:ffi` module seemed to be the most obvious culprits. This is consistent with my conversations with Jarred Sumner on Bun's Discord with regards to optimizing performance of Bun's FFI/NAPI implementations; <ExternalLink ariaLabel="read the discord convo RE FFI/NAPI performance" href="https://ptb.discord.com/channels/876711213126520882/1004133980272078938/1055064340501364756">per Jarred</ExternalLink>, "`toArrayBuffer()` is a cycle through JS & native... You should use NAPI for that."

Given the above and our longer term goal of adding support for other Javascript runtimes (namely, Node.js and Deno) to shumai, we set our sights on implementing shumai bindings via Node-API, which is supported by Node.js, Bun, and Deno. This is the first in a series of posts on our journey to implement shumai bindings via Node-API; we'll detail our approach to performance driven development of cross runtime Node-API native addons and attempt to provide some, generally speaking, "best practices" for optimizing the execution time and memory usage Node-API native addons.

## "Wrapping" Native Objects for Javascript

N.B. Given that shumai's backend is built with <ExternalLink ariaLabel="Learn more about Flashlight, a fast, flexible machine learning library written entirely in C++ from the Facebook AI Research and the creators of Torch, TensorFlow, Eigen and Deep Speech." href="https://github.com/flashlight/flashlight">Flashlight</ExternalLink>, which is written in C++, we'll be leveraging the <ExternalLink ariaLabel="Check out the node-addon-api docs." href="https://github.com/nodejs/node-addon-api">`node-addon-api`</ExternalLink> module to write our Node-API native addons. Additionally, given that building shumai's FFI bindings is done via CMake, we'll be employing <ExternalLink ariaLabel="Check out the Cmake.js repository." href="https://github.com/cmake-js/cmake-js">Cmake.js</ExternalLink> to build the Node-API native addons.

If you're anything like me, you'll briefly research how to wrap a Native Object using NAPI and quickly assume that best practices would dictate the usage of `ObjectWrap` to expose a native object that contains a field that will hold the reference to the native object we're attempting to expose to Javascript; something along these lines:

```cpp
class Tensor : public Napi::ObjectWrap<Tensor> {
 public:
  Tensor(const Napi::CallbackInfo&);
  static Napi::FunctionReference* constructor;
  // stores pointer to the native `fl::Tensor` being wrapped
  fl::Tensor* _tensor;


  static Napi::Function GetClass(Napi::Env);
  virtual void Finalize(Napi::Env env);

 private:
};
```

While this design works, it quickly became clear that such an approach was not ideal for performance as constructing a new `Napi::ObjectWrap<Tensor>` from `fl::Tensor*` required passing the pointer as `Napi::External<fl::Tensor>` to the constructor.

```cpp
static Napi::Value _rand(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() != 1 || !info[0].IsArray()) {
    Napi::TypeError::New(env,
                         "`rand` expects exactly 1 arg; (typeof `number[]`)")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  std::vector<long long> shape =
      jsArrayArg<long long>(info[0].As<Napi::Array>(), g_row_major, false, env);
  fl::Tensor t;
  t = fl::rand(fl::Shape(shape));
  auto _out_bytes_used = static_cast<int64_t>(t.bytes());
  g_bytes_used += _out_bytes_used;
  Napi::MemoryManagement::AdjustExternalMemory(env, _out_bytes_used);
  auto* tensor = new fl::Tensor(t);
  auto wrapped = Napi::External<fl::Tensor>::New(env, tensor);
  Napi::Value wrappedTensor = Tensor::constructor->New({wrapped});
  return wrappedTensor;
}
```

In the `_rand` method above, we're forced to call `Napi::External<fl::Tensor>::New(env, tensor);` in order to construct a new wrapped Tensor to return to JS. Additionally, any calls to operations that require native `fl::Tensor` being wrapped as an arg still necessitates `Napi::External<fl::Tensor>.Data()` to retrieve the pointer to the native `fl::Tensor` being wrapped. Thus, it quickly became readily apparent that we could avoid using `Napi::ObjectWrap` entirely, rather returning `Napi::External<fl::Tensor>` directly to JS.

The rewritten logic for the example `_rand` function is as follows:

```cpp
static Napi::Value _rand(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() != 1 || !info[0].IsArray()) {
    Napi::TypeError::New(env,
                         "`rand` expects exactly 1 arg; (typeof `number[]`)")
        .ThrowAsJavaScriptException();
    return env.Null();
  }
  std::vector<long long> shape =
      jsArrayArg<long long>(info[0].As<Napi::Array>(), g_row_major, false, env);
  fl::Tensor t;
  t = fl::rand(fl::Shape(shape));
  auto _out_bytes_used = static_cast<int64_t>(t.bytes());
  g_bytes_used += _out_bytes_used;
  Napi::MemoryManagement::AdjustExternalMemory(env, _out_bytes_used);
  auto* tensor = new fl::Tensor(t);
  Napi::External<fl::Tensor> wrapped = Napi::External<fl::Tensor>::New(env, tensor, DeleteTensor);
  return wrapped;
}
```

The following benchmark (averaged over a given # of runs) was used to verify that the switch to avoid using `Napi::ObjectWrap` was indeed helping performance:

```js
const { Tensor } = require('./test/js/tensor.cjs');
const sm = require('./test/js/index.cjs');

sm.init();

function genRand() {
	const out = new Float32Array(128);
	for (let i = 0; i < 128; ++i) {
		out[i] = Math.random();
	}
	return out;
}

const t0 = performance.now() / 1e3;
let m = 0;
for (let i = 0; i < 10000; ++i) {
	const a = sm.rand([128]);
	const b = new Tensor(genRand());
	m += a.add(b).mean([], false).toFloat32Scalar();
}
const t1 = performance.now() / 1e3;
console.log(t1 - t0, 'seconds to calculate', m);
m = null;
console.log('bytes: ', Number(sm.bytesUsed()));
```

The above test was run both with an implementation that used `Napi::ObjectWrap` and an implementation that solely used `Napi::External` with the following results:

- `Napi::ObjectWrap` implementation: `~0.74 seconds`
- `Napi::External` implementation: `~0.66 seconds`

Unsurprisingly, removing the uneccessary usage of `Napi::ObjectWrap` from the implementation resulted in a fairly significant boost to performance.

Stay tuned for the next post in this series where we'll go into a bit more detail with regards to some of the other, less obvious optimizations we've discovered and are making use of in the (WIP) shumai NAPI bindings.
