<script>
  import * as d3 from 'd3';
  import { fade} from 'svelte/transition';
  import { sampleData } from '../data/observable-chord-data'
  import { ChordChartDocs } from '../ChartStore';
  const data = sampleData;
  $: marginOffset = $ChordChartDocs[1].value //the margin top, bottom, left, right margin offset relative to the radius
  $: width = $ChordChartDocs[2].value; // the outer width of the chart, in pixels
  $: height = width; // the outer height of the chart, in pixels
  $: bandThickness = $ChordChartDocs[3].value; // the thickness of the color band representing each dataset
  $: fontSize = $ChordChartDocs[4].value //the label font size relative to 1% of the width of the viewport
  $: tickStep = $ChordChartDocs[5].value; //the chart label tick spread factor
  $: scaleFormat = $ChordChartDocs[6].value; // a format specifier string for the scale ticks
  $: names = $ChordChartDocs[7].value; // section names
  $: colors = $ChordChartDocs[8].value; // section fill colors && number of colors in fill array MUST match number of subsets in data
  $: chordOpacity = $ChordChartDocs[9].value; //the opacity for the charts overall chords
  $: unselectOpacity = $ChordChartDocs[10].value; //the opacity of non-select chart elements
  $: selectOpacity = $ChordChartDocs[11].value; //the opacity of select chart elements
  $: tooltipBackground = $ChordChartDocs[12].value; // background color of tooltip
  $: tooltipTextColor = $ChordChartDocs[13].value; // text color of tooltip
  $: outerRadius = Math.min(width, height) * 0.5 - marginOffset; // should connect to margin
  $: innerRadius = outerRadius - bandThickness; // should make adjustable
  
  let groupInfo, ribbonInfo;
  $: selectedChord = null;
  $: chord = d3.chord()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);
  $: chords = chord(data);
  $: arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  $: ribbon = d3.ribbon()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius);
  $:ticks = ({startAngle, endAngle, value}) => {
    const k = (endAngle - startAngle) / value;
    return d3.range(0, value, (tickStep/100)).map(value => {
      return {value, angle: value * k + startAngle};
    });
  }
  $: formatValue = (val) => {
    return (val * 100).toFixed(2) + scaleFormat;
  }
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}" >
  {#each chords.groups as group, i}
    <path fill={colors[i]} d={arc(group)}
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
    {#if selectedChord}
      <path fill-opacity={selectedChord === chord ? selectOpacity : unselectOpacity} fill={colors[chord.source.index]} d={ribbon(chord)}
        on:mouseover="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
        on:focus="{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}"
        on:mouseout="{() => { ribbonInfo = null; selectedChord = null; }}"
        on:blur="{() => { ribbonInfo = null; selectedChord = null; }}"
      />
    {:else}
    <path fill-opacity={chordOpacity} fill={colors[chord.source.index]} d={ribbon(chord)}
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
    {names[groupInfo[0]]}: {(groupInfo[2] * 100).toFixed(2)}{scaleFormat}
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
</style>