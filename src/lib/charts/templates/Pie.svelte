<script>
    import { quantize, interpolatePlasma, pie, arc } from 'd3';
    import data from '../data/pie-data' // or pass data to component as prop
    import { ChartDocs } from '../ChartStore';
  
    $: width = $ChartDocs[0].value // the outer width of the chart, in pixels
    $: height = width // the outer height of the chart, in pixels
    $: percent = $ChartDocs[1].value // format values as percentages (true/false)
    $: fontSize = $ChartDocs[2].value; // the font size of the x and y values
    $: strokeWidth = $ChartDocs[3].value; // the width of stroke separating wedges
    const strokeLinejoin = 'round'; // line join style of stroke separating wedges
    $: outerRadius = Math.min(width, height) * 0.5 - 60; // the outer radius of the circle, in pixels
    $: innerRadius = $ChartDocs[4].value; // the inner radius of the chart, in pixels
    $: labelRadius = (innerRadius * 0.2 + outerRadius * 0.8); // center radius of labels
    $: strokeColorWOR = $ChartDocs[5].value; //stroke color when inner radius is greater than 0
    $: strokeColorWIR = $ChartDocs[6].value; //stroke color when inner radius is 0
    $: stroke = innerRadius > 0 ? strokeColorWIR : strokeColorWOR; // stroke separating widths
    $: padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges
  
    const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
    const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
    const xVals = data.map((el) => el[x]);
    let yVals = data.map((el) => Number(el[y]));
    $: if (percent) {
      const total = yVals.reduce((a, b) => a + b, 0);
      yVals = yVals.map((el) => el / total);
    }
    const iVals = data.map((el, i) => i);
  
    // colors can be adjusted manually by creating a color array which length matches length of data set.
    let colors;
    if (!colors) colors = quantize(t => interpolatePlasma(t * 0.7 + 0.3), xVals.length);
  
    $: wedges = pie().
      padAngle(padAngle).
      sort(null).
      value(i => yVals[i])(iVals);
  
    $: arcPath = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    $: arcLabel = arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
  </script>
  
  <svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
    {#each wedges as wedge, i}
      <path fill={colors[i]} d={arcPath(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
      <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
        <text font-size={fontSize}>
          <tspan font-weight='bold'>{xVals[i]}</tspan>
          <tspan x = '0' dy='1.1em'>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan>
        </text>
      </g>
    {/each}
  </svg>
    
  <style>
  </style>
  