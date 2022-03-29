// // const myvar = 5;
// // const mycode = `${myvar}`;
// // const codetext = `(I will replace mycode dynamically)`;

// // console.log('myvar', myvar);
// // console.log('codetext', codetext);
// // console.log('mycode', `${mycode}`);

// // const repcode = codetext.replace('mycode', '${mycode}');
// // console.log(repcode);
// // console.log(mycode);

// // function looseJsonParse(obj) {
// //   return eval("(" + obj + ")");
// // }
// // console.log(looseJsonParse(
// //  "{a:(4-1), b:function(){}, c:new Date()}"
// // ))

// // function looseJsonParse(obj) {
// //   return Function('"use strict";return (' + obj + ')')();
// // }
// // console.log(looseJsonParse(
// //  "{a:(4-1), b:function(){}, c:new Date()}"
// // ))

// // function Date(n) {
// //   return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][n%7 || 0];
// // }
// // function looseJsonParse(obj) {
// //   return eval("(" + obj + ")");
// // }
// // console.log(looseJsonParse(
// //  "{a:(4-1), b:function(){}, c:new Date()}"
// // ))


// // let person = 'Mike';
// // let age = 28;

// // function myTag(strings, personExp, ageExp) {
// //   let str0 = strings[0]; // "That "
// //   let str1 = strings[1]; // " is a "
// //   let str2 = strings[2]; // "."

// //   let ageStr;
// //   if (ageExp > 99){
// //     ageStr = 'centenarian';
// //   } else {
// //     ageStr = 'youngster';
// //   }

// //   // We can even return a string built using a template literal
// //   return `${str0}${personExp}${str1}${ageStr}${str2}`;
// // }

// // let output = myTag`That ${ person } is a ${ age }.`;

// // console.log(output);
// // const test = {value: 'happy!!!!'};
// // const chord = {};
// // chord.code = "`<script>\n  import * as d3 from 'd3';\n  import { sampleData } from './sampleData.js'\n  const data = sampleData;\n  const marginOffset = ${test.value} //the margin \n<\\/script>\n<svg {width} {height} viewBox=\"{-width / 2} {-height / 2} {width} {height}\">\n  {#each chords.groups as group, i}\n    <path fill={colors[i]} d={arc(group)}\n      on:mouseover=\"{(e) => groupInfo = [i, e, group.value]}\"\n      on:focus=\"{(e) => groupInfo = [i, e]}\"\n      on:mouseout=\"{() => groupInfo = null}\"\n      on:blur=\"{() => groupInfo = null}\" />\n    {#each ticks(group) as groupTick}\n      <g transform=\"rotate({groupTick.angle * 180 / Math.PI - 90}) translate({outerRadius}, 0)\">\n        <line stroke='black' x2='6'/>\n        <text x='8' dy='0.35em' font-size=\"{fontSize}vw\"\n          transform=\"{groupTick.angle > Math.PI ? \"rotate(180) translate(-16)\" : null}\"\n          text-anchor=\"{groupTick.angle > Math.PI ? \"end\" : null}\"\n          font-weight=\"{groupTick.value !== 0 ? \"normal\" : \"bold\"}\">\n          {groupTick.value !== 0 ? Math.round(groupTick.value * 100) + scaleFormat : names[i]}\n        </text>\n      </g>\n    {/each}\n  {/each}\n  \n  {#each chords as chord}\n    {#if selectedChord}\n      <path fill-opacity={selectedChord === chord ? selectOpacity : unselectOpacity} fill={colors[chord.source.index]} d={ribbon(chord)} \n        on:mouseover=\"{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}\"\n        on:focus=\"{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}\"\n        on:mouseout=\"{() => { ribbonInfo = null; selectedChord = null; }}\"\n        on:blur=\"{() => { ribbonInfo = null; selectedChord = null; }}\"\n      />\n    {:else}\n    <path fill-opacity={chordOpacity} fill={colors[chord.source.index]} d={ribbon(chord)} \n      on:mouseover=\"{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}\"\n      on:focus=\"{(e) => {ribbonInfo = [e, chord]; selectedChord = chord; }}\"\n      on:mouseout=\"{() => { ribbonInfo = null; selectedChord = null; }}\"\n      on:blur=\"{() => { ribbonInfo = null; selectedChord = null; }}\"\n    />\n    {/if}\n  {/each}\n</svg>\n<!-- Group Tooltip -->\n{#if groupInfo}  \n  <div style=\"position:absolute; left:{groupInfo[1].clientX + 12}px; top:{groupInfo[1].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}\">\n    {names[groupInfo[0]]}: {(groupInfo[2] * 100).toFixed(2)}{scaleFormat}\n  </div>\n{/if}\n<!-- Ribbon Tooltip -->\n{#if ribbonInfo}  \n  <div style=\"position:absolute; left:{ribbonInfo[0].clientX + 12}px; top:{ribbonInfo[0].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}\">\n    {formatValue(ribbonInfo[1].source.value)} {names[ribbonInfo[1].target.index]} → {names[ribbonInfo[1].source.index]}\n    {ribbonInfo[1].source.index === ribbonInfo[1].target.index \n    ? '' \n    // eslint-disable-next-line max-len\n    : \\`\\\\n\\${formatValue(ribbonInfo[1].target.value)} \\${names[ribbonInfo[1].source.index]} → \\${names[ribbonInfo[1].target.index]}\\`}\n  </div>\n{/if}\n  \n<style>\n  div {\n    white-space: pre;\n  }\n</style>\n`";


