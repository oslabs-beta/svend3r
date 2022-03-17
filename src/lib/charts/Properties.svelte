<script>
  import Prism from 'prismjs';
  import { ChartDocs } from './ChartStore';
  
  export let schema;

  // console.log('Properties schema and properties', schema, properties);
</script>

<div class="data-schema-container">
  <h1 class="section-title">Chart Data Schema</h1>
  <pre class="data-schema-code"><!--
  --><code class="language-javascript"><!--
       -->{@html Prism.highlight(schema, Prism.languages['javascript'])}<!--
   --></code><!--
--></pre>
</div>
<div class="data-schema-container">
  <h1 class="section-title">Properties</h1>
  {#each $ChartDocs as doc, i}
      <ul>
          <li class="prop-value">{doc.variable}</li>
          <li class="prop-value-docs"><b>Data Type: </b>{doc.dataType}</li>
          <li class="prop-value-docs"><b>Description: </b>{doc.description}</li>
          <li class="prop-value-docs"><b>Default Value: </b><span style="color: #FF7550">{doc.defaultValue}</span></li>
          <div class="adjustable-container">
              {#if doc.max}
                  <li class="prop-value-docs"><b>Adjusted Value: </b></li>
                  <input class="input" type="range" step={doc.max === 1 ? 0.1 : 1} bind:value={doc.value} max={doc.max}>
                  <li class="input-value">{doc.value}</li>
              {/if}
              {#if !doc.max && i > 0}
                  <li class="prop-value-docs"><b>Adjusted Value: </b></li>
                  <input class="input" bind:value={doc.value}>
              {/if}
          </div>
      </ul>
  {/each}
</div>

<style>

.data-schema-container{
  margin-bottom: 1vw;
}

.data-schema-code {
  border-radius: 0.5vw;
  background-color: #2D2D2D;
}
pre, code {
  padding:0 0 0 1vw;
  margin:0;
  white-space: pre-wrap;
}

.section-title{
  font-family: 'Roboto', sans-serif;
  font-size: 1.5vw;
  margin-bottom: 1vw;
}

ul {
list-style-type: none;
border-bottom: 1px solid darkgrey;
margin-left: 2vw;
}

input{
    color: black;
    padding: 5px;
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
  
</style>