const PRODUCT_TO_FIGI = {
	"BTC": "BTC",
	"ETH": "ETH",
	"AAPL": "BBG000B9XRY4",
	"TSLA": "BBG000N9MNX3",
	"PFE": "BBG000BR2B91",
	"FB": "BBG000MM2P62",
	"NFLX": "BBG000CL9VN6",
	"GOOG": "BBG009S3NB30",
	"SP500": "BBG000H4FSM0"
};

const PRODUCT_TO_TRADINGVIEW_ID = {
	"BTC": "BTCUSD",
	"ETH": "ETHUSD",
	"LINK": "LINKUSD",
	"SP500": "SP:SPX"
}

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