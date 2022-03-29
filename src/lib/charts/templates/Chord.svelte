<script>
  import { arc, chord, descending, range, ribbon } from 'd3';
  import data from '../data/chord-data' // or pass data to component as prop
  import { ChartDocs } from '../ChartStore';

  $: marginOffset = $ChartDocs[0].value // the margin top, bottom, left, right margin offset relative to the radius
  $: width = $ChartDocs[1].value; // the outer width of the chart, in pixels
  $: bandThickness = $ChartDocs[2].value; // the thickness of the color band representing each dataset
  $: fontSize = $ChartDocs[3].value //the label font size relative to 1% of the width of the viewport
  $: tickStep = $ChartDocs[4].value; //the chart label tick spread factor
  $: scaleFormat = $ChartDocs[5].value; // a format specifier string for the scale ticks
  $: names = $ChartDocs[6].value; // section names
  $: colors = $ChartDocs[7].value; // section fill colors && number of colors in fill array MUST match number of subsets in data
  $: chordOpacity = $ChartDocs[8].value; //the opacity for the charts overall chords
  $: unselectOpacity = $ChartDocs[9].value; //the opacity of non-select chart elements
  $: selectOpacity = $ChartDocs[10].value; //the opacity of select chart elements
  $: tooltipBackground = $ChartDocs[11].value; // background color of tooltip
  $: tooltipTextColor = $ChartDocs[12].value; // text color of tooltip
  $: height = width; // the outer height of the chart, in pixels
  $: outerRadius = Math.min(width, height) * 0.5 - marginOffset; // should connect to margin
  $: innerRadius = outerRadius - bandThickness; // should make adjustable
  
  let groupInfo, ribbonInfo;
  $: reactiveSelectedChord = null;
  $: d3chord = chord()
    .padAngle(10 / innerRadius)
    .sortSubgroups(descending)
    .sortChords(descending);
  $: chords = d3chord(data);
  $: d3arc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  $: d3ribbon = ribbon()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius);
  $: ticks = ({startAngle, endAngle, value}) => {
    const k = (endAngle - startAngle) / value;
    return range(0, value, (tickStep/100)).map(value => {
      return {value, angle: value * k + startAngle};
    });
  }
  const formatValue = (val) => {
    return (val * 100).toFixed(2) + scaleFormat;
  }
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}" >
  {#each chords.groups as group, i}
    <path fill={colors[i]} d={d3arc(group)}
      on:mouseover="{(e) => groupInfo = [i, e, group.value]}"
      on:focus="{(e) => groupInfo = [i, e]}"
      on:mouseout="{() => groupInfo = null}"
      on:blur="{() => groupInfo = null}" />
    {#each ticks(group) as groupTick}
      <g transform="rotate({groupTick.angle * 180 / Math.PI - 90}) translate({outerRadius}, 0)">
        <line stroke='black' x2='6'/>
        <text x='8' dy='0.35em' font-size="{fontSize}vw"
          transform="{groupTick.angle > Math.PI ? "rotate(180) translate(-16)" : null}"
          text-anchor="{groupTick.angle > Math.PI ? "end" : null}"
          font-weight="{groupTick.value !== 0 ? "normal" : "bold"}">
          {groupTick.value !== 0 ? Math.round(groupTick.value * 100) + scaleFormat : names[i]}
        </text>
      </g>
    {/each}
  {/each}
  
  {#each chords as chord}
    {#if reactiveSelectedChord}
      <path fill-opacity={reactiveSelectedChord === chord ? selectOpacity : unselectOpacity} fill={colors[chord.source.index]} d={d3ribbon(chord)}
        on:mouseover="{(e) => {ribbonInfo = [e, chord]; reactiveSelectedChord = chord; }}"
        on:focus="{(e) => {ribbonInfo = [e, chord]; reactiveSelectedChord = chord; }}"
        on:mouseout="{() => { ribbonInfo = null; reactiveSelectedChord = null; }}"
        on:blur="{() => { ribbonInfo = null; reactiveSelectedChord = null; }}"
      />
    {:else}
    <path fill-opacity={chordOpacity} fill={colors[chord.source.index]} d={d3ribbon(chord)}
      on:mouseover="{(e) => {ribbonInfo = [e, chord]; reactiveSelectedChord = chord; }}"
      on:focus="{(e) => {ribbonInfo = [e, chord]; reactiveSelectedChord = chord; }}"
      on:mouseout="{() => { ribbonInfo = null; reactiveSelectedChord = null; }}"
      on:blur="{() => { ribbonInfo = null; reactiveSelectedChord = null; }}"
    />
    {/if}
  {/each}
</svg>

<!-- Group Tooltip -->
{#if groupInfo}  
  <div style="position:absolute; left:{groupInfo[1].clientX + 12}px; top:{groupInfo[1].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {names[groupInfo[0]]}: {(groupInfo[2] * 100).toFixed(2)}{scaleFormat}
  </div>
{/if}

<!-- Ribbon Tooltip -->
{#if ribbonInfo}  
  <div style="position:absolute; left:{ribbonInfo[0].clientX + 12}px; top:{ribbonInfo[0].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {formatValue(ribbonInfo[1].source.value)} {names[ribbonInfo[1].target.index]} → {names[ribbonInfo[1].source.index]}
    {ribbonInfo[1].source.index === ribbonInfo[1].target.index 
    ? ''
    : `\n${formatValue(ribbonInfo[1].target.value)} ${names[ribbonInfo[1].source.index]} → ${names[ribbonInfo[1].target.index]}`}
  </div>
{/if}
  
<style>
  div {
    white-space: pre;
  }
</style>