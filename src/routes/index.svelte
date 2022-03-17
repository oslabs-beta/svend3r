<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';
	import ChartsDisplay from '$lib/chartsDisplay/ChartsDisplay.svelte';
	import Icon from '$lib/components/Icon.svelte';
import ColumnChart from './columnChart.svelte';
	// import Github from '/images/github-dark.png';
	
	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';

	const chartList = [
		{title: 'Area Chart', icon: 'area-main'}, 
		{title: 'Bar Chart', icon: 'bar-main'},
		{title: 'Bubble Chart', icon: 'bubble-main'},
		{title: 'Chord Diagram', icon: 'chord-main'},
		{title: 'Choropleth', icon: 'choropleth-main'},
		{title: 'Circle Packing', icon: 'circlePack-main'},
		{title: 'Donut Chart', icon: 'donut-main'},
		{title: 'Hexbin', icon: 'hexbin-main'},
		{title: 'Line Chart', icon: 'line-main'},
		{title: 'Radial Stacked Bar Chart', icon: 'radialStacked-main'},
		{title: 'Ridgeline Plot', icon: 'ridgeline-main'},
		{title: 'Sankey Diagram', icon: 'sankey-main'},
		{title: 'Scatterplot', icon: 'scatter-main'}
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
<div class="grid grid-rows-4 gap-8 text-white">
	<!-- <img src="/bar.svg" alt="site logo"> -->
	<div>
		<ChartsDisplay
			chartCards={[chartList[0], chartList[1], chartList[2], chartList[3]]}
		/>
	</div>
	<div>
		<ChartsDisplay
			chartCards={[chartList[4], chartList[5], chartList[6], chartList[7]]}
		/>
	</div>
	<div>
		<ChartsDisplay
			chartCards={[chartList[8], chartList[9], chartList[10], chartList[11]]}
		/>
	</div>
	<div>
		<ChartsDisplay
			chartCards={[chartList[12]]}
		/>
	</div>
</div>
