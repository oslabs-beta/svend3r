<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';
	import ChartsDisplay from '$lib/chartsDisplay/ChartsDisplay.svelte';
	// import barIcon from '/bar.svg';
	
	const barIcon = '/bar.svg';
</script>

<svelte:head>
	<title>Svend3r</title>
	<html lang="en-US" />
</svelte:head>

<!-- <img src='/bar.svg'  width='100px'> -->
<div class="grid grid-rows-3 text-white">
	<!-- <img src="/bar.svg" alt="site logo"> -->
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[barIcon, barIcon, barIcon, barIcon]}
			pages={[]}
		/>
	</div>
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[barIcon, barIcon, barIcon, barIcon]}
		/>
	</div>
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[barIcon, barIcon, barIcon, barIcon]}
		/>
	</div>
</div>
