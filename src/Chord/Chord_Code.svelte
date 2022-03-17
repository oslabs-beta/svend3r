<script>
    import Prism from 'prismjs';
    import { ChordChartDocs } from './Chord_Store.js';
  
    $: code = `<script>
  import * as d3 from 'd3';
  import { sampleData } from './sampleData.js'

  const data = sampleData;
  const marginOffset = ${$ChordChartDocs[1].value} //the margin top, bottom, left, right margin offset relative to the radius
  const width = ${$ChordChartDocs[2].value}; // the outer width of the chart, in pixels
  const height = width; // the outer height of the chart, in pixels
  const bandThickness = ${$ChordChartDocs[3].value}; // the thickness of the color band representing each dataset
  const fontSize = ${$ChordChartDocs[4].value} //the label font size relative to 1% of the width of the viewport
  const tickStep = ${$ChordChartDocs[5].value}; //the chart label tick spread factor
  const scaleFormat = '${$ChordChartDocs[6].value}'; // a format specifier string for the scale ticks
  const names = [${"'" + $ChordChartDocs[7].value.join("','") + "'"}]; // section names
  const colors = [${"'" + $ChordChartDocs[8].value.join("','") + "'"}]; // section fill colors && number of colors in fill array MUST match number of subsets in data
  const chordOpacity = ${$ChordChartDocs[9].value}; //the opacity for the charts overall chords
  const unselectOpacity = ${$ChordChartDocs[10].value}; //the opacity of non-select chart elements
  const selectOpacity = ${$ChordChartDocs[11].value}; //the opacity of select chart elements
  const tooltipBackground = '${$ChordChartDocs[12].value}'; // background color of tooltip
  const tooltipTextColor = '${$ChordChartDocs[13].value}'; // text color of tooltip
  const outerRadius = Math.min(width, height) * 0.5 - marginOffset; // should connect to margin
  const innerRadius = outerRadius - bandThickness; // should make adjustable
  
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

  function ticks({startAngle, endAngle, value}) {
    const k = (endAngle - startAngle) / value;
    return d3.range(0, value, (tickStep/100)).map(value => {
      return {value, angle: value * k + startAngle};
    });
  }

  function formatValue(val) {
    return (val * 100).toFixed(2) + scaleFormat;
  }
<\/script>

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
    : \`\\n\${formatValue(ribbonInfo[1].target.value)} \${names[ribbonInfo[1].source.index]} → \${names[ribbonInfo[1].target.index]}\`}
  </div>
{/if}
  
<style>
  div {
    white-space: pre;
  }
</style>
`;
  
    // outputs the content of the text file
  
    const data = `const sampleData = [
  [0.096899, 0.008859, 0.000554, 0.00443, 0.025471, 0.024363, 0.005537, 0.025471],
  [0.001107, 0.018272, 0, 0.004983, 0.011074, 0.01052, 0.002215, 0.004983],
  [0.000554, 0.002769, 0.002215, 0.002215, 0.003876, 0.008306, 0.000554, 0.003322],
  [0.000554, 0.001107, 0.000554, 0.012182, 0.011628, 0.006645, 0.004983, 0.01052],
  [0.002215, 0.00443, 0, 0.002769, 0.104097, 0.012182, 0.004983, 0.028239],
  [0.011628, 0.026024, 0, 0.013843, 0.087486, 0.168328, 0.017165, 0.055925],
  [0.000554, 0.004983, 0, 0.003322, 0.00443, 0.008859, 0.017719, 0.00443],
  [0.002215, 0.007198, 0, 0.003322, 0.016611, 0.01495, 0.001107, 0.054264]
];

export { sampleData };`;
  
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
  