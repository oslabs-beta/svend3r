<script>
  import * as d3 from 'd3';
  import data from './bubble-data';

  const height = 1152;
  const padding = 3;
  const margin = 1;
  const backgroundColor = 'black';
  const fill = '#ccc'; // a static fill color, if no group channel is specified
  const fillOpacity = 0.7; // the fill opacity of the bubbles
  const strokeColor = 'none'; // a static stroke around the bubbles
  const strokeWidth = 1; // the stroke width around the bubbles, if any
  const strokeOpacity = 1; // the stroke opacity around the bubbles, if any
  const link = (d) => `https://github.com/prefuse/Flare/blob/master/flare/src/${d.id.replace(/\./g, '/')}.as`;
  const width = height;
  const marginLeft = margin;
  const marginRight = margin;
  const marginTop = margin; 
  const marginBottom = margin;

  // Compute the values.
  const dVals = data.map((el) => el);
  const vVals = data.map((el) => el.value);
  const gVals = data.map((el) => el.id.split('.')[1]);
  const iVals = d3.range(vVals.length).filter(i => vVals[i] > 0);

  let groups = iVals.map(i => gVals[i]);
  groups = new d3.InternSet(groups);

  const colorScale = d3.scaleOrdinal(groups, d3.schemeTableau10);  

  // // Compute labels.
  const lVals = data.map((el) => [...el.id.split('.').pop().split(/(?=[A-Z][a-z])/g), el.value.toLocaleString('en')].join('\n'));
  const tVals = data.map((el) => `${el.id}\n${el.value.toLocaleString('en')}`);

  const uid = `O-${Math.random().toString(16).slice(2)}`;

  const root = d3.pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)
    (d3.hierarchy({children: iVals})
      .sum(i => vVals[i]));

  console.log('root', root.leaves());
  console.log('tVals', tVals);
</script>

<svg {width} {height} viewBox="{-marginLeft} {-marginTop} {width} {height}" fill={backgroundColor}>
    {#each root.leaves() as leaf, i}
      <a href={link === null ? null : link(dVals[leaf.data], i, data)} target="_blank" rel="noopener noreferrer">
        <g class='node' transform="translate({(leaf.x)},{(leaf.y)})">
          <circle id="node-{i}"
            stroke={strokeColor} stroke-width={strokeWidth} stroke-opacity={strokeOpacity}
            fill={gVals ? colorScale(gVals[leaf.data]) : fill == null ? 'none' : fill}
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
    /* max-height: 100%; */
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
    stroke: #000;
    stroke-width: 1.5px;
  }
/* 
  .node--leaf {
    fill: white;
  } */

  .label {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-anchor: middle;
    text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
  }

  .label,
  .node--root,
  .node--leaf {
    pointer-events: none;
  } 
</style>