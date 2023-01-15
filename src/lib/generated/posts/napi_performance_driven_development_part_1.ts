import meta from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpg?width=672&metadata';
import srcsetwebp from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpg?w=1280;672&webp&srcset';
import srcsetauto from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpg?w=1280;672&jpeg&srcset';
import ogImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance_open_graph.jpg';
import ogSquareImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance_open_graph_square.jpg';
import twitterImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance_twitter.jpg';
const { height, src, width } = meta;
const data = {
	slug: 'napi_performance_driven_development_part_1',
	alt: 'Depiction of the bidirectional flow of data from Javascript to C++ and vice versa.',
	width,
	height,
	src,
	sources: [
		{ srcset: srcsetwebp, type: 'image/webp' },
		{ srcset: srcsetauto, type: 'image/jpeg' }
	],
	dominantColour: '#282828',
	placeholder:
		'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQG/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAAxkYH/8QAGRAAAgMBAAAAAAAAAAAAAAAAAgMBECFB/9oACAEBAAE/AFkMKPN7X//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z',
	ogImage,
	ogSquareImage,
	twitterImage
};
export { data as default };
