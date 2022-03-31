<script>
  import * as d3 from "d3";

  name = ([x]) => x, // alias for label
label = name, // given d in data, returns text to display on the bubble
value = ([, y]) => y, // given d in data, returns a quantitative size
group, // given d in data, returns a categorical value for color
title, // given d in data, returns text to show on hover
link, // given a node d, its link (if any)
linkTarget = "_blank", // the target attribute for links, if any
width = 640, // outer width, in pixels
height = width, // outer height, in pixels
padding = 3, // padding between circles
margin = 1, // default margins
marginTop = margin, // top margin, in pixels
marginRight = margin, // right margin, in pixels
marginBottom = margin, // bottom margin, in pixels
marginLeft = margin, // left margin, in pixels
groups, // array of group names (the domain of the color scale)
colors = d3.schemeTableau10, // an array of colors (for groups)
fill = "#ccc", // a static fill color, if no group channel is specified
fillOpacity = 0.7, // the fill opacity of the bubbles
stroke, // a static stroke around the bubbles
strokeWidth, // the stroke width around the bubbles, if any
strokeOpacity, // the stroke opacity around the bubbles, if any



</script>

<svg>
  {#each renderedDots as { x, y , radius, color, name, letter}, i}
  <circle fill="{color}" r="{radius}"></circle>
  <text style="{move(x, y)}">{letter}</text>
  {/each}
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
    height: intrinsic;
  }
  text{
    font-size: 12;
    font-family: sans-serif;
    text-anchor: middle;
  }
  circle{
  }

</style>