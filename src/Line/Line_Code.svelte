<script>
    import Prism from 'prismjs';
    import { AreaChartDocs } from './Line_Store.js';
  
    $: code = `<script>
    import { curveLinear, scaleUtc, scaleLinear, line, area, range, axisBottom, axisLeft, create, bisector, Delaunay } from 'd3';
    import { csvVtsax, csvVgenx, csvVbtlx } from './sampleData.js'

    //CSV to JSON Converter Function
    function csvConvert(csv) {
        return csv.split('\\n').slice(1).map(str => {
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


    const data = sampleData,
    r = ${$AreaChartDocs[1].value}, // (fixed) radius of dots, in pixels
    marginTop = ${$AreaChartDocs[2].value}, // the top margin, in pixels
    marginRight = ${$AreaChartDocs[3].value}, // the right margin, in pixels
    marginBottom = ${$AreaChartDocs[4].value}, // the bottom margin, in pixels
    marginLeft = ${$AreaChartDocs[5].value}, // the left margin, in pixels
    inset = ${$AreaChartDocs[6].value}, // inset the default range, in pixels
    insetTop = inset, // inset the default y-range
    insetRight = inset, // inset the default x-range
    insetBottom = inset, // inset the default y-range
    insetLeft = inset, // inset the default x-range
    width = ${$AreaChartDocs[7].value}, // the outer width of the chart, in pixels
    height = ${$AreaChartDocs[8].value}, // the outer height of the chart, in pixels
    xLabel = '${$AreaChartDocs[9].value}', // a label for the y-axis
    yLabel = '${$AreaChartDocs[10].value}', // a label for the y-axis
    xFormat = '${$AreaChartDocs[11].value}', // a format specifier string for the y-axis
    yFormat = '${$AreaChartDocs[12].value}', // a format specifier string for the y-axis
    horizontalGrid = ${$AreaChartDocs[13].value}, // show horizontal grid lines
    verticalGrid = ${$AreaChartDocs[14].value}, // show vertical grid lines
    xScalefactor = width / 80, //y-axis number of values
    yScalefactor = height / 40, //y-axis number of values
    colors = [${'\'' + $AreaChartDocs[15].value.join('\',\'') + '\''}], // fill color for dots && number of colors in fill array MUST match number of subsets in data
    showDots = false, // whether dots should be displayed
    dotsFilled = false, // whether dots should be filled or outlined
    strokeLinecap = 'round', // stroke line cap of the line
    strokeLinejoin = 'round', // stroke line join of the line
    strokeWidth = ${$AreaChartDocs[16].value}, // stroke width of line, in pixels
    strokeOpacity = ${$AreaChartDocs[17].value}, // stroke opacity of line
    tooltipBackground = '${$AreaChartDocs[18].value}', // background color of tooltip
    tooltipTextColor = '${$AreaChartDocs[19].value}', // text color of tooltip
    curve = curveLinear, // method of interpolation between points
    xType = scaleUtc, // type of x-scale
    xRange = [marginLeft + insetLeft, width - marginRight - insetRight], // [left, right]
    yType = scaleLinear, // type of y-scale
    yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]

    let x, y, xVals = [], yVals = [], points = [], dotInfo;
    const subsets = [], colorVals = [];

    // For a single set of data
    if (colors.length === 1) {
        x = Object.keys(data[0])[0];
        y = Object.keys(data[0])[1];
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

    const I = range(xVals.length);
    const gaps = (d, i) => !isNaN(xVals[i]) && !isNaN(yVals[i]);
    const cleanData = points.map(gaps);

    const xDomain = [xVals[0], xVals[xVals.length - 1]];
    const yDomain = [0, Math.max(...yVals)];
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
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

    const areas = [];

    colors.forEach((color, j) => {
        const filteredI = I.filter((el, i) => colorVals[i] === j);
        areas.push(chartArea(filteredI));
    });
  

  
    const xAxis = axisBottom(xScale).ticks(xScalefactor).tickSizeOuter(0);
    const yAxis = axisLeft(yScale).ticks(yScalefactor, yFormat);

    const xTicks = xScale.ticks(xScalefactor);
    const xTicksFormatted = xTicks.map((el, i, t) => {
        if (i === 0 || el.getFullYear() === t[i - 1].getFullYear())
        return el.toLocaleString('en-US', { month: 'long' });
        else return el.getFullYear();
    });

    const yTicks = niceY.ticks(yScalefactor);

    const hyp = (index, mouseX, mouseY) => Math.hypot(xScale(xVals[index]) - mouseX + 17, yScale(yVals[index]) - mouseY + 17);
    function mousemoved(e) {
        const { clientX, clientY } = e;
        const closest = I.sort((a, b) => hyp(a, clientX, clientY) - hyp(b, clientX, clientY))[0];
        dotInfo = 
        { 
            x: xVals[closest], 
            y: yVals[closest],
            index: colorVals[closest]
        };
    }
<\/script>

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
    <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
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

<!-- Tooltip -->
{#if dotInfo}
  <div style='position:absolute; left:{xScale(dotInfo.x) + 12}px; top:{yScale(dotInfo.y) + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {subsets[dotInfo.index]} {dotInfo.x.toLocaleDateString('en-US')} {dotInfo.y.toFixed(2)}
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
</style>`;
  
    // outputs the content of the text file
  
    const data = `//First Data Set

export { csvVtsax, csvVgenx, csvVbtlx };`;
  
function showCode(id) {
      if(id === 'page1') {
        document.getElementById('page1_desc').style.display = 'block';
        document.getElementById('page2_desc').style.display = 'none';
      } else {
        document.getElementById('page1_desc').style.display = 'none';
        document.getElementById('page2_desc').style.display = 'block';
      }
}
  
  </script>
  
  <button class="page_selected" id="page1" on:click={() => showCode('page1')}>Code</button><!--
  --><button class="page_selected" id="page2" on:click={() => showCode('page2')}>Data</button>
  
  <pre id="page1_desc" class="codeMirror" contenteditable><!--
  --><code class="language-javascript"
      ><!--
       -->{@html Prism.highlight(
        code,
        Prism.languages['javascript']
      )}<!--
   --></code
    ><!--
  --></pre>
  
  <pre id="page2_desc" class="codeMirror" contenteditable><!--
  --><code class="language-javascript"
      ><!--
       -->{@html Prism.highlight(
        data,
        Prism.languages['javascript']
      )}<!--
   --></code
    ><!--
  --></pre>
  
  <style>
  .codeMirror {
    white-space: pre-wrap;
  }
  
  #page2_desc {
    display: none;
  }
  
  .page_selected {
    width: 50%;
    border-style: none;
    border-radius: 0;
    background-color: #494949;
    color: rgba(255, 255, 255, 0.87);
  }
  
  #page2{
    border-left: #1E1E1E;
    border-left-width: 2px;
    border-left-style: solid;
  }
  
  .page_selected:hover {
    background-color: #1E1E1E;
    color: rgba(255, 255, 255, 0.87);
  }
  
  </style>
  