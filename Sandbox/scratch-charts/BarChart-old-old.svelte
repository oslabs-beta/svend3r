<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let color = "black";
  export let width = 500;
  export let height = 500;

  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 30, bottom: 40, left: 90 },
    chartWidth = width - margin.left - margin.right,
    chartHeight = height - margin.top - margin.bottom;
  console.log("data=>", data);
  const category = Object.keys(data[0])[0];
  const value = Object.keys(data[0])[1];

  let maxVal = 0;
  for (let i = 0; i < data.length; i++) {
    const curVal = Number(data[i][value]);
    if (curVal > maxVal) maxVal = curVal * 1.1;
  }

  onMount(() => {
    // SVG
    const svg = d3
      .select("#BarChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .text("a simple tooltip");

    // Add X axis
    var x = d3.scaleLinear().domain([0, maxVal]).range([0, chartWidth]);
    svg
      .append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, chartHeight])
      .domain(
        data.map(function (d) {
          return d[category];
        })
      )
      .padding(0.1);
    svg.append("g").call(d3.axisLeft(y));

    //Bars
    svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d[category]);
      })
      .attr("width", function (d) {
        return x(d[value]);
      })
      .attr("height", y.bandwidth())
      .attr("fill", color)
      .on("mouseover", function (e, d) {
        d3.select(this).style("stroke", "black").style("opacity", 1);
        return tooltip
          .style("visibility", "visible")
          .text(`${d[category]}: ${Number(d[value]).toLocaleString()}`);
      })
      .on("mousemove", function (e) {
        return tooltip
          .style("top", e.pageY - 10 + "px")
          .style("left", e.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
        return tooltip.style("visibility", "hidden");
      });

    // TODO: Animation;
    // svg
    //   .selectAll("rect")
    //   .transition()
    //   .duration(800)
    //   .attr("x", function (d) {
    //     return x(d[value]);
    //   })
    //   .attr("width", function (d) {
    //     return 0;
    //   })
    //   .delay((d, i) => {
    //     return i * 100;
    //   });
  });
</script>

<body>
  <div id="BarChart" />
</body>
