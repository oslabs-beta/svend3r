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
