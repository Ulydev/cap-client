<script>
	import Panel from './Panel.svelte'
	import Input from './Input.svelte'
	import RadioButton from './RadioButton.svelte'
	import Button from './Button.svelte'
	import TradingViewWidget from "./TradingViewWidget.svelte"

	import { proMode } from "../stores/main"

	import { productToFigi, productToTradingViewID } from '../lib/products'
	import getProductInfo from '../lib/getProductInfo'
	import submitOrder from '../lib/submitOrder'
	import { selectedProduct, productInfo, productNotFound, loadingProductInfo } from '../stores/product'
	import { showToast } from '../stores/toasts'
	import { formatBigInt, parseDecimal } from '../lib/utils'

	import { darkMode } from "../stores/main"
	import ProductSearchBar from './ProductSearchBar.svelte';

	let input;
	
	let margin;
	let leverage = 1;

	let side = 'buy';
	let loading = false;

	function validateInputs() {
		if (!input) return;
		if (input.validity.patternMismatch || input.validity.valueMissing) return true;
	}

	async function _submitOrder() {
		if (!$selectedProduct || !margin || !leverage) return;

		if (leverage * 1 < 1 || leverage * 1 > 1 * formatBigInt($productInfo.maxLeverage, BigInt(8))) return showToast('!leverage');

		if (margin * 1 < 10) return showToast('!margin');

		loading = true;
		const params = {
			symbol: productToFigi(product.toUpperCase()),
			leverage: parseDecimal(leverage, BigInt(8)),
			margin: parseDecimal(margin, BigInt(8)),
			isBuy: side == 'buy' ? true : false
		}
		console.log('params', params);
		try {
			const txhash = await submitOrder(params);
			showToast('Submitted and awaiting confirmation.', 'success');
			margin = undefined;
			leverage = undefined;
		} catch (e) {
			showToast(e && e.message);
		} finally {
			loading = false;
		}
	}

	const infoClass = "p-4 text-white"

	$: tradingviewID = $productInfo && productToTradingViewID(($selectedProduct).toUpperCase())

</script>

<style global>

	@keyframes slide-to-left {
		from { transform: translateX(0); }
		to { transform: translateX(calc(-50% - 1rem)); }
	}

	@keyframes slide-to-right {
		from { transform: translateX(0); opacity: 0; }
		to { transform: translateX(calc(100% + 2rem)); opacity: 1; }
	}

	@media (min-width: 1024px) {
		.slide-to-right {
			animation: slide-to-right 1s 1s forwards;
		}
		.slide-to-left {
			animation: slide-to-left 1s 1s forwards;
		}
	}

</style>

