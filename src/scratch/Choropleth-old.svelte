<script>
  import { scaleQuantile, range, cross, geoPath } from 'd3';
  import { feature, mesh } from 'topojson';
  import us from './counties-albers-10m.json';

  export let choroplethData;

  const data = choroplethData,
    width = 900, // the outer width of the chart, in pixels
    height = 600, // the outer height of the chart, in pixels
    names = ['Diabetes', 'Obesity'],
    colors = [
      '#e8e8e8', '#ace4e4', '#5ac8c8',
      '#dfb0d6', '#a5add3', '#5698b9', 
      '#be64ac', '#8c62aa', '#3b4994'
    ], // fill colors
    tooltipBackground = 'white', // background color of tooltip
    tooltipTextColor = 'black'; // text color of tooltip
  // r = 3, // (fixed) radius of dots, in pixels
  // curve = curveLinear, // method of interpolation between points
  // marginTop = 20, // the top margin, in pixels
  // marginRight = 0, // the right margin, in pixels
  // marginBottom = 30, // the bottom margin, in pixels
  // marginLeft = 40, // the left margin, in pixels
  // inset = r * 2, // inset the default range, in pixels
  // insetTop = inset, // inset the default y-range
  // insetRight = inset, // inset the default x-range
  // insetBottom = inset, // inset the default y-range
  // insetLeft = inset, // inset the default x-range
  // xType = scaleUtc, // type of x-scale
  // xRange = [marginLeft + insetLeft, width - marginRight - insetRight], // [left, right]
  // yType = scaleLinear, // type of y-scale
  // yRange = [height - marginBottom - insetBottom, marginTop + insetTop], // [bottom, top]
  // xLabel = '', // a label for the y-axis
  // yLabel = '↑ Daily Close', // a label for the y-axis
  // xFormat = '', // a format specifier string for the y-axis
  // yFormat = '', // a format specifier string for the y-axis
  // horizontalGrid = true, // show horizontal grid lines
  // verticalGrid = false, // show vertical grid lines
  // xScalefactor = width / 80, //y-axis number of values
  // yScalefactor = height / 40, //y-axis number of values
  // // number of colors in fill array MUST match number of subsets in data
  // showDots = false, // whether dots should be displayed
  // dotsFilled = false, // whether dots should be filled or outlined
  // strokeLinecap = 'round', // stroke line cap of the line
  // strokeLinejoin = 'round', // stroke line join of the line
  // strokeWidth = 1, // stroke width of line, in pixels
  // strokeOpacity = 0.8, // stroke opacity of line

  let locInfo, legendInfo;
  const k = 24, n = Math.floor(Math.sqrt(colors.length)), labels = ['low', 'med', 'high'];

  console.log(data);

  const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
  const stateLines = mesh(us, us.objects.states, (a, b) => a !== b);

  console.log('us', us);
  console.log('states', states, 'stateLines', stateLines);

  const xFunc = scaleQuantile(Array.from(Object.values(data), d => d[0]), range(n));
  const yFunc = scaleQuantile(Array.from(Object.values(data), d => d[1]), range(n));

  const pathFunc = geoPath();
  const pathData = feature(us, us.objects.counties).features;

  console.log('pathFunc', pathFunc);
  console.log('pathData', pathData);

  // function color() {
  //   return value => {
  //     if (!value) return '#ccc';
  //     const [a, b] = value;
  //     return colors[y(b) + x(a) * n];
  //   };
  // }

  function color(value) {
    if (!value) return '#ccc';
    const [a, b] = value;
    return colors[yFunc(b) + xFunc(a) * n];
  }

  console.log('04015', data['04015']);
  console.log('color', color(data['04015']));

  const format = (value) => {
    if (!value) return 'N/A';
    const [a, b] = value;
    console.log('format', value, a, b);
    return `${a}% ${names[0]}${labels[xFunc(a)] && ` (${labels[xFunc(a)]})`}
${b}% ${names[1]}${labels[yFunc(b)] && ` (${labels[yFunc(b)]})`}`;
  };

  const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
  const legendMap = cartesian(range(n), range(n));
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
  <path fill='none' stroke='white' stroke-linejoin='round' d={pathFunc(stateLines)} pointer-events='none'/>

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
        <!-- <title>{names[0]}{labels[j] && ` (${labels[j]})`}
        {`\n${names[1]}${labels[i] && ` (${labels[i]})`}`}</title>
      </rect> -->
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
  <div style='position:absolute; left:{locInfo.e.x + 12}px; top:{locInfo.e.y + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
    {locInfo.d.properties.name}, {states.get(locInfo.d.id.slice(0, 2)).name}
    {`\n${format(data[locInfo.d.id])}`}
  </div>
{/if}

<!-- Legend Tooltip -->
{#if legendInfo}
  <div style='position:absolute; left:{legendInfo.e.x + 12}px; top:{legendInfo.e.y + 12}px; pointer-events:none; background-color:{tooltipBackground}; color:{tooltipTextColor}'>
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
</style>