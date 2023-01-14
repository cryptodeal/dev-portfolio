<script lang="ts">
	import website from '$lib/_site';
	export let title: string,
		readingTime: { text: string; minutes: number; time: number; words: number } | undefined =
			undefined,
		brief: string | undefined = undefined,
		slug: string;
</script>

<div class="card card-compact w-full bg-accent text-accent-content shadow-xl">
	<a href={`/posts/${slug}`} class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>By: {website.author}</p>
		{#if readingTime}
			<p>Estimated {readingTime.text}</p>
		{/if}
		{#if brief}
			<p>{brief}</p>
		{/if}
	</a>
</div>

<style lang="postcss">
	.card-title {
		@apply leading-tight font-normal text-3xl;
	}
</style>
