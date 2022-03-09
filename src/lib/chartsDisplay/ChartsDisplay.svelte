<script>
	export let title;
	export let chartIcons;
</script>

<div class="text-white text-lg h-10">{title}</div>
<div class="grid grid-cols-4 gap-4">
	{#each chartIcons as chartIcon}
		<img class="w-50 h-44" src={chartIcon} alt="" />
	{/each}
</div>
