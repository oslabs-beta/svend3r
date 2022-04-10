<script>
  import Prism from 'prismjs';
  import { afterNavigate } from '$app/navigation';
  import { ChartDocs } from './ChartStore';

  export let code,
    data,
    schema;
  
  
  afterNavigate(() => {
    showCode('page1');
  })

  $: updateCode = () => {
    let userCode = code.replace("import { ChartDocs } from '../ChartStore';\n", '');
    userCode = userCode.replace('./data', '');
    userCode = userCode.replace('./data', '');
    
    for (let i = 0; i < $ChartDocs.length; i++) {
      const doc = $ChartDocs[i].value;
      let replacementValue = doc;
      if (Array.isArray(doc)) {
        replacementValue = `[${doc.map((el) => `'${el}'`)}]`;
      }
      else if (typeof doc === 'string') {
        replacementValue = `'${doc}'`;
      }
      userCode = userCode.replace(/\$:(.+)\$ChartDocs\[\d+].value/, 'const' + '$1' + replacementValue);
    }
    userCode = userCode.replace(/\$: (for|if|inactive)/g, '$1');
    userCode = userCode.replace(/\$: (active)/g, 'let $1');
    userCode = userCode.replace(/\$: (?!reactive|\{)/g, 'const ');
    //need to update for circle pack chart let variable and zoomTo invocation
    
    return userCode;
  };

  let page = 'page1';
  function showCode(id) {
    let idArr = ['page1', 'page2', 'page3'];
    page = id;
    for(let i = 0; i < idArr.length; i++) {
      if(id === idArr[i]) {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'block';
        document.getElementById(`${idArr[i]}`).style.opacity = "100%"
      } else {
        document.getElementById(`${idArr[i]}_desc`).style.display = 'none';
        document.getElementById(`${idArr[i]}`).style.opacity = "50%"
      }
    }
	}

  let copied = false;
  function copyCode() {
    copied = true;
    setTimeout(()=>copied = false, 1000)
    if(page === 'page1') navigator.clipboard.writeText(updateCode());
    if(page === 'page2') navigator.clipboard.writeText(data);
    if(page === 'page3') navigator.clipboard.writeText(schema);
  }
</script>

<div class="data-schema-container">
  <h1 class="section-title">Chart Data Schema</h1>
</div>
<div class="buttons-container">
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
</div>
<div class="code-mirror">
  <div class="copy-icon">
    <button class="" on:click={copyCode}>
      <img alt="Copy Code" src='/codeMirror/CopyIcon.svg'>
    </button>
    <span
			class={`absolute w-auto p-2 m-2 min-w-max right-8 rounded-md shadow-md dark:bg-white dark:text-black
			text-white bg-gray-900 text-xs font-bold transition-all duration-100  origin-right ${copied ? "scale-100" : "scale-0"}`}
		>
		Copied to clipboard!
		</span>
  </div>
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
<pre id="page3_desc" class="codeMirror" contenteditable><!--
--><code spellcheck="false" class="language-javascript"
		><!--
     -->{@html Prism.highlight(schema, Prism.languages['javascript'])}<!--
 --></code
	><!--
--></pre>
</div>


<style>

  .section-title{
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    margin-bottom: 10px;
  }

	.codeMirror {
		white-space: pre-wrap;
		padding: 20px 0 0 20px;
    min-height: 31vh;
    outline: none;
	}

  .buttons-container{
    background-color: #2D2D2D;
    border-radius: 10px 10px 0 0;
    width: 36vw;
    height: 30px;
    overflow: auto;
  }

  .code-mirror {
    position: relative;
    background-color: #2D2D2D;
    border-radius: 0 0 10px 10px;
    width: 36vw;
    height: 35vh;
    margin-bottom: 20px;
    overflow: auto;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }

	#page2_desc, #page3_desc {
		display: none;
	}

	.page_selected {
		width: 33.33%;
		height: 100%;
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

  .copy-icon {
    position: absolute;
    right: 0px;
    top: 0px
  }

  .copy-icon button {
    padding: 10px;
    width: 40px;
    height: 40px;
  }

  .copy-icon img {
    filter: invert(100%) sepia(0%) saturate(1046%) hue-rotate(178deg) brightness(109%) contrast(70%);
    transition: .1s filter;
  }

  .copy-icon img:hover {
    filter: invert(91%) sepia(98%) saturate(4754%) hue-rotate(180deg) brightness(118%) contrast(100%);
  }

  .copy-icon img::after {
    content: 'blah';
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

  @media (max-width: 900px) {
    .code-mirror {
      height: 60vh;
      width: 100%;
    }

    .buttons-container{
      width: 100%;
      height: 30px;
  }
}

</style>
