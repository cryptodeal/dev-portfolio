import Icons from 'unplugin-icons/vite';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import fs from 'fs';

function rawFonts(ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(code: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}

const config: UserConfig = {
  define: {
		'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
	},
	plugins: [imagetools(), Icons({ compiler: 'svelte' }), sveltekit(), rawFonts(['.ttf'])],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
