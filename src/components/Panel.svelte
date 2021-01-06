<script>
	export let title = undefined;
	export let loading = false;
	export let showToggler = false;

	let collapsed = false;	
	function toggle() {
		collapsed = !collapsed;
	}

</script>

<div class={`${loading ? 'panel loading' : 'panel'} ${$$restProps.class || ""}`} style={$$restProps.style || ""}>
	{#if title}
	<div class='text-sm'>
		<span>{title}</span>
		{#if showToggler}<a on:click={toggle}>{#if collapsed}+{:else}—{/if}</a>{/if}
	</div>
	{/if}

	{#if !collapsed}
	<div class='body'>
		<slot></slot>
	</div>
	{/if}
</div>