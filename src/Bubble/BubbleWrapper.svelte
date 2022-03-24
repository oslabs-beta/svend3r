<script>
  import { forceX, forceY, forceCollide, forceRadial } from "d3-force"

  import Force from "./Force.svelte"

  let element
  let centerPosition = [200, 200]
  let useForceCollide = true
  let useForceRadial = false
  $: activeForceX = forceX().x(centerPosition[0])
  $: activeForceY = forceY().y(centerPosition[1])
  $: activeForceCollide = forceCollide()
    .radius(10)
    .iterations(3)
  $: activeForceRadial = forceRadial()
    .radius(150)
    .x(centerPosition[0])
    .y(centerPosition[1])
  $: forces = [
    ["x", activeForceX],
    ["y", activeForceY],
    useForceCollide && ["collide", activeForceCollide],
    useForceRadial && ["radial", activeForceRadial],
  ].filter(d => d)

  const numberOfDots = 100
  let dots = new Array(numberOfDots).fill(0).map(_ => ({}))

  const onClick = e => {
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top
    centerPosition = [x, y]
  }
</script>

<div class="controls">
  <label>
    <input type="checkbox" bind:checked="{useForceCollide}" />
    Collide?
  </label>
  <label>
    <input type="checkbox" bind:checked="{useForceRadial}" />
    Radial?
  </label>
</div>
<div class="note">Click around to update</div>

<div on:click="{onClick}" bind:this="{element}">
  <Force {forces} {dots} />
</div>

<style>
  .controls {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    font-style: italic;
    color: var(--text-light);
  }
  label + label {
    margin-left: 1em;
  }
  .note {
    position: absolute;
    top: 0;
    font-style: italic;
    color: var(--text-light);
  }
</style>