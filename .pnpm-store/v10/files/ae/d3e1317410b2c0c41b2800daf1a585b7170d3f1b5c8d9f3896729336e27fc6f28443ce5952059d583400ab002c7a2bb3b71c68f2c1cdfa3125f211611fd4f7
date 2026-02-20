//#region src/utils/format.ts
const ELLIPSIS = "…";
function formatAddress(address) {
	if (address.length <= 6) return address;
	const offset = address.startsWith("0x") ? 2 : 0;
	return `0x${address.slice(offset, offset + 4)}${ELLIPSIS}${address.slice(-4)}`;
}
function formatDigest(digest) {
	return `${digest.slice(0, 10)}${ELLIPSIS}`;
}

//#endregion
export { formatAddress, formatDigest };
//# sourceMappingURL=format.mjs.map