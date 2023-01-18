import website from '$lib/_site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = function get({ setHeaders }) {
	const { description, siteShortTitle, siteTitle } = website;

	const manifest = {
		name: siteTitle,
		short_name: siteShortTitle,
		description,
		start_url: '/',
		background_color: 'rgb(15,23,41)',
		theme_color: 'rgb(179,197,239)',
		display: 'standalone',
		icons: [
			{ src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any maskable' },
			{ src: '/icon-512.png', type: 'image/png', sizes: '512x512' }
		]
	};

	setHeaders({
		'content-type': 'application/json'
	});

	return new Response(JSON.stringify(manifest));
};
