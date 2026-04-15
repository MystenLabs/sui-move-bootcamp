import { BcsType } from "@mysten/sui/bcs";
import { deriveObjectID } from "@mysten/sui/utils";

/**
 * Derive an object ID from a key and a type, using environment variables for package and parent object ID
 * @param keyType full type name of the Key (e.g. "DerivedObjectStructKey", "0x1::string::String", ...)
 * @param key value of the key (e.g. "0x1", "my_string", ...)
 * @param bcsHelper helper for the bcs library (e.g. bcs.Address, bcs.Uint64, ...)
 * @returns derived object ID
 */
export const deriveObjectIDFromParent = <T extends BcsType<any, any, any>>(
    keyType: string,
    key: any,
    bcsHelper: T
): string => {
    return deriveObjectID(
        process.env.PARENT_OBJECT_ID!, // parent id
        keyType, // typeTag/keyType(full type name)
        bcsHelper.serialize(key).toBytes() // key bytes
    );
};
