<script>
import { forceSimulation } from "d3-force"

// utility function for translating elements
const move = (x, y) => `transform: translate(${x}px, ${y}px`

// an array of our particles
export let data = []
// an array of [name, force] pairs
export let forces = []

let usedForceNames = []
let renderedDots = []

//this will set the size of the svg in a declarative manner, 
//height and width cannot be set in styles
let width = 1200
$: height = width

$: simulation = forceSimulation()
    .nodes(data)
    .on("tick", () => {
    // update the renderedDots reference to trigger an update
    renderedDots = [...data]
    })

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
    console.log(simulation.tick)
    simulation.alpha(.5)
    simulation.restart()
}
console.log(data)
</script>

<svg {width} {height}>
    {#each renderedDots as { x, y , radius, color, name, letter}, i}
    <circle fill="{color}" style="{move(x, y)}" r="{radius}"></circle>
    <text style="{move(x, y)}">{letter}</text>
    {/each}
</svg>

<style>
svg {
    overflow: visible;
}
</style>