import { SUI_ADDRESS_LENGTH, isValidSuiAddress, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { TypeTagSerializer } from "./type-tag-serializer.mjs";
import { bcs, fromBase58, fromBase64, fromHex, toBase58, toBase64, toHex } from "@mysten/bcs";

//#region src/bcs/bcs.ts
function unsafe_u64(options) {
	return bcs.u64({
		name: "unsafe_u64",
		...options
	}).transform({
		input: (val) => val,
		output: (val) => Number(val)
	});
}
function optionEnum(type) {
	return bcs.enum("Option", {
		None: null,
		Some: type
	});
}
const Address = bcs.bytes(SUI_ADDRESS_LENGTH).transform({
	validate: (val) => {
		const address = typeof val === "string" ? val : toHex(val);
		if (!address || !isValidSuiAddress(normalizeSuiAddress(address))) throw new Error(`Invalid Sui address ${address}`);
	},
	input: (val) => typeof val === "string" ? fromHex(normalizeSuiAddress(val)) : val,
	output: (val) => normalizeSuiAddress(toHex(val))
});
const ObjectDigest = bcs.byteVector().transform({
	name: "ObjectDigest",
	input: (value) => fromBase58(value),
	output: (value) => toBase58(new Uint8Array(value)),
	validate: (value) => {
		if (fromBase58(value).length !== 32) throw new Error("ObjectDigest must be 32 bytes");
	}
});
const SuiObjectRef = bcs.struct("SuiObjectRef", {
	objectId: Address,
	version: bcs.u64(),
	digest: ObjectDigest
});
const SharedObjectRef = bcs.struct("SharedObjectRef", {
	objectId: Address,
	initialSharedVersion: bcs.u64(),
	mutable: bcs.bool()
});
const ObjectArg = bcs.enum("ObjectArg", {
	ImmOrOwnedObject: SuiObjectRef,
	SharedObject: SharedObjectRef,
	Receiving: SuiObjectRef
});
const Owner = bcs.enum("Owner", {
	AddressOwner: Address,
	ObjectOwner: Address,
	Shared: bcs.struct("Shared", { initialSharedVersion: bcs.u64() }),
	Immutable: null,
	ConsensusAddressOwner: bcs.struct("ConsensusAddressOwner", {
		startVersion: bcs.u64(),
		owner: Address
	})
});
const Reservation = bcs.enum("Reservation", { MaxAmountU64: bcs.u64() });
const WithdrawalType = bcs.enum("WithdrawalType", { Balance: bcs.lazy(() => TypeTag) });
const WithdrawFrom = bcs.enum("WithdrawFrom", {
	Sender: null,
	Sponsor: null
});
const FundsWithdrawal = bcs.struct("FundsWithdrawal", {
	reservation: Reservation,
	typeArg: WithdrawalType,
	withdrawFrom: WithdrawFrom
});
const CallArg = bcs.enum("CallArg", {
	Pure: bcs.struct("Pure", { bytes: bcs.byteVector().transform({
		input: (val) => typeof val === "string" ? fromBase64(val) : val,
		output: (val) => toBase64(new Uint8Array(val))
	}) }),
	Object: ObjectArg,
	FundsWithdrawal
});
const InnerTypeTag = bcs.enum("TypeTag", {
	bool: null,
	u8: null,
	u64: null,
	u128: null,
	address: null,
	signer: null,
	vector: bcs.lazy(() => InnerTypeTag),
	struct: bcs.lazy(() => StructTag),
	u16: null,
	u32: null,
	u256: null
});
const TypeTag = InnerTypeTag.transform({
	input: (typeTag) => typeof typeTag === "string" ? TypeTagSerializer.parseFromStr(typeTag, true) : typeTag,
	output: (typeTag) => TypeTagSerializer.tagToString(typeTag)
});
const Argument = bcs.enum("Argument", {
	GasCoin: null,
	Input: bcs.u16(),
	Result: bcs.u16(),
	NestedResult: bcs.tuple([bcs.u16(), bcs.u16()])
});
const ProgrammableMoveCall = bcs.struct("ProgrammableMoveCall", {
	package: Address,
	module: bcs.string(),
	function: bcs.string(),
	typeArguments: bcs.vector(TypeTag),
	arguments: bcs.vector(Argument)
});
const Command = bcs.enum("Command", {
	MoveCall: ProgrammableMoveCall,
	TransferObjects: bcs.struct("TransferObjects", {
		objects: bcs.vector(Argument),
		address: Argument
	}),
	SplitCoins: bcs.struct("SplitCoins", {
		coin: Argument,
		amounts: bcs.vector(Argument)
	}),
	MergeCoins: bcs.struct("MergeCoins", {
		destination: Argument,
		sources: bcs.vector(Argument)
	}),
	Publish: bcs.struct("Publish", {
		modules: bcs.vector(bcs.byteVector().transform({
			input: (val) => typeof val === "string" ? fromBase64(val) : val,
			output: (val) => toBase64(new Uint8Array(val))
		})),
		dependencies: bcs.vector(Address)
	}),
	MakeMoveVec: bcs.struct("MakeMoveVec", {
		type: optionEnum(TypeTag).transform({
			input: (val) => val === null ? { None: true } : { Some: val },
			output: (val) => val.Some ?? null
		}),
		elements: bcs.vector(Argument)
	}),
	Upgrade: bcs.struct("Upgrade", {
		modules: bcs.vector(bcs.byteVector().transform({
			input: (val) => typeof val === "string" ? fromBase64(val) : val,
			output: (val) => toBase64(new Uint8Array(val))
		})),
		dependencies: bcs.vector(Address),
		package: Address,
		ticket: Argument
	})
});
const ProgrammableTransaction = bcs.struct("ProgrammableTransaction", {
	inputs: bcs.vector(CallArg),
	commands: bcs.vector(Command)
});
const TransactionKind = bcs.enum("TransactionKind", {
	ProgrammableTransaction,
	ChangeEpoch: null,
	Genesis: null,
	ConsensusCommitPrologue: null
});
const ValidDuring = bcs.struct("ValidDuring", {
	minEpoch: bcs.option(bcs.u64()),
	maxEpoch: bcs.option(bcs.u64()),
	minTimestamp: bcs.option(bcs.u64()),
	maxTimestamp: bcs.option(bcs.u64()),
	chain: ObjectDigest,
	nonce: bcs.u32()
});
const TransactionExpiration = bcs.enum("TransactionExpiration", {
	None: null,
	Epoch: unsafe_u64(),
	ValidDuring
});
const StructTag = bcs.struct("StructTag", {
	address: Address,
	module: bcs.string(),
	name: bcs.string(),
	typeParams: bcs.vector(InnerTypeTag)
});
const GasData = bcs.struct("GasData", {
	payment: bcs.vector(SuiObjectRef),
	owner: Address,
	price: bcs.u64(),
	budget: bcs.u64()
});
const TransactionDataV1 = bcs.struct("TransactionDataV1", {
	kind: TransactionKind,
	sender: Address,
	gasData: GasData,
	expiration: TransactionExpiration
});
const TransactionData = bcs.enum("TransactionData", { V1: TransactionDataV1 });
const IntentScope = bcs.enum("IntentScope", {
	TransactionData: null,
	TransactionEffects: null,
	CheckpointSummary: null,
	PersonalMessage: null
});
const IntentVersion = bcs.enum("IntentVersion", { V0: null });
const AppId = bcs.enum("AppId", { Sui: null });
const Intent = bcs.struct("Intent", {
	scope: IntentScope,
	version: IntentVersion,
	appId: AppId
});
function IntentMessage(T) {
	return bcs.struct(`IntentMessage<${T.name}>`, {
		intent: Intent,
		value: T
	});
}
const CompressedSignature = bcs.enum("CompressedSignature", {
	ED25519: bcs.bytes(64),
	Secp256k1: bcs.bytes(64),
	Secp256r1: bcs.bytes(64),
	ZkLogin: bcs.byteVector(),
	Passkey: bcs.byteVector()
});
const PublicKey = bcs.enum("PublicKey", {
	ED25519: bcs.bytes(32),
	Secp256k1: bcs.bytes(33),
	Secp256r1: bcs.bytes(33),
	ZkLogin: bcs.byteVector(),
	Passkey: bcs.bytes(33)
});
const MultiSigPkMap = bcs.struct("MultiSigPkMap", {
	pubKey: PublicKey,
	weight: bcs.u8()
});
const MultiSigPublicKey = bcs.struct("MultiSigPublicKey", {
	pk_map: bcs.vector(MultiSigPkMap),
	threshold: bcs.u16()
});
const MultiSig = bcs.struct("MultiSig", {
	sigs: bcs.vector(CompressedSignature),
	bitmap: bcs.u16(),
	multisig_pk: MultiSigPublicKey
});
const base64String = bcs.byteVector().transform({
	input: (val) => typeof val === "string" ? fromBase64(val) : val,
	output: (val) => toBase64(new Uint8Array(val))
});
const SenderSignedTransaction = bcs.struct("SenderSignedTransaction", {
	intentMessage: IntentMessage(TransactionData),
	txSignatures: bcs.vector(base64String)
});
const SenderSignedData = bcs.vector(SenderSignedTransaction, { name: "SenderSignedData" });
const PasskeyAuthenticator = bcs.struct("PasskeyAuthenticator", {
	authenticatorData: bcs.byteVector(),
	clientDataJson: bcs.string(),
	userSignature: bcs.byteVector()
});
const MoveObjectType = bcs.enum("MoveObjectType", {
	Other: StructTag,
	GasCoin: null,
	StakedSui: null,
	Coin: TypeTag,
	AccumulatorBalanceWrapper: null
});
const TypeOrigin = bcs.struct("TypeOrigin", {
	moduleName: bcs.string(),
	datatypeName: bcs.string(),
	package: Address
});
const UpgradeInfo = bcs.struct("UpgradeInfo", {
	upgradedId: Address,
	upgradedVersion: bcs.u64()
});
const MovePackage = bcs.struct("MovePackage", {
	id: Address,
	version: bcs.u64(),
	moduleMap: bcs.map(bcs.string(), bcs.byteVector()),
	typeOriginTable: bcs.vector(TypeOrigin),
	linkageTable: bcs.map(Address, UpgradeInfo)
});
const MoveObject = bcs.struct("MoveObject", {
	type: MoveObjectType,
	hasPublicTransfer: bcs.bool(),
	version: bcs.u64(),
	contents: bcs.byteVector()
});
const Data = bcs.enum("Data", {
	Move: MoveObject,
	Package: MovePackage
});
const ObjectInner = bcs.struct("ObjectInner", {
	data: Data,
	owner: Owner,
	previousTransaction: ObjectDigest,
	storageRebate: bcs.u64()
});

//#endregion
export { Address, AppId, Argument, CallArg, Command, CompressedSignature, Data, GasData, Intent, IntentMessage, IntentScope, IntentVersion, MoveObject, MoveObjectType, MovePackage, MultiSig, MultiSigPkMap, MultiSigPublicKey, ObjectArg, ObjectDigest, ObjectInner, Owner, PasskeyAuthenticator, ProgrammableMoveCall, ProgrammableTransaction, PublicKey, SenderSignedData, SenderSignedTransaction, SharedObjectRef, StructTag, SuiObjectRef, TransactionData, TransactionDataV1, TransactionExpiration, TransactionKind, TypeOrigin, TypeTag, UpgradeInfo };
//# sourceMappingURL=bcs.mjs.map