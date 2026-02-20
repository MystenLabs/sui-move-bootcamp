import { bcs as suiBcs } from "../bcs/index.mjs";
import { toHex } from "@mysten/bcs";
import { blake2b } from "@noble/hashes/blake2.js";

//#region src/utils/dynamic-fields.ts
function deriveDynamicFieldID(parentId, typeTag, key) {
	const address = suiBcs.Address.serialize(parentId).toBytes();
	const tag = suiBcs.TypeTag.serialize(typeTag).toBytes();
	const keyLength = suiBcs.u64().serialize(key.length).toBytes();
	const hash = blake2b.create({ dkLen: 32 });
	hash.update(new Uint8Array([240]));
	hash.update(address);
	hash.update(keyLength);
	hash.update(key);
	hash.update(tag);
	return `0x${toHex(hash.digest().slice(0, 32))}`;
}

//#endregion
export { deriveDynamicFieldID };
//# sourceMappingURL=dynamic-fields.mjs.map