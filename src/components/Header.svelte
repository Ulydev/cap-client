<script>
	import Wallet from './Wallet.svelte'

	import { chainId } from '../stores/main'
	import { getChainLabel } from '../lib/utils';
</script>

<header class="flex flex-row items-center justify-between mx-auto max-w-3xl w-full my-8 text-xs px-4">
	<div class="flex flex-row items-center space-x-2">
		<img alt='Cap Logo' src='/assets/logo-pure.svg' class="w-12" />
		<span class="font-bold dark:text-white">CAP</span>
	</div>
	<div class="flex flex-row items-center space-x-2 dark:text-gray-400">
		<Wallet/>
		<span class="px-2 py-1 bg-green-400 text-white rounded-sm dark:bg-gray-800">{ getChainLabel($chainId) }</span>
	</div>
</header>
