import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { SIGNATURE_FLAG_TO_SCHEME, SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.mjs";
import { PublicKey, bytesEqual } from "../cryptography/publickey.mjs";
import { toZkLoginPublicIdentifier } from "../zklogin/publickey.mjs";
import { parseSerializedSignature } from "../cryptography/signature.mjs";
import { MultiSigSigner } from "./signer.mjs";
import { publicKeyFromRawBytes } from "../verify/verify.mjs";
import { fromBase64, toBase64 } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

//#region src/multisig/publickey.ts
const MAX_SIGNER_IN_MULTISIG = 10;
const MIN_SIGNER_IN_MULTISIG = 1;
/**
* A MultiSig public key
*/
var MultiSigPublicKey = class MultiSigPublicKey extends PublicKey {
	/**
	* Create a new MultiSigPublicKey object
	*/
	constructor(value, options = {}) {
		super();
		if (typeof value === "string") {
			this.rawBytes = fromBase64(value);
			this.multisigPublicKey = suiBcs.MultiSigPublicKey.parse(this.rawBytes);
		} else if (value instanceof Uint8Array) {
			this.rawBytes = value;
			this.multisigPublicKey = suiBcs.MultiSigPublicKey.parse(this.rawBytes);
		} else {
			this.multisigPublicKey = value;
			this.rawBytes = suiBcs.MultiSigPublicKey.serialize(value).toBytes();
		}
		if (this.multisigPublicKey.threshold < 1) throw new Error("Invalid threshold");
		const seenPublicKeys = /* @__PURE__ */ new Set();
		this.publicKeys = this.multisigPublicKey.pk_map.map(({ pubKey, weight }) => {
			const [scheme, bytes] = Object.entries(pubKey).filter(([name]) => name !== "$kind")[0];
			const publicKeyStr = Uint8Array.from(bytes).toString();
			if (seenPublicKeys.has(publicKeyStr)) throw new Error(`Multisig does not support duplicate public keys`);
			seenPublicKeys.add(publicKeyStr);
			if (weight < 1) throw new Error(`Invalid weight`);
			return {
				publicKey: publicKeyFromRawBytes(scheme, Uint8Array.from(bytes), options),
				weight
			};
		});
		const totalWeight = this.publicKeys.reduce((sum, { weight }) => sum + weight, 0);
		if (this.multisigPublicKey.threshold > totalWeight) throw new Error(`Unreachable threshold`);
		if (this.publicKeys.length > MAX_SIGNER_IN_MULTISIG) throw new Error(`Max number of signers in a multisig is ${MAX_SIGNER_IN_MULTISIG}`);
		if (this.publicKeys.length < MIN_SIGNER_IN_MULTISIG) throw new Error(`Min number of signers in a multisig is ${MIN_SIGNER_IN_MULTISIG}`);
	}
	/**
	* 	A static method to create a new MultiSig publickey instance from a set of public keys and their associated weights pairs and threshold.
	*/
	static fromPublicKeys({ threshold, publicKeys }) {
		return new MultiSigPublicKey({
			pk_map: publicKeys.map(({ publicKey, weight }) => {
				return {
					pubKey: { [SIGNATURE_FLAG_TO_SCHEME[publicKey.flag()]]: publicKey.toRawBytes() },
					weight
				};
			}),
			threshold
		});
	}
	/**
	* Checks if two MultiSig public keys are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	/**
	* Return the byte array representation of the MultiSig public key
	*/
	toRawBytes() {
		return this.rawBytes;
	}
	getPublicKeys() {
		return this.publicKeys;
	}
	getThreshold() {
		return this.multisigPublicKey.threshold;
	}
	getSigner(...signers) {
		return new MultiSigSigner(this, signers);
	}
	/**
	* Return the Sui address associated with this MultiSig public key
	*/
	toSuiAddress() {
		const maxLength = 1 + 65 * MAX_SIGNER_IN_MULTISIG + 2;
		const tmp = new Uint8Array(maxLength);
		tmp.set([SIGNATURE_SCHEME_TO_FLAG["MultiSig"]]);
		tmp.set(suiBcs.u16().serialize(this.multisigPublicKey.threshold).toBytes(), 1);
		let i = 3;
		for (const { publicKey, weight } of this.publicKeys) {
			const bytes = publicKey.toSuiBytes();
			tmp.set(bytes, i);
			i += bytes.length;
			tmp.set([weight], i++);
		}
		return normalizeSuiAddress(bytesToHex(blake2b(tmp.slice(0, i), { dkLen: 32 })));
	}
	/**
	* Return the Sui address associated with this MultiSig public key
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["MultiSig"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, multisigSignature) {
		const parsed = parseSerializedSignature(multisigSignature);
		if (parsed.signatureScheme !== "MultiSig") throw new Error("Invalid signature scheme");
		const { multisig } = parsed;
		let signatureWeight = 0;
		if (!bytesEqual(suiBcs.MultiSigPublicKey.serialize(this.multisigPublicKey).toBytes(), suiBcs.MultiSigPublicKey.serialize(multisig.multisig_pk).toBytes())) return false;
		for (const { publicKey, weight, signature } of parsePartialSignatures(multisig)) {
			if (!await publicKey.verify(message, signature)) return false;
			signatureWeight += weight;
		}
		return signatureWeight >= this.multisigPublicKey.threshold;
	}
	/**
	* Combines multiple partial signatures into a single multisig, ensuring that each public key signs only once
	* and that all the public keys involved are known and valid, and then serializes multisig into the standard format
	*/
	combinePartialSignatures(signatures) {
		if (signatures.length > MAX_SIGNER_IN_MULTISIG) throw new Error(`Max number of signatures in a multisig is ${MAX_SIGNER_IN_MULTISIG}`);
		let bitmap = 0;
		const compressedSignatures = new Array(signatures.length);
		for (let i = 0; i < signatures.length; i++) {
			const parsed = parseSerializedSignature(signatures[i]);
			if (parsed.signatureScheme === "MultiSig") throw new Error("MultiSig is not supported inside MultiSig");
			let publicKey;
			if (parsed.signatureScheme === "ZkLogin") publicKey = toZkLoginPublicIdentifier(parsed.zkLogin?.addressSeed, parsed.zkLogin?.iss, { legacyAddress: false }).toRawBytes();
			else publicKey = parsed.publicKey;
			compressedSignatures[i] = { [parsed.signatureScheme]: parsed.signature };
			let publicKeyIndex;
			for (let j = 0; j < this.publicKeys.length; j++) if (bytesEqual(publicKey, this.publicKeys[j].publicKey.toRawBytes())) {
				if (bitmap & 1 << j) throw new Error("Received multiple signatures from the same public key");
				publicKeyIndex = j;
				break;
			}
			if (publicKeyIndex === void 0) throw new Error("Received signature from unknown public key");
			bitmap |= 1 << publicKeyIndex;
		}
		const multisig = {
			sigs: compressedSignatures,
			bitmap,
			multisig_pk: this.multisigPublicKey
		};
		const bytes = suiBcs.MultiSig.serialize(multisig, { maxSize: 8192 }).toBytes();
		const tmp = new Uint8Array(bytes.length + 1);
		tmp.set([SIGNATURE_SCHEME_TO_FLAG["MultiSig"]]);
		tmp.set(bytes, 1);
		return toBase64(tmp);
	}
};
/**
* Parse multisig structure into an array of individual signatures: signature scheme, the actual individual signature, public key and its weight.
*/
function parsePartialSignatures(multisig, options = {}) {
	const res = new Array(multisig.sigs.length);
	for (let i = 0; i < multisig.sigs.length; i++) {
		const [signatureScheme, signature] = Object.entries(multisig.sigs[i]).filter(([name]) => name !== "$kind")[0];
		const pkIndex = asIndices(multisig.bitmap).at(i);
		const pair = multisig.multisig_pk.pk_map[pkIndex];
		const pkBytes = Uint8Array.from(Object.values(pair.pubKey)[0]);
		if (signatureScheme === "MultiSig") throw new Error("MultiSig is not supported inside MultiSig");
		const publicKey = publicKeyFromRawBytes(signatureScheme, pkBytes, options);
		res[i] = {
			signatureScheme,
			signature: Uint8Array.from(signature),
			publicKey,
			weight: pair.weight
		};
	}
	return res;
}
function asIndices(bitmap) {
	if (bitmap < 0 || bitmap > 1024) throw new Error("Invalid bitmap");
	const res = [];
	for (let i = 0; i < 10; i++) if ((bitmap & 1 << i) !== 0) res.push(i);
	return Uint8Array.from(res);
}

//#endregion
export { MultiSigPublicKey, parsePartialSignatures };
//# sourceMappingURL=publickey.mjs.map