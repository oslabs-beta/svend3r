<script>
  import * as d3 from 'd3';
  import { flip } from 'svelte/animate';
  import { sampleData } from '../data/bar-data-alphabet'; //import your custom dataset
  import { ChartDocs } from '../ChartStore'; //*****Remove for Production for production use

  let data = sampleData;
  $: marginTop = $ChartDocs[1].value; // the top margin, in pixels //*****Remove reactivepermalink for production use
  $: marginRight = $ChartDocs[2].value; // the right margin, in pixels //*****Remove reactivepermalink for production use
  $: marginBottom = $ChartDocs[3].value; // the bottom margin, in pixels //*****Remove reactivepermalink for production use
  $: marginLeft = $ChartDocs[4].value; // the left margin, in pixels //*****Remove reactivepermalink for production use
  $: width = $ChartDocs[5].value; // the outer width of the chart, in pixels //*****Remove reactivepermalink for production use
  $: height = $ChartDocs[6].value; // the outer height of the chart, in pixels //*****Remove reactivepermalink for production use
  $: xPadding = $ChartDocs[7].value; // amount of x-range to reserve to separate bars //*****Remove reactivepermalink for production use
  $: yFormat = $ChartDocs[8].value; // a format specifier string for the y-axis //*****Remove reactivepermalink for production use
  $: yLabel = $ChartDocs[9].value; // a label for the y-axis //*****Remove reactivepermalink for production use
  $: color = $ChartDocs[10].value; // bar fill color //*****Remove reactivepermalink for production use
  $: yScalefactor = $ChartDocs[11].value; //y-axis number of values //*****Remove reactivepermalink for production use

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
  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  $: X = data.map((el) => el[x]);
  $: Y = data.map((el) => el[y]);

  // Compute default domains, and unique the x-domain.
  $: xDomain = X; // an array of (ordinal) x-values // sort by descending frequency
  $: yDomain = [0, d3.max(Y)]; // [ymin, ymax]

  // Construct scales, axes, and formats.
  $: xRange = [marginLeft, width - marginRight]; // [left, right] //*****Remove reactivepermalink for production use
  $: yRange = [height - marginBottom, marginTop * 2]; // [bottom, top] //*****Remove reactivepermalink for production use
  $: yType = d3.scaleLinear; // y-scale type
  $: xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  $: yScale = yType(yDomain, yRange);

  // Create Y-Axis ticks based on yScalefactor spacing
  let yTicks = [];
  $: unit = (Math.max(...Y) - Math.min(...Y)) / yScalefactor;
  $: for (let i = 1; i < yScalefactor + 1; i++) {
    yTicks = [...yTicks, Math.floor(i * unit * 100)];
  }
</script>

<div class="c" dir="auto">
  <!-- <select
    on:change={showSort(this.selectedIndex)}
    onfocus={(this.selectedIndex = -1)}
  >
    <option disabled selected value> ---Sorting Method--- </option>
    <option value="1">Default</option>
    <option value="2">{y}, Ascending</option>
    <option value="3">{y}, Descending</option>
  </select> -->
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
</div>

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
