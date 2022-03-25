<script lang="ts">
	// export let icon;
	// export let page = '#';
	// export let tooltip;
	// import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';

	export let chart;
</script>

<div
	class="relative flex items-center justify-center 
h-12 w-12 mt-2 mb-2 mx-auto  
bg-transparent hover:bg-gray-400 dark:bg-none
hover:rounded-xl rounded-3xl
transition-all duration-300 ease-linear
cursor-pointer group"
>
	<!-- <a on:click={() => goto(page)} href="#"><img src={icon} alt={tooltip} /></a> -->
	<a href='/charts/{chart.slug}'><img src="/icon/{chart.slug}-icon.png" alt={chart.title} width="35"/></a>

	<span
		class="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md dark:bg-white dark:text-black
    text-white bg-gray-900 
    text-xs font-bold 
    transition-all duration-100 scale-0 origin-left group-hover:scale-100"
	>
		{chart.title}
	</span>
</div>
