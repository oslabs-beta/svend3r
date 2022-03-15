<script>
	import {scaleBand, scaleLinear} from 'd3-scale';
	import {csvParse} from 'd3';
	import * as cloud from 'd3-cloud'
	import { fly} from 'svelte/transition';
	let years = [], selectedYear = 2020, textFile = "", nameData = [], letters = [], letterNames = {}, letterCounts = [];
	for(let y = 1880; y<=2020; y++){
		years.push(y);
	}
	const cat10colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];
	let yScale, xScale, totalBabies;
	let width = 0; // will be updated based on window.innerWidth
	

	const showBars = (textFile)=> {
		letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		letterNames = {"other": []};
		letterCounts = [];
		letters.forEach((letter)=>{
			letterNames[letter] = [];
			letterCounts.push({"letter": letter, "count": 0, "words": []})
		})
		nameData = csvParse("word,gender,count\n" + textFile).map(d => ({
			text: d.word,
			size: +d.count
			})).sort((a,b) => a.size > b.size ? 1 : 0)
		nameData.forEach((d)=>{
			const letter = d.text.slice(0,1);
			letterNames[letter].push(d);
			letterCounts.find(d => d.letter === letter).count += d.size;
		}) 
		letterCounts.sort((a,b)=> b.count - a.count)
		totalBabies = letterCounts.reduce((a, b) => a + b.count, 0);
		const smallCounts = {letter: "other", count: 0, otherLetters: "", words: []}
		for(let i = 25; i>=0; i--){
			if(letterCounts[i].count < 0.015*totalBabies){
				smallCounts.otherLetters += `${letterCounts[i].letter},`;
				smallCounts.count += letterCounts[i].count;
				letterNames["other"] = letterNames["other"].concat(letterNames[letterCounts[i].letter])
				letterCounts.splice(i,1)
			}
		}
		letterCounts.sort((a,b)=>  b.count - a.count)
		letterCounts.push(smallCounts);
		
		yScale = scaleBand()
		.domain(letterCounts.map(d => d.letter))
		.range([0, 2000])
		.paddingInner(0.1)
		.paddingOuter(0.1);
		xScale = scaleLinear([0,letterCounts[0].count],[0,1000 - 150]);			
		for(let i=0; i<letterCounts.length; i++){
			const d = letterCounts[i];
			const words = [...letterNames[d.letter]].filter(e=>e.size>99);
			const layout = cloud()
				.size([xScale(d.count) + 10, yScale.bandwidth()])
				.words(words)
				.text(d => d.text)
				.font("Nunito")
				.padding(1)
				.rotate(0)
				.fontSize(d => 3 + 0.25*Math.sqrt(d.size))  
							
				setTimeout(()=>{
				layout.on("end", (words)=>{
					letterCounts.find(e => e.letter === d.letter).words = words;				
					letterCounts = letterCounts; // re-assignment reminds Svelte to update DOM
					console.log('letterCounts')
					console.log(letterCounts)
				})
				layout.start();
				
			},1000*i + 500)
		}
	}

</script>

<svelte:head>
	<title>Baby Names Word Cloud Bar Chart</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
  	<link href="https://fonts.googleapis.com/css2?family=Asap+Condensed:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<svelte:window bind:innerWidth={width}/> 

<section>
	<h1>Baby Names Word Cloud Bar Chart</h1>
	<label for="year">
		Select a year: 
		<select id="year" selected="2020" bind:value={selectedYear}
			on:change="{
				async () => {
					letterCounts = [];
					let response = await fetch(`names data/yob${selectedYear}.txt`);
					let newFile = await response.text();
					showBars(newFile);
				}
			}">
			{#each years.reverse() as year}
				<option>{year}</option>
			{/each}
		</select>
	</label>
	
	<svg id="chartSVG" viewBox="0,0,1000,2000">
    	<image width="1000px" height="2000px" style="opacity:0.2;" href="/babies-pixabay.png">
    	</image>	
		{#if letterCounts.length > 0} 
			{#each letterCounts as d, i}
				<rect x = 0 y = {yScale(d.letter)} width = {xScale(d.count)}  height = {yScale.bandwidth()}
					in:fly="{{ x: -1000, duration: 1000, delay: 1000*i}}"></rect>
				<text class="bar-label" x = {xScale(d.count) + 15} y = {yScale(d.letter) + yScale.bandwidth()/2}
				in:fly="{{ x: -1000, duration: 1000, delay: 1000 * i }}">
					{d.letter}: ({Math.round(d.count / totalBabies * 100)}%)
				</text>	
				<g width = {xScale(d.count)} height = {yScale.bandwidth()} 
					style="transform: translate({xScale(d.count)/2}px,{yScale(d.letter) + yScale.bandwidth()/2}px); text-anchor: middle">
					{#if d.words.length > 0}
						{#each d.words as word}
						<text x={word.x} y={word.y} style="transform: translate({word.x}, {word.y});
								font-size: {word.size}px;
								fill: {cat10colors[Math.floor(Math.random()*10)]}">
							{word.text}
						</text> 
						{/each}  
					{/if}
				</g>
			{/each}
		{/if}
  </svg>
		
</section>

<style>
	section{
        font-family: Nunito, sans-serif; 
	}
	select, label{
		font-size: 1.2em;
	}
	#chartSVG{
		max-width: 100%; 
		margin-top: 1em;
        border: 1px solid black; 
        background: radial-gradient(ellipse at bottom right, rgba(137,207,240,1) 20%, rgba(244,194,194,1) 70%);
	}
	#chartSVG rect{
		stroke: black;
		fill: white;
		stroke-width: 2;
	}
	.bar-label{
		font-size:28px; 
		fill: rgba(0, 0, 0, 0.8); 
		alignment-baseline: middle;
	}
</style>