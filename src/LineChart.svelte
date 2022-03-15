<script>
  import { curveLinear, scaleUtc, scaleLinear, line, area, range, axisBottom, axisLeft, create, bisector }
    from 'd3';
  import { fly } from 'svelte/transition';

  export let lineData;

  const data = lineData,
    r = 3, // (fixed) radius of dots, in pixels
    curve = curveLinear, // method of interpolation between points
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
    xType = scaleUtc, // type of x-scale
    xRange = [marginLeft + insetLeft, width - marginRight - insetRight], // [left, right]
    yType = scaleLinear, // type of y-scale
    yRange = [height - marginBottom - insetBottom, marginTop + insetTop], // [bottom, top]
    xLabel = '', // a label for the y-axis
    yLabel = '↑ Daily Close', // a label for the y-axis
    xFormat = '', // a format specifier string for the y-axis
    yFormat = '', // a format specifier string for the y-axis
    xScalefactor = width / 80, //y-axis number of values
    yScalefactor = height / 40, //y-axis number of values
    // number of colors in fill array MUST match number of subsets in data
    colors = ['blue'], // fill color for dots
    // colors = ['red', 'orange', 'green', 'blue', 'purple'], // fill color for dots
    showDots = false, // whether dots should be displayed
    filled = false, // whether dots should be filled or outlined
    strokeLinecap = 'round', // stroke line cap of the line
    strokeLinejoin = 'round', // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
    tooltipBackground = 'white', // background color of tooltip
    tooltipTextColor = 'black'; // text color of tooltip

  let x, y, xVals = [], yVals = [], points = [],
    filters = [...colors], selectedDot, dotInfo;
  const subsets = [];

  console.log('data', data);

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

  const I = range(xVals.length);
  const gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
  const cleanData = data.map(gaps);

  const xDomain = [xVals[0], xVals[xVals.length - 1]];
  const yDomain = [0, Math.max(...yVals)];
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  const niceX = scaleLinear().domain([xVals[0], xVals[xVals.length - 1]]).nice();
  const niceY = scaleLinear().domain([0, Math.max(...yVals)]).nice();

  const chartLine = line()
    .defined(i => cleanData[i])
    .curve(curve)
    .x(i => xScale(xVals[i]))
    .y(i => yScale(yVals[i])); // TODO: should this be niceY?

  const chartArea = area()
    .defined(i => cleanData[i])
    .curve(curve)
    .x(i => xScale(xVals[i]))
    .y0(yScale(0))
    .y1(i => yScale(yVals[i])); // TODO: should this be niceY?
  
  const xAxis = axisBottom(xScale).ticks(xScalefactor).tickSizeOuter(0);
  const yAxis = axisLeft(yScale).ticks(yScalefactor, yFormat);
  // const yAxis = axisLeft(yScale).tickValues([20, 40, 60, 80, 100, 120]);

  // const svg = document.createElement('svg');
  // const g = document.createElement('g');
  // svg.appendChild(g);

  const svg = create('svg');
  const svg2 = document.createElement('svg');
  svg2.innerHTML = 'test string';
  // svg.append('g').call(xAxis);

  console.log('xDomain-derived', xScale.domain());
  // console.log('yDomain-derived', yScale.domain());
  // console.log('nice-xDomain-derived', niceX.domain());
  console.log('nice-yDomain-derived', niceY.domain());
  console.log('xTicks', xScale.ticks(xScalefactor));
  // console.log('yTicks', yScale.ticks());
  // console.log('nice-xTicks', niceX.ticks());
  console.log('nice-yTicks', niceY.ticks());

  // console.log('xDomain', xDomain);
  // console.log('yDomain', yDomain);
  console.log('typeof xVal', typeof xVals[0]);
  console.log('typeof yVal', typeof yVals[0]);
  console.log('xVals', xVals);
  // console.log('xScale', xScale);
  // console.log('ticks', xScale.ticks(8));
  // console.log('yVals', yVals);
  // console.log('I', I);
  // console.log('cleanData', cleanData);
  console.log('x0', xScale(xVals[0]), 'y0', yScale(yVals[0]));
  console.log('xEnd', xScale(xVals[xVals.length - 1]), 'yEnd', yScale(yVals[yVals.length - 1]));
  console.log('chartLine', chartLine(I));
  // console.log('xAxis', xAxis.scale().ticks(20));
  // console.log('all the x points', xAxis.scale().ticks(xAxis.ticks()[0]));
  // console.log('yAxis', yAxis.scale().ticks(7));
  // console.log('all the y points', yAxis.scale().ticks(yAxis.ticks()[0]));
  // console.log('svg', svg);
  // console.log('svg2', svg2);

  $: pointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]]);

  const xTicks = xScale.ticks(xScalefactor);
  const xTicksFormatted = xTicks.map((el, i, t) => {
    if (i === 0 || el.getFullYear() === t[i - 1].getFullYear())
      return el.toLocaleString('en-US', { month: 'long' });
    else return el.getFullYear();
  });

  console.log('xTicksFormatted', xTicksFormatted);
  console.log('xVals0', xVals[0]);
  console.log('date', new Date('Tue Jan 03 2017 00:00:00 GMT-0500 (Eastern Standard Time)'));
  console.log(+xVals[0] === +new Date('Tue Jan 03 2017 00:00:00 GMT-0500 (Eastern Standard Time)'));
  console.log(xVals.indexOf('Tue Jan 03 2017 00:00:00 GMT-0500 (Eastern Standard Time)'));

  // $: xTicks = [];
  // $: unit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);
  // $: for (let i = 1; i < xScalefactor + 1; i++) {
  //   xTicks.push(i * unit);
  // }

  const yTicks = niceY.ticks(yScalefactor);

  // $: yTicks = [];
  // $: unit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);
  // $: for (let i = 1; i < yScalefactor + 1; i++) {
  //   yTicks.push(i * unit); // TODO make adjustable and account for optional %
  // }
  let stockInfo;
  const bisect = bisector(d => d.date).left;
  const iTest = bisect(data, 45);
  const selectedData = data[iTest];
  const long = data[bisect(data, new Date(2019, 2, 1))];
  console.log('bisect', long);
