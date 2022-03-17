<script>
	import Area from './templates/Area.svelte';
	// import Bar from './templates/Bar.svelte';
	import Chord from './templates/Chord.svelte';
	// import Choropleth from './templates/Choropleth.svelte';
	// import CirclePack from './templates/CirclePack.svelte';
	// import Line from './templates/Line.svelte';
	// import Pie from './templates/Pie.svelte';
	// import RadialStacked from './templates/RadialStacked.svelte';
	// import Scatter from './templates/Scatter.svelte';

  export let slug,
    chartData;

  // console.log('ChartDisplay slug and chartData', slug, chartData)

  const chartComponents = {
    area: Area,
    // bar: Bar,
    chord: Chord,
    // choropleth: Choropleth,
    // circlePack: CirclePack,
    // line: Line,
    // pie: Pie,
    // radialStacked: RadialStacked,
    // scatter: Scatter
  }

  const selectedChart = chartComponents[slug];
  </script>

  <svelte:component this={selectedChart} {chartData} />