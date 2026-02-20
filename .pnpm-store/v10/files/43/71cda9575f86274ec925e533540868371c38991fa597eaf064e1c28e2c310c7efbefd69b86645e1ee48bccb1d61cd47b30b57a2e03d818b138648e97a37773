import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/system_state.d.ts

/**
 * @generated from protobuf message sui.rpc.v2.SystemState
 */
interface SystemState {
  /**
   * The version of the system state data structure type.
   *
   * @generated from protobuf field: optional uint64 version = 1;
   */
  version?: bigint;
  /**
   * The epoch id
   *
   * @generated from protobuf field: optional uint64 epoch = 2;
   */
  epoch?: bigint;
  /**
   * The protocol version
   *
   * @generated from protobuf field: optional uint64 protocol_version = 3;
   */
  protocolVersion?: bigint;
  /**
   * Information about the validators
   *
   * @generated from protobuf field: optional sui.rpc.v2.ValidatorSet validators = 4;
   */
  validators?: ValidatorSet;
  /**
   * Storage Fund info
   *
   * @generated from protobuf field: optional sui.rpc.v2.StorageFund storage_fund = 5;
   */
  storageFund?: StorageFund;
  /**
   * Set of system config parameters
   *
   * @generated from protobuf field: optional sui.rpc.v2.SystemParameters parameters = 6;
   */
  parameters?: SystemParameters;
  /**
   * The reference gas price for this epoch
   *
   * @generated from protobuf field: optional uint64 reference_gas_price = 7;
   */
  referenceGasPrice?: bigint;
  /**
   * A list of the records of validator reporting each other.
   *
   * There is an entry in this list for each validator that has been reported
   * at least once. Each record contains all the validators that reported
   * them. If a validator has never been reported they don't have a record in this list.
   * This lists persists across epoch: a peer continues being in a reported state until the
   * reporter doesn't explicitly remove their report.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ValidatorReportRecord validator_report_records = 8;
   */
  validatorReportRecords: ValidatorReportRecord[];
  /**
   * Schedule of stake subsidies given out each epoch.
   *
   * @generated from protobuf field: optional sui.rpc.v2.StakeSubsidy stake_subsidy = 9;
   */
  stakeSubsidy?: StakeSubsidy;
  /**
   * Whether the system is running in a downgraded safe mode due to a non-recoverable bug.
   * This is set whenever we failed to execute advance_epoch, and ended up executing advance_epoch_safe_mode.
   * It can be reset once we are able to successfully execute advance_epoch.
   * The rest of the fields starting with `safe_mode_` are accumulated during safe mode
   * when advance_epoch_safe_mode is executed. They will eventually be processed once we
   * are out of safe mode.
   *
   * @generated from protobuf field: optional bool safe_mode = 10;
   */
  safeMode?: boolean;
  /**
   * Storage rewards accumulated during safe_mode
   *
   * @generated from protobuf field: optional uint64 safe_mode_storage_rewards = 11;
   */
  safeModeStorageRewards?: bigint;
  /**
   * Computation rewards accumulated during safe_mode
   *
   * @generated from protobuf field: optional uint64 safe_mode_computation_rewards = 12;
   */
  safeModeComputationRewards?: bigint;
  /**
   * Storage rebates paid out during safe_mode
   *
   * @generated from protobuf field: optional uint64 safe_mode_storage_rebates = 13;
   */
  safeModeStorageRebates?: bigint;
  /**
   * Nonrefundable storage fees accumulated during safe_mode
   *
   * @generated from protobuf field: optional uint64 safe_mode_non_refundable_storage_fee = 14;
   */
  safeModeNonRefundableStorageFee?: bigint;
  /**
   * Unix timestamp of when this this epoch started
   *
   * @generated from protobuf field: optional uint64 epoch_start_timestamp_ms = 15;
   */
  epochStartTimestampMs?: bigint;
  /**
   * Any extra fields that's not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 16;
   */
  extraFields?: MoveTable;
}
/**
 * @generated from protobuf message sui.rpc.v2.ValidatorReportRecord
 */
interface ValidatorReportRecord {
  /**
   * The address of the validator being reported
   *
   * @generated from protobuf field: optional string reported = 1;
   */
  reported?: string;
  /**
   * The list of validator (addresses) that are reporting on the validator specified by `reported`
   *
   * @generated from protobuf field: repeated string reporters = 2;
   */
  reporters: string[];
}
/**
 * @generated from protobuf message sui.rpc.v2.SystemParameters
 */
