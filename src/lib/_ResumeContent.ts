const titles = {
	edu: 'Education',
	skills: 'Skills',
	graphics: 'Graphics/Data Viz',
	stack: 'My Stack',
	exp: 'Experience'
};

const content = {
	edu: {
		subtitle: 'Texas A&M University',
		dates: 'AUG 2015 - DEC 2018, TX',
		info: [
			'BA in Philosophy',
			'Business Minor',
			'Undergraduate research in Philosophy (focusing on the Nietzschean concept of `ressentiment`)'
		]
	},
	skills: {
		lang: {
			subtitle: 'Languages',
			list: [`Javascript`, `Typescript`, `Golang`, `C++`, `Zig`]
		},
    db: {
      subtitle: 'Databases',
      list: [`SQL`, `NoSQL`, `Graph`]
    },
		libs: {
			subtitle: 'Frameworks/Libraries',
			list: [
				[`Svelte`, `https://svelte.dev/`],
				[`Sapper`, `https://sapper.svelte.dev/`],
				[`SvelteKit`, `https://kit.svelte.dev/`],
				[`TailwindCSS`, `https://tailwindcss.com/`],
				[`WindiCSS`, `https://windicss.org/`],
				[`Rollup`, `https://rollupjs.org`],
				[`Vite`, `https://vitejs.dev/`],
			]
		},
		graphics: {
			subtitle: 'Graphics/Data Viz',
			list: [
				[`Pancake`, `https://github.com/cryptodeal/pancake`],
				[`Layer Cake`, `https://layercake.graphics/`],
				[`D3.js`, `https://d3js.org/`],
				`SVG`
			]
		}
	},
	exp: {
		uw: {
			subtitle: {
				title: 'UnaliWear, Inc.',
				href: 'https://www.unaliwear.com/',
				role: 'UX/Customer Success'
			},
			dates: 'May 2020 - PRESENT, AUSTIN, TX',
			info: [
				'Fleshed out data aggregation pipelines to gather accelerometer data for on the wrist fall detection',
				'Oversaw 500% increase in month to month sales rate',
				'Wrote code to automate our workflow',
				'Worked with developers to create tools enabling us to better support our user base'
			]
		},
		reyReyPSC: {
			subtitle: {
				title: 'Reynolds and Reynolds',
				href: 'https://www.reyrey.com/',
				role: 'Software Consultant'
			},
			dates: 'DEC 2018 - MAY 2019, TX',
			info: [
				'Managed ~15 accounts with major car dealerships',
				'Resolved customer issues with the software',
				'Submitted bug reports to development team'
			]
		},
		coss: {
			subtitle: {
				title: 'Cryptocurrency One Stop Solution ($COSS)',
				href: 'https://www.coss.io/',
				role: 'Contract Developer'
			},
			dates: 'OCT 2018 - DEC 2018, REMOTE',
			info: [
				[
					'Contracted to write official Node.Js',
					['API wrapper', 'https://github.com/coss-exchange/trading-api-wrapper-node-js']
				],
				`Worked with COSS's backend head dev to flesh API requirements`,
				'Reported bugs/security vulnerabilities to dev team during beta testing under NDA'
			]
		},
		reyReyIT: {
			subtitle: {
				title: 'Reynolds and Reynolds',
				href: 'https://www.reyrey.com/',
				role: 'IT Consultant (Part Time)'
			},
			dates: 'OCT 2017 - DEC 2018, TX',
			info: [
				'Handled incoming calls and emails to provide IT support for contracted UK clients',
				'Dispatched an Engineer to manage the problem when appropriate'
			]
		}
	}
};

export { titles, content };