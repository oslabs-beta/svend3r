<script>
  import { scaleLinear, Delaunay } from 'd3';

  export let scatterData;

  const data = scatterData,
    r = 3, // (fixed) radius of dots, in pixels
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    inset = r * 2, // inset the default range, in pixels
    insetTop = inset, // inset the default y-range
    insetRight = inset, // inset the default x-range
    insetBottom = inset, // inset the default y-range
    insetLeft = inset, // inset the default x-range
    width = 900, // the outer width of the chart, in pixels
    height = 600, // the outer height of the chart, in pixels
    xType = scaleLinear, // type of x-scale
    xRange = [marginLeft + insetLeft, width - marginRight - insetRight], // [left, right]
    yType = scaleLinear, // type of y-scale
    yRange = [height - marginBottom - insetBottom, marginTop + insetTop], // [bottom, top]
    xLabel = 'Weight →', // a label for the y-axis
    yLabel = '↑ Height', // a label for the y-axis
    xFormat = 'kg', // a format specifier string for the y-axis
    yFormat = 'cm', // a format specifier string for the y-axis
    xScalefactor = 10, //y-axis number of values
    yScalefactor = 12, //y-axis number of values
    // number of colors in fill array MUST match number of subsets in data
    colors = ['red', 'orange', 'green', 'blue', 'purple'], // fill color for dots
    filled = false, // whether dots should be filled or outlined
    tooltipBackground = 'white', // background color of tooltip
    tooltipTextColor = 'black'; // text color of tooltip

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
  <div style="position:absolute; left:{dotInfo[0][0] + 12}px; top:{dotInfo[0][1] - 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {x}: {points[dotInfo[1]][0]}, {y}: {points[dotInfo[1]][1]}
  </div>
{/if}

<!-- Legend/Filters -->
{#if subsets.length}
  {#each subsets as subset, i}  
    <div on:click={() => filter(colors[i])}>
      <span style="height: 25px; width: 25px; border-radius:50%; background-color: {colors[i]}; display: inline-block; margin-top:10px;" />
      {subset}
    </div>
  {/each}
{/if}

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
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