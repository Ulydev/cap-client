<script>

	// Center top toast
	import { toastMessage, toastType, closeToast } from '../stores/toasts.js'

	const className = "p-4 fixed top-0 w-full max-w-2xl left-0 right-0 mx-auto mt-8 z-50 flex flex-row space-x-4"

</script>

<style global lang="postcss">
	.toast.error {
		background-color: #f9edbe;
		border-top: 1px solid #f0c36d;
		color: #3b382d;
	}
	.toast.success {
		background-color: #DAF9D4;
		border-top: 1px solid #88DA81;
		color: #2A5D1A;
	}
	.message {
		flex: 1;
		max-width: 90%;
		word-break: break-all;
	}
	.close {
		cursor: pointer;
		text-decoration: underline
	}
	
</style>

{#if $toastMessage}
<div class={'toast ' + $toastType + ' ' + className}>
	<span class='message'>{$toastMessage}</span>
	<span class='close' on:click={closeToast}>close</span>
</div>
{/if}