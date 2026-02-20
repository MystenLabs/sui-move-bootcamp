import { SignatureVerificationService } from "./signature_verification_service.mjs";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/signature_verification_service.client.ts
/**
* @generated from protobuf service sui.rpc.v2.SignatureVerificationService
*/
var SignatureVerificationServiceClient = class {
	constructor(_transport) {
		this._transport = _transport;
		this.typeName = SignatureVerificationService.typeName;
		this.methods = SignatureVerificationService.methods;
		this.options = SignatureVerificationService.options;
	}
	/**
	* Perform signature verification of a UserSignature against the provided message.
	*
	* @generated from protobuf rpc: VerifySignature(sui.rpc.v2.VerifySignatureRequest) returns (sui.rpc.v2.VerifySignatureResponse);
	*/
	verifySignature(input, options) {
		const method = this.methods[0], opt = this._transport.mergeOptions(options);
		return stackIntercept("unary", this._transport, method, opt, input);
	}
};

//#endregion
export { SignatureVerificationServiceClient };
//# sourceMappingURL=signature_verification_service.client.mjs.map