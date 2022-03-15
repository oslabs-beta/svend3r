<!--Load the AJAX API-->
<script>
  import BarChart2 from './BarChart2.svelte';
  import Scatter from './Scatter.svelte';
  import scatterdata from './nivo-scatter-data';
  import Chord from './Chord.svelte';
  import chordData from './observable-chord-data';
  // import BubbleWrapper from './Bubble/Bubble.svelte'
  import ForceWrapper from './Force Example/ForceWrapper.svelte';
import WordExample from './WordExample.svelte';
  import WordCloud from './WordCloud.svelte';
</script>

<body>
  <!-- Div that will hold the pie chart -->
  <!-- <ColumnChart data={popData} />
  <DoughnutChart/> -->
  <!-- <AnimatedDoughnut/> -->
  <!-- <div id="chart_div" /> -->
  <div>
    <WordCloud/>
    <!-- <WordExample/> -->
    <!-- <BarChart2/> -->
    <!-- <ForceWrapper/> -->
    <!-- <BubbleWrapper/> -->
    <!-- <Scatter {scatterdata} /> -->
    <!-- <Chord {chordData} /> -->
    <!-- <Chord {chordData}/> -->
  </div>
</body>
