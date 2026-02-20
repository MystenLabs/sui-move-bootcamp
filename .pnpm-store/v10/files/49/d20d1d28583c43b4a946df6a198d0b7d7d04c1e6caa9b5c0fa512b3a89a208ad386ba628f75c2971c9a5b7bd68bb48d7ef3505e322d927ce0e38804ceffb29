var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { base64decode, base64encode } from "@protobuf-ts/runtime";
import { RpcError } from "@protobuf-ts/runtime-rpc";
import { GrpcStatusCode } from "./goog-grpc-status-code";
/**
 * Create fetch API headers for a grpc-web request.
 */
export function createGrpcWebRequestHeader(headers, format, timeout, meta, userAgent) {
    // add meta as headers
    if (meta) {
        for (let [k, v] of Object.entries(meta)) {
            if (typeof v == "string")
                headers.append(k, v);
            else
                for (let i of v)
                    headers.append(k, i);
        }
    }
    // set standard headers (possibly overwriting meta)
    headers.set('Content-Type', format === "text" ? "application/grpc-web-text" : "application/grpc-web+proto");
    if (format == "text") {
        // The client library should indicate to the server via the "Accept" header that
        // the response stream needs to be text encoded e.g. when XHR is used or due to
        // security policies with XHR
        headers.set("Accept", "application/grpc-web-text");
    }
    headers.set('X-Grpc-Web', "1");
    if (userAgent)
        headers.set("X-User-Agent", userAgent);
    if (typeof timeout === "number") {
        if (timeout <= 0) {
            // we raise an error ourselves because header "grpc-timeout" must be a positive integer
            throw new RpcError(`timeout ${timeout} ms exceeded`, GrpcStatusCode[GrpcStatusCode.DEADLINE_EXCEEDED]);
        }
        headers.set('grpc-timeout', `${timeout}m`);
    }
    else if (timeout) {
        const deadline = timeout.getTime();
        const now = Date.now();
        if (deadline <= now) {
            // we raise an error ourselves because header "grpc-timeout" must be a positive integer
            throw new RpcError(`deadline ${timeout} exceeded`, GrpcStatusCode[GrpcStatusCode.DEADLINE_EXCEEDED]);
        }
        headers.set('grpc-timeout', `${deadline - now}m`);
    }
    return headers;
}
export function createGrpcWebRequestBody(message, format) {
    let body = new Uint8Array(5 + message.length); // we need 5 bytes for frame type + message length
    body[0] = GrpcWebFrame.DATA; // first byte is frame type
    // 4 bytes message length
    for (let msgLen = message.length, i = 4; i > 0; i--) {
        body[i] = (msgLen % 256);
        msgLen >>>= 8;
    }
    body.set(message, 5); // reset is message
    return format === "binary" ? body : base64encode(body);
}
export function readGrpcWebResponseHeader(headersOrFetchResponse, httpStatus, httpStatusText) {
    if (arguments.length === 1) {
        let fetchResponse = headersOrFetchResponse;
        // Cloudflare Workers throw when the type property of a fetch response
        // is accessed, so wrap access with try/catch. See:
        // * https://developers.cloudflare.com/workers/runtime-apis/response/#properties
        // * https://github.com/cloudflare/miniflare/blob/72f046e/packages/core/src/standards/http.ts#L646
        let responseType;
        try {
            responseType = fetchResponse.type;
        }
        catch (_a) { }
        switch (responseType) {
            case "error":
            case "opaque":
            case "opaqueredirect":
                // see https://developer.mozilla.org/en-US/docs/Web/API/Response/type
                throw new RpcError(`fetch response type ${fetchResponse.type}`, GrpcStatusCode[GrpcStatusCode.UNKNOWN]);
        }
        return readGrpcWebResponseHeader(fetchHeadersToHttp(fetchResponse.headers), fetchResponse.status, fetchResponse.statusText);
    }
    let headers = headersOrFetchResponse, httpOk = httpStatus >= 200 && httpStatus < 300, responseMeta = parseMetadata(headers), [statusCode, statusDetail] = parseStatus(headers);
    if ((statusCode === undefined || statusCode === GrpcStatusCode.OK) && !httpOk) {
        statusCode = httpStatusToGrpc(httpStatus);
        statusDetail = httpStatusText;
    }
    return [statusCode, statusDetail, responseMeta];
}
/**
 * Parses a grpc status (code and optional text) and meta data from response
 * trailers.
 *
 * Response trailers are expected as a byte array, but are actually just an
 * ASCII string with HTTP headers. Just pass the data of a grpc-web trailer
 * frame.
 */
