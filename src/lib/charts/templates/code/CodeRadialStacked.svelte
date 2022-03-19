<script>
  import Prism from 'prismjs';
  import { ChartDocs } from '../../ChartStore';

  export let chartData;
  export let schema;

  $: code = `<script>
  import * as d3 from "d3";
  import { sampleData } from "./sampleData.js"; //import your custom dataset
   
  let data = sampleData;
  let width = ${$ChartDocs[1].value}; //the width of the inner radius inversed, in pixels
  let height = width; //the outer height of the chart, in pixels
  let innerRadius = ${$ChartDocs[2].value}; //the radius of the inner circle, in pixels
  let colorRange = [${"'" + $ChartDocs[3].value.join("','") + "'"}]; //the fill colors for each bar stack.  The colorRange array length  MUST match number of datasets
  let chartScale = ${$ChartDocs[4].value}; //the scale factor from the center
  let sorted = ${$ChartDocs[5].value}; //the boolean value for if the dataset is sorted
  let varFontSize = ${$ChartDocs[6].value}; //the font size of all text on the chart, in pixels
  let tickColor = "${$ChartDocs[7].value}"; //the color of the inner radius ticks
  let ringColor = "${$ChartDocs[8].value}"; //the color of the scale rings
  let scaleColor = "${$ChartDocs[9].value}"; //the color of the scale text
  let scaleStroke = "${$ChartDocs[10].value}"; //the color of the scale text background/stroke
  let rectLength = ${$ChartDocs[11].value}; //the width of the color legend key, in pixels
    
  let outerRadius = Math.min(width, height) * chartScale;

  if(sorted === true) {
    data = data.sort((a, b) => b.total - a.total)
  }
  
  data.columns = Object.keys(sampleData[0]).slice(0,-1);

  let arc = d3.arc()
      .innerRadius(d => y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.State))
      .endAngle(d => x(d.data.State) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius)

  let x = d3.scaleBand()
      .domain(data.map(d => d.State))
      .range([0, 2 * Math.PI])
      .align(0)

  let y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])

  let z = d3.scaleOrdinal()
      .domain(data.columns.slice(1))
      .range(colorRange)
<\/script>

  <svg class="radial-chart" viewBox="{-width / 2} {-height * chartScale} {width} {height}" font-size="{varFontSize}px">
    <g class="chart-render">
      {#each d3.stack().keys(data.columns.slice(1))(data) as cData}
        <g fill={z(cData.key)}>
          {#each cData as d}
            <path d={arc(d)}></path>
          {/each}
        </g>
      {/each}
    </g>
    <g class="x-axis" text-anchor="middle">
      {#each data as d}
        <g transform="
        rotate({((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        translate({innerRadius},0)
      ">
        <line x2="-5" stroke={tickColor}></line>
        <text transform={(x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
        ? "rotate(90) translate(0,16)"
        : "rotate(-90) translate(0,-9)"}>{d.State}</text>
        </g>
      {/each}
    </g>
    <g class="y-axis" text-anchor="end">
      <text x ="-6" y={-y(y.ticks(10).pop())} dy="-1em">Population</text>
      {#each y.ticks(10).slice(1) as ydata}
        <g fill="none" ytick={y.ticks(10).slice(1)}>
          <circle stroke={ringColor} stroke-opacity="0.5" r={y(ydata)}></circle>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke={scaleStroke} stroke-width="5" fill={scaleColor}>{ydata}</text>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke="none" stroke-width="5" fill={scaleColor}>{ydata}</text>
        </g>
      {/each}
    </g>
    <g class='legend'>
      {#each data.columns.slice(1).reverse() as lData, i}
        <g transform="translate(-40,{(i - (data.columns.length - 1) / 2) * 20})">
          <rect width={rectLength} height="18" fill={z(lData)}></rect>
          <text x="24" y="9" dy="0.35em">{lData}</text>
        </g>
      {/each}
    </g>
  </svg>

<style>

</style>
`;

  function showCode(id) {
    let idArr = ['page1', 'page2', 'page3'];
    for(let i = 0; i < idArr.length; i++) {
      if(id === idArr[i]) {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'block';
        document.getElementById(`${idArr[i]}`).style.opacity = "100%"
      } else {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'none';
        document.getElementById(`${idArr[i]}`).style.opacity = "50%"
      }
    }
	}
</script>

<div class="data-schema-container">
  <h1 class="section-title">Chart Data Schema</h1>
</div>
<div class="code-mirror">
<button class="page_selected" id="page1" on:click={() => showCode('page1')}>
  <section class="button-text_icon">
  <img class="codeMirror-icon" id="page1" alt="svend3r d3 chart code" src='/codeMirror/code.png'>
  Code</section>
</button><!--
--><button class="page_selected" id="page2" on:click={() => showCode('page2')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/data.png'>
    Data</section>
</button><!--
--><button class="page_selected" id="page3" on:click={() => showCode('page3')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/schema.png'>
    Data Schema</section>
</button>

<pre id="page1_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
		><!--
     -->{@html Prism.highlight(code, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
		><!--
     -->{@html Prism.highlight(chartData, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page3_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
		><!--
     -->{@html Prism.highlight(schema, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>
</div>

<style>
  .section-title{
    font-family: 'Roboto', sans-serif;
    font-size: 1.5vw;
    margin-bottom: 0.5vw;
  }

	.codeMirror {
		white-space: pre-wrap;
		padding: 1vw 0 0 1vw;
    min-height: 31vh;
    outline: none;
	}

  .code-mirror {
    background-color: #2D2D2D;
    border-radius: 0.5vw;
    width: 36vw;
    height: 35vh;
    margin-bottom: 1vw;
    overflow: auto;
  }

	#page2_desc, #page3_desc {
		display: none;
	}

	.page_selected {
		width: 33.33%;
		height: 9%;
		border-style: none;
		border-radius: 0;
		background-color: #494949;
		color: rgba(255, 255, 255, 0.87);
	}

	#page2, #page3 {
		border-left: #1e1e1e;
		border-left-width: 2px;
		border-left-style: solid;
    opacity: 50%;
	}

  #page1:hover, #page2:hover, #page3:hover {
    opacity: 100%;
  }

	.page_selected:hover {
		background-color: #1e1e1e;
		color: rgba(255, 255, 255, 0.87);
	}

  .codeMirror-icon {
    width: 8%;
    height: 8%;
    margin-right: 3%;
    margin-top: auto;
    margin-bottom: auto;
  }

  .button-text_icon{
    display: flex;
    justify-content: center;
  }

  .code-mirror::-webkit-scrollbar {
      display: none;
  }

  .codeMirror::-webkit-scrollbar {
      display: none;
  }

</style>
