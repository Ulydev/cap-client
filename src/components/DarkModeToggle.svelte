<script>
	import { onMount } from "svelte";
	import { darkMode } from "../stores/main"

	const toggleMode = () => {
		darkMode.update(darkMode => !darkMode)
		if ($darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
		} else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
		}
	}

	onMount(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.querySelector('html').classList.add('dark')
            darkMode.set(true)
		} else {
			document.querySelector('html').classList.remove('dark')
		}
	})
</script>

<button on:click={toggleMode}><span class="dark:hidden block">Dark theme</span><span class="dark:block hidden">Light theme</span></button>
