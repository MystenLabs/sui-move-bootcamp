import { MessageType, isJsonObject, jsonWriteOptions, typeofJsonValue } from "@protobuf-ts/runtime";

//#region src/grpc/proto/google/protobuf/any.ts
var Any$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.Any", [{
			no: 1,
			name: "type_url",
			kind: "scalar",
			T: 9
		}, {
			no: 2,
			name: "value",
			kind: "scalar",
			T: 12
		}]);
	}
	/**
	* Pack the message into a new `Any`.
	*
	* Uses 'type.googleapis.com/full.type.name' as the type URL.
	*/
	pack(message, type) {
		return {
			typeUrl: this.typeNameToUrl(type.typeName),
			value: type.toBinary(message)
		};
	}
	/**
	* Unpack the message from the `Any`.
	*/
	unpack(any, type, options) {
		if (!this.contains(any, type)) throw new Error("Cannot unpack google.protobuf.Any with typeUrl '" + any.typeUrl + "' as " + type.typeName + ".");
		return type.fromBinary(any.value, options);
	}
	/**
	* Does the given `Any` contain a packed message of the given type?
	*/
	contains(any, type) {
		if (!any.typeUrl.length) return false;
		return (typeof type == "string" ? type : type.typeName) === this.typeUrlToName(any.typeUrl);
	}
	/**
	* Convert the message to canonical JSON value.
	*
	* You have to provide the `typeRegistry` option so that the
	* packed message can be converted to JSON.
	*
	* The `typeRegistry` option is also required to read
	* `google.protobuf.Any` from JSON format.
	*/
	internalJsonWrite(any, options) {
		if (any.typeUrl === "") return {};
		let typeName = this.typeUrlToName(any.typeUrl);
		let opt = jsonWriteOptions(options);
		let type = opt.typeRegistry?.find((t) => t.typeName === typeName);
		if (!type) throw new globalThis.Error("Unable to convert google.protobuf.Any with typeUrl '" + any.typeUrl + "' to JSON. The specified type " + typeName + " is not available in the type registry.");
		let value = type.fromBinary(any.value, { readUnknownField: false });
		let json = type.internalJsonWrite(value, opt);
		if (typeName.startsWith("google.protobuf.") || !isJsonObject(json)) json = { value: json };
		json["@type"] = any.typeUrl;
		return json;
	}
	internalJsonRead(json, options, target) {
		if (!isJsonObject(json)) throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON " + typeofJsonValue(json) + ".");
		if (typeof json["@type"] != "string" || json["@type"] == "") return this.create();
		let typeName = this.typeUrlToName(json["@type"]);
		let type = options?.typeRegistry?.find((t) => t.typeName == typeName);
		if (!type) throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON. The specified type " + typeName + " is not available in the type registry.");
		let value;
		if (typeName.startsWith("google.protobuf.") && json.hasOwnProperty("value")) value = type.fromJson(json["value"], options);
		else {
			let copy = Object.assign({}, json);
			delete copy["@type"];
			value = type.fromJson(copy, options);
		}
		if (target === void 0) target = this.create();
		target.typeUrl = json["@type"];
		target.value = type.toBinary(value);
		return target;
	}
	typeNameToUrl(name) {
		if (!name.length) throw new Error("invalid type name: " + name);
		return "type.googleapis.com/" + name;
	}
	typeUrlToName(url) {
		if (!url.length) throw new Error("invalid type url: " + url);
		let slash = url.lastIndexOf("/");
		let name = slash > 0 ? url.substring(slash + 1) : url;
		if (!name.length) throw new Error("invalid type url: " + url);
		return name;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.Any
*/
const Any = new Any$Type();

//#endregion
export { Any };
//# sourceMappingURL=any.mjs.map