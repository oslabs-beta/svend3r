<script lang="ts">
	export let dark;
	import { goto } from '$app/navigation';

	//fetch github stars
	const fetchStars = (async () => {
		const response = await fetch('https://api.github.com/repositories/465431355')
    return await response.json()
	})()

</script>

<ul class="top-0 relative w-full h-28 z-10">
	<a href="/" alt="Svend3r Home"><img alt="svend3 chart library" src="/images/logo-beta.png" /></a>
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
			href="#">Contributors</a
		>
		<a
			class="text-gray-400 hover:text-gray-100 pr-5"
			href="/"
			on:click|preventDefault={() => {
				dark = !dark;
			}}>{dark ? 'Light Mode' : 'Dark Mode'}</a
		>
		<div id="widget" class="widget">
			<a 
				id="star-button" 
				class="bg-white flex"
				href="https://github.com/oslabs-beta/svend3r" 
				target="_blank">
					<svg
						viewBox="0 0 16 16"
						width="14"
						height="14"
						class="octicon octicon-star"
						aria-hidden="true"
					>
						<path
						fill-rule="evenodd"
						d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
						>
					</svg>
				<span>Star</span>
			</a>
			<a
				id="star-count"
				class="bg-white"
				href="https://github.com/oslabs-beta/svend3r/stargazers"
				target="_blank"
			>
				{#await fetchStars}
					loading
				{:then data}
					{data.stargazers_count}
				{:catch error}	
					error
				{/await}
			</a>
		</div>
	</li>
	<hr
		class="mt-5 bg-gray-200 dark:bg-gray-200 
	border border-gray-200 dark:border-gray-200 rounded-full
	 w-full"
	/>
</ul>
