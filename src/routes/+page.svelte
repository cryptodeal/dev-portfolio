<script lang="ts">
	import { getContext } from 'svelte';
	import Hero from '$lib/ux/Hero.svelte';
	import type { Writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import { titles, content } from '$lib/_ResumeContent';
	import Subtitle from '$lib/ux/Subtitle.svelte';
	import Dates from '$lib/ux/Dates.svelte';
	import BulletedList from '$lib/ux/BulletedList.svelte';
	import Pill from '$lib/ux/Pill.svelte';
	import website from '$lib/_site';

	const isSigVisible = <Writable<boolean>>getContext('isSigVisible');
	onMount(() => {
		isSigVisible.set(true);
	});
	onDestroy(() => {
		isSigVisible.set(false);
	});

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
	const featuredImageAlt =
		'picture of a person with long, curly hair, wearing a red had taking a picture with an analogue camera';
	const featuredImage = {
		// url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: 'Home page'
	};
	const ogImage = {
		// url: ogImageSrc,
		alt: featuredImageAlt
	};
	const ogSquareImage = {
		// url: ogSquareImageSrc,
		alt: featuredImageAlt
	};
	const twitterImage = {
		// url: twitterImageSrc,
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
		datePublished: '2021-07-07T14:19:33.000+0100',
		lastUpdated: '2021-07-07T14:19:33.000+0100',
		breadcrumbs,
		metadescription,
		featuredImage,
		ogImage,
		ogSquareImage,
		twitterImage
	};
</script>

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
		class="card h-fit md:max-w-400px justify-self-center md:justify-self-end bg-accent text-accent-content"
	>
		<div class="card-body">
			<h2 class="card-title">{titles.edu}</h2>
			<Subtitle title={content.edu.subtitle} />
			<Dates dates={content.edu.dates} />
			<BulletedList bulletItems={content.edu.info} />
		</div>
	</div>

	<div
		class="card h-fit md:max-w-400px justify-self-center md:justify-self-start bg-accent text-accent-content"
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

			<div class="divider my-1" />

			<div class="flex flex-col">
				<Subtitle title={content.skills.db.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.db.list as text}
						<Pill {text} />
					{/each}
				</div>
			</div>

			<div class="divider my-1" />

			<div class="flex flex-col">
				<Subtitle title={content.skills.libs.subtitle} />
				<div class="flex flex-wrap">
					{#each content.skills.libs.list as t}
						<Pill text={t[0]} href={t[1]} />
					{/each}
				</div>
			</div>

			<div class="divider my-1" />

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
		class="card h-fit md:max-w-400px justify-self-center md:justify-self-end bg-accent text-accent-content"
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

			<div class="divider my-1" />

			<div class="flex flex-col">
				<Subtitle
					title={content.exp.reyReyPSC.subtitle.title}
					href={content.exp.reyReyPSC.subtitle.href}
					role={content.exp.reyReyPSC.subtitle.role}
				/>
				<Dates dates={content.exp.reyReyPSC.dates} />
				<BulletedList bulletItems={content.exp.reyReyPSC.info} />
			</div>

			<div class="divider my-1" />

			<div class="flex flex-col">
				<Subtitle
					title={content.exp.coss.subtitle.title}
					href={content.exp.coss.subtitle.href}
					role={content.exp.coss.subtitle.role}
				/>
				<Dates dates={content.exp.coss.dates} />
				<BulletedList bulletItems={content.exp.coss.info} />
			</div>

			<div class="divider my-1" />

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
</div>
