<script>
	import Panel from './Panel.svelte'
	import Input from './Input.svelte'
	import Button from './Button.svelte'

	import { positions } from '../stores/positions'
	import { showToast } from '../stores/toasts'
	import { formatBigInt, parseDecimal } from '../lib/utils'
	import submitOrderUpdate from '../lib/submitOrderUpdate'
	import getProductInfo from '../lib/getProductInfo'
	import getBlockByNumber from '../lib/getBlockByNumber'
	import { figiToProduct } from '../lib/products'

	let input;
	
	let loadingClose = false;
	let loadingEstimatePnl = false;
	let showClosePosition;
	let showEstimator;
	let estimatedPnl;

	let margin;
	let close_price;

	let closed_cache = {};

	function validateInputs() {
		if (!input) return;
		if (input.validity.patternMismatch || input.validity.valueMissing) return true;
	}

	function toggleClosePosition(id) {
		showEstimator = undefined;
		margin = undefined;
		close_price = undefined;
		estimatedPnl = undefined;
		if (showClosePosition == id) {
			showClosePosition = undefined;
		} else {
			showClosePosition = id;
		}
	}

	function toggleEstimator(id) {
		showClosePosition = undefined;
		margin = undefined;
		close_price = undefined;
		estimatedPnl = undefined;
		if (showEstimator == id) {
			showEstimator = undefined;
		} else {
			showEstimator = id;
		}
	}

	async function closePosition(id, isBuy, amount) {

		console.log('amount', margin);

		if (margin * 1 > amount * 1 || closed_cache[id] && closed_cache[id] + margin * 1 > amount * 1) {
			return showToast('Closing more than position amount.');
		}

		loadingClose = true;
		
		const params = {
			margin: parseDecimal(margin, BigInt(8)),
			positionId: id
		}
		console.log('params FIRST-C', params);
		try {
			const txhash = await submitOrderUpdate(params);
			showToast('Submitted close and awaiting confirmation.', 'success');
			if (!closed_cache[id]) closed_cache[id] = 0;
			closed_cache[id] += margin * 1;
			toggleClosePosition(id);
		} catch (e) {
			console.error(e);
			showToast(e && e.message);
		} finally {
			loadingClose = false;
		}

	}

	async function estimatePnl(position) {

		const posAmount = formatBigInt(position.margin, BigInt(8));

		if (margin * 1 > 1 * posAmount) {
			return showToast("Margin to close higher than position's.");
		}

		loadingEstimatePnl = true;

		try {
			console.log('position', position);
			const productInfo = await getProductInfo(position.symbol);

			if (productInfo) {

				console.log('productInfo', productInfo);
				
				let { fee, fundingRate } = productInfo;
				let pnl = 0;

				fee = formatBigInt(fee, BigInt(8), BigInt(8));

				let { isBuy, price, leverage, block } = position;
				leverage = formatBigInt(leverage, BigInt(8), BigInt(4));
				price = formatBigInt(price, BigInt(8), BigInt(8));
				block = parseInt(block);
				let _close_price;
				if (isBuy) {
					_close_price = close_price * (1 - fee);
					pnl = margin * leverage * ((_close_price * 1 - price * 1)/price);
				} else {
					_close_price = close_price * (1 + fee);
					pnl = margin * leverage * ((price * 1 - _close_price * 1)/price);
				}

				// add funding rate, fee
				
				fundingRate = formatBigInt(fundingRate, BigInt(8), BigInt(8));

				const currentBlock = await getBlockByNumber();

				let fundingToApply = margin * leverage * (currentBlock.number - block) * fundingRate;

				pnl -= fundingToApply;

				if (pnl <= - 1 * margin) {
					estimatedPnl = (- 1 * posAmount).toFixed(4) + " DAI (liquidated)";
				} else {
					estimatedPnl = pnl.toFixed(4) + " DAI";
				}

			}

		} catch(e) {
			console.log('product not found', e);
		}

		loadingEstimatePnl = false;

	}

</script>

