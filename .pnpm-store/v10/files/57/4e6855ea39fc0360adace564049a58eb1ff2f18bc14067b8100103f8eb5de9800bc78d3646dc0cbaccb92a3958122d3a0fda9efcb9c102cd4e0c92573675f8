import { bcs } from "@mysten/bcs";

//#region src/zklogin/bcs.ts
const zkLoginSignature = bcs.struct("ZkLoginSignature", {
	inputs: bcs.struct("ZkLoginSignatureInputs", {
		proofPoints: bcs.struct("ZkLoginSignatureInputsProofPoints", {
			a: bcs.vector(bcs.string()),
			b: bcs.vector(bcs.vector(bcs.string())),
			c: bcs.vector(bcs.string())
		}),
		issBase64Details: bcs.struct("ZkLoginSignatureInputsClaim", {
			value: bcs.string(),
			indexMod4: bcs.u8()
		}),
		headerBase64: bcs.string(),
		addressSeed: bcs.string()
	}),
	maxEpoch: bcs.u64(),
	userSignature: bcs.byteVector()
});

//#endregion
export { zkLoginSignature };
//# sourceMappingURL=bcs.mjs.map