import { jwtDecode } from "./jwt-decode.mjs";
import { normalizeZkLoginIssuer } from "./utils.mjs";

//#region src/zklogin/jwt-utils.ts
function base64UrlCharTo6Bits(base64UrlChar) {
	if (base64UrlChar.length !== 1) throw new Error("Invalid base64Url character: " + base64UrlChar);
	const index = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".indexOf(base64UrlChar);
	if (index === -1) throw new Error("Invalid base64Url character: " + base64UrlChar);
	const binaryString = index.toString(2).padStart(6, "0");
	return Array.from(binaryString).map(Number);
}
function base64UrlStringToBitVector(base64UrlString) {
	let bitVector = [];
	for (let i = 0; i < base64UrlString.length; i++) {
		const bits = base64UrlCharTo6Bits(base64UrlString.charAt(i));
		bitVector = bitVector.concat(bits);
	}
	return bitVector;
}
function decodeBase64URL(s, i) {
	if (s.length < 2) throw new Error(`Input (s = ${s}) is not tightly packed because s.length < 2`);
	let bits = base64UrlStringToBitVector(s);
	const firstCharOffset = i % 4;
	if (firstCharOffset === 0) {} else if (firstCharOffset === 1) bits = bits.slice(2);
	else if (firstCharOffset === 2) bits = bits.slice(4);
	else throw new Error(`Input (s = ${s}) is not tightly packed because i%4 = 3 (i = ${i}))`);
	const lastCharOffset = (i + s.length - 1) % 4;
	if (lastCharOffset === 3) {} else if (lastCharOffset === 2) bits = bits.slice(0, bits.length - 2);
	else if (lastCharOffset === 1) bits = bits.slice(0, bits.length - 4);
	else throw new Error(`Input (s = ${s}) is not tightly packed because (i + s.length - 1)%4 = 0 (i = ${i}))`);
	if (bits.length % 8 !== 0) throw new Error(`We should never reach here...`);
	const bytes = new Uint8Array(Math.floor(bits.length / 8));
	let currentByteIndex = 0;
	for (let i$1 = 0; i$1 < bits.length; i$1 += 8) {
		const bitChunk = bits.slice(i$1, i$1 + 8);
		const byte = parseInt(bitChunk.join(""), 2);
		bytes[currentByteIndex++] = byte;
	}
	return new TextDecoder().decode(bytes);
}
function verifyExtendedClaim(claim) {
	if (!(claim.slice(-1) === "}" || claim.slice(-1) === ",")) throw new Error("Invalid claim");
	const json = JSON.parse("{" + claim.slice(0, -1) + "}");
	if (Object.keys(json).length !== 1) throw new Error("Invalid claim");
	const key = Object.keys(json)[0];
	return [key, json[key]];
}
function extractClaimValue(claim, claimName) {
	const [name, value] = verifyExtendedClaim(decodeBase64URL(claim.value, claim.indexMod4));
	if (name !== claimName) throw new Error(`Invalid field name: found ${name} expected ${claimName}`);
	return value;
}
function decodeJwt(jwt) {
	const { iss, aud, sub, ...decodedJWT } = jwtDecode(jwt);
	if (!sub || !iss || !aud) throw new Error("Missing jwt data");
	if (Array.isArray(aud)) throw new Error("Not supported aud. Aud is an array, string was expected.");
	return {
		...decodedJWT,
		iss: normalizeZkLoginIssuer(iss),
		rawIss: iss,
		aud,
		sub
	};
}

//#endregion
export { decodeJwt, extractClaimValue };
//# sourceMappingURL=jwt-utils.mjs.map