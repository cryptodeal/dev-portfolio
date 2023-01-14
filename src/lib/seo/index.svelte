<script lang="ts">
	import { VERTICAL_LINE_ENTITY } from '$lib/_const';
	import website from '$lib/_site';
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';

	const defaultFeaturedImage = 'https://jamesdeal.dev/og';
	const {
		author,
		entity,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		twitterUsername
	} = website;
	export let article = false;
	export let breadcrumbs: { name: string; slug: string }[] = [];
	export let entityMeta: any = null;
	export let lastUpdated: string;
	export let datePublished: string;
	export let metadescription: string;
	export let slug: string;
	export let timeToRead = 0;
	export let title: string;
	const defaultAlt = 'Dynamically generated shareable image for jamesdeal.dev';
	// imported props with fallback defaults
	export let featuredImage = {
		url: defaultFeaturedImage,
		alt: defaultAlt,
		width: 1200,
		height: 630,
		caption: 'Home page'
	};
	export let ogImage: { url: string; alt: string } | null = {
		url: defaultFeaturedImage,
		alt: defaultAlt
	};
	export let ogSquareImage: { url: string; alt: string } | null = {
		url: defaultFeaturedImage,
		alt: defaultAlt
	};
	export let twitterImage: { url: string; alt: string } | null = {
		url: defaultFeaturedImage,
		alt: defaultAlt
	};
	const pageTitle = `${siteTitle} ${VERTICAL_LINE_ENTITY} ${title}`;
	const url = `${siteUrl}/${slug}`;
	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(article ? { datePublished, lastUpdated } : {})
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		lastUpdated,
		entityMeta,
		entity,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		githubPage,
		twitterUsername
	};
	const twitterProps = {
		article,
		author,
		twitterUsername,
		image: twitterImage,
		timeToRead
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<link rel="canonical" href={url} />
</svelte:head>
<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />
<SchemaOrg {...schemaOrgProps} />
