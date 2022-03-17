<script>
  import * as d3 from "d3";
  import { sampleData } from "./sampleData.js"; //import your custom dataset
    
  let width = 975;
  let height = width;
  let innerRadius = 180
  let outerRadius = Math.min(width, height) * 0.67
  let data = sampleData
  let colorRange = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]

  data = data.sort((a, b) => b.total - a.total)
  data.columns = Object.keys(sampleData[0]).slice(0,-1);

  let arc = d3.arc()
      .innerRadius(d => y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.State))
      .endAngle(d => x(d.data.State) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius)

  let x = d3.scaleBand()
      .domain(data.map(d => d.State))
      .range([0, 2 * Math.PI])
      .align(0)

  let y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])

  let z = d3.scaleOrdinal()
      .domain(data.columns.slice(1))
      .range(colorRange)
</script>

  <svg class="radial-chart" viewBox="{-width / 2} {-height * 0.69} {width} {height}" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="chart-render">
      {#each d3.stack().keys(data.columns.slice(1))(data) as cData}
        <g fill={z(cData.key)}>
          {#each cData as d}
            <path d={arc(d)}></path>
          {/each}
        </g>
      {/each}
    </g>
    <g class="x-axis" text-anchor="middle">
      {#each data as d}
        <g transform="
        rotate({((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        translate({innerRadius},0)
      ">
        <line x2="-5" stroke="#000"></line>
        <text transform={(x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
        ? "rotate(90) translate(0,16)"
        : "rotate(-90) translate(0,-9)"}>{d.State}</text>
        </g>
      {/each}
    </g>
    <g class="y-axis" text-anchor="end">
      <text x ="-6" y={-y(y.ticks(10).pop())} dy="-1em">Population</text>
      {#each y.ticks(10).slice(1) as ydata}
        <g fill="none" ytick={y.ticks(10).slice(1)}>
          <circle stroke="#000" stroke-opacity="0.5" r={y(ydata)}></circle>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke="#fff" stroke-width="5">{ydata}</text>
          <text x="-6" y={-y(ydata)} dy="0.35em" stroke="none" stroke-width="5" fill="#000">{ydata}</text>
        </g>
      {/each}
    </g>
    <g class='legend'>
      {#each data.columns.slice(1).reverse() as lData, i}
        <g transform="translate(-40,{(i - (data.columns.length - 1) / 2) * 20})">
          <rect width="18" height="18" fill={z(lData)}></rect>
          <text x="24" y="9" dy="0.35em">{lData}</text>
        </g>
      {/each}
    </g>
  </svg>

<style>

svg {
  max-width: 100%;
  max-height: 100%;
}

</style>
