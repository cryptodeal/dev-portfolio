<script lang="ts">
	export let title = '';
	export let href = '';
	export let role = '';
</script>

<div class="mb-1">
	{#if href !== '' && role != ''}
		<h3
			class="font-light text-xl text-center w-3/4 inline-block items-center sm:w-1/2 sm:text-2xl md:w-3/4 md:text-left"
		>
			<a {href} target="_blank" rel="noopener noreferrer">{title}</a> / {role}
		</h3>
	{:else if href !== ''}
		<h3
			class="font-light text-xl text-center w-3/4 inline-block items-center sm:w-1/2 sm:text-2xl md:text-left md:w-3/4"
		>
			<a {href} target="_blank" rel="noopener noreferrer">{title}</a>
		</h3>
	{:else}
		<h3
			class="font-light text-xl text-center w-3/4 inline-block items-center sm:w-1/2 sm:text-2xl md:text-left md:w-3/4"
		>
			{title}
		</h3>
	{/if}
</div>
