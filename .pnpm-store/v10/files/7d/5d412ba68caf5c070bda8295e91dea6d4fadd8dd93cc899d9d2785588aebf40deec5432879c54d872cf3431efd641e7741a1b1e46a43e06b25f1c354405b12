import { Bcs } from "./bcs.mjs";
import { JwkId } from "./jwk.mjs";
import { SignatureScheme } from "./signature_scheme.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/signature.d.ts

/**
 * A signature from a user.
 *
 * @generated from protobuf message sui.rpc.v2.UserSignature
 */
interface UserSignature {
  /**
   * This signature serialized as as BCS.
   *
   * When provided as input this will support both the form that is length
   * prefixed as well as not length prefixed.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * The signature scheme of this signature.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SignatureScheme scheme = 2;
   */
  scheme?: SignatureScheme;
  /**
   * @generated from protobuf oneof: signature
   */
  signature: {
    oneofKind: 'simple';
    /**
     * Simple signature if scheme is ed25519 | secp256k1 | secp256r1.
     *
     * @generated from protobuf field: sui.rpc.v2.SimpleSignature simple = 3;
     */
    simple: SimpleSignature;
  } | {
    oneofKind: 'multisig';
    /**
     * The multisig aggregated signature if scheme is `MULTISIG`.
     *
     * @generated from protobuf field: sui.rpc.v2.MultisigAggregatedSignature multisig = 4;
     */
    multisig: MultisigAggregatedSignature;
  } | {
    oneofKind: 'zklogin';
    /**
     * The zklogin authenticator if scheme is `ZKLOGIN`.
     *
     * @generated from protobuf field: sui.rpc.v2.ZkLoginAuthenticator zklogin = 5;
     */
    zklogin: ZkLoginAuthenticator;
  } | {
    oneofKind: 'passkey';
    /**
     * The passkey authenticator if scheme is `PASSKEY`.
     *
     * @generated from protobuf field: sui.rpc.v2.PasskeyAuthenticator passkey = 6;
     */
    passkey: PasskeyAuthenticator;
  } | {
    oneofKind: undefined;
  };
}
/**
 * Either an ed25519, secp256k1 or secp256r1 signature
 *
 * @generated from protobuf message sui.rpc.v2.SimpleSignature
 */
interface SimpleSignature {
  /**
   * The signature scheme of this signature.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SignatureScheme scheme = 1;
   */
  scheme?: SignatureScheme;
  /**
   * Signature bytes
   *
   * @generated from protobuf field: optional bytes signature = 2;
   */
  signature?: Uint8Array;
  /**
   * Public key bytes
   *
   * @generated from protobuf field: optional bytes public_key = 3;
   */
  publicKey?: Uint8Array;
}
/**
 * Public key equivalent for zklogin authenticators.
 *
 * @generated from protobuf message sui.rpc.v2.ZkLoginPublicIdentifier
 */
interface ZkLoginPublicIdentifier {
  /**
   * @generated from protobuf field: optional string iss = 1;
   */
  iss?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string address_seed = 2;
   */
  addressSeed?: string;
}
/**
 * Set of valid public keys for multisig committee members.
 *
 * @generated from protobuf message sui.rpc.v2.MultisigMemberPublicKey
 */
interface MultisigMemberPublicKey {
  /**
   * The signature scheme of this public key.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SignatureScheme scheme = 1;
   */
  scheme?: SignatureScheme;
  /**
   * Public key bytes if scheme is ed25519 | secp256k1 | secp256r1 | passkey.
   *
   * @generated from protobuf field: optional bytes public_key = 2;
   */
  publicKey?: Uint8Array;
  /**
   * A zklogin public identifier if scheme is zklogin.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginPublicIdentifier zklogin = 3;
   */
  zklogin?: ZkLoginPublicIdentifier;
}
/**
 * A member in a multisig committee.
 *
 * @generated from protobuf message sui.rpc.v2.MultisigMember
 */
