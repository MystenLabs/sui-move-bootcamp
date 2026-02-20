import { Value } from "../../../google/protobuf/struct.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/input.d.ts

/**
 * An input to a user transaction.
 *
 * @generated from protobuf message sui.rpc.v2.Input
 */
interface Input {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Input.InputKind kind = 1;
   */
  kind?: Input_InputKind;
  /**
   * A move value serialized as BCS.
   *
   * For normal operations this is required to be a move primitive type and not contain structs
   * or objects.
   *
   * @generated from protobuf field: optional bytes pure = 2;
   */
  pure?: Uint8Array;
  /**
   * `ObjectId` of the object input.
   *
   * @generated from protobuf field: optional string object_id = 3;
   */
  objectId?: string;
  /**
   * Requested version of the input object when `kind` is `IMMUTABLE_OR_OWNED`
   * or `RECEIVING` or if `kind` is `SHARED` this is the initial version of the
   * object when it was shared
   *
   * @generated from protobuf field: optional uint64 version = 4;
   */
  version?: bigint;
  /**
   * The digest of this object.
   *
   * @generated from protobuf field: optional string digest = 5;
   */
  digest?: string;
  /**
   * Controls whether the caller asks for a mutable reference to the shared
   * object.
   *
   * @generated from protobuf field: optional bool mutable = 6;
   */
  mutable?: boolean;
  /**
   * NOTE: For backwards compatibility purposes the addition of the new
   * `NON_EXCLUSIVE_WRITE` mutability variant requires providing a new field.
   * The old `mutable` field will continue to be populated and respected as an
   * input for the time being.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Input.Mutability mutability = 7;
   */
  mutability?: Input_Mutability;
  /**
   * Fund Reservation information if `kind` is `FUNDS_WITHDRAWAL`.
   *
   * @generated from protobuf field: optional sui.rpc.v2.FundsWithdrawal funds_withdrawal = 8;
   */
  fundsWithdrawal?: FundsWithdrawal;
  /**
   * A literal value
   *
   * INPUT ONLY
   *
   * @generated from protobuf field: optional google.protobuf.Value literal = 1000;
   */
  literal?: Value;
}
/**
 * @generated from protobuf enum sui.rpc.v2.Input.InputKind
 */
declare enum Input_InputKind {
  /**
   * @generated from protobuf enum value: INPUT_KIND_UNKNOWN = 0;
   */
  INPUT_KIND_UNKNOWN = 0,
  /**
   * A move value serialized as BCS.
   *
   * @generated from protobuf enum value: PURE = 1;
   */
  PURE = 1,
  /**
   * A Move object that is either immutable or address owned.
   *
   * @generated from protobuf enum value: IMMUTABLE_OR_OWNED = 2;
   */
  IMMUTABLE_OR_OWNED = 2,
  /**
   * A Move object whose owner is "Shared".
   *
   * @generated from protobuf enum value: SHARED = 3;
   */
  SHARED = 3,
  /**
   * A Move object that is attempted to be received in this transaction.
   *
   * @generated from protobuf enum value: RECEIVING = 4;
   */
  RECEIVING = 4,
  /**
   * Reservation to withdraw balance from a funds accumulator
   *
   * @generated from protobuf enum value: FUNDS_WITHDRAWAL = 5;
   */
  FUNDS_WITHDRAWAL = 5,
}
/**
 * @generated from protobuf enum sui.rpc.v2.Input.Mutability
 */
declare enum Input_Mutability {
  /**
   * @generated from protobuf enum value: MUTABILITY_UNKNOWN = 0;
   */
  MUTABILITY_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: IMMUTABLE = 1;
   */
  IMMUTABLE = 1,
  /**
   * @generated from protobuf enum value: MUTABLE = 2;
   */
  MUTABLE = 2,
  /**
   * Non-exclusive write is used to allow multiple transactions to
   * simultaneously add disjoint dynamic fields to an object.
   * (Currently only used by settlement transactions).
   *
   * @generated from protobuf enum value: NON_EXCLUSIVE_WRITE = 3;
   */
  NON_EXCLUSIVE_WRITE = 3,
}
/**
 * @generated from protobuf message sui.rpc.v2.FundsWithdrawal
 */
interface FundsWithdrawal {
  /**
   * @generated from protobuf field: optional uint64 amount = 1;
   */
  amount?: bigint;
  /**
   * @generated from protobuf field: optional string coin_type = 2;
   */
  coinType?: string;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.FundsWithdrawal.Source source = 3;
   */
  source?: FundsWithdrawal_Source;
}
/**
 * @generated from protobuf enum sui.rpc.v2.FundsWithdrawal.Source
 */
declare enum FundsWithdrawal_Source {
  /**
   * @generated from protobuf enum value: SOURCE_UNKNOWN = 0;
   */
  SOURCE_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: SENDER = 1;
   */
  SENDER = 1,
  /**
   * @generated from protobuf enum value: SPONSOR = 2;
   */
  SPONSOR = 2,
}
declare class Input$Type extends MessageType<Input> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Input
 */
declare const Input: Input$Type;
declare class FundsWithdrawal$Type extends MessageType<FundsWithdrawal> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.FundsWithdrawal
 */
declare const FundsWithdrawal: FundsWithdrawal$Type;
//#endregion
export { FundsWithdrawal, FundsWithdrawal_Source, Input, Input_InputKind, Input_Mutability };
//# sourceMappingURL=input.d.mts.map