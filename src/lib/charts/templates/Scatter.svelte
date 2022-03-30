<script>
    import { scaleLinear, Delaunay } from 'd3';
    import data from '../data/scatter-data' // or pass data to component as prop
    import { ChartDocs } from '../ChartStore';

    $: r = $ChartDocs[0].value; // (fixed) radius of dots, in pixels
    $: marginTop = $ChartDocs[1].value; // the top margin, in pixels
    $: marginRight = $ChartDocs[2].value; // the right margin, in pixels
    $: marginBottom = $ChartDocs[3].value; // the bottom margin, in pixels
    $: marginLeft = $ChartDocs[4].value; // the left margin, in pixels
    $: inset = $ChartDocs[5].value; // inset the default range, in pixels
    $: insetTop = inset; // inset the default y-range
    $: insetRight = inset; // inset the default x-range
    $: insetBottom = inset; // inset the default y-range
    $: insetLeft = inset; // inset the default x-range
    $: width = $ChartDocs[6].value; // the outer width of the chart, in pixels
    $: height = $ChartDocs[7].value; // the outer height of the chart, in pixels
    $: xLabel = $ChartDocs[8].value; // a label for the y-axis
    $: yLabel = $ChartDocs[9].value; // a label for the y-axis
    $: xFormat = $ChartDocs[10].value; // a format specifier string for the x-axis
    $: yFormat = $ChartDocs[11].value; // a format specifier string for the y-axis
    $: xScalefactor = $ChartDocs[12].value; //x-axis number of values
    $: yScalefactor = $ChartDocs[13].value; //y-axis number of values
      // number of colors in fill array MUST match number of subsets in data
    $: colors = $ChartDocs[14].value; // fill color for dots
    $: filled = $ChartDocs[15].value; // whether dots should be filled or outlined
    $: tooltipBackground = $ChartDocs[16].value; // background color of tooltip
    $: tooltipTextColor = $ChartDocs[17].value; // text color of tooltip
  
    const xType = scaleLinear;
    const yType = scaleLinear;
    $: xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
    $: yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]
  
    let x, y, selectedDot, dotInfo, subsets, xVals = [], yVals = [], points = [];
    let reactiveUnit, reactiveXTicks, reactiveYTicks;
    $: reactiveFilters = [...colors];

    // For a single set of data
    if (!Array.isArray(Object.values(data[0])[1])) {
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
        subsets = [];
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
    $: xScale = xType(xDomain, xRange);
    $: yScale = yType(yDomain, yRange);
  
    $: reactivePointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]])
      .filter((el) => reactiveFilters.includes(colors[el[2]]));
    $: reactiveDelaunay = Delaunay.from(reactivePointsScaled);
    $: reactiveVoronoi = reactiveDelaunay.voronoi([0, 0, width, height]);

    $: {
        reactiveXTicks = [];
        reactiveUnit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);

        for (let i = 1; i < xScalefactor + 1; i++) {
            reactiveXTicks.push(i * reactiveUnit);
        }
    }
  
    $: {
        reactiveYTicks = [];
        reactiveUnit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);

        for (let i = 1; i < yScalefactor + 1; i++) {
            reactiveYTicks.push(i * reactiveUnit); // TODO make adjustable and account for optional %
        }
    }
  
    // Updates filter array according to input
    $: reactiveFilter = (color) => {
      if (reactiveFilters.includes(color)) reactiveFilters = reactiveFilters.filter((col) => col !== color);
      else reactiveFilters = [...reactiveFilters, color];
    };
  </script>
  
  <div class="scatter_plot_container">
    <svg {width} {height} viewBox="0 0 {width} {height}"
      on:mouseout="{() => {dotInfo = null; selectedDot = null}}"
      on:blur="{() => {dotInfo = null; selectedDot = null}}"
    >
      <g class="y-axis" transform="translate({marginLeft}, 0)">
        <path class="domain" stroke="black" d="M{insetLeft}, 0.5 V{height}"/>
        {#each reactiveYTicks as tick, i}
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
        {#each reactiveXTicks as tick, i}
          <g class="tick" transform="translate({xScale(tick)}, 0)">
            <line class="tick-start" stroke='black' y2='6' />
            <line class="tick-grid" y2={-height} />
            <text x={-marginLeft} y="20">{tick + xFormat}</text>
          </g>
        {/each}
        <text x={width - marginLeft - marginRight - 40} y={marginBottom}>{xLabel}</text>
      </g>
        
        {#each reactivePointsScaled as dot, i}
          <g class='dot' opacity='1'>
            {#if reactiveFilters.includes(colors[dot[2]])}
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
                  d={reactiveVoronoi.renderCell(i)}
                  on:mouseover="{(e) => { selectedDot = i; dotInfo = [dot, i, e]; }}"
                  on:focus="{(e) => { selectedDot = i; dotInfo = [dot, i, e]; e.target.classList.add('selectedDot'); }}"
              ></path>
            {/if}
          </g>
        {/each}
    </svg>
  
  <!-- Tooltip -->
    {#if dotInfo}  
      <div class="dot_info" style="left:{dotInfo[2].clientX + 12}px; top:{dotInfo[2].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
        <span class="scatter_legend_span" style="background-color: {colors[points[dotInfo[1]][2]]}; height:{width/100}px; width:{width/100}px; " />
        {subsets ? subsets[points[dotInfo[1]][2]] : ''} 
        {x}: {points[dotInfo[1]][0]}, {y}: {points[dotInfo[1]][1]}
      </div>
    {/if}
  
  <!-- Legend/Filters -->
    <section class="scatter_legend" style="width:{width/10}px; font-size: {width/75}px">
      {#if subsets}
      <h1 class="legend_title"><b>Legend</b></h1>
      <h5 class="legend_note">Click to Filter</h5>
        {#each subsets as subset, i}  
          <div class="scatter_legend_info" on:click={() => reactiveFilter(colors[i])}>
            <span class="scatter_legend_span" style="background-color: {colors[i]}; height:{width/50}px; width:{width/50}px; " />
            {subset}
          </div>
        {/each}
      {/if}
    </section>
  </div>
  
  <style>
    svg {
      width: 80%;
      height: 100%;
      height: "intrinsic";
      margin-top: auto;
      margin-bottom: auto;
    }
  
    .scatter_plot_container{
      display: flex;
      justify-content: center;
    }
  
    .scatter_legend{
      color: black;
      margin-top: auto;
      margin-bottom: auto;
    }
  
    .scatter_legend_info{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  
    .scatter_legend_span{
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