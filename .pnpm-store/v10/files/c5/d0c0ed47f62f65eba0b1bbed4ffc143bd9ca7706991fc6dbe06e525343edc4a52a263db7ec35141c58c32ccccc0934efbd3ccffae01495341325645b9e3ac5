import { SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.mjs";
import { zkLoginSignature } from "./bcs.mjs";
import { fromBase64, toBase64 } from "@mysten/bcs";

//#region src/zklogin/signature.ts
function getZkLoginSignatureBytes({ inputs, maxEpoch, userSignature }) {
	return zkLoginSignature.serialize({
		inputs,
		maxEpoch,
		userSignature: typeof userSignature === "string" ? fromBase64(userSignature) : userSignature
	}, { maxSize: 2048 }).toBytes();
}
function getZkLoginSignature({ inputs, maxEpoch, userSignature }) {
	const bytes = getZkLoginSignatureBytes({
		inputs,
		maxEpoch,
		userSignature
	});
	const signatureBytes = new Uint8Array(bytes.length + 1);
	signatureBytes.set([SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
	signatureBytes.set(bytes, 1);
	return toBase64(signatureBytes);
}
function parseZkLoginSignature(signature) {
	return zkLoginSignature.parse(typeof signature === "string" ? fromBase64(signature) : signature);
}

//#endregion
export { getZkLoginSignature, parseZkLoginSignature };
//# sourceMappingURL=signature.mjs.map