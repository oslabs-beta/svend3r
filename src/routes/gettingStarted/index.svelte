<script context="module">
	export const prerender = true;
    
</script>

<div class="getting_started">
	<h1 class="team_title">How to Get Started Using Svend3r</h1>
    <div class="guide-sections">
        <section class="section-odd" id="first">
            <article>
                <h2>Pick a chart that suits your dataset.</h2>
                <br>
                <p>Svend3r offers Svelte developers a variety of charts to choose from because the 
                    best chart for your project depends on your data. Is it numeric or categorical? 
                    How many variables are you comparing? What do you want to highlight? Visit 
                    <a href="https://www.data-to-viz.com/"><b>Data to Viz</b></a> for suggestions to help 
                    determine the best format for your project and test a few charts out!
                </p>
            </article>
            <img alt="svend3r charts list example" src="/getStarted/chart_list.png" class="demopngLG"/>
        </section>
        <section class="section-even" id="second">
            <img alt="svend3r charts example" src="/getStarted/chart_example.png" class="demopngLG"/>
            <article>
                <h2>Pick a chart. Interact with it.</h2>
                <br>
                <p>Svend3r charts incorporate interactive features such as tooltips, sorts, filters, and elegant transitions.
                    Our charts (and site) are all optimized for accessibility, performance, and convenience.
                </p>
            </article>
        </section>
        <section class="section-odd" id="third">
            <article>
                <h2>Adjustable variables, at your fingertips.</h2>
                <br>
                <p>No need to go back and forth between your code editor and browser, reloading to see how every every 
                    modification affects the final product. With Svend3r's built-in sliders, toggles, and input fields, building the perfect 
                    chart has never been easier. Adjust a property and watch the chart and code editor update in real time.
                </p>
            </article>
            <img alt="svend3r properties example" src="/getStarted/chart_properties.png" class="demopngLG"/>
        </section>
        <section class="section-even" id="forth">
                <img alt="svend3r code example" src="/getStarted/chart_code.png" class="demopngMD"/>
            <article>
                <h2>View. Adjust. Copy. Paste.</h2>
                <br>
                <p>Once you're done adjusting properties, just copy the code from the Code tab (with your updated variables already included!)
                    and paste it into your Svelte component file. Then import your data or pass it down as a prop, following the schema in the 
                    Data Schema tab.
                </p>
            </article>
        </section>
        <section class="section-odd" id="fifth">
            <article>
                <h2>Enjoy beautiful data visualizations with Svend3r.</h2>
                <br>
                <p>Give it a try and see how easy it is! Make a component.svelte and 
                    data.js file on the <a href="https://svelte.dev/repl/hello-world?version=3"><b>Svelte REPL</b></a>.  Copy, paste, and enjoy.
                </p>
            </article>
            <img alt="svend3r REPL example" src="/getStarted/chart_REPL.png" class="demopngLG"/>
        </section>
        <h3 class="team_title">If you like Svend3r, give us a Star on <a href="https://github.com/oslabs-beta/svend3r"><b>Github</b></a></h3>
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

    .guide-sections{
        width: fit-content;
        height: 76vh;
    }

    .getting_started{
        overflow: auto;
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
       height: 80%;
       margin: auto 30px auto 30px;
   }

   .demopngMD{
        height: 60%;
       margin: auto 10px auto 30px;
   }

   .getting_started::-webkit-scrollbar {
		display: none;
	}

    @media (max-width: 1100px) {

        .getting_started h1{
            font-size: 2em;
        }

        .guide-sections{
            height: 100vh;
            width: fit-content;
        }
        article{
            width: 100%;
        }
        .section-odd{
            display: grid;
            grid-template-columns: 100%;
            height: fit-content;
            padding: 30px 0;
        }

        .section-even{
            display: grid;
            grid-template-columns: 100%;
            height: fit-content;
            padding: 30px 0;
        }
        .demopngLG{
            height: auto;
            width: 90%;
            margin: auto;
        }

        .demopngMD{
            height: auto;
            width: 90%;
            margin: auto;
        }

        img{
            border-radius: 10px;
            box-shadow: rgba(255, 62, 0, 0.4) 5px 5px, rgba(255, 62, 0, 0.3) 10px 10px, rgba(255, 62, 0, 0.2) 15px 15px, rgba(255, 62, 0, 0.1) 20px 20px, rgba(255, 62, 0, 0.05) 25px 25px;
        }
	}
</style>