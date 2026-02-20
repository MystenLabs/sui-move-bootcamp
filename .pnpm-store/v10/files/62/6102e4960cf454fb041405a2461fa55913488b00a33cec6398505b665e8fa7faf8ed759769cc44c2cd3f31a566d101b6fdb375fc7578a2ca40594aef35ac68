import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/jwk.d.ts

/**
 * Key to uniquely identify a JWK.
 *
 * @generated from protobuf message sui.rpc.v2.JwkId
 */
interface JwkId {
  /**
   * The issuer or identity of the OIDC provider.
   *
   * @generated from protobuf field: optional string iss = 1;
   */
  iss?: string;
  /**
   * A key ID used to uniquely identify a key from an OIDC provider.
   *
   * @generated from protobuf field: optional string kid = 2;
   */
  kid?: string;
}
/**
 * A JSON web key.
 *
 * Struct that contains info for a JWK. A list of them for different kinds can
 * be retrieved from the JWK endpoint (for example, <https://www.googleapis.com/oauth2/v3/certs>).
 * The JWK is used to verify the JWT token.
 *
 * @generated from protobuf message sui.rpc.v2.Jwk
 */
interface Jwk {
  /**
   * Key type parameter, https://datatracker.ietf.org/doc/html/rfc7517#section-4.1.
   *
   * @generated from protobuf field: optional string kty = 1;
   */
  kty?: string;
  /**
   * RSA public exponent, https://datatracker.ietf.org/doc/html/rfc7517#section-9.3.
   *
   * @generated from protobuf field: optional string e = 2;
   */
  e?: string;
  /**
   * RSA modulus, https://datatracker.ietf.org/doc/html/rfc7517#section-9.3.
   *
   * @generated from protobuf field: optional string n = 3;
   */
  n?: string;
  /**
   * Algorithm parameter, https://datatracker.ietf.org/doc/html/rfc7517#section-4.4.
   *
   * @generated from protobuf field: optional string alg = 4;
   */
  alg?: string;
}
declare class JwkId$Type extends MessageType<JwkId> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.JwkId
 */
declare const JwkId: JwkId$Type;
declare class Jwk$Type extends MessageType<Jwk> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Jwk
 */
declare const Jwk: Jwk$Type;
//#endregion
export { Jwk, JwkId };
//# sourceMappingURL=jwk.d.mts.map