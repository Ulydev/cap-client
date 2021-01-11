<script>
    import Input from "./Input.svelte"

    import { productInfo, productNotFound, loadingProductInfo, lookupProduct } from "../stores/product"

    let input;
    let product;
    
    let c;
	function productChanged(product) {

		productInfo.set(undefined);
		
		if (c) clearTimeout(c);
		c = setTimeout(() => lookupProduct(product), 1000);
		
		loadingProductInfo.set(true);
		if (!product) {
			loadingProductInfo.set(false);
			productNotFound.set(false);
		}

    }
    
    $: productChanged(product);
</script>

<Input
    _type='text'
    bind:element={input}
    placeholder='BTC, AAPL... or Composite FIGI'
    uppercase={true}
    bind:value={product}
    overrideClass
    {...$$props}
/>