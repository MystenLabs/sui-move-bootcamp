import { Any } from "../protobuf/any.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/google/rpc/status.ts
var Status$Type = class extends MessageType {
	constructor() {
		super("google.rpc.Status", [
			{
				no: 1,
				name: "code",
				kind: "scalar",
				T: 5
			},
			{
				no: 2,
				name: "message",
				kind: "scalar",
				T: 9
			},
			{
				no: 3,
				name: "details",
				kind: "message",
				repeat: 1,
				T: () => Any
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message google.rpc.Status
*/
const Status = new Status$Type();

//#endregion
export { Status };
//# sourceMappingURL=status.mjs.map