import { MessageType, isJsonObject, typeofJsonValue } from "@protobuf-ts/runtime";

//#region src/grpc/proto/google/protobuf/struct.ts
/**
* `NullValue` is a singleton enumeration to represent the null value for the
* `Value` type union.
*
* The JSON representation for `NullValue` is JSON `null`.
*
* @generated from protobuf enum google.protobuf.NullValue
*/
let NullValue = /* @__PURE__ */ function(NullValue$1) {
	/**
	* Null value.
	*
	* @generated from protobuf enum value: NULL_VALUE = 0;
	*/
	NullValue$1[NullValue$1["NULL_VALUE"] = 0] = "NULL_VALUE";
	return NullValue$1;
}({});
var Struct$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.Struct", [{
			no: 1,
			name: "fields",
			kind: "map",
			K: 9,
			V: {
				kind: "message",
				T: () => Value
			}
		}]);
	}
	/**
	* Encode `Struct` to JSON object.
	*/
	internalJsonWrite(message, options) {
		let json = {};
		for (let [k, v] of Object.entries(message.fields)) json[k] = Value.toJson(v);
		return json;
	}
	/**
	* Decode `Struct` from JSON object.
	*/
	internalJsonRead(json, options, target) {
		if (!isJsonObject(json)) throw new globalThis.Error("Unable to parse message " + this.typeName + " from JSON " + typeofJsonValue(json) + ".");
		if (!target) target = this.create();
		for (let [k, v] of globalThis.Object.entries(json)) target.fields[k] = Value.fromJson(v);
		return target;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.Struct
*/
const Struct = new Struct$Type();
var Value$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.Value", [
			{
				no: 1,
				name: "null_value",
				kind: "enum",
				oneof: "kind",
				T: () => ["google.protobuf.NullValue", NullValue]
			},
			{
				no: 2,
				name: "number_value",
				kind: "scalar",
				oneof: "kind",
				T: 1
			},
			{
				no: 3,
				name: "string_value",
				kind: "scalar",
				oneof: "kind",
				T: 9
			},
			{
				no: 4,
				name: "bool_value",
				kind: "scalar",
				oneof: "kind",
				T: 8
			},
			{
				no: 5,
				name: "struct_value",
				kind: "message",
				oneof: "kind",
				T: () => Struct
			},
			{
				no: 6,
				name: "list_value",
				kind: "message",
				oneof: "kind",
				T: () => ListValue
			}
		]);
	}
	/**
	* Encode `Value` to JSON value.
	*/
	internalJsonWrite(message, options) {
		if (message.kind.oneofKind === void 0) throw new globalThis.Error();
		switch (message.kind.oneofKind) {
			case void 0: throw new globalThis.Error();
			case "boolValue": return message.kind.boolValue;
			case "nullValue": return null;
			case "numberValue":
				let numberValue = message.kind.numberValue;
				if (typeof numberValue == "number" && !Number.isFinite(numberValue)) throw new globalThis.Error();
				return numberValue;
			case "stringValue": return message.kind.stringValue;
			case "listValue":
				let listValueField = this.fields.find((f) => f.no === 6);
				if (listValueField?.kind !== "message") throw new globalThis.Error();
				return listValueField.T().toJson(message.kind.listValue);
			case "structValue":
				let structValueField = this.fields.find((f) => f.no === 5);
				if (structValueField?.kind !== "message") throw new globalThis.Error();
				return structValueField.T().toJson(message.kind.structValue);
		}
	}
	/**
	* Decode `Value` from JSON value.
	*/
	internalJsonRead(json, options, target) {
		if (!target) target = this.create();
		switch (typeof json) {
			case "number":
				target.kind = {
					oneofKind: "numberValue",
					numberValue: json
				};
				break;
			case "string":
				target.kind = {
					oneofKind: "stringValue",
					stringValue: json
				};
				break;
			case "boolean":
				target.kind = {
					oneofKind: "boolValue",
					boolValue: json
				};
				break;
			case "object":
				if (json === null) target.kind = {
					oneofKind: "nullValue",
					nullValue: NullValue.NULL_VALUE
				};
				else if (globalThis.Array.isArray(json)) target.kind = {
					oneofKind: "listValue",
					listValue: ListValue.fromJson(json)
				};
				else target.kind = {
					oneofKind: "structValue",
					structValue: Struct.fromJson(json)
				};
				break;
			default: throw new globalThis.Error("Unable to parse " + this.typeName + " from JSON " + typeofJsonValue(json));
		}
		return target;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.Value
*/
const Value = new Value$Type();
var ListValue$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.ListValue", [{
			no: 1,
			name: "values",
			kind: "message",
			repeat: 1,
			T: () => Value
		}]);
	}
	/**
	* Encode `ListValue` to JSON array.
	*/
	internalJsonWrite(message, options) {
		return message.values.map((v) => Value.toJson(v));
	}
	/**
	* Decode `ListValue` from JSON array.
	*/
	internalJsonRead(json, options, target) {
		if (!globalThis.Array.isArray(json)) throw new globalThis.Error("Unable to parse " + this.typeName + " from JSON " + typeofJsonValue(json));
		if (!target) target = this.create();
		let values = json.map((v) => Value.fromJson(v));
		target.values.push(...values);
		return target;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.ListValue
*/
const ListValue = new ListValue$Type();

//#endregion
export { Value };
//# sourceMappingURL=struct.mjs.map