{#if $proMode}
	{#if $productInfo}
		<div class="flex-1 flex flex-row space-x-8">
			<div class="flex-1 flex flex-col bg-gray-700 rounded-md overflow-hidden shadow-md">
				<div class="flex flex-row justify-between p-4 px-8 text-white">
					<div class="flex flex-row items-center space-x-4">
						<span class="text-2xl font-semibold uppercase">
							{ $selectedProduct }
						</span>
						<span class="px-2 text-primary-100 bg-gray-800 rounded-md font-semibold">
							{ formatBigInt($productInfo.maxLeverage, BigInt(8)) }x
						</span>
					</div>
					<div class="flex flex-col justify-center text-xs items-end">
						<span>Spread:  {formatBigInt(BigInt(100) * $productInfo.fee, BigInt(8))}%</span>
						<span>Daily funding: ~ {formatBigInt(BigInt(5760) * BigInt(100) * $productInfo.fundingRate, BigInt(8))}%</span>
					</div>
				</div>
				<div
					id="tradingview-container"
					class={`flex-1 ${!tradingviewID ? "hidden" : ""}`}>
					<TradingViewWidget symbol={tradingviewID} theme={$darkMode ? "dark" : "light"} />
				</div>
			</div>
			<form
				on:submit|preventDefault={_submitOrder}
				on:invalid={validateInputs}
				on:changed={validateInputs}
				on:input={validateInputs}
				class="flex flex-col w-64 bg-gray-700 rounded-md shadow-md overflow-hidden">
				<div class="">
					<div class="">
						<div class="flex flex-row w-full text-white bg-gray-900">
							<button
								type="button"
								class={`flex flex-row items-center justify-center flex-1 p-2 ${side === "buy" ? "bg-gray-700 rounded-tr-md" : "shadow-inner"}`} on:click|preventDefault={() => { side = "buy" }}>
								Buy
							</button>
							<button
								type="button"
								class={`flex flex-row items-center justify-center flex-1 p-2 ${side === "sell" ? "bg-gray-700 rounded-tl-md" : "shadow-inner"}`} on:click|preventDefault={() => { side = "sell" }}>
								Sell
							</button>
						</div>
					</div>
					<div class={`${infoClass}`}>
						<div class="flex flex-col space-y-4 text-white">
							<div class='flex flex-col'>
								<span class="text-sm uppercase">Margin</span>
								<div class="relative my-2">
									<Input
										inverted
										bind:element={input}
										placeholder='0.00'
										bind:value={margin}
										class="border-none bg-gray-900"
									/>
									<button class="absolute flex flex-row items-center right-0 top-0 mr-4 h-10">
										MAX
									</button>
								</div>
							</div>
							<div class='flex flex-col'>
								<div class="flex flex-row justify-between">
									<span class="text-sm uppercase">Leverage</span>
									<span class="text-sm uppercase">{Math.round(leverage * 10) / 10}</span>
								</div>
								<div class="relative w-full my-2">
									<input
										class="w-full bg-gray-900"
										type="range" min="1" max={formatBigInt($productInfo.maxLeverage, BigInt(8))}
										bind:value={leverage}
									/>
								</div>
							</div>
						</div>
	
						{#if margin && leverage}
						<div class='info-row mb-1'>
							Going {side=='buy' ? 'long' : 'short'} {parseInt(margin*leverage).toLocaleString()} DAI ({parseInt(margin).toLocaleString()} x {leverage}) on {product.toUpperCase()}.
						</div>
						{/if}
	
						<div class='row mt-8'>
							<Button 
								inverted
								text='Submit Order'
								isloading={loading}
								class="border-none bg-gradient-to-br from-primary-200 to-primary-400 font-bold text-sm"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	{:else}
		<div class="flex-1 flex flex-row items-center justify-center h-64">
			{#if $loadingProductInfo}
				<div class={infoClass}>Searching...</div>
			{:else if $productNotFound}
				<div class={`${infoClass}`}>Product "<span class="uppercase">{ $selectedProduct }</span>" not found.</div>
			{:else}
				<div class={infoClass}>Select an asset to start trading.</div>
			{/if}
		</div>
	{/if}
{:else}
	<Panel
		class={`shadow-lg rounded-md ${$proMode ? "" : "mt-8 mx-2 lg:mx-0"} bg-primary-100 relative ${ !!$productInfo ? "slide-to-left" : "" }`}>

		<form
			on:submit|preventDefault={_submitOrder}
			on:invalid={validateInputs}
			on:changed={validateInputs}
			on:input={validateInputs}
			class="relative z-20 bg-primary-100 rounded-md">
			<div class='bg-white p-4 rounded-md shadow-md dark:bg-primary-400'>
				<div class='flex flex-col'>
					<span class="text-sm text-primary-100 uppercase font-semibold mb-2">Asset</span>
					<ProductSearchBar />
				</div>
			</div>
			<div class="">
				<div class="rounded-md">
					{#if $productInfo}
						<div class={`${infoClass} flex flex-col relative`}>
							<div class="flex flex-row items-center justify-between">
								<div class="flex flex-row items-center space-x-2">
									<span class="text-2xl font-semibold uppercase">
										{ product }
									</span>
									<span class="px-2 text-primary-100 bg-white rounded-sm font-semibold">
										{ formatBigInt($productInfo.maxLeverage, BigInt(8)) }x
									</span>
								</div>
								<div class="space-x-2">
									<RadioButton bind:group={side} value='buy' label='Buy' />
									<RadioButton bind:group={side} value='sell' label='Sell' />
								</div>
							</div>
							<hr class="my-2 border-white border-dotted border-t-2" />
							<div class="flex flex-col text-xs">
								<span>Spread:  {formatBigInt(BigInt(100) * $productInfo.fee, BigInt(8))}%</span>
								<span>Daily funding: ~ {formatBigInt(BigInt(5760) * BigInt(100) * $productInfo.fundingRate, BigInt(8))}%</span>
							</div>
						</div>
					{:else}
						{#if $loadingProductInfo}
						<div class={infoClass}>Searching...</div>
						{:else}
							{#if $productNotFound}
							<div class={infoClass}>Product not found.</div>
							{/if}
						{/if}
					{/if}
					
					<div
						id="tradingview-container"
						class={`slide-to-right relative lg:absolute z-10 opacity-100 lg:opacity-0 top-0 w-full h-full lg:rounded-md overflow-hidden ${!tradingviewID ? "hidden" : ""}`}>
						<TradingViewWidget symbol={tradingviewID} theme={$darkMode ? "dark" : "light"} />
					</div>

					{#if $productInfo}
						<div class={`${infoClass}`}>
							<div class="flex flex-row space-x-4 text-white">
								<div class='flex flex-col'>
									<span class="text-sm uppercase">Margin</span>
									<div class="relative my-2">
										<Input
											inverted
											bind:element={input}
											placeholder='0.00'
											bind:value={margin}
										/>
										<button class="absolute flex flex-row items-center right-0 top-0 mr-4 h-10">
											MAX
										</button>
									</div>
								</div>
								<div class="flex flex-row items-center h-11 mt-auto mb-2">
									<span>x</span>
								</div>
								<div class='flex flex-col w-28'>
									<span class="text-sm uppercase">Leverage</span>
									<Input
										inverted
										bind:element={input}
										placeholder='1.0'
										bind:value={leverage}
										class="my-2"
									/>
								</div>
							</div>
		
							{#if margin && leverage}
							<div class='info-row mb-1'>
								Going {side=='buy' ? 'long' : 'short'} {parseInt(margin*leverage).toLocaleString()} DAI ({parseInt(margin).toLocaleString()} x {leverage}) on {product.toUpperCase()}.
							</div>
							{/if}
		
							<div class='row'>
								<Button 
									text='Submit Order'
									isloading={loading}
									class="border-none"
								/>
							</div>
						</div>
					{/if}
				</div>
			</div>

		</form>
	</Panel>
{/if}