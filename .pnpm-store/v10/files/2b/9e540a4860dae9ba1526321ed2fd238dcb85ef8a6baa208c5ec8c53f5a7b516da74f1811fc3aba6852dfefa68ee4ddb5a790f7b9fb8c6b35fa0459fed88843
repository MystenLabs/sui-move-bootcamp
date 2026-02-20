import { JwkId } from "./jwk.mjs";
import { Bcs } from "./bcs.mjs";
import { SignatureScheme } from "./signature_scheme.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/signature.ts
var UserSignature$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.UserSignature", [
			{
				no: 1,
				name: "bcs",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 2,
				name: "scheme",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.SignatureScheme", SignatureScheme]
			},
			{
				no: 3,
				name: "simple",
				kind: "message",
				oneof: "signature",
				T: () => SimpleSignature
			},
			{
				no: 4,
				name: "multisig",
				kind: "message",
				oneof: "signature",
				T: () => MultisigAggregatedSignature
			},
			{
				no: 5,
				name: "zklogin",
				kind: "message",
				oneof: "signature",
				T: () => ZkLoginAuthenticator
			},
			{
				no: 6,
				name: "passkey",
				kind: "message",
				oneof: "signature",
				T: () => PasskeyAuthenticator
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.UserSignature
*/
const UserSignature = new UserSignature$Type();
var SimpleSignature$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SimpleSignature", [
			{
				no: 1,
				name: "scheme",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.SignatureScheme", SignatureScheme]
			},
			{
				no: 2,
				name: "signature",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 3,
				name: "public_key",
				kind: "scalar",
				opt: true,
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SimpleSignature
*/
const SimpleSignature = new SimpleSignature$Type();
var ZkLoginPublicIdentifier$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ZkLoginPublicIdentifier", [{
			no: 1,
			name: "iss",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "address_seed",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ZkLoginPublicIdentifier
*/
const ZkLoginPublicIdentifier = new ZkLoginPublicIdentifier$Type();
var MultisigMemberPublicKey$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MultisigMemberPublicKey", [
			{
				no: 1,
				name: "scheme",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.SignatureScheme", SignatureScheme]
			},
			{
				no: 2,
				name: "public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 3,
				name: "zklogin",
				kind: "message",
				T: () => ZkLoginPublicIdentifier
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MultisigMemberPublicKey
*/
const MultisigMemberPublicKey = new MultisigMemberPublicKey$Type();
var MultisigMember$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MultisigMember", [{
			no: 1,
			name: "public_key",
			kind: "message",
			T: () => MultisigMemberPublicKey
		}, {
			no: 2,
			name: "weight",
			kind: "scalar",
			opt: true,
			T: 13
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MultisigMember
*/
const MultisigMember = new MultisigMember$Type();
var MultisigCommittee$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MultisigCommittee", [{
			no: 1,
			name: "members",
			kind: "message",
			repeat: 1,
			T: () => MultisigMember
		}, {
			no: 2,
			name: "threshold",
			kind: "scalar",
			opt: true,
			T: 13
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MultisigCommittee
*/
const MultisigCommittee = new MultisigCommittee$Type();
var MultisigAggregatedSignature$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MultisigAggregatedSignature", [
			{
				no: 1,
				name: "signatures",
				kind: "message",
				repeat: 1,
				T: () => MultisigMemberSignature
			},
			{
				no: 2,
				name: "bitmap",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "legacy_bitmap",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 4,
				name: "committee",
				kind: "message",
				T: () => MultisigCommittee
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MultisigAggregatedSignature
*/
const MultisigAggregatedSignature = new MultisigAggregatedSignature$Type();
var MultisigMemberSignature$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MultisigMemberSignature", [
			{
				no: 1,
				name: "scheme",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.SignatureScheme", SignatureScheme]
			},
			{
				no: 2,
				name: "signature",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 3,
				name: "zklogin",
				kind: "message",
				T: () => ZkLoginAuthenticator
			},
			{
				no: 4,
				name: "passkey",
				kind: "message",
				T: () => PasskeyAuthenticator
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MultisigMemberSignature
*/
const MultisigMemberSignature = new MultisigMemberSignature$Type();
var ZkLoginAuthenticator$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ZkLoginAuthenticator", [
			{
				no: 1,
				name: "inputs",
				kind: "message",
				T: () => ZkLoginInputs
			},
			{
				no: 2,
				name: "max_epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "signature",
				kind: "message",
				T: () => SimpleSignature
			},
			{
				no: 4,
				name: "public_identifier",
				kind: "message",
				T: () => ZkLoginPublicIdentifier
			},
			{
				no: 5,
				name: "jwk_id",
				kind: "message",
				T: () => JwkId
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ZkLoginAuthenticator
*/
const ZkLoginAuthenticator = new ZkLoginAuthenticator$Type();
var ZkLoginInputs$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ZkLoginInputs", [
			{
				no: 1,
				name: "proof_points",
				kind: "message",
				T: () => ZkLoginProof
			},
			{
				no: 2,
				name: "iss_base64_details",
				kind: "message",
				T: () => ZkLoginClaim
			},
			{
				no: 3,
				name: "header_base64",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "address_seed",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ZkLoginInputs
*/
const ZkLoginInputs = new ZkLoginInputs$Type();
var ZkLoginProof$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ZkLoginProof", [
			{
				no: 1,
				name: "a",
				kind: "message",
				T: () => CircomG1
			},
			{
				no: 2,
				name: "b",
				kind: "message",
				T: () => CircomG2
			},
			{
				no: 3,
				name: "c",
				kind: "message",
				T: () => CircomG1
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ZkLoginProof
*/
const ZkLoginProof = new ZkLoginProof$Type();
var ZkLoginClaim$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ZkLoginClaim", [{
			no: 1,
			name: "value",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "index_mod_4",
			kind: "scalar",
			opt: true,
			T: 13
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ZkLoginClaim
*/
const ZkLoginClaim = new ZkLoginClaim$Type();
var CircomG1$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CircomG1", [
			{
				no: 1,
				name: "e0",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "e1",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "e2",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CircomG1
*/
const CircomG1 = new CircomG1$Type();
var CircomG2$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CircomG2", [
			{
				no: 1,
				name: "e00",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "e01",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "e10",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "e11",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "e20",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 6,
				name: "e21",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CircomG2
*/
const CircomG2 = new CircomG2$Type();
var PasskeyAuthenticator$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.PasskeyAuthenticator", [
			{
				no: 1,
				name: "authenticator_data",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 2,
				name: "client_data_json",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "signature",
				kind: "message",
				T: () => SimpleSignature
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.PasskeyAuthenticator
*/
const PasskeyAuthenticator = new PasskeyAuthenticator$Type();
var ValidatorCommittee$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorCommittee", [{
			no: 1,
			name: "epoch",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "members",
			kind: "message",
			repeat: 1,
			T: () => ValidatorCommitteeMember
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorCommittee
*/
const ValidatorCommittee = new ValidatorCommittee$Type();
var ValidatorCommitteeMember$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorCommitteeMember", [{
			no: 1,
			name: "public_key",
			kind: "scalar",
			opt: true,
			T: 12
		}, {
			no: 2,
			name: "weight",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorCommitteeMember
*/
const ValidatorCommitteeMember = new ValidatorCommitteeMember$Type();
var ValidatorAggregatedSignature$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorAggregatedSignature", [
			{
				no: 1,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "signature",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 3,
				name: "bitmap",
				kind: "scalar",
				opt: true,
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorAggregatedSignature
*/
const ValidatorAggregatedSignature = new ValidatorAggregatedSignature$Type();

//#endregion
export { CircomG1, CircomG2, MultisigAggregatedSignature, MultisigCommittee, MultisigMember, MultisigMemberPublicKey, MultisigMemberSignature, PasskeyAuthenticator, SimpleSignature, UserSignature, ValidatorAggregatedSignature, ValidatorCommittee, ValidatorCommitteeMember, ZkLoginAuthenticator, ZkLoginClaim, ZkLoginInputs, ZkLoginProof, ZkLoginPublicIdentifier };
//# sourceMappingURL=signature.mjs.map