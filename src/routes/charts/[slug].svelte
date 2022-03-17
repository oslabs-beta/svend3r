<script context="module">
	export const prerender = true;

	// TODO should use a shadow endpoint instead, need to fix a bug first
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		// console.log('[slug].svelte load', params)
    const res = await fetch(`/charts/${params.slug}.json`);
		const chart = await res.json();
    // console.log('module loaded', chart);
		return {
			props: {
				chart
			}
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

	export let chart;
	
  // console.log('[slug].svelte page', chart);

  const { slug, title, code, chartData, schema, properties } = chart;

</script>

<svelte:head>
	<title>{title} • Svend3r</title>

	<meta name="twitter:title" content="Svend3r Charts" />
	<meta name="twitter:description" content="{title} • Svend3r" />
	<meta name="Description" content="{title} • Svend3r" />
</svelte:head>

<StoreMaker {properties} />
<div class="container">
  <h1 class="page-title">{title}</h1>
  <div class="chart-page">
      <div class="code-container">
          <div class="chart-render">
              <ChartDisplay {slug} {chartData} />
          </div>
          <div class="code-mirror">
              <CodeMirror {code} {chartData} />
          </div>
      </div>
      <div class="chart-properties">
          <Properties {schema} />
      </div>
  </div>
</div>

<style>
  .page-title{
    color: rgba(255, 255, 255, 0.87);
    height: 5%;
    text-align: center;
    text-decoration: underline;
  }
  
  .chart-page{
    color: rgba(255, 255, 255, 0.87);
    background-color: #1E1E1E;
    display: flex;
    height: fit-content;
    width: fit-content;
    margin: 0% 5% 0% 5%;
  }
  
  .code-container {
    align-items: center;
    width:45vw; 
    height: 95%;
  }
  
  .code-mirror {
    background-color: #2D2D2D;
    border-radius: 0.5vw;
    width:40vw;
    height: 35vh;
    margin-top: 2vw;
    overflow: auto;
  }
  
  .chart-render {
    background-color: rgba(255, 255, 255, 0.87);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width:40vw;
    height: 45vh;
  }
  
  .chart-properties{
    height: 83vh;
    width: 45vw;
    overflow: auto;
  }
  
  .chart-properties::-webkit-scrollbar {
      display: none;
  }
  
  .code-mirror::-webkit-scrollbar {
      display: none;
  }
  
  @media all and (min-width:0px) and (max-width: 700px) {
  }
</style>