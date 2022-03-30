<script>
    import * as d3 from 'd3';
    import { sampleData } from './sampleData.js'; 

    const data = sampleData;
    const width = 960;
    const height = width;
    const margin = 20;
    let backgroundColor;


    const color = d3.scaleLinear()
      .domain([0, 5])
      .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
      .interpolate(d3.interpolateHcl);

    backgroundColor = color(0);

    // let d3 = require("d3@6")
    const pack = pData => d3.pack()
      .size([width - margin, height - margin])
      .padding(3)
      (d3.hierarchy(pData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

    const root = pack(data);
    console.log('data', data, 'root', root);
    let focus = root;
    $: console.log('data', data, 'focus', focus);
    let view;
    let zoomK = width / root.r * 2;
    let zoomA = root.x;
    let zoomB = root.y;

    const zoomTo = (v) => {
      zoomK = width / v[2];
      view = v;
      zoomA = v[0];
      zoomB = v[1];
    };

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    //zoom is not working properly.  Focus only is defined every other click.  Seems like it will zoom out but not zoom in.
    const zoom = (d, e) => {
      e.stopPropagation();
      console.log('zoom', d);
      const focus0 = focus;

      focus = d;

      const transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween('zoom', () => {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { 
            console.log('this is t', t);
            zoomTo(i(t)); 
          };
        });

    //   transition.selectAll('text')
    //     .filter(d.parent === focus || this.style.display === 'inline')
    //     .style('fill-opacity', d.parent === focus ? 1 : 0)
    //     .on('start', d.parent === focus ? this.style.display = 'inline' : null)
    //     .on('end', d.parent !== focus ? this.style.display = 'none' : null);
    };
    
</script>

<svg width={width} height={height} style="background: {backgroundColor};" on:click={(e) => zoom(root, e)}   >
    <g transform="translate({width / 2},{height / 2})">
        {#each root.descendants().slice(1) as rootData}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <circle class={rootData.parent ? rootData.children ? 'node' : 'node node--leaf' : 'node node--root'}
                fill={rootData.children ? color(rootData.depth) : 'null'} 
                on:click={(e) => {if (focus !== rootData) {zoom(rootData, e); console.log('why not?'); d3.event.stopPropagation();}}}
                transform="translate({(rootData.x - zoomA) * zoomK},{(rootData.y - zoomB) * zoomK})"
                r={rootData.r * zoomK}
            ></circle>
        {/each}
        {#each root.descendants() as rootDes}
            <text class="label" 
                style="fill-opacity: {rootDes.parent === focus ? 1 : 0}; display: {rootDes.parent === focus ? "inline" : "none"};"
                transform="translate({(rootDes.x - zoomA) * zoomK},{(rootDes.y - zoomB) * zoomK})"
            >{rootDes.data.name}</text>
        {/each}
    </g>
</svg>

<style>
.node {
  cursor: pointer;
}

.node:hover {
  stroke: #000;
  stroke-width: 1.5px;
}

.node--leaf {
  fill: white;
}

.label {
  font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-anchor: middle;
  text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
}

.label,
.node--root,
.node--leaf {
  pointer-events: none;
}
</style>