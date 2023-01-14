<script lang="ts">
	export let text = '';
	export let href = '';
</script>

{#if href !== ''}
	<a
		class="bg-info rounded-full text-info-content cursor-pointer font-bold my-1 mx-1 text-sm py-1 px-2 no-underline inline-block hover:transform-gpu hover:-translate-x-1 hover:-translate-y-1 hover:shadow-animate hover:shadow-info-content hover:transition hover:duration-300 hover:ease-in-out"
		{href}
		target="_blank"
		rel="noopener noreferrer">{text}</a
	>
{:else}
	<span
		class="bg-info text-info-content rounded-full cursor-pointer font-bold my-1 mx-1 text-sm py-1 px-2 no-underline inline-block hover:transform-gpu hover:-translate-x-1 hover:-translate-y-1 hover:shadow-animate hover:shadow-info-content hover:transition hover:duration-300 hover:ease-in-out"
	>
		{text}
	</span>
{/if}