// // console.log(eval(chord.code));



// // const code = `let marginTop = ${value.a};`;

// // const codeview = code;

// // console.log(codeview);

// const string = "const sampleData = [\n  [0.096899, 0.008859, 0.000554, 0.00443, 0.025471, 0.024363, 0.005537, 0.025471],\n  [0.001107, 0.018272, 0, 0.004983, 0.011074, 0.01052, 0.002215, 0.004983],\n  [0.000554, 0.002769, 0.002215, 0.002215, 0.003876, 0.008306, 0.000554, 0.003322],\n  [0.000554, 0.001107, 0.000554, 0.012182, 0.011628, 0.006645, 0.004983, 0.01052],\n  [0.002215, 0.00443, 0, 0.002769, 0.104097, 0.012182, 0.004983, 0.028239],\n  [0.011628, 0.026024, 0, 0.013843, 0.087486, 0.168328, 0.017165, 0.055925],\n  [0.000554, 0.004983, 0, 0.003322, 0.00443, 0.008859, 0.017719, 0.00443],\n  [0.002215, 0.007198, 0, 0.003322, 0.016611, 0.01495, 0.001107, 0.054264]\n];\nexport { sampleData };"

// console.log(eval(string));

const string = `<script>
  import * as d3 from 'd3';
  import { fade} from 'svelte/transition';
  import { sampleData } from '../data/observable-chord-data'
  import { ChartDocs } from '../ChartStore';
  const data = sampleData;  
  $: marginOffset = $ChartDocs[1].value //the margin top, bottom, left, right margin offset relative to the radius
  $: width = $ChartDocs[2].value; // the outer width of the chart, in pixels
  $: height = width; // the outer height of the chart, in pixels
  $: bandThickness = $ChartDocs[3].value; // the thickness of the color band representing each dataset
  $: fontSize = $ChartDocs[4].value //the label font size relative to 1% of the width of the viewport
  $: tickStep = $ChartDocs[5].value; //the chart label tick spread factor
  $: scaleFormat = $ChartDocs[6].value; // a format specifier string for the scale ticks
  $: names = $ChartDocs[7].value; // section names
  $: colors = $ChartDocs[8].value; // section fill colors && number of colors in fill array MUST match number of subsets in data
  $: chordOpacity = $ChartDocs[9].value; //the opacity for the charts overall chords
  $: unselectOpacity = $ChartDocs[10].value; //the opacity of non-select chart elements
  $: selectOpacity = $ChartDocs[11].value; //the opacity of select chart elements
  $: tooltipBackground = $ChartDocs[12].value; // background color of tooltip
  $: tooltipTextColor = $ChartDocs[13].value; // text color of tooltip
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
    : \`\n\${formatValue(ribbonInfo[1].target.value)} \${names[ribbonInfo[1].source.index]} → \${names[ribbonInfo[1].target.index]}\`}
  </div>
{/if}
  
<style>
  div {
    white-space: pre;
  }
</style>`;

console.log(eval('string'));

const splitcode = string.split(/<\/?script>|<\/?style>/);

// console.log(splitcode[1] + splitcode[2] + splitcode[3]);

// console.log(splitcode[1].split(/import.+\n/));

// console.log(splitcode[1].split(/ChartStore/)[1]);

let repstring = splitcode[1];

console.log(repstring)

for (let i = 1; i < 14; i++) {
  repstring = repstring.replace(/\$ChartDocs\[\d+].value/, i);
}

console.log(repstring);
// console.log(splitcode[1].replace(/\$ChartDocs\[\d].value/, 5));

$: chordcode = Chord;

  // const splitcode = Chord.split(/<\/?script>|<\/?style>/);

  // console.log(splitcode[1] + splitcode[2] + splitcode[3]);

  // console.log(eval(splitcode[1].split(/ChartStore/)[1]));

  const getdocs = get(ChartDocs);

  // function updateCode(_) {
  //   for (let i = 1; i < $ChartDocs.length; i++) {
  //     chordcode = chordcode.replace(/\$ChartDocs\[\d+].value/, $ChartDocs[i].value)
  //   }
  //   return chordcode;
  // }

  $: updateCode = () => {
    for (let i = 1; i < $ChartDocs.length; i++) {
      chordcode = chordcode.replace(/\$ChartDocs\[\d+].value/, $ChartDocs[i].value)
    }
    return chordcode;
  }
  
  // $: {
  //   console.log('update', $ChartDocs);
  //   updateCode();
  // } 

  // console.log('$', $ChartDocs);
  // console.log('get', get(ChartDocs));

  const quoteData = `${chartData}`;

  $: evalcode = () => {
    // get(ChartDocs);
    console.log('eval', $ChartDocs);
    return eval(code);
  }


  -->{@html Prism.highlight(evalcode(), Prism.languages['javascript'])}<!--