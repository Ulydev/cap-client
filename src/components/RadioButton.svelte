<script>
	export let group;
	export let value;
	export let label;
</script>

<style lang="postcss">
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

	label input:checked+span:before {
		@apply border-b-2;
		@apply border-primary-100;
		@apply bottom-0;
		@apply left-0;
		@apply w-full;
		@apply absolute;
	}

	label input:not(:checked)+span {
		@apply opacity-75;
	}

	label input:checked+span {
		@apply dark:bg-gray-900;
		@apply bg-gray-300;
	}

	label input:checked+span:after {
		opacity: 1;
	}
</style>

<label class="flex-1 flex flex-col items-center justify-center hover:opacity-75 transition duration-300">
	<input type=radio bind:group={group} value={value}>
	<span class="relative flex flex-col items-center pb-2 pt-1 rounded-sm">{label}</span>
</label>