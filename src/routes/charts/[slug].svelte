<script context="module">
  export const prerender = false;
  import { CurrentChart } from '$lib/charts/CurrentChart';
  import { ChartDocs } from '$lib/charts/ChartStore';
  // import { writable } from 'svelte/store';
	// TODO should use a shadow endpoint instead, need to fix a bug first
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		// console.log('[slug].svelte load', params)
    const res = await fetch(`/charts/${params.slug}.json`);
		const chart = await res.json();
    CurrentChart.update(obj => chart);
    ChartDocs.update(obj => []);
    chart.properties.forEach((prop) => {
      ChartDocs.update(obj => ([...obj, prop]));
    })
    console.log('slug module', chart.properties)
    // const currentChart = writable(chart);
    // console.log('module loaded', chart);
		return {
			props: {
				chart
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
  import CodeMirror from '$lib/charts/CodeMirror.svelte';
  import Properties from '$lib/charts/Properties.svelte';
  // import { ChartDocs } from '$lib/charts/ChartStore';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

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


  $: ({ slug, title, code, chartData, schema, properties } = chart);
    // ChartDocs.update(obj => []);
    // properties.forEach((prop) => {
    //   ChartDocs.update(obj => ([...obj, prop]));
    // })
  // $: console.log('update', $currentChart, slug, title, chartData, schema, properties);
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
<div class="container">
  <h1 class="page-title">{title}</h1>
  <div class="chart-page">
      <div class="left-container">
          <div class="chart-render">
              <ChartDisplay {slug} {chartData} />
              <!-- <ChartDisplay {chart} /> -->
          </div>
      </div>
      <div class="right-container">
        <div class="code-mirror">
          <!-- <CodeMirror {code} {chartData} /> -->
          <CodeMirror {slug} {chartData} {schema} />
          <!-- <CodeMirror {chart} /> -->
        </div>
        <div class="chart-properties">
          <Properties />
        </div>
      </div>
  </div>
</div>

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
  
  /* .code-mirror {
    border-radius: 0.5vw;
    width: 36vw;
    height: 35vh;
    margin-bottom: 1vw;
  } */
  
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
  }
  
  .chart-properties{
    height: fit-content;
    width: 36vw;
  }
  
  @media all and (min-width:0px) and (max-width: 700px) {
  }
</style>