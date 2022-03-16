<script>
  import Prism from 'prismjs';
  import { PieChartDocs } from './PieChart_Store';

  $: code = `<script>
  import { quantize, interpolatePlasma, pie, arc } from 'd3';

  export let pieData;

  const data = pieData,
    // TODO: add margin vars
    width = 900, // the outer width of the chart, in pixels
    height = 900, // the outer height of the chart, in pixels
    percent = false, // format values as percentages (true/false)
    // number of colors in array MUST match number of wedges
    // colors, // wedge colors
    tooltipBackground = 'black', // background color of tooltip
    tooltipTextColor = 'white', // text color of tooltip
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = 'round'; // line join of stroke separating wedges

  let colors;

  const outerRadius = Math.min(width, height) * 0.5 - 60, // should connect to margin
    innerRadius = outerRadius - 200, // should make adjustable
    // innerRadius = 0, // should make adjustable
    labelRadius = (innerRadius * 0.2 + outerRadius * 0.8), // center radius of labels
    stroke = innerRadius > 0 ? 'none' : 'white', // stroke separating widths
    padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges

  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  const xVals = data.map((el) => el[x]);
  let yVals = data.map((el) => Number(el[y]));
  if (percent) {
    const total = yVals.reduce((a, b) => a + b, 0);
    yVals = yVals.map((el) => el / total);
  }
  const iVals = data.map((el, i) => i);

  if (!colors) colors = quantize(t => interpolatePlasma(t * 0.7 + 0.3), xVals.length);

  const wedges = pie().
    padAngle(padAngle).
    sort(null).
    value(i => yVals[i])(iVals);

  const arcPath = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const arcLabel = arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  console.log('wedges', wedges);
  console.log('arc0', arc(wedges[0]));
  console.log('arcLabel0', arcLabel(wedges[0]));
<\/script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
  {#each wedges as wedge, i}
    <path fill={colors[i]} d={arcPath(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
    <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
      <text>
        <tspan font-weight='bold'>{xVals[i]}</tspan>
        <tspan x = '0' dy='1.1em'>{percent ? \`\${(yVals[i] * 100).toFixed(2)}%\` : yVals[i].toLocaleString('en-US')}</tspan>
      </text>
    </g>
  {/each}
</svg>
`
const data = `
const csv = \`Ages,Count
<5,19736
5-9,20212
10-14,20827
15-19,20849
20-24,21254
25-29,23277
30-34,21932
35-39,21443
40-44,19584
45-49,20345
50-54,20355
55-59,21163
60-64,20592
65-69,17356
70-74,14131
75-79,9357
80-84,6050
≥85,5893\`;

const data = csv.split('\\n').slice(1).map(str => {
  const [ages, count] = str.split(',');
  return { ages, count };
});
`
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