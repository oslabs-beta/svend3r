<!--Load the AJAX API-->
<script>
  import BarChart2 from './BarChart2.svelte';
  import Scatter from './Scatter.svelte';
  import scatterdata from './nivo-scatter-data';
  import Chord from './Chord.svelte';
  import chordData from './observable-chord-data';
  // import lineData from './line-data-vtsax';
  import lineData from './line-data-vtsax';
  import LineChart from './LineChart.svelte';
</script>

<body>
  <!--Div that will hold the pie chart-->
  <div>
    <!-- <BarChart2/> -->
    <!-- <Scatter {scatterdata} /> -->
    <!-- <Chord {chordData} /> -->
    <LineChart {lineData} />
  </div>
</body>
