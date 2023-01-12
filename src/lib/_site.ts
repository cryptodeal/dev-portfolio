import {
	PUBLIC_CONTACT_EMAIL,
	PUBLIC_GITHUB_PAGE,
	PUBLIC_SITE_URL,
	PUBLIC_TWITTER_USERNAME,
	PUBLIC_TWITTER_USER_ID
} from '$env/static/public';

const website = {
	author: 'James Deal',
	ogLanguage: 'en_US',
	siteLanguage: 'en-US',
	siteTitle: 'James Deal | Dev Portfolio',
	siteShortTitle: 'JamesDeal.dev',
	description: 'James Deal | Developer portfolio, musings, write ups, and other assorted thoughts.',
	siteUrl: PUBLIC_SITE_URL,
	contactEmail: PUBLIC_CONTACT_EMAIL,
	githubPage: PUBLIC_GITHUB_PAGE,
	twitterUsername: PUBLIC_TWITTER_USERNAME,
	twitterUserId: PUBLIC_TWITTER_USER_ID
};

export { website as default };
