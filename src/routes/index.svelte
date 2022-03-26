<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	// import Github from '/images/github-dark.png';

	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';

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
<div id="home-page-layout" class="tablet:flex grid justify-center m-auto">
	<div id="card-container" class="w-fit tablet:w-[66vw] grid tablet:flex flex-wrap gap-x-10 tablet:justify-center h-full tablet:h-[82vh] my-8 overflow-auto mx-auto tablet:ml-4 tablet:mr-8">
		<!-- <img src="/bar.svg" alt="site logo"> -->
		{#each chartList as chartCard}
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
