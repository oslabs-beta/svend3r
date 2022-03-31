<script>
  import { InternSet, hierarchy, pack, range, scaleOrdinal, schemeTableau10 } from 'd3';
  import data from '../data/bubble-data' // or pass data to component as prop
  import { ChartDocs } from '../ChartStore';

  $: width = $ChartDocs[0].value; //the margin top, bottom, left, right margin offset relative to the radius
  $: padding = $ChartDocs[1].value; // the all padding all around each circle, in pixels
  $: margin = $ChartDocs[2].value; // the all margin all around, in pixels
  $: textColor = $ChartDocs[3].value; //the color of the text
  $: fill = $ChartDocs[4].value; // a static fill color, if no group channel is specified
  $: fillOpacity = $ChartDocs[5].value; // the fill opacity of the bubbles
  $: strokeColor = $ChartDocs[6].value; // a static stroke around the bubbles
  $: strokeWidth = $ChartDocs[7].value; // the stroke width around the bubbles, if any
  $: strokeOpacity = $ChartDocs[8].value; // the stroke opacity around the bubbles, if any
  $: height = width; // the outer height of the chart, in pixels
  $: marginLeft = margin; // the left margin, in pixels
  $: marginRight = margin; // the right margin, in pixels
  $: marginTop = margin; // the top margin, in pixels
  $: marginBottom = margin; // the bottom margin, in pixels

  //update link to the desired address path or remove.
  const link = (d) => `https://github.com/prefuse/Flare/blob/master/flare/src/${d.id.replace(/\./g, '/')}.as`;

  // Compute the values.
  const dVals = data.map((el) => el);
  const vVals = data.map((el) => el.value);
  const gVals = data.map((el) => el.id.split('.')[1]);
  const iVals = range(vVals.length).filter(i => vVals[i] > 0);

  let groups = iVals.map(i => gVals[i]);
  groups = new InternSet(groups);

  const colorScale = scaleOrdinal(groups, schemeTableau10);  

  // // Compute labels.
  const lVals = data.map((el) => [...el.id.split('.').pop().split(/(?=[A-Z][a-z])/g), el.value.toLocaleString('en')].join('\n'));
  const tVals = data.map((el) => `${el.id}\n${el.value.toLocaleString('en')}`);

  const uid = `O-${Math.random().toString(16).slice(2)}`;

  $: root = pack()
  .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
  .padding(padding)
  (hierarchy({children: iVals})
      .sum(i => vVals[i]));
</script>
  
<svg {width} {height} viewBox="{-marginLeft} {-marginTop} {width} {height}" fill={textColor}>
    {#each root.leaves() as leaf, i}
      <a href={link === null ? null : link(dVals[leaf.data])} target="_blank" rel="noopener noreferrer">
        <g class='node' transform="translate({(leaf.x)},{(leaf.y)})">
          <circle id="node-{i}"
            stroke={strokeColor} stroke-width={strokeWidth} stroke-opacity={strokeOpacity}
            fill={gVals ? colorScale(gVals[leaf.data]) : fill == null ? 'none' : fill}
            fill-opacity={fillOpacity}
            r={leaf.r}
          >
            <title>{tVals[i]}</title>
          </circle>
          <clipPath id={`${uid}-clip-${leaf.data}`}>
            <circle r={leaf.r}></circle>
          </clipPath>
          <text clip-path={`url(${new URL(`#${uid}-clip-${leaf.data}`, location)})`}>
            {#each `${lVals[leaf.data]}`.split(/\n/g) as subtext, j}
              <tspan 
                x='0'  
                y={`${j - `${lVals[leaf.data]}`.split(/\n/g).length / 2 + 0.85}em`}
                fill-opacity={j === `${lVals[leaf.data]}`.split(/\n/g).length - 1 ? 0.7 : null}
                font-size={leaf.r * 0.3}
              >
                {subtext}
              </tspan>
            {/each}
          </text>
        </g>
      </a>
    {/each}
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: intrinsic;
    font-size: 10;
    font-family: sans-serif;
    text-anchor: middle;
  }

  .node {
    cursor: pointer;
  }

  .node:hover {
    font-weight: 700;
  }
</style>