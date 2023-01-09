<script lang="ts">
	import { getContext } from 'svelte';
	import Hero from '$lib/ux/Hero.svelte';
	import type { Writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	const isSigVisible = <Writable<boolean>>getContext('isSigVisible');
	onMount(() => {
		isSigVisible.set(true);
	});
	onDestroy(() => {
		isSigVisible.set(false);
	});
</script>

<Hero />
