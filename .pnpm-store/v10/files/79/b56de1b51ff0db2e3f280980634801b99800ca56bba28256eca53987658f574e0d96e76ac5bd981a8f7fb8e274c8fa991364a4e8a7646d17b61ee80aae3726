import { TypeTagSerializer } from "./type-tag-serializer.mjs";
import { Address, AppId, Argument, CallArg, Command, CompressedSignature, Data, GasData, Intent, IntentMessage, IntentScope, IntentVersion, MoveObject, MoveObjectType, MovePackage, MultiSig, MultiSigPkMap, MultiSigPublicKey, ObjectArg, ObjectDigest, ObjectInner, Owner, PasskeyAuthenticator, ProgrammableMoveCall, ProgrammableTransaction, PublicKey, SenderSignedData, SenderSignedTransaction, SharedObjectRef, StructTag, SuiObjectRef, TransactionData, TransactionDataV1, TransactionExpiration, TransactionKind, TypeOrigin, TypeTag, UpgradeInfo } from "./bcs.mjs";
import { TransactionEffects } from "./effects.mjs";
import { pureBcsSchemaFromTypeName } from "./pure.mjs";
import { BcsEnum, BcsStruct, BcsTuple, BcsType, bcs, compareBcsBytes } from "@mysten/bcs";

//#region src/bcs/index.ts
const suiBcs = {
	...bcs,
	U8: bcs.u8(),
	U16: bcs.u16(),
	U32: bcs.u32(),
	U64: bcs.u64(),
	U128: bcs.u128(),
	U256: bcs.u256(),
	ULEB128: bcs.uleb128(),
	Bool: bcs.bool(),
	String: bcs.string(),
	Address,
	AppId,
	Argument,
	CallArg,
	Command,
	CompressedSignature,
	Data,
	GasData,
	Intent,
	IntentMessage,
	IntentScope,
	IntentVersion,
	MoveObject,
	MoveObjectType,
	MovePackage,
	MultiSig,
	MultiSigPkMap,
	MultiSigPublicKey,
	Object: ObjectInner,
	ObjectArg,
	ObjectDigest,
	Owner,
	PasskeyAuthenticator,
	ProgrammableMoveCall,
	ProgrammableTransaction,
	PublicKey,
	SenderSignedData,
	SenderSignedTransaction,
	SharedObjectRef,
	StructTag,
	SuiObjectRef,
	TransactionData,
	TransactionDataV1,
	TransactionEffects,
	TransactionExpiration,
	TransactionKind,
	TypeOrigin,
	TypeTag,
	UpgradeInfo
};

//#endregion
export { BcsEnum, BcsStruct, BcsTuple, BcsType, TypeTagSerializer, suiBcs as bcs, compareBcsBytes, pureBcsSchemaFromTypeName };
//# sourceMappingURL=index.mjs.map