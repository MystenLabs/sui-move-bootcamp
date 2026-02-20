import { MessageType, PbLong, typeofJsonValue } from "@protobuf-ts/runtime";

//#region src/grpc/proto/google/protobuf/duration.ts
var Duration$Type = class extends MessageType {
	constructor() {
		super("google.protobuf.Duration", [{
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
	* Encode `Duration` to JSON string like "3.000001s".
	*/
	internalJsonWrite(message, options) {
		let s = PbLong.from(message.seconds).toNumber();
		if (s > 315576e6 || s < -315576e6) throw new Error("Duration value out of range.");
		let text = message.seconds.toString();
		if (s === 0 && message.nanos < 0) text = "-" + text;
		if (message.nanos !== 0) {
			let nanosStr = Math.abs(message.nanos).toString();
			nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
			if (nanosStr.substring(3) === "000000") nanosStr = nanosStr.substring(0, 3);
			else if (nanosStr.substring(6) === "000") nanosStr = nanosStr.substring(0, 6);
			text += "." + nanosStr;
		}
		return text + "s";
	}
	/**
	* Decode `Duration` from JSON string like "3.000001s"
	*/
	internalJsonRead(json, options, target) {
		if (typeof json !== "string") throw new Error("Unable to parse Duration from JSON " + typeofJsonValue(json) + ". Expected string.");
		let match = json.match(/^(-?)([0-9]+)(?:\.([0-9]+))?s/);
		if (match === null) throw new Error("Unable to parse Duration from JSON string. Invalid format.");
		if (!target) target = this.create();
		let [, sign, secs, nanos] = match;
		let longSeconds = PbLong.from(sign + secs);
		if (longSeconds.toNumber() > 315576e6 || longSeconds.toNumber() < -315576e6) throw new Error("Unable to parse Duration from JSON string. Value out of range.");
		target.seconds = longSeconds.toBigInt();
		if (typeof nanos == "string") {
			let nanosStr = sign + nanos + "0".repeat(9 - nanos.length);
			target.nanos = parseInt(nanosStr);
		}
		return target;
	}
};
/**
* @generated MessageType for protobuf message google.protobuf.Duration
*/
const Duration = new Duration$Type();

//#endregion
export { Duration };
//# sourceMappingURL=duration.mjs.map