interface MultisigMember {
  /**
   * The public key of the committee member.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MultisigMemberPublicKey public_key = 1;
   */
  publicKey?: MultisigMemberPublicKey;
  /**
   * The weight of this member's signature.
   *
   * @generated from protobuf field: optional uint32 weight = 2;
   */
  weight?: number;
}
/**
 * A multisig committee.
 *
 * @generated from protobuf message sui.rpc.v2.MultisigCommittee
 */
interface MultisigCommittee {
  /**
   * A list of committee members and their corresponding weight.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.MultisigMember members = 1;
   */
  members: MultisigMember[];
  /**
   * The threshold of signatures needed to validate a signature from
   * this committee.
   *
   * @generated from protobuf field: optional uint32 threshold = 2;
   */
  threshold?: number;
}
/**
 * Aggregated signature from members of a multisig committee.
 *
 * @generated from protobuf message sui.rpc.v2.MultisigAggregatedSignature
 */
interface MultisigAggregatedSignature {
  /**
   * The plain signatures encoded with signature scheme.
   *
   * The signatures must be in the same order as they are listed in the committee.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.MultisigMemberSignature signatures = 1;
   */
  signatures: MultisigMemberSignature[];
  /**
   * Bitmap indicating which committee members contributed to the
   * signature.
   *
   * @generated from protobuf field: optional uint32 bitmap = 2;
   */
  bitmap?: number;
  /**
   * If present, means this signature's on-chain format uses the old
   * legacy multisig format.
   *
   * @generated from protobuf field: optional bytes legacy_bitmap = 3;
   */
  legacyBitmap?: Uint8Array;
  /**
   * The committee to use to validate this signature.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MultisigCommittee committee = 4;
   */
  committee?: MultisigCommittee;
}
/**
 * A signature from a member of a multisig committee.
 *
 * @generated from protobuf message sui.rpc.v2.MultisigMemberSignature
 */
interface MultisigMemberSignature {
  /**
   * The signature scheme of this signature.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SignatureScheme scheme = 1;
   */
  scheme?: SignatureScheme;
  /**
   * Signature bytes if scheme is ed25519 | secp256k1 | secp256r1.
   *
   * @generated from protobuf field: optional bytes signature = 2;
   */
  signature?: Uint8Array;
  /**
   * The zklogin authenticator if scheme is `ZKLOGIN`.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginAuthenticator zklogin = 3;
   */
  zklogin?: ZkLoginAuthenticator;
  /**
   * The passkey authenticator if scheme is `PASSKEY`.
   *
   * @generated from protobuf field: optional sui.rpc.v2.PasskeyAuthenticator passkey = 4;
   */
  passkey?: PasskeyAuthenticator;
}
/**
 * A zklogin authenticator.
 *
 * @generated from protobuf message sui.rpc.v2.ZkLoginAuthenticator
 */
interface ZkLoginAuthenticator {
  /**
   * Zklogin proof and inputs required to perform proof verification.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginInputs inputs = 1;
   */
  inputs?: ZkLoginInputs;
  /**
   * Maximum epoch for which the proof is valid.
   *
   * @generated from protobuf field: optional uint64 max_epoch = 2;
   */
  maxEpoch?: bigint;
  /**
   * User signature with the public key attested to by the provided proof.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SimpleSignature signature = 3;
   */
  signature?: SimpleSignature;
  /**
   * The public identifier (similar to a public key) for this zklogin authenticator
   *
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginPublicIdentifier public_identifier = 4;
   */
  publicIdentifier?: ZkLoginPublicIdentifier;
  /**
   * The id of the JWK used to authorize this zklogin authenticator
   *
   * @generated from protobuf field: optional sui.rpc.v2.JwkId jwk_id = 5;
   */
  jwkId?: JwkId;
}
/**
 * A zklogin groth16 proof and the required inputs to perform proof verification.
 *
 * @generated from protobuf message sui.rpc.v2.ZkLoginInputs
 */
interface ZkLoginInputs {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginProof proof_points = 1;
   */
  proofPoints?: ZkLoginProof;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ZkLoginClaim iss_base64_details = 2;
   */
  issBase64Details?: ZkLoginClaim;
  /**
   * @generated from protobuf field: optional string header_base64 = 3;
   */
  headerBase64?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string address_seed = 4;
   */
  addressSeed?: string;
}
/**
 * A zklogin groth16 proof.
 *
 * @generated from protobuf message sui.rpc.v2.ZkLoginProof
 */
