<script lang="ts">
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	export let dark = 'dark';
	import GettingStarted from '$lib/gettingStarted/GettingStarted.svelte';
</script>

<div class:dark>
	<Sidebar />
	<div class="grid grid-cols-12">
		<div class="col-start-2 col-span-10">
			<Header bind:dark />
			<slot />
		</div>
	</div>
</div>
