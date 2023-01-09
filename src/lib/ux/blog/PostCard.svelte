<script lang="ts">
	export let title: string,
		brief: string | undefined = undefined,
		slug: string;
</script>

<div class="card card-compact w-full bg-secondary-focus text-secondary-content shadow-xl">
	<a href={`/posts/${slug}`} class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>By: James Deal</p>
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
