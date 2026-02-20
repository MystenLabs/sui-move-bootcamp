import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { ValidatorCommittee } from "./signature.mjs";
import { ProtocolConfig } from "./protocol_config.mjs";
import { SystemState } from "./system_state.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/epoch.d.ts

/**
 * @generated from protobuf message sui.rpc.v2.Epoch
 */
interface Epoch {
  /**
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * The committee governing this epoch.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ValidatorCommittee committee = 2;
   */
  committee?: ValidatorCommittee;
  /**
   * Snapshot of Sui's SystemState (`0x3::sui_system::SystemState`) at the
   * beginning of the epoch, for past epochs, or the current state for the
   * current epoch.
   *
   * @generated from protobuf field: optional sui.rpc.v2.SystemState system_state = 3;
   */
  systemState?: SystemState;
  /**
   * @generated from protobuf field: optional uint64 first_checkpoint = 4;
   */
  firstCheckpoint?: bigint;
  /**
   * @generated from protobuf field: optional uint64 last_checkpoint = 5;
   */
  lastCheckpoint?: bigint;
  /**
   * @generated from protobuf field: optional google.protobuf.Timestamp start = 6;
   */
  start?: Timestamp;
  /**
   * @generated from protobuf field: optional google.protobuf.Timestamp end = 7;
   */
  end?: Timestamp;
  /**
   * Reference gas price denominated in MIST
   *
   * @generated from protobuf field: optional uint64 reference_gas_price = 8;
   */
  referenceGasPrice?: bigint;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ProtocolConfig protocol_config = 9;
   */
  protocolConfig?: ProtocolConfig;
}
declare class Epoch$Type extends MessageType<Epoch> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Epoch
 */
declare const Epoch: Epoch$Type;
//#endregion
export { Epoch };
//# sourceMappingURL=epoch.d.mts.map