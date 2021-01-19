<script>
	import Panel from './Panel.svelte'
	import Input from './Input.svelte'
	import Button from './Button.svelte'
	import { baseBalance, freeMargin } from '../stores/balances'
	import { chainId } from '../stores/main'
	import { formatBigInt, parseDecimal } from '../lib/utils'
	import { showToast } from '../stores/toasts'

	import deposit from '../lib/deposit'
	import withdraw from '../lib/withdraw'
	import requestFaucet from '../lib/requestFaucet'

	let input;

	let showDeposit = false;
	let showWithdraw = false;
	let depositAmount;
	let withdrawAmount;

	function validateInputs() {
		if (!input) return;
		if (input.validity.patternMismatch || input.validity.valueMissing) return true;
	}

	function toggleDeposit() {
		showWithdraw = false;
		showDeposit = !showDeposit;
	}
	function toggleWithdraw() {
		showDeposit = false;
		showWithdraw = !showWithdraw;
	}

	async function _deposit() {
		console.log('depositAmount', depositAmount);
		if (!depositAmount) return;
		try {
			const txhash = await deposit({
				currency: 'DAI',
				amount: parseDecimal("" + depositAmount, BigInt(8))
			});
			showToast(depositAmount + ' DAI deposit pending.', 'success');
			showDeposit = false;
		} catch (e) {
			console.log(e);
			showToast(e && e.message);
		}
	}

	async function _withdraw() {
		if (!withdrawAmount) return;
		try {
			const txhash = await withdraw({
				currency: 'DAI',
				amount: parseDecimal("" + withdrawAmount, BigInt(8))
			});
			showToast(withdrawAmount + ' DAI withdrawal pending.', 'success');
			showWithdraw = false;
		} catch (e) {
			console.log(e);
			showToast(e && e.message);
		}
	}

	async function faucet() {
		try {
			const txhash = await requestFaucet();
			showToast('Requested DAI from faucet.', 'success');
		} catch (e) {
			showToast(e && e.message);
		}
	}

	async function setMaxDepositAmount() {
		depositAmount = formatBigInt($baseBalance)
	}

	async function setMaxWithdrawAmount() {
		withdrawAmount = formatBigInt($freeMargin, BigInt(8))
	}

</script>

<style>
</style>

<Panel class="flex flex-col">
	<span class="text-lg my-4 font-semibold dark:text-white">Account</span>
	<div class='flex flex-row justify-between mb-6 text-gray-700 dark:text-gray-400'>
		<div class='label'>DAI</div>
		<div class='value'>{formatBigInt($freeMargin, BigInt(8))}</div>
	</div>
	<div class="flex flex-row space-x-2">
		<button on:click={toggleDeposit} title='Deposit DAI' class={`flex-1 py-1 text-center text-gray-900 dark:text-gray-100 rounded-sm bg-gray-300 dark:bg-gray-900 pt-1 shadow-inner border-b-2 border-transparent ${showDeposit ? "border-primary-200" : ""}`}>Deposit</button>
		<button on:click={toggleWithdraw} title='Withdraw DAI' class={`flex-1 py-1 text-center text-gray-900 dark:text-gray-100 rounded-sm bg-gray-300 dark:bg-gray-900 pt-1 shadow-inner border-b-2 border-transparent ${showWithdraw ? "border-primary-200" : ""}`}>Withdraw</button>
	</div>
	{#if showDeposit || showWithdraw}
	<div class='mt-8 mb-4 flex flex-row justify-between text-gray-700 dark:text-gray-400'>
		<div class='label'>Wallet DAI {#if $chainId != '0x1'}<button title='Get 10,000 testnet DAI' class="p-1 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-sm" on:click={faucet}>faucet</button>{/if}</div>
		<div class='value'>{formatBigInt($baseBalance)}</div>
	</div>
	{/if}
	{#if showDeposit}
	<form
		on:submit|preventDefault={_deposit}
		on:invalid={validateInputs}
		on:changed={validateInputs}
		on:input={validateInputs}
		class="flex flex-col space-y-2"
	>
		<div class='relative'>
			<Input
				bind:element={input}
				placeholder='DAI amount to deposit'
				bind:value={depositAmount}
			/>
			<button class="absolute flex flex-row items-center right-0 top-0 mr-4 h-10 text-gray-900 dark:text-white" type="button" on:click={setMaxDepositAmount}>
				MAX
			</button>
		</div>
		<div class='row'>
			<Button 
				text='Deposit'
				class="border-none"
			/>
		</div>
	</form>
	{/if}
	{#if showWithdraw}
	<form
		on:submit|preventDefault={_withdraw}
		on:invalid={validateInputs}
		on:changed={validateInputs}
		on:input={validateInputs}
		class="flex flex-col space-y-2"
	>
		<div class='relative'>
			<Input
				bind:element={input}
				placeholder='DAI amount to withdraw'
				bind:value={withdrawAmount}
			/>
			<button class="absolute flex flex-row items-center right-0 top-0 mr-4 h-10 text-gray-900 dark:text-white" type="button" on:click={setMaxWithdrawAmount}>
				MAX
			</button>
		</div>
		<div class='row'>
			<Button 
				text='Withdraw'
				class="border-none"
			/>
		</div>
	</form>
	{/if}
</Panel>