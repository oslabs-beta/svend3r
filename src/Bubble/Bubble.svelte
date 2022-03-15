<script>
import * as d3 from "d3";
import { forceSimulation } from "d3-force";


// an array of circles
export const circles = []
// an array of [name, force] pairs
export const forces = []

const forceNames = [];
const renderedCircles = []

//you have to set height and width of the svg here or else the force simulation will not work correctly, must be bound to the container with bind:clientWidth="{width}"
let width = 1200
$: height = width

$: simulation = forceSimulation()
    .nodes(circles)
    .on("tick", ticked);

    // ======>

// //forces will be applied in the BubbleWrapper component    
// const simulation = d3
// //force simulation takes our data as a parameter and forces are applied to it to create movement in our nodes
// .forceSimulation(data.nodes)
// .force("charge", d3.forceManyBody().strength(300))
// .force("center", d3.forceCenter(width / 2, height / 2))
// .force("collide", d3.forceCollide((d)=>d.radius).strength(.9))
// .on("tick", ticked);

$: {
    // re-initialize forces when they change
    forces.forEach(([name, force]) => {
    simulation.force(name, force)
    })

    // remove old forces
    const newForceNames = forces.map(([name]) => name)
    let oldForceNames = usedForceNames.filter(
    force => !newForceNames.includes(force),
    )
    oldForceNames.forEach(name => {
    simulation.force(name, null)
    })
    usedForceNames = newForceNames

    // kick our simulation into high gear
    simulation.alpha(1)
    simulation.restart()
}

const drag = d3
    .drag()
    .on("start", dragStarted)
    .on("drag", dragging)
    .on("end", dragEnded)

const textAndNodes = svg
    .append("g")
    .selectAll("g")
    .data(data.nodes)
    .enter()
    .append("g")
    .call(drag)

// //circles will be renderd in the bubble wrapper component
// const circles= textAndNodes
//     .append("circle")
//     .attr("r", (d)=> d.radius)
//     .attr("fill", (d)=> d.color)

const text = textAndNodes
    .append("text")
    .text((d)=>d.letter)

const radius = textAndNodes
    .append("text")
    .text((d)=>d.radius)


function ticked() {
    textAndNodes
    .attr("transform", (d)=> "translate(" + d.x + "," + d.y +")")
}

function dragStarted(d){
    if(!d3.event.active) simulation.alphaTarget(0.3).restart();
    //fx,fx fix the position of the node and stop any more force that may have been applied otherwise
    //this function will work using x and y but the node will continue to move after the tick function is finished execution
    d.fx=d.x;
    d.fy=d.y;
}

function dragging(d){
    //set the node to the current mouse position
    //fx and fy are assigned when using the force simulation function
    //at the end of every instance of the tick function, 
    d.fx = d3.event.x
    d.fy = d3.event.y
}

function dragEnded(d){
    if(!d3.event.active) simulation.alphaTarget(0);
    d.fx= null;
    d.fy= null;
}
</script>

<svg></svg>

<style>
svg {
    width: "960";
    height: "600"
}
</style>