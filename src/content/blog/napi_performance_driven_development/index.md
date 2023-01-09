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

Working on <ExternalLink ariaLabel="Learn more about shumai, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript)." href="https://github.com/facebookresearch/shumai">shumai</ExternalLink>, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript), we've made every effort to ensure the library cuts no corners with regards to performance.

## Why Bother With Node Native Addons (Node-API)?

## Why Target Multiple Runtimes?

With the relatively recent release of the <ExternalLink ariaLabel="Learn more about Bun.sh Javascript runtime." href="https://bun.sh">Bun Javascript runtime</ExternalLink>, it no longer makes sense to write Native Addons that only target the Node.js runtime.
