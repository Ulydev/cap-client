<script>

	import { Router, Route } from "svelte-routing";

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

	// data refresher
	setInterval(() => {
		if (!$user) return;
		reloadBalance.update(n => n + 1);
		reloadEvents.update(n => n + 1);
		reloadPositions.update(n => n + 1);
	}, 5000);

	export let url = "";

</script>

<div class="">
	<Header/>
	<div class="max-w-sm mx-auto my-20">
		{#if $user}
			<NewOrder/>

			<div class="mx-4">
				<Router url="{url}">
					<Nav />
					<hr class="mb-6 border-gray-400 border-dotted border-t-2" />
					<div>
						<Route path="/positions"><Positions /></Route>
						<Route path="/events"><Events /></Route>
						<Route path="/"><Balance /></Route>
					</div>
					<hr class="mt-6 border-gray-400 border-dotted border-t-2" />
				</Router>
			</div>
		{/if}
	</div>
	<Footer/>
</div>
<Toast/>