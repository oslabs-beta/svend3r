<!--Load the AJAX API-->
<script>
  import BarChart2 from './BarChart2.svelte';
  import Scatter from './Scatter.svelte';
  import scatterdata from './nivo-scatter-data';
  import Chord from './Chord.svelte';
  import chordData from './observable-chord-data';
  import Bubble from './Bubble.svelte'
</script>

<body>
  <!-- Div that will hold the pie chart -->
  <!-- <ColumnChart data={popData} />
  <DoughnutChart/> -->
  <!-- <AnimatedDoughnut/> -->4
  <!-- <div id="chart_div" /> -->
  <div>
    <!-- <BarChart2/> -->
    <!-- <Scatter {scatterdata} /> -->
    <!-- <Chord {chordData} /> -->
    <Bubble/>
  </div>
</body>
