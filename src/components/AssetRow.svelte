<script>
    export let product
    export let onClick
</script>

<button class="flex flex-row w-full px-6 py-4 items-center hover:bg-gray-200 dark:hover:bg-gray-800" on:click={onClick}>
    <img src="/assets/products/{product.symbol.toLowerCase()}.png" alt="{product.symbol}" class="w-6 h-auto rounded-full" />
    <div class="ml-4 flex flex-col space-y-1 items-start dark:text-gray-100 text-gray-900">
        <span class="text-sm">{product.symbol}</span>
        <span class="text-xs opacity-50">{product.name}</span>
    </div>
</button>