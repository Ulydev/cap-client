<script>

	export let _type = 'number';
	export let inverted = false;
	export let value;
	export let placeholder;
	export let disabled = false;
	export let element;
	export let uppercase = false;

	const className = `placeholder-gray-700 text-gray-900 dark:placeholder-gray-300 dark:text-white w-full bg-white bg-opacity-75 dark:bg-black dark:bg-opacity-25 shadow-inner px-4 py-2 rounded-sm ${inverted ? "border-white text-white placeholder-gray-200" : ""} ${$$restProps.class || ""}`

</script>

<style>
	input.input-uppercase {
		text-transform: uppercase;
	}
	::-webkit-input-placeholder {
	    text-transform: none;
	}
	:-moz-placeholder { 
	    text-transform: none;
	}
	::-moz-placeholder { 
	    text-transform: none;
	}
	:-ms-input-placeholder { 
	    text-transform: none;
	}
	::placeholder {
	    text-transform: none;
	}
</style>

{#if _type == 'number'}
	<input
		bind:this={element}
		type='text'
		inputmode='numeric'
		pattern='\d+(?:\.\d*)?'
		{disabled}
		required
		placeholder={placeholder || ''}
		bind:value={value}
		class={className}
	>
{:else}
	<input
		bind:this={element}
		type='text'
		{disabled}
		required
		placeholder={placeholder || ''}
		bind:value={value}
		class={`${className} ${uppercase ? "input-uppercase" : ""}`}
	>
{/if}