<style global lang="postcss">
    @font-face {
        font-family: 'Euclid Circular A';
        src: url("/assets/fonts/EuclidCircularA/EuclidCircularA-Light.ttf") format("truetype");
        font-weight: 200;
    }
    @font-face {
        font-family: 'Euclid Circular A';
        src: url("/assets/fonts/EuclidCircularA/EuclidCircularA-Regular.ttf") format("truetype");
        font-weight: 400;
    }
    @font-face {
        font-family: 'Euclid Circular A';
        src: url("/assets/fonts/EuclidCircularA/EuclidCircularA-Bold.ttf") format("truetype");
        font-weight: 700;
    }
    @font-face {
        font-family: 'Euclid Circular A';
        src: url("/assets/fonts/EuclidCircularA/EuclidCircularA-SemiBold.ttf") format("truetype");
        font-weight: 600;
    }
    @font-face {
        font-family: 'Euclid Circular A';
        src: url("/assets/fonts/EuclidCircularA/EuclidCircularA-Italic.ttf") format("truetype");
        font-style: italic;
    }

    .pro-mode * {
        font-family: "Euclid Circular A", -apple-system, 'Helvetica Neue', sans-serif;
    }
    .pro-mode.bg {
		@apply bg-green-50; 
	}
	.dark .pro-mode.bg {
		@apply bg-gray-800;
	}
</style>