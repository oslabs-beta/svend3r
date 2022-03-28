<script lang="ts">
	import Divider from './SiderbarDivider.svelte';
	// import githubIcon from './githubIcon.png';
	// import barChartIcon from '/bar.svg';
	// import { goto } from '$app/navigation';
	// import logo from './svelte-logo.svg';
	import SidebarIcon from './SidebarIcon.svelte';
	import { getContext } from 'svelte';

	// export let chartList;
	const ChartList = getContext('ChartList');
</script>

<div
	class="z-50 tablet:flex fixed pt-5 top-0 left-0 h-screen w=[48px] hidden 
    bg-zinc-50 dark:bg-zinc-800 shadow-3xl z-100"
>
	<nav>
		<div
		class="relative flex items-center justify-center 
	h-12 w-12 mt-2 mb-2 mx-auto  
	bg-transparent hover:bg-gray-400 dark:bg-none
	hover:rounded-xl rounded-3xl
	transition-all duration-300 ease-linear
	cursor-pointer group" 
	>
		<!-- <a on:click={() => goto(page)} href="#"><img src={icon} alt={tooltip} /></a> -->
		<a href='/' alt='Svend3r Home'><img alt="svend3r home page" src='/icon/home-2.png' /></a>
	
		<span
			class="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md dark:bg-white dark:text-black
			text-white bg-gray-900 
			text-xs font-bold 
			transition-all duration-100 scale-0 origin-left group-hover:scale-100"
		>
		Home
		</span>
	</div>
		<div class="pt-4" />
			<Divider />
		<div class="pt-5" />
		
		{#each ChartList as chart}
			
		<SidebarIcon {chart} />
		{/each}
	</nav>
</div>
