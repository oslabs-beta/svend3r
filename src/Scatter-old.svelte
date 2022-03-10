<script>
  import * as d3 from "d3";
  import { fly } from "svelte/transition";
  import { onMount } from 'svelte';
// import { filter } from "d3";
// import { subset } from "d3";

  export let scatterdata;

  let data = scatterdata,
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
    xType = d3.scaleLinear, // type of x-scale
    xRange = [marginLeft + insetLeft, width - marginRight - insetRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yRange = [height - marginBottom - insetBottom, marginTop + insetTop], // [bottom, top]
    xLabel = "Weight →", // a label for the y-axis
    yLabel = "↑ Height", // a label for the y-axis
    xFormat = "kg", // a format specifier string for the y-axis
    yFormat = "cm", // a format specifier string for the y-axis
    xScalefactor = 10, //y-axis number of values
    yScalefactor = 12, //y-axis number of values
    // number of colors in fill array MUST match number of subsets in data
    fill = ["red", "orange", "yellow", "green", "blue"], // fill color for dots
    stroke = "black", // stroke color for the dots
    strokeWidth = 1.5, // stroke width for dots
    halo = "#fff", // color of label halo 
    haloWidth = 3, // padding around the labels
    duration = 1000;

  let x, y, X = [], Y = [], points = [], subsets = [], filters;

  // Account for data without subsets
  if (fill.length === 1) {
    x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
    y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
    X = data.map((el) => el[x]);
    Y = data.map((el) => el[y]);
    points = data.map((el) => [el[x], el[y], 0]);
  }
  else {
    x = Object.keys(data[0]?.data[0])[0];
    y = Object.keys(data[0]?.data[0])[1];
    data.forEach((subset, i) => {
      subset.data.forEach((coordinate) => {
        X.push(coordinate[x]);
        Y.push(coordinate[y]);
        points.push([coordinate[x], coordinate[y], i])
      });
      subsets.push(subset.id);
    });
    filters = [...fill];
  }
  console.log('x', x, 'y', y)
  console.log(points);
  console.log(subsets);

  // $: filters = [...fill];

  let xDomain; // an array of (ordinal) x-values // sort by descending frequency
  let yDomain; // [ymin, ymax]
  $: xDomain = [0, Math.max(...X)];
  $: yDomain = [0, Math.max(...Y)];
  
  $: xScale = xType(xDomain, xRange);
  $: yScale = yType(yDomain, yRange);

  $: pointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]])
                            .filter((el) => filters.includes(fill[el[2]]));
  // $: points = points.map((el) => [xScale(el[x]), yScale(el[y])]);
  // $: points = data.map((el) => [el[x], el[y]]);
  $: delaunay = d3.Delaunay.from(pointsScaled);
  $: voronoi = delaunay.voronoi([0, 0, width, height]);

  $: xTicks = [];
  $: unit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);
  $: for (let i = 1; i < xScalefactor + 1; i++) {
    xTicks.push(i * unit);
  };

  $: yTicks = [];
  $: unit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);
  $: for (let i = 1; i < yScalefactor + 1; i++) {
    yTicks.push(i * unit); // TODO make adjustable here and in BarChart
  };

  let selectedDot, dotInfo;

  function zoom(svg) {
    console.log('zoom!');
    const extent = [[marginLeft, marginTop], [width - marginRight, height - marginTop]];

    d3.select('svg').call(d3.zoom()
        .scaleExtent([0.5, 32])
        // .translateExtent(extent)
        // .extent(extent)
        .on("zoom", zoomed));

    // I think this can work...but it doesn't work yet
    // function zoomed({transform}) {
    //   console.log('transform', transform);
    //   const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
    //   const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
    //   gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
    //   gx.call(xAxis, zx);
    //   gy.call(yAxis, zy);
    //   gGrid.call(grid, zx, zy);
    // }

    // This probably isn't useful but I'm keeping it for reference
    // function zoomed(event) {
    //   console.log('zoomed');
    //   x.range([marginLeft, width - marginRight].map(d => event.transform.applyX(d)));
    //   svg.selectAll(".bars rect").attr("x", d => x(d.name)).attr("width", x.bandwidth());
    //   svg.selectAll(".x-axis").call(xAxis);
    // }
  }

  onMount(() => {
    // let svg = document.querySelector('svg');
    // console.log('onmount', svg)
    // zoom(svg);
    console.log('domains', xDomain, yDomain);
  });
  
  const sortedAsc = () => {
    console.log('sort asc');
    data = data.sort((a,b) => a[y] - b[y]);
    // X = data.map((el) => el[x]);
    // Y = data.map((el) => el[y]);
    // xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    // yScale = yType(yDomain, yRange);
    // xDomain = X;
    // yDomain = [0, d3.max(Y)];
    // xDomain = new d3.InternSet(xDomain);
    console.log('X', X, 'Y', Y);
    console.log(data);
  }

  const sortedDesc = () => {
    console.log('sort asc');
    data = data.sort((a,b) => b[y] - a[y]);
    // X = data.map((el) => el[x]);
    // Y = data.map((el) => el[y]);
    // xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    // yScale = yType(yDomain, yRange);
    // xDomain = X;
    // yDomain = [0, d3.max(Y)];
    // xDomain = new d3.InternSet(xDomain);
    console.log('X', X, 'Y', Y);
    console.log(data);
  }

  const filter = (color) => {
    console.log(color, filters);
    if (filters.includes(color)) filters = filters.filter((col) => col !== color);
    else filters = [...filters, color];
    console.log(filters);
  }

  // Compute values X and Y value of Arrays
  // let x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  // let y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  // $: X = data.map((el) => el[x]);
  // $: Y = data.map((el) => el[y]);

  // // Compute default domains, and unique the x-domain.
  // let xDomain; // an array of (ordinal) x-values // sort by descending frequency
  // let yDomain; // [ymin, ymax]
  // $: xDomain = X;
  // $: yDomain = [0, d3.max(Y)];
  // // if (yDomain === undefined) yDomain = [0, 12];
  // // $: xDomain = new d3.InternSet(xDomain);

  // // Omit any data not present in the x-domain.
  // // const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

  // // Construct scales, axes, and formats.
  // let xRange = [marginLeft, width - marginRight]; // [left, right]
  // let yRange = [height - marginBottom, marginTop]; // [bottom, top]
  // let yType = d3.scaleLinear; // y-scale type
  // $: xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  // $: yScale = yType(yDomain, yRange);

  // $: yTicks = [];
  // $: unit = (Math.max(...Y) - Math.min(...Y)) / yScalefactor;
  // $: for (let i = 1; i < yScalefactor + 1; i++) {
  //   yTicks.push(Math.floor(i * unit * 100));
  // }
