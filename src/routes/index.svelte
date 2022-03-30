<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import { getContext } from 'svelte';
	// import Github from '/images/github-dark.png';

	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';

	const string = {
		marginOffset: {
			variable: 'marginOffset',
			value: 100,
			dataType: 'Number',
			description: 'The margin top, bottom, left, right margin offset relative to the radius.',
			defaultValue: 100,
			min: 0,
			max: 180
		},
		width: {
			variable: 'width',
			value: 700,
			dataType: 'Number',
			description: 'The outer width of the chart, in pixels.',
			defaultValue: 800,
			min: 370,
			max: 1500
		},
		bandThickness: {
			variable: 'bandThickness',
			value: 10,
			dataType: 'Number',
			description: 'The thickness of the color band representing each dataset.',
			defaultValue: 10,
			min: 0,
			max: 100
		},
		fontSize: {
			variable: 'fontSize',
			value: 1,
			dataType: 'Number',
			description: 'The label font size relative to 1% of the width of the viewport.',
			defaultValue: 1,
			min: 0.1,
			max: 1
		},
		tickStep: {
			variable: 'tickStep',
			value: 1,
			dataType: 'Number',
			description: 'The chart label tick spread factor.',
			defaultValue: 1,
			min: 1,
			max: 5
		},
		scaleFormat: {
			variable: 'scaleFormat',
			value: '%',
			dataType: 'String',
			description: 'The format specifier string for the scale ticks.',
			defaultValue: '%'
		},
		names: {
			variable: 'names',
			value: [
				'Apple',  'HTC',
				'Huawei', 'LG',
				'Nokia',  'Samsung',
				'Sony',   'Other'
			],
			dataType: 'Array',
			description: 'The section labels for each dataset.',
			defaultValue: [
				'Apple',  'HTC',
				'Huawei', 'LG',
				'Nokia',  'Samsung',
				'Sony',   'Other'
			]
		},
		colors: {
			variable: 'colors',
			value: [
				'#c4c4c4', '#69b40f',
				'#ec1d25', '#c8125c',
				'#008fc8', '#10218b',
				'#134b24', '#737373'
			],
			dataType: 'Array',
			description: 'The fill colors for each section.  The length of colors MUST match names variable array.',
			defaultValue: [
				'#c4c4c4', '#69b40f',
				'#ec1d25', '#c8125c',
				'#008fc8', '#10218b',
				'#134b24', '#737373'
			]
		},
		chordOpacity: {
			variable: 'chordOpacity',
			value: 0.7,
			dataType: 'Number',
			description: 'The opacity for the charts overall chords.',
			defaultValue: 0.7,
			min: 0.1,
			max: 1
		},
		unselectOpacity: {
			variable: 'unselectOpacity',
			value: 0.1,
			dataType: 'Number',
			description: 'The opacity of non-select chart elements.',
			defaultValue: 0.1,
			min: 0.1,
			max: 1
		},
		selectOpacity: {
			variable: 'selectOpacity',
			value: 0.7,
			dataType: 'Number',
			description: 'The opacity of select chart elements.',
			defaultValue: 0.7,
			min: 0.1,
			max: 1
		},
		tooltipBackground: {
			variable: 'tooltipBackground',
			value: 'lightgrey',
			dataType: 'String | RGB | Hex',
			description: 'The background color of the tooltip.',
			defaultValue: 'lightgrey'
		},
		tooltipTextColor: {
			variable: 'tooltipTextColor',
			value: 'black',
			dataType: 'String | RGB | Hex',
			description: 'The text color of the tooltip.',
			defaultValue: 'black'
		}
	};

	const json = '[{"variable":"marginOffset","value":100,"dataType":"Number","description":"The margin top, bottom, left, right margin offset relative to the radius.","defaultValue":100,"min":0,"max":180},{"variable":"width","value":700,"dataType":"Number","description":"The outer width of the chart, in pixels.","defaultValue":800,"min":370,"max":1500},{"variable":"bandThickness","value":10,"dataType":"Number","description":"The thickness of the color band representing each dataset.","defaultValue":10,"min":0,"max":100},{"variable":"fontSize","value":1,"dataType":"Number","description":"The label font size relative to 1% of the width of the viewport.","defaultValue":1,"min":0.1,"max":1},{"variable":"tickStep","value":1,"dataType":"Number","description":"The chart label tick spread factor.","defaultValue":1,"min":1,"max":5},{"variable":"scaleFormat","value":"%","dataType":"String","description":"The format specifier string for the scale ticks.","defaultValue":"%"},{"variable":"names","value":["Apple","HTC","Huawei","LG","Nokia","Samsung","Sony","Other"],"dataType":"Array","description":"The section labels for each dataset.","defaultValue":["Apple","HTC","Huawei","LG","Nokia","Samsung","Sony","Other"]},{"variable":"colors","value":["#c4c4c4","#69b40f","#ec1d25","#c8125c","#008fc8","#10218b","#134b24","#737373"],"dataType":"Array","description":"The fill colors for each section.  The length of colors MUST match names variable array.","defaultValue":["#c4c4c4","#69b40f","#ec1d25","#c8125c","#008fc8","#10218b","#134b24","#737373"]},{"variable":"chordOpacity","value":0.7,"dataType":"Number","description":"The opacity for the charts overall chords.","defaultValue":0.7,"min":0.1,"max":1},{"variable":"unselectOpacity","value":0.1,"dataType":"Number","description":"The opacity of non-select chart elements.","defaultValue":0.1,"min":0.1,"max":1},{"variable":"selectOpacity","value":0.7,"dataType":"Number","description":"The opacity of select chart elements.","defaultValue":0.7,"min":0.1,"max":1},{"variable":"tooltipBackground","value":"lightgrey","dataType":"String | RGB | Hex","description":"The background color of the tooltip.","defaultValue":"lightgrey"},{"variable":"tooltipTextColor","value":"black","dataType":"String | RGB | Hex","description":"The text color of the tooltip.","defaultValue":"black"}]';

  console.log(JSON.stringify(string));
	console.log(JSON.parse(json));

	// const chartList = [
	// 	{ title: 'Area Chart', icon: 'area' },
	// 	{ title: 'Bar Chart', icon: 'bar' },
	// 	{ title: 'Bubble Chart', icon: 'bubble' },
	// 	{ title: 'Chord Diagram', icon: 'chord' },
	// 	{ title: 'Choropleth', icon: 'choropleth' },
	// 	{ title: 'Circle Packing', icon: 'circlePack' },
	// 	{ title: 'Donut Chart', icon: 'donut' },
	// 	{ title: 'Hexbin', icon: 'hexbin' },
	// 	{ title: 'Line Chart', icon: 'line' },
	// 	{ title: 'Radial Stacked Bar Chart', icon: 'radialStacked' },
	// 	{ title: 'Ridgeline Plot', icon: 'ridgeline' },
	// 	{ title: 'Sankey Diagram', icon: 'sankey' },
	// 	{ title: 'Scatterplot', icon: 'scatter' },
	// 	{ title: 'Pie Chart', icon: 'pie' }
	// ];
	// export let chartList;
	const ChartList = getContext('ChartList');
	console.log('chartList', ChartList);
