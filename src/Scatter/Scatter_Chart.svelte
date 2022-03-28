<script>
  import { scaleLinear, Delaunay } from 'd3';
  import { sampleData } from './sampleData.js';

  const data = sampleData;
  const r = 3; // (fixed) radius of dots, in pixels
  const marginTop = 20; // the top margin, in pixels
  const marginRight = 0; // the right margin, in pixels
  const marginBottom = 40; // the bottom margin, in pixels
  const marginLeft = 50; // the left margin, in pixels
  const inset = 15; // inset the default range, in pixels
  const insetTop = inset; // inset the default y-range
  const insetRight = inset; // inset the default x-range
  const insetBottom = inset; // inset the default y-range
  const insetLeft = inset; // inset the default x-range
  const width = 900; // the outer width of the chart, in pixels
  const height = 600; // the outer height of the chart, in pixels
  const xLabel = 'Weight →'; // a label for the y-axis
  const yLabel = '↑ Height'; // a label for the y-axis
  const xFormat = 'kg'; // a format specifier string for the x-axis
  const yFormat = 'cm'; // a format specifier string for the y-axis
  const xScalefactor = 10; //x-axis number of values
  const yScalefactor = 12; //y-axis number of values
    // number of colors in fill array MUST match number of subsets in data
  const colors = ['red', 'orange', 'green', 'blue', 'purple']; // fill color for dots
  const filled = true; // whether dots should be filled or outlined
  const tooltipBackground = 'white'; // background color of tooltip
  const tooltipTextColor = 'black'; // text color of tooltip

  const xType = scaleLinear; // type of x-scale
  const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  const yType = scaleLinear; // type of y-scale
  const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]

  let x, y, xVals = [], yVals = [], points = [],
    filters = [...colors], selectedDot, dotInfo;
  const subsets = [];

  // For a single set of data
  if (colors.length === 1) {
    x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
    y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
    xVals = data.map((el) => el[x]);
    yVals = data.map((el) => el[y]);
    points = data.map((el) => [el[x], el[y], 0]);
  }
  // For data with subsets (NOTE: expects 'id' and 'data' keys)
  else {
    x = Object.keys(data[0]?.data[0])[0];
    y = Object.keys(data[0]?.data[0])[1];
    data.forEach((subset, i) => {
      subset.data.forEach((coordinate) => {
        xVals.push(coordinate[x]);
        yVals.push(coordinate[y]);
        points.push([coordinate[x], coordinate[y], i]);
      });
      subsets.push(subset.id);
    });
  }

  const xDomain = [0, Math.max(...xVals)];
  const yDomain = [0, Math.max(...yVals)];
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  $: pointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]])
    .filter((el) => filters.includes(colors[el[2]]));
  $: delaunay = Delaunay.from(pointsScaled);
  $: voronoi = delaunay.voronoi([0, 0, width, height]);

  $: xTicks = [];
  $: unit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);
  $: for (let i = 1; i < xScalefactor + 1; i++) {
    xTicks.push(i * unit);
  }

  $: yTicks = [];
  $: unit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);
  $: for (let i = 1; i < yScalefactor + 1; i++) {
    yTicks.push(i * unit); // TODO make adjustable and account for optional %
  }

  // Updates filter array according to input
  const filter = (color) => {
    if (filters.includes(color)) filters = filters.filter((col) => col !== color);
    else filters = [...filters, color];
  };
</script>

<div class="scatter_plot_container">
  <svg {width} {height} viewBox="0 0 {width} {height}">
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      <path class="domain" stroke="black" d="M{insetLeft}, 0.5 V{height}"/>
      {#each yTicks as tick, i}
        <g class="tick" transform="translate(0, {yScale(tick)})">
          <line class="tick-start" x1={insetLeft - 6} x2={insetLeft}/>
          <line class="tick-grid" x1={insetLeft} x2={width - marginLeft - marginRight}/>
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
    </g>

    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}"/>
      {#each xTicks as tick, i}
        <g class="tick" transform="translate({xScale(tick)}, 0)">
          <line class="tick-start" stroke='black' y2='6' />
          <line class="tick-grid" y2={-height} />
          <text x={-marginLeft} y="20">{tick + xFormat}</text>
        </g>
      {/each}
      <text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
    </g>
      
      {#each pointsScaled as dot, i}
        <g class='dot' opacity='1'>
          {#if filters.includes(colors[dot[2]])}
            {#if i === selectedDot}
              <circle
                cx={dot[0]}
                cy={dot[1]}
                r={r + 2}
                stroke={colors[dot[2]]}
                fill={filled ? colors[dot[2]] : 'none'}
              />
            {:else}
              <circle
                cx={dot[0]}
                cy={dot[1]}
                r={r}
                stroke={colors[dot[2]]}
                fill={filled ? colors[dot[2]] : 'none'}
              />
            {/if}
            <path
                stroke="none"
                fill-opacity="0"
                class="voronoi-cell"
                d={voronoi.renderCell(i)}
                on:mouseover="{() => { selectedDot = i; dotInfo = [dot, i]; }}"
                on:focus="{(e) => { selectedDot = i; dotInfo = [dot, i]; e.target.classList.add('selectedDot'); }}"    
            ></path>
          {/if}
        </g>
      {/each}
  </svg>

<!-- Tooltip -->
  {#if dotInfo}  
    <div class="dot_info" style="left:{dotInfo[0][0] + 12}px; top:{dotInfo[0][1] - 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
      {x}: {points[dotInfo[1]][0]}, {y}: {points[dotInfo[1]][1]}
    </div>
  {/if}

<!-- Legend/Filters -->
  <section class="scatter_legend" style="height: {height}">
    {#if subsets.length}
    <h1 class="legend_title">Legend</h1>
    <h5 class="legend_note">click to filter</h5>
      {#each subsets as subset, i}  
        <div class="scatter_legend_info" on:click={() => filter(colors[i])}>
          <span class="scatter_legend_span" style="background-color: {colors[i]};" />
          {subset}
        </div>
      {/each}
    {/if}
  </section>
</div>

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
  }

  .scatter_plot_container{
    display: flex;
  }

  .scatter_legend{
    width: 120px;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
  }

  .scatter_legend_info{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .scatter_legend_span{
    height: 25px;
    width: 25px; 
    border-radius:50%; 
    display: inline-block; 
    margin-top:10px;
  }

  .legend_title{
    margin-top: 0;
    margin-bottom: 15px;
    text-decoration-line: underline;
  }

  .legend_note{
    margin-top: 0;
    margin-bottom: 0;
  }

  .dot_info{
    position:absolute; 
    display:inline;
  }

  path {
    fill: "green"
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