interface SystemParameters {
  /**
   * The duration of an epoch, in milliseconds.
   *
   * @generated from protobuf field: optional uint64 epoch_duration_ms = 1;
   */
  epochDurationMs?: bigint;
  /**
   * The starting epoch in which stake subsidies start being paid out
   *
   * @generated from protobuf field: optional uint64 stake_subsidy_start_epoch = 2;
   */
  stakeSubsidyStartEpoch?: bigint;
  /**
   * Minimum number of active validators at any moment.
   *
   * @generated from protobuf field: optional uint64 min_validator_count = 3;
   */
  minValidatorCount?: bigint;
  /**
   * Maximum number of active validators at any moment.
   * We do not allow the number of validators in any epoch to go above this.
   *
   * @generated from protobuf field: optional uint64 max_validator_count = 4;
   */
  maxValidatorCount?: bigint;
  /**
   * Deprecated.
   * Lower-bound on the amount of stake required to become a validator.
   *
   * @generated from protobuf field: optional uint64 min_validator_joining_stake = 5;
   */
  minValidatorJoiningStake?: bigint;
  /**
   * Deprecated.
   * Validators with stake amount below `validator_low_stake_threshold` are considered to
   * have low stake and will be escorted out of the validator set after being below this
   * threshold for more than `validator_low_stake_grace_period` number of epochs.
   *
   * @generated from protobuf field: optional uint64 validator_low_stake_threshold = 6;
   */
  validatorLowStakeThreshold?: bigint;
  /**
   * Deprecated.
   * Validators with stake below `validator_very_low_stake_threshold` will be removed
   * immediately at epoch change, no grace period.
   *
   * @generated from protobuf field: optional uint64 validator_very_low_stake_threshold = 7;
   */
  validatorVeryLowStakeThreshold?: bigint;
  /**
   * A validator can have stake below `validator_low_stake_threshold`
   * for this many epochs before being kicked out.
   *
   * @generated from protobuf field: optional uint64 validator_low_stake_grace_period = 8;
   */
  validatorLowStakeGracePeriod?: bigint;
  /**
   * Any extra fields that are not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 9;
   */
  extraFields?: MoveTable;
}
/**
 * A message that represents a Move `0x2::table::Table` or `0x2::bag::Bag`
 *
 * @generated from protobuf message sui.rpc.v2.MoveTable
 */
interface MoveTable {
  /**
   * The UID of the table or bag
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * The size or number of key-value pairs in the table or bag
   *
   * @generated from protobuf field: optional uint64 size = 2;
   */
  size?: bigint;
}
/**
 * @generated from protobuf message sui.rpc.v2.StakeSubsidy
 */
interface StakeSubsidy {
  /**
   * Balance of SUI set aside for stake subsidies that will be drawn down over time.
   *
   * @generated from protobuf field: optional uint64 balance = 1;
   */
  balance?: bigint;
  /**
   * Count of the number of times stake subsidies have been distributed.
   *
   * @generated from protobuf field: optional uint64 distribution_counter = 2;
   */
  distributionCounter?: bigint;
  /**
   * The amount of stake subsidy to be drawn down per distribution.
   * This amount decays and decreases over time.
   *
   * @generated from protobuf field: optional uint64 current_distribution_amount = 3;
   */
  currentDistributionAmount?: bigint;
  /**
   * Number of distributions to occur before the distribution amount decays.
   *
   * @generated from protobuf field: optional uint64 stake_subsidy_period_length = 4;
   */
  stakeSubsidyPeriodLength?: bigint;
  /**
   * The rate at which the distribution amount decays at the end of each
   * period. Expressed in basis points.
   *
   * @generated from protobuf field: optional uint32 stake_subsidy_decrease_rate = 5;
   */
  stakeSubsidyDecreaseRate?: number;
  /**
   * Any extra fields that's not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 6;
   */
  extraFields?: MoveTable;
}
/**
 * Struct representing the onchain storage fund.
 *
 * @generated from protobuf message sui.rpc.v2.StorageFund
 */
