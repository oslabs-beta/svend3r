<script>
  import PieChart from './Pie_Chart.svelte';
  import PieChartCode from './PieChart_Code.svelte';
  import PieChartDocs from './PieChart_Docs.svelte';
</script>

<div class="pie-chart-container">
  <h1 class="page-title">Pie Charts</h1>
  <div class="chart-page">
    <div class="code-container">
      <div class="chart-render">
        <PieChart/>
      </div>
      <div class="code-mirror">
        <PieChartCode/>
      </div>
    </div>
    <div class="chart-docs">
      <PieChartDocs/>
    </div>
  </div>
</div>

<style>
  
  .page-title{
    color: rgba(255, 255, 255, 0.87);
    height: 5%;
    text-align: center;
    text-decoration: underline;
  }
  
  .chart-page{
    color: rgba(255, 255, 255, 0.87);
    background-color: #1E1E1E;
    display: flex;
    height: fit-content;
    width: fit-content;
    margin: 0% 5% 0% 5%;
  }
  
  .code-container {
    align-items: center;
    width:45vw; 
    height: 95%;
  }
  
  .code-mirror {
    background-color: #2D2D2D;
    border-radius: 0.5vw;
    width:40vw;
    height: 35vh;
    margin-top: 2vw;
    margin-bottom: 2vw;
    overflow: auto;
  }
  
  .chart-render {
    background-color: rgba(255, 255, 255, 0.87);
    align-items: center;
    text-align: center;
    width:40vw;
    height: 45vh;
    display: table-cell;
    vertical-align: middle;
  }
  
  .chart-docs{
    height: 83vh;
    width: 45vw;
    overflow: auto;
  }
  
  .chart-docs::-webkit-scrollbar {
      display: none;
  }
  
  .code-mirror::-webkit-scrollbar {
      display: none;
  }
  
  @media all and (min-width:0px) and (max-width: 700px) {


}
  </style>