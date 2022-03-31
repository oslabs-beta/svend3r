<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import { getContext } from 'svelte';
	const ChartList = getContext('ChartList');
</script>

<svelte:head>
	<title>Svend3r</title>
	<html lang="en-US" />
</svelte:head>

<div id="home-page-layout" class="tablet:flex grid justify-center m-auto">
	<div id="card-container" class="w-fit tablet:w-[66vw] grid tablet:flex flex-wrap gap-x-10 tablet:justify-center h-full tablet:h-[82vh] my-8 overflow-auto mx-auto tablet:ml-4 tablet:mr-8">
		{#each ChartList as chartCard}
		<div class="mb-8 ">
			<Card chartCard={chartCard} />
		</div>
		{/each}
	</div>
	<div id="card-container" class="grid content-between w-[80vw] tablet:w-[400px] min-w-[300px] bg-code-gray my-8 mx-3 tablet:h-[82vh] overflow-auto rounded-lg shadow-3xl ">
		<section id="info-sect" class="mx-4 mt-4">
			<h1 class="text-2xl text-white87">Quickstart Guide</h1>
			<p class="text-sm text-white87 text-justify">
				<b>Svend3r</b> is an open source charting library for Svelte with easy-to-use 
				modular components. Svend3r provides beautiful visualizations that harness the power of D3 
				to bring your data to life while abstracting away its imperative-style code. With Svend3r, you can easily 
				adjust the charts to look exactly the way you want while taking 
				advantage of Svelte's optimized DOM interaction.
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
				When we say Svend3r is "plug and play," we mean it!
				<li>Navigate to a chart page</li>
				<li>Review the data schema to ensure conformity of your data set</li>
				<li>Update the adjustable properties to suit your style</li>
				<li>
					Create a new svelte component file (and js data file) in your project directory
				</li>
				<li>Paste code from the Code tab directly into your svelte file</li>
				<li>Update the data import to match your data file location (or pass it down as a prop)</li>
			</p>
		</section>
		<section id="info-sect" class="mx-4 my-4">
			<h1 class="text-2xl text-white87">Want to Contribute?</h1>
			<p class="text-sm text-white87 ">
				Want to be a open source contributor? Have a Svelte component chart you'd 
				like to share with the Svelte community, or recommended improvements? 
				Submit a pull request to the <code class="text-white87 bg-white12">contributor</code> branch 
				on <a href="https://github.com/oslabs-beta/svend3r">GitHub</a>.
			</p>
		</section>
	</div>
</div>

<style>
	#card-container::-webkit-scrollbar {
		display: none;
	}

	a {
        text-decoration: underline;
    }

	li {
		text-indent: -20px; /* key property */
		margin-left: 20px; /* key property */
	}
</style>