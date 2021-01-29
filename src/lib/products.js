export const products = [
	{ symbol: "BTC",	figi: "BTC",			name: "Bitcoin",	tv: "BTCUSD" },
	{ symbol: "ETH",	figi: "ETH",			name: "Ethereum",	tv: "ETHUSD" },
	{ symbol: "LINK",	figi: "LINK",			name: "Chainlink",	tv: "LINKUSD" },
	{ symbol: "AAPL",	figi: "BBG000B9XRY4",	name: "Apple",		},
	{ symbol: "TSLA",	figi: "BBG000N9MNX3",	name: "Tesla",		},
	//{ symbol: "PFE",	figi: "BBG000BR2B91",	name: "Pfizer",		},
	{ symbol: "FB",		figi: "BBG000MM2P62",	name: "Facebook",	},
	{ symbol: "NFLX",	figi: "BBG000CL9VN6",	name: "Netflix",	},
	{ symbol: "GOOG",	figi: "BBG009S3NB30",	name: "Google",		},
	{ symbol: "SP500",	figi: "BBG000H4FSM0",	name: "S&P 500",	tv: "SP:SPX" },
]

const PRODUCT_TO_FIGI = {}
products.filter(p => !!p.figi).forEach(p => { PRODUCT_TO_FIGI[p.symbol] = p.figi })

const PRODUCT_TO_TRADINGVIEW_ID = {}
products.filter(p => !!p.tv).forEach(p => { PRODUCT_TO_TRADINGVIEW_ID[p.symbol] = p.tv })

let FIGI_TO_PRODUCT = {};
for (const p in PRODUCT_TO_FIGI) {
	const figi = PRODUCT_TO_FIGI[p];
	FIGI_TO_PRODUCT[figi] = p;
}

export function figiToProduct(figi) {
	return FIGI_TO_PRODUCT[figi] || figi;
}

export function productToFigi(product) {
	return PRODUCT_TO_FIGI[product] || product;
}

export function productToTradingViewID(product) {
	return PRODUCT_TO_TRADINGVIEW_ID[product] || product;
}