</script>

<svelte:head>
	<title>Svend3r</title>
	<html lang="en-US" />
</svelte:head>

<!-- <Github /> -->
<!-- <Icon name='bar' size={80} /> -->
<!-- <img src='/icons/bar.svg'  width='100px'> -->
<!-- <img src='/images/github-dark.png' alt='github'> -->
<!-- <img src={github} alt='github'> -->
<!-- <img src='$img/github-dark.png' alt='github'> -->
<div id="home-page-layout" class="tablet:flex grid justify-center m-auto">
	<div id="card-container" class="w-fit tablet:w-[66vw] grid tablet:flex flex-wrap gap-x-10 tablet:justify-center h-full tablet:h-[82vh] my-8 overflow-auto mx-auto tablet:ml-4 tablet:mr-8">
		<!-- <img src="/bar.svg" alt="site logo"> -->
		{#each ChartList as chartCard}
		<div class="mb-8 ">
			<Card chartCard={chartCard} />
		</div>
		{/each}
	</div>
	<div id="card-container" class="grid content-between w-[80vw] tablet:w-[400px] min-w-[300px] bg-code-gray my-8 mx-3 tablet:h-[82vh] overflow-auto rounded-lg shadow-3xl ">
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-2xl text-white87">How to get Started</h1>
			<p class="text-sm text-grey119 text-justify">
				<b>Svend3r (or svend3r.js)</b> is your go-to Svelte data visuaization charting library with easy
				to use pre-built modular components. Svend3r components provides beautiful graphics from the
				D3 powerhouse, but without the imperative style code. Instead Svend3r provide your project with
				clean, easily adjustable, and declarative code complimented with D3 methods to help bring your
				data to life.
			</p>
		</section>
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-2xl text-white87">Installation</h1>
			<p class="text-sm text-grey119 text-justify ">
				If you have previously installed Svend3r, please run the following command below before preceeding:
				<br>
				<code class="text-white87 bg-grey119">npm rm -global svend3r</code>
				<br>
				<br>
				First be sure you have <a class="text-white87" href="https://svelte.dev/">Svelte</a>
				installed. 
				<br>
				<br>
				If you use npm,
				<br>
				<code class="text-white87 bg-grey119">npm install svend3r</code> and
				<code class="text-white87 bg-grey119">npm install d3</code>.
			</p>
		</section>
		<section id="info-sect" class="mx-4 my-4">
			<h1 class="text-2xl text-white87">Exporting a Chart Component</h1>
			<p class="text-sm text-grey119 text-justify whitespace-pre-line">
				When we say Svend3r is 'plug and play' we truly mean it.

				<li>Navigate to any desired chart page</li>
				<li>Review the data schema to ensure conformity to your data set</li>
				<li>Update the adjustable properties to your desired taste (or do that later)</li>
				<li>
					Create a new svelte file and js file for your component and data respectively in your project directory
				</li>
				<li>Paste in code from the Code tab into your newly created svelte component file</li>
				<li>Paste in code from the Data tab into your newly created js file</li>
				<li>Validate or update import statement in the component file to the data file location</li>
			</p>
		</section>
	</div>
</div>

<style>
	#card-container::-webkit-scrollbar {
		display: none;
	}

	li {
		text-indent: -20px; /* key property */
		margin-left: 20px; /* key property */
	}
</style>
