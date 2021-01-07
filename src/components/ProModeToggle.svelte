<script>
	import { onMount } from "svelte";
	import { proMode } from "../stores/main"

	const toggleMode = () => {
		proMode.update(proMode => !proMode)
		if ($proMode) {
            localStorage.setItem("mode", "pro")
		} else {
            localStorage.setItem("mode", "basic")
		}
	}

	onMount(() => {
		if (localStorage.mode === 'pro') {
            proMode.set(true)
		}
	})
</script>

<button on:click={toggleMode}><span class="">{ $proMode ? "Basic Mode" : "Pro Mode" }</span></button>
