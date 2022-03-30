<script>
  import { arc, max, scaleBand, scaleOrdinal, scaleRadial, stack } from "d3";
  import data from "../data/radialStacked-data.js"; // or pass data to component as prop
  import { ChartDocs } from '../ChartStore';

  $: width = $ChartDocs[0].value; // width of inner radius inverted, in pixels
  $: innerRadius = $ChartDocs[1].value; // radius of inner circle, in pixels
  $: colorRange = $ChartDocs[2].value; // fill colors for each bar stack - MUST match number of datasets
  $: chartScale = $ChartDocs[3].value; // scale factor from the center
  $: sorted = $ChartDocs[4].value; // whether to sort the data by descending total
  $: varFontSize = $ChartDocs[5].value; // font size of chart text, in pixels
  $: tickColor = $ChartDocs[6].value; // color of inner radius ticks
  $: ringColor = $ChartDocs[7].value; // color of scale rings
  $: scaleColor = $ChartDocs[8].value; // color of scale text
  $: scaleStroke = $ChartDocs[9].value; // color of scale text background/stroke
  $: rectLength = $ChartDocs[10].value; // width of  color legend key, in pixels
  $: height = width;
  $: outerRadius = width * chartScale;
  $: keys = Object.keys(data[0]).slice(0, -1);
  $: groupId = keys[0];
  $: console.log('key0', groupId);
  $: reactiveData = sorted === true
    ? [...data].sort((a, b) => b.total - a.total)
    : [...data];

  $: reactiveXScale = scaleBand()
    .domain(reactiveData.map((d) => d[groupId]))
    .range([0, 2 * Math.PI])
    .align(0);

  $: yScale = scaleRadial()
    .domain([0, max(data, (d) => d.total)])
    .range([innerRadius, outerRadius]);

  $: zScale = scaleOrdinal().domain(keys.slice(1)).range(colorRange);

  $: d3arc = arc()
    .innerRadius((d) => yScale(d[0]))
    .outerRadius((d) => yScale(d[1]))
    .startAngle((d) => reactiveXScale(d.data[groupId]))
    .endAngle((d) => reactiveXScale(d.data[groupId]) + reactiveXScale.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);
</script>

<svg
  class="radial-chart"
  viewBox="{-width / 2} {-height / 2} {width} {height}"
  font-size="{varFontSize}px"
>
  <g class="chart-render">
    {#each stack().keys(keys.slice(1))(reactiveData) as cData}
      <g fill={zScale(cData.key)}>
        {#each cData as d}
          <path d={d3arc(d)} />
        {/each}
      </g>
    {/each}
  </g>
  <g class="x-axis" text-anchor="middle">
    {#each reactiveData as d}
      <g
        transform="
        rotate({((reactiveXScale(d[groupId]) + reactiveXScale.bandwidth() / 2) * 180) / Math.PI - 90})
        translate({innerRadius},0)
      "
      >
        <line x2="-5" stroke={tickColor} />
        <text
          transform={(reactiveXScale(d[groupId]) + reactiveXScale.bandwidth() / 2 + Math.PI / 2) %
            (2 * Math.PI) <
          Math.PI
            ? "rotate(90) translate(0,16)"
            : "rotate(-90) translate(0,-9)"}>{d[groupId]}</text
        >
      </g>
    {/each}
  </g>
  <g class="y-axis" text-anchor="end">
    <text x="-6" y={-yScale(yScale.ticks(10).pop())} dy="-1em">Population</text>
    {#each yScale.ticks(10).slice(1) as ydata}
      <g fill="none">
        <circle stroke={ringColor} stroke-opacity="0.5" r={yScale(ydata)} />
        <text
          x="-6"
          y={-yScale(ydata)}
          dy="0.35em"
          stroke={scaleStroke}
          stroke-width="5"
          fill={scaleColor}>{ydata}</text
        >
        <text
          x="-6"
          y={-yScale(ydata)}
          dy="0.35em"
          stroke="none"
          stroke-width="5"
          fill={scaleColor}>{ydata}</text
        >
      </g>
    {/each}
  </g>
  <g class="legend">
    {#each keys.slice(1).reverse() as lData, i}
      <g transform="translate(-40,{(i - (keys.length - 1) / 2) * 20})">
        <rect width={rectLength} height="18" fill={zScale(lData)} />
        <text x="24" y="9" dy="0.35em">{lData}</text>
      </g>
    {/each}
  </g>
</svg>

<style>
</style>