<script>
    import * as d3 from "d3";
    import { select } from 'd3-selection';
    import { sampleData } from "./sampleData.js" 

    let width = 932;
    let height = width;
    let marginTB = 0;
    let marginRL = -14;
    let backgroundColor;
    let cursorType = "pointer"
    let format = d3.format(",d")

    let color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl)

    backgroundColor = color(0);

    // let d3 = require("d3@6")
    const pack = data => d3.pack()
    .size([width, height])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

    const data = sampleData;

    const root = pack(data);
    let focus = root;
    let view;

    let zoomK = width / root.r * 2;
    let zoomA = root.x;
    let zoomB = root.y;

    const zoomTo = (v) => {
        zoomK = width / v[2];
        view = v;
        zoomA = v[0]
        zoomB = v[1]
    }

    zoomTo([root.x, root.y, root.r * 2]);

    //zoom is not working properly.  Focus only is defined every other click.  Seems like it will zoom out but not zoom in.
    const zoom = (event) => {
        console.log("this is event", event);
        console.log("this is d", d);

        const focus0 = focus;

        focus = d;

        const transition = select('svg').transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
            console.log("this is focus", focus)
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

        select("label")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function createStroke(e) {
        this.style.stroke = "#000"
    } 

    function removeStroke(e) {
        this.style.stroke = null
    }

</script>

<svg id="circle_pack" viewBox="{-width / 2} {-height / 2} {width} {height}" style="display: block; margin: {marginTB} {marginRL}; background: {backgroundColor}; cursor={cursorType};" on:click={(event) => zoom(event, root)}>
    <g id="node" class="node">
        {#each root.descendants().slice(1) as rootData, i}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <circle id="node-{i}"
                fill={rootData.children ? color(rootData.depth) : "white"} 
                pointer-events={!rootData.children ? "none" : null}
                transform="translate({(rootData.x - zoomA) * zoomK},{(rootData.y - zoomB) * zoomK})"
                r={rootData.r * zoomK}
                on:mouseover={createStroke}
                on:mouseout={removeStroke}
                on:click={(event, rootData) => {focus !== rootData && (zoom(event, rootData), event.stopPropagation());}}
            ></circle>
        {/each}
    </g>
    <g id="label" class="label" pointer-events="none" text-anchor="middle" style="font: 10px sans-serif;">
        {#each root.descendants() as rootDes, i}
        <text id="label-{i}" 
            style="fill-opacity: {rootDes.parent === root ? 1 : 0}; display: {rootDes.parent === root ? "inline" : "none"};"
            transform="translate({(rootDes.x - zoomA) * zoomK},{(rootDes.y - zoomB) * zoomK})"
        >{rootDes.data.name}</text>
        {/each}
    </g>
</svg>

<style>
    svg {
    width: 100vw;
    height: 100vh;
    }
</style>