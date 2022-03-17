<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';
	import ChartsDisplay from '$lib/chartsDisplay/ChartsDisplay.svelte';
	import Icon from '$lib/components/Icon.svelte';
import ColumnChart from './columnChart.svelte';
	// import Github from '/images/github-dark.png';
	
	// const github = 'images/github-dark.png';
	// const barIcon = '/icons/bar.svg';
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
<div class="grid grid-rows-3 text-white">
	<!-- <img src="/bar.svg" alt="site logo"> -->
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={['github', 'github', 'github', 'github']}
			pages={[]}
		/>
	</div>
	<!-- <div>
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
	</div> -->
</div>
