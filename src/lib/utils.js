import { CONTRACTS, DEFAULT_DECIMALS, DEFAULT_PRECISION } from './constants'

export function asyncTimeout(duration) {
	return new Promise((resolve) => {
		setTimeout(() => { resolve() }, duration);
	})
}

export function getAddress(name) {
	if (!window.ethereum || !ethereum.chainId) return null;
	return CONTRACTS[ethereum.chainId][name];
}

export function formatAddress(address) {
	return address ? `0x${ address.slice(2, 6) }...${ address.slice(-4) }` : ""
}

export function formatUserForEvent(user) {
	return '0x' + user.slice(2).padStart(64, 0);
}

export function formatBigInt(value, decimals, precision) {
	//console.log('fbi', value, decimals, precision, DEFAULT_DECIMALS, DEFAULT_PRECISION);
	if (!value) value = 0n;
	if (!decimals) decimals = DEFAULT_DECIMALS;
	if (!precision) precision = DEFAULT_PRECISION;

	const unit = 10n ** decimals;
	const integer = value / unit;
	const fractional = (value % unit);
	if (fractional == 0n) return `${integer}`;

	const precisionUnit = 10n ** (decimals - precision);
	const relevantFractional = fractional / precisionUnit;
	const remainderFractional = fractional % precisionUnit;

	let prefix = remainderFractional > 0n ? '' : '';
	return `${prefix}${integer}.${relevantFractional.toString().padStart(Number(precision), 0)}`;
}

export function parseDecimal(value, decimals) {
	if (!decimals) decimals = DEFAULT_DECIMALS;
	const [integer, fractional] = value.split('.');
	const unit = 10n ** decimals;
	return BigInt(integer) * unit + BigInt((fractional || '').padEnd(Number(decimals), 0));
}

export function encodeMethodSignature(signature) {
	return '0x' + signature.substring(0,8);
}

export function encodeUint(value) {
	return BigInt(value).toString(16).padStart(64, 0);
}

export function encodeAddress(address) {
	return address.substring(2).padStart(64,0);
}

export function encodeBytes32(value) {
	//console.log('value',value,value.length);
	const encoded = new TextEncoder().encode(value);
	//console.log('encoded',encoded, encoded.length);
	if (encoded.length > 31) throw Error('bytes32 string must be less than 32 bytes');
	return encoded.reduce(((acc, num) => acc + num.toString(16)), '').padEnd(64, 0);
}

export function decodeUint(bytesStr, offset) {
	const bytesSubstr = bytesStr.slice(offset, offset + 64);
	if (bytesSubstr.length == 0) return null;
	return BigInt('0x' + bytesSubstr);
}

export function decodeString(bytesStr, offset, length) {
	const bytes = bytesStr.slice(offset);
	const uint8Array = new Uint8Array(bytes.match(/.{1,2}/g).map(hex => parseInt(hex, 16)));
	return new TextDecoder().decode(uint8Array).substring(0, length);
}

export function decodeAddress(bytesStr, offset) {
	return '0x' + bytesStr.slice(offset + 24, offset + 64);
}

export function decodeAddressArray(bytesStr, offset, size) {
	const result = []
	for (let i=0; i < size; i++) {
		result.push(decodeAddress(bytesStr, offset));
		offset += 64;
	}
	return result;
}

export function decodeBytes32(bytesStr, offset) {
	const bytes = bytesStr.slice(offset, offset + 64);
	const uint8Array = new Uint8Array(bytes.match(/.{1,2}/g).map(hex => parseInt(hex, 16)));
	if (uint8Array[uint8Array.length - 1] != 0) throw Error('invalid bytes32 string - no null terminator');
	if (uint8Array.length != 32) throw Error('invalid bytes32 - not 32 bytes long');
	return new TextDecoder().decode(uint8Array);
}

export function decodeBytes32Array(bytesStr, offset, size) {
	const result = []
	for (let i=0; i < size; i++) {
		result.push(decodeBytes32(bytesStr, offset));
		offset += 64;
	}
	return result;
}

export function getChainLabel(chainId) {
	switch (chainId) {
		case "0x1": return "MAINNET"
		case "0x3": return "ROPSTEN"
	}
}