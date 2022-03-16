
<script>
  import Prism from 'prismjs';
  import { PieChartDocs } from './PieChart_Store';

  const dataSchema = `    const data = [
      { data_label: value, count/frequency: value }, 
      { data_label: value, count/frequency: value }, 
      { data_label: value, count/frequency: value }, 
      //insert additional data ...
  ]    `;

</script>

<div class="data-schema-container">
  <h1>Chart Data Schema</h1>
  <pre class="data-schema-code"><!--
  --><code class="language-javascript"><!--
      -->{@html Prism.highlight(dataSchema, Prism.languages['javascript'])}<!--
  --></code><!--
--></pre>
</div>
<div class="data-schema-container">
  <h1 class="Properties">Properties</h1>
  {#each $PieChartDocs as doc, i}
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
.data-schema-code {
  border-radius: 0.5vw;
}

pre, code {
  padding:0;
  margin:0;
  white-space: pre-wrap;
}

ul {
list-style-type: none;
border-bottom: 1px solid darkgrey;
}

.prop-value{
  font-size: 1.5vw;
}

.prop-value-docs{
  font-size: 0.7vw;
  margin-left: 1em;
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


