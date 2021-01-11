<script>
	import Wallet from './Wallet.svelte'

	import { chainId, proMode } from '../stores/main'
	import { getChainLabel } from '../lib/utils';

	import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte'
	import ProductSearchBar from './ProductSearchBar.svelte';
import Route from 'svelte-routing/src/Route.svelte';
</script>

{#if $proMode}
	<header class="mt-4 mr-4 flex flex-row items-center justify-between h-20 text-sm px-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl rounded-tl-none shadow-md">
		<div>
			<Route path="/">
				<div class="flex flex-row items-center space-x-8">
					<span class="font-bold dark:text-white text-xl">Dashboard</span>
				</div>
			</Route>
			<Route path="/trade">
				<div class="flex flex-row items-center space-x-8">
					<span class="font-bold dark:text-white text-xl">Trade</span>
					<div class="relative">
						<ProductSearchBar
							class="relative p-2 pr-4 pl-9 rounded-full bg-gray-800 text-white w-96" />
						<IoIosSearch class="w-5 h-5 absolute left-3 top-2 text-gray-700" />
					</div>
				</div>
			</Route>
		</div>
		<div class="flex flex-row items-center space-x-2 dark:text-gray-400">
			<Wallet/>
			<span class="px-2 py-1 bg-primary-100 text-white rounded-sm dark:bg-primary-400 font-bold">{ getChainLabel($chainId) }</span>
		</div>
	</header>
{:else}
	<header class="flex flex-row items-center justify-between mx-auto max-w-3xl w-full py-8 text-xs px-4">
		<div class="flex flex-row items-center space-x-2">
			<img alt='Cap Logo' src='/assets/logo-pure.svg' class="w-12" />
			<span class="font-bold dark:text-white">CAP</span>
		</div>
		<div class="flex flex-row items-center space-x-2 dark:text-gray-400">
			<Wallet/>
			<span class="px-2 py-1 bg-primary-100 text-white rounded-sm dark:bg-gray-800">{ getChainLabel($chainId) }</span>
		</div>
	</header>
{/if}