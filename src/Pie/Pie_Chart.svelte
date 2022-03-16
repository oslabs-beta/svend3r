<script>
  import { quantize, interpolatePlasma, pie, arc } from 'd3';
  import pieData from '../data/pie-data-census'
  // import PieChartDocs from './PieChart_Store.js'

  const data = pieData,
  height = 600, // the outer width of the chart, in pixels
  width = height, // the outer height of the chart, in pixels
  percent = false, // format values as percentages (true/false)
  //GET CLARIFICATION ON tooltip props
  strokeWidth = 1, // width of stroke separating wedges
  strokeLinejoin = 'round', // line join of stroke separating wedges
  outerRadius = Math.min(width, height) * 0.5, // should connect to margin
  //MAKE INNER LABEL AND STROKE dependent on PieChartStore
  innerRadius = outerRadius/5, // should make adjustable
  // innerRadius = 0, // should make adjustable
  labelRadius = (innerRadius * 0.6 + outerRadius * 0.8), // center radius of labels
  //CHANGE STROKE COLOR ==> none to strokeColor var
  stroke = innerRadius > 0 ? 'none' : 'white'; // stroke separating widths
  
  // $: height = $PieChartDocs[1].value;
  // $: width = $PieChartDocs[1].value;
  // $: percent = $PieChartDocs[2].value;
  // $: strokeWidth = $PieChartDocs[3].value;
  // $: outerRadius = Math.min(width, height) * $PieChartDocs[4].value;
  // $: innerRadius = outerRadius / $PieChartDocs[5].value;
  // $: labelRadius = $PieChartDocs[1].value;
  // $: colorRangeStart = $PieChartDocs[1].value;
  // $: strokeColor = $PieChartDocs[1].value;


  const padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges

  const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
  const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
  const xVals = data.map((el) => el[x]);
  let yVals = data.map((el) => Number(el[y]));
  if (percent) {
    const total = yVals.reduce((a, b) => a + b, 0);
    yVals = yVals.map((el) => el / total);
  }
  const iVals = data.map((el, i) => i);
  
  //replace second interpPlasma arg with colorRangeStart
  const colors = quantize(t => interpolatePlasma(t * 0.3 + 0.7), xVals.length);

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
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
  {#each wedges as wedge, i}
    <path fill={colors[i]} d={arcPath(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
    <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
      <text>
        <tspan font-weight='bold'>{xVals[i]}</tspan>
        <tspan x = '0' dy='1.1em'>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan>
      </text>
    </g>
  {/each}
</svg>