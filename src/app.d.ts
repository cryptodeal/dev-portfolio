/// <reference types="unplugin-icons/types/svelte" />

declare module 'theme-change';

declare module 'nice-color-palettes/100';

declare module '*.svelte' {
	export { SvelteComponentDev as default } from 'svelte/internal';
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}
