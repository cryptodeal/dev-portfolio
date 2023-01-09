<script lang="ts">
	import PostCard from '$lib/ux/blog/PostCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { posts } = data;
</script>

<div class="md:container w-full mx-auto flex flex-col ">
	<!-- Selected Category Filters -->
	<div
		class="gap-2 sm:gap-4 lg:gap-6 2xl:gap-10 pb-[20vh] pt-[5.5rem] flex flex-col mx-auto w-full max-w-4xl px-2 sm:px-2 lg:px-4 lg:max-w-1/2"
	>
		{#each posts as { postTitle, slug }}
			<PostCard title={postTitle} {slug} />
		{:else}
			<h3 class="text-center">No posts yet...</h3>
		{/each}
	</div>
</div>
