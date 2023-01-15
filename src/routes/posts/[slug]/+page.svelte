<script lang="ts">
	import BannerImage from '$lib/ux/blog/BannerImage.svelte';
	import ShareTwitter from '$lib/ux/socials/ShareTwitter.svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/seo/index.svelte';
	import website from '$lib/_site';
	export let data: PageData;
	const { post, page, imageData } = data;

	type PostData = {
		datePublished: string;
		featuredImage: any;
		featuredImageAlt: any;
		lastUpdated: string;
		ogImage: any;
		readingTime: { text: string; minutes: number; time: number; words: number };
		ogSquareImage: any;
		postTitle: any;
		seoMetaDescription: any;
		twitterImage: any;
		slug: string;
		body: any;
	};

	const {
		datePublished,
		featuredImageAlt,
		lastUpdated,
		postTitle: title,
		readingTime,
		seoMetaDescription: metadescription,
		slug
	} = <PostData>post;
	const { ogImage, ogSquareImage, src: featuredImage, twitterImage } = imageData;
	const timeToRead = Math.ceil(readingTime.minutes);

	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		},
		{
			name: title,
			slug
		}
	];
	const featuredImageObject = {
		url: featuredImage,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: title
	};
	const ogImageObject = ogImage
		? {
				url: ogImage,
				alt: featuredImageAlt
		  }
		: null;
	const ogSquareImageObject = ogSquareImage
		? {
				url: ogSquareImage,
				alt: featuredImageAlt
		  }
		: null;
	const twitterImageObject = twitterImage
		? {
				url: twitterImage,
				alt: featuredImageAlt
		  }
		: null;
</script>

<SEO
	article
	{breadcrumbs}
	{slug}
	{title}
	{datePublished}
	{lastUpdated}
	{metadescription}
	{timeToRead}
	featuredImage={featuredImageObject}
	ogImage={ogImageObject}
	ogSquareImage={ogSquareImageObject}
	twitterImage={twitterImageObject}
/>

<div class="mx-auto mb-4 max-w-4xl px-2 sm:px-2 lg:px-4 lg:max-w-9/12">
	<div class="w-full inline-flex gap-y-2 flex-wrap justify-between items-center">
		<div class="text-sm breadcrumbs">
			<ul>
				<li><a href="/posts" data-sveltekit-preload-data="hover">Posts</a></li>
				<li>{title}</li>
			</ul>
		</div>
		<div class="flex w-full sm:w-fit justify-center">
			<ShareTwitter />
		</div>
	</div>
</div>

<div class="mx-auto prose max-w-4xl px-4 sm:px-6 lg:px-8 lg:max-w-9/12 2xl:prose-lg">
	<BannerImage {imageData} />
	<h1>{title}</h1>
	<div class="not-prose">
		<p class="font-semibold text-xl">By: {website.author}</p>
		<p class="font-light text-sm">Est. {readingTime.text}</p>
	</div>
	<svelte:component this={page} />
</div>

<style>
	.prose :where(code):not(:where([class~='not-prose'] *)) {
		border-radius: var(--rounded-badge);
	}
</style>