export function readGrpcWebResponseTrailer(data) {
    let headers = parseTrailer(data), [code, detail] = parseStatus(headers), meta = parseMetadata(headers);
    return [code !== null && code !== void 0 ? code : GrpcStatusCode.OK, detail, meta];
}
/**
 * A grpc-frame type. Can be used to determine type of frame emitted by
 * `readGrpcWebResponseBody()`.
 */
export var GrpcWebFrame;
(function (GrpcWebFrame) {
    GrpcWebFrame[GrpcWebFrame["DATA"] = 0] = "DATA";
    GrpcWebFrame[GrpcWebFrame["TRAILER"] = 128] = "TRAILER";
})(GrpcWebFrame || (GrpcWebFrame = {}));
/**
 * Parses a grpc-web response (unary or server streaming) from a fetch API
 * stream.
 *
 * Emits grpc-web frames.
 *
 * The returned promise resolves when the response is complete.
 */
export function readGrpcWebResponseBody(stream, contentType, onFrame) {
    return __awaiter(this, void 0, void 0, function* () {
        let streamReader, base64queue = "", byteQueue = new Uint8Array(0), format = parseFormat(contentType);
        // allows to read streams from the 'node-fetch' polyfill which uses
        // node.js ReadableStream instead of the what-wg streams api ReadableStream
        if (isReadableStream(stream)) {
            let whatWgReadableStream = stream.getReader();
            streamReader = {
                next: () => whatWgReadableStream.read()
            };
        }
        else {
            streamReader = stream[Symbol.asyncIterator]();
        }
        while (true) {
            let result = yield streamReader.next();
            if (result.value !== undefined) {
                if (format === "text") {
                    // the statements below just decode base64 and append to `bytesUnread`
                    // add incoming base64 to queue
                    for (let i = 0; i < result.value.length; i++)
                        base64queue += String.fromCharCode(result.value[i]);
                    // if the base64 queue is not a multiple of 4,
                    // we have to wait for more data
                    let safeLen = base64queue.length - base64queue.length % 4;
                    if (safeLen === 0)
                        continue;
                    // decode safe chunk of base64 and add to byte queue
                    byteQueue = concatBytes(byteQueue, base64decode(base64queue.substring(0, safeLen)));
                    base64queue = base64queue.substring(safeLen);
                }
                else {
                    byteQueue = concatBytes(byteQueue, result.value);
                }
                // read all fully available data frames
                while (byteQueue.length >= 5 && byteQueue[0] === GrpcWebFrame.DATA) {
                    let msgLen = 0;
                    for (let i = 1; i < 5; i++)
                        msgLen = (msgLen << 8) + byteQueue[i];
                    if (byteQueue.length - 5 >= msgLen) {
                        // we have the entire message
                        onFrame(GrpcWebFrame.DATA, byteQueue.subarray(5, 5 + msgLen));
                        byteQueue = byteQueue.subarray(5 + msgLen);
                    }
                    else
                        break; //  wait for more data
                }
            }
            // exit, but emit trailer if exists
            if (result.done) {
                if (byteQueue.length === 0)
                    break;
                if (byteQueue[0] !== GrpcWebFrame.TRAILER || byteQueue.length < 5)
                    throw new RpcError("premature EOF", GrpcStatusCode[GrpcStatusCode.DATA_LOSS]);
                onFrame(GrpcWebFrame.TRAILER, byteQueue.subarray(5));
                break;
            }
        }
    });
}
// internal
const isReadableStream = (s) => {
    return typeof s.getReader == "function";
};
// internal
function concatBytes(a, b) {
    let n = new Uint8Array(a.length + b.length);
    n.set(a);
    n.set(b, a.length);
    return n;
}
// determines format from response "content-type" value.
// throws if value is unknown or missing.
function parseFormat(contentType) {
    // > the sender *should* always specify the message format, e.g. +proto, +json
    //
    // > the receiver should assume the default is "+proto" when the message format is
    // > missing in Content-Type (as "application/grpc-web")
    //
    // see https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md
    switch (contentType) {
        case "application/grpc-web-text":
        case "application/grpc-web-text+proto":
            return "text";
        case "application/grpc-web":
        case "application/grpc-web+proto":
            return "binary";
        case undefined:
        case null:
            throw new RpcError("missing response content type", GrpcStatusCode[GrpcStatusCode.INTERNAL]);
        default:
            throw new RpcError("unexpected response content type: " + contentType, GrpcStatusCode[GrpcStatusCode.INTERNAL]);
    }
}
// returns error code on parse failure
function parseStatus(headers) {
    let code, message;
    let m = headers['grpc-message'];
    if (m !== undefined) {
        if (Array.isArray(m))
            return [GrpcStatusCode.INTERNAL, "invalid grpc-web message"];
        message = m;
    }
    let s = headers['grpc-status'];
    if (s !== undefined) {
        if (Array.isArray(s))
            return [GrpcStatusCode.INTERNAL, "invalid grpc-web status"];
        code = parseInt(s, 10);
        if (GrpcStatusCode[code] === undefined)
            return [GrpcStatusCode.INTERNAL, "invalid grpc-web status"];
    }
    return [code, message];
}
// skips grpc-web headers
function parseMetadata(headers) {
    let meta = {};
    for (let [k, v] of Object.entries(headers))
        switch (k) {
            case 'grpc-message':
            case 'grpc-status':
            case 'content-type':
                break;
            default:
                meta[k] = v;
        }
    return meta;
}
// parse trailer data (ASCII) to our headers rep
function parseTrailer(trailerData) {
    let headers = {};
    for (let chunk of String.fromCharCode.apply(String, trailerData).trim().split("\r\n")) {
        if (chunk == "")
            continue;
        let [key, ...val] = chunk.split(":");
        const value = val.join(":").trim();
        key = key.trim();
        let e = headers[key];
        if (typeof e == "string")
            headers[key] = [e, value];
        else if (Array.isArray(e))
            e.push(value);
        else
            headers[key] = value;
    }
    return headers;
}
// fetch API to our headers rep
function fetchHeadersToHttp(fetchHeaders) {
    let headers = {};
    fetchHeaders.forEach((value, key) => {
        let e = headers[key];
        if (typeof e == "string")
            headers[key] = [e, value];
        else if (Array.isArray(e))
            e.push(value);
        else
            headers[key] = value;
    });
    return headers;
}
// internal
function httpStatusToGrpc(httpStatus) {
    switch (httpStatus) {
        case 200:
            return GrpcStatusCode.OK;
        case 400:
            return GrpcStatusCode.INVALID_ARGUMENT;
        case 401:
            return GrpcStatusCode.UNAUTHENTICATED;
        case 403:
            return GrpcStatusCode.PERMISSION_DENIED;
        case 404:
            return GrpcStatusCode.NOT_FOUND;
        case 409:
            return GrpcStatusCode.ABORTED;
        case 412:
            return GrpcStatusCode.FAILED_PRECONDITION;
        case 429:
            return GrpcStatusCode.RESOURCE_EXHAUSTED;
        case 499:
            return GrpcStatusCode.CANCELLED;
        case 500:
            return GrpcStatusCode.UNKNOWN;
        case 501:
            return GrpcStatusCode.UNIMPLEMENTED;
        case 503:
            return GrpcStatusCode.UNAVAILABLE;
        case 504:
            return GrpcStatusCode.DEADLINE_EXCEEDED;
        default:
            return GrpcStatusCode.UNKNOWN;
    }
}
