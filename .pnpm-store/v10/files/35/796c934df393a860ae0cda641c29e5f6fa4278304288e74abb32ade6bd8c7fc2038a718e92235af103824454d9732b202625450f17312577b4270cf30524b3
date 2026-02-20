import { Bcs } from "./bcs.mjs";
import { UserSignature } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/checkpoint_contents.ts
var CheckpointContents$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CheckpointContents", [
			{
				no: 1,
				name: "bcs",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 2,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 5
			},
			{
				no: 4,
				name: "transactions",
				kind: "message",
				repeat: 1,
				T: () => CheckpointedTransactionInfo
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CheckpointContents
*/
const CheckpointContents = new CheckpointContents$Type();
var CheckpointedTransactionInfo$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CheckpointedTransactionInfo", [
			{
				no: 1,
				name: "transaction",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "effects",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "signatures",
				kind: "message",
				repeat: 1,
				T: () => UserSignature
			},
			{
				no: 4,
				name: "address_aliases_versions",
				kind: "message",
				repeat: 1,
				T: () => AddressAliasesVersion
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CheckpointedTransactionInfo
*/
const CheckpointedTransactionInfo = new CheckpointedTransactionInfo$Type();
var AddressAliasesVersion$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.AddressAliasesVersion", [{
			no: 1,
			name: "version",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.AddressAliasesVersion
*/
const AddressAliasesVersion = new AddressAliasesVersion$Type();

//#endregion
export { AddressAliasesVersion, CheckpointContents, CheckpointedTransactionInfo };
//# sourceMappingURL=checkpoint_contents.mjs.map