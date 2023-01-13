<script lang="ts">
	import { random } from '@georgedoescode/generative-utils';
	export let size: number;
	export let foreground: string;
	export let background: string;
	export let x: number;
	export let y: number;

	let halfX = 2;
	let halfY = 2;
	if (random([0, 1])) {
		halfX = 1;
	} else {
		halfY = 1;
	}
</script>

<g class="half-square">
	<rect height={size} width={size} fill={background} {x} {y} />
	<rect height={size / halfX} width={size / halfY} fill={foreground} {x} {y} />
</g>
