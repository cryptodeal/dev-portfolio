<script lang="ts">
	import PostCard from '$lib/ux/blog/PostCard.svelte';
	import SEO from '$lib/seo/index.svelte';
	import website from '$lib/_site';
	import type { PageData } from './$types';
	export let data: PageData;
	const { posts } = data;

	const featuredImageSrc = 'https://www.jamesdeal.dev/og';
	const { author, siteUrl } = website;
	let title = 'Posts';
	const breadcrumbs = [
		{
			name: 'Posts',
			slug: ''
		}
	];
	let metadescription =
		'James Deal | Developer Portfolio - list of articles and blog posts written by James Deal for jamesdeal.dev.';
	const featuredImageAlt = 'Dynamically generated shareable image for jamesdeal.dev';
	const featuredImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 1200,
		height: 630,
		caption: 'Posts'
	};
	const ogImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const ogSquareImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const twitterImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt
	};
	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};
	const seoProps = {
		title,
		slug: '',
		entityMeta,
		datePublished: '2023-01-10T14:19:33.000+0100',
		lastUpdated: '2023-01-13T14:19:33.000+0100',
		breadcrumbs,
		metadescription,
		featuredImage,
		ogImage,
		ogSquareImage,
		twitterImage
	};
</script>

<SEO {...seoProps} />

<div class="md:container w-full mx-auto flex flex-col ">
	<!-- Selected Category Filters -->
	<div
		class="gap-2 sm:gap-4 lg:gap-6 2xl:gap-10 pb-[20vh] pt-[5.5rem] flex flex-col mx-auto w-full max-w-4xl px-2 sm:px-2 lg:px-4 lg:max-w-1/2"
	>
		{#each posts as { postTitle, slug }}
			<PostCard title={postTitle} {slug} />
		{:else}
			<h3 class="text-center">No posts yet...</h3>
		{/each}
	</div>
</div>
