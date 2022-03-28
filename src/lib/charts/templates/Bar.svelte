<script>
  import { scaleLinear, scaleBand } from 'd3';
  import { flip } from 'svelte/animate';
  import data from '../data/bar-data'; //import your custom dataset
  import { ChartDocs } from '../ChartStore';

  $: marginTop = $ChartDocs[0].value; // the top margin, in pixels
  $: marginRight = $ChartDocs[1].value; // the right margin, in pixels
  $: marginBottom = $ChartDocs[2].value; // the bottom margin, in pixels
  $: marginLeft = $ChartDocs[3].value; // the left margin, in pixels
  $: width = $ChartDocs[4].value; // the outer width of the chart, in pixels
  $: height = $ChartDocs[5].value; // the outer height of the chart, in pixels
  $: xPadding = $ChartDocs[6].value; // amount of x-range to reserve to separate bars
  $: yFormat = $ChartDocs[7].value; // a format specifier string for the y-axis
  $: yLabel = $ChartDocs[8].value; // a label for the y-axis
  $: color = $ChartDocs[9].value; // bar fill color
  $: yScalefactor = $ChartDocs[10].value; //y-axis number of values

  // Modify data based on default, ascending, descending sorts.  Input is based on selectedIndex
  let sortedData = data;
  $: reactiveShowSort = (input) => {
    if (input === 1) {
      return (sortedData = data.sort(
        (a, b) => a[x].charCodeAt(0) - b[x].charCodeAt(0)
      ));
    }
    if (input === 2) {
      return (sortedData = data.sort((a, b) => a[y] - b[y]));
    }
    if (input === 3) {
      return (sortedData = data.sort((a, b) => b[y] - a[y]));
    }
  };

  // Compute values X and Y value of Arrays
  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  $: reactiveX = sortedData.map((el) => el[x]);
  $: reactiveY = sortedData.map((el) => el[y]);

  // Compute default domains, and unique the x-domain.
  $: reactiveXDomain = reactiveX; // an array of (ordinal) x-values // sort by descending frequency
  $: reactiveYDomain = [0, Math.max(...reactiveY)]; // [ymin, ymax]

  // Construct scales, axes, and formats.
  $: xRange = [marginLeft, width - marginRight]; // [left, right] //*****Remove reactivepermalink for production use
  $: yRange = [height - marginBottom, marginTop * 2]; // [bottom, top] //*****Remove reactivepermalink for production use
  $: yType = scaleLinear; // y-scale type
  $: reactiveXScale = scaleBand(reactiveXDomain, xRange).padding(xPadding);
  $: reactiveYScale = yType(reactiveYDomain, yRange);

  // Create Y-Axis ticks based on yScalefactor spacing
  let yTicks;
  $: {
    yTicks = [];
    let unit = (Math.max(...reactiveY) - Math.min(...reactiveY)) / yScalefactor;
    for (let i = 1; i < yScalefactor + 1; i++) {
      yTicks = [...yTicks, Math.floor(i * unit * 100)];
    }
  }
</script>

<div class="chart-container" dir="auto">
  <select
    on:change={reactiveShowSort(this.selectedIndex)}
    onfocus={(this.selectedIndex = -1)}
  >
    <option disabled selected value> ---Sorting Method--- </option>
    <option value="1">Default</option>
    <option value="2">{y}, Ascending</option>
    <option value="3">{y}, Descending</option>
  </select>
  <svg {width} {height} viewBox="0 0 {width} {height}">
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      {#each yTicks as tick, i}
        <g
          class="tick"
          opacity="1"
          transform="translate(0, {reactiveYScale(tick / 100)})"
        >
          <line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
          <line class="tick-grid" x2={width - marginLeft - marginRight} />
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
    </g>

    <g class="bars">
      {#each reactiveY as point, i (point)}
        <rect
          x={reactiveXScale(reactiveX[i])}
          y={reactiveYScale(reactiveY[i])}
          width={reactiveXScale.bandwidth()}
          height={reactiveYScale(0) - reactiveYScale(reactiveY[i])}
          fill={color}
          animate:flip="{{duration: 1000}}"
        />
      {/each}
    </g>

    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
      {#each reactiveX as point, i}
        <g class="tick" opacity="1" transform="translate({reactiveXScale(point)},0)">
          <line
            x1={reactiveXScale.bandwidth() / 2}
            x2={reactiveXScale.bandwidth() / 2}
            stroke="black"
            y2="6"
          />
          <text y={marginBottom} dx={reactiveXScale.bandwidth() / 4}>{reactiveX[i]}</text>
        </g>
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

  .tick text {
    fill: black;
    text-anchor: start;
  }
</style>