interface StorageFund {
  /**
   * This is the sum of `storage_rebate` of
   * all objects currently stored on-chain. To maintain this invariant, the only inflow of this
   * balance is storage charges collected from transactions, and the only outflow is storage rebates
   * of transactions, including both the portion refunded to the transaction senders as well as
   * the non-refundable portion taken out and put into `non_refundable_balance`.
   *
   * @generated from protobuf field: optional uint64 total_object_storage_rebates = 1;
   */
  totalObjectStorageRebates?: bigint;
  /**
   * Represents any remaining inflow of the storage fund that should not
   * be taken out of the fund.
   *
   * @generated from protobuf field: optional uint64 non_refundable_balance = 2;
   */
  nonRefundableBalance?: bigint;
}
/**
 * @generated from protobuf message sui.rpc.v2.ValidatorSet
 */
interface ValidatorSet {
  /**
   * Total amount of stake from all active validators at the beginning of the epoch.
   * Written only once per epoch, in `advance_epoch` function.
   *
   * @generated from protobuf field: optional uint64 total_stake = 1;
   */
  totalStake?: bigint;
  /**
   * The current list of active validators.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Validator active_validators = 2;
   */
  activeValidators: Validator[];
  /**
   * List of new validator candidates added during the current epoch.
   * They will be processed at the end of the epoch.
   *
   * key: u64 (index), value: 0x3::validator::Validator
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable pending_active_validators = 3;
   */
  pendingActiveValidators?: MoveTable;
  /**
   * Removal requests from the validators. Each element is an index
   * pointing to `active_validators`.
   *
   * @generated from protobuf field: repeated uint64 pending_removals = 4;
   */
  pendingRemovals: bigint[];
  /**
   * Mappings from staking pool's ID to the sui address of a validator.
   *
   * key: address (staking pool Id), value: address (sui address of the validator)
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable staking_pool_mappings = 5;
   */
  stakingPoolMappings?: MoveTable;
  /**
   * Mapping from a staking pool ID to the inactive validator that has that pool as its staking pool.
   * When a validator is deactivated the validator is removed from `active_validators` it
   * is added to this table so that stakers can continue to withdraw their stake from it.
   *
   * key: address (staking pool Id), value: 0x3::validator_wrapper::ValidatorWrapper
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable inactive_validators = 6;
   */
  inactiveValidators?: MoveTable;
  /**
   * Table storing preactive/candidate validators, mapping their addresses to their `Validator ` structs.
   * When an address calls `request_add_validator_candidate`, they get added to this table and become a preactive
   * validator.
   * When the candidate has met the min stake requirement, they can call `request_add_validator` to
   * officially add them to the active validator set `active_validators` next epoch.
   *
   * key: address (sui address of the validator), value: 0x3::validator_wrapper::ValidatorWrapper
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable validator_candidates = 7;
   */
  validatorCandidates?: MoveTable;
  /**
   * Table storing the number of epochs during which a validator's stake has been below the low stake threshold.
   *
   * @generated from protobuf field: map<string, uint64> at_risk_validators = 8;
   */
  atRiskValidators: {
    [key: string]: bigint;
  };
  /**
   * Any extra fields that's not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 9;
   */
  extraFields?: MoveTable;
}
/**
 * Definition of a Validator in the system contracts
 *
 * Note: fields of ValidatorMetadata are flattened into this type
 *
 * @generated from protobuf message sui.rpc.v2.Validator
 */
