import { ulebEncode } from "./uleb.mjs";
import { BcsEnum, BcsStruct, BcsTuple, BcsType, bigUIntBcsType, dynamicSizeBcsType, fixedSizeBcsType, lazyBcsType, stringLikeBcsType, uIntBcsType } from "./bcs-type.mjs";

//#region src/bcs.ts
function fixedArray(size, type, options) {
	return new BcsType({
		read: (reader) => {
			const result = new Array(size);
			for (let i = 0; i < size; i++) result[i] = type.read(reader);
			return result;
		},
		write: (value, writer) => {
			for (const item of value) type.write(item, writer);
		},
		...options,
		name: options?.name ?? `${type.name}[${size}]`,
		validate: (value) => {
			options?.validate?.(value);
			if (!value || typeof value !== "object" || !("length" in value)) throw new TypeError(`Expected array, found ${typeof value}`);
			if (value.length !== size) throw new TypeError(`Expected array of length ${size}, found ${value.length}`);
		}
	});
}
function option(type) {
	return bcs.enum(`Option<${type.name}>`, {
		None: null,
		Some: type
	}).transform({
		input: (value) => {
			if (value == null) return { None: true };
			return { Some: value };
		},
		output: (value) => {
			if (value.$kind === "Some") return value.Some;
			return null;
		}
	});
}
function vector(type, options) {
	return new BcsType({
		read: (reader) => {
			const length = reader.readULEB();
			const result = new Array(length);
			for (let i = 0; i < length; i++) result[i] = type.read(reader);
			return result;
		},
		write: (value, writer) => {
			writer.writeULEB(value.length);
			for (const item of value) type.write(item, writer);
		},
		...options,
		name: options?.name ?? `vector<${type.name}>`,
		validate: (value) => {
			options?.validate?.(value);
			if (!value || typeof value !== "object" || !("length" in value)) throw new TypeError(`Expected array, found ${typeof value}`);
		}
	});
}
/**
* Compares two byte arrays using lexicographic ordering.
* This matches Rust's Ord implementation for Vec<u8>/[u8] which is used for BTreeMap key ordering.
* Comparison is done byte-by-byte first, then by length if all compared bytes are equal.
*/
function compareBcsBytes(a, b) {
	for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i];
	return a.length - b.length;
}
function map(keyType, valueType) {
	return new BcsType({
		name: `Map<${keyType.name}, ${valueType.name}>`,
		read: (reader) => {
			const length = reader.readULEB();
			const result = /* @__PURE__ */ new Map();
			for (let i = 0; i < length; i++) result.set(keyType.read(reader), valueType.read(reader));
			return result;
		},
		write: (value, writer) => {
			const entries = [...value.entries()].map(([key, val]) => [keyType.serialize(key).toBytes(), val]);
			entries.sort(([a], [b]) => compareBcsBytes(a, b));
			writer.writeULEB(entries.length);
			for (const [keyBytes, val] of entries) {
				writer.writeBytes(keyBytes);
				valueType.write(val, writer);
			}
		}
	});
}
const bcs = {
	u8(options) {
		return uIntBcsType({
			readMethod: "read8",
			writeMethod: "write8",
			size: 1,
			maxValue: 2 ** 8 - 1,
			...options,
			name: options?.name ?? "u8"
		});
	},
	u16(options) {
		return uIntBcsType({
			readMethod: "read16",
			writeMethod: "write16",
			size: 2,
			maxValue: 2 ** 16 - 1,
			...options,
			name: options?.name ?? "u16"
		});
	},
	u32(options) {
		return uIntBcsType({
			readMethod: "read32",
			writeMethod: "write32",
			size: 4,
			maxValue: 2 ** 32 - 1,
			...options,
			name: options?.name ?? "u32"
		});
	},
	u64(options) {
		return bigUIntBcsType({
			readMethod: "read64",
			writeMethod: "write64",
			size: 8,
			maxValue: 2n ** 64n - 1n,
			...options,
			name: options?.name ?? "u64"
		});
	},
	u128(options) {
		return bigUIntBcsType({
			readMethod: "read128",
			writeMethod: "write128",
			size: 16,
			maxValue: 2n ** 128n - 1n,
			...options,
			name: options?.name ?? "u128"
		});
	},
	u256(options) {
		return bigUIntBcsType({
			readMethod: "read256",
			writeMethod: "write256",
			size: 32,
			maxValue: 2n ** 256n - 1n,
			...options,
			name: options?.name ?? "u256"
		});
	},
	bool(options) {
		return fixedSizeBcsType({
			size: 1,
			read: (reader) => reader.read8() === 1,
			write: (value, writer) => writer.write8(value ? 1 : 0),
			...options,
			name: options?.name ?? "bool",
			validate: (value) => {
				options?.validate?.(value);
				if (typeof value !== "boolean") throw new TypeError(`Expected boolean, found ${typeof value}`);
			}
		});
	},
	uleb128(options) {
		return dynamicSizeBcsType({
			read: (reader) => reader.readULEB(),
			serialize: (value) => {
				return Uint8Array.from(ulebEncode(value));
			},
			...options,
			name: options?.name ?? "uleb128"
		});
	},
	bytes(size, options) {
		return fixedSizeBcsType({
			size,
			read: (reader) => reader.readBytes(size),
			write: (value, writer) => {
				writer.writeBytes(new Uint8Array(value));
			},
			...options,
			name: options?.name ?? `bytes[${size}]`,
			validate: (value) => {
				options?.validate?.(value);
				if (!value || typeof value !== "object" || !("length" in value)) throw new TypeError(`Expected array, found ${typeof value}`);
				if (value.length !== size) throw new TypeError(`Expected array of length ${size}, found ${value.length}`);
			}
		});
	},
	byteVector(options) {
		return new BcsType({
			read: (reader) => {
				const length = reader.readULEB();
				return reader.readBytes(length);
			},
			write: (value, writer) => {
				const array = new Uint8Array(value);
				writer.writeULEB(array.length);
				writer.writeBytes(array);
			},
			...options,
			name: options?.name ?? "vector<u8>",
			serializedSize: (value) => {
				const length = "length" in value ? value.length : null;
				return length == null ? null : ulebEncode(length).length + length;
			},
			validate: (value) => {
				options?.validate?.(value);
				if (!value || typeof value !== "object" || !("length" in value)) throw new TypeError(`Expected array, found ${typeof value}`);
			}
		});
	},
	string(options) {
		return stringLikeBcsType({
			toBytes: (value) => new TextEncoder().encode(value),
			fromBytes: (bytes) => new TextDecoder().decode(bytes),
			...options,
			name: options?.name ?? "string"
		});
	},
	fixedArray,
	option,
	vector,
	tuple(fields, options) {
		return new BcsTuple({
			fields,
			...options
		});
	},
	struct(name, fields, options) {
		return new BcsStruct({
			name,
			fields,
			...options
		});
	},
	enum(name, fields, options) {
		return new BcsEnum({
			name,
			fields,
			...options
		});
	},
	map,
	lazy(cb) {
		return lazyBcsType(cb);
	}
};

//#endregion
export { bcs, compareBcsBytes };
//# sourceMappingURL=bcs.mjs.map