</script>

<!-- <div class='wrapper' on:mousemove={(e) => {
  console.log('points', points);
  const bounds = e.target.getBoundingClientRect();
  const xPos = e.clientX - bounds.left;
  const yPos = e.clientY - bounds.top;
  const pointIndex = delaunay.find(xPos,yPos);
  selectedDot = data[pointIndex];
  console.log('clientX', e.clientX, 'clientY', e.clientY, 'bounds', bounds, 'x', xPos, 'y', yPos, selectedDot);
  // bind:clientHeight={height} style="width: {width}px;"
}} > -->
  <svg {width} {height} viewBox="0 0 {width} {height}">
    <g class="y-axis" transform="translate({marginLeft}, 0)">
      <path class="domain" stroke="black" d="M{insetLeft}, 0.5 V{height}" />
      {#each yTicks as tick, i}
        <g
          class="tick"
          opacity="1"
          transform="translate(0, {yScale(tick)})"
        >
          <line class="tick-start" stroke="red" stroke-opacity="1" x2="-6" />
          <line class="tick-grid" x1={insetLeft} x2={width - marginLeft - marginRight} />
          <text x={-marginLeft} y="10">{tick + yFormat}</text>
        </g>
      {/each}
      <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
    </g>

    <!-- <g class="plot" transition:fly={{ y: -200, duration: 1000 }}>
      {#each data as dot, i}
        <g class='dot' opacity='1'>
          <circle
            cx={xScale(dot[x])}
            cy={yScale(dot[y])}
            r={r}
            stroke={stroke}
            fill={fill}
          />
          <text x={xScale(dot[x])} y={yScale(dot[y])}>{x}, {y}</text>
        </g>
      {/each}
    </g> -->

    <!-- <g class="plot" transition:fly={{ y: -200, duration: 1000 }}> -->
      {#each pointsScaled as dot, i}
        <g class='dot' opacity='1' >
          {#if filters.includes(fill[dot[2]])}
            {#if i === selectedDot}
              <circle
                cx={dot[0]}
                cy={dot[1]}
                r={r+2}
                stroke={stroke}
                fill={fill[dot[2]]}
              />
            {:else}
              <circle
                cx={dot[0]}
                cy={dot[1]}
                r={r}
                stroke={stroke}
                fill={fill[dot[2]]}
              />
            {/if}
            <path
                stroke="purple"
                fill-opacity="0"
                class="voronoi-cell"
                d={voronoi.renderCell(i)}
                on:mouseover="{() => { console.log('VVV', dot); selectedDot = i; dotInfo = [dot, i]; }}"
                on:focus="{(e) => { console.log('VVV', dot); selectedDot = i; e.target.classList.add('selectedDot'); }}"    
            ></path>
          {/if}
          <!-- {#if i === selectedDot}  
            <text x={dot[0] + 12} y={dot[1] - 12}>{data[i][x]}, {data[i][y]}</text>
          {/if} -->
        </g>
      {/each}
    <!-- </g> -->

    <g class="x-axis" transform="translate(0,{height - marginBottom})">
      <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
      {#each xTicks as tick, i}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScale(tick)}, 0)"
      >
        <line 
          x1={0}
          x2={0}
          stroke='black'
          y2='6'
        />
        <text x={-marginLeft} y="20">{tick + yFormat}</text>
      </g>
    {/each}
    </g>
  </svg>
  {#if dotInfo}  
    <div style="position:absolute; left:{dotInfo[0][0] + 12}px; top:{dotInfo[0][1] - 12}px; background-color:yellow;">
      {x}: {points[dotInfo[1]][0]}, {y}: {points[dotInfo[1]][1]}
    </div>
  {/if}
  {#if subsets.length}
    {#each subsets as subset, i}  
      <div on:click={() => filter(fill[i])}>
        <span style="height: 25px; width: 25px; border-radius:50%; background-color: {fill[i]}; display: inline-block;" />
        <p>{fill[i]} {subset}</p>
      </div>
    {/each}
  {/if}
  <!-- <div style="position:absolute; left:80px; top:80px; background-color:yellow;" use:wheel={(e) => console.log(e)}>Scroll</div> -->
<!-- </div> -->

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
  }


  path {
    fill: "green"
  }

  [class*="selectedDot"] {
    stroke: "purple"
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
