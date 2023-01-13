<script lang="ts">
	import { random } from '$lib/utils';
	import { SVG, type G } from '@svgdotjs/svg.js';
	export let size: number;
	export let foreground: string;
	export let background: string;
	export let x: number;
	export let y: number;

	const xOffset = size * random([0, 1], true);
	const yOffset = size * random([0, 1], true);

	function mask(node: SVGGElement) {
		const mask = SVG().rect(size, size).fill('#fff').move(x, y);
		SVG<G>(node as unknown as G).maskWith(mask);
	}
</script>

<g class="quarter-circle">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>

<g use:mask>
	<circle r={size} cx={x + xOffset} cy={y + yOffset} fill={foreground} />
	{#if Math.random() < 0.6}
		<circle r={size / 2} cx={x + xOffset} cy={y + yOffset} fill={background} />
	{/if}
</g>
