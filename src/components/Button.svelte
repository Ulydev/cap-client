<script>

	export let inverted = false;
	export let onclick;
	export let text;
	export let isloading;

	const className = `w-full border bg-transparent px-4 py-2 rounded-sm ${inverted ? "border-white text-white placeholder-gray-200" : "border-primary-400 bg-gradient-to-br from-primary-200 to-primary-400 text-white hover:opacity-75 transition duration-300"} ${$$restProps.class || ""}`

</script>

<button type='submit' class={`${className} ${isloading ? 'loading' : ''}`} on:click={onclick}>{text}</button>