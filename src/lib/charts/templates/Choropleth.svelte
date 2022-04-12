<script>
  import { scaleQuantile, range, geoPath } from 'd3';
  import { feature, mesh } from 'topojson-client';
  import us from '../data/counties-albers-10m.json'; //for latest counties-albers-10m.json: please visit https://github.com/topojson/us-atlas
  import data from '../data/choropleth-data' // or pass data to component as prop
  import { ChartDocs } from '../ChartStore';

  $: width = $ChartDocs[0].value; // the outer width of the chart, in pixels
  $: height = $ChartDocs[1].value; // the outer height of the chart, in pixels
  $: names = $ChartDocs[2].value; //the group names of the first and second elements
  $: labels = $ChartDocs[3].value; //color maxtrx labels
  $: colors = $ChartDocs[4].value; // low to high color maxtrix
  $: tooltipBackground = $ChartDocs[5].value; // background color of tooltip
  $: tooltipTextColor = $ChartDocs[6].value; // text color of tooltip
  $: outlineStrokeColor = $ChartDocs[7].value // the color of the state outlines
  $: k = $ChartDocs[8].value; //size of the legend

  let locInfo;
  let legendInfo;
  $: n = Math.floor(Math.sqrt(colors.length));

  const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
  const stateLines = mesh(us, us.objects.states, (a, b) => a !== b);

  $: xFunc = scaleQuantile(Array.from(Object.values(data), d => d[0]), range(n));
  $: yFunc = scaleQuantile(Array.from(Object.values(data), d => d[1]), range(n));

  const pathFunc = geoPath();
  const pathData = feature(us, us.objects.counties).features;

  $: color = (value) => {
    if (!value) return '#ccc';
    const [a, b] = value;
    return colors[yFunc(b) + xFunc(a) * n];
  }

  const format = (value) => {
    if (!value) return 'N/A';
    const [a, b] = value;
    // console.log('format', value, a, b);
    return `${a}% ${names[0]}${labels[xFunc(a)] && ` (${labels[xFunc(a)]})`}
    ${b}% ${names[1]}${labels[yFunc(b)] && ` (${labels[yFunc(b)]})`}`;
  };

  const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
  $: legendMap = cartesian(range(n), range(n));
</script>

<svg {width} {height} viewBox="0 0 975 610"
  on:mouseout="{() => locInfo = null}"
  on:blur="{() => locInfo = null}"
>
  {#each pathData as datum}
    <path fill={color(data[datum.id])} d={pathFunc(datum)} 
      on:mouseover="{(e) => locInfo = ({e: e, d: datum})}"
      on:focus="{(e) => locInfo = ({e: e, d: datum})}"
    />
  {/each}
  <path fill='none' stroke={outlineStrokeColor} stroke-linejoin='round' d={pathFunc(stateLines)} pointer-events='none'/>

  <g transform="translate(870,450)">
    <g transform="translate({-k * n / 2},{-k * n / 2}) rotate(-45 {k * n / 2},{k * n / 2})">
      <marker id="arrow" markerHeight=10 markerWidth=10 refX=6 refY=3 orient=auto>
        <path d="M0,0L9,3L0,6Z" />
      </marker>
      {#each legendMap as [i, j]}
        <rect width={k} height={k} x={i * k} y={(n - 1 - j) * k} fill={colors[j * n + i]}
          on:mouseover="{(e) => legendInfo = ({e: e, i: i, j: j})}"
          on:focus="{(e) => legendInfo = ({e: e, i: i, j: j})}"
          on:mouseout="{() => legendInfo = null}"
          on:blur="{() => legendInfo = null}"
        />
      {/each}
      <line marker-end='url(#arrow)' x1=0 x2={n * k} y1={n * k} y2={n * k} stroke='black' stroke-width=1.5 />
      <line marker-end='url(#arrow)' y2=0 y1={n * k} stroke=black stroke-width=1.5 />
      <text font-weight="bold" dy="0.71em" transform="rotate(90) translate({n / 2 * k},6)" text-anchor="middle">{names[0]}</text>
      <text font-weight="bold" dy="0.71em" transform="translate({n / 2 * k},{n * k + 6})" text-anchor="middle">{names[1]}</text>
    </g>
  </g>
</svg>

<!-- Map Tooltip -->
{#if locInfo}
  <div class="tooltip" style='position:absolute; left:{locInfo.e.x + 12}px; top:{locInfo.e.y + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {locInfo.d.properties.name}, {states.get(locInfo.d.id.slice(0, 2)).name}
    {`\n${format(data[locInfo.d.id])}`}
  </div>
{/if}

<!-- Legend Tooltip -->
{#if legendInfo}
  <div class="tooltip" style='position:absolute; left:{legendInfo.e.x + 12}px; top:{legendInfo.e.y + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {names[0]}{labels[legendInfo.j] && ` (${labels[legendInfo.j]})`}
    {`\n${names[1]}${labels[legendInfo.i] && ` (${labels[legendInfo.i]})`}`}
  </div>
{/if}

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: "intrinsic";
  }

  div {
    white-space: pre
  }

  .tooltip{
    border-radius: 5px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }
</style>
  