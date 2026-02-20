import { fromBase58, fromBase64, fromHex, toBase58, toBase64, toHex } from "@mysten/utils";

//#region src/utils.ts
/**
* Encode data with either `hex` or `base64`.
*
* @param {Uint8Array} data Data to encode.
* @param {String} encoding Encoding to use: base64 or hex
* @returns {String} Encoded value.
*/
function encodeStr(data, encoding) {
	switch (encoding) {
		case "base58": return toBase58(data);
		case "base64": return toBase64(data);
		case "hex": return toHex(data);
		default: throw new Error("Unsupported encoding, supported values are: base64, hex");
	}
}
/**
* Decode either `base64` or `hex` data.
*
* @param {String} data Data to encode.
* @param {String} encoding Encoding to use: base64 or hex
* @returns {Uint8Array} Encoded value.
*/
function decodeStr(data, encoding) {
	switch (encoding) {
		case "base58": return fromBase58(data);
		case "base64": return fromBase64(data);
		case "hex": return fromHex(data);
		default: throw new Error("Unsupported encoding, supported values are: base64, hex");
	}
}
function splitGenericParameters(str, genericSeparators = ["<", ">"]) {
	const [left, right] = genericSeparators;
	const tok = [];
	let word = "";
	let nestedAngleBrackets = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (char === left) nestedAngleBrackets++;
		if (char === right) nestedAngleBrackets--;
		if (nestedAngleBrackets === 0 && char === ",") {
			tok.push(word.trim());
			word = "";
			continue;
		}
		word += char;
	}
	tok.push(word.trim());
	return tok;
}

//#endregion
export { decodeStr, encodeStr, splitGenericParameters };
//# sourceMappingURL=utils.mjs.map