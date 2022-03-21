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
