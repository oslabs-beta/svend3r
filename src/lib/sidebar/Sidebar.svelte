<script lang="ts">
	// import Divider from './Divider.svelte';
	// import githubIcon from './githubIcon.png';
	// import barChartIcon from '/bar.svg';
	// import { goto } from '$app/navigation';
	// import logo from './svelte-logo.svg';
	import SidebarIcon from './SidebarIcon.svelte';

	export let chartList;
</script>

<div
	class="z-50 fixed pt-5 top-0 left-0 h-screen w-1/32  flex flex-col
    bg-zinc-50 dark:bg-zinc-800 shadow-lg z-100"
>
	<nav>
		<!-- <SidebarIcon icon={githubIcon} tooltip="Github" page='#' />
		<div class="pt-5" />
			<Divider />
		<div class="pt-5" /> -->
		
		{#each chartList as chart}
			
		<SidebarIcon {chart} />
		{/each}
	</nav>
</div>
