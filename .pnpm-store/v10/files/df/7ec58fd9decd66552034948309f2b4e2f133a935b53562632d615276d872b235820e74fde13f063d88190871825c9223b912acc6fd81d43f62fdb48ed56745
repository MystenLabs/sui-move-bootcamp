"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcWebFetchTransport = void 0;
const runtime_rpc_1 = require("@protobuf-ts/runtime-rpc");
const grpc_web_format_1 = require("./grpc-web-format");
const goog_grpc_status_code_1 = require("./goog-grpc-status-code");
/**
 * Implements the grpc-web protocol, supporting text format or binary
 * format on the wire. Uses the fetch API to do the HTTP requests.
 *
 * Does not support client streaming or duplex calls because grpc-web
 * does not support them.
 */
class GrpcWebFetchTransport {
    constructor(defaultOptions) {
        this.defaultOptions = defaultOptions;
    }
    mergeOptions(options) {
        return runtime_rpc_1.mergeRpcOptions(this.defaultOptions, options);
    }
    /**
     * Create an URI for a gRPC web call.
     *
     * Takes the `baseUrl` option and appends:
     * - slash "/"
     * - package name
     * - dot "."
     * - service name
     * - slash "/"
     * - method name
     *
     * If the service was declared without a package, the package name and dot
     * are omitted.
     *
     * All names are used exactly like declared in .proto.
     */
    makeUrl(method, options) {
        let base = options.baseUrl;
        if (base.endsWith('/'))
            base = base.substring(0, base.length - 1);
        return `${base}/${method.service.typeName}/${method.name}`;
    }
    clientStreaming(method /*, options: RpcOptions*/) {
        const e = new runtime_rpc_1.RpcError('Client streaming is not supported by grpc-web', goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.UNIMPLEMENTED]);
        e.methodName = method.name;
        e.serviceName = method.service.typeName;
        throw e;
    }
    duplex(method /*, options: RpcOptions*/) {
        const e = new runtime_rpc_1.RpcError('Duplex streaming is not supported by grpc-web', goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.UNIMPLEMENTED]);
        e.methodName = method.name;
        e.serviceName = method.service.typeName;
        throw e;
    }
    serverStreaming(method, input, options) {
        var _a, _b, _c, _d, _e;
        let opt = options, format = (_a = opt.format) !== null && _a !== void 0 ? _a : 'text', fetch = (_b = opt.fetch) !== null && _b !== void 0 ? _b : globalThis.fetch, fetchInit = (_c = opt.fetchInit) !== null && _c !== void 0 ? _c : {}, url = this.makeUrl(method, opt), inputBytes = method.I.toBinary(input, opt.binaryOptions), defHeader = new runtime_rpc_1.Deferred(), responseStream = new runtime_rpc_1.RpcOutputStreamController(), responseEmptyBody = true, maybeStatus, defStatus = new runtime_rpc_1.Deferred(), maybeTrailer, defTrailer = new runtime_rpc_1.Deferred();
        fetch(url, Object.assign(Object.assign({}, fetchInit), { method: 'POST', headers: grpc_web_format_1.createGrpcWebRequestHeader(new globalThis.Headers(), format, opt.timeout, opt.meta), body: grpc_web_format_1.createGrpcWebRequestBody(inputBytes, format), signal: (_d = options.abort) !== null && _d !== void 0 ? _d : null // node-fetch@3.0.0-beta.9 rejects `undefined`
         }))
            .then(fetchResponse => {
            let [code, detail, meta] = grpc_web_format_1.readGrpcWebResponseHeader(fetchResponse);
            defHeader.resolve(meta);
            if (code != null && code !== goog_grpc_status_code_1.GrpcStatusCode.OK)
                throw new runtime_rpc_1.RpcError(detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code], goog_grpc_status_code_1.GrpcStatusCode[code], meta);
            if (code != null)
                maybeStatus = {
                    code: goog_grpc_status_code_1.GrpcStatusCode[code],
                    detail: detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code]
                };
            return fetchResponse;
        })
            .then(fetchResponse => {
            if (!fetchResponse.body)
                throw new runtime_rpc_1.RpcError('missing response body', goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            return grpc_web_format_1.readGrpcWebResponseBody(fetchResponse.body, fetchResponse.headers.get('content-type'), (type, data) => {
                switch (type) {
                    case grpc_web_format_1.GrpcWebFrame.DATA:
                        responseStream.notifyMessage(method.O.fromBinary(data, opt.binaryOptions));
                        responseEmptyBody = false;
                        break;
                    case grpc_web_format_1.GrpcWebFrame.TRAILER:
                        let code, detail;
                        [code, detail, maybeTrailer] = grpc_web_format_1.readGrpcWebResponseTrailer(data);
                        maybeStatus = {
                            code: goog_grpc_status_code_1.GrpcStatusCode[code],
                            detail: detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code]
                        };
                        break;
                }
            });
        })
            .then(() => {
            if (!maybeTrailer && !responseEmptyBody)
                throw new runtime_rpc_1.RpcError(`missing trailers`, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.DATA_LOSS]);
            // istanbul ignore if - this should be impossible and only here to satisfy TypeScript
            if (!maybeStatus)
                throw new runtime_rpc_1.RpcError(`missing status`, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            if (maybeStatus.code !== 'OK')
                throw new runtime_rpc_1.RpcError(maybeStatus.detail, maybeStatus.code, maybeTrailer);
            responseStream.notifyComplete();
            defStatus.resolve(maybeStatus);
            defTrailer.resolve(maybeTrailer || {});
        })
            .catch(reason => {
            let error;
            if (reason instanceof runtime_rpc_1.RpcError)
                error = reason;
            else if (reason instanceof Error && reason.name === 'AbortError')
                // aborted
                error = new runtime_rpc_1.RpcError(reason.message, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.CANCELLED]);
            else
                // RpcErrors are thrown by us, everything else is an internal error
                error = new runtime_rpc_1.RpcError(reason instanceof Error ? reason.message : "" + reason, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            error.methodName = method.name;
            error.serviceName = method.service.typeName;
            defHeader.rejectPending(error);
            responseStream.notifyError(error);
            defStatus.rejectPending(error);
            defTrailer.rejectPending(error);
        });
        return new runtime_rpc_1.ServerStreamingCall(method, (_e = opt.meta) !== null && _e !== void 0 ? _e : {}, input, defHeader.promise, responseStream, defStatus.promise, defTrailer.promise);
    }
    unary(method, input, options) {
        var _a, _b, _c, _d, _e;
        let opt = options, format = (_a = opt.format) !== null && _a !== void 0 ? _a : 'text', fetch = (_b = opt.fetch) !== null && _b !== void 0 ? _b : globalThis.fetch, fetchInit = (_c = opt.fetchInit) !== null && _c !== void 0 ? _c : {}, url = this.makeUrl(method, opt), inputBytes = method.I.toBinary(input, opt.binaryOptions), defHeader = new runtime_rpc_1.Deferred(), maybeMessage, defMessage = new runtime_rpc_1.Deferred(), maybeStatus, defStatus = new runtime_rpc_1.Deferred(), maybeTrailer, defTrailer = new runtime_rpc_1.Deferred();
        fetch(url, Object.assign(Object.assign({}, fetchInit), { method: 'POST', headers: grpc_web_format_1.createGrpcWebRequestHeader(new globalThis.Headers(), format, opt.timeout, opt.meta), body: grpc_web_format_1.createGrpcWebRequestBody(inputBytes, format), signal: (_d = options.abort) !== null && _d !== void 0 ? _d : null // node-fetch@3.0.0-beta.9 rejects `undefined`
         }))
            .then(fetchResponse => {
            let [code, detail, meta] = grpc_web_format_1.readGrpcWebResponseHeader(fetchResponse);
            defHeader.resolve(meta);
            if (code != null && code !== goog_grpc_status_code_1.GrpcStatusCode.OK)
                throw new runtime_rpc_1.RpcError(detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code], goog_grpc_status_code_1.GrpcStatusCode[code], meta);
            if (code != null)
                maybeStatus = {
                    code: goog_grpc_status_code_1.GrpcStatusCode[code],
                    detail: detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code]
                };
            return fetchResponse;
        })
            .then(fetchResponse => {
            if (!fetchResponse.body)
                throw new runtime_rpc_1.RpcError('missing response body', goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            return grpc_web_format_1.readGrpcWebResponseBody(fetchResponse.body, fetchResponse.headers.get('content-type'), (type, data) => {
                switch (type) {
                    case grpc_web_format_1.GrpcWebFrame.DATA:
                        if (maybeMessage)
                            throw new runtime_rpc_1.RpcError(`unary call received 2nd message`, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.DATA_LOSS]);
                        maybeMessage = method.O.fromBinary(data, opt.binaryOptions);
                        break;
                    case grpc_web_format_1.GrpcWebFrame.TRAILER:
                        let code, detail;
                        [code, detail, maybeTrailer] = grpc_web_format_1.readGrpcWebResponseTrailer(data);
                        maybeStatus = {
                            code: goog_grpc_status_code_1.GrpcStatusCode[code],
                            detail: detail !== null && detail !== void 0 ? detail : goog_grpc_status_code_1.GrpcStatusCode[code]
                        };
                        break;
                }
            });
        })
            .then(() => {
            if (!maybeTrailer && maybeMessage)
                throw new runtime_rpc_1.RpcError(`missing trailers`, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.DATA_LOSS]);
            // istanbul ignore if - this should be impossible and only here to satisfy TypeScript
            if (!maybeStatus)
                throw new runtime_rpc_1.RpcError(`missing status`, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            if (!maybeMessage && maybeStatus.code === 'OK')
                throw new runtime_rpc_1.RpcError('expected error status', goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.DATA_LOSS]);
            if (!maybeMessage)
                throw new runtime_rpc_1.RpcError(maybeStatus.detail, maybeStatus.code, maybeTrailer);
            defMessage.resolve(maybeMessage);
            if (maybeStatus.code !== 'OK')
                throw new runtime_rpc_1.RpcError(maybeStatus.detail, maybeStatus.code, maybeTrailer);
            defStatus.resolve(maybeStatus);
            defTrailer.resolve(maybeTrailer || {});
        })
            .catch(reason => {
            let error;
            if (reason instanceof runtime_rpc_1.RpcError)
                error = reason;
            else if (reason instanceof Error && reason.name === 'AbortError')
                // aborted
                error = new runtime_rpc_1.RpcError(reason.message, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.CANCELLED]);
            else
                // RpcErrors are thrown by us, everything else is an internal error
                error = new runtime_rpc_1.RpcError(reason instanceof Error ? reason.message : "" + reason, goog_grpc_status_code_1.GrpcStatusCode[goog_grpc_status_code_1.GrpcStatusCode.INTERNAL]);
            error.methodName = method.name;
            error.serviceName = method.service.typeName;
            defHeader.rejectPending(error);
            defMessage.rejectPending(error);
            defStatus.rejectPending(error);
            defTrailer.rejectPending(error);
        });
        return new runtime_rpc_1.UnaryCall(method, (_e = opt.meta) !== null && _e !== void 0 ? _e : {}, input, defHeader.promise, defMessage.promise, defStatus.promise, defTrailer.promise);
    }
}
exports.GrpcWebFetchTransport = GrpcWebFetchTransport;
