import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/owner.d.ts

/**
 * Enum of different types of ownership for an object.
 *
 * @generated from protobuf message sui.rpc.v2.Owner
 */
interface Owner {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Owner.OwnerKind kind = 1;
   */
  kind?: Owner_OwnerKind;
  /**
   * Address or ObjectId of the owner
   *
   * @generated from protobuf field: optional string address = 2;
   */
  address?: string;
  /**
   * The `initial_shared_version` if kind is `SHARED` or `start_version` if kind `CONSENSUS_ADDRESS`.
   *
   * @generated from protobuf field: optional uint64 version = 3;
   */
  version?: bigint;
}
/**
 * @generated from protobuf enum sui.rpc.v2.Owner.OwnerKind
 */
declare enum Owner_OwnerKind {
  /**
   * @generated from protobuf enum value: OWNER_KIND_UNKNOWN = 0;
   */
  OWNER_KIND_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: ADDRESS = 1;
   */
  ADDRESS = 1,
  /**
   * @generated from protobuf enum value: OBJECT = 2;
   */
  OBJECT = 2,
  /**
   * @generated from protobuf enum value: SHARED = 3;
   */
  SHARED = 3,
  /**
   * @generated from protobuf enum value: IMMUTABLE = 4;
   */
  IMMUTABLE = 4,
  /**
   * @generated from protobuf enum value: CONSENSUS_ADDRESS = 5;
   */
  CONSENSUS_ADDRESS = 5,
}
declare class Owner$Type extends MessageType<Owner> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Owner
 */
declare const Owner: Owner$Type;
//#endregion
export { Owner, Owner_OwnerKind };
//# sourceMappingURL=owner.d.mts.map