<script>
  import { area, curveLinear, Delaunay, range, scaleLinear, scaleUtc } from 'd3';
  import data from '../data/area-data';
  import { ChartDocs } from '../ChartStore';

  $: marginTop = $ChartDocs[0].value; // the top margin, in pixels
  $: marginRight = $ChartDocs[1].value; // the right margin, in pixels
  $: marginBottom = $ChartDocs[2].value; // the bottom margin, in pixels
  $: marginLeft = $ChartDocs[3].value; // the left margin, in pixels
  $: inset = $ChartDocs[4].value; // inset the default range, in pixels
  $: width = $ChartDocs[5].value; // the outer width of the chart, in pixels
  $: height = $ChartDocs[6].value; // the outer height of the chart, in pixels
  $: xLabel = $ChartDocs[7].value; // a label for the y-axis
  $: yLabel = $ChartDocs[8].value; // a label for the y-axis
  $: xFormat = $ChartDocs[9].value; // a format specifier string for the y-axis
  $: yFormat = $ChartDocs[10].value; // a format specifier string for the y-axis
  $: horizontalGrid = $ChartDocs[11].value; // show horizontal grid lines
  $: verticalGrid = $ChartDocs[12].value; // show vertical grid lines
  $: colors = $ChartDocs[13].value; // fill color for dots && number of colors in fill array MUST match number of subsets in data
  $: showDots = $ChartDocs[14].value; // whether dots should be displayed
  $: dotsFilled = $ChartDocs[15].value; // whether dots should be filled or outlined
  $: r = $ChartDocs[16].value; // (fixed) radius of dots, in pixels
  $: strokeWidth = $ChartDocs[17].value; // stroke width of line, in pixels
  $: fillOpacity = $ChartDocs[18].value; // fill opacity of area
  $: tooltipBackground = $ChartDocs[19].value; // background color of tooltip
  $: tooltipTextColor = $ChartDocs[20].value; // text color of tooltip
  $: strokeLinecap = 'round'; // stroke line cap of the line
  $: strokeLinejoin = 'round'; // stroke line join of the line
  $: xScalefactor = width / 80; //y-axis number of values
  $: yScalefactor = height / 40; //y-axis number of values
  $: curve = curveLinear; // method of interpolation between points
  $: xType = scaleUtc; // type of x-scale
  $: insetTop = inset; // inset from top
  $: insetRight = inset; // inset from right
  $: insetBottom = inset; // inset fro bottom
  $: insetLeft = inset; // inset from left
  $: xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  $: yType = scaleLinear; // type of y-scale
  $: yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]

  let x, y, dotInfo, areas, filteredI, xVals = [], yVals = [], points = [], subsets = [], colorVals = [];
  
  // For a single set of data
  if (!('data' in data[0])) {
    x = Object.keys(data[0])[0];
    y = Object.keys(data[0])[1];
    xVals = data.map((el) => el[x]);
    yVals = data.map((el) => el[y]);
    colorVals = data.map((el) => 0);
    points = data.map((el) => ({
      x: el[x],
      y: el[y],
      color: 0
    }));
  }
  // For data with subsets (NOTE: expects 'id' and 'data' keys)
  else {
    console.log('colors');
    x = Object.keys(data[0]?.data[0])[0];
    y = Object.keys(data[0]?.data[0])[1];
    data.forEach((subset, i) => {
    subset.data.forEach((coordinate) => {
      xVals.push(coordinate[x]);
      yVals.push(coordinate[y]);
      colorVals.push(i);
      points.push(
        { 
          x: coordinate[x],
          y: coordinate[y],
          color: i
        });
    });
    subsets.push(subset.id);
  });
  }

  const I = range(xVals.length);
  const gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
  const cleanData = points.map(gaps);
  const xDomain = [xVals[0], xVals[xVals.length - 1]];
  const yDomain = [0, Math.max(...yVals)];
  $: xScale = xType(xDomain, xRange);
  $: yScale = yType(yDomain, yRange);
  $: niceY = scaleLinear().domain([0, Math.max(...yVals)]).nice();
  $: chartArea = area()
    .defined(i => cleanData[i])
    .curve(curve)
    .x(i => xScale(xVals[i]))
    .y0(yScale(0))
    .y1(i => yScale(yVals[i]));

  $: {
    areas = [];
    colors.forEach((color, j) => {
      filteredI = [];
      filteredI = I.filter((el, i) => colorVals[i] === j);
      areas.push(chartArea(filteredI));
    });
  }

  $: pointsScaled = points.map((el) => [xScale(el.x), yScale(el.y), el.color]);
  $: console.log('xVals', xVals, 'I', I, 'pointsScaled', pointsScaled, 'points', points);
  $: delaunayGrid = Delaunay.from(pointsScaled);
  $: voronoiGrid = delaunayGrid.voronoi([0, 0, width, height]);
  
  $:  xTicks = xScale.ticks(xScalefactor);
  $:  xTicksFormatted = xTicks.map((el) => el.getFullYear());
  $:  yTicks = niceY.ticks(yScalefactor);
  
  const hyp = (index, mouseX, mouseY) => Math.hypot(xScale(xVals[index]) - mouseX + 17, yScale(yVals[index]) - mouseY + 17);
  function mousemoved(e) {
    const { clientX, clientY } = e;
    console.log('mouse', clientX, clientY); // TODO fix positioning
    const closest = [...I].sort((a, b) => hyp(a, clientX, clientY) - hyp(b, clientX, clientY))[0];
    console.log()
    dotInfo = 
      { 
        x: xVals[closest],
        y: yVals[closest],
        clientX: clientX,
        clientY: clientY,
        index: colorVals[closest]
      };
  }
