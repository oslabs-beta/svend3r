<script>
	import CodeArea from './templates/code/CodeArea.svelte';
	import CodeBar from './templates/code/CodeBar.svelte';
	import CodeChord from './templates/code/CodeChord.svelte';
	// import Choropleth from './templates/Choropleth.svelte';
	// import CirclePack from './templates/CirclePack.svelte';
	// import Line from './templates/Line.svelte';
	// import Pie from './templates/Pie.svelte';
	import CodeRadialStacked from './templates/code/CodeRadialStacked.svelte';
	// import Scatter from './templates/Scatter.svelte';

  export let slug,
    chartData,
    schema;

  // console.log('ChartDisplay slug and chartData', slug, chartData)

  const codeComponents = {
    area: CodeArea,
    bar: CodeBar,
    chord: CodeChord,
    // choropleth: Choropleth,
    // circlePack: CirclePack,
    // line: Line,
    // pie: Pie,
    radialStacked: CodeRadialStacked,
    // scatter: Scatter
  }

  $: selectedCode = codeComponents[slug];
  </script>

  <svelte:component this={selectedCode} {chartData} {schema} />