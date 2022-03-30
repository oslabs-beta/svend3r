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
      .radius((d) => d.radius)
      // .iterations(3)
    $: forces = [
      ["x", activeForceX],
      ["y", activeForceY],
      useForceCollide && ["collide", activeForceCollide],
    ].filter(d => d)
  
    const data = [{letter: 'A', radius: 10, color : 'red'},
    {letter: 'B', radius: 20, color : 'blue'},
    {letter: 'C', radius: 30, color : 'green'},
    {letter: 'D', radius: 40, color : 'yellow'},
    {letter: 'E', radius: 50, color : 'gold'},
    {letter: 'F', radius: 40, color : 'purple'},
    {letter: 'G', radius: 30, color : 'navy'},
    {letter: 'H', radius: 20, color : 'orange'},]
  
    const onClick = e => {
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      centerPosition = [x, y]
    }
  </script>
  
  <div on:click="{onClick}" bind:this="{element}">
    <Force {forces} {data} />
  </div>
