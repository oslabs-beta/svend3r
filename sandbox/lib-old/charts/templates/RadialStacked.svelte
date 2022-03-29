<script>
  import * as d3 from "d3";
  import { sampleData } from "../data/radial-stacked-data.js"; //import your custom dataset
  import { ChartDocs } from '../ChartStore'; //*****Remove for Production for production use

  let data = sampleData;
  $: width = $ChartDocs[1].value; //the width of the inner radius inversed, in pixels
  $: height = width; //the outer height of the chart, in pixels
  $: innerRadius = $ChartDocs[2].value; //the radius of the inner circle, in pixels
  $: colorRange = $ChartDocs[3].value; //the fill colors for each bar stack.  The colorRange array length  MUST match number of datasets
  $: chartScale = $ChartDocs[4].value; //the scale factor from the center
  $: sorted = $ChartDocs[5].value; //the boolean value for if the dataset is sorted
  $: varFontSize = $ChartDocs[6].value; //the font size of all text on the chart, in pixels
  $: tickColor = $ChartDocs[7].value; //the color of the inner radius ticks
  $: ringColor = $ChartDocs[8].value; //the color of the scale rings
  $: scaleColor = $ChartDocs[9].value; //the color of the scale text
  $: scaleStroke = $ChartDocs[10].value; //the color of the scale text background/stroke
  $: rectLength = $ChartDocs[11].value; //the width of the color legend key, in pixels

  $: outerRadius = Math.min(width, height) * chartScale;

  $: if (sorted === true) {
    data = data.sort((a, b) => b.total - a.total);
  }

  data.columns = Object.keys(sampleData[0]).slice(0, -1);

  $: arc = d3
    .arc()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(d.data.State))
    .endAngle((d) => x(d.data.State) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  $: x = d3
    .scaleBand()
    .domain(data.map((d) => d.State))
    .range([0, 2 * Math.PI])
    .align(0);

  $: y = d3
    .scaleRadial()
    .domain([0, d3.max(data, (d) => d.total)])
    .range([innerRadius, outerRadius]);

  $: z = d3.scaleOrdinal().domain(data.columns.slice(1)).range(colorRange);
</script>

<svg
  class="radial-chart"
  viewBox="{-width / 2} {-height * chartScale} {width} {height}"
  font-size="{varFontSize}px"
>
  <g class="chart-render">
    {#each d3.stack().keys(data.columns.slice(1))(data) as cData}
      <g fill={z(cData.key)}>
        {#each cData as d}
          <path d={arc(d)} />
        {/each}
      </g>
    {/each}
  </g>
  <g class="x-axis" text-anchor="middle">
    {#each data as d}
      <g
        transform="
        rotate({((x(d.State) + x.bandwidth() / 2) * 180) / Math.PI - 90})
        translate({innerRadius},0)
      "
      >
        <line x2="-5" stroke={tickColor} />
        <text
          transform={(x(d.State) + x.bandwidth() / 2 + Math.PI / 2) %
            (2 * Math.PI) <
          Math.PI
            ? "rotate(90) translate(0,16)"
            : "rotate(-90) translate(0,-9)"}>{d.State}</text
        >
      </g>
    {/each}
  </g>
  <g class="y-axis" text-anchor="end">
    <text x="-6" y={-y(y.ticks(10).pop())} dy="-1em">Population</text>
    {#each y.ticks(10).slice(1) as ydata}
      <g fill="none" ytick={y.ticks(10).slice(1)}>
        <circle stroke={ringColor} stroke-opacity="0.5" r={y(ydata)} />
        <text
          x="-6"
          y={-y(ydata)}
          dy="0.35em"
          stroke={scaleStroke}
          stroke-width="5"
          fill={scaleColor}>{ydata}</text
        >
        <text
          x="-6"
          y={-y(ydata)}
          dy="0.35em"
          stroke="none"
          stroke-width="5"
          fill={scaleColor}>{ydata}</text
        >
      </g>
    {/each}
  </g>
  <g class="legend">
    {#each data.columns.slice(1).reverse() as lData, i}
      <g transform="translate(-40,{(i - (data.columns.length - 1) / 2) * 20})">
        <rect width={rectLength} height="18" fill={z(lData)} />
        <text x="24" y="9" dy="0.35em">{lData}</text>
      </g>
    {/each}
  </g>
</svg>

<style>
</style>
