import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svelte.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }),
		preprocess({
			postcss: true,
		}),
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
