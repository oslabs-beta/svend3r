<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { setContext } from 'svelte';

	setContext('ChartList', [
		{title: 'Area Chart', slug: 'area'}, 
		{title: 'Bar Chart', slug: 'bar'},
		// {title: 'Bubble Chart', slug: 'bubble'},
		{title: 'Chord Diagram', slug: 'chord'},
		// {title: 'Choropleth', slug: 'choropleth'},
		// {title: 'Circle Packing', slug: 'circlePack'},
		// {title: 'Donut Chart', slug: 'donut'},
		// {title: 'Hexbin', slug: 'hexbin'},
		// {title: 'Line Chart', slug: 'line'},
		{title: 'Radial Stacked Bar Chart', slug: 'radialStacked'},
		// {title: 'Ridgeline Plot', slug: 'ridgeline'},
		// {title: 'Sankey Diagram', slug: 'sankey'},
		{title: 'Scatterplot', slug: 'scatter'},
		{title: 'Pie Chart', slug: 'pie'}
	]);
</script>

<div id="main-body" class='dark'>
	<div class="tablet:ml-[48px] grid grid-cols-24">
		<div class="col-start-2 col-span-22">
			<Header />
			<slot />
		</div>
	</div>
	<Sidebar />
</div>

<style>
	#main-body{
		background-color: #1E1E1E;
		width: 100vw;
		height: 100%;
		position: fixed;
	}

	@media (max-width: 900px) {
		#main-body{
			overflow: auto;
		}
	}
</style>
