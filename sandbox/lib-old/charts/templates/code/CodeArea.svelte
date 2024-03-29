<script>
	import Prism from 'prismjs';
	import { ChartDocs } from '../../ChartStore';

	export let chartData;
  export let schema;

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
    r = ${$ChartDocs[1].value}, // (fixed) radius of dots, in pixels
    marginTop = ${$ChartDocs[2].value}, // the top margin, in pixels
    marginRight = ${$ChartDocs[3].value}, // the right margin, in pixels
    marginBottom = ${$ChartDocs[4].value}, // the bottom margin, in pixels
    marginLeft = ${$ChartDocs[5].value}, // the left margin, in pixels
    inset = ${$ChartDocs[6].value}, // inset the default range, in pixels
    insetTop = inset, // inset the default y-range
    insetRight = inset, // inset the default x-range
    insetBottom = inset, // inset the default y-range
    insetLeft = inset, // inset the default x-range
    width = ${$ChartDocs[7].value}, // the outer width of the chart, in pixels
    height = ${$ChartDocs[8].value}, // the outer height of the chart, in pixels
    xLabel = '${$ChartDocs[9].value}', // a label for the y-axis
    yLabel = '${$ChartDocs[10].value}', // a label for the y-axis
    xFormat = '${$ChartDocs[11].value}', // a format specifier string for the y-axis
    yFormat = '${$ChartDocs[12].value}', // a format specifier string for the y-axis
    horizontalGrid = ${$ChartDocs[13].value}, // show horizontal grid lines
    verticalGrid = ${$ChartDocs[14].value}, // show vertical grid lines
    xScalefactor = width / 80, //y-axis number of values
    yScalefactor = height / 40, //y-axis number of values
    colors = [${
			"'" + $ChartDocs[15].value.join("','") + "'"
		}], // fill color for dots && number of colors in fill array MUST match number of subsets in data
    showDots = false, // whether dots should be displayed
    dotsFilled = false, // whether dots should be filled or outlined
    strokeLinecap = 'round', // stroke line cap of the line
    strokeLinejoin = 'round', // stroke line join of the line
    strokeWidth = ${$ChartDocs[16].value}, // stroke width of line, in pixels
    strokeOpacity = ${$ChartDocs[17].value}, // stroke opacity of line
    tooltipBackground = '${$ChartDocs[18].value}', // background color of tooltip
    tooltipTextColor = '${$ChartDocs[19].value}', // text color of tooltip
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

	function showCode(id) {
    let idArr = ['page1', 'page2', 'page3'];
    for(let i = 0; i < idArr.length; i++) {
      if(id === idArr[i]) {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'block';
        document.getElementById(`${idArr[i]}`).style.opacity = "100%"
      } else {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'none';
        document.getElementById(`${idArr[i]}`).style.opacity = "50%"
      }
    }
	}
</script>

<div class="data-schema-container">
  <h1 class="section-title">Chart Data Schema</h1>
</div>
<div class="code-mirror">
<button class="page_selected" id="page1" on:click={() => showCode('page1')}>
  <section class="button-text_icon">
  <img class="codeMirror-icon" id="page1" alt="svend3r d3 chart code" src='/codeMirror/code.png'>
  Code</section>
</button><!--
--><button class="page_selected" id="page2" on:click={() => showCode('page2')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/data.png'>
    Data</section>
</button><!--
--><button class="page_selected" id="page3" on:click={() => showCode('page3')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/schema.png'>
    Data Schema</section>
</button>

<pre id="page1_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(code, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(chartData, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page3_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(schema, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>
</div>

<style>

  .section-title{
    font-family: 'Roboto', sans-serif;
    font-size: 1.5vw;
    margin-bottom: 0.5vw;
  }

	.codeMirror {
		white-space: pre-wrap;
		padding: 1vw 0 0 1vw;
    min-height: 31vh;
    outline: none;
	}

  .code-mirror {
    background-color: #2D2D2D;
    border-radius: 0.5vw;
    width: 36vw;
    height: 35vh;
    margin-bottom: 1vw;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }

	#page2_desc, #page3_desc {
		display: none;
	}

	.page_selected {
		width: 33.33%;
		height: 9%;
		border-style: none;
		border-radius: 0;
		background-color: #494949;
		color: rgba(255, 255, 255, 0.87);
	}

	#page2, #page3 {
		border-left: #1e1e1e;
		border-left-width: 2px;
		border-left-style: solid;
    opacity: 50%;
	}

  #page1:hover, #page2:hover, #page3:hover {
    opacity: 100%;
  }

	.page_selected:hover {
		background-color: #1e1e1e;
		color: rgba(255, 255, 255, 0.87);
	}

  .codeMirror-icon {
    width: 8%;
    height: 8%;
    margin-right: 3%;
    margin-top: auto;
    margin-bottom: auto;
  }

  .button-text_icon{
    display: flex;
    justify-content: center;
  }

  .code-mirror::-webkit-scrollbar {
      display: none;
  }

  .codeMirror::-webkit-scrollbar {
      display: none;
  }

</style>
