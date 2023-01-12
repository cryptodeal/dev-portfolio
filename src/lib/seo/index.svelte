<script lang="ts">
	import defaultFeaturedImage from '$lib/assets/default/home.jpg';
	import defaultOgImage from '$lib/assets/default/home-open-graph.jpg';
	import defaultOgSquareImage from '$lib/assets/default/home-open-graph-square.jpg';
	import defaultTwitterImage from '$lib/assets/default/home-twitter.jpg';
	import site from '$lib/_site';

	export let isArticle = false;
	export let entityMeta = null;
	export let metaDescription: string;
	export let title: string;

	// imported props with fallback defaults
	export let featuredImage = {
		url: defaultFeaturedImage,
		alt: defaultAlt,
		width: 672,
		height: 448,
		caption: 'Home page'
	};
	export let ogImage = {
		url: defaultOgImage,
		alt: defaultAlt
	};
	export let ogSquareImage = {
		url: defaultOgSquareImage,
		alt: defaultAlt
	};
	export let twitterImage = {
		url: defaultTwitterImage,
		alt: defaultAlt
	};

	const {
		author,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		twitterUsername
	} = site;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<link rel="canonical" href={url} />
</svelte:head>
