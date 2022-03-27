<script>
  import Prism from 'prismjs';
  import { get } from 'svelte/store';
  import { ChartDocs } from './ChartStore';

  export let code,
    data;

  // const imports = {
	// 	area: (Data, raw) => import(`./templates/Area${Data}.svelte?${raw}`),
	// 	bar: (Data, raw) => import(`./templates/Bar${Data}.svelte?${raw}`),
	// 	chord: (Data, raw) => import(`./templates/Chord${Data}.svelte?${raw}`),
  //   radialStacked: (Data, raw) => import(`./templates/RadialStacked${Data}.svelte?${raw}`)
	// };

  // const chartComponents = {
  //   area: Area,
  //   bar: Bar,
  //   chord: Chord,
  //   // choropleth: Choropleth,
  //   // circlePack: CirclePack,
  //   // line: Line,
  //   // pie: Pie,
  //   radialStacked: RadialStacked,
  //   // scatter: Scatter
  // }

  // console.log('mirror', slug);

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

  // $: chordcode = Chord;

  // const splitcode = Chord.split(/<\/?script>|<\/?style>/);

  // console.log(splitcode[1] + splitcode[2] + splitcode[3]);

  // console.log(eval(splitcode[1].split(/ChartStore/)[1]));

  // const getdocs = get(ChartDocs);

  // function updateCode(_) {
  //   for (let i = 1; i < $ChartDocs.length; i++) {
  //     chordcode = chordcode.replace(/\$ChartDocs\[\d+].value/, $ChartDocs[i].value)
  //   }
  //   return chordcode;
  // }

  // $: updateCode = () => {
  //   // get(ChartDocs);
  //   let chordcode = Chord.replace("import { ChartDocs } from '../ChartStore';", '');
  //   // console.log('update', $ChartDocs);
  //   for (let i = 1; i < $ChartDocs.length; i++) {
  //     chordcode = chordcode.replace(/\$ChartDocs\[\d+].value/, $ChartDocs[i].value);
  //   }
  //   return chordcode;
  // }

  // $: updateCode = () => {
  //   let chordcode = chartComponents[slug].replace("import { ChartDocs } from '../ChartStore';", '');
  //   for (let i = 1; i < $ChartDocs.length; i++) {
  //     chordcode = chordcode.replace(/\$:(.+)\$ChartDocs\[\d+].value/, '$1' + $ChartDocs[i].value);
  //   }
  //   return chordcode;
  // };

  // $: console.log('mirror read', imports[slug]('','raw').default);

  // $: updateCode = async () => {
  //   let selected = await imports[slug]('','raw');
  //   console.log('selected', selected);
  //   let code = selected.default.replace("import { ChartDocs } from '../ChartStore';", '');
  //   for (let i = 1; i < $ChartDocs.length; i++) {
  //     code = code.replace(/\$:(.+)\$ChartDocs\[\d+].value/, '$1' + $ChartDocs[i].value);
  //   }
  //   return code;
  // };

  $: updateCode = () => {
    let userCode = code.replace("import { ChartDocs } from '../ChartStore';", '');
    for (let i = 1; i < $ChartDocs.length; i++) {
      userCode = userCode.replace(/\$:(.+)\$ChartDocs\[\d+].value/, '$1' + $ChartDocs[i].value);
    }
    return userCode;
  };

  // $: evalcode = () => {
  //   // get(ChartDocs);
  //   console.log('eval', $ChartDocs);
  //   return eval(code);
  // }

  // console.log('evalcode', eval(code));


  // $: evalcode = () => {
  //   // get(ChartDocs);
  //   console.log('eval', $ChartDocs);
  //   return eval(chordcode);
  // }
  
  // $: {
  //   console.log('update', $ChartDocs);
  //   updateCode();
  // } 

  // console.log('$', $ChartDocs);
  // console.log('get', get(ChartDocs));

  // const quoteData = `${chartData}`;


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

<!-- <div class="data-schema-container">
  <h1 class="section-title">Chart Data Schema</h1>
</div> -->
<div class="code-mirror">
<button class="page_selected" id="page1" on:click={() => showCode('page1')}>
  <section class="button-text_icon">
  <img class="codeMirror-icon" id="page1" alt="svend3r d3 chart code" src='/codeMirror/code.png'>
  Code</section>
</button><!--
--><button class="page_selected" id="page2" on:click={() => showCode('page2')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/data.png'>
    Data</section>
</button><!--
--><button class="page_selected" id="page3" on:click={() => showCode('page3')}>
    <section class="button-text_icon">
    <img class="codeMirror-icon" alt="svend3r d3 chart code" src='/codeMirror/schema.png'>
    Data Schema</section>
</button>
<pre id="page1_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(updateCode(), Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>

<pre id="page2_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(data, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>
</div>


<style>
  .section-title{
    font-family: 'Roboto', sans-serif;
    font-size: 1.5vw;
    margin-bottom: 0.5vw;
  }

	.codeMirror {
		white-space: pre-wrap;
		padding: 1vw 0 0 1vw;
    min-height: 31vh;
    outline: none;
	}

  .code-mirror {
    background-color: #2D2D2D;
    border-radius: 0.5vw;
    width: 36vw;
    height: 35vh;
    margin-bottom: 1vw;
    overflow: auto;
  }

	#page2_desc, #page3_desc {
		display: none;
	}

	.page_selected {
		width: 33.33%;
		height: 9%;
		border-style: none;
		border-radius: 0;
		background-color: #494949;
		color: rgba(255, 255, 255, 0.87);
	}

	#page2, #page3 {
		border-left: #1e1e1e;
		border-left-width: 2px;
		border-left-style: solid;
    opacity: 50%;
	}

  #page1:hover, #page2:hover, #page3:hover {
    opacity: 100%;
  }

	.page_selected:hover {
		background-color: #1e1e1e;
		color: rgba(255, 255, 255, 0.87);
	}

  .codeMirror-icon {
    width: 8%;
    height: 8%;
    margin-right: 3%;
    margin-top: auto;
    margin-bottom: auto;
  }

  .button-text_icon{
    display: flex;
    justify-content: center;
  }

  .code-mirror::-webkit-scrollbar {
      display: none;
  }

  .codeMirror::-webkit-scrollbar {
      display: none;
  }

</style>
