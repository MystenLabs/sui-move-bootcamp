import { SUI_ADDRESS_LENGTH, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.mjs";
import { PublicKey } from "../cryptography/publickey.mjs";
import { normalizeZkLoginIssuer, toBigEndianBytes, toPaddedBigEndianBytes } from "./utils.mjs";
import { extractClaimValue } from "./jwt-utils.mjs";
import { parseZkLoginSignature } from "./signature.mjs";
import { fromBase64, toBase64, toHex } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

//#region src/zklogin/publickey.ts
/**
* A zkLogin public identifier
*/
var ZkLoginPublicIdentifier = class ZkLoginPublicIdentifier extends PublicKey {
	#data;
	#client;
	#legacyAddress;
	/**
	* Create a new ZkLoginPublicIdentifier object
	* @param value zkLogin public identifier as buffer or base-64 encoded string
	*/
	constructor(value, { client } = {}) {
		super();
		this.#client = client;
		if (typeof value === "string") this.#data = fromBase64(value);
		else if (value instanceof Uint8Array) this.#data = value;
		else this.#data = Uint8Array.from(value);
		this.#legacyAddress = this.#data.length !== this.#data[0] + 1 + 32;
		if (this.#legacyAddress) this.#data = normalizeZkLoginPublicKeyBytes(this.#data, false);
	}
	static fromBytes(bytes, { client, address, legacyAddress } = {}) {
		let publicKey;
		if (legacyAddress === true) publicKey = new ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, true), { client });
		else if (legacyAddress === false) publicKey = new ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, false), { client });
		else if (address) {
			publicKey = new ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, false), { client });
			if (publicKey.toSuiAddress() !== address) publicKey = new ZkLoginPublicIdentifier(normalizeZkLoginPublicKeyBytes(bytes, true), { client });
		} else publicKey = new ZkLoginPublicIdentifier(bytes, { client });
		if (address && publicKey.toSuiAddress() !== address) throw new Error("Public key bytes do not match the provided address");
		return publicKey;
	}
	static fromProof(address, proof) {
		const { issBase64Details, addressSeed } = proof;
		const iss = extractClaimValue(issBase64Details, "iss");
		const legacyPublicKey = toZkLoginPublicIdentifier(BigInt(addressSeed), iss, { legacyAddress: true });
		if (legacyPublicKey.toSuiAddress() === address) return legacyPublicKey;
		const publicKey = toZkLoginPublicIdentifier(BigInt(addressSeed), iss, { legacyAddress: false });
		if (publicKey.toSuiAddress() !== address) throw new Error("Proof does not match address");
		return publicKey;
	}
	/**
	* Checks if two zkLogin public identifiers are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	toSuiAddress() {
		if (this.#legacyAddress) return this.#toLegacyAddress();
		return super.toSuiAddress();
	}
	#toLegacyAddress() {
		const legacyBytes = normalizeZkLoginPublicKeyBytes(this.#data, true);
		const addressBytes = new Uint8Array(legacyBytes.length + 1);
		addressBytes[0] = this.flag();
		addressBytes.set(legacyBytes, 1);
		return normalizeSuiAddress(bytesToHex(blake2b(addressBytes, { dkLen: 32 })).slice(0, SUI_ADDRESS_LENGTH * 2));
	}
	/**
	* Return the byte array representation of the zkLogin public identifier
	*/
	toRawBytes() {
		return this.#data;
	}
	/**
	* Return the Sui address associated with this ZkLogin public identifier
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["ZkLogin"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(_message, _signature) {
		throw Error("does not support");
	}
	/**
	* Verifies that the signature is valid for for the provided PersonalMessage
	*/
	verifyPersonalMessage(message, signature) {
		const parsedSignature = parseSerializedZkLoginSignature(signature);
		return graphqlVerifyZkLoginSignature({
			address: new ZkLoginPublicIdentifier(parsedSignature.publicKey).toSuiAddress(),
			bytes: toBase64(message),
			signature: parsedSignature.serializedSignature,
			intentScope: "PersonalMessage",
			client: this.#client
		});
	}
	/**
	* Verifies that the signature is valid for for the provided Transaction
	*/
	verifyTransaction(transaction, signature) {
		const parsedSignature = parseSerializedZkLoginSignature(signature);
		return graphqlVerifyZkLoginSignature({
			address: new ZkLoginPublicIdentifier(parsedSignature.publicKey).toSuiAddress(),
			bytes: toBase64(transaction),
			signature: parsedSignature.serializedSignature,
			intentScope: "TransactionData",
			client: this.#client
		});
	}
	/**
	* Verifies that the public key is associated with the provided address
	*/
	verifyAddress(address) {
		return address === super.toSuiAddress() || address === this.#toLegacyAddress();
	}
};
function toZkLoginPublicIdentifier(addressSeed, iss, options) {
	if (options.legacyAddress === void 0) throw new Error("legacyAddress parameter must be specified");
	const addressSeedBytesBigEndian = options.legacyAddress ? toBigEndianBytes(addressSeed, 32) : toPaddedBigEndianBytes(addressSeed, 32);
	const issBytes = new TextEncoder().encode(normalizeZkLoginIssuer(iss));
	const tmp = new Uint8Array(1 + issBytes.length + addressSeedBytesBigEndian.length);
	tmp.set([issBytes.length], 0);
	tmp.set(issBytes, 1);
	tmp.set(addressSeedBytesBigEndian, 1 + issBytes.length);
	return new ZkLoginPublicIdentifier(tmp, options);
}
function normalizeZkLoginPublicKeyBytes(bytes, legacyAddress) {
	const issByteLength = bytes[0] + 1;
	const addressSeed = BigInt(`0x${toHex(bytes.slice(issByteLength))}`);
	const seedBytes = legacyAddress ? toBigEndianBytes(addressSeed, 32) : toPaddedBigEndianBytes(addressSeed, 32);
	const data = new Uint8Array(issByteLength + seedBytes.length);
	data.set(bytes.slice(0, issByteLength), 0);
	data.set(seedBytes, issByteLength);
	return data;
}
async function graphqlVerifyZkLoginSignature({ address, bytes, signature, intentScope, client }) {
	if (!client) throw new Error("A Sui Client (GRPC, GraphQL, or JSON RPC) is required to verify zkLogin signatures");
	const resp = await client.core.verifyZkLoginSignature({
		bytes,
		signature,
		intentScope,
		address
	});
	return resp.success === true && resp.errors.length === 0;
}
function parseSerializedZkLoginSignature(signature) {
	const bytes = typeof signature === "string" ? fromBase64(signature) : signature;
	if (bytes[0] !== SIGNATURE_SCHEME_TO_FLAG.ZkLogin) throw new Error("Invalid signature scheme");
	const { inputs, maxEpoch, userSignature } = parseZkLoginSignature(bytes.slice(1));
	const { issBase64Details, addressSeed } = inputs;
	const iss = extractClaimValue(issBase64Details, "iss");
	const publicIdentifier = toZkLoginPublicIdentifier(BigInt(addressSeed), iss, { legacyAddress: false });
	return {
		serializedSignature: toBase64(bytes),
		signatureScheme: "ZkLogin",
		zkLogin: {
			inputs,
			maxEpoch,
			userSignature,
			iss,
			addressSeed: BigInt(addressSeed)
		},
		signature: bytes,
		publicKey: publicIdentifier.toRawBytes()
	};
}

//#endregion
export { ZkLoginPublicIdentifier, parseSerializedZkLoginSignature, toZkLoginPublicIdentifier };
//# sourceMappingURL=publickey.mjs.map