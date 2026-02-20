import { Checkpoint, DynamicFieldInfo, SuiCallArg, SuiMoveNormalizedModule, SuiParsedData, SuiTransaction, SuiValidatorSummary } from "./generated.mjs";

//#region src/jsonRpc/types/chain.d.ts
type ResolvedNameServiceNames = {
  data: string[];
  hasNextPage: boolean;
  nextCursor: string | null;
};
type EpochInfo = {
  epoch: string;
  validators: SuiValidatorSummary[];
  epochTotalTransactions: string;
  firstCheckpointId: string;
  epochStartTimestamp: string;
  endOfEpochInfo: EndOfEpochInfo | null;
  referenceGasPrice: number | null;
};
type EpochMetrics = {
  epoch: string;
  epochTotalTransactions: string;
  firstCheckpointId: string;
  epochStartTimestamp: string;
  endOfEpochInfo: EndOfEpochInfo | null;
};
type EpochPage = {
  data: EpochInfo[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
type EpochMetricsPage = {
  data: EpochMetrics[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
type EndOfEpochInfo = {
  lastCheckpointId: string;
  epochEndTimestamp: string;
  protocolVersion: string;
  referenceGasPrice: string;
  totalStake: string;
  storageFundReinvestment: string;
  storageCharge: string;
  storageRebate: string;
  storageFundBalance: string;
  stakeSubsidyAmount: string;
  totalGasFees: string;
  totalStakeRewardsDistributed: string;
  leftoverStorageFundInflow: string;
};
type CheckpointPage = {
  data: Checkpoint[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
type NetworkMetrics = {
  currentTps: number;
  tps30Days: number;
  currentCheckpoint: string;
  currentEpoch: string;
  totalAddresses: string;
  totalObjects: string;
  totalPackages: string;
};
type AddressMetrics = {
  checkpoint: number;
  epoch: number;
  timestampMs: number;
  cumulativeAddresses: number;
  cumulativeActiveAddresses: number;
  dailyActiveAddresses: number;
};
type AllEpochsAddressMetrics = AddressMetrics[];
type MoveCallMetrics = {
  rank3Days: MoveCallMetric[];
  rank7Days: MoveCallMetric[];
  rank30Days: MoveCallMetric[];
};
type MoveCallMetric = [{
  module: string;
  package: string;
  function: string;
}, string];
type DynamicFieldPage = {
  data: DynamicFieldInfo[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
type SuiMoveNormalizedModules = Record<string, SuiMoveNormalizedModule>;
type SuiMoveObject = Extract<SuiParsedData, {
  dataType: 'moveObject';
}>;
type SuiMovePackage = Extract<SuiParsedData, {
  dataType: 'package';
}>;
type ProgrammableTransaction = {
  transactions: SuiTransaction[];
  inputs: SuiCallArg[];
};
//#endregion
export { AddressMetrics, AllEpochsAddressMetrics, CheckpointPage, DynamicFieldPage, EndOfEpochInfo, EpochInfo, EpochMetrics, EpochMetricsPage, EpochPage, MoveCallMetric, MoveCallMetrics, NetworkMetrics, ProgrammableTransaction, ResolvedNameServiceNames, SuiMoveNormalizedModules, SuiMoveObject, SuiMovePackage };
//# sourceMappingURL=chain.d.mts.map