</script>
<div class="chart-container">
  <svg {width} {height} viewBox="0 0 {width} {height}"
    cursor='crosshair'
    on:mouseout="{() => dotInfo = null}"
    on:blur="{() => dotInfo = null}"
  >
    <!-- Dots (if enabled) -->
    {#if showDots && !dotInfo}
      {#each I as i}
        <g class='dot' pointer-events='none'>
          <circle
            cx={xScale(xVals[i])}
            cy={yScale(yVals[i])}
            r={r}
            stroke={colors[colorVals[i]]}
            fill={dotsFilled ? colors[colorVals[i]] : 'none'}
          />
        </g>
      {/each}
    {/if}
    <!-- Chart Areas -->
    {#each areas as subsetArea, i}
      <g class='chartlines' pointer-events='none'>
        {#if dotInfo}
          <path class="line" fill={colors[i]} fill-opacity={points[dotInfo[1]].color === i ? '0.5' : '0.1'} stroke={colors[i]} d={subsetArea} />
          <circle cx={xScale(points[dotInfo[1]].x)} cy={yScale(points[dotInfo[1]].y)} r=3 stroke={colors[points[dotInfo[1]].color]} fill='none' />
        {:else}
          <path class="line" fill={colors[i]} stroke={colors[i]} d={subsetArea}
            fill-opacity={fillOpacity} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin} />
        {/if}
      </g>
    {/each}
    
    <!-- Y-axis and horizontal grid lines -->
    <g class="y-axis" transform="translate({marginLeft}, 0)" pointer-events='none'>
      <path class="domain" stroke="black" d="M{insetLeft}, 0.5 V{height}"/>
      {#each yTicks as tick, i}
        <g class="tick" transform="translate(0, {yScale(tick)})">
          <line class="tick-start" x1={insetLeft - 6} x2={insetLeft}/>
          {#if horizontalGrid}
            <line class="tick-grid" x1={insetLeft} x2={width - marginLeft - marginRight}/>
          {/if}
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop/2}>{yLabel}</text>
    </g>
    <!-- X-axis and vertical grid lines -->
    <g class="x-axis" transform="translate(0,{height - marginBottom - insetBottom})" pointer-events='none'>
      <path class="domain" stroke="black" d="M{marginLeft},0.5 H{width}"/>
      {#each xTicks as tick, i}
        <g class="tick" transform="translate({xScale(tick)}, 0)">
          <line class="tick-start" stroke='black' y2='6' />
          {#if verticalGrid}
            <line class="tick-grid" y2={-height} />
          {/if}
          <text font-size='8px' x={-marginLeft} y="20">{xTicksFormatted[i] + xFormat}</text>
        </g>
      {/each}
      <text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
    </g>

    {#each pointsScaled as point, i}
      <path
        stroke="purple"
        fill-opacity="0"
        class="voronoi-cell"
        d={voronoiGrid.renderCell(i)}
        on:mouseover="{(e) => dotInfo = [point, i, e] }"
        on:focus="{(e) => dotInfo = [point, i, e] }"
      ></path>
    {/each}
  </svg>
</div>
<!-- Tooltip -->
{#if dotInfo}
  <div style='position:absolute; left:{dotInfo[2].clientX + 12}px; top:{dotInfo[2].clientY + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {subsets ? subsets[points[dotInfo[1]].color] : ''}:  
    {points[dotInfo[1]].x.getFullYear()}: {points[dotInfo[1]].y.toFixed(2)}{yFormat}
    <!-- {points[dotInfo[1]].x.toLocaleDateString('en-US')} {points[dotInfo[1]].y.toFixed(2)}{yFormat} -->
  </div>
{/if}
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
    height: auto;
    height: "intrinsic";
    margin: auto;
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