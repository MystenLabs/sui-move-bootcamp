import { Signer } from "../cryptography/keypair.mjs";
import { toBase64 } from "@mysten/bcs";

//#region src/multisig/signer.ts
var MultiSigSigner = class extends Signer {
	#pubkey;
	#signers;
	constructor(pubkey, signers = []) {
		super();
		this.#pubkey = pubkey;
		this.#signers = signers;
		const uniqueKeys = /* @__PURE__ */ new Set();
		let combinedWeight = 0;
		const weights = pubkey.getPublicKeys().map(({ weight, publicKey }) => ({
			weight,
			address: publicKey.toSuiAddress()
		}));
		for (const signer of signers) {
			const address = signer.toSuiAddress();
			if (uniqueKeys.has(address)) throw new Error(`Can't create MultiSigSigner with duplicate signers`);
			uniqueKeys.add(address);
			const weight = weights.find((w) => w.address === address)?.weight;
			if (!weight) throw new Error(`Signer ${address} is not part of the MultiSig public key`);
			combinedWeight += weight;
		}
		if (combinedWeight < pubkey.getThreshold()) throw new Error(`Combined weight of signers is less than threshold`);
	}
	getKeyScheme() {
		return "MultiSig";
	}
	getPublicKey() {
		return this.#pubkey;
	}
	sign(_data) {
		throw new Error("MultiSigSigner does not support signing directly. Use signTransaction or signPersonalMessage instead");
	}
	async signTransaction(bytes) {
		return {
			signature: this.#pubkey.combinePartialSignatures(await Promise.all(this.#signers.map(async (signer) => (await signer.signTransaction(bytes)).signature))),
			bytes: toBase64(bytes)
		};
	}
	async signPersonalMessage(bytes) {
		return {
			signature: this.#pubkey.combinePartialSignatures(await Promise.all(this.#signers.map(async (signer) => (await signer.signPersonalMessage(bytes)).signature))),
			bytes: toBase64(bytes)
		};
	}
};

//#endregion
export { MultiSigSigner };
//# sourceMappingURL=signer.mjs.map