import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/argument.ts
/**
* @generated from protobuf enum sui.rpc.v2.Argument.ArgumentKind
*/
let Argument_ArgumentKind = /* @__PURE__ */ function(Argument_ArgumentKind$1) {
	/**
	* @generated from protobuf enum value: ARGUMENT_KIND_UNKNOWN = 0;
	*/
	Argument_ArgumentKind$1[Argument_ArgumentKind$1["ARGUMENT_KIND_UNKNOWN"] = 0] = "ARGUMENT_KIND_UNKNOWN";
	/**
	* The gas coin.
	*
	* @generated from protobuf enum value: GAS = 1;
	*/
	Argument_ArgumentKind$1[Argument_ArgumentKind$1["GAS"] = 1] = "GAS";
	/**
	* One of the input objects or primitive values (from
	* `ProgrammableTransaction` inputs).
	*
	* @generated from protobuf enum value: INPUT = 2;
	*/
	Argument_ArgumentKind$1[Argument_ArgumentKind$1["INPUT"] = 2] = "INPUT";
	/**
	* The result of another command (from `ProgrammableTransaction` commands).
	*
	* @generated from protobuf enum value: RESULT = 3;
	*/
	Argument_ArgumentKind$1[Argument_ArgumentKind$1["RESULT"] = 3] = "RESULT";
	return Argument_ArgumentKind$1;
}({});
var Argument$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Argument", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.Argument.ArgumentKind", Argument_ArgumentKind]
			},
			{
				no: 2,
				name: "input",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "result",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 4,
				name: "subresult",
				kind: "scalar",
				opt: true,
				T: 13
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Argument
*/
const Argument = new Argument$Type();

//#endregion
export { Argument, Argument_ArgumentKind };
//# sourceMappingURL=argument.mjs.map