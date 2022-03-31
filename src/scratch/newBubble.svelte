<script>
  import * as d3 from 'd3';
  import { sampleData } from './bubbleData-old';

  const height = 640;
  const width = height;
  const padding = 3;
  const margin = 3;
  const marginLeft = margin;
  const marginRight = margin;
  const marginTop = margin; 
  const marginBottom = margin;
  const colors = sampleData.nodes.map(el=>el.color);

  // Compute the values.
  const D = sampleData.nodes.map(d=>d);
  const V = sampleData.nodes.map((el)=>el.value);
  const I = d3.range(V.length).filter(i => V[i] > 0);

  // // Compute labels.
  const L = D.map(el => el.id);


  // Compute layout: create a 1-deep hierarchy, and pack it.
  const pack = data => d3.pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)
    (d3.hierarchy({children: I})
      .sum(i => V[i])
    );

  const nodes = pack(D);

  console.log(d3.pack(sampleData).size([width - marginLeft - marginRight, height - marginTop - marginBottom]).padding(padding));

  console.log(nodes.children);
  
</script>

<svg viewBox="{-marginLeft} {-marginTop} {width} {height}" style="height: auto; height: intrinsic;" fill="currentColor" width={width} height={height} text-anchor="middle">
  <g class="node">
    {#each nodes.children as nodeData, i}
      <circle id="node-{i}" 
        r="{nodeData.value}"
        fill= "{colors[i]}"
        transform="translate({(nodeData.x)},{(nodeData.y)})"
      >
      <text>
        {D[i].id}
      </text>
      </circle>
    {/each}
  </g>

</svg>

<style>

  svg {
    max-width: 100%;
    max-height: 100%;
    font-size: 10;
    font-family: sans-serif;

  }

  
</style>