export const products = [
	//crypto
	{ symbol: "BTC",  figi: "BTC",      name: "Bitcoin",  tv: "BTCUSD" },
	{ symbol: "ETH",  figi: "ETH",      name: "Ethereum",  tv: "ETHUSD" },
	{ symbol: "LTC",  figi: "LTC",      name: "Litecoin",  tv: "LTCUSD" },
	{ symbol: "LINK",  figi: "LINK",      name: "Chainlink",  tv: "LINKUSD" },
	{ symbol: "ADA",  figi: "LINK",      name: "Cardano",  tv: "ADAUSD" },
	{ symbol: "DOT",  figi: "DOT",      name: "Polkadot",  tv: "DOTUSD" },
	{ symbol: "AAVE",  figi: "AAVE",      name: "Aave",  tv: "AAVEUSD" },
	{ symbol: "UNI",  figi: "UNI",      name: "Uniswap",  tv: "UNIUSD" },
	{ symbol: "SNX",  figi: "SNX",      name: "Synthetix",  tv: "SNXUSD" },
	
	//commodities
	{ symbol: "XAU",  figi: "XAU",      name: "Gold Spot",  tv: "XAUUSD" },
	{ symbol: "XAG",  figi: "XAG",      name: "Silver Spot",  tv: "XAGUSD" },
	{ symbol: "WTIOIL",  figi: "WTIOIL",      name: "WTI Crude Oil",  tv: "USDWTI" },
	{ symbol: "BRENTOIL",  figi: "BRENTOIL",  name: "Brent Crude Oil",  tv: "USDBRO" },
  
	//stocks
	{ symbol: "AAPL",  figi: "BBG000B9XRY4",  name: "Apple",    },
	{ symbol: "TSLA",  figi: "BBG000N9MNX3",  name: "Tesla",    },
	{ symbol: "PFE",  figi: "BBG000BR2B91",  name: "Pfizer",    },
	{ symbol: "FB",    figi: "BBG000MM2P62",  name: "Facebook",  },
	{ symbol: "NFLX",  figi: "BBG000CL9VN6",  name: "Netflix",  },
	{ symbol: "GOOG",  figi: "BBG009S3NB30",  name: "Google",    },
	{ symbol: "MSFT",  figi: "BBG000BPH459",  name: "Microsoft",    },
	{ symbol: "IBM",  figi: "BBG000BLNNH6",  name: "IBM",    },
	{ symbol: "INTC",  figi: "BBG000C0G1D1",  name: "Intel",    },
	{ symbol: "MMM",  figi: "BBG000BP52R2",  name: "3M",    },
	{ symbol: "JNJ",  figi: "BBG000BMHYD1",  name: "Johnson & Johnson",    },
	{ symbol: "NKE",  figi: "BBG000C5HS04",  name: "Nike",    },
	{ symbol: "VZN",  figi: "BBG000HS77T5",  name: "Verizon Communications",  tv: "VZ"  },
	{ symbol: "V",  figi: "BBG000PSKYX7",  name: "Visa",    },
	{ symbol: "AXP",  figi: "BBG000BCQZS4",  name: "American Express",    },
	{ symbol: "PLTR",  figi: "BBG000N7QR55",  name: "Palantir",    },
	{ symbol: "AMD",  figi: "BBG000BBQCY0",  name: "AMD",    },
	{ symbol: "ATVI",  figi: "BBG000CVWGS6",  name: "Activision Blizzard",    },
	{ symbol: "AMZN",  figi: "BBG000BVPV84",  name: "Amazon",    },
	{ symbol: "WMT",  figi: "BBG000BWXBC2",  name: "Walmart",    },
	{ symbol: "TSM",  figi: "BBG000BD8ZK0",  name: "Taiwan Semiconductor Manufacturing",    },
	{ symbol: "ABNB",  figi: "BBG001Y2XS07",  name: "Airbnb",    },
	{ symbol: "SQ",  figi: "BBG0018SLC07",  name: "Square",    },
	{ symbol: "TWTR",  figi: "BBG000H6HNW3",  name: "Twitter",    },
	{ symbol: "MSTR",  figi: "BBG000GQJPZ0",  name: "MicroStrategy",    },
	{ symbol: "SP500",  figi: "BBG000H4FSM0",  name: "S&P 500",  tv: "SP:SPX" },
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