<script>
    import Link from "svelte-routing/src/Link.svelte";

    const baseLinkClass = `relative group flex flex-row items-center p-2`
    const getLinkProps = ({ href, isCurrent, isPartiallyCurrent }) => {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
		return {
			class: `${baseLinkClass} ${isActive ? "text-primary-200 bg-gray-500 bg-opacity-25 rounded-full" : ""}`
		}
    }

</script>

{#if $$props.to}
    <Link to={$$props.to} getProps={getLinkProps}>
        <span class="text-white font-bold flex flex-row items-center absolute left-0 top-0 bottom-0 -mt-0.5 h-10 ml-12 p-2 bg-gray-900 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-300">{$$props.label}</span>
        <slot />
    </Link>
{:else}
    <a href={$$props.href} target="_blank" rel="noopener noreferrer" class={baseLinkClass}>
        <span class="text-white font-bold flex flex-row items-center absolute left-0 top-0 bottom-0 -mt-0.5 h-10 ml-12 p-2 bg-gray-900 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-300">{$$props.label}</span>
        <slot />
    </a>
{/if}