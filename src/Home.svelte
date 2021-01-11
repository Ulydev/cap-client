<script>

	import { Router, Route } from "svelte-routing";

	import { proMode } from "./stores/main"

	import Header from './components/Header.svelte'
	import Nav from './components/Nav.svelte'

	import Balance from './components/Balance.svelte'
	import NewOrder from './components/NewOrder.svelte'
	import Positions from './components/Positions.svelte'
	import Events from './components/Events.svelte'
	import Footer from './components/Footer.svelte'
	import Toast from './components/Toast.svelte'

	import { user } from './stores/main'
	import { reloadBalance } from './stores/balances'
	import { reloadEvents } from './stores/events'
	import { reloadPositions } from './stores/positions'
import Sidebar from "./components/Sidebar.svelte";

	// data refresher
	setInterval(() => {
		if (!$user) return;
		reloadBalance.update(n => n + 1);
		reloadEvents.update(n => n + 1);
		reloadPositions.update(n => n + 1);
	}, 5000);

	export let url = "";

</script>

<Router url="{url}">
	<div class="flex flex-row w-full h-full">
		<Sidebar />
		<div class={`flex-1 flex flex-col ${proMode ? "h-screen" : ""}`}>
			<Header/>
			<div class={`${$proMode ? "flex-1 bg-gray-800 overflow-y-auto ml-4 mr-8 mt-8" : "max-w-sm mx-auto my-20"}`}>
				{#if $user}

					<NewOrder/>

					{#if !$proMode}
						<div class="mx-4">
							
							<Nav />
							<hr class="mb-6 border-gray-400 border-dotted border-t-2" />
							<div>
								<Route path="/positions"><Positions /></Route>
								<Route path="/events"><Events /></Route>
								<Route path="/"><Balance /></Route>
							</div>
							<hr class="mt-6 border-gray-400 border-dotted border-t-2" />
						</div>
					{/if}
				{/if}
			</div>
			{#if !$proMode}
				<Footer/>
			{/if}
		</div>
	</div>
</Router>
<Toast/>