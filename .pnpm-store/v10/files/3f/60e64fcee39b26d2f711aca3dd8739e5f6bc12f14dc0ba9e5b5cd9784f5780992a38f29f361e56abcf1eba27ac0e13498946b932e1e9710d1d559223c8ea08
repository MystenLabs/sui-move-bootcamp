import { ulebEncode } from "./uleb.mjs";
import { BcsReader } from "./reader.mjs";
import { BcsWriter } from "./writer.mjs";
import { fromBase58, fromBase64, fromHex, toBase58, toBase64, toHex } from "@mysten/utils";

//#region src/bcs-type.ts
var BcsType = class BcsType {
	#write;
	#serialize;
	constructor(options) {
		this.name = options.name;
		this.read = options.read;
		this.serializedSize = options.serializedSize ?? (() => null);
		this.#write = options.write;
		this.#serialize = options.serialize ?? ((value, options$1) => {
			const writer = new BcsWriter({
				initialSize: this.serializedSize(value) ?? void 0,
				...options$1
			});
			this.#write(value, writer);
			return writer.toBytes();
		});
		this.validate = options.validate ?? (() => {});
	}
	write(value, writer) {
		this.validate(value);
		this.#write(value, writer);
	}
	serialize(value, options) {
		this.validate(value);
		return new SerializedBcs(this, this.#serialize(value, options));
	}
	parse(bytes) {
		const reader = new BcsReader(bytes);
		return this.read(reader);
	}
	fromHex(hex) {
		return this.parse(fromHex(hex));
	}
	fromBase58(b64) {
		return this.parse(fromBase58(b64));
	}
	fromBase64(b64) {
		return this.parse(fromBase64(b64));
	}
	transform({ name, input, output, validate }) {
		return new BcsType({
			name: name ?? this.name,
			read: (reader) => output ? output(this.read(reader)) : this.read(reader),
			write: (value, writer) => this.#write(input ? input(value) : value, writer),
			serializedSize: (value) => this.serializedSize(input ? input(value) : value),
			serialize: (value, options) => this.#serialize(input ? input(value) : value, options),
			validate: (value) => {
				validate?.(value);
				this.validate(input ? input(value) : value);
			}
		});
	}
};
const SERIALIZED_BCS_BRAND = Symbol.for("@mysten/serialized-bcs");
function isSerializedBcs(obj) {
	return !!obj && typeof obj === "object" && obj[SERIALIZED_BCS_BRAND] === true;
}
var SerializedBcs = class {
	#schema;
	#bytes;
	get [SERIALIZED_BCS_BRAND]() {
		return true;
	}
	constructor(schema, bytes) {
		this.#schema = schema;
		this.#bytes = bytes;
	}
	toBytes() {
		return this.#bytes;
	}
	toHex() {
		return toHex(this.#bytes);
	}
	toBase64() {
		return toBase64(this.#bytes);
	}
	toBase58() {
		return toBase58(this.#bytes);
	}
	parse() {
		return this.#schema.parse(this.#bytes);
	}
};
function fixedSizeBcsType({ size, ...options }) {
	return new BcsType({
		...options,
		serializedSize: () => size
	});
}
function uIntBcsType({ readMethod, writeMethod, ...options }) {
	return fixedSizeBcsType({
		...options,
		read: (reader) => reader[readMethod](),
		write: (value, writer) => writer[writeMethod](value),
		validate: (value) => {
			if (value < 0 || value > options.maxValue) throw new TypeError(`Invalid ${options.name} value: ${value}. Expected value in range 0-${options.maxValue}`);
			options.validate?.(value);
		}
	});
}
function bigUIntBcsType({ readMethod, writeMethod, ...options }) {
	return fixedSizeBcsType({
		...options,
		read: (reader) => reader[readMethod](),
		write: (value, writer) => writer[writeMethod](BigInt(value)),
		validate: (val) => {
			const value = BigInt(val);
			if (value < 0 || value > options.maxValue) throw new TypeError(`Invalid ${options.name} value: ${value}. Expected value in range 0-${options.maxValue}`);
			options.validate?.(value);
		}
	});
}
function dynamicSizeBcsType({ serialize, ...options }) {
	const type = new BcsType({
		...options,
		serialize,
		write: (value, writer) => {
			for (const byte of type.serialize(value).toBytes()) writer.write8(byte);
		}
	});
	return type;
}
function stringLikeBcsType({ toBytes, fromBytes, ...options }) {
	return new BcsType({
		...options,
		read: (reader) => {
			const length = reader.readULEB();
			return fromBytes(reader.readBytes(length));
		},
		write: (hex, writer) => {
			const bytes = toBytes(hex);
			writer.writeULEB(bytes.length);
			for (let i = 0; i < bytes.length; i++) writer.write8(bytes[i]);
		},
		serialize: (value) => {
			const bytes = toBytes(value);
			const size = ulebEncode(bytes.length);
			const result = new Uint8Array(size.length + bytes.length);
			result.set(size, 0);
			result.set(bytes, size.length);
			return result;
		},
		validate: (value) => {
			if (typeof value !== "string") throw new TypeError(`Invalid ${options.name} value: ${value}. Expected string`);
			options.validate?.(value);
		}
	});
}
function lazyBcsType(cb) {
	let lazyType = null;
	function getType() {
		if (!lazyType) lazyType = cb();
		return lazyType;
	}
	return new BcsType({
		name: "lazy",
		read: (data) => getType().read(data),
		serializedSize: (value) => getType().serializedSize(value),
		write: (value, writer) => getType().write(value, writer),
		serialize: (value, options) => getType().serialize(value, options).toBytes()
	});
}
var BcsStruct = class extends BcsType {
	constructor({ name, fields, ...options }) {
		const canonicalOrder = Object.entries(fields);
		super({
			name,
			serializedSize: (values) => {
				let total = 0;
				for (const [field, type] of canonicalOrder) {
					const size = type.serializedSize(values[field]);
					if (size == null) return null;
					total += size;
				}
				return total;
			},
			read: (reader) => {
				const result = {};
				for (const [field, type] of canonicalOrder) result[field] = type.read(reader);
				return result;
			},
			write: (value, writer) => {
				for (const [field, type] of canonicalOrder) type.write(value[field], writer);
			},
			...options,
			validate: (value) => {
				options?.validate?.(value);
				if (typeof value !== "object" || value == null) throw new TypeError(`Expected object, found ${typeof value}`);
			}
		});
	}
};
var BcsEnum = class extends BcsType {
	constructor({ fields, ...options }) {
		const canonicalOrder = Object.entries(fields);
		super({
			read: (reader) => {
				const index = reader.readULEB();
				const enumEntry = canonicalOrder[index];
				if (!enumEntry) throw new TypeError(`Unknown value ${index} for enum ${options.name}`);
				const [kind, type] = enumEntry;
				return {
					[kind]: type?.read(reader) ?? true,
					$kind: kind
				};
			},
			write: (value, writer) => {
				const [name, val] = Object.entries(value).filter(([name$1]) => Object.hasOwn(fields, name$1))[0];
				for (let i = 0; i < canonicalOrder.length; i++) {
					const [optionName, optionType] = canonicalOrder[i];
					if (optionName === name) {
						writer.writeULEB(i);
						optionType?.write(val, writer);
						return;
					}
				}
			},
			...options,
			validate: (value) => {
				options?.validate?.(value);
				if (typeof value !== "object" || value == null) throw new TypeError(`Expected object, found ${typeof value}`);
				const keys = Object.keys(value).filter((k) => value[k] !== void 0 && Object.hasOwn(fields, k));
				if (keys.length !== 1) throw new TypeError(`Expected object with one key, but found ${keys.length} for type ${options.name}}`);
				const [variant] = keys;
				if (!Object.hasOwn(fields, variant)) throw new TypeError(`Invalid enum variant ${variant}`);
			}
		});
	}
};
var BcsTuple = class extends BcsType {
	constructor({ fields, name, ...options }) {
		super({
			name: name ?? `(${fields.map((t) => t.name).join(", ")})`,
			serializedSize: (values) => {
				let total = 0;
				for (let i = 0; i < fields.length; i++) {
					const size = fields[i].serializedSize(values[i]);
					if (size == null) return null;
					total += size;
				}
				return total;
			},
			read: (reader) => {
				const result = [];
				for (const field of fields) result.push(field.read(reader));
				return result;
			},
			write: (value, writer) => {
				for (let i = 0; i < fields.length; i++) fields[i].write(value[i], writer);
			},
			...options,
			validate: (value) => {
				options?.validate?.(value);
				if (!Array.isArray(value)) throw new TypeError(`Expected array, found ${typeof value}`);
				if (value.length !== fields.length) throw new TypeError(`Expected array of length ${fields.length}, found ${value.length}`);
			}
		});
	}
};

//#endregion
export { BcsEnum, BcsStruct, BcsTuple, BcsType, SerializedBcs, bigUIntBcsType, dynamicSizeBcsType, fixedSizeBcsType, isSerializedBcs, lazyBcsType, stringLikeBcsType, uIntBcsType };
//# sourceMappingURL=bcs-type.mjs.map