<script>
  import { curveLinear, scaleUtc, scaleLinear, line, area, range, axisBottom, axisLeft, create, bisector, Delaunay }
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
    // colors = ['blue'], // fill color for dots
    colors = ['blue', 'red', 'green'], // fill color for dots
    showDots = false, // whether dots should be displayed
    dotsFilled = false, // whether dots should be filled or outlined
    strokeLinecap = 'round', // stroke line cap of the line
    strokeLinejoin = 'round', // stroke line join of the line
    strokeWidth = 1, // stroke width of line, in pixels
    strokeOpacity = 0.8, // stroke opacity of line
    tooltipBackground = 'black', // background color of tooltip
    tooltipTextColor = 'white'; // text color of tooltip

  let x, y, xVals = [], yVals = [], colorVals = [], points = [],
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

  console.log('points', points);
  console.log(points.filter( ({ color }) => color === 0));
  console.log(data[0].data);
  console.log('colorVals', colorVals);

  const I = range(xVals.length);
  const gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
  // const cleanData = data.map(gaps);
  const cleanData = points.map(gaps);

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

  const lines = [];

  colors.forEach((color, j) => {
    const filteredI = I.filter((el, i) => colorVals[i] === j);
    console.log('filtered', color, filteredI);
    lines.push(chartLine(filteredI));
  });

  console.log('lines', lines);

  const delaunay = Delaunay.from(I, i => xScale(xVals[i]), i => yScale(yVals[i]));
  const voronoi = delaunay.voronoi([0, 0, width, height]);
  

  // const chartArea = area()
  //   .defined(i => cleanData[i])
  //   .curve(curve)
  //   .x(i => xScale(xVals[i]))
  //   .y0(yScale(0))
  //   .y1(i => yScale(yVals[i])); // TODO: should this be niceY?
  
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
  console.log('yVals', yVals);
  // console.log('xScale', xScale);
  // console.log('ticks', xScale.ticks(8));
  // console.log('yVals', yVals);
  console.log('I', I);
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

  // $: pointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]]);

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

  const yTicks = niceY.ticks(yScalefactor);

  let stockInfo;
  const bisect = bisector(d => d.date).left;
  const iTest = bisect(data, 45);
  const selectedData = data[iTest];
  const long = data[bisect(data, new Date(2019, 2, 1))];
  console.log('bisect', long);

  const hyp = (index, mouseX, mouseY) => Math.hypot(xScale(xVals[index]) - mouseX + 17, yScale(yVals[index]) - mouseY + 17);

  function mousemoved(e) {
    const { clientX, clientY } = e;
    console.log('mouse', clientX, clientY);
    const closest = I.sort((a, b) => hyp(a, clientX, clientY) - hyp(b, clientX, clientY))[0];
    console.log('closest', closest, xVals[closest], yVals[closest], subsets[colorVals[closest]]);
    dotInfo = 
      { 
        x: xVals[closest], 
        y: yVals[closest],
        index: colorVals[closest]
      };
  }
</script>

<svg {width} {height} viewBox="0 0 {width} {height}"
  cursor='crosshair'
  on:mousemove="{(e) => mousemoved(e)}"  
  on:mouseout="{() => dotInfo = null}"
  on:blur="{() => dotInfo = null}"
>
  <!-- <path class="line" fill='none' stroke={colors[0]} d={chartLine(I)} /> -->

  <!-- {#each I as i}
  <path
      stroke="none"
      fill-opacity="0"
      class="voronoi-cell"
      d={voronoi.renderCell(i)}
      on:mouseenter="{() => { dotInfo = 
        { 
          x: xVals[i], 
          y: yVals[i],
          index: colorVals[i]
        };
        console.log('new cell');
      }}"
      on:focus="{() => { dotInfo = 
        { 
          x: xVals[i], 
          y: yVals[i],
          index: colorVals[i]
        };
      }}"
  ></path>
{/each} -->

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

  {#each lines as subsetLine, i}
    <g class='chartlines' pointer-events='none'>
      {#if dotInfo}
        <path class="line" fill='none' stroke-opacity={dotInfo.index === i ? '1' : '0.4'} stroke={colors[i]} d={subsetLine} />
        <circle cx={xScale(dotInfo.x)} cy={yScale(dotInfo.y)} r=3 stroke={colors[dotInfo.index]} fill='none' />
      {:else}
        <path class="line" fill='none' stroke={colors[i]} d={subsetLine}
          stroke-opacity={strokeOpacity} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin} />
      {/if}
    </g>
  {/each}

  <!-- <path class="area" fill={colors[0]} d={chartArea(I)} /> -->
  
  <g class="y-axis" transform="translate({marginLeft}, 0)" pointer-events='none'>
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

  <g class="x-axis" transform="translate(0,{height - marginBottom - insetBottom})" pointer-events='none'>
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
<!-- {#if stockInfo && stockInfo.clientX - 17 < marginLeft + width - 45}  
  <div style="position:absolute; left:{stockInfo.clientX}px; top:{stockInfo.clientY}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {x}: {data[bisect(data, new Date(xScale.invert(stockInfo.clientX - 17)))][x].toLocaleDateString('en-US')}, {y}: ${data[bisect(data, new Date(xScale.invert(stockInfo.clientX - 17)))][y].toFixed(2)}
  </div>
{/if} -->
{#if dotInfo}
  <div style='position:absolute; left:{xScale(dotInfo.x) + 12}px; top:{yScale(dotInfo.y) + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    <!-- <div style='position:absolute; left:80px; top:80px; pointer-events:none'> -->
    {subsets[dotInfo.index]} {dotInfo.x.toLocaleDateString('en-US')} ${dotInfo.y.toFixed(2)}
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