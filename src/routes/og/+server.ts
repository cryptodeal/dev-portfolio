import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import Card from '$lib/ux/Card.svelte';
import { Resvg } from '@resvg/resvg-js';
import NotoSans from '$lib/NotoSans-Regular.ttf';

import type { RequestHandler } from './$types';

const height = 630;
const width = 1200;

export const GET: RequestHandler = async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (Card as any).render();
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

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
