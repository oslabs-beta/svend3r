<script>
  import Prism from 'prismjs';
  import { BarChartDocs } from './BarVert_Store.js';

  $: code = `<script>
  import * as d3 from "d3";
  import {flip} from "svelte/animate"
  import { sampleData } from './sampleData.js'  //import your custom dataset

  let data = sampleData;
  let marginTop = ${$BarChartDocs[1].value}; // the top margin, in pixels
  let marginRight = ${$BarChartDocs[2].value}; // the right margin, in pixels
  let marginBottom = ${$BarChartDocs[3].value}; // the bottom margin, in pixels
  let marginLeft = ${$BarChartDocs[4].value}; // the left margin, in pixels
  let width = ${$BarChartDocs[5].value}; // the outer width of the chart, in pixels
  let height = ${$BarChartDocs[6].value}; // the outer height of the chart, in pixels
  let xPadding = ${$BarChartDocs[7].value}; // amount of x-range to reserve to separate bars
  let yFormat = "${$BarChartDocs[8].value}"; // a format specifier string for the y-axis
  let yLabel = "${$BarChartDocs[9].value}"; // a label for the y-axis
  let color = "${$BarChartDocs[10].value}"; // bar fill color
  let yScalefactor = ${$BarChartDocs[11].value}; //y-axis number of values

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

  // outputs the content of the text file

  const data = `const sampleData = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

export { sampleData };`;

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
      data,
      Prism.languages['javascript']
    )}<!--
 --></code
  ><!--
--></pre>

<style>
.codeMirror {
  white-space: pre-wrap;
}

#page2_desc {
  display: none;
}

.page_selected {
  width: 50%;
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