interface ZkLoginProof {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.CircomG1 a = 1;
   */
  a?: CircomG1;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.CircomG2 b = 2;
   */
  b?: CircomG2;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.CircomG1 c = 3;
   */
  c?: CircomG1;
}
/**
 * A claim of the iss in a zklogin proof.
 *
 * @generated from protobuf message sui.rpc.v2.ZkLoginClaim
 */
interface ZkLoginClaim {
  /**
   * @generated from protobuf field: optional string value = 1;
   */
  value?: string;
  /**
   * @generated from protobuf field: optional uint32 index_mod_4 = 2;
   */
  indexMod4?: number;
}
/**
 * A G1 point.
 *
 * @generated from protobuf message sui.rpc.v2.CircomG1
 */
interface CircomG1 {
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e0 = 1;
   */
  e0?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e1 = 2;
   */
  e1?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e2 = 3;
   */
  e2?: string;
}
/**
 * A G2 point.
 *
 * @generated from protobuf message sui.rpc.v2.CircomG2
 */
interface CircomG2 {
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e00 = 1;
   */
  e00?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e01 = 2;
   */
  e01?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e10 = 3;
   */
  e10?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e11 = 4;
   */
  e11?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e20 = 5;
   */
  e20?: string;
  /**
   * base10 encoded Bn254FieldElement
   *
   * @generated from protobuf field: optional string e21 = 6;
   */
  e21?: string;
}
/**
 * A passkey authenticator.
 *
 * See
 * [struct.PasskeyAuthenticator](https://mystenlabs.github.io/sui-rust-sdk/sui_sdk_types/struct.PasskeyAuthenticator.html#bcs)
 * for more information on the requirements on the shape of the
 * `client_data_json` field.
 *
 * @generated from protobuf message sui.rpc.v2.PasskeyAuthenticator
 */
interface PasskeyAuthenticator {
  /**
   * Opaque authenticator data for this passkey signature.
   *
   * See [Authenticator Data](https://www.w3.org/TR/webauthn-2/#sctn-authenticator-data) for
   * more information on this field.
   *
   * @generated from protobuf field: optional bytes authenticator_data = 1;
   */
  authenticatorData?: Uint8Array;
  /**
   * Structured, unparsed, JSON for this passkey signature.
   *
   * See [CollectedClientData](https://www.w3.org/TR/webauthn-2/#dictdef-collectedclientdata)
   * for more information on this field.
   *
   * @generated from protobuf field: optional string client_data_json = 2;
   */
  clientDataJson?: string;
  /**
   * A secp256r1 signature.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SimpleSignature signature = 3;
   */
  signature?: SimpleSignature;
}
/**
 * The validator set for a particular epoch.
 *
 * @generated from protobuf message sui.rpc.v2.ValidatorCommittee
 */
interface ValidatorCommittee {
  /**
   * The epoch where this committee governs.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * The committee members.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ValidatorCommitteeMember members = 2;
   */
  members: ValidatorCommitteeMember[];
}
/**
 * A member of a validator committee.
 *
 * @generated from protobuf message sui.rpc.v2.ValidatorCommitteeMember
 */
interface ValidatorCommitteeMember {
  /**
   * The 96-byte Bls12381 public key for this validator.
   *
   * @generated from protobuf field: optional bytes public_key = 1;
   */
  publicKey?: Uint8Array;
  /**
   * voting weight this validator possesses.
   *
   * @generated from protobuf field: optional uint64 weight = 2;
   */
  weight?: bigint;
}
/**
 * / An aggregated signature from multiple validators.
 *
 * @generated from protobuf message sui.rpc.v2.ValidatorAggregatedSignature
 */
