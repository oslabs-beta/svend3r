
	
	export let title;
	export let chartIcons;
	console.log('icons', chartIcons)
</script>

<div class="text-white text-lg h-10">{title}</div>
<div class="grid grid-cols-4 gap-4">
	<!-- <Icon name='bar' /> -->
	{#each chartIcons as chartIcon}
	<img class="w-50 h-44" src='/images/{chartIcon}.png' alt="" />
		<!-- <Icon name={chartIcon} /> -->
	{/each}
</div>
