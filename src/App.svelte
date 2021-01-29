<script>
	import GlobalStyles from './components/styles/GlobalStyles.svelte';

	import Tailwind from './components/styles/Tailwind.svelte';
	import UtilityStyles from './components/styles/UtilityStyles.svelte';

	import Home from './Home.svelte';

	import Modal from "./components/Modal.svelte"
</script>

<main>
	<Tailwind />
	<GlobalStyles />
	<UtilityStyles />
	<Modal styleWindow={{ width: 'fit-content' }} contentClass="dark:bg-gray-900 bg-gray-100 rounded-md shadow-lg" styleContent={{ padding: "0" }} closeButton={false}>
		<Home />
	</Modal>
</main>