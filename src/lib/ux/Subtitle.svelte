<script lang="ts">
	export let title = '';
	export let href = '';
	export let role = '';
</script>

{#if href !== '' && role != ''}
	<h3 class="font-light text-lg inline-block items-center">
		<a {href} target="_blank" rel="noopener noreferrer">{title}</a> / {role}
	</h3>
{:else if href !== ''}
	<h3 class="font-light text-lg inline-block items-center">
		<a {href} target="_blank" rel="noopener noreferrer">{title}</a>
	</h3>
{:else}
	<h3 class="font-light text-lg inline-block items-center">
		{title}
	</h3>
{/if}
