<script>
  import { quantize, interpolatePlasma, pie, arc } from 'd3';
  import { pieData } from '../data/pie-data-census.js'
  import { PieChartDocs } from './PieChart_Store.js'
  
  const data = pieData,
  strokeLinejoin = 'round', // line join of stroke separating wedges
  height = 600, // the outer width of the chart, in pixels
  width = height, // the outer height of the chart, in pixels
  // // percent = false, // format values as percentages (true/false)
  // //GET CLARIFICATION ON tooltip props
  // // strokeWidth = 1, // width of stroke separating wedges
  outerRadius = Math.min(width, height) * 0.5, // should connect to margin
  // //MAKE INNER LABEL AND STROKE dependent on PieChartStore
  innerRadius = outerRadius/5, // should make adjustable
  // // innerRadius = 0, // should make adjustable
  labelRadius = (innerRadius * 0.6 + outerRadius * 0.7), // center radius of labels
  colorRangeStart = .4,
  // //CHANGE STROKE COLOR ==> none to strokeColor var
  strokeColor = innerRadius > 0 ? 'none' : 'white'; // stroke separating widths
  const padAngle = strokeColor === 'none' ? 1 / outerRadius : 0; // angular separation between wedges
  
  // $: height = $PieChartDocs[1].value;
  // $: width = $PieChartDocs[2].value;
  $: percent = $PieChartDocs[3].value;
  $: strokeWidth = $PieChartDocs[4].value;
  // $: outerRadius = Math.min(width, height) * $PieChartDocs[5].value;
  // $: innerRadius = outerRadius / $PieChartDocs[6].value;
  // $: labelRadius = (innerRadius * 0.6 + outerRadius * $PieChartDocs[7].value);
  // $: colorRangeStart = $PieChartDocs[8].value;
  // $: strokeColor = innerRadius > 0 ? $PieChartDocs[9].value : 'white';
  // $: padAngle = strokeColor === $PieChartDocs[9].value ? 1 / outerRadius : 0; // angular separation between wedges
  
  
  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  const xVals = data.map((el) => el[x]);
  const yVals = data.map((el) => Number(el[y]));
  if (percent) {
    const total = yVals.reduce((a, b) => a + b, 0);
    yVals = yVals.map((el) => el / total);
  }
  const iVals = data.map((el, i) => i);
  
  //replace second interpPlasma arg with colorRangeStart
  const colors = quantize(t => interpolatePlasma(t * 0.3 + colorRangeStart), xVals.length);
  
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

  console.log('height', height);
  console.log('arc0', arc(wedges[0]));
  console.log('arcLabel0', arcLabel(wedges[0]));
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
  {#each wedges as wedge, i}
    <path fill={colors[i]} d={arcPath(wedge)} stroke={strokeColor} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
    <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
      <text>
        <tspan font-weight='bold'>{xVals[i]}</tspan>
        <tspan x = '0' dy='1.1em'>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan>
      </text>
    </g>
  {/each}
</svg>