<script lang="ts">
	import SidebarIcon from './SidebarIcon.svelte';
	import Divider from './Divider.svelte';
	import githubIcon from './githubIcon.png';
	import barChartIcon from './barChartIcon.png';
	import { goto } from '$app/navigation';

	import logo from './svelte-logo.svg';
</script>

<div
	class="z-50 fixed pt-5 top-0 left-0 h-screen w-1/32  flex flex-col
    bg-zinc-50 dark:bg-zinc-800 shadow-lg z-100"
>
	<SidebarIcon icon={githubIcon} tooltip="Github" />
	<div class="pt-5" />
	<Divider />
	<div class="pt-5" />
	<SidebarIcon icon={githubIcon} tooltip="Column Chart" page="/columnChart" />
	<SidebarIcon icon={githubIcon} tooltip="Github" />
	<SidebarIcon icon={githubIcon} tooltip="Github" />
	<SidebarIcon icon={githubIcon} tooltip="Github" />
	<SidebarIcon icon={githubIcon} tooltip="Github" />
	<SidebarIcon icon={githubIcon} tooltip="Github" />
</div>
