<script>
  import * as d3 from 'd3';
  import { flip } from 'svelte/animate';
  import data from './histogram-data'; // or pass data to component as prop
  
  $: reactiveBinNumber = 40;
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

  $: x = d3.scaleLinear()
    .domain([0, 28])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([marginLeft, width - marginRight]);
  
  $: y = d3.scaleLinear()
    .range([height - marginBottom, marginTop]);
  $: y.domain([0, d3.max(bins, d => d.length)]);

  $: console.log('binnumber', reactiveBinNumber);
  $: console.log('scale', xScale.ticks(reactiveBinNumber));
  const xDomain = d3.extent(xVals);
  const xScale = xType(xDomain, xRange);
  $: bins = d3.bin().thresholds(reactiveBinNumber).value(i => xVals[i])(iVals);
  // $: bins = d3.histogram().domain(x.domain()).thresholds(x.ticks(reactiveBinNumber))(xVals);
  // $: bins = hist(xVals);
  $: console.log('bins', bins);
  $: yVals = Array.from(bins, iVals => d3.sum(iVals, i => y0[i]));

  $: if (normalize) {
    const total = d3.sum(yVals);
    for (let i = 0; i < yVals.length; ++i) {
      yVals[i] /= total;
    }
  }

  // $: xDomain = [bins[0].x0, bins[bins.length - 1].x1];
  $: yDomain = [0, d3.max(bins, d => d.length)];

  $: console.log('xDomain', xDomain);

  // $: xScale = xType(xDomain, xRange);
  $: yScale = yType(yDomain, yRange);

  // $: xTicks = xScale.ticks(width / 80, xFormat);
  $: xTicks = xScale.ticks();
  // $: yTicks = yScale.ticks(height / 40, yFormat);
  $: yTicks = yScale.ticks();

  
  console.log('extent', d3.extent(xVals));

  // animate:flip="{{duration: 1000}}"
</script>

<div class="chart-container" dir="auto">
  <input class="input" type="range" step='4' bind:value={reactiveBinNumber} min='4' max='100'>
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
          x={x(bin.x0)}
          y={y(bin.length)}
          width={Math.max(0, x(bin.x1) - x(bin.x0) - insetLeft - insetRight)}
          height={y(0) - y(bin.length)}
          fill={color}
        />
      {/each}
    </g>

    <!-- <g class="x-axis" transform="translate(0,{height - marginBottom})">
      <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
      {#each reactiveXVals as xVal, i}
        <g class="tick" opacity="1" transform="translate({reactiveXScale(xVal)},0)">
          <line
            x1={reactiveXScale.bandwidth() / 2}
            x2={reactiveXScale.bandwidth() / 2}
            stroke="black"
            y2="6"
          />
          <text y={marginBottom} dx={reactiveXScale.bandwidth() / 4}>{xVal}</text>
        </g>
      {/each}
    </g>
    
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      {#each yTicks as tick, i}
        <g class="tick" opacity="1" transform="translate(0, {reactiveYScale(tick / 100)})">
          <line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
          <line class="tick-grid" x2={width - marginLeft - marginRight} />
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
    </g>

    <g class="bars">
      {#each reactiveYVals as bar, i (bar)}
        <rect
          x={reactiveXScale(reactiveXVals[i])}
          y={reactiveYScale(reactiveYVals[i])}
          width={reactiveXScale.bandwidth()}
          height={reactiveYScale(0) - reactiveYScale(bar)}
          fill={color}
          animate:flip="{{duration: 1000}}"
        />
      {/each}
    </g> -->
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