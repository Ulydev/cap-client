<style global lang="postcss">
    .font-monospace, * {
		font-family: 'IBM Plex Mono', monospace;
		font-weight: 400;
	}

	.font-text {
		font-family: "Sulphur Point", sans-serif;
	}

	.bg {
		@apply bg-gradient-to-br;
		@apply from-gray-400;
		@apply to-gray-300;
	}
	.bg.dark {
		@apply bg-gradient-to-br;
		@apply from-gray-800;
		@apply to-gray-900;
	}
</style>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;600;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap" rel="stylesheet">
</svelte:head>