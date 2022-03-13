<script>
  import Scatter from './Scatter.svelte';
  import scatterdata from './nivo-scatter-data';
  import Chord from './Chord.svelte';
  import chordData from './observable-chord-data';
  import LineChart from './LineChart.svelte';
  import lineData from './line-data-multi';
  import AreaChart from './AreaChart.svelte';
  import areaData from './line-data-multi';
  import PieChart from './PieChart.svelte';
  import pieData from './pie-data-census';
  // import lineData from './line-data-vtsax';
  // import BarChart2 from './BarChart2.svelte';
  import BarChart2_Container from './BarChart/BarChart2_Container.svelte';
</script>

<body>
  <div>
    <!-- <BarChart2_Container/> -->
    <!-- <Scatter {scatterdata} /> -->
    <!-- <Chord {chordData} /> -->
    <!-- <LineChart {lineData} /> -->
    <!-- <AreaChart {areaData} /> -->
    <PieChart {pieData} />
  </div>
</body>

<style>

/* body {
   height:100%; 
   background-color: #1E1E1E;
} */

</style>