interface ValidatorAggregatedSignature {
  /**
   * The epoch when this signature was produced.
   *
   * This can be used to lookup the `ValidatorCommittee` from this epoch
   * to verify this signature.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * The 48-byte Bls12381 aggregated signature.
   *
   * @generated from protobuf field: optional bytes signature = 2;
   */
  signature?: Uint8Array;
  /**
   * Bitmap indicating which members of the committee contributed to
   * this signature.
   *
   * @generated from protobuf field: optional bytes bitmap = 3;
   */
  bitmap?: Uint8Array;
}
declare class UserSignature$Type extends MessageType<UserSignature> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.UserSignature
 */
declare const UserSignature: UserSignature$Type;
declare class SimpleSignature$Type extends MessageType<SimpleSignature> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SimpleSignature
 */
declare const SimpleSignature: SimpleSignature$Type;
declare class ZkLoginPublicIdentifier$Type extends MessageType<ZkLoginPublicIdentifier> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ZkLoginPublicIdentifier
 */
declare const ZkLoginPublicIdentifier: ZkLoginPublicIdentifier$Type;
declare class MultisigMemberPublicKey$Type extends MessageType<MultisigMemberPublicKey> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MultisigMemberPublicKey
 */
declare const MultisigMemberPublicKey: MultisigMemberPublicKey$Type;
declare class MultisigMember$Type extends MessageType<MultisigMember> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MultisigMember
 */
declare const MultisigMember: MultisigMember$Type;
declare class MultisigCommittee$Type extends MessageType<MultisigCommittee> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MultisigCommittee
 */
declare const MultisigCommittee: MultisigCommittee$Type;
declare class MultisigAggregatedSignature$Type extends MessageType<MultisigAggregatedSignature> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MultisigAggregatedSignature
 */
declare const MultisigAggregatedSignature: MultisigAggregatedSignature$Type;
declare class MultisigMemberSignature$Type extends MessageType<MultisigMemberSignature> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MultisigMemberSignature
 */
declare const MultisigMemberSignature: MultisigMemberSignature$Type;
declare class ZkLoginAuthenticator$Type extends MessageType<ZkLoginAuthenticator> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ZkLoginAuthenticator
 */
declare const ZkLoginAuthenticator: ZkLoginAuthenticator$Type;
declare class ZkLoginInputs$Type extends MessageType<ZkLoginInputs> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ZkLoginInputs
 */
declare const ZkLoginInputs: ZkLoginInputs$Type;
declare class ZkLoginProof$Type extends MessageType<ZkLoginProof> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ZkLoginProof
 */
declare const ZkLoginProof: ZkLoginProof$Type;
declare class ZkLoginClaim$Type extends MessageType<ZkLoginClaim> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ZkLoginClaim
 */
declare const ZkLoginClaim: ZkLoginClaim$Type;
declare class CircomG1$Type extends MessageType<CircomG1> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CircomG1
 */
declare const CircomG1: CircomG1$Type;
declare class CircomG2$Type extends MessageType<CircomG2> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CircomG2
 */
declare const CircomG2: CircomG2$Type;
declare class PasskeyAuthenticator$Type extends MessageType<PasskeyAuthenticator> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.PasskeyAuthenticator
 */
declare const PasskeyAuthenticator: PasskeyAuthenticator$Type;
declare class ValidatorCommittee$Type extends MessageType<ValidatorCommittee> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorCommittee
 */
declare const ValidatorCommittee: ValidatorCommittee$Type;
declare class ValidatorCommitteeMember$Type extends MessageType<ValidatorCommitteeMember> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorCommitteeMember
 */
declare const ValidatorCommitteeMember: ValidatorCommitteeMember$Type;
declare class ValidatorAggregatedSignature$Type extends MessageType<ValidatorAggregatedSignature> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorAggregatedSignature
 */
declare const ValidatorAggregatedSignature: ValidatorAggregatedSignature$Type;
//#endregion
export { CircomG1, CircomG2, MultisigAggregatedSignature, MultisigCommittee, MultisigMember, MultisigMemberPublicKey, MultisigMemberSignature, PasskeyAuthenticator, SimpleSignature, UserSignature, ValidatorAggregatedSignature, ValidatorCommittee, ValidatorCommitteeMember, ZkLoginAuthenticator, ZkLoginClaim, ZkLoginInputs, ZkLoginProof, ZkLoginPublicIdentifier };
//# sourceMappingURL=signature.d.mts.map