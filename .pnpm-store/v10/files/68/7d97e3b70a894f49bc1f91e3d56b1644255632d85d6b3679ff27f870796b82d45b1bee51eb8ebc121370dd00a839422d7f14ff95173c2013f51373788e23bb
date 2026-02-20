import { TypeTagSerializer } from "../bcs/type-tag-serializer.mjs";
import { deriveDynamicFieldID } from "./dynamic-fields.mjs";

//#region src/utils/derived-objects.ts
/**
* Derive the ID of an object that has been created through `derived_object`.
*/
function deriveObjectID(parentId, typeTag, key) {
	return deriveDynamicFieldID(parentId, `0x2::derived_object::DerivedObjectKey<${typeof typeTag === "string" ? typeTag : TypeTagSerializer.tagToString(typeTag)}>`, key);
}

//#endregion
export { deriveObjectID };
//# sourceMappingURL=derived-objects.mjs.map