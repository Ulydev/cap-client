<script>
	import Wallet from './Wallet.svelte'

	import { chainId, proMode } from '../stores/main'
	import { getChainLabel } from '../lib/utils';

	import TiThLarge from 'svelte-icons/ti/TiThLarge.svelte'
	import TiChartLine from 'svelte-icons/ti/TiChartLine.svelte'
	import MdAccountBalance from 'svelte-icons/md/MdAccountBalance.svelte'
	import { Link } from 'svelte-routing';
import SidebarLink from './SidebarLink.svelte';

	const getLinkProps = ({ href, isCurrent, isPartiallyCurrent }) => {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
		return {
			class: `flex flex-row items-center space-x-4 p-2 ${isActive ? "text-primary-200 bg-gray-500 bg-opacity-25 rounded-full" : ""}`
		}
	}
</script>

{#if $proMode}
	<nav class="flex flex-col m-4 mr-4 p-4 pt-8 w-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl rounded-tr-none shadow-md">
		<div class="flex flex-row items-center space-x-2 mb-16 mx-auto">
			<img alt='Cap Logo' src='/assets/logo-pure.svg' class="w-10" />
		</div>
		<div class="flex flex-col items-center space-y-8 text-gray-500">
			<SidebarLink to="/" label="Dashboard">
				<TiThLarge class="block w-5 h-5" />
			</SidebarLink>
			<SidebarLink to="/trade" label="Trade">
				<TiChartLine class="block w-5 h-5" />
			</SidebarLink>
			<SidebarLink href="https://gov.cap.uly.dev" label="Governance">
				<MdAccountBalance class="block w-5 h-5" />
			</SidebarLink>
		</div>
	</nav>
{/if}