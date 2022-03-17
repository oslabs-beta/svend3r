<script lang="ts">
	export let dark;
	import { goto } from '$app/navigation';
</script>

<ul class="top-0 relative w-full h-28 z-10">
	<img src="/logo.png">
	<div class=" text-md text-gray-400">Svelte x D3 "plug and play" charting library</div>
	<li class="z-0 absolute top-0 right-0 pt-5">
		<a on:click={() => goto('/')} class="text-gray-400 hover:text-gray-100 pr-5" href="#">Home</a>
		<a
			on:click={() => goto('/gettingStarted')}
			class="text-gray-400 hover:text-gray-100 pr-5"
			href="#">Getting Started</a
		>
		<a
			on:click={() => goto('/contributers')}
			class="text-gray-400 hover:text-gray-100 pr-5"
			href="#">Contributers</a
		>
		<a
			class="text-gray-400 hover:text-gray-100 pr-5"
			href="/"
			on:click|preventDefault={() => {
				dark = !dark;
			}}>{dark ? 'Light Mode' : 'Dark Mode'}</a
		>
	</li>
	<hr
		class="mt-5 bg-gray-200 dark:bg-gray-200 
	border border-gray-200 dark:border-gray-200 rounded-full
	 w-full"
	/>
</ul>
