import { Value } from "../../../google/protobuf/struct.mjs";
import { Package } from "./move_package.mjs";
import { Owner } from "./owner.mjs";
import { Bcs } from "./bcs.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/object.ts
var Object$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Object", [
			{
				no: 1,
				name: "bcs",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 2,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "owner",
				kind: "message",
				T: () => Owner
			},
			{
				no: 6,
				name: "object_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 7,
				name: "has_public_transfer",
				kind: "scalar",
				opt: true,
				T: 8
			},
			{
				no: 8,
				name: "contents",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 9,
				name: "package",
				kind: "message",
				T: () => Package
			},
			{
				no: 10,
				name: "previous_transaction",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 11,
				name: "storage_rebate",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 100,
				name: "json",
				kind: "message",
				T: () => Value
			},
			{
				no: 101,
				name: "balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Object
*/
const Object$1 = new Object$Type();
var ObjectSet$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ObjectSet", [{
			no: 1,
			name: "objects",
			kind: "message",
			repeat: 1,
			T: () => Object$1
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ObjectSet
*/
const ObjectSet = new ObjectSet$Type();

//#endregion
export { Object$1 as Object, ObjectSet };
//# sourceMappingURL=object.mjs.map