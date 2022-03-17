<script>
    import * as d3 from "d3";
    import { sampleData } from "./sampleData.js" 

    let width = 932;
    let height = width;
    let marginTB = 0;
    let marginRL = -14;
    let backgroundColor = "rgb(163, 245, 207)"
    let cursorType = "pointer"
    let format = d3.format(",d")
    let color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)

    // let d3 = require("d3@6")
    let pack = data => d3.pack()
    .size([width, height])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

    let data = sampleData;

    const root = pack(data);
    let focus = root;
    let view;

    console.log(root.descendants().slice(1))
    console.log(root)

    //D3 zoomTo Function
    function zoomTo(v) {
        const k = width / v[2];

        view = v;

        let transformX = (d.x - v[0]) * k
        let transformY = (d.y - v[1]) * k
        let rValue = d.r * k
        // label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        // node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        // node.attr("r", d => d.r * k);
    }

    // //invoke zoomTo
    // zoomTo([root.x, root.y, root.r * 2]);

    //D3 zoom Function
    function zoom(event, d) {
        //both node and label transform values are the same before and after transformation.
        // zoomTo([root.x, root.y, root.r * 2]); set as onload value?
        function zoomTo(v) {
            const k = width / v[2];

            view = v;

            let transformX = (d.x - v[0]) * k
            let transformY = (d.y - v[1]) * k
            let rValue = d.r * k
        }

        //update the onclick event to run this function and its values and then set the new transform values
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
            });

        this.transitionDuration = event.altKey ? 7500 : 750
        
        
        document.getElementById(`index-${ind}`)
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

<svg viewBox="{-width / 2} {-height / 2} {width} {height}" style="display: block; margin: {marginTB} {marginRL}; background: {backgroundColor}; cursor={cursorType};" on:click={(event) => zoom(event, root)}>
    <g class="node">
        {#each root.descendants().slice(1) as rootData, i}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <circle id="node-{i}"
                fill={rootData.children ? color(rootData.depth) : "white"} 
                transform="translate({(rootData.x - root.x) * (width / root.r * 2)},{(rootData.y - root.y) * (width / root.r * 2)})"
                r={rootData.r * (width / root.r * 2)}
                pointer-events={!rootData.children ? "none" : null}
                on:mouseover={createStroke}
                on:mouseout={removeStroke}
                on:click={(event, rootData) => focus !== rootData && (zoom(event, rootData), event.stopPropagation())}
            ></circle>
        {/each}
    </g>
    <g class="label" pointer-events="none" text-anchor="middle" style="font: 10px sans-serif;">
        {#each root.descendants() as rootDes, i}
        <text id="label-{i}" 
            style="fill-opacity: {rootDes.parent === root ? 1 : 0}; display: {rootDes.parent === root ? "inline" : "none"};"
            transform="translate({(rootDes.x - root.x) * (width / root.r * 2)},{(rootDes.y - root.y) * (width / root.r * 2)})"
        >{rootDes.data.name}</text>
        {/each}
    </g>
</svg>

<style>
    svg {
    max-width: 100%;
    max-height: 100%;
    }
</style>