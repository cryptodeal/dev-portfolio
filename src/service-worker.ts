// based on https://github.com/tretapey/svelte-pwa/blob/master/public/service-worker.js
import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

const worker = self;
// create unique cache name for deployment
const CACHE_NAME = `cache-${version}`;

const to_cache = [...build, ...files]; // build files and static files to cache

worker.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE_NAME);
		await cache.addAll(to_cache);
	}

	event.waitUntil(addFilesToCache());
});

worker.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE_NAME) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', async (event) => {
	if (event.request.method !== 'GET' || event.request.mode !== 'navigate') {
		return;
	}

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE_NAME);

		// `build`/`files` can always be served from the cache
		if (to_cache.includes(url.pathname)) {
			console.log('serving cached file');
			return cache.match(event.request);
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);
			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}
			console.log('serving live file');
			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	event.respondWith(respond());
});
