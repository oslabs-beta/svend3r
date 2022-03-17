<script lang="ts">
	import '../app.css';
	import Icons from '$lib/components/Icons.svelte';
	import Header from '$lib/header/Header.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';

	export let dark = 'dark';
	// export let charts;
	
	const chartList = [{title: 'Bar Chart', slug: 'bar'}, {title: 'Area Chart', slug: 'area'}];
	
	// $: chartList = charts.map((chart) => ({
	// 	path: `/${chart.slug}`,
	// 	title: chart.title
	// }));
</script>

<Icons />

<div class:dark>
	<div class="grid grid-cols-12">
		<div class="col-start-2 col-span-10">
			<Header bind:dark />
			<slot />
		</div>
	</div>
	<Sidebar {chartList} />
</div>
