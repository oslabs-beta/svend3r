<!-- <script context="module" lang="ts">
	export const prerender = true;
</script> -->
<script lang="ts">
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';
	import ChartsDisplay from '$lib/chartsDisplay/ChartsDisplay.svelte';
	import githubIcon from '../lib/sidebar/githubIcon.png';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="grid grid-rows-3 text-white">
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[githubIcon, githubIcon, githubIcon, githubIcon]}
			pages={[]}
		/>
	</div>
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[githubIcon, githubIcon, githubIcon, githubIcon]}
		/>
	</div>
	<div>
		<ChartsDisplay
			title="Distribution"
			chartIcons={[githubIcon, githubIcon, githubIcon, githubIcon]}
		/>
	</div>
</div>
