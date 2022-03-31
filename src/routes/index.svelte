<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import { getContext } from 'svelte';
	const ChartList = getContext('ChartList');
	console.log('chartList', ChartList);
</script>

<svelte:head>
	<title>Svend3r</title>
	<html lang="en-US" />
</svelte:head>

<!-- <Github /> -->
<!-- <Icon name='bar' size={80} /> -->
<!-- <img src='/icons/bar.svg'  width='100px'> -->
<!-- <img src='/images/github-dark.png' alt='github'> -->
<!-- <img src={github} alt='github'> -->
<!-- <img src='$img/github-dark.png' alt='github'> -->
<div id="home-page-layout" class="tablet:flex grid justify-center m-auto">
	<div id="card-container" class="w-fit tablet:w-[66vw] grid tablet:flex flex-wrap gap-x-10 tablet:justify-center h-full tablet:h-[82vh] my-8 overflow-auto mx-auto tablet:ml-4 tablet:mr-8">
		<!-- <img src="/bar.svg" alt="site logo"> -->
		{#each ChartList as chartCard}
		<div class="mb-8 ">
			<Card chartCard={chartCard} />
		</div>
		{/each}
	</div>
	<div id="card-container" class="grid content-between w-[80vw] tablet:w-[400px] min-w-[300px] bg-code-gray my-8 mx-3 tablet:h-[82vh] overflow-auto rounded-lg shadow-3xl ">
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-2xl text-white87">How to get Started</h1>
			<p class="text-sm text-white87 text-justify">
				<b>Svend3r (or svend3r.js)</b> is your go-to Open Source Svelte data visuaization charting library with easy
				to use pre-built modular components. Svend3r components provides beautiful graphics from the
				D3 powerhouse, but without the imperative style code. Instead Svend3r provide your project with
				clean, easily adjustable, and declarative code complimented with D3 methods to help bring your
				data to life.
				<br>
				<br>
				New to Svelte and D3? If you use npm,
				<br>
				<code class="text-white87 bg-white12">npm install svelte</code> and
				<code class="text-white87 bg-white12">npm install d3</code>.
			</p>

		</section>
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-2xl text-white87">Exporting a Chart Component</h1>
			<p class="text-sm text-white87 text-justify whitespace-pre-line">
				When we say Svend3r is 'plug and play' we truly mean it.
				<li>Navigate to any desired chart page</li>
				<li>Review the data schema to ensure conformity to your data set</li>
				<li>Update the adjustable properties to your desired taste (or do that later)</li>
				<li>
					Create a new svelte file and js file for your component and data respectively in your project directory
				</li>
				<li>Paste in code from the Code tab into your newly created svelte component file</li>
				<li>Paste in code from the Data tab into your newly created js file</li>
				<li>Validate or update import statement in the component file to the data file location</li>
			</p>
		</section>
		<section id="info-sect" class="mx-4 my-4">
			<h1 class="text-2xl text-white87">Want to Contribute?</h1>
			<p class="text-sm text-white87 ">
				Want to be a open source contributor? Have a Svelte component chart you would 
				like to share with the Svelte community? or recommended improvements? 
				Create and submit a pull request to the <code class="text-white87 bg-white12">playground branch</code> 
				on the Svend3r github repository. 
			</p>
		</section>
	</div>
</div>

<style>
	#card-container::-webkit-scrollbar {
		display: none;
	}

	li {
		text-indent: -20px; /* key property */
		margin-left: 20px; /* key property */
	}
</style>
