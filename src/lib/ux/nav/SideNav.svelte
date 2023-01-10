<script lang="ts">
	export let segment: string;
	export let closeDrawer: () => void;
</script>

<div class="h-12" />

<ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
	<!-- Sidebar content here -->
	<li>
		<a
			data-sveltekit-preload-data="hover"
			on:click={closeDrawer}
			href="/posts"
			class="uppercase"
			class:active={segment === 'posts' ? true : false}
		>
			posts
		</a>
	</li>
</ul>
