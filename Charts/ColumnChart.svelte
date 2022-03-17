<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let color = "black";
  export let width = 500;
  export let height = 500;

  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 30, bottom: 70, left: 90 },
    chartWidth = width - margin.left - margin.right,
    chartHeight = height - margin.top - margin.bottom;

  const category = Object.keys(data[0])[0];
  const value = Object.keys(data[0])[1];
  let yAxisMaxVal = 0;
  for (let i = 0; i < data.length; i++) {
    const curVal = Number(data[i][value]);
    if (curVal > yAxisMaxVal) yAxisMaxVal = curVal * 1.1;
  }
  export let yAxisTitle = value;

  onMount(() => {
    // SVG
    const svg = d3
      .select("#BarChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .domain(data.map((d) => d[category]))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleLinear().domain([0, yAxisMaxVal]).range([chartHeight, 0]);
    svg.append("g").call(d3.axisLeft(y));
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yAxisTitle);

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

    // Bars
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("style", "position: absolute; opacity: 0;");
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.Country))
      .attr("width", x.bandwidth())
      .attr("fill", color)
      .attr("height", (d) => chartHeight - y(0))
      .attr("y", (d) => y(0))
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

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d) => y(d[value]))
      .attr("height", (d) => chartHeight - y(d[value]))
      .delay((d, i) => {
        return i * 100;
      });
  });
</script>

<body>
  <div id="BarChart" />
</body>
