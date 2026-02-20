import { ulebEncode } from "./uleb.mjs";
import { encodeStr } from "./utils.mjs";

//#region src/writer.ts
/**
* Class used to write BCS data into a buffer. Initializer requires
* some size of a buffer to init; default value for this buffer is 1KB.
*
* Most methods are chainable, so it is possible to write them in one go.
*
* @example
* let serialized = new BcsWriter()
*   .write8(10)
*   .write32(1000000)
*   .write64(10000001000000)
*   .hex();
*/
/**
* Set of methods that allows data encoding/decoding as standalone
* BCS value or a part of a composed structure/vector.
*/
var BcsWriter = class {
	constructor({ initialSize = 1024, maxSize = Infinity, allocateSize = 1024 } = {}) {
		this.bytePosition = 0;
		this.size = initialSize;
		this.maxSize = maxSize;
		this.allocateSize = allocateSize;
		this.dataView = new DataView(new ArrayBuffer(initialSize));
	}
	ensureSizeOrGrow(bytes) {
		const requiredSize = this.bytePosition + bytes;
		if (requiredSize > this.size) {
			const nextSize = Math.min(this.maxSize, Math.max(this.size + requiredSize, this.size + this.allocateSize));
			if (requiredSize > nextSize) throw new Error(`Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${requiredSize}`);
			this.size = nextSize;
			const nextBuffer = new ArrayBuffer(this.size);
			new Uint8Array(nextBuffer).set(new Uint8Array(this.dataView.buffer));
			this.dataView = new DataView(nextBuffer);
		}
	}
	/**
	* Shift current cursor position by `bytes`.
	*
	* @param {Number} bytes Number of bytes to
	* @returns {this} Self for possible chaining.
	*/
	shift(bytes) {
		this.bytePosition += bytes;
		return this;
	}
	/**
	* Write a U8 value into a buffer and shift cursor position by 1.
	* @param {Number} value Value to write.
	* @returns {this}
	*/
	write8(value) {
		this.ensureSizeOrGrow(1);
		this.dataView.setUint8(this.bytePosition, Number(value));
		return this.shift(1);
	}
	/**
	* Write a U8 value into a buffer and shift cursor position by 1.
	* @param {Number} value Value to write.
	* @returns {this}
	*/
	writeBytes(bytes) {
		this.ensureSizeOrGrow(bytes.length);
		for (let i = 0; i < bytes.length; i++) this.dataView.setUint8(this.bytePosition + i, bytes[i]);
		return this.shift(bytes.length);
	}
	/**
	* Write a U16 value into a buffer and shift cursor position by 2.
	* @param {Number} value Value to write.
	* @returns {this}
	*/
	write16(value) {
		this.ensureSizeOrGrow(2);
		this.dataView.setUint16(this.bytePosition, Number(value), true);
		return this.shift(2);
	}
	/**
	* Write a U32 value into a buffer and shift cursor position by 4.
	* @param {Number} value Value to write.
	* @returns {this}
	*/
	write32(value) {
		this.ensureSizeOrGrow(4);
		this.dataView.setUint32(this.bytePosition, Number(value), true);
		return this.shift(4);
	}
	/**
	* Write a U64 value into a buffer and shift cursor position by 8.
	* @param {bigint} value Value to write.
	* @returns {this}
	*/
	write64(value) {
		toLittleEndian(BigInt(value), 8).forEach((el) => this.write8(el));
		return this;
	}
	/**
	* Write a U128 value into a buffer and shift cursor position by 16.
	*
	* @param {bigint} value Value to write.
	* @returns {this}
	*/
	write128(value) {
		toLittleEndian(BigInt(value), 16).forEach((el) => this.write8(el));
		return this;
	}
	/**
	* Write a U256 value into a buffer and shift cursor position by 16.
	*
	* @param {bigint} value Value to write.
	* @returns {this}
	*/
	write256(value) {
		toLittleEndian(BigInt(value), 32).forEach((el) => this.write8(el));
		return this;
	}
	/**
	* Write a ULEB value into a buffer and shift cursor position by number of bytes
	* written.
	* @param {Number} value Value to write.
	* @returns {this}
	*/
	writeULEB(value) {
		ulebEncode(value).forEach((el) => this.write8(el));
		return this;
	}
	/**
	* Write a vector into a buffer by first writing the vector length and then calling
	* a callback on each passed value.
	*
	* @param {Array<Any>} vector Array of elements to write.
	* @param {WriteVecCb} cb Callback to call on each element of the vector.
	* @returns {this}
	*/
	writeVec(vector, cb) {
		this.writeULEB(vector.length);
		Array.from(vector).forEach((el, i) => cb(this, el, i, vector.length));
		return this;
	}
	/**
	* Adds support for iterations over the object.
	* @returns {Uint8Array}
	*/
	*[Symbol.iterator]() {
		for (let i = 0; i < this.bytePosition; i++) yield this.dataView.getUint8(i);
		return this.toBytes();
	}
	/**
	* Get underlying buffer taking only value bytes (in case initial buffer size was bigger).
	* @returns {Uint8Array} Resulting bcs.
	*/
	toBytes() {
		return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition));
	}
	/**
	* Represent data as 'hex' or 'base64'
	* @param encoding Encoding to use: 'base64' or 'hex'
	*/
	toString(encoding) {
		return encodeStr(this.toBytes(), encoding);
	}
};
function toLittleEndian(bigint, size) {
	const result = new Uint8Array(size);
	let i = 0;
	while (bigint > 0) {
		result[i] = Number(bigint % BigInt(256));
		bigint = bigint / BigInt(256);
		i += 1;
	}
	return result;
}

//#endregion
export { BcsWriter };
//# sourceMappingURL=writer.mjs.map