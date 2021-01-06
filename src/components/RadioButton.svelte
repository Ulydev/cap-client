<script>
	export let group;
	export let value;
	export let label;
</script>

<style>
	input {
		display: none;
	}

	label {
		display: inline-block;
		cursor: pointer;
	}

	label span {
		position: relative;
	}

	label span:before,
	label span:after {
		content: '';
	}

	label span:before {
		border: 1px solid white;
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
		display: inline-block;
		vertical-align: top;
	}

	label span:after {
		background: white;
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		top: 0.5rem;
		left: 0.25rem;
		opacity: 0;
	}

	label input:checked+span:after {
		opacity: 1;
	}
</style>

<label class="flex flex-row items-center">
	<input type=radio bind:group={group} value={value}>
	<span class="flex flex-row items-center">{label}</span>
</label>