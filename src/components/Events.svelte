<script>
	import Panel from './Panel.svelte'

	import { chainId } from '../stores/main'
	import { events } from '../stores/events'
	import { formatAddress, formatBigInt, parseDecimal } from '../lib/utils'

	let loading = false;
	let showDetails;

	function toggleDetails(event) {
		if (showDetails == event) {
			showDetails = undefined;
		} else {
			showDetails = event;
		}
	}

	function eventSymbol(event) {
		switch (event.eventName) {
			case "Order Submitted":
			case "Liquidation Submitted":
				return "ℹ";
			case "Position Opened":
			case "Position Closed":
			case "Position Margin Added":
				return "✔";
			case "Order Cancelled":
			case "Position Liquidated":
				return "✗";
		}
	}

	function eventString(event) {

		if (event.eventName == 'Order Submitted') {
			return `Submitted${event.positionId != 0 ? ' update to [' + event.positionId + ']...' : ' new order...'} ${event.isBuy ? '⬆' : '⬇'} ${event.symbol} ${event.leverage}×${event.amount}`;
		} else if (event.eventName == 'Position Opened') {
			return `Opened new position ${event.isBuy ? '⬆' : '⬇'} ${event.symbol} ${event.leverage}×${event.amount} @ ${event.price} [${event.positionId}]`;
		} else if (event.eventName == 'Position Closed') {
			return `Closed ${event.amountClosed} @ ${event.price}, got back ${event.amountToReturn} (${event.amountToReturn - event.amountClosed > 0 ? '+' : ''}${(100 * (event.amountToReturn - event.amountClosed)/event.amountClosed).toFixed(2)}%) [${event.positionId}]`;
		} else if (event.eventName == 'Position Margin Added') {
			return `Added margin (${event.newAmount * 1 - event.oldAmount * 1}), now ${event.newLeverage}×${event.newAmount} [${event.positionId}]`;
		} else if (event.eventName == 'Order Cancelled') {
			return `Order cancelled, ${event.reason} [${event.positionId}]`;
		} else if (event.eventName == 'Position Liquidated') {
			return `Liquidated ${event.marginLiquidated} [${event.positionId}]`;
		} else if (event.eventName == 'Liquidation Submitted') {
			return `Submitted liquidation [${event.positionId}]`;
		}

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
	.event-row {
	}
</style>

<Panel class='flex flex-col text-gray-400'>
	<div class="text-lg mb-4 font-semibold dark:text-white">Events</div>
	{#if !$events || !$events.length}
		<div class='row'>
			Nothing to show.
		</div>
	{:else}
		<div class="flex flex-col space-y-2">	
			{#each $events as event}

				<div class="flex flex-col shadow-lg bg-primary-400 rounded-md">
					<div class='flex flex-col p-2 rounded-md shadow-sm bg-primary-100 p-4 text-white'>
						<div class="flex flex-row items-center space-x-2">
							<span>
								{eventSymbol(event)}
							</span>
							<span>
								{eventString(event)}
							</span>
						</div>
						<div class="flex flex-row justify-end space-x-2 mt-1">
							<button
									class={`border px-2 rounded-sm ${showDetails == event.txhash ? "text-gray-800 border-gray-800" : "text-white border-white"}`}
									on:click={() => {toggleDetails(event.txhash)}}>Details</button>
							<span>-</span>
							<a
								class="border px-2 rounded-sm text-white border-white"
								target='_blank' href={`https://${$chainId == '0x3' ? 'ropsten.' : ''}etherscan.io/tx/${event.txhash}`}>TX</a>
						</div>
					</div>
					{#if showDetails == event.txhash}
					<div class='p-4 text-white rounded-md'>
						{#each Object.keys(event) as eventKey}
							{eventKey}: {eventKey === "txhash" ? formatAddress(event[eventKey]) : event[eventKey]}<br/>
						{/each}
					</div>
					{/if}
				</div>

			{/each}
		</div>
	{/if}
</Panel>