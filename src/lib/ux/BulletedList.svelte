<script lang="ts">
	export let bulletItems: (string | (string | string[])[])[] | string[] = [];
</script>

<ul class="font-extralight list-disc list-inside inline-block items-center">
	{#each bulletItems as itemText}
		{#if Array.isArray(itemText)}
			<li>
				{itemText[0]}
				<a href={itemText[1][1]} target="_blank" rel="noopener noreferrer">{itemText[1][0]}</a>
			</li>
		{:else}
			<li>{itemText}</li>
		{/if}
	{/each}
</ul>
