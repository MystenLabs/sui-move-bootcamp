//#region src/hex.ts
function fromHex(hexStr) {
	const normalized = hexStr.startsWith("0x") ? hexStr.slice(2) : hexStr;
	const padded = normalized.length % 2 === 0 ? normalized : `0${normalized}`;
	const intArr = padded.match(/[0-9a-fA-F]{2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
	if (intArr.length !== padded.length / 2) throw new Error(`Invalid hex string ${hexStr}`);
	return Uint8Array.from(intArr);
}
function toHex(bytes) {
	return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}

//#endregion
export { fromHex, toHex };
//# sourceMappingURL=hex.mjs.map