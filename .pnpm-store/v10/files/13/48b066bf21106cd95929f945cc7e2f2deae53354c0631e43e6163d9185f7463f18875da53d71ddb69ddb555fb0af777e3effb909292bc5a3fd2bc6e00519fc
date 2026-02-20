import { Value } from "../../../google/protobuf/struct.mjs";
import { Bcs } from "./bcs.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/event.ts
var TransactionEvents$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TransactionEvents", [
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
				name: "events",
				kind: "message",
				repeat: 1,
				T: () => Event
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TransactionEvents
*/
const TransactionEvents = new TransactionEvents$Type();
var Event$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Event", [
			{
				no: 1,
				name: "package_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "module",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "sender",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "event_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "contents",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 6,
				name: "json",
				kind: "message",
				T: () => Value
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Event
*/
const Event = new Event$Type();

//#endregion
export { Event, TransactionEvents };
//# sourceMappingURL=event.mjs.map