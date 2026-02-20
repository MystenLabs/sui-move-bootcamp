import { Bcs } from "./bcs.mjs";
import { ActiveJwk } from "./transaction.mjs";
import { UserSignature } from "./signature.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/signature_verification_service.ts
var VerifySignatureRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.VerifySignatureRequest", [
			{
				no: 1,
				name: "message",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 2,
				name: "signature",
				kind: "message",
				T: () => UserSignature
			},
			{
				no: 3,
				name: "address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "jwks",
				kind: "message",
				repeat: 1,
				T: () => ActiveJwk
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.VerifySignatureRequest
*/
const VerifySignatureRequest = new VerifySignatureRequest$Type();
var VerifySignatureResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.VerifySignatureResponse", [{
			no: 1,
			name: "is_valid",
			kind: "scalar",
			opt: true,
			T: 8
		}, {
			no: 2,
			name: "reason",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.VerifySignatureResponse
*/
const VerifySignatureResponse = new VerifySignatureResponse$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.SignatureVerificationService
*/
const SignatureVerificationService = new ServiceType("sui.rpc.v2.SignatureVerificationService", [{
	name: "VerifySignature",
	options: {},
	I: VerifySignatureRequest,
	O: VerifySignatureResponse
}]);

//#endregion
export { SignatureVerificationService, VerifySignatureRequest, VerifySignatureResponse };
//# sourceMappingURL=signature_verification_service.mjs.map