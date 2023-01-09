<script lang="ts">
	import Pill from '$lib/ux/Pill.svelte';
	import Subtitle from '$lib/ux/Subtitle.svelte';
	import SectionTitle from '$lib/ux/SectionTitle.svelte';
	import Dates from '$lib/ux/Dates.svelte';
	import BulletedList from '$lib/ux/BulletedList.svelte';
	import { titles, content } from '$lib/_ResumeContent';
</script>

<div
	class="rounded-lg mx-auto h-full my-5 auto-rows-min grid py-5 gap-5 grid-cols-1 break-words md:gap-10 md:grid-cols-2"
>
	<SectionTitle title={titles.edu} />
	<div class="flex-col gap-2">
		<Subtitle title={content.edu.subtitle} />
		<Dates dates={content.edu.dates} />
		<BulletedList bulletItems={content.edu.info} />
	</div>

	<SectionTitle title={titles.skills} />
	<div class="flex-col gap-4">
		<Subtitle title={content.skills.lang.subtitle} />
		<div class="text-center w-3/4 inline-block md:text-left">
			{#each content.skills.lang.list as text}
				<Pill {text} />
			{/each}
		</div>

		<Subtitle title={content.skills.db.subtitle} />
		<div class="text-center w-3/4 inline-block md:text-left">
			{#each content.skills.db.list as text}
				<Pill {text} />
			{/each}
		</div>

		<Subtitle title={content.skills.libs.subtitle} />
		<div class="text-center w-3/4 inline-block md:text-left">
			{#each content.skills.libs.list as t}
				<Pill text={t[0]} href={t[1]} />
			{/each}
		</div>

		<Subtitle title={content.skills.graphics.subtitle} />
		<div class="text-center w-3/4 inline-block md:text-left">
			{#each content.skills.graphics.list as t}
				{#if Array.isArray(t)}
					<Pill text={t[0]} href={t[1]} />
				{:else}
					<Pill text={t} />
				{/if}
			{/each}
		</div>
	</div>

	<SectionTitle title={titles.exp} />
	<div class="flex-col gap-4">
		<div class="flex-col gap-2">
			<Subtitle
				title={content.exp.uw.subtitle.title}
				href={content.exp.uw.subtitle.href}
				role={content.exp.uw.subtitle.role}
			/>
			<Dates dates={content.exp.uw.dates} />
			<BulletedList bulletItems={content.exp.uw.info} />
		</div>

		<div class="flex-col gap-2">
			<Subtitle
				title={content.exp.reyReyPSC.subtitle.title}
				href={content.exp.reyReyPSC.subtitle.href}
				role={content.exp.reyReyPSC.subtitle.role}
			/>
			<Dates dates={content.exp.reyReyPSC.dates} />
			<BulletedList bulletItems={content.exp.reyReyPSC.info} />
		</div>

		<div class="flex-col gap-2">
			<Subtitle
				title={content.exp.coss.subtitle.title}
				href={content.exp.coss.subtitle.href}
				role={content.exp.coss.subtitle.role}
			/>
			<Dates dates={content.exp.coss.dates} />
			<BulletedList bulletItems={content.exp.coss.info} />
		</div>

		<div class="flex-col gap-2">
			<Subtitle
				title={content.exp.reyReyIT.subtitle.title}
				href={content.exp.reyReyIT.subtitle.href}
				role={content.exp.reyReyIT.subtitle.role}
			/>
			<Dates dates={content.exp.reyReyIT.dates} />
			<BulletedList bulletItems={content.exp.reyReyIT.info} />
		</div>
	</div>
</div>
