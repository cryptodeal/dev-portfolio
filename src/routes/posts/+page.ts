import type { PageLoad } from './$types'

type PostMetadata = {
  datePublished: Date;
  lastUpdated: Date;
  postTitle: string;
  seoMetaDescription: string;
}

export const load: PageLoad = async () => {
	const mdModules = <Record<string, () => Promise<{ metadata: PostMetadata }>>>import.meta.glob('../../content/blog/**/index.md');
	const posts = (await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			const slug = <string>path.split('/').at(-2);
			const { metadata } = await mdModules[path]();
			const { datePublished, lastUpdated, postTitle, seoMetaDescription } = metadata;
			return { datePublished, lastUpdated, postTitle, seoMetaDescription, slug };
		}),
	)).filter(p => p.datePublished)
	return { posts };
}