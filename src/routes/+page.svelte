<script lang="ts">
	import { getContext } from 'svelte';
	import Hero from '$lib/ux/Hero.svelte';
	import type { Writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import SEO from '$lib/seo/index.svelte';
	import { titles, content } from '$lib/_ResumeContent';
	import Subtitle from '$lib/ux/Subtitle.svelte';
	import Dates from '$lib/ux/Dates.svelte';
	import BulletedList from '$lib/ux/BulletedList.svelte';
	import Pill from '$lib/ux/Pill.svelte';
	import website from '$lib/_site';
	import ExternalLink from '$lib/ux/blog/ExternalLink.svelte';

	const isSigVisible = <Writable<boolean>>getContext('isSigVisible');
	onMount(() => {
		isSigVisible.set(true);
	});
	onDestroy(() => {
		isSigVisible.set(false);
	});

	const featuredImageSrc = 'https://www.jamesdeal.dev/og?w=672&h=448';
	const { author, siteUrl } = website;
	let title = 'Home';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		}
	];
	let metadescription =
		'James Deal | Developer Portfolio - personal musings, learnings, design notes, and walkthroughs from your friendly neighborhood Full Stack Developer.';
	const featuredImageAlt = 'Dynamically generated shareable image for jamesdeal.dev';
	const featuredImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: 'Home page'
	};
	const ogImage = {
		url: 'https://www.jamesdeal.dev/og?w=1200&h=627',
		alt: featuredImageAlt
	};
	const ogSquareImage = {
		url: 'https://www.jamesdeal.dev/og?w=400&h=400',
		alt: featuredImageAlt
	};
	const twitterImage = {
		url: 'https://www.jamesdeal.dev/og?w=800&h=418',
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

<div class="mb-10">
	<svelte:component this={Hero} />
</div>

<h1
	id="about"
	class="font-title text-4xl text-center mt-64 m-24 font-extrabold sm:text-5xl lg:text-7xl"
>
	About
</h1>

<div class="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
	<div
		class="card h-fit md:max-w-[800px] justify-self-center md:justify-self-end bg-accent text-accent-content"
	>
		<div class="card-body">
			<h2 class="card-title">{titles.edu}</h2>
			<Subtitle title={content.edu.subtitle} />
			<Dates dates={content.edu.dates} />
			<BulletedList bulletItems={content.edu.info} />
		</div>
	</div>

	<div
		class="card h-fit md:max-w-[800px] justify-self-center md:justify-self-start bg-accent text-accent-content"
	>
		<div class="card-body">
			<h2 class="card-title">Skills</h2>
			<div class="flex flex-col">
				<Subtitle title={content.skills.lang.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.lang.list as text}
						<Pill {text} />
					{/each}
				</div>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title={content.skills.db.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.db.list as text}
						<Pill {text} />
					{/each}
				</div>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title={content.skills.libs.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.libs.list as t}
						<Pill text={t[0]} href={t[1]} />
					{/each}
				</div>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title={content.skills.graphics.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.graphics.list as t}
						{#if Array.isArray(t)}
							<Pill text={t[0]} href={t[1]} />
						{:else}
							<Pill text={t} />
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div
		class="card h-fit md:max-w-[800px] justify-self-center md:justify-self-end bg-accent text-accent-content"
	>
		<div class="card-body">
			<h2 class="card-title">Experience</h2>
			<div class="flex flex-col">
				<Subtitle
					title={content.exp.uw.subtitle.title}
					href={content.exp.uw.subtitle.href}
					role={content.exp.uw.subtitle.role}
				/>
				<Dates dates={content.exp.uw.dates} />
				<BulletedList bulletItems={content.exp.uw.info} />
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle
					title={content.exp.reyReyPSC.subtitle.title}
					href={content.exp.reyReyPSC.subtitle.href}
					role={content.exp.reyReyPSC.subtitle.role}
				/>
				<Dates dates={content.exp.reyReyPSC.dates} />
				<BulletedList bulletItems={content.exp.reyReyPSC.info} />
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle
					title={content.exp.coss.subtitle.title}
					href={content.exp.coss.subtitle.href}
					role={content.exp.coss.subtitle.role}
				/>
				<Dates dates={content.exp.coss.dates} />
				<BulletedList bulletItems={content.exp.coss.info} />
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle
					title={content.exp.reyReyIT.subtitle.title}
					href={content.exp.reyReyIT.subtitle.href}
					role={content.exp.reyReyIT.subtitle.role}
				/>
				<Dates dates={content.exp.reyReyIT.dates} />
				<BulletedList bulletItems={content.exp.reyReyIT.info} />
			</div>
		</div>
	</div>

	<div
		class="card h-fit md:max-w-[800px] justify-self-center md:justify-self-start bg-accent text-accent-content"
	>
		<div class="card-body">
			<h2 class="card-title">Building / Projects</h2>

			<div class="flex flex-col">
				<Subtitle title="shumai" href="https://github.com/facebookresearch/shumai" />
				<p class="font-extralight">
					A fast, network-connected, differentiable tensor library for TypeScript (and JavaScript).
					Built with bun + flashlight for software engineers and researchers alike.
				</p>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title="gen-napi (WIP)" href="https://github.com/cryptodeal/gen-napi" />
				<p class="font-extralight">
					Library that can be used to parse C++ headers and programmatically generate Node-API
					bindings via node-addon-api.
				</p>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title="BallerAnalytics.ai" href="https://balleranalytics.ai" />
				<p class="font-extralight">
					Building better, faster, AI driven, fan fueled basketball analytics.
				</p>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle title="ML-Crypto" href="https://github.com/cryptodeal/ML-Crypto" />
				<p class="font-extralight">
					Demo implementation of using <ExternalLink
						ariaLabel="Learn more about shumai, a fast, network-connected, differentiable tensor library for TypeScript (and JavaScript)."
						href="https://github.com/facebookresearch/shumai">shumai</ExternalLink
					> for NeuroEvolution in attempt to find a profitable trading strategy for Coinbase `ETH-USD`
					pair over previous 30 days of 15 min candle data.
				</p>
			</div>

			<div class="divider before:bg-accent-focus after:bg-accent-focus my-1" />

			<div class="flex flex-col">
				<Subtitle
					title="COSS Exchange - Node API"
					href="https://github.com/coss-exchange/trading-api-wrapper-node-js"
				/>
				<p class="font-extralight">Official Node.js API Wrapper for COSS Crypto Exchange.</p>
			</div>
		</div>
	</div>
</div>
