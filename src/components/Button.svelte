<script>

	export let inverted = false;
	export let onclick;
	export let text;
	export let isloading;

	const className = `w-full border bg-transparent px-4 py-2 rounded-sm ${inverted ? "border-white text-white placeholder-gray-200" : "border-green-400 bg-white text-green-400"} ${$$restProps.class || ""}`

</script>

<button type='submit' class={`${className} ${isloading ? 'loading' : ''}`} on:click={onclick}>{text}</button>