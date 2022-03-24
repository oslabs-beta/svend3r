module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'regal-blue': '#243c5a',
				'code-gray': '#494949',
				'white87': 'rgba(255, 255, 255, 0.87)',
				'grey119': '#888888',
				'bgGrey': '#343434',
			  },
			gridTemplateColumns: {
				// Simple 16 column grid
				'16': 'repeat(16, minmax(0, 1fr))',
				'24': 'repeat(24, minmax(0, 1fr))',
			},
			gridColumn: {
				'span-14': 'span 14 / span 14',
				'span-15': 'span 15 / span 15',
				'span-16': 'span 16 / span 16',
				'span-17': 'span 17 / span 17',
				'span-18': 'span 18 / span 18',
				'span-19': 'span 19 / span 19',
				'span-20': 'span 20 / span 20',
				'span-21': 'span 21 / span 21',
				'span-22': 'span 22 / span 22',
				'span-23': 'span 23 / span 23',
				'span-24': 'span 24 / span 24',
			},
		}
	},
	plugins: [require('flowbite/plugin')]
};
