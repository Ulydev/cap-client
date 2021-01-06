<script>
	import Home from './Home.svelte';
</script>

<style global lang="postcss">

	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
	@tailwind base;
	@tailwind components;
	/* purgecss end ignore */
  
	@tailwind utilities;

	* {
		font-family: 'IBM Plex Mono', monospace;
		font-weight: 400;
	}

	.bg {
		@apply bg-green-50; 
	}
	.bg.dark {
		@apply bg-gray-700;
	}
  
</style>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
	<Home />
</main>