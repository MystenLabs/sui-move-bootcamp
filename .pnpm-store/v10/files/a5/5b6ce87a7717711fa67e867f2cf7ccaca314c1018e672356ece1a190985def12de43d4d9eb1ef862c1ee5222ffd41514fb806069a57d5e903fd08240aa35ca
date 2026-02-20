import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/gas_cost_summary.d.ts

/**
 * Summary of gas charges.
 *
 * @generated from protobuf message sui.rpc.v2.GasCostSummary
 */
interface GasCostSummary {
  /**
   * Cost of computation/execution.
   *
   * @generated from protobuf field: optional uint64 computation_cost = 1;
   */
  computationCost?: bigint;
  /**
   * Storage cost, it's the sum of all storage cost for all objects created or mutated.
   *
   * @generated from protobuf field: optional uint64 storage_cost = 2;
   */
  storageCost?: bigint;
  /**
   * The amount of storage cost refunded to the user for all objects deleted or mutated in the
   * transaction.
   *
   * @generated from protobuf field: optional uint64 storage_rebate = 3;
   */
  storageRebate?: bigint;
  /**
   * The fee for the rebate. The portion of the storage rebate kept by the system.
   *
   * @generated from protobuf field: optional uint64 non_refundable_storage_fee = 4;
   */
  nonRefundableStorageFee?: bigint;
}
declare class GasCostSummary$Type extends MessageType<GasCostSummary> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GasCostSummary
 */
declare const GasCostSummary: GasCostSummary$Type;
//#endregion
export { GasCostSummary };
//# sourceMappingURL=gas_cost_summary.d.mts.map