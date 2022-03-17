<script>
  import Prism from 'prismjs';
  import { ChordChartDocs } from './ChartStore';

  export let code,
    chartData;

  // console.log('CodeMirror code and chartData', code, chartData);
  // console.log('docs', $ChordChartDocs);

  // function stringTemplateParser(expression, valueObj) {
  //   const templateMatcher = /\${\s?([^{}\s]*)\s?}/g;
  //   let text = expression.replace(templateMatcher, (substring, value, index) => {
  //     value = valueObj[value];
  //     return value;
  //   });
  //   return text
  // }

  function showCode(id) {
    if(id === 'page1') {
      document.getElementById('page1_desc').style.display = 'block';
      document.getElementById('page2_desc').style.display = 'none';
    } else {
      document.getElementById('page1_desc').style.display = 'none';
      document.getElementById('page2_desc').style.display = 'block';
    }
  }
</script>

<button class="page_selected" id="page1" on:click={() => showCode('page1')}>Code</button><!--
--><button class="page_selected" id="page2" on:click={() => showCode('page2')}>Data</button>

<pre id="page1_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
    ><!--
     -->{@html Prism.highlight(
      code,
      Prism.languages['javascript']
    )}<!--
 --></code
  ><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code class="language-javascript"
    ><!--
     -->{@html Prism.highlight(
      chartData,
      Prism.languages['javascript']
    )}<!--
 --></code
  ><!--
--></pre>

<style>
.codeMirror {
  white-space: pre-wrap;
}
#page2_desc {
  display: none;
}
.page_selected {
  width: 50%;
  border-style: none;
  border-radius: 0;
  background-color: #494949;
  color: rgba(255, 255, 255, 0.87);
}
#page2{
  border-left: #1E1E1E;
  border-left-width: 2px;
  border-left-style: solid;
}
.page_selected:hover {
  background-color: #1E1E1E;
  color: rgba(255, 255, 255, 0.87);
}
</style>