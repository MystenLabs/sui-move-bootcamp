import { RpcMetadata } from "@protobuf-ts/runtime-rpc";
import { GrpcStatusCode } from "./goog-grpc-status-code";
/**
 * Create fetch API headers for a grpc-web request.
 */
export declare function createGrpcWebRequestHeader(headers: Headers, format: GrpcWebFormat, timeout: Date | number | undefined, meta?: RpcMetadata, userAgent?: string): Headers;
/**
 * Create a fetch API request body for a grpc-web request.
 *
 * Packs the serialized message into a data frame, and base64 encodes if
 * format is "text".
 */
export declare function createGrpcWebRequestBody(message: Uint8Array, format: GrpcWebFormat): Uint8Array | string;
export declare function createGrpcWebRequestBody(message: Uint8Array, format: "text"): string;
export declare function createGrpcWebRequestBody(message: Uint8Array, format: "binary"): Uint8Array;
/**
 * Parses a grpc status (code and optional text) and meta data from response
 * headers.
 *
 * If given a fetch response, checks for fetch-specific error information
 * ("type" property) and whether the "body" is null and throws a RpcError.
 */
export declare function readGrpcWebResponseHeader(fetchResponse: Response): [GrpcStatusCode | undefined, string | undefined, RpcMetadata];
export declare function readGrpcWebResponseHeader(headers: HttpHeaders, httpStatus: number, httpStatusText: string): [GrpcStatusCode | undefined, string | undefined, RpcMetadata];
/**
 * Parses a grpc status (code and optional text) and meta data from response
 * trailers.
 *
 * Response trailers are expected as a byte array, but are actually just an
 * ASCII string with HTTP headers. Just pass the data of a grpc-web trailer
 * frame.
 */
export declare function readGrpcWebResponseTrailer(data: Uint8Array): [GrpcStatusCode, string | undefined, RpcMetadata];
/**
 * A grpc-frame type. Can be used to determine type of frame emitted by
 * `readGrpcWebResponseBody()`.
 */
export declare enum GrpcWebFrame {
    DATA = 0,
    TRAILER = 128
}
/**
 * Parses a grpc-web response (unary or server streaming) from a fetch API
 * stream.
 *
 * Emits grpc-web frames.
 *
 * The returned promise resolves when the response is complete.
 */
export declare function readGrpcWebResponseBody(stream: WebResponseBodyStream, contentType: string | undefined | null, onFrame: FrameHandler): Promise<void>;
export interface StreamReader<T> {
    next(): Promise<StreamReaderNextResult<T>>;
}
export declare type StreamReaderNextResult<T> = StreamReaderNextValueResult<T> | StreamReaderNextDoneResult<T>;
interface StreamReaderNextValueResult<T> {
    done: true;
    value?: T;
}
interface StreamReaderNextDoneResult<T> {
    done: false;
    value: T;
}
export interface FrameHandler {
    (type: GrpcWebFrame, data: Uint8Array): void;
}
interface NodeReadableStream<T> {
    [Symbol.asyncIterator](): {
        next(): Promise<StreamReaderNextResult<T>>;
    };
}
declare type WebResponseBodyStream = ReadableStream<Uint8Array> | NodeReadableStream<Uint8Array>;
declare type GrpcWebFormat = "text" | "binary";
declare type HttpHeaders = {
    [key: string]: string | string[];
};
export {};
