<script lang="ts">
	export let rel = 'nofollow noopener noreferrer';
	export let target = '_blank';
	export let href: string;
	export let ariaLabel: string;
</script>

<a aria-label={ariaLabel} {href} {rel} {target}><slot /></a>
