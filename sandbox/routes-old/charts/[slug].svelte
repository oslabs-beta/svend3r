<script context="module">
  // export const prerender = true;
  // import { CurrentChart } from '$lib/charts/CurrentChart';
  // import { ChartDocs } from '$lib/charts/ChartStore';
  // const imports = {
	// 	area: () => {
  //     const component = import('$lib/charts/templates/Area.svelte');
  //     const chartCode = import('$lib/charts/templates/Area.svelte?raw');
  //     const chartData = import('$lib/charts/data/line-data-multi?raw');
  //     return { 
  //       component: component,
  //       chartCode: chartCode,
  //       chartData: chartData
  //     }
  //   },
	// 	bar: (Data = '', raw = '') => import(`../../lib/charts/templates/Bar${Data}.svelte?${raw}`),
	// 	chord: (Data = '', raw = '') => import(`../../lib/charts/templates/Chord${Data}.svelte?${raw}`),
  //   radialStacked: (Data = '', raw = '') => import(`../../lib/charts/templates/RadialStacked${Data}.svelte?${raw}`)
	// };
  import imports from '$lib/charts/imports';
  // import { writable } from 'svelte/store';
	// TODO should use a shadow endpoint instead, need to fix a bug first
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		console.log('[slug].svelte load', params)
    const res = await fetch(`/charts/${params.slug}.json`);
		const chart = await res.json();
    
    // CurrentChart.update(obj => chart);
    // ChartDocs.update(obj => []);
    // chart.properties.forEach((prop) => {
    //   ChartDocs.update(obj => ([...obj, prop]));
    // })

    // console.log('slug properties', chart.properties)
    // const module = await imports[chart.slug]();
    // console.log('slug module', module.component);
    // const component = await module.component;
    // console.log('slug component', component.default);
    const component = await imports[params.slug]().component;
    const code = await imports[params.slug]().code;
    const data = await imports[params.slug]().data;
    const json = await imports[params.slug]().json;
    const { slug, title, schema, properties } = json
    console.log('slug imports', component.default, 'CODE', code.default, 'DATA', data.default, 'JSON', json.default);
    // const code = await imports[chart.slug]('', 'raw');
    // console.log('slug code', code.default);
    // const data = await imports[chart.slug]();
    // console.log('slug module', module.default);
    // const currentChart = writable(chart);
    // console.log('module loaded', chart);

    // CurrentChart.update(obj => chart);
    // ChartDocs.update(obj => []);
    // properties.forEach((prop) => {
    //   ChartDocs.update(obj => ([...obj, prop]));
    // })

		return {
			props: {
        component: component.default,
        slug: slug,
        title: title,
        schema: schema,
        properties: properties,
        code: code.default,
        data: data.default,
        json: json.default
			}
      // stuff: {
      //   currentChart
      // }
		};
	}
</script>

<script>
	// import { Icon } from '@sveltejs/site-kit';
	// import '@sveltejs/site-kit/code.css';
	// import '$lib/docs/client/docs.css';
	// import '$lib/docs/client/shiki.css';
	// import * as hovers from '$lib/docs/client/hovers.js';
  // hovers.setup();
	// import Store from '$lib/charts/Store.svelte';
  import StoreMaker from '$lib/charts/StoreMaker.svelte';
  import ChartDisplay from '$lib/charts/ChartDisplay.svelte';
  import CodeMirror from '$lib/charts/CodeMirror-future2.svelte';
  // import CodeMirror from '$lib/charts/CodeMirror.svelte';
  import Properties from '$lib/charts/Properties.svelte';
  // import { ChartDocs } from '$lib/charts/ChartStore';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  import { CurrentChart } from '$lib/charts/CurrentChart';
  import { ChartDocs } from '$lib/charts/ChartStore';
  import { beforeUpdate, onMount } from 'svelte';

  // ChartDocs.subscribe(console.log)
  // '= {}' makes the sidebar function
	export let chart;
  // let currentChart;
  // $: chart, (() => {
  //   currentChart = chart;
  // })
	// $: chart2 = {...chart};
  // console.log('[slug].svelte page', chart);

  // export let currentChart;

  // export let chart;
  // let currentChart = writable(chart);
  // $: currentChart.set(chart);
  // $: setContext('currentChart', currentChart);

  export let component,
    slug,  
    title,
    schema,
    properties,
    code,
    data,
    json;

  // beforeUpdate(() => {
  //   CurrentChart.update(obj => chart);
  //   ChartDocs.update(obj => []);
  //   chart.properties.forEach((prop) => {
  //     ChartDocs.update(obj => ([...obj, prop]));
  //   })
  // })
  let ready = false;
  beforeUpdate(() => {
    CurrentChart.update(obj => chart);
    ChartDocs.update(obj => []);
    properties.forEach((prop) => {
      ChartDocs.update(obj => ([...obj, prop]));
    });
    ready = true;
  })

  // if (directNav) {
  //   onMount(() => {
  //     CurrentChart.update(obj => chart);
  //     ChartDocs.update(obj => []);
  //     properties.forEach((prop) => {
  //       ChartDocs.update(obj => ([...obj, prop]));
  //     });
  //     ready = true;
  //   })
  // }
  


  // $: ({ slug, title, schema, properties } = json);
    // ChartDocs.update(obj => []);
    // properties.forEach((prop) => {
    //   ChartDocs.update(obj => ([...obj, prop]));
    // })
  // $: console.log('update', slug, title, chartData, schema, properties);
  // $: console.log(currentChart);
  
  // console.log('slug props', properties);
</script>

<svelte:head>
	<title>{title} • Svend3r</title>

	<meta name="twitter:title" content="Svend3r Charts" />
	<meta name="twitter:description" content="{title} • Svend3r" />
	<meta name="Description" content="{title} • Svend3r" />
</svelte:head>

<!-- <StoreMaker {properties} /> -->
<!-- <StoreMaker /> -->
<!-- {#if ready} -->
<div class="container">
  <h1 class="page-title">{title}</h1>
  <div class="chart-page">
      <div class="left-container">
          <div class="chart-render">
              <!-- <ChartDisplay {slug} {data} /> -->
              <!-- <ChartDisplay {chart} /> -->
              {#if ready}
                <svelte:component this={component} />
              {/if}
          </div>
      </div>
      <div class="right-container">
        <div class="code-mirror">
          <!-- <CodeMirror {slug} {data} /> -->
          <CodeMirror {code} {data} />
          <!-- <CodeMirror {slug} {chartData} {schema} /> -->
          <!-- <CodeMirror {chart} /> -->
        </div>
        <div class="chart-properties">
          <Properties />
        </div>
      </div>
  </div>
</div>
<!-- {/if} -->

<style>
  .container {
    background-color: #1E1E1E;
    width: fit-content;
    height: fit-content;
    margin: auto;
  }

  .page-title{
    color: rgba(255, 255, 255, 0.87);
    height: 5vh;
    font-family: 'Roboto', sans-serif;
    font-size: 2vw;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 1vw;
    
  }
  
  .chart-page{
    color: rgba(255, 255, 255, 0.87);
    display: flex;
    height: fit-content;
    width: fit-content;
  }
  
  .left-container {
    align-items: center;
    width:45vw; 
    height: 90vh;
  }

  .right-container {
    align-items: center;
    height: 90vh;
  }
  
  .chart-render {
    border-radius: 0.5vw;
    background-color: rgba(255, 255, 255, 0.87);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:40vw;
    height: 80vh;
    overflow: auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  
  .chart-properties{
    height: fit-content;
    width: 36vw;
  }
  
  @media all and (min-width:0px) and (max-width: 700px) {
  }
</style>