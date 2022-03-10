<!--Load the AJAX API-->
<script>
  import BarChart2 from "./BarChart2.svelte";
  import Bubble from "./Bubble.svelte"
  // import ColumnChart from "../src/ColumnChart.svelte";
  // import DoughnutChart from '../src/DoughnutChart.svelte'
  // import AnimatedDoughnut from '../src/DoughnutAnim.svelte'
  // Load the Visualization API and the corechart package.
  google.charts.load("current", { packages: ["corechart"] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows([
      ["Mushrooms", 3],
      ["Onions", 1],
      ["Olives", 1],
      ["Zucchini", 1],
      ["Pepperoni", 2],
    ]);

    // Set chart options
    var options = {
      title: "How Much Pizza I Ate Last Night",
      width: 400,
      height: 300,
      colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      is3D: true,
      pieSliceText: 'label',
      slices: {
              1: {offset: 0.2},
              2: {offset: 0.3},
              3: {offset: 0.4},
              4: {offset: 0.5},
      },
      pieStartAngle: 210,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }
  const popData = [
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
  ];

</script>

<body>
  <!-- Div that will hold the pie chart -->
  <!-- <ColumnChart data={popData} />
  <DoughnutChart/> -->
  <!-- <AnimatedDoughnut/> -->4
  <!-- <div id="chart_div" /> -->
  <div>
    <BarChart2/>
    <Bubble/>
  </div>
</body>
