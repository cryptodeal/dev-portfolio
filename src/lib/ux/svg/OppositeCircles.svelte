<script lang="ts">
	import { random } from '$lib/utils';
	import { SVG, type G } from '@svgdotjs/svg.js';

	export let size: number;
	export let foreground: string;
	export let background: string;
	export let x: number;
	export let y: number;

	const offset = random([
		// top left + bottom right
		[0, 0, size, size],
		// top right + bottom left
		[0, size, size, 0]
	]);

	function mask(node: SVGGElement) {
		const mask = SVG().rect(size, size).fill('#fff').move(x, y);
		SVG<G>(node as unknown as G).maskWith(mask);
	}
</script>

<g class="opposite-circles">
	<rect width={size} height={size} fill={background} {x} {y} />
	<g use:mask>
		<circle r={size / 2} cx={x + offset[0]} cy={y + offset[1]} fill={foreground} />
		<circle r={size / 2} cx={x + offset[2]} cy={y + offset[3]} fill={foreground} />
	</g>
</g>
