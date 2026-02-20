import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/argument.d.ts

/**
 * An argument to a programmable transaction command.
 *
 * @generated from protobuf message sui.rpc.v2.Argument
 */
interface Argument {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.Argument.ArgumentKind kind = 1;
   */
  kind?: Argument_ArgumentKind;
  /**
   * Index of an input when `kind` is `INPUT`.
   *
   * @generated from protobuf field: optional uint32 input = 2;
   */
  input?: number;
  /**
   * Index of a result when `kind` is `RESULT`.
   *
   * @generated from protobuf field: optional uint32 result = 3;
   */
  result?: number;
  /**
   * Used to access a nested result when `kind` is `RESULT`.
   *
   * @generated from protobuf field: optional uint32 subresult = 4;
   */
  subresult?: number;
}
/**
 * @generated from protobuf enum sui.rpc.v2.Argument.ArgumentKind
 */
declare enum Argument_ArgumentKind {
  /**
   * @generated from protobuf enum value: ARGUMENT_KIND_UNKNOWN = 0;
   */
  ARGUMENT_KIND_UNKNOWN = 0,
  /**
   * The gas coin.
   *
   * @generated from protobuf enum value: GAS = 1;
   */
  GAS = 1,
  /**
   * One of the input objects or primitive values (from
   * `ProgrammableTransaction` inputs).
   *
   * @generated from protobuf enum value: INPUT = 2;
   */
  INPUT = 2,
  /**
   * The result of another command (from `ProgrammableTransaction` commands).
   *
   * @generated from protobuf enum value: RESULT = 3;
   */
  RESULT = 3,
}
declare class Argument$Type extends MessageType<Argument> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Argument
 */
declare const Argument: Argument$Type;
//#endregion
export { Argument, Argument_ArgumentKind };
//# sourceMappingURL=argument.d.mts.map