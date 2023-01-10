---
postTitle: 'Performance Driven Development of Cross Runtime Node-API Native Addons'
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
  import Link from '$lib/ux/blog/Link.svelte';
</script>

## Background

With the relatively recent release of the <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun Javascript runtime</ExternalLink>, we've released <ExternalLink ariaLabel="Learn more about shumai, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript)." href="https://github.com/facebookresearch/shumai">shumai</ExternalLink>, a fast, network-connected, differentiable tensor library for TypeScript/Javascript. The current implementation of shumai is to leverage Bun's Foreign Function Interface (FFI), which provides an <ExternalLink ariaLabel="Bun FFI benchmarks" href="https://github.com/oven-sh/bun/blob/main/bench/ffi">incredibly low overhead</ExternalLink> means to execute native code from JS.

However, as fast as Bun is able to execute native quickly from Javascript, there were still a few noticeable pain points in our usage of Bun's FFI; namely, numerous calls to the `toArrayBuffer` and `ptr` methods exported from the `bun:ffi` module were the most obvious culprits hampering shumai's performance. These calls were necessary to convert Javascript objects to native memory and vice versa, and were the primary bottleneck in our application.
