//#region src/b64.ts
function fromBase64(base64String) {
	return Uint8Array.from(atob(base64String), (char) => char.charCodeAt(0));
}
const CHUNK_SIZE = 8192;
function toBase64(bytes) {
	if (bytes.length < CHUNK_SIZE) return btoa(String.fromCharCode(...bytes));
	let output = "";
	for (var i = 0; i < bytes.length; i += CHUNK_SIZE) {
		const chunk = bytes.slice(i, i + CHUNK_SIZE);
		output += String.fromCharCode(...chunk);
	}
	return btoa(output);
}

//#endregion
export { fromBase64, toBase64 };
//# sourceMappingURL=b64.mjs.map