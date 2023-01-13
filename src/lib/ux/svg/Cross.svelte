<script lang="ts">
	import { SVG, type Rect, type G } from '@svgdotjs/svg.js';
	export let size: number;
	export let foreground: string;
	export let background: string;
	export let x: number;
	export let y: number;

	function center(node: SVGRectElement) {
		SVG<Rect>(node as unknown as Rect).center(x + size / 2, y + size / 2);
	}

	function rotate(node: SVGRectElement) {
		SVG<Rect>(node as unknown as Rect).transform({ rotate: 90 });
	}

	function conditionalRotate(node: SVGGElement) {
		if (Math.random() < 0.4) {
			SVG<G>(node as unknown as G).transform({ rotate: 45, origin: 'center center' });
		}
	}
</script>

<g class="draw-cross">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>
<g use:conditionalRotate>
	<rect
		use:center
		width={size / 1.5}
		height={size / 5}
		fill={foreground}
		x={x + size / 2}
		y={y + size / 2}
	/>
	<rect
		use:center
		use:rotate
		width={size / 1.5}
		height={size / 5}
		fill={foreground}
		x={x + size / 2}
		y={y + size / 2}
	/>
</g>
