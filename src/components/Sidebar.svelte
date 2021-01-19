<script>
	import Wallet from './Wallet.svelte'

	import { chainId } from '../stores/main'
	import { getChainLabel } from '../lib/utils';
</script>

<div class="w-32 py-4 px-4 bg-primary-400 bg-opacity-10">
	<header class="flex flex-row items-center justify-between mx-auto max-w-3xl w-full text-xs">
		<div class="flex flex-row items-center space-x-2">
			<img alt='Cap Logo' src='/assets/logo-pure.svg' class="w-12" />
			<span class="text-3xl font-bold font-text text-white text-gradient bg-gradient-to-br to-primary-400 from-primary-100">Cap</span>
		</div>
		<div class="flex flex-row items-center space-x-2 dark:text-gray-400">
			<Wallet/>
			<span class="px-2 py-1 bg-green-400 text-white rounded-sm dark:bg-gray-800">{ getChainLabel($chainId) }</span>
		</div>
	</header>
</div>