interface Validator {
  /**
   * A unique human-readable name of this validator.
   *
   * @generated from protobuf field: optional string name = 1;
   */
  name?: string;
  /**
   * The Sui Address of the validator. This is the sender that created the Validator object,
   * and also the address to send validator/coins to during withdraws.
   *
   * @generated from protobuf field: optional string address = 2;
   */
  address?: string;
  /**
   * @generated from protobuf field: optional string description = 3;
   */
  description?: string;
  /**
   * @generated from protobuf field: optional string image_url = 4;
   */
  imageUrl?: string;
  /**
   * @generated from protobuf field: optional string project_url = 5;
   */
  projectUrl?: string;
  /**
   * The public key bytes corresponding to the private key that the validator
   * holds to sign transactions. For now, this is the same as AuthorityName.
   *
   * @generated from protobuf field: optional bytes protocol_public_key = 7;
   */
  protocolPublicKey?: Uint8Array;
  /**
   * This is a proof that the validator has ownership of the protocol private key
   *
   * @generated from protobuf field: optional bytes proof_of_possession = 8;
   */
  proofOfPossession?: Uint8Array;
  /**
   * The public key bytes corresponding to the private key that the validator
   * uses to establish TLS connections
   *
   * @generated from protobuf field: optional bytes network_public_key = 10;
   */
  networkPublicKey?: Uint8Array;
  /**
   * The public key bytes corresponding to the Narwhal Worker
   *
   * @generated from protobuf field: optional bytes worker_public_key = 12;
   */
  workerPublicKey?: Uint8Array;
  /**
   * The network address of the validator (could also contain extra info such as port, DNS and etc.).
   *
   * @generated from protobuf field: optional string network_address = 13;
   */
  networkAddress?: string;
  /**
   * The address of the validator used for p2p activities such as state sync (could also contain extra info such as port, DNS and etc.).
   *
   * @generated from protobuf field: optional string p2p_address = 14 [json_name = "p2pAddress"];
   */
  p2PAddress?: string;
  /**
   * The address of the narwhal primary
   *
   * @generated from protobuf field: optional string primary_address = 15;
   */
  primaryAddress?: string;
  /**
   * The address of the narwhal worker
   *
   * @generated from protobuf field: optional string worker_address = 16;
   */
  workerAddress?: string;
  /**
   * @generated from protobuf field: optional bytes next_epoch_protocol_public_key = 18;
   */
  nextEpochProtocolPublicKey?: Uint8Array;
  /**
   * @generated from protobuf field: optional bytes next_epoch_proof_of_possession = 19;
   */
  nextEpochProofOfPossession?: Uint8Array;
  /**
   * @generated from protobuf field: optional bytes next_epoch_network_public_key = 21;
   */
  nextEpochNetworkPublicKey?: Uint8Array;
  /**
   * @generated from protobuf field: optional bytes next_epoch_worker_public_key = 23;
   */
  nextEpochWorkerPublicKey?: Uint8Array;
  /**
   * @generated from protobuf field: optional string next_epoch_network_address = 24;
   */
  nextEpochNetworkAddress?: string;
  /**
   * @generated from protobuf field: optional string next_epoch_p2p_address = 25 [json_name = "nextEpochP2pAddress"];
   */
  nextEpochP2PAddress?: string;
  /**
   * @generated from protobuf field: optional string next_epoch_primary_address = 26;
   */
  nextEpochPrimaryAddress?: string;
  /**
   * @generated from protobuf field: optional string next_epoch_worker_address = 27;
   */
  nextEpochWorkerAddress?: string;
  /**
   * Any extra fields that's not defined statically in the `ValidatorMetadata` struct
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable metadata_extra_fields = 28;
   */
  metadataExtraFields?: MoveTable;
  /**
   * The voting power of this validator, which might be different from its
   * stake amount.
   *
   * @generated from protobuf field: optional uint64 voting_power = 29;
   */
  votingPower?: bigint;
  /**
   * The ID of this validator's current valid `UnverifiedValidatorOperationCap`
   *
   * @generated from protobuf field: optional string operation_cap_id = 30;
   */
  operationCapId?: string;
  /**
   * Gas price quote, updated only at end of epoch.
   *
   * @generated from protobuf field: optional uint64 gas_price = 31;
   */
  gasPrice?: bigint;
  /**
   * Staking pool for this validator.
   *
   * @generated from protobuf field: optional sui.rpc.v2.StakingPool staking_pool = 32;
   */
  stakingPool?: StakingPool;
  /**
   * Commission rate of the validator, in basis point.
   *
   * @generated from protobuf field: optional uint64 commission_rate = 33;
   */
  commissionRate?: bigint;
  /**
   * Total amount of stake that would be active in the next epoch.
   *
   * @generated from protobuf field: optional uint64 next_epoch_stake = 34;
   */
  nextEpochStake?: bigint;
  /**
   * This validator's gas price quote for the next epoch.
   *
   * @generated from protobuf field: optional uint64 next_epoch_gas_price = 35;
   */
  nextEpochGasPrice?: bigint;
  /**
   * The commission rate of the validator starting the next epoch, in basis point.
   *
   * @generated from protobuf field: optional uint64 next_epoch_commission_rate = 36;
   */
  nextEpochCommissionRate?: bigint;
  /**
   * Any extra fields that's not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 37;
   */
  extraFields?: MoveTable;
}
/**
 * A staking pool embedded in each validator struct in the system state object.
 *
 * @generated from protobuf message sui.rpc.v2.StakingPool
 */
