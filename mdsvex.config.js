import abbr from 'remark-abbr';
import slug from 'rehype-slug';
import autoHeadings from 'rehype-autolink-headings';
import extLinks from 'rehype-external-links';

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool',
		quotes: true,
		ellipses: true
	},
	remarkPlugins: [abbr],
	rehypePlugins: [
		[extLinks, { rel: ['nofollow', 'noopener', 'noreferrer'] }],
		slug,
		[
			autoHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

export default config;
