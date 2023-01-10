<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Twitter from '~icons/akar-icons/twitter-fill';
	import Github from '~icons/akar-icons/github-fill';
	// import { webVitals } from '$lib/webvitals';
	import { afterNavigate } from '$app/navigation';
	import { themeChange } from 'theme-change';
	import { page } from '$app/stores';
	import { getNotificationsStore } from '$lib/stores/notifs';
	import Nav from '$lib/ux/nav/Navbar.svelte';
	import SideNav from '$lib/ux/nav/SideNav.svelte';
	import Toast from '$lib/ux/Toast.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	setContext('isSigVisible', writable(false));

	// export let path: string;

	getNotificationsStore();
	let drawercontent: { scrollTop: number },
		drawerContentScrollY = 0,
		drawersidebar: { scrollTop: number },
		drawerSidebarScrollY = 0,
		checked: boolean = '' as unknown as boolean,
		// analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string,
		segment: string;

	page.subscribe((page) => {
		const tempPage = page.url.pathname;
		//path = tempPage;
		segment = tempPage.split('/')[1];
	});

	function parseContentScroll() {
		drawerContentScrollY = drawercontent.scrollTop;
	}

	function parseSidebarScroll() {
		drawerSidebarScrollY = drawersidebar.scrollTop;
	}

	function closeDrawer() {
		checked = '' as unknown as boolean;
	}

	onMount(() => {
		themeChange(false);
		parseContentScroll();
		parseSidebarScroll();
		// if (analyticsId) webVitals({ path, analyticsId });
	});

	afterNavigate(() => {
		drawercontent.scrollTop = 0;
	});
</script>

<svelte:head>
	<script>
		(function () {
			/* return if SSR */
			if (typeof document === 'undefined') return;
			const theme = localStorage.getItem('theme');
			if (
				theme === 'night' ||
				(!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.setAttribute('data-theme', 'night');
				localStorage.setItem('theme', 'night');
			} else {
				document.documentElement.setAttribute('data-theme', 'winter');
				localStorage.setItem('theme', 'winter');
			}
		})();
	</script>
</svelte:head>

<div class="drawer">
	<label for="navDrawer" />
	<input id="navDrawer" type="checkbox" class="drawer-toggle" bind:checked />
	<div
		bind:this={drawercontent}
		on:scroll={parseContentScroll}
		class="drawer-content flex flex-col"
		style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
	>
		<Nav {segment} {closeDrawer} {drawerContentScrollY} />
		<div class="p-6 pb-24">
			<slot />
		</div>

		<footer class="fixed bottom-0 footer gap-y-1 items-center p-2 bg-base-300 text-base-content">
			<div class="items-center grid-flow-col">
				<p>Copyright © 2023 - All right reserved by James Deal</p>
			</div>
			<div class="grid-flow-col justify-self-center gap-4 md:place-self-center md:justify-self-end">
				<a href="https://twitter.com/jamespdeal" rel="nofollow noopener noreferrer" target="_blank">
					<Twitter class="w-6 h-6 fill-current" />
				</a>
				<a href="https://github.com/cryptodeal" rel="nofollow noopener noreferrer" target="_blank">
					<Github class="w-6 h-6 fill-current" />
				</a>
			</div>
		</footer>
	</div>
	<div
		class="drawer-side"
		style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
		bind:this={drawersidebar}
		on:scroll={parseSidebarScroll}
	>
		<label for="navDrawer" class="drawer-overlay" />
		<aside class="bg-base-200 w-80">
			<SideNav {closeDrawer} {segment} />
			<div
				class="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"
			/>
		</aside>
	</div>
</div>
<Toast />
