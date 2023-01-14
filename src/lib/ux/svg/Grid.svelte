<script lang="ts">
	import { random } from '$lib/utils';
	import { getTwoColors } from '.';
	import { scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import Circle from './Circle.svelte';
	import Dots from './Dots.svelte';
	import Cross from './Cross.svelte';
	import DiagonalSquare from './DiagonalSquare.svelte';
	import HalfSquare from './HalfSquare.svelte';
	import OppositeCircles from './OppositeCircles.svelte';
	import QuarterCircle from './QuarterCircle.svelte';

	export let colorPalette: string[];
	export let width = 1200;
	export let height = 630;

	const shapes = [Circle, OppositeCircles, Dots, Cross, QuarterCircle, DiagonalSquare, HalfSquare];

	export const bigShapes = [
		Circle,
		OppositeCircles,
		Cross,
		QuarterCircle,
		DiagonalSquare,
		HalfSquare
	];

	const squareSize = 100;
	const numCols = random(4, 8, true);
	const numRows = Math.floor((numCols / height) * width);

	// Random multiplier (2 or 3 squares)
	const multiplier = random([2, 3]);
	// Random X position
	const xPosBig = random(0, numRows - multiplier, true) * squareSize;
	// Random Y position
	const yPosBig = random(0, numCols - multiplier, true) * squareSize;

	function isWithinBigShape(x: number, y: number) {
		return (
			x >= xPosBig &&
			x < xPosBig + multiplier * squareSize &&
			y >= yPosBig &&
			y < yPosBig + multiplier * squareSize
		);
	}
</script>

<svg
	width="100%"
	height="100%"
	viewBox="0 0 {numRows * squareSize} {numCols * squareSize}"
	out:scale={{ start: 0.8, opacity: 0, duration: 250 }}
	in:scale={{ start: 0.8, opacity: 0, duration: 400, delay: 250, easing: backOut }}
>
	{#each { length: numRows } as _, i}
		{#each { length: numCols } as _, j}
			{@const x = i * squareSize}
			{@const y = j * squareSize}
			{@const isBig = x === xPosBig && y === yPosBig}
			{@const blockStyle = isBig ? random(bigShapes) : random(shapes)}
			{@const { foreground, background } = getTwoColors(colorPalette)}
			{@const size = isBig ? squareSize * multiplier : squareSize}
			{#if !isWithinBigShape(x, y) || isBig}
				<svelte:component this={blockStyle} {size} {x} {y} {foreground} {background} />
			{/if}
		{/each}
	{/each}
</svg>

<style>
	svg {
		width: 100%;
		aspect-ratio: 1;
	}

	svg :global(*) {
		/* Removes little gaps between the shapes */
		shape-rendering: crispEdges;
	}
</style>
