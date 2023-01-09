<script lang="ts">
	import BannerImage from '$lib/ux/blog/BannerImage.svelte';
	import ShareTwitter from '$lib/ux/socials/ShareTwitter.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { post, page, imageData } = data;

	type PostData = {
		datePublished: any;
		featuredImage: any;
		featuredImageAlt: any;
		ogImage: any;
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
		postTitle: title,
		seoMetaDescription: metadescription,
		slug
	} = <PostData>post;
</script>

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

	<h1 class="mb-2">{title}</h1>
	<h4>By: James Deal</h4>
	<svelte:component this={page} />
</div>
