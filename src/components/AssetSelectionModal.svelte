<script>
    import { getContext } from "svelte"
    const { close } = getContext("simple-modal")

    import { products } from "../lib/products"
    import AssetRow from "./AssetRow.svelte"

    export let onChooseAsset
</script>

<div class="w-screen max-w-md">
    <div class="flex flex-row items-center justify-between p-4 pr-2">
        <span class="dark:text-gray-100 text-gray-900">Select Asset</span>
        <button class="dark:text-gray-100 text-gray-900 hover:opacity-50 transition duration-300 p-2" on:click={() => close()}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path></svg>
        </button>
    </div>
    <hr class="border-gray-600" />
    <div class="flex flex-col w-full overflow-auto" style="height: 30rem;">
        {#each products as product}
            <AssetRow {product} onClick={() => { onChooseAsset(product); close(); }} />
        {/each}
    </div>
</div>