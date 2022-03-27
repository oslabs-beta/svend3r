<script context="module">
  export async function load({ stuff }) {
    return {
      props: {
        currentChart: stuff.currentChart
      }
    }
  }
</script>

<script>
	import Area from './templates/Area.svelte';
	import Bar from './templates/Bar.svelte';
	import Chord from './templates/Chord.svelte';
	// import Choropleth from './templates/Choropleth.svelte';
	// import CirclePack from './templates/CirclePack.svelte';
	// import Line from './templates/Line.svelte';
	// import Pie from './templates/Pie.svelte';
	import RadialStacked from './templates/RadialStacked.svelte';
	// import Scatter from './templates/Scatter.svelte';

  import { CurrentChart } from '$lib/charts/CurrentChart';

  export let slug,
    chartData;

  const imports = {
		area: () => import('./templates/Area.svelte'),
		bar: () => import('./templates/Bar.svelte'),
		chord: () => import('./templates/Chord.svelte'),
    radialStacked: () => import('./templates/RadialStacked.svelte')
	};
  
  console.log('current store', $CurrentChart);
  // $: ({ slug, chartData } = $CurrentChart);
  
    // export let currentChart;
  // $: console.log('display', $currentChart);
  // $: ({ slug, chartData } = $currentChart);

  // console.log('ChartDisplay slug and chartData', slug, chartData)

  const chartComponents = {
    area: Area,
    bar: Bar,
    chord: Chord,
    // choropleth: Choropleth,
    // circlePack: CirclePack,
    // line: Line,
    // pie: Pie,
    radialStacked: RadialStacked,
    // scatter: Scatter
  }

  slug = 'chord';

  // $: selectedChart = chartComponents[slug];
  $: selectedChart = chartComponents[$CurrentChart.slug];
  $: console.log('selected', $CurrentChart.slug);
  </script>

  {#await imports[$CurrentChart.slug]() then module}
    <svelte:component this={module.default} {chartData} />
  {/await}

  <!-- <svelte:component this={selectedChart} {chartData} /> -->