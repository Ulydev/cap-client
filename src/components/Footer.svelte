<script>
	import DarkModeToggle from "./DarkModeToggle.svelte";
</script>

<footer class="flex flex-col items-center space-y-2 max-w-3xl mx-auto text-center mt-8 pb-8 text-xs text-gray-800 dark:text-gray-400">
	<span>
		Cap • <a href='https://t.me/capfin' class=" hover:text-primary-400 dark:hover:text-primary-200">Telegram</a> • <a href='https://cap.eth.link' class="hover:text-primary-400 dark:hover:text-primary-200">Alt UI</a>
	</span>
	<DarkModeToggle />
	<div class="flex flex-col space-y-2 pt-8">
		<span class="font-bold">volunteer contributors:</span>
		<div class="flex flex-col">
			<a href="https://uly.dev" target="_blank" class="font-bold hover:text-primary-400 dark:hover:text-primary-200">ulydev</a>
			0xffd91D21aada737a54902E5C09f4af5A8E52252D
		</div>
		<div class="flex flex-col">
			<a href="" target="_blank" class="text-green-400 font-bold">Wirriams</a>
			0xAD0f6C97B5D49D17258736DebCdD9A98Ef54AD33
		</div>
	</div>
</footer>
