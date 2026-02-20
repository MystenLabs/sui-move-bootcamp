import { Encoding } from "./types.mjs";

//#region src/writer.d.ts
interface BcsWriterOptions {
  /** The initial size (in bytes) of the buffer tht will be allocated */
  initialSize?: number;
  /** The maximum size (in bytes) that the buffer is allowed to grow to */
  maxSize?: number;
  /** The amount of bytes that will be allocated whenever additional memory is required */
  allocateSize?: number;
}
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
declare class BcsWriter {
  private dataView;
  private bytePosition;
  private size;
  private maxSize;
  private allocateSize;
  constructor({
    initialSize,
    maxSize,
    allocateSize
  }?: BcsWriterOptions);
  private ensureSizeOrGrow;
  /**
   * Shift current cursor position by `bytes`.
   *
   * @param {Number} bytes Number of bytes to
   * @returns {this} Self for possible chaining.
   */
  shift(bytes: number): this;
  /**
   * Write a U8 value into a buffer and shift cursor position by 1.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write8(value: number | bigint): this;
  /**
   * Write a U8 value into a buffer and shift cursor position by 1.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  writeBytes(bytes: Uint8Array): this;
  /**
   * Write a U16 value into a buffer and shift cursor position by 2.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write16(value: number | bigint): this;
  /**
   * Write a U32 value into a buffer and shift cursor position by 4.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write32(value: number | bigint): this;
  /**
   * Write a U64 value into a buffer and shift cursor position by 8.
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write64(value: number | bigint): this;
  /**
   * Write a U128 value into a buffer and shift cursor position by 16.
   *
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write128(value: number | bigint): this;
  /**
   * Write a U256 value into a buffer and shift cursor position by 16.
   *
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write256(value: number | bigint): this;
  /**
   * Write a ULEB value into a buffer and shift cursor position by number of bytes
   * written.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  writeULEB(value: number): this;
  /**
   * Write a vector into a buffer by first writing the vector length and then calling
   * a callback on each passed value.
   *
   * @param {Array<Any>} vector Array of elements to write.
   * @param {WriteVecCb} cb Callback to call on each element of the vector.
   * @returns {this}
   */
  writeVec(vector: any[], cb: (writer: BcsWriter, el: any, i: number, len: number) => void): this;
  /**
   * Adds support for iterations over the object.
   * @returns {Uint8Array}
   */
  [Symbol.iterator](): Iterator<number, Iterable<number>>;
  /**
   * Get underlying buffer taking only value bytes (in case initial buffer size was bigger).
   * @returns {Uint8Array} Resulting bcs.
   */
  toBytes(): Uint8Array<ArrayBuffer>;
  /**
   * Represent data as 'hex' or 'base64'
   * @param encoding Encoding to use: 'base64' or 'hex'
   */
  toString(encoding: Encoding): string;
}
//#endregion
export { BcsWriter, BcsWriterOptions };
//# sourceMappingURL=writer.d.mts.map