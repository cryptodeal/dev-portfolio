<script lang="ts">
	import { onMount } from 'svelte';
	let blur = true;
	let observerCallback = function (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				intersected = true;
				observer.unobserve(imgElement);
			}
		});
	};
	export let style = '';
	export let ratio: string;
	export let classStr = '';
	export let width = 290;
	export let height = 180;
	export let sources: { srcset: string; type: string }[] = [];
	export let sizes: string;
	export let placeholder: string;
	export let src: string;
	export let alt: string;
	let imgElement: HTMLImageElement;
	let observer: IntersectionObserver;
	let intersected = false;
	let loaded = false;
	const placeholderAlt = 'placeholder image';
	$: path = intersected ? src : placeholder;
	onMount(() => {
		observer = new IntersectionObserver(observerCallback);
		observer.observe(imgElement);
		return () => {
			observer.unobserve(imgElement);
		};
	});
	function handleLoad() {
		if (!loaded && path === src) {
			loaded = true;
		}
	}
</script>

<div class:loaded class="w-full relative mb-16">
	<div style="padding-bottom:{ratio};" class="w-full">
		<img class="placeholder" class:blur src={placeholder} alt={placeholderAlt} {style} />
		<picture>
			{#each sources as source}
				<source
					data-sizes={sizes}
					data-srcset={source.srcset}
					type={source.type}
					{width}
					{height}
				/>
			{/each}

			<img
				src={path}
				{alt}
				{style}
				{width}
				{height}
				on:load={handleLoad}
				bind:this={imgElement}
				class="svelte-lazy-image main {classStr}"
				class:svelte-lazy-image--loaded={loaded}
			/>
		</picture>
	</div>
</div>

<style lang="postcss">
	img {
		object-position: center;
		position: absolute;
		top: 0;
		left: 0;
		will-change: opacity;
		width: 100%;
		height: 100%;
	}
	.blur {
		transition: opacity 200ms;
		/* transition-delay: 50ms; */
	}
	.placeholder {
		opacity: 1;
		transition: opacity 200ms ease-out;
		/* transition-delay: 50ms; */
	}
	.main {
		opacity: 0;
		transition: opacity 200ms ease-out;
		/* transition-delay: 50ms; */
	}
	.loaded .placeholder {
		opacity: 0;
		position: absolute;
	}
	.loaded .main {
		opacity: 1;
	}
</style>
