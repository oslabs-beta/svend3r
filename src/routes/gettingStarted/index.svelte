<script context="module">
	export const prerender = true;
    
</script>

<div class="getting_started">
	<h1 class="team_title">How To Get Started Using Svend3r</h1>
    <div class="guide-sections">
        <section class="section-odd" id="first">
            <article>
                <h2>Pick a chart that suits your dataset.</h2>
                <br>
                <p>Svend3r provide Svelte developers a large selection of charts to choose from, but the 
                    best chart for your project depends on your dataset.  Is your data one numeric variable? 
                    two? three? maybe even several variables.  Visit this well defined data visualization tree
                    at <a href="https://www.data-to-viz.com/"><b>Data to Vis</b></a> to determine the best data visualization
                     graphic for your project or test them all out and adjust your data to suit.
                </p>
            </article>
            <img src="/getStarted/chart_list.png" class="demopngLG"/>
        </section>
        <section class="section-even" id="second">
            <img src="/getStarted/chart_example.png" class="demopngLG"/>
            <article>
                <h2>Picked out a chart.  Play and interactive with it.</h2>
                <br>
                <p>Svend3r charts incorporate interactive features such as tooltips, sorts, filters, and elegant transitions to name a few features.
                    Our charts (and site) are all optimized for accessibility and performance.
                </p>
            </article>
        </section>
        <section class="section-odd" id="third">
            <article>
                <h2>Every adjustable variable at your fingertips.</h2>
                <br>
                <p>Take your time back.  No longer are the days of wasting hours updating, saving, and reloading to determine each variables impact 
                    on the overall graphic composition.  With Svend3r's built in sliders, toggles, input fields, etc - finding the perfect 
                     styling has never been easier.  Adjust a property and watch the chart AND the code editor update immediately reflecting your changes.
                </p>
            </article>
            <img src="/getStarted/chart_properties.png" class="demopngLG"/>
        </section>
        <section class="section-even" id="forth">
            <img src="/getStarted/chart_code.png" class="demopngSM"/>
            <img src="/getStarted/chart_data.png" class="demopngSM"/>
            <img src="/getStarted/chart_schema.png" class="demopngSM"/>
            <article>
                <h2>View. Adjust. Copy. Paste.</h2>
                <br>
                <p>Once you are done viewing and adjusting the properties to your desired style.  
                    Just copy the code from the code editor code tab (with your updates variables already included!)
                    and paste the entire code into an empty component.Svelte file. Do the same for the code editor 
                    data tab and paste into a data.js file or load your own data following the schema defined in the 
                    code editor schema tab.  Ensure the component file is property importing the data.js file.
                </p>
            </article>
        </section>
        <section class="section-odd" id="fifth">
            <article>
                <h2>Enjoy beautiful data visualization with Svend3r.</h2>
                <br>
                <p>Give it a try and see how easy it really is.  Make a component.svelte and 
                    data.js file on <a href="https://svelte.dev/repl/hello-world?version=3"><b>Svelte REPL</b></a>.  Copy, paste, and enjoy.
                </p>
            </article>
            <img src="/getStarted/chart_REPL.png" class="demopngLG"/>
        </section>
        <h3 class="team_title">If you like Svend3r give us a Star on <a href="https://github.com/oslabs-beta/svend3r"><b>Github</b></a></h3>
    </div>
</div>

<style>
    a{
        text-decoration: underline;
    }

    img{
        border-radius: 10px;
        box-shadow: rgba(255, 62, 0, 0.4) 5px 5px, rgba(255, 62, 0, 0.3) 10px 10px, rgba(255, 62, 0, 0.2) 15px 15px, rgba(255, 62, 0, 0.1) 20px 20px, rgba(255, 62, 0, 0.05) 25px 25px;
    }

    .getting_started{
        overflow: auto;
    }

    .guide-sections{
        width: fit-content;
        height: 76vh;
    }

    .getting_started h1{
        justify-content: center;
        text-align: center;
        padding-top: 2vh;
        padding-bottom: 3vh;
        color: rgba(255, 255, 255, 0.87);
        font-size: 3em;
        font-weight: bold;
        height: fit-content;
    }

    .getting_started h2{
        color: rgba(255, 255, 255, 0.87);
        font-size: 1.5em;
        font-weight: bold;
        text-shadow: 0px 3px 0px #b2a98f,
                    0px 2px 10px rgba(0,0,0,0.15),
                    0px 7px 2px rgba(0,0,0,0.1),
                    0px 12px 30px rgba(0,0,0,0.1);
    }

    .getting_started h3{
        justify-content: center;
        text-align: center;
        padding-top: 2vh;
        padding-bottom: 3vh;
        color: rgba(255, 255, 255, 0.87);
        font-size: 1em;
        font-weight: bold;
        height: fit-content;
    }

   .section-odd{
       width: 100%;
       display: flex;
       justify-content: space-evenly;
       text-align: center;
       align-items: center;
       height: 500px;
       background-color: #FF7550;
   }

   .section-even{
       width: 100%;
       display: flex;
       justify-content: space-evenly;
       text-align: center;
       align-items: center;
       height: 500px;
       background-color: #FFC9BD;
   }

   article{
       width: 40%;
       padding: 5%;
   }
   .demopngLG{
       height: 90%;
       margin: auto 30px auto 30px;
   }

   .demopngSM{
       width: 20%;
       margin: auto 10px auto 30px;
   }

   .getting_started::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 1420px) {

	}
</style>