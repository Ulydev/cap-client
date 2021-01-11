<script>
	import { Link } from "svelte-routing";

	const activeClass = "text-primary-100 dark:text-white font-semibold";
	function getLinkProps({ href, isPartiallyCurrent, isCurrent }) {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

		if (isActive) {
			return { class: activeClass };
		}
			return {};
	}

</script>

<nav class="flex flex-row items-center space-x-6 py-4 my-4 text-sm text-gray-400 font-semibold">
	<Link to="/" getProps={getLinkProps}>BALANCES</Link>
	<Link to="/positions" getProps={getLinkProps}>OPEN POSITIONS</Link>
	<Link to="/events" getProps={getLinkProps}>EVENTS</Link>
</nav>
