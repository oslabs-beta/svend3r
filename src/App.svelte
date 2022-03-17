<script>
  import Scatter from './Scatter/Scatter_Chart.svelte';
  import scatterData from './data/nivo-scatter-data';
  import Chord from './Chord/Chord_Chart.svelte';
  import chordData from './data/observable-chord-data';
  import LineChart from './Line/Line_Chart.svelte';
  import lineData from './data/line-data-multi';
  // import lineData from './data/line-data-vtsax';
  import AreaChart from './Area/Area_Chart.svelte';
  import areaData from './data/line-data-multi';
  import PieChart_Container from './Pie/PieChart_Container.svelte'
  // import PieChart from './Pie/Pie_Chart.svelte';
  // import pieData from './data/pie-data-census';
  import Choropleth from './Choropleth/Choropleth_Chart.svelte';
  import choroplethData from './data/bivariate-choropleth-data-d3';
  
  import BarVert_Container from './BarVert/BarVert_Container.svelte';
</script>

<body>
  <div>
    <!-- <BarVert_Container/> -->
    <!-- <Scatter {scatterData} /> -->
    <!-- <Chord {chordData} /> -->
    <!-- <LineChart {lineData} /> -->
    <!-- <AreaChart {areaData} /> -->
    <!-- <PieChart/> -->
    <PieChart_Container/>
    <!-- <Choropleth {choroplethData} /> -->
  </div>
</body>

<style>
body {
   height:100%; 
   background-color: #1E1E1E;
}
</style>