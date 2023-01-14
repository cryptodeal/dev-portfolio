import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import Card from '$lib/ux/Card.svelte';
import { Resvg } from '@resvg/resvg-js';
import NotoSans from '$lib/NotoSans-Regular.ttf';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const message = url.searchParams.get('msg') ?? undefined,
		width = url.searchParams.has('w') ? Number(url.searchParams.get('w')) : 1200,
		height = url.searchParams.has('h') ? Number(url.searchParams.get('h')) : 630;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (Card as any).render({ message, width, height });
	const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	const svg = await satori(element, {
		fonts: [
			{
				name: 'Noto Sans',
				data: Buffer.from(NotoSans),
				style: 'normal'
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	return new Response(resvg.render().asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
