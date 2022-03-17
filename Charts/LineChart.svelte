<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  onMount(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //Read the data
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',

      // When reading the csv, I must format variables:
      function (d) {
        return { date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value };
      }
    ).then(
      // Now I can use this dataset:
      function (data) {
        // Add X axis --> it is a date format
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(data, function (d) {
              return d.date;
            })
          )
          .range([0, width]);
        const xAxis = svg
          .append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(data, function (d) {
              return +d.value;
            }),
          ])
          .range([height, 0]);
        const yAxis = svg.append('g').call(d3.axisLeft(y));

        // Add a clipPath: everything out of this area won't be drawn.
        const clip = svg
          .append('defs')
          .append('svg:clipPath')
          .attr('id', 'clip')
          .append('svg:rect')
          .attr('width', width)
          .attr('height', height)
          .attr('x', 0)
          .attr('y', 0);

        // Add brushing
        const brush = d3
          .brushX() // Add the brush feature using the d3.brush function
          .extent([
            [0, 0],
            [width, height],
          ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
          .on('end', updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the line variable: where both the line and the brush take place
        const line = svg.append('g').attr('clip-path', 'url(#clip)');

        // Add the line
        line
          .append('path')
          .datum(data)
          .attr('class', 'line') // I add the class line to be able to modify this line later on.
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr(
            'd',
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              })
          );

        // Add the brushing
        line.append('g').attr('class', 'brush').call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout;
        function idled() {
          idleTimeout = null;
        }

        // A function that update the chart for given boundaries
        function updateChart(event, d) {
          // What are the selected boundaries?
          const extent = event.selection;

          // If no selection, back to initial coordinate. Otherwise, update X axis domain
          if (!extent) {
            if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
            x.domain([4, 8]);
          } else {
            x.domain([x.invert(extent[0]), x.invert(extent[1])]);
            line.select('.brush').call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
          }

          // Update axis and line position
          xAxis.transition().duration(1000).call(d3.axisBottom(x));
          line
            .select('.line')
            .transition()
            .duration(1000)
            .attr(
              'd',
              d3
                .line()
                .x(function (d) {
                  return x(d.date);
                })
                .y(function (d) {
                  return y(d.value);
                })
            );
        }

        // If user double click, reinitialize the chart
        svg.on('dblclick', function () {
          x.domain(
            d3.extent(data, function (d) {
              return d.date;
            })
          );
          xAxis.transition().call(d3.axisBottom(x));
          line
            .select('.line')
            .transition()
            .attr(
              'd',
              d3
                .line()
                .x(function (d) {
                  return x(d.date);
                })
                .y(function (d) {
                  return y(d.value);
                })
            );
        });
      }
    );
  });
</script>

<div id="my_dataviz" />