</script>

<svg {width} {height} viewBox="0 0 {width} {height}"
  cursor='crosshair'
  on:mousemove="{(e) => stockInfo = e}"
  on:mouseout="{() => stockInfo = null}"
  on:blur="{() => stockInfo = null}"
>
  <path class="line" fill='none' stroke={colors[0]} d={chartLine(I)} />

  <!-- <path class="area" fill={colors[0]} d={chartArea(I)} /> -->
  
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

  <g class="x-axis" transform="translate(0,{height - marginBottom - insetBottom})">
    <path class="domain" stroke="black" d="M{marginLeft},0.5 H{width}"/>
    {#each xTicks as tick, i}
      <g class="tick" transform="translate({xScale(tick)}, 0)">
        <line class="tick-start" stroke='black' y2='6' />
        <!-- <line class="tick-grid" y2={-height} /> -->
        <text font-size='8px' x={-marginLeft} y="20">{xTicksFormatted[i] + xFormat}</text>
      </g>
    {/each}
    <text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
  </g>
    
    <!-- {#each pointsScaled as dot, i}
      <g class='dot' opacity='1'>
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
      </g>
    {/each} -->
</svg>

<!-- Tooltip -->
<!-- TODO - make next line less hacky -->
{#if stockInfo && stockInfo.clientX - 17 < marginLeft + width - 45}  
  <div style="position:absolute; left:{stockInfo.clientX}px; top:{stockInfo.clientY}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    <!-- {x}: {new Date(xScale.invert(stockInfo.clientX - 17).toLocaleDateString('en-US'))}, {y}: ${xVals.map(Number).indexOf(+new Date(xScale.invert(stockInfo.clientX - 17).toLocaleDateString('en-US')))} -->
    <!-- {x}: {bisect(data, xScale.invert(stockInfo.clientX - 17))}, {y}: ${xVals.map(Number).indexOf(+new Date(xScale.invert(stockInfo.clientX - 17).toLocaleDateString('en-US')))} -->
    {x}: {data[bisect(data, new Date(xScale.invert(stockInfo.clientX - 17)))][x].toLocaleDateString('en-US')}, {y}: ${data[bisect(data, new Date(xScale.invert(stockInfo.clientX - 17)))][y].toFixed(2)}
  </div>
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