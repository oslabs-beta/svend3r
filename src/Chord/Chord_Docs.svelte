
<script>
    import Prism from 'prismjs';
    import { ChordChartDocs } from './Chord_Store.js';

    const dataSchema = `
    const relationalData = [
        [A_A, A_B, A_C, A_D, A_E, A_F, A_G, A_H], 
        [B_A, B_B, B_C, B_D, B_E, B_F, B_G, B_H],
        [C_A, C_B, C_C, C_D, C_E, C_F, C_G, C_H],
        [D_A, D_B, D_C, D_D, D_E, D_F, D_G, D_H],
        [E_A, E_B, E_C, E_D, E_E, E_F, E_G, E_H],
        [F_A, F_B, F_C, F_D, F_E, F_F, F_G, F_H],
        [G_A, G_B, G_C, G_D, G_E, G_F, G_G, G_H],
        [H_A, H_B, H_C, H_D, H_E, H_F, H_G, H_H],
        //insert additional inter-relational matrixed data..."
    ];

    //Note array length and element length must be equal for a relational dataset

    export { sampleData };
    `;

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
    {#each $ChordChartDocs as doc, i}
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
                {#if !doc.max && i > 0 && doc.dataType !== "Boolean"}
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


