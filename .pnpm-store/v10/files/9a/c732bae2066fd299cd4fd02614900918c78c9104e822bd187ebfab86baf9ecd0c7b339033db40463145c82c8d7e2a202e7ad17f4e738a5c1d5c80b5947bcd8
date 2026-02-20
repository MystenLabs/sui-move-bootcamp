import { ClientStreamingCall, DuplexStreamingCall, MethodInfo, RpcOptions, RpcTransport, ServerStreamingCall, UnaryCall } from "@protobuf-ts/runtime-rpc";
import { GrpcWebOptions } from "./grpc-web-options";
/**
 * Implements the grpc-web protocol, supporting text format or binary
 * format on the wire. Uses the fetch API to do the HTTP requests.
 *
 * Does not support client streaming or duplex calls because grpc-web
 * does not support them.
 */
export declare class GrpcWebFetchTransport implements RpcTransport {
    private readonly defaultOptions;
    constructor(defaultOptions: GrpcWebOptions);
    mergeOptions(options?: Partial<RpcOptions>): RpcOptions;
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
    protected makeUrl(method: MethodInfo, options: GrpcWebOptions): string;
    clientStreaming<I extends object, O extends object>(method: MethodInfo<I, O>): ClientStreamingCall<I, O>;
    duplex<I extends object, O extends object>(method: MethodInfo<I, O>): DuplexStreamingCall<I, O>;
    serverStreaming<I extends object, O extends object>(method: MethodInfo<I, O>, input: I, options: RpcOptions): ServerStreamingCall<I, O>;
    unary<I extends object, O extends object>(method: MethodInfo<I, O>, input: I, options: RpcOptions): UnaryCall<I, O>;
}
