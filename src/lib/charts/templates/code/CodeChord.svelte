<script>
  import Prism from 'prismjs';
  import { ChartDocs } from '../../ChartStore';

  export let chartData;
  export let schema;

  $: code = `<script>
  import * as d3 from 'd3';
  import { sampleData } from './sampleData.js'

  const data = sampleData;
  const marginOffset = ${$ChartDocs[1].value} //the margin top, bottom, left, right margin offset relative to the radius
  const width = ${$ChartDocs[2].value}; // the outer width of the chart, in pixels
  const height = width; // the outer height of the chart, in pixels
  const bandThickness = ${$ChartDocs[3].value}; // the thickness of the color band representing each dataset
  const fontSize = ${$ChartDocs[4].value} //the label font size relative to 1% of the width of the viewport
  const tickStep = ${$ChartDocs[5].value}; //the chart label tick spread factor
  const scaleFormat = '${$ChartDocs[6].value}'; // a format specifier string for the scale ticks
  const names = '${$ChartDocs[7].value}'; // section names
  const colors = [${"'" + $ChartDocs[8].value.join("','") + "'"}]; // section fill colors && number of colors in fill array MUST match number of subsets in data
  const chordOpacity = ${$ChartDocs[9].value}; //the opacity for the charts overall chords
  const unselectOpacity = ${$ChartDocs[10].value}; //the opacity of non-select chart elements
  const selectOpacity = ${$ChartDocs[11].value}; //the opacity of select chart elements
  const tooltipBackground = '${$ChartDocs[12].value}'; // background color of tooltip
  const tooltipTextColor = '${$ChartDocs[13].value}'; // text color of tooltip
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
--><code class="language-javascript"
		><!--
     -->{@html Prism.highlight(code, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
		><!--
     -->{@html Prism.highlight(chartData, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page3_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
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
