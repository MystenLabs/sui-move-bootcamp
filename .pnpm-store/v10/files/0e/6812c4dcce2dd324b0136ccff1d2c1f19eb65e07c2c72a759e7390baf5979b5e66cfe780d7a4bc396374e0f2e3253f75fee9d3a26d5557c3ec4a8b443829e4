import { poseidon1, poseidon10, poseidon11, poseidon12, poseidon13, poseidon14, poseidon15, poseidon16, poseidon2, poseidon3, poseidon4, poseidon5, poseidon6, poseidon7, poseidon8, poseidon9 } from "poseidon-lite";

//#region src/zklogin/poseidon.ts
const poseidonNumToHashFN = [
	poseidon1,
	poseidon2,
	poseidon3,
	poseidon4,
	poseidon5,
	poseidon6,
	poseidon7,
	poseidon8,
	poseidon9,
	poseidon10,
	poseidon11,
	poseidon12,
	poseidon13,
	poseidon14,
	poseidon15,
	poseidon16
];
const BN254_FIELD_SIZE = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
function poseidonHash(inputs) {
	inputs.forEach((x) => {
		const b = BigInt(x);
		if (b < 0 || b >= BN254_FIELD_SIZE) throw new Error(`Element ${b} not in the BN254 field`);
	});
	const hashFN = poseidonNumToHashFN[inputs.length - 1];
	if (hashFN) return hashFN(inputs);
	else if (inputs.length <= 32) return poseidonHash([poseidonHash(inputs.slice(0, 16)), poseidonHash(inputs.slice(16))]);
	else throw new Error(`Yet to implement: Unable to hash a vector of length ${inputs.length}`);
}

//#endregion
export { poseidonHash };
//# sourceMappingURL=poseidon.mjs.map