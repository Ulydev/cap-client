<script>
	import Panel from './Panel.svelte'
	import Input from './Input.svelte'
	import RadioButton from './RadioButton.svelte'
	import Button from './Button.svelte'
	import TradingViewWidget from "./TradingViewWidget.svelte"

	import { productToFigi, productToTradingViewID } from '../lib/products'
	import getProductInfo from '../lib/getProductInfo'
	import submitOrder from '../lib/submitOrder'
	import { selectedProduct } from '../stores/main'
	import { showToast } from '../stores/toasts'
	import { formatBigInt, parseDecimal } from '../lib/utils'

	import { darkMode } from "../stores/main"

	let input;
	
	let product;
	let margin;
	let leverage;

	let productInfo;
	let loadingProductInfo = false;
	let productNotFound = false;

	let side = 'buy';
	let loading = false;

	function validateInputs() {
		if (!input) return;
		if (input.validity.patternMismatch || input.validity.valueMissing) return true;
	}

	async function _submitOrder() {
		if (!product || !margin || !leverage) return;

		if (leverage * 1 < 1 || leverage * 1 > 1 * formatBigInt(productInfo.maxLeverage, BigInt(8))) return showToast('!leverage');

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
			product = undefined;
			margin = undefined;
			leverage = undefined;
		} catch (e) {
			showToast(e && e.message);
		} finally {
			loading = false;
		}
	}

	async function lookupProduct() {
		if (!product) return;
		//console.log('looking up', product);
		try {
			const symbol = productToFigi(product.toUpperCase());
			productInfo = await getProductInfo(symbol);
			//console.log('productInfo', productInfo);
			selectedProduct.set(product);
		} catch(e) {
			productNotFound = true;
			/* 
			// simulate product info
			productInfo = {
				maxLeverage: BigInt(10 * Math.pow(10,18)),
				fee: BigInt(10 * Math.pow(10,15)),
				fundingRate: BigInt(10 * Math.pow(10,13))
			}
			*/
		}
		loadingProductInfo = false;
	}

	let c;
	function productChanged(product) {

		productInfo = undefined;
		
		if (c) clearTimeout(c);
		c = setTimeout(lookupProduct, 1000);
		
		loadingProductInfo = true;
		if (!product) {
			loadingProductInfo = false;
			productNotFound = false;
		}

	}

	$: productChanged(product);

	const infoClass = "p-4 text-white"

	$: tradingviewID = productInfo && productToTradingViewID((product).toUpperCase())

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
		#tradingview-container {
			animation: slide-to-right 1s 1s forwards;
		}
		.slide-to-left {
			animation: slide-to-left 1s 1s forwards;
		}
	}

</style>

<Panel
	class={`mx-2 lg:mx-0 shadow-lg rounded-md mt-8 bg-green-400 relative ${ !!productInfo ? "slide-to-left" : "" }`}>

	<form
		on:submit|preventDefault={_submitOrder}
		on:invalid={validateInputs}
		on:changed={validateInputs}
		on:input={validateInputs}
		class="relative z-20 bg-green-400 rounded-md">
		<div class='bg-white p-4 rounded-md shadow-md dark:bg-green-600'>
			<div class='flex flex-col'>
				<span class="text-sm text-green-400 uppercase font-semibold mb-2">Asset</span>
				<Input
					_type='text'
					bind:element={input}
					placeholder='BTC, AAPL... or Composite FIGI'
					uppercase={true}
					bind:value={product}
					class="dark:border-green-400 dark:placeholder-gray-300 dark:text-white"
				/>
			</div>
		</div>
		<div class="">
			<div class="rounded-md">
				{#if productInfo}
					<div class={`${infoClass} flex flex-col relative`}>
						<div class="flex flex-row items-center justify-between">
							<div class="flex flex-row items-center space-x-2">
								<span class="text-2xl font-semibold uppercase">
									{ product }
								</span>
								<span class="px-2 text-green-400 bg-white rounded-sm font-semibold">
									{ formatBigInt(productInfo.maxLeverage, BigInt(8)) }x
								</span>
							</div>
							<div class="space-x-2">
								<RadioButton bind:group={side} value='buy' label='Buy' />
								<RadioButton bind:group={side} value='sell' label='Sell' />
							</div>
						</div>
						<hr class="my-2 border-white border-dotted border-t-2" />
						<div class="flex flex-col text-xs">
							<span>Spread:  {formatBigInt(BigInt(100) * productInfo.fee, BigInt(8))}%</span>
							<span>Daily funding: ~ {formatBigInt(BigInt(5760) * BigInt(100) * productInfo.fundingRate, BigInt(8))}%</span>
						</div>
					</div>
				{:else}
					{#if loadingProductInfo}
					<div class={infoClass}>Searching...</div>
					{:else}
						{#if productNotFound}
						<div class={infoClass}>Product not found.</div>
						{/if}
					{/if}
				{/if}

				<div
					id="tradingview-container"
					class={`relative lg:absolute z-10 opacity-100 lg:opacity-0 top-0 w-full h-full lg:rounded-md overflow-hidden ${!tradingviewID ? "hidden" : ""}`}>
					<TradingViewWidget options={{
						container_id: "tradingview-container",
						symbol: tradingviewID, theme: $darkMode ? "dark" : "light", autosize: true,
						"enable_publishing": false, "hide_top_toolbar": true, "hide_legend": true, "save_image": false, "style": "2", "toolbar_bg": "#1d573f"
					}} />
				</div>

				{#if productInfo}
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