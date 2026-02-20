//#region src/uleb.ts
function ulebEncode(num) {
	let bigNum = BigInt(num);
	const arr = [];
	let len = 0;
	if (bigNum === 0n) return [0];
	while (bigNum > 0) {
		arr[len] = Number(bigNum & 127n);
		bigNum >>= 7n;
		if (bigNum > 0n) arr[len] |= 128;
		len += 1;
	}
	return arr;
}
function ulebDecode(arr) {
	let total = 0n;
	let shift = 0n;
	let len = 0;
	while (true) {
		if (len >= arr.length) throw new Error("ULEB decode error: buffer overflow");
		const byte = arr[len];
		len += 1;
		total += BigInt(byte & 127) << shift;
		if ((byte & 128) === 0) break;
		shift += 7n;
	}
	if (total > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("ULEB decode error: value exceeds MAX_SAFE_INTEGER");
	return {
		value: Number(total),
		length: len
	};
}

//#endregion
export { ulebDecode, ulebEncode };
//# sourceMappingURL=uleb.mjs.map