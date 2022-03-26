<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import ChartCardRow from '$lib/components/ChartCardRow.svelte';
	// import Github from '/images/github-dark.png';

	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';

	const string = [
    [0.096899, 0.008859, 0.000554, 0.00443, 0.025471, 0.024363, 0.005537, 0.025471],
    [0.001107, 0.018272, 0, 0.004983, 0.011074, 0.01052, 0.002215, 0.004983],
    [0.000554, 0.002769, 0.002215, 0.002215, 0.003876, 0.008306, 0.000554, 0.003322],
    [0.000554, 0.001107, 0.000554, 0.012182, 0.011628, 0.006645, 0.004983, 0.01052],
    [0.002215, 0.00443, 0, 0.002769, 0.104097, 0.012182, 0.004983, 0.028239],
    [0.011628, 0.026024, 0, 0.013843, 0.087486, 0.168328, 0.017165, 0.055925],
    [0.000554, 0.004983, 0, 0.003322, 0.00443, 0.008859, 0.017719, 0.00443],
    [0.002215, 0.007198, 0, 0.003322, 0.016611, 0.01495, 0.001107, 0.054264]
  ];

  console.log(JSON.stringify(string));

	const chartList = [
		{ title: 'Area Chart', icon: 'area' },
		{ title: 'Bar Chart', icon: 'bar' },
		{ title: 'Bubble Chart', icon: 'bubble' },
		{ title: 'Chord Diagram', icon: 'chord' },
		{ title: 'Choropleth', icon: 'choropleth' },
		{ title: 'Circle Packing', icon: 'circlePack' },
		{ title: 'Donut Chart', icon: 'donut' },
		{ title: 'Hexbin', icon: 'hexbin' },
		{ title: 'Line Chart', icon: 'line' },
		{ title: 'Radial Stacked Bar Chart', icon: 'radialStacked' },
		{ title: 'Ridgeline Plot', icon: 'ridgeline' },
		{ title: 'Sankey Diagram', icon: 'sankey' },
		{ title: 'Scatterplot', icon: 'scatter' },
		{ title: 'Pie Chart', icon: 'pie' }
	];
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
<div id="home-page-layout" class="grid grid-cols-24">
	<div id="card-container" class="col-start-1 col-span-18 h-[82vh] my-8 overflow-auto ml-4">
		<!-- <img src="/bar.svg" alt="site logo"> -->
		<div class="mb-8">
			<ChartCardRow chartCards={[chartList[0], chartList[1], chartList[2], chartList[3]]} />
		</div>
		<div class="mb-8">
			<ChartCardRow chartCards={[chartList[4], chartList[5], chartList[6], chartList[7]]} />
		</div>
		<div class="mb-8">
			<ChartCardRow chartCards={[chartList[8], chartList[9], chartList[10], chartList[11]]} />
		</div>
		<div class="mb-1">
			<ChartCardRow chartCards={[chartList[12], chartList[13]]} />
		</div>
	</div>
	<div class="grid col-start-19 col-span-6 bg-code-gray my-8 mx-3 h-[82vh] rounded-lg">
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-[1.25vw] text-white87">How to get Started</h1>
			<p class="text-sm text-grey119 text-justify">
				<b>Svend3r (or svend3r.js)</b> is your go-to Svelte data visuaization charting library with easy
				to use pre-built modular components. Svend3r components provides beautiful graphics from the
				D3 powerhouse, but without the imperative style code. Instead Svend3r provide your project with
				clean, easily adjustable, and declarative code complimented with D3 methods to help bring your
				data to life.
			</p>
		</section>
		<section id="info-sect" class="mx-4">
			<h1 class="text-[1.25vw] text-white87">Installation</h1>
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
		<section id="info-sect" class="mx-4">
			<h1 class="text-[1.25vw] text-white87">Exporting a Chart Component</h1>
			<p class="text-sm text-grey119 text-justify whitespace-pre-line">
				When we say Svend3r is 'plug and play' we truly mean it.

				<li>Navigate to any desired chart page</li>
				<li>Make sure to review the data schema to ensure conformity to your data set</li>
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
