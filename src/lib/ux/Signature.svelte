<script lang="ts">
	import { draw } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	export let forceVis = false;
	const isSigVisible = <Writable<boolean>>getContext('isSigVisible');
	let done = forceVis;
	const paths: string[] = [
		'M383 630 c-146 -43 -224 -113 -222 -199 l2 -46 6 45 c8 52 20 76 53 107 54 51 223 111 274 99 78 -20 -47 -235 -261 -452 -110 -112 -175 -159 -206 -149 -26 9 -24 23 9 76 37 57 120 130 194 169 32 17 58 33 58 36 0 12 -48 -10 -107 -48 -138 -88 -231 -236 -155 -246 78 -11 353 267 465 470 80 145 48 185 -110 138z',
		'M785 643 c-102 -23 -175 -67 -175 -107 0 -13 12 -31 31 -45 38 -28 62 -81 53 -119 -11 -42 -42 -100 -99 -182 -50 -73 -87 -135 -68 -115 26 27 354 497 350 501 -3 3 -42 -47 -87 -110 -45 -64 -83 -116 -84 -116 -2 0 -1 11 2 25 8 42 -8 78 -50 117 -48 45 -45 69 13 98 70 36 156 53 233 45 88 -8 124 -23 160 -66 25 -29 28 -39 24 -89 -14 -186 -258 -419 -482 -461 -73 -13 -101 -6 -139 34 l-30 32 17 -32 c47 -92 235 -55 419 82 141 106 227 241 227 355 0 60 -2 65 -39 101 -28 26 -55 40 -91 48 -50 11 -146 13 -185 4z'
	];
</script>

{#if $isSigVisible || forceVis}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="100%"
		class="p-1"
		version="1.0"
		viewBox="0 0 110 65"
		preserveAspectRatio="xMidYMid meet"
	>
		<g transform="translate(0.000000,65.000000) scale(0.100000,-0.100000)">
			{#each paths as path, i}
				{#if i === paths.length - 1}
					<path
						class:done
						in:draw={{ delay: i * 500, duration: 500 }}
						d={path}
						on:introend={() => (done = true)}
						shape-rendering="auto"
					/>
				{/if}
				<path
					class:done
					in:draw={{ delay: i * 500, duration: 500 }}
					d={path}
					shape-rendering="auto"
				/>
			{/each}
		</g>
	</svg>
{/if}

<style>
	svg path {
		stroke-width: 1em;
		transition: fill 2s, stroke 0.7s 2s;
		will-change: opacity;
		@apply stroke-current fill-none;
	}

	path.done {
		will-change: opacity;
		stroke-width: 1rem;
		@apply fill-current stroke-current;
	}
</style>
