<script lang="ts">
	import { random } from '$lib/utils';
	import colors from 'nice-color-palettes/100';
	export let message = 'JamesDeal.dev';
	export let width: number | undefined;
	export let height: number | undefined;
	import Grid from './svg/Grid.svelte';

	const colorPalette: string[] = random(colors);
</script>

<Grid {colorPalette} {width} {height} />

<div style="position: absolute; top: 0; left: 0; background-color: transparent; z-index: 100;">
	<div style="background-color: #eeeee4; width: auto; height: auto; padding: 1rem 1.5rem;">
		{message}
	</div>
</div>

<style>
	div {
		font-family: 'Noto Sans';
		display: flex;
		flex-direction: column;
		font-size: 50px;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