interface StakingPool {
  /**
   * UID of the StakingPool object
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * The epoch at which this pool became active.
   * The value is `None` if the pool is pre-active and `Some(<epoch_number>)` if active or inactive.
   *
   * @generated from protobuf field: optional uint64 activation_epoch = 2;
   */
  activationEpoch?: bigint;
  /**
   * The epoch at which this staking pool ceased to be active. `None` = {pre-active, active},
   * `Some(<epoch_number>)` if in-active, and it was de-activated at epoch `<epoch_number>`.
   *
   * @generated from protobuf field: optional uint64 deactivation_epoch = 3;
   */
  deactivationEpoch?: bigint;
  /**
   * The total number of SUI tokens in this pool, including the SUI in the rewards_pool, as well as in all the principal
   * in the `StakedSui` object, updated at epoch boundaries.
   *
   * @generated from protobuf field: optional uint64 sui_balance = 4;
   */
  suiBalance?: bigint;
  /**
   * The epoch stake rewards will be added here at the end of each epoch.
   *
   * @generated from protobuf field: optional uint64 rewards_pool = 5;
   */
  rewardsPool?: bigint;
  /**
   * Total number of pool tokens issued by the pool.
   *
   * @generated from protobuf field: optional uint64 pool_token_balance = 6;
   */
  poolTokenBalance?: bigint;
  /**
   * Exchange rate history of previous epochs.
   *
   * The entries start from the `activation_epoch` of this pool and contains exchange rates at the beginning of each epoch,
   * i.e., right after the rewards for the previous epoch have been deposited into the pool.
   *
   * key: u64 (epoch number), value: PoolTokenExchangeRate
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable exchange_rates = 7;
   */
  exchangeRates?: MoveTable;
  /**
   * Pending stake amount for this epoch, emptied at epoch boundaries.
   *
   * @generated from protobuf field: optional uint64 pending_stake = 8;
   */
  pendingStake?: bigint;
  /**
   * Pending stake withdrawn during the current epoch, emptied at epoch boundaries.
   * This includes both the principal and rewards SUI withdrawn.
   *
   * @generated from protobuf field: optional uint64 pending_total_sui_withdraw = 9;
   */
  pendingTotalSuiWithdraw?: bigint;
  /**
   * Pending pool token withdrawn during the current epoch, emptied at epoch boundaries.
   *
   * @generated from protobuf field: optional uint64 pending_pool_token_withdraw = 10;
   */
  pendingPoolTokenWithdraw?: bigint;
  /**
   * Any extra fields that's not defined statically.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveTable extra_fields = 11;
   */
  extraFields?: MoveTable;
}
declare class SystemState$Type extends MessageType<SystemState> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SystemState
 */
declare const SystemState: SystemState$Type;
declare class ValidatorReportRecord$Type extends MessageType<ValidatorReportRecord> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorReportRecord
 */
declare const ValidatorReportRecord: ValidatorReportRecord$Type;
declare class SystemParameters$Type extends MessageType<SystemParameters> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SystemParameters
 */
declare const SystemParameters: SystemParameters$Type;
declare class MoveTable$Type extends MessageType<MoveTable> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MoveTable
 */
declare const MoveTable: MoveTable$Type;
declare class StakeSubsidy$Type extends MessageType<StakeSubsidy> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.StakeSubsidy
 */
declare const StakeSubsidy: StakeSubsidy$Type;
declare class StorageFund$Type extends MessageType<StorageFund> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.StorageFund
 */
declare const StorageFund: StorageFund$Type;
declare class ValidatorSet$Type extends MessageType<ValidatorSet> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorSet
 */
declare const ValidatorSet: ValidatorSet$Type;
declare class Validator$Type extends MessageType<Validator> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Validator
 */
declare const Validator: Validator$Type;
declare class StakingPool$Type extends MessageType<StakingPool> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.StakingPool
 */
declare const StakingPool: StakingPool$Type;
//#endregion
export { MoveTable, StakeSubsidy, StakingPool, StorageFund, SystemParameters, SystemState, Validator, ValidatorReportRecord, ValidatorSet };
//# sourceMappingURL=system_state.d.mts.map