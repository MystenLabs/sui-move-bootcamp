import { pureBcsSchemaFromTypeName } from "../bcs/pure.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { isSerializedBcs } from "@mysten/bcs";

//#region src/transactions/pure.ts
function createPure(makePure) {
	function pure(typeOrSerializedValue, value) {
		if (typeof typeOrSerializedValue === "string") return makePure(pureBcsSchemaFromTypeName(typeOrSerializedValue).serialize(value));
		if (typeOrSerializedValue instanceof Uint8Array || isSerializedBcs(typeOrSerializedValue)) return makePure(typeOrSerializedValue);
		throw new Error("tx.pure must be called either a bcs type name, or a serialized bcs value");
	}
	pure.u8 = (value) => makePure(suiBcs.U8.serialize(value));
	pure.u16 = (value) => makePure(suiBcs.U16.serialize(value));
	pure.u32 = (value) => makePure(suiBcs.U32.serialize(value));
	pure.u64 = (value) => makePure(suiBcs.U64.serialize(value));
	pure.u128 = (value) => makePure(suiBcs.U128.serialize(value));
	pure.u256 = (value) => makePure(suiBcs.U256.serialize(value));
	pure.bool = (value) => makePure(suiBcs.Bool.serialize(value));
	pure.string = (value) => makePure(suiBcs.String.serialize(value));
	pure.address = (value) => makePure(suiBcs.Address.serialize(value));
	pure.id = pure.address;
	pure.vector = (type, value) => {
		return makePure(suiBcs.vector(pureBcsSchemaFromTypeName(type)).serialize(value));
	};
	pure.option = (type, value) => {
		return makePure(suiBcs.option(pureBcsSchemaFromTypeName(type)).serialize(value));
	};
	return pure;
}

//#endregion
export { createPure };
//# sourceMappingURL=pure.mjs.map