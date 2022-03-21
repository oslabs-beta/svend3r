<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import ChartCardRow from '$lib/components/ChartCardRow.svelte';
	// import Github from '/images/github-dark.png';
	
	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';

	const chartList = [
		{title: 'Area Chart', icon: 'area'}, 
		{title: 'Bar Chart', icon: 'bar'},
		{title: 'Bubble Chart', icon: 'bubble'},
		{title: 'Chord Diagram', icon: 'chord'},
		{title: 'Choropleth', icon: 'choropleth'},
		{title: 'Circle Packing', icon: 'circlePack'},
		{title: 'Donut Chart', icon: 'donut'},
		{title: 'Hexbin', icon: 'hexbin'},
		{title: 'Line Chart', icon: 'line'},
		{title: 'Radial Stacked Bar Chart', icon: 'radialStacked'},
		{title: 'Ridgeline Plot', icon: 'ridgeline'},
		{title: 'Sankey Diagram', icon: 'sankey'},
		{title: 'Scatterplot', icon: 'scatter'},
		{title: 'Pie Chart', icon: 'pie'}
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
<div id="card-container" class="h-4/6 mt-8 overflow-auto ml-12">
	<!-- <img src="/bar.svg" alt="site logo"> -->
	<div class="mb-8">
		<ChartCardRow
			chartCards={[chartList[0], chartList[1], chartList[2], chartList[3]]}
		/>
	</div>
	<div class="mb-8">
		<ChartCardRow
			chartCards={[chartList[4], chartList[5], chartList[6], chartList[7]]}
		/>
	</div>
	<div class="mb-8">
		<ChartCardRow
			chartCards={[chartList[8], chartList[9], chartList[10], chartList[11]]}
		/>
	</div>
	<div class="mb-1">
		<ChartCardRow
			chartCards={[chartList[12], chartList[13]]} 
		/>
	</div>
</div>

<style>

#card-container::-webkit-scrollbar {
      display: none;
}

</style>
