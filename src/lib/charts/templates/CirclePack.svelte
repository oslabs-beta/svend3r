<script>
    import { hierarchy, interpolateHcl, interpolateZoom, pack, scaleLinear, transition } from 'd3';
    import data from '../data/circle-pack-data' // or pass data to component as prop
    import { ChartDocs } from '../ChartStore';

    $: width = $ChartDocs[0].value; //the outer width of the chart, in pixels
    $: height = width; // the outer height of the chart, in pixels
    $: margin = $ChartDocs[1].value; //the overall margin between the circle packs to the viewport edge
    $: backgroundColor = $ChartDocs[2].value; // the background color of the chart
    $: fontSize = $ChartDocs[3].value; //the font size of the text labels

    $: color = scaleLinear()
      .domain([0, 5])
      .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
      .interpolate(interpolateHcl);

    $: packFunc = pData => pack()
      .size([width - margin, height - margin])
      .padding(3)
      (hierarchy(pData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

    $: root = packFunc(data);
    $: activeFocus = root;
    let view;
    $: activeZoomK = width / root.r * 2;
    $: activeZoomA = root.x;
    $: activeZoomB = root.y;

    const inactiveZoomTo = (v) => {
      activeZoomK = width / v[2];
      view = v;
      activeZoomA = v[0];
      activeZoomB = v[1];
    };

    $: inactiveZoomTo([root.x, root.y, root.r * 2 + margin]);

    const zoom = (d, e) => {
      e.stopPropagation();
      const activeFocus0 = activeFocus;

      activeFocus = d;

      transition()
        .duration(750)
        .tween('zoom', () => {
          var i = interpolateZoom(view, [activeFocus.x, activeFocus.y, activeFocus.r * 2 + margin]);
          return function(t) { 
            inactiveZoomTo(i(t)); 
          };
        });
    };
</script>

<svg width={width} height={height} style="background: {backgroundColor};" on:click={(e) => zoom(root, e)}   >
    <g transform="translate({width / 2},{height / 2})">
        {#each root.descendants().slice(1) as rootData}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <circle class={rootData.parent ? rootData.children ? 'node' : 'node node--leaf' : 'node node--root'}
                fill={rootData.children ? color(rootData.depth) : 'null'} 
                on:click={(e) => {if (activeFocus !== rootData) zoom(rootData, e);}}
                transform="translate({(rootData.x - activeZoomA) * activeZoomK},{(rootData.y - activeZoomB) * activeZoomK})"
                r={rootData.r * activeZoomK}
            ></circle>
        {/each}
        {#each root.descendants() as rootDes}
            <text font-size='{fontSize}px' class="label" 
                style="fill-opacity: {rootDes.parent === activeFocus ? 1 : 0}; display: {rootDes.parent === activeFocus ? "inline" : "none"};"
                transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y - activeZoomB) * activeZoomK})"
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
