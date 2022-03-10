<script>
  import * as d3 from 'd3';
  import { fade } from 'svelte/transition';

  export let chordData;

  const data = chordData,
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 1152, // the outer width of the chart, in pixels
    height = 1152, // the outer height of the chart, in pixels
    scaleType = d3.scaleLinear, // type of scale
    // xRange = [marginLeft, width - marginRight - insetRight], // [left, right]
    tickStep = 0.01,
    scaleFormat = '%',
    // number of names in array MUST match number of colors in array
    names = ['Apple', 'HTC', 'Huawei', 'LG', 'Nokia', 'Samsung', 'Sony', 'Other'], // section names
    colors = ['#c4c4c4', '#69b40f', '#ec1d25', '#c8125c', '#008fc8', '#10218b', '#134b24', '#737373'], // section colors
    filled = false, // whether dots should be filled or outlined
    tooltipBackground = 'black', // background color of tooltip
    tooltipTextColor = 'white'; // text color of tooltip

  const outerRadius = Math.min(width, height) * 0.5 - 60, // should connect to margin
    innerRadius = outerRadius - 10; // should make adjustable

  let x, y, xVals = [], yVals = [], points = [],
    filters = [...colors], selectedDot, dotInfo;
  const subsets = [];

  let groupInfo, ribbonInfo;

  $: selectedChord = null;

  const chord = d3.chord()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);
  const chords = chord(data);

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const ribbon = d3.ribbon()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius);

  const colorScale = d3.scaleOrdinal(names, colors);

  function ticks({startAngle, endAngle, value}) {
    const k = (endAngle - startAngle) / value;
    return d3.range(0, value, tickStep).map(value => {
      return {value, angle: value * k + startAngle};
    });
  }

  function formatValue(val) {
    return `${(val * 100).toFixed(2)}%`;
  }

  console.log('chord', chord);
  console.log('chords', chords);
  console.log('chords.groups --> arc', arc(chords.groups[0]));
  console.log('chords --> ribbon', ribbon(chords[0]));
  console.log('colorScale', colorScale(names));
  console.log('ticks', ticks(chords.groups[0]));
  

  // const xDomain = [0, Math.max(...xVals)];
  // const yDomain = [0, Math.max(...yVals)];
  // const xScale = xType(xDomain, xRange);
  // const yScale = yType(yDomain, yRange);

  // $: pointsScaled = points.map((el) => [xScale(el[0]), yScale(el[1]), el[2]])
  //   .filter((el) => filters.includes(colors[el[2]]));
  // $: delaunay = Delaunay.from(pointsScaled);
  // $: voronoi = delaunay.voronoi([0, 0, width, height]);

  // $: xTicks = [];
  // $: unit = Math.round((xDomain[1] - xDomain[0]) / xScalefactor);
  // $: for (let i = 1; i < xScalefactor + 1; i++) {
  //   xTicks.push(i * unit);
  // }

  // $: yTicks = [];
  // $: unit = Math.round((yDomain[1] - yDomain[0]) / yScalefactor);
  // $: for (let i = 1; i < yScalefactor + 1; i++) {
  //   yTicks.push(i * unit); // TODO make adjustable and account for optional %
  // }

  // Updates filter array according to input
  // const filter = (color) => {
  //   if (filters.includes(color)) filters = filters.filter((col) => col !== color);
  //   else filters = [...filters, color];
  // };
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
  {#each chords.groups as group, i}
    <path fill={colors[i]} d={arc(group)}
      on:mouseover="{(e) => groupInfo = [i, e, group.value]}"
      on:focus="{(e) => groupInfo = [i, e]}"
      on:mouseout="{() => groupInfo = null}"
      on:blur="{() => groupInfo = null}" />
    {#each ticks(group) as groupTick}
      <g transform="rotate({groupTick.angle * 180 / Math.PI - 90}) translate({outerRadius}, 0)">
        <line stroke='black' x2='6'/>
        <text x='8' dy='0.35em'
          transform="{groupTick.angle > Math.PI ? "rotate(180) translate(-16)" : null}"
          text-anchor="{groupTick.angle > Math.PI ? "end" : null}"
          font-weight="{groupTick.value !== 0 ? "normal" : "bold"}">
          {groupTick.value !== 0 ? `${Math.round(groupTick.value * 100)}%` : names[i]}
        </text>
      </g>
    {/each}
  {/each}
  <!-- {#each chords as chord}
    <path fill-opacity={selectedChord === chord ? '1' : '0.8'} fill={colors[chord.source.index]} d={ribbon(chord)} 
    on:mouseover="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
    on:focus="{(e) => ribbonInfo = [e, chord]}"
    on:mouseout="{() => ribbonInfo = null}"
    on:blur="{() => ribbonInfo = null}" />
  {/each} -->
  {#each chords as chord}
    {#if selectedChord}
      <path fill-opacity={selectedChord === chord ? '1' : '0.4'} fill={colors[chord.source.index]} d={ribbon(chord)} 
        on:mouseover="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
        on:focus="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
        on:mouseout="{() => { ribbonInfo = null; selectedChord = null; }}"
        on:blur="{() => { ribbonInfo = null; selectedChord = null; }}"
      />
    {:else}
    <path fill-opacity='0.8' fill={colors[chord.source.index]} d={ribbon(chord)} 
      on:mouseover="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
      on:focus="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
      on:mouseout="{() => { ribbonInfo = null; selectedChord = null; }}"
      on:blur="{() => { ribbonInfo = null; selectedChord = null; }}"
    />
    {/if}
  {/each}
</svg>

<!-- Group Tooltip -->
{#if groupInfo}  
  <div style="position:absolute; left:{groupInfo[1].clientX + 12}px; top:{groupInfo[1].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {names[groupInfo[0]]}: {(groupInfo[2] * 100).toFixed(2)}%
  </div>
{/if}

<!-- Ribbon Tooltip -->
{#if ribbonInfo}  
  <div style="position:absolute; left:{ribbonInfo[0].clientX + 12}px; top:{ribbonInfo[0].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {formatValue(ribbonInfo[1].source.value)} {names[ribbonInfo[1].target.index]} → {names[ribbonInfo[1].source.index]}
    {ribbonInfo[1].source.index === ribbonInfo[1].target.index 
    ? '' 
    // eslint-disable-next-line max-len
    : `\n${formatValue(ribbonInfo[1].target.value)} ${names[ribbonInfo[1].source.index]} → ${names[ribbonInfo[1].target.index]}`}
  </div>
{/if}
  
<style>
  div {
    white-space: pre;
  }
  
  /* svg {
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
  } */
</style>