<script>
    import { area, curveBasis, extent, max, quantize, interpolateCool, scaleLinear, scalePoint, scaleTime} from 'd3';
    import data from '../data/ridgeline-data' // or pass data to component as prop
    import { ChartDocs } from '../ChartStore';
  
    $: width = $ChartDocs[0].value; // the outer width of the chart, in pixels 
    $: overlap = $ChartDocs[1].value; // the overlap between each ridgeline
    $: verticalScale = $ChartDocs[2].value; // the vertical spacing between each y axis ticks
    $: height = data.series.length * verticalScale;
    $: marginTop = $ChartDocs[3].value; // the top margin, in pixels
    $: marginRight = $ChartDocs[4].value; // the right margin, in pixels
    $: marginBottom = $ChartDocs[5].value; // the bottom margin, in pixels
    $: marginLeft = $ChartDocs[6].value; // the left margin, in pixels
    $: yAxisOffset = $ChartDocs[7].value; // vertical offset of y-axis labels, in pixels
  
    $: xScale = scaleTime()
      .domain(extent(data.dates))
      .range([marginLeft, width - marginRight]);
  
    $: yScale = scalePoint()
      .domain(data.series.map(d => d.name))
      .range([marginTop, height - marginBottom]);
  
    $: zScale = scaleLinear()
      .domain([0, max(data.series, d => max(d.values))]).nice()
      .range([0, -overlap * yScale.step()]);
  
    $: xTicks = xScale.ticks(width / 80);
    $: xTicksFormatted = xTicks.map(xScale.tickFormat());
  
    const colors = quantize(t => interpolateCool(t * 0.7 + 0.3), data.series.length);
  
    $: areaFunc = area()
      .curve(curveBasis)
      .defined(d => !isNaN(d))
      .x((d, i) => xScale(data.dates[i]))
      .y0(0)
      .y1(d => zScale(d));
  
    $: lineFunc = areaFunc.lineY1();
  </script>
  
  <div class="scatter_plot_container">
    <svg {width} {height} viewBox="0 0 {width + marginLeft} {height}">
      <g class="y-axis" transform="translate({marginLeft}, 0)">
        {#each data.series as series, i}
          <g class="y-tick" transform="translate({marginLeft - 5}, {yScale(series.name)})">
            <line class="tick-start" x1={marginLeft - 6} x2={marginLeft}/>
            <line class="tick-grid" x1={marginLeft} x2={width - marginLeft - marginRight}/>
            <text y={yAxisOffset}>{series.name}</text>
          </g>
        {/each}
      </g>
  
      <g class="x-axis" transform="translate(0,{height - marginBottom})">
        {#each xTicks as tick, i}
          <g class="x-tick" transform="translate({marginLeft + xScale(tick)}, 0)">
            <line class="tick-start" stroke='black' y2='6' />
              <text y="20">{xTicksFormatted[i]}</text>
          </g>
        {/each}
      </g>
        
        {#each data.series as series, i}
          <g class='ridgelines' transform="translate({marginLeft}, {yScale(series.name) + 1})">
            <path
                fill={colors[i]}
                d={areaFunc(series.values)}
            ></path>
            <path
                stroke='black'
                fill='none'
                d={lineFunc(series.values)}
            ></path>
          </g>
        {/each}
    </svg>
  </div>
  
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
  
    .x-tick text {
      fill: black;
      text-anchor: middle;
    }
  
    .y-tick text {
      fill: black;
      text-anchor: end;
    }
  </style>
  