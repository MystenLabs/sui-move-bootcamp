import { MessageType, PbLong, typeofJsonValue } from "@protobuf-ts/runtime";

//#region src/grpc/proto/google/protobuf/timestamp.ts
var Timestamp$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.Timestamp", [{
			no: 1,
			name: "seconds",
			kind: "scalar",
			T: 3,
			L: 0
		}, {
			no: 2,
			name: "nanos",
			kind: "scalar",
			T: 5
		}]);
	}
	/**
	* Creates a new `Timestamp` for the current time.
	*/
	now() {
		const msg = this.create();
		const ms = Date.now();
		msg.seconds = PbLong.from(Math.floor(ms / 1e3)).toBigInt();
		msg.nanos = ms % 1e3 * 1e6;
		return msg;
	}
	/**
	* Converts a `Timestamp` to a JavaScript Date.
	*/
	toDate(message) {
		return new Date(PbLong.from(message.seconds).toNumber() * 1e3 + Math.ceil(message.nanos / 1e6));
	}
	/**
	* Converts a JavaScript Date to a `Timestamp`.
	*/
	fromDate(date) {
		const msg = this.create();
		const ms = date.getTime();
		msg.seconds = PbLong.from(Math.floor(ms / 1e3)).toBigInt();
		msg.nanos = (ms % 1e3 + (ms < 0 && ms % 1e3 !== 0 ? 1e3 : 0)) * 1e6;
		return msg;
	}
	/**
	* In JSON format, the `Timestamp` type is encoded as a string
	* in the RFC 3339 format.
	*/
	internalJsonWrite(message, options) {
		let ms = PbLong.from(message.seconds).toNumber() * 1e3;
		if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) throw new Error("Unable to encode Timestamp to JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
		if (message.nanos < 0) throw new Error("Unable to encode invalid Timestamp to JSON. Nanos must not be negative.");
		let z = "Z";
		if (message.nanos > 0) {
			let nanosStr = (message.nanos + 1e9).toString().substring(1);
			if (nanosStr.substring(3) === "000000") z = "." + nanosStr.substring(0, 3) + "Z";
			else if (nanosStr.substring(6) === "000") z = "." + nanosStr.substring(0, 6) + "Z";
			else z = "." + nanosStr + "Z";
		}
		return new Date(ms).toISOString().replace(".000Z", z);
	}
	/**
	* In JSON format, the `Timestamp` type is encoded as a string
	* in the RFC 3339 format.
	*/
	internalJsonRead(json, options, target) {
		if (typeof json !== "string") throw new Error("Unable to parse Timestamp from JSON " + typeofJsonValue(json) + ".");
		let matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
		if (!matches) throw new Error("Unable to parse Timestamp from JSON. Invalid format.");
		let ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
		if (Number.isNaN(ms)) throw new Error("Unable to parse Timestamp from JSON. Invalid value.");
		if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) throw new globalThis.Error("Unable to parse Timestamp from JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
		if (!target) target = this.create();
		target.seconds = PbLong.from(ms / 1e3).toBigInt();
		target.nanos = 0;
		if (matches[7]) target.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
		return target;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.Timestamp
*/
const Timestamp = new Timestamp$Type();

//#endregion
export { Timestamp };
//# sourceMappingURL=timestamp.mjs.map