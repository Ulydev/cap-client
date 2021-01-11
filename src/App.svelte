<script>
	import Tailwind from './components/Tailwind.svelte';
	import { proMode } from "./stores/main"

	import Home from './Home.svelte';
	import Styles from './components/Styles.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main class={`bg ${$proMode ? "pro-mode" : "basic-mode"}`}>
	<Tailwind />
	<Styles />
	<Home />
</main>