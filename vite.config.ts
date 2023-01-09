import Icons from 'unplugin-icons/vite';
import { imagetools } from 'vite-imagetools'
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [imagetools(), Icons({ compiler: 'svelte' }), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
