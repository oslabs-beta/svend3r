<script>
    import BarChart2_Chart from "./BarChart2_Chart.svelte";
    import BarChart2_CodeMirror from "./BarChart2_CodeMirror.svelte";
    import BarChart2_Docs from "./BarChart2_Docs.svelte";
</script>
  
<div class="bar-chart-container">
    <h1 class="page-title">BAR CHARTS</h1>
    <div class="chart-page">
        <div class="code-container">
            <div class="chart-render">
                <BarChart2_Chart />
            </div>
            <div class="code-mirror">
                <BarChart2_CodeMirror/>
            </div>
        </div>
        <div class="chart-Docs">
            <BarChart2_Docs />
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
    overflow: auto;
  }
  
  .chart-render {
    background-color: rgba(255, 255, 255, 0.87);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width:40vw;
    height: 45vh;
  }
  
  .chart-Docs{
    height: 83vh;
    width: 45vw;
    overflow: auto;
  }
  
  .chart-Docs::-webkit-scrollbar {
      display: none;
  }
  
  .code-mirror::-webkit-scrollbar {
      display: none;
  }
  
  @media all and (min-width:0px) and (max-width: 700px) {


}
  </style>
  
  
  