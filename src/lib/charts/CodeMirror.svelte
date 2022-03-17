<script>
	import CodeArea from './templates/code/CodeArea.svelte';
	// import Bar from './templates/Bar.svelte';
	import CodeChord from './templates/code/CodeChord.svelte';
	// import Choropleth from './templates/Choropleth.svelte';
	// import CirclePack from './templates/CirclePack.svelte';
	// import Line from './templates/Line.svelte';
	// import Pie from './templates/Pie.svelte';
	// import RadialStacked from './templates/RadialStacked.svelte';
	// import Scatter from './templates/Scatter.svelte';

  export let slug,
    chartData;

  // console.log('ChartDisplay slug and chartData', slug, chartData)

  const codeComponents = {
    area: CodeArea,
    // bar: Bar,
    chord: CodeChord,
    // choropleth: Choropleth,
    // circlePack: CirclePack,
    // line: Line,
    // pie: Pie,
    // radialStacked: RadialStacked,
    // scatter: Scatter
  }

  const selectedCode = codeComponents[slug];
  </script>

  <svelte:component this={selectedCode} {chartData} />