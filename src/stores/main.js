import { writable } from 'svelte/store'

export const chainId = writable(null);
export const user = writable(null);
export const darkMode = writable(false);

export const selectedProduct = writable('BTC');