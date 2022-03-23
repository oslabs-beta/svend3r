<script>
  import { curveLinear, scaleUtc, scaleLinear, line, area, range, axisBottom, axisLeft, create, bisector, Delaunay } from 'd3';
  import { csvVtsax, csvVgenx, csvVbtlx } from '../data/line-data-multi';
  // import { AreaChartDocs } from '../Store.svelte';
  import { ChartDocs } from '../ChartStore';

  export let chartData;

  // console.log('data', chartData);
  // console.log('area', $AreaChartDocs);
  // let data = [];

  // const { csvVtsax, csvVgenx, csvVbtlx } = chartData;

  //CSV to JSON Converter Function
  function csvConvert(csv) {
    return csv.split('\n').slice(1).map(str => {
      const [date, close] = str.split(',')
      .map((el) => (el.includes('/') ? new Date(el) : parseFloat(el)));
      return { date, close };
    });
  }
const firstDataSet = csvConvert(csvVtsax)
const SecondDataSet = csvConvert(csvVgenx)
const ThirdDataSet = csvConvert(csvVbtlx)
//Create Array of objects for converted CSV datasets
const sampleData = [
  {
    id: 'VTSAX',
    data: firstDataSet
  },
  {
    id: 'VGENX',
    data: SecondDataSet
  },
  {
    id: 'VBTLX',
    data: ThirdDataSet
  }
];
  const data = sampleData;
  $: r = $ChartDocs[1].value; // (fixed) radius of dots, in pixels
  $: marginTop = $ChartDocs[2].value; // the top margin, in pixels
  $: marginRight = $ChartDocs[3].value; // the right margin, in pixels
  $: marginBottom = $ChartDocs[4].value; // the bottom margin, in pixels
  $: marginLeft = $ChartDocs[5].value; // the left margin, in pixels
  $: inset = $ChartDocs[6].value; // inset the default range, in pixels
  $: insetTop = inset; // inset the default y-range
  $: insetRight = inset; // inset the default x-range
  $: insetBottom = inset; // inset the default y-range
  $: insetLeft = inset; // inset the default x-range
  $: width = $ChartDocs[7].value; // the outer width of the chart, in pixels
  $: height = $ChartDocs[8].value; // the outer height of the chart, in pixels
  $: xLabel = $ChartDocs[9].value; // a label for the y-axis
  $: yLabel = $ChartDocs[10].value; // a label for the y-axis
  $: xFormat = $ChartDocs[11].value; // a format specifier string for the y-axis
  $: yFormat = $ChartDocs[12].value; // a format specifier string for the y-axis
  $: horizontalGrid = $ChartDocs[13].value; // show horizontal grid lines
  $: verticalGrid = $ChartDocs[14].value; // show vertical grid lines
  $: xScalefactor = width / 80; //y-axis number of values
  $: yScalefactor = height / 40; //y-axis number of values
  $: colors = $ChartDocs[15].value; // fill color for dots && number of colors in fill array MUST match number of subsets in data
  $: showDots = false; // whether dots should be displayed
  $: dotsFilled = false; // whether dots should be filled or outlined
  $: strokeLinecap = 'round'; // stroke line cap of the line
  $: strokeLinejoin = 'round'; // stroke line join of the line
  $: strokeWidth = $ChartDocs[16].value; // stroke width of line, in pixels
  $: strokeOpacity = $ChartDocs[17].value; // stroke opacity of line
  $: tooltipBackground = $ChartDocs[18].value; // background color of tooltip
  $: tooltipTextColor = $ChartDocs[19].value; // text color of tooltip
  $: curve = curveLinear; // method of interpolation between points
  $: xType = scaleUtc; // type of x-scale
  $: xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  $: yType = scaleLinear; // type of y-scale
  $: yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]
  let x;
  let y; 
  let xVals = []; 
  let yVals = []; 
  let points = []; 
  let dotInfo;
  const subsets = []; 
  const colorVals = [];
  // For a single set of data
  // $: if (colors.length === 1) {
  //   x = Object.keys(data[0])[0];
  //   y = Object.keys(data[0])[1];
  //   xVals = data.map((el) => el[x]);
  //   yVals = data.map((el) => el[y]);
  //   points = data.map((el) => [el[x], el[y], 0]);
  // }
  // // For data with subsets (NOTE: expects 'id' and 'data' keys)
  // else {
  //   console.log('colors');
  //   x = Object.keys(data[0]?.data[0])[0];
  //   y = Object.keys(data[0]?.data[0])[1];
  //   data.forEach((subset, i) => {
  //     subset.data.forEach((coordinate) => {
  //       xVals.push(coordinate[x]);
  //       yVals.push(coordinate[y]);
  //       colorVals.push(i);
  //       points.push(
  //         { 
  //           x: coordinate[x],
  //           y: coordinate[y],
  //           color: i
  //         });
  //     });
  //     subsets.push(subset.id);
  //   });
  // }

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

  $: I = range(xVals.length);
  $: gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
  $: cleanData = points.map(gaps);
  $: xDomain = [xVals[0], xVals[xVals.length - 1]];
  $: yDomain = [0, Math.max(...yVals)];
  $: xScale = xType(xDomain, xRange);
  $: yScale = yType(yDomain, yRange);
  $:  niceY = scaleLinear().domain([0, Math.max(...yVals)]).nice();
  $: chartArea = area()
    .defined(i => cleanData[i])
    .curve(curve)
    .x(i => xScale(xVals[i]))
    .y0(yScale(0))
    .y1(i => yScale(yVals[i])); // TODO: should this be niceY?
  const areas = [];
  $: colors.forEach((color, j) => {
    const filteredI = I.filter((el, i) => colorVals[i] === j);
    areas.push(chartArea(filteredI));
  });

  $: console.log('areas', areas);
  
  $:  xTicks = xScale.ticks(xScalefactor);
  $:  xTicksFormatted = xTicks.map((el, i, t) => {
    if (i === 0 || el.getFullYear() === t[i - 1].getFullYear())
      return el.toLocaleString('en-US', { month: 'long' });
    else return el.getFullYear();
  });
  $:  yTicks = niceY.ticks(yScalefactor);
  const hyp = (index, mouseX, mouseY) => Math.hypot(xScale(xVals[index]) - mouseX + 17, yScale(yVals[index]) - mouseY + 17);
  function mousemoved(e) {
    const { clientX, clientY } = e;
    console.log('mouse', clientX, clientY);
    const closest = I.sort((a, b) => hyp(a, clientX, clientY) - hyp(b, clientX, clientY))[0];
    dotInfo = 
      { 
        x: xVals[closest], 
        y: yVals[closest],
        index: colorVals[closest]
      };
  }
</script>
<div class="chart-container">
  <svg {width} {height} viewBox="0 0 {width} {height}"
    cursor='crosshair'
    on:mousemove="{(e) => mousemoved(e)}"  
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
            filled={dotsFilled ? colors[colorVals[i]] : 'none'}
          />
        </g>
      {/each}
    {/if}
    <!-- Chart Areas -->
    {#each areas as subsetArea, i}
      <g class='chartlines' pointer-events='none'>
        {#if dotInfo}
          <path class="line" fill={colors[i]} fill-opacity={dotInfo.index === i ? '1' : '0.4'} stroke={colors[i]} d={subsetArea} />
          <circle cx={xScale(dotInfo.x)} cy={yScale(dotInfo.y)} r=3 stroke={colors[dotInfo.index]} fill='none' />
        {:else}
          <path class="line" fill={colors[i]} stroke={colors[i]} d={subsetArea}
            stroke-opacity={strokeOpacity} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin} />
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
  </svg>
</div>
<!-- Tooltip -->
{#if dotInfo}
  <div style='position:absolute; left:{xScale(dotInfo.x) + 12}px; top:{yScale(dotInfo.y) + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {subsets[dotInfo.index]} {dotInfo.x.toLocaleDateString('en-US')} {dotInfo.y.toFixed(2)}
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