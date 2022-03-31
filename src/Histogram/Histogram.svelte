<script>
  import * as d3 from 'd3';
  import { flip } from 'svelte/animate';
  import data from './histogram-data'; // or pass data to component as prop
  
  $: reactiveBinNumber = 40;
  const binMin = 12;
  const binMax = 80;
  const value = 'rate';
  const normalize = false;
  const marginTop = 20; // top margin, in pixels
  const marginRight = 30; // right margin, in pixels
  const marginBottom = 30; // bottom margin, in pixels
  const marginLeft = 50; // left margin, in pixels
  const width = 640; // width of the chart, in pixels
  const height = 400; // height of the chart, in pixels
  const insetLeft = 0.5; // inset left edge of bar
  const insetRight = 0.5; // inset right edge of bar
  const xLabel = ''; // a label for the x-axis
  const xFormat = ''; // a format specifier string for the x-axis
  const yLabel = '↑ Frequency'; // a label for the y-axis
  const color = 'steelblue'; // bar fill color

  const xType = d3.scaleLinear;
  const yType = d3.scaleLinear;
  const xRange = [marginLeft, width - marginRight]; // [left, right]
  const yRange = [height - marginBottom, marginTop]; // [bottom, top]
  const yFormat = normalize ? '%' : undefined; // a format specifier string for the y-axis
  
  const xVals = data.map((el) => el[value]);
  const y0 = data.map((el) => 1);
  const iVals = data.map((el, i) => i);

  const xDomain = d3.extent(xVals);
  const xScale = xType(xDomain, xRange);
  $: bins = d3.bin().thresholds(reactiveBinNumber).value(i => xVals[i])(iVals);
  $: yVals = Array.from(bins, iVals => d3.sum(iVals, i => y0[i]));

  $: if (normalize) {
    const total = d3.sum(yVals);
    for (let i = 0; i < yVals.length; ++i) {
      yVals[i] /= total;
    }
  }

  $: yDomain = [0, d3.max(bins, d => d.length)];
  $: yScale = yType(yDomain, yRange);

  $: xTicks = xScale.ticks();
  $: yTicks = yScale.ticks();
</script>

<div class="chart-container" dir="auto">
  <input class="input" type="range" step='4' bind:value={reactiveBinNumber} min={binMin} max={binMax}>
  <svg {width} {height} viewBox="0 0 {width + marginLeft} {height}">
    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      {#each xTicks as tick, i}
        <g class="x-tick" transform="translate({xScale(tick)}, 0)">
          <line class="tick-start" stroke='black' y2='6' />
            <text y="27">{tick}</text>
        </g>
      {/each}
    </g>

    <g class="y-axis" transform="translate({marginLeft}, 0)">
      {#each yTicks as tick, i}
        <g class="y-tick" transform="translate(0, {yScale(tick)})">
          <line class="tick-start" x1='-6' x2='0'/>
          <line class="tick-grid" x2={width - marginLeft - marginRight}/>
          <text x={-10} y='5'>{tick}</text>
        </g>
      {/each}
    </g>
    
    <g class="bars">
      {#each bins as bin, i}
        <rect
          x={xScale(bin.x0)}
          y={yScale(bin.length)}
          width={Math.max(0, xScale(bin.x1) - xScale(bin.x0) - insetLeft - insetRight)}
          height={yScale(0) - yScale(bin.length)}
          fill={color}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .chart-container {
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-left: 8
    0px;
  }

  select{
    color: black;
    padding: 5px;
  }

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

  .x-tick text {
    fill: black;
    text-anchor: middle;
  }

  .y-tick text {
    fill: black;
    text-anchor: end;
  }
</style>