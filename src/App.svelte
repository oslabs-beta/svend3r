<script>
  import BarChart2 from './BarChart2.svelte';
  import Scatter from './Scatter.svelte';
  import scatterdata from './nivo-scatter-data';
  import Chord from './Chord.svelte';
  import chordData from './observable-chord-data';
  // import lineData from './line-data-vtsax';
  import lineData from './line-data-vtsax';
  import LineChart from './LineChart.svelte';
  // import BarChart2 from './BarChart2.svelte';
  // import Scatter from './Scatter.svelte';
  // import scatterdata from './nivo-scatter-data';
  // import Chord from './Chord.svelte';
  // import chordData from './observable-chord-data';
  import BarChart2_Container from './BarChart/BarChart2_Container.svelte';
</script>

<body>
  <div>
    <BarChart2_Container/>
    <!-- <Scatter {scatterdata} /> -->
    <!-- <Chord {chordData} /> -->
    <!-- <LineChart {lineData} /> -->
  </div>
</body>

<style>

body {
   height:100%; 
   background-color: #1E1E1E;
}

</style>


