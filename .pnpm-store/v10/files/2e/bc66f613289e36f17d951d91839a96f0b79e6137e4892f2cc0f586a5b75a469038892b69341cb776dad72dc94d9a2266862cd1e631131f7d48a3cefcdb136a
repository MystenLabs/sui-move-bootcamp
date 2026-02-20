import { Value } from "../../../google/protobuf/struct.mjs";
import { Bcs } from "./bcs.mjs";
import { Package } from "./move_package.mjs";
import { Owner } from "./owner.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/object.d.ts

/**
 * An object on the Sui blockchain.
 *
 * @generated from protobuf message sui.rpc.v2.Object
 */
interface Object$1 {
  /**
   * This Object serialized as BCS.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * `ObjectId` for this object.
   *
   * @generated from protobuf field: optional string object_id = 2;
   */
  objectId?: string;
  /**
   * Version of the object.
   *
   * @generated from protobuf field: optional uint64 version = 3;
   */
  version?: bigint;
  /**
   * The digest of this Object.
   *
   * @generated from protobuf field: optional string digest = 4;
   */
  digest?: string;
  /**
   * Owner of the object.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Owner owner = 5;
   */
  owner?: Owner;
  /**
   * The type of this object.
   *
   * This will be 'package' for packages and a StructTag for move structs.
   *
   * @generated from protobuf field: optional string object_type = 6;
   */
  objectType?: string;
  /**
   * DEPRECATED this field is no longer used to determine whether a tx can transfer this
   * object. Instead, it is always calculated from the objects type when loaded in execution.
   *
   * Only set for Move structs
   *
   * @generated from protobuf field: optional bool has_public_transfer = 7;
   */
  hasPublicTransfer?: boolean;
  /**
   * BCS bytes of a Move struct value.
   *
   * Only set for Move structs
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs contents = 8;
   */
  contents?: Bcs;
  /**
   * Package information for Move Packages
   *
   * @generated from protobuf field: optional sui.rpc.v2.Package package = 9;
   */
  package?: Package;
  /**
   * The digest of the transaction that created or last mutated this object
   *
   * @generated from protobuf field: optional string previous_transaction = 10;
   */
  previousTransaction?: string;
  /**
   * The amount of SUI to rebate if this object gets deleted.
   * This number is re-calculated each time the object is mutated based on
   * the present storage gas price.
   *
   * @generated from protobuf field: optional uint64 storage_rebate = 11;
   */
  storageRebate?: bigint;
  /**
   * JSON rendering of the object.
   *
   * @generated from protobuf field: optional google.protobuf.Value json = 100;
   */
  json?: Value;
  /**
   * Current balance if this object is a `0x2::coin::Coin<T>`
   *
   * @generated from protobuf field: optional uint64 balance = 101;
   */
  balance?: bigint;
}
/**
 * Set of Objects
 *
 * @generated from protobuf message sui.rpc.v2.ObjectSet
 */
interface ObjectSet {
  /**
   * Objects are sorted by the key `(object_id, version)`.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Object objects = 1;
   */
  objects: Object$1[];
}
declare class Object$Type extends MessageType<Object$1> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Object
 */
declare const Object$1: Object$Type;
declare class ObjectSet$Type extends MessageType<ObjectSet> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ObjectSet
 */
declare const ObjectSet: ObjectSet$Type;
//#endregion
export { Object$1 as Object, ObjectSet };
//# sourceMappingURL=object.d.mts.map