<script>
  import * as d3 from 'd3';
  import { fade } from 'svelte/transition';

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

  let groupInfo, ribbonInfo;

  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  const xVals = data.map((el) => el[x]);
  let yVals = data.map((el) => Number(el[y]));
  if (percent) {
    const total = yVals.reduce((a, b) => a + b, 0);
    yVals = yVals.map((el) => el / total);
  }
  const iVals = data.map((el, i) => i);



  if (!colors) colors = d3.quantize(t => d3.interpolatePlasma(t * 0.7 + 0.3), xVals.length);

  console.log(data);
  console.log(x, 'xVals', xVals);
  console.log(y, 'yVals', yVals);
  console.log('colors', colors);

  $: selectedChord = null;

  const wedges = d3.pie().
    padAngle(padAngle).
    sort(null).
    value(i => yVals[i])(iVals);

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const arcLabel = d3.arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  console.log('wedges', wedges);
  console.log('arc0', arc(wedges[0]));
  console.log('arcLabel0', arcLabel(wedges[0]));
</script>

<!-- on:mouseover="{(e) => groupInfo = [i, e, group.value]}"
on:focus="{(e) => groupInfo = [i, e]}"
on:mouseout="{() => groupInfo = null}"
on:blur="{() => groupInfo = null}"  -->

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
  {#each wedges as wedge, i}
    <path fill={colors[i]} d={arc(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
    <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
      <text>
        <tspan font-weight='bold'>{xVals[i]}</tspan>
        <tspan x = '0' dy='1.1em'>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan>
      </text>
    </g>
  {/each}
</svg>

<!-- Group Tooltip -->
<!-- {#if groupInfo}  
  <div style="position:absolute; left:{groupInfo[1].clientX + 12}px; top:{groupInfo[1].clientY + 12}px; background-color:{tooltipBackground}; color:{tooltipTextColor}">
    {names[groupInfo[0]]}: {(groupInfo[2] * 100).toFixed(2)}%
  </div>
{/if} -->
  
<style>
  /* div {
    white-space: pre;
  } */
</style>