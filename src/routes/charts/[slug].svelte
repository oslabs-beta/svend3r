<script context="module">
  export const prerender = true;
  import imports from '$lib/charts/imports';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {   
    const component = await imports[params.slug]().component;
    const code = await imports[params.slug]().code;
    const data = await imports[params.slug]().data;
    const json = await imports[params.slug]().json;
    
		return {
			props: {
        component: component.default,
        code: code.default,
        data: data.default,
        json: json
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
    code,
    data,
    json;

  $: ({ title, createdBy, sourceText, sourceLink, schema, properties } = json);

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

<div class="chart_page_container">
  <h1 class="page-title">{title}</h1>
  <div class="chart-page">
    <div class="left-container">
      <!-- <h2>Created by: {createdBy}</h2> -->
      <h2>Source: <a href={sourceLink} target='_blank' rel='noopener noreferrer'>{sourceText}</a></h2>
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
  .chart_page_container {
    background-color: #1E1E1E;
    width: 100%;
    height: 100%;
  }

  .left-container{
    margin-bottom: 50px;
  }

  .page-title{
    color: rgba(255, 255, 255, 0.87);
    height: 5vh;
    font-family: 'Roboto', sans-serif;
    font-size: 38px;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 20px;
  }
  
  .chart-page{
    color: rgba(255, 255, 255, 0.87);
    display: flex;
    justify-content: space-evenly;
    height: fit-content;
    width: 100%;
  }
  
  .chart-render {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.87);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width:40vw;
    height: 77vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  
  .chart-properties{
    height: fit-content;
    width: 36vw;
  }
  
  @media (max-width: 900px) {
    .chart_page_container {
      height: fit-content;
    }
    .chart-page{
      color: rgba(255, 255, 255, 0.87);
      display: inline;
      justify-content: center;
    }

    .chart-render {
      width:100%;
      height: 87vw;
    }

    .chart-properties{
      width:100%;
    }

    .code-mirror{
      width: 100%;
    }

	}
</style>