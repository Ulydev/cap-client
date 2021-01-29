<script>
	import Wallet from './Wallet.svelte'

	import { chainId } from '../stores/main'
	import { getChainLabel } from '../lib/utils';
</script>

<header class="flex flex-row items-center justify-between mx-auto max-w-3xl w-full text-xs px-8">
	<div class="relative flex flex-row items-center justify-center w-16 h-16 bg-black bg-opacity-50 dark:bg-opacity-25">
		<img alt='Cap Logo' src='/assets/logo-pure.svg' class="w-10" />
		<div class="absolute w-full bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-100" />
	</div>
	<div class="flex flex-row items-center space-x-8 text-gray-600 dark:text-gray-700">
		<div class="flex flex-row items-center space-x-4 md:space-x-8 text-gray-600">
			<a class="relative dark:hover:text-white hover:text-gray-900 text-gray-700 dark:text-gray-400" href="/">
				Trading
				<div class="absolute w-full -mb-1 bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-100" />
			</a>
			<a class="hover:text-gray-900 dark:hover:text-white" href="https://gov.cap.exchange" target="_blank" rel="noopener noreferrer">Governance</a>
		</div>
		<div class="flex flex-row items-center space-x-2">
			<div class="px-4 py-1 bg-gray-900 bg-opacity-50 dark:bg-opacity-100 rounded-sm text-gray-100">
				<Wallet />
			</div>
			<!--<span class="px-2 py-1 bg-green-400 text-white rounded-sm dark:bg-gray-800">{ getChainLabel($chainId) }</span>-->
		</div>
	</div>
</header>
