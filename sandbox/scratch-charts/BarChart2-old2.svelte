<script>
  import * as d3 from "d3";
  import { fly } from "svelte/transition";

  const alphabet = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 },
    { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 },
    { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 },
    { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 },
    { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 },
    { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 },
    { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.0236 },
    { letter: "X", frequency: 0.0015 },
    { letter: "Y", frequency: 0.01974 },
    { letter: "Z", frequency: 0.00074 },
  ];

  let data = alphabet;
  // let x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  // let y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  // data = data.sort((a,b) => a[y] - b[y]);
  let marginTop = 20; // the top margin, in pixels
  let marginRight = 0; // the right margin, in pixels
  let marginBottom = 30; // the bottom margin, in pixels
  let marginLeft = 40; // the left margin, in pixels
  let width = 900; // the outer width of the chart, in pixels
  let height = 600; // the outer height of the chart, in pixels
  let xPadding = 0.2; // amount of x-range to reserve to separate bars
  let yFormat = "%"; // a format specifier string for the y-axis
  let yLabel = "↑ Frequency"; // a label for the y-axis
  let color = "steelblue"; // bar fill color
  let yScalefactor = 6; //y-axis number of values
  let duration = 1000;

  let sortAsc = false, sortDesc = false;
  // $: if (sortAsc) {
  //   console.log('sort asc');
  //   data = data.sort((a,b) => a[y] - b[y]);
  //   X = data.map((el) => el[x]);
  //   Y = data.map((el) => el[y]);
  //   xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  //   yScale = yType(yDomain, yRange);
  //   xDomain = X;
  //   yDomain = [0, d3.max(Y)];
  //   xDomain = new d3.InternSet(xDomain);
  //   console.log('X', X, 'Y', Y);
  //   console.log(data);
  // }; 
  // $: if (sortDesc) data = data.sort((a,b) => a[y] - b[y]);
  

  // const sortAscending = () => {
  //   console.log('sort asc');
  //   data = data.sort((a,b) => a[y] - b[y]);
  //   X = data.map((el) => el[x]);
  //   Y = data.map((el) => el[y]);
  //   xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  //   yScale = yType(yDomain, yRange);
  //   xDomain = X;
  //   yDomain = [0, d3.max(Y)];
  //   xDomain = new d3.InternSet(xDomain);
  //   console.log('X', X, 'Y', Y);
  //   console.log(data);
  // }
  const sortedAsc = () => {
    console.log('sort asc');
    data = data.sort((a,b) => a[y] - b[y]);
    // X = data.map((el) => el[x]);
    // Y = data.map((el) => el[y]);
    // xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    // yScale = yType(yDomain, yRange);
    // xDomain = X;
    // yDomain = [0, d3.max(Y)];
    // xDomain = new d3.InternSet(xDomain);
    console.log('X', X, 'Y', Y);
    console.log(data);
  }

  const sortedDesc = () => {
    console.log('sort asc');
    data = data.sort((a,b) => b[y] - a[y]);
    // X = data.map((el) => el[x]);
    // Y = data.map((el) => el[y]);
    // xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    // yScale = yType(yDomain, yRange);
    // xDomain = X;
    // yDomain = [0, d3.max(Y)];
    // xDomain = new d3.InternSet(xDomain);
    console.log('X', X, 'Y', Y);
    console.log(data);
  }

  // Compute values X and Y value of Arrays
  let x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  let y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  $: X = data.map((el) => el[x]);
  $: Y = data.map((el) => el[y]);

  // Compute default domains, and unique the x-domain.
  let xDomain; // an array of (ordinal) x-values // sort by descending frequency
  let yDomain; // [ymin, ymax]
  $: xDomain = X;
  $: yDomain = [0, d3.max(Y)];
  // if (yDomain === undefined) yDomain = [0, 12];
  // $: xDomain = new d3.InternSet(xDomain);

  // Omit any data not present in the x-domain.
  // const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

  // Construct scales, axes, and formats.
  let xRange = [marginLeft, width - marginRight]; // [left, right]
  let yRange = [height - marginBottom, marginTop]; // [bottom, top]
  let yType = d3.scaleLinear; // y-scale type
  $: xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  $: yScale = yType(yDomain, yRange);

  $: yTicks = [];
  $: unit = (Math.max(...Y) - Math.min(...Y)) / yScalefactor;
  $: for (let i = 1; i < yScalefactor + 1; i++) {
    yTicks.push(Math.floor(i * unit * 100));
  }
</script>

<label>
	<!-- <input type="checkbox" bind:checked={sortAsc}> -->
  <input type="checkbox" on:click={sortedAsc}>
	Sort By Ascending Order
</label>

<label>
	<!-- <input type="checkbox" bind:checked={sortDesc}> -->
  <input type="checkbox" on:click={sortedDesc}>
	Sort By Descending Order
</label>


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
    {#each Y as point, i}
      <rect
        x={xScale(X[i])}
        y={yScale(Y[i])}
        width={xScale.bandwidth()}
        height={yScale(0) - yScale(Y[i])}
        fill={color}
        in:fly={{ y: -200, duration: 1000, delay: i * 50 }}
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
    height: auto;
    height: "intrinsic";
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
