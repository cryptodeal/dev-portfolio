import meta from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg?width=672&metadata';
import srcsetwebp from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg?w=1344;672&webp&srcset';
import srcsetauto from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg?w=1344;672&jpeg&srcset';
import ogImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg';
import ogSquareImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg';
import twitterImage from '$lib/assets/blog/napi_performance_driven_development_part_1/napi_performance.jpeg';
const { height, src, width } = meta;
const data = {
  slug: 'napi_performance_driven_development_part_1',
  alt: 'Depiction of the bidirectional flow of data from Javascript to C++ and vice versa.',
  width,
  height,
  src,
  sources: [
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#f8f8f8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEH/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//aAAwDAQACEAMQAAAA0ejB/8QAGhABAQACAwAAAAAAAAAAAAAAAQIAAxEiMf/aAAgBAQABPwB0sLsm6UHrSs5N7mZUjlB9c//EABcRAQADAAAAAAAAAAAAAAAAAAEAAhH/2gAIAQIBAT8AoGT/xAAWEQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMBAT8A2o3/2Q==',
  ogImage,
  ogSquareImage,
  twitterImage,
};
export { data as default };
