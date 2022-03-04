<!-- 

    var tooltip = d3.select(".tooltip-area").style("opacity", 0);

    const mouseover = (event, d) => {
      tooltip.style("opacity", 1);
    };

    const mouseleave = (event, d) => {
      // tooltip.style('opacity', 0);
    };

    const mousemove = (event, d) => {
      console.log("mousemove");
      const text = d3.select(".tooltip-area__text");
      text.text(`Sales were ${d.sales} in ${d.year}`);
      const [x, y] = d3.pointer(event);

      tooltip.attr("transform", `translate(${x}, ${y})`);
    };

// svg
//   .append("text")
//   .attr(
//     "transform",
//     "translate(" +
//       chartWidth / 2 +
//       " ," +
//       (chartHeight + margin.bottom - 10) +
//       ")"
//   )
//   .style("text-anchor", "middle")
//   .text(category); -->
<!-- const popData = [
    {
      Country: "United States",
      Population: "12394",
    },
    {
      Country: "Russia",
      Population: "6148",
    },
    {
      Country: "Germany (FRG)",
      Population: "1653",
    },
    {
      Country: "France",
      Population: "2162",
    },
    {
      Country: "United Kingdom",
      Population: "1214",
    },
    {
      Country: "China",
      Population: "1131",
    },
    {
      Country: "Spain",
      Population: "814",
    },
    {
      Country: "Netherlands",
      Population: "1167",
    },
    {
      Country: "Italy",
      Population: "660",
    },
    {
      Country: "Israel",
      Population: "1263",
    },
  ]; -->