<style>
	.row span {
		flex: 1;
	}
	.row a {
		margin-left: 8px;
	}
	.sub-row {
		padding: var(--base-padding);
		border-bottom: 1px solid var(--border-color-light);
	}
	.sub-row :global(input) {
		margin-bottom: var(--base-padding);
	}
	.pd {
		margin-bottom: var(--base-padding);
	}
</style>

<Panel class='flex flex-col text-gray-400'>
	<div class="text-lg mb-4 font-semibold dark:text-white">Positions</div>
	{#if !$positions || !$positions.length}
		<div>
			Nothing to show.
		</div>
	{:else}
		<div class="flex flex-col space-y-2">
			{#each $positions as position}

				<div class="flex flex-col shadow-lg bg-primary-400 rounded-md">
					<div class='flex flex-col space-y-1 bg-primary-100 rounded-md shadow-sm p-4 text-white'>
						<div class="flex flex-col">
							<div class="flex flex-row justify-between text-2xl">
								<span class="font-bold">{position.isBuy ? '⬆' : '⬇'} {figiToProduct(position.symbol)}</span>
								<span>@ {formatBigInt(position.price, BigInt(8))}</span>
							</div>
							<div class="flex flex-row justify-between">
								<span class="">{formatBigInt(position.leverage, BigInt(8))}×{formatBigInt(position.margin, BigInt(8))} DAI</span>
								<span>[{position.id}]</span>
							</div>
						</div>
						<div class="flex flex-row justify-end space-x-2">
							<button
								class={`border px-2 rounded-sm ${showClosePosition == position.id ? "text-gray-800 border-gray-800" : "text-white border-white"}`}
								on:click={() => {toggleClosePosition(position.id)}}>Close</button>
							<span>-</span>
							<button
								class={`border px-2 rounded-sm ${showEstimator == position.id ? "text-gray-800 border-gray-800" : "text-white border-white"}`}
								on:click={() => {toggleEstimator(position.id)}}>Est</button>
						</div>
					</div>
					{#if showAddMargin == position.id}
						<div class='p-4'>
							<form
								on:submit|preventDefault={() => {addMargin(position.id, position.isBuy)}}
								on:invalid={validateInputs}
								on:changed={validateInputs}
								on:input={validateInputs}
								class="space-y-2"
							>
								<Input
									inverted
									bind:element={input}
									placeholder='Margin to add'
									bind:value={margin}
								/>
								<Button 
									inverted
									text='Add Margin'
									isloading={loadingAddMargin}
									class="bg-white text-primary-100"
								/>
							</form>
						</div>
					{/if}
					{#if showClosePosition == position.id}
						<div class='p-4'>
							<form
								on:submit|preventDefault={() => {closePosition(position.id, position.isBuy, formatBigInt(position.margin, BigInt(8)))}}
								on:invalid={validateInputs}
								on:changed={validateInputs}
								on:input={validateInputs}
								class="space-y-2"
							>
								<Input
									inverted
									bind:element={input}
									placeholder='Margin to close'
									bind:value={margin}
								/>
								<Button 
									inverted
									text='Close'
									isloading={loadingClose}
									class="bg-white text-primary-100"
								/>
							</form>
						</div>
					{/if}
					{#if showEstimator == position.id}
						<div class='p-4'>
							<form
								on:submit|preventDefault={() => {estimatePnl(position)}}
								on:invalid={validateInputs}
								on:changed={validateInputs}
								on:input={validateInputs}
								class="space-y-2"
							>
								<Input
									inverted
									bind:element={input}
									placeholder='Margin to close'
									bind:value={margin}
								/>
								<Input
									inverted
									bind:element={input}
									placeholder='Price to close at'
									bind:value={close_price}
								/>
								{#if estimatedPnl}
								<div class='text-white'>
									Estimated P/L: {estimatedPnl} (includes spread and funding)
								</div>
								{/if}
								<Button 
									inverted
									text='Estimate P/L'
									isloading={loadingEstimatePnl}
									class="bg-white text-primary-100"
								/>
							</form>
						</div>
					{/if}
				</div>

			{/each}
		</div>
	{/if}
</Panel>