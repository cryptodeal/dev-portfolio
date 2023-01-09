import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url }) => {
	const { slug } = params;
  const { pathname } = url;

	const postPromise = import(`../../../content/blog/${slug}/index.md`);
  console.log(pathname)
  const pathSplit = pathname.split('/');
  const imageDataPromise = import(`../../../lib/generated/posts/${pathSplit[pathSplit.length-1]}.ts`);
	const pagePromise = import(`../../../content/blog/${slug}/index.md`);

	const [postResult, imageDataResult, pageResult] = await Promise.all([
		postPromise,
		imageDataPromise,
		pagePromise,
	]);
	const { default: body, metadata } = postResult;
  const { default: imageData } = imageDataResult;
	const { default: page } = pageResult;

	if (!body) {
		return {
			status: 404,
		};
	}

	const {
		datePublished,
		featuredImage,
		featuredImageAlt,
		ogImage,
		ogSquareImage,
		postTitle,
		seoMetaDescription,
		twitterImage,
	} = metadata;

	return {
		post: {
			datePublished,
			featuredImage,
			featuredImageAlt,
			ogImage,
			ogSquareImage,
			postTitle,
			seoMetaDescription,
			twitterImage,
			slug,
			body,
		},
		slug,
		imageData,
		page,
	};
}