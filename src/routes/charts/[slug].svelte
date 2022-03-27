<script context="module">
  export const prerender = true;
  import imports from '$lib/charts/imports';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {   
    const component = await imports[params.slug]().component;
    const code = await imports[params.slug]().code;
    const data = await imports[params.slug]().data;
    const json = await imports[params.slug]().json;
    const { slug, title, schema, properties } = json
    
		return {
			props: {
        component: component.default,
        title: title,
        schema: schema,
        properties: properties,
        code: code.default,
        data: data.default
			}
		};
	}
</script>

<script>
  import CodeMirror from '$lib/charts/CodeMirror.svelte';
  import Properties from '$lib/charts/Properties.svelte';
  import { ChartDocs } from '$lib/charts/ChartStore';
  import { beforeUpdate } from 'svelte';

  export let component, 
    title,
    schema,
    properties,
    code,
    data;

  let ready = false;
  beforeUpdate(() => {
    ChartDocs.update(obj => []);
    properties.forEach((prop) => {
      ChartDocs.update(obj => ([...obj, prop]));
    });
    ready = true;
  })
</script>

<svelte:head>
	<title>{title} • Svend3r</title>
	<meta name="twitter:title" content="Svend3r Charts" />
	<meta name="twitter:description" content="{title} • Svend3r" />
	<meta name="Description" content="{title} • Svend3r" />
</svelte:head>

<div class="container">
  <h1 class="page-title">{title}</h1>
  <div class="chart-page">
      <div class="left-container">
          <div class="chart-render">
              {#if ready}
                <svelte:component this={component} />
              {/if}
          </div>
      </div>
      <div class="right-container">
        <div class="code-mirror">
          <CodeMirror {code} {data} {schema} />
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