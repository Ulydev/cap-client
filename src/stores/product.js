import { writable } from 'svelte/store'

import { productToFigi } from '../lib/products'
import getProductInfo from '../lib/getProductInfo'

const DEFAULT_PRODUCT = "BTC"

export const selectedProduct = writable(DEFAULT_PRODUCT);
export const productInfo = writable();
export const loadingProductInfo = writable(false);
export const productNotFound = writable(false);

export async function lookupProduct(product) {
    console.log(product)
    if (!product) return;
    //console.log('looking up', product);
    try {
        const symbol = productToFigi(product.toUpperCase());
        productInfo.set(await getProductInfo(symbol));
        //console.log('productInfo', productInfo);
    } catch(e) {
        productNotFound.set(true);
    } finally {
        selectedProduct.set(product);
    }
    loadingProductInfo.set(false);
}
lookupProduct(DEFAULT_PRODUCT);