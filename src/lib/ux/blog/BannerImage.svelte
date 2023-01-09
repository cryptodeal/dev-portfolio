<script lang="ts">
	import Image from '$lib/ux/Image.svelte';
	export let imageData;

	const { alt, width, height, src, sources, placeholder } = imageData;
	const sizes = '(max-width: 672px) calc(100vw - 32px), 672px';
	const ratio = `${(1 / (width / height)) * 100}%`;
</script>

<div class="flex mb-4">
	<Image {src} {ratio} {sources} {sizes} {placeholder} {alt} />
</div>
