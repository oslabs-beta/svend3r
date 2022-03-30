<script>
  import * as d3 from 'd3'
  import { sampleData } from './bubbleData'

  let height = 640;
  let width = height;
  let padding = 3;
  let margin = 3;
  let marginLeft = margin;
  let marginRight = margin;
  let marginTop = margin; 
  let marginBottom = margin;
  let colors = sampleData.nodes.map(el=>el.color);

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

      let nodes = pack(D);

      console.log(d3.pack(sampleData).size([width - marginLeft - marginRight, height - marginTop - marginBottom]).padding(padding))

      console.log(nodes.children)
  
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