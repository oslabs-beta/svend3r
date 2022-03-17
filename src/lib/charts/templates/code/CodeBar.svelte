<script>
  import Prism from 'prismjs';
  import { ChartDocs } from '../../ChartStore';

  export let chartData;

  $: code = `<script>
  import * as d3 from "d3";
  import {flip} from "svelte/animate"
  import { sampleData } from './sampleData.js'  //import your custom dataset

  let data = sampleData;
  let marginTop = ${$ChartDocs[1].value}; // the top margin, in pixels
  let marginRight = ${$ChartDocs[2].value}; // the right margin, in pixels
  let marginBottom = ${$ChartDocs[3].value}; // the bottom margin, in pixels
  let marginLeft = ${$ChartDocs[4].value}; // the left margin, in pixels
  let width = ${$ChartDocs[5].value}; // the outer width of the chart, in pixels
  let height = ${$ChartDocs[6].value}; // the outer height of the chart, in pixels
  let xPadding = ${$ChartDocs[7].value}; // amount of x-range to reserve to separate bars
  let yFormat = "${$ChartDocs[8].value}"; // a format specifier string for the y-axis
  let yLabel = "${$ChartDocs[9].value}"; // a label for the y-axis
  let color = "${$ChartDocs[10].value}"; // bar fill color
  let yScalefactor = ${$ChartDocs[11].value}; //y-axis number of values

  // Modify data based on default, ascending, descending sorts.  Input is based on selectedIndex
  $: showSort = (input) => {
    if (input === 1) {
      return (data = data.sort(
        (a, b) => a[x].charCodeAt(0) - b[x].charCodeAt(0)
      ));
    }
    if (input === 2) {
      return (data = data.sort((a, b) => a[y] - b[y]));
    }
    if (input === 3) {
      return (data = data.sort((a, b) => b[y] - a[y]));
    }
  };

  // Compute values X and Y value of Arrays
  let x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  let y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  $: X = data.map((el) => el[x]);
  $: Y = data.map((el) => el[y]);

  // Compute default domains, and unique the x-domain.
  $: xDomain = X; // an array of (ordinal) x-values // sort by descending frequency
  $: yDomain = [0, d3.max(Y)]; // [ymin, ymax]

  // Construct scales, axes, and formats.
  let xRange = [marginLeft, width - marginRight]; // [left, right]
  let yRange = [height - marginBottom, marginTop * 2]; // [bottom, top]
  let yType = d3.scaleLinear; // y-scale type
  $: xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  $: yScale = yType(yDomain, yRange);

  // Create Y-Axis ticks based on yScalefactor spacing
  let yTicks = [];
  $: unit = (Math.max(...Y) - Math.min(...Y)) / yScalefactor;
  $: for (let i = 1; i < yScalefactor + 1; i++) {
    yTicks = [...yTicks, Math.floor(i * unit * 100)];
  }

<\/script>


<div class="selector-main" dir="auto">
    <select
      on:change={showSort(this.selectedIndex)}
      onfocus={(this.selectedIndex = -1)}
    >
      <option disabled selected value> ---Sorting Method--- </option>
      <option value="1">Default</option>
      <option value="2">{y}, Ascending</option>
      <option value="3">{y}, Descending</option>
    </select>
  </div>
  <svg {width} {height} viewBox="0 0 {width} {height}">
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      {#each yTicks as tick, i}
        <g
          class="tick"
          opacity="1"
          transform="translate(0, {yScale(tick / 100)})"
        >
          <line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
          <line class="tick-grid" x2={width - marginLeft - marginRight} />
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
    </g>

    <g class="bars">
        {#each Y as point, i (point)}
        <rect
          x={xScale(X[i])}
          y={yScale(Y[i])}
          width={xScale.bandwidth()}
          height={yScale(0) - yScale(Y[i])}
          fill={color}
          animate:flip="{{duration: 1000}}"
        />
        {/each}
    </g>

    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
      {#each X as point, i}
        <g class="tick" opacity="1" transform="translate({xScale(point)},0)">
          <line
            x1={xScale.bandwidth() / 2}
            x2={xScale.bandwidth() / 2}
            stroke="black"
            y2="6"
          />
          <text y={marginBottom} dx={xScale.bandwidth() / 4}>{X[i]}</text>
        </g>
      {/each}
    </g>
  </svg>

<style>

  svg {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }

  .y-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }

  .x-axis {
    font-size: "10px";
    font-family: sans-serif;
    text-anchor: "end";
  }

  .tick {
    opacity: 1;
  }

  .tick-start {
    stroke: black;
    stroke-opacity: 1;
  }

  .tick-grid {
    stroke: black;
    stroke-opacity: 0.2;
    font-size: "11px";
    color: black;
  }

  .tick text {
    fill: black;
    text-anchor: start;
  }
</style>
`;

  function showCode(id) {
    if(id === 'page1') {
      document.getElementById('page1_desc').style.display = 'block';
      document.getElementById('page2_desc').style.display = 'none';
    } else {
      document.getElementById('page1_desc').style.display = 'none';
      document.getElementById('page2_desc').style.display = 'block';
    }
  }
</script>

<button class="page_selected" id="page1" on:click={() => showCode('page1')}>Code</button><!--
--><button class="page_selected" id="page2" on:click={() => showCode('page2')}>Data</button>

<pre id="page1_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
    ><!--
     -->{@html Prism.highlight(
      code,
      Prism.languages['javascript']
    )}<!--
 --></code
  ><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
    ><!--
     -->{@html Prism.highlight(
      chartData,
      Prism.languages['javascript']
    )}<!--
 --></code
  ><!--
--></pre>

<style>
.codeMirror {
  white-space: pre-wrap;
  padding:1vw 0 0 1vw;
}
#page2_desc {
  display: none;
}
.page_selected {
  width: 50%;
  height: 12%;
  border-style: none;
  border-radius: 0;
  background-color: #494949;
  color: rgba(255, 255, 255, 0.87);
}
#page2{
  border-left: #1E1E1E;
  border-left-width: 2px;
  border-left-style: solid;
}
.page_selected:hover {
  background-color: #1E1E1E;
  color: rgba(255, 255, 255, 0.87);
}
</style>