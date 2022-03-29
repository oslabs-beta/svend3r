<script>
  import Prism from 'prismjs';
  import { ChartDocs } from './ChartStore';
  
  // console.log('Properties schema and properties', schema, properties);
  // $: colors = ["#c4c4c4","#69b40f","#ec1d25","#c8125c","#008fc8","#10218b","#134b24","#737373"];
  // let colorsArray;
  // $: if (!Array.isArray(colors)) {
  //   console.log(colors, typeof colors, colors.split(','))
  //   // colorsArray = JSON.parse(`[${colors}]`);
  //   colorsArray = colors.split(',');
  // } 
  // $: console.log(Array.isArray(colorsArray));

  // $ChartDocs.forEach((doc) => {
  //   if (Array.isArray(doc)) {

  //   }
  // })
</script>

<div class="data-schema-container">
  <h1 class="section-title">Properties</h1>
  <div class="chart-props">
    {#each $ChartDocs as doc, i}
        <ul>
            <li class="prop-value">{doc.variable}</li>
            <li class="prop-value-docs"><b>Data Type: </b>{doc.dataType}</li>
            <li class="prop-value-docs"><b>Description: </b>{doc.description}</li>
            <li class="prop-value-docs"><b>Default Value: </b><span style="color: #FF7550">{doc.defaultValue}</span></li>
            <div class="adjustable-container">
              {#if doc.dataType === "Boolean"}
                <li class="prop-value-docs"><b>Adjusted Value: </b></li>
                  <label class="switch">
                      <input type="checkbox" bind:checked={doc.value} />
                      <span class="slider" />
                  </label>
                <li class="input-value">{doc.value}</li>
              {/if}
              {#if doc.max}
                  <li class="prop-value-docs"><b>Adjusted Value: </b></li>
                  <input class="input" type="range" step={doc.max === 1 ? 0.1 : 1} bind:value={doc.value} min={doc.min} max={doc.max}>
                  <li class="input-value">{doc.value}</li>
              {/if}
              {#if Array.isArray(doc.value)}
                <section class="array_container">
                  {#each doc.value as el, i}
                  <section class="array_container_sub">
                    <li class="prop-value-docs"><b>Adjusted Value - Index {i}: </b></li>
                    <input class="input-arr" on:input={(e) => el = e.target.value} value={el}>
                  </section>
                  {/each}
                </section>
              {:else if !doc.max && i > 0 && doc.dataType !== "Boolean"}
                  <li class="prop-value-docs"><b>Adjusted Value: </b></li>
                  <input class="input" bind:value={doc.value}>
              {/if}
            </div>
        </ul>
    {/each}
  </div>
</div>

<style>

.chart-props {
  overflow: auto;
  height: 32vh;
}

.chart-props::-webkit-scrollbar {
      display: none;
}

.section-title{
  font-family: 'Roboto', sans-serif;
  font-size: 1.5vw;
  margin-bottom: 0.5vw;
}

ul {
list-style-type: none;
border-bottom: 1px solid darkgrey;
margin-left: 2vw;
}

input{
    display:list-item;
    color: black;
    padding: 5px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.prop-value{
  font-size: 1.5vw;
}

.prop-value-docs{
  font-size: 0.7vw;
  margin-left: 2em;
}

.adjustable-container{
  display: flex;
  margin-top: 0.5vw;
  align-items: center;
  margin-bottom: 1em;
}

.input{
  display:inline-block;
  margin-left: 1vw;
  margin-bottom: 0;
}

.input-value{
  margin-left: 1vw;
  color: lightgreen
}

.array_container{
  width: 450px;
  outline: none;
}

.array_container_sub{
  display: flex;
  align-items: center;
}

.input-arr{
  margin: 1vw;
}

.switch {
    margin-left: 1em;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:checked + .slider {
    box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}
  
</style>