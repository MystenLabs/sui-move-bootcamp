import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/system_state.ts
var SystemState$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SystemState", [
			{
				no: 1,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "protocol_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "validators",
				kind: "message",
				T: () => ValidatorSet
			},
			{
				no: 5,
				name: "storage_fund",
				kind: "message",
				T: () => StorageFund
			},
			{
				no: 6,
				name: "parameters",
				kind: "message",
				T: () => SystemParameters
			},
			{
				no: 7,
				name: "reference_gas_price",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 8,
				name: "validator_report_records",
				kind: "message",
				repeat: 1,
				T: () => ValidatorReportRecord
			},
			{
				no: 9,
				name: "stake_subsidy",
				kind: "message",
				T: () => StakeSubsidy
			},
			{
				no: 10,
				name: "safe_mode",
				kind: "scalar",
				opt: true,
				T: 8
			},
			{
				no: 11,
				name: "safe_mode_storage_rewards",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 12,
				name: "safe_mode_computation_rewards",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 13,
				name: "safe_mode_storage_rebates",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 14,
				name: "safe_mode_non_refundable_storage_fee",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 15,
				name: "epoch_start_timestamp_ms",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 16,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SystemState
*/
const SystemState = new SystemState$Type();
var ValidatorReportRecord$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorReportRecord", [{
			no: 1,
			name: "reported",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "reporters",
			kind: "scalar",
			repeat: 2,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorReportRecord
*/
const ValidatorReportRecord = new ValidatorReportRecord$Type();
var SystemParameters$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SystemParameters", [
			{
				no: 1,
				name: "epoch_duration_ms",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "stake_subsidy_start_epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "min_validator_count",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "max_validator_count",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "min_validator_joining_stake",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "validator_low_stake_threshold",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "validator_very_low_stake_threshold",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 8,
				name: "validator_low_stake_grace_period",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 9,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SystemParameters
*/
const SystemParameters = new SystemParameters$Type();
var MoveTable$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MoveTable", [{
			no: 1,
			name: "id",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "size",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MoveTable
*/
const MoveTable = new MoveTable$Type();
var StakeSubsidy$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.StakeSubsidy", [
			{
				no: 1,
				name: "balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "distribution_counter",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "current_distribution_amount",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "stake_subsidy_period_length",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "stake_subsidy_decrease_rate",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 6,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.StakeSubsidy
*/
const StakeSubsidy = new StakeSubsidy$Type();
var StorageFund$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.StorageFund", [{
			no: 1,
			name: "total_object_storage_rebates",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "non_refundable_balance",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.StorageFund
*/
const StorageFund = new StorageFund$Type();
var ValidatorSet$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorSet", [
			{
				no: 1,
				name: "total_stake",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "active_validators",
				kind: "message",
				repeat: 1,
				T: () => Validator
			},
			{
				no: 3,
				name: "pending_active_validators",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 4,
				name: "pending_removals",
				kind: "scalar",
				repeat: 1,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "staking_pool_mappings",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 6,
				name: "inactive_validators",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 7,
				name: "validator_candidates",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 8,
				name: "at_risk_validators",
				kind: "map",
				K: 9,
				V: {
					kind: "scalar",
					T: 4,
					L: 0
				}
			},
			{
				no: 9,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorSet
*/
const ValidatorSet = new ValidatorSet$Type();
var Validator$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Validator", [
			{
				no: 1,
				name: "name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "description",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "image_url",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "project_url",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 7,
				name: "protocol_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 8,
				name: "proof_of_possession",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 10,
				name: "network_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 12,
				name: "worker_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 13,
				name: "network_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 14,
				name: "p2p_address",
				kind: "scalar",
				jsonName: "p2pAddress",
				opt: true,
				T: 9
			},
			{
				no: 15,
				name: "primary_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 16,
				name: "worker_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 18,
				name: "next_epoch_protocol_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 19,
				name: "next_epoch_proof_of_possession",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 21,
				name: "next_epoch_network_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 23,
				name: "next_epoch_worker_public_key",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 24,
				name: "next_epoch_network_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 25,
				name: "next_epoch_p2p_address",
				kind: "scalar",
				jsonName: "nextEpochP2pAddress",
				opt: true,
				T: 9
			},
			{
				no: 26,
				name: "next_epoch_primary_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 27,
				name: "next_epoch_worker_address",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 28,
				name: "metadata_extra_fields",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 29,
				name: "voting_power",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 30,
				name: "operation_cap_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 31,
				name: "gas_price",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 32,
				name: "staking_pool",
				kind: "message",
				T: () => StakingPool
			},
			{
				no: 33,
				name: "commission_rate",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 34,
				name: "next_epoch_stake",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 35,
				name: "next_epoch_gas_price",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 36,
				name: "next_epoch_commission_rate",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 37,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Validator
*/
const Validator = new Validator$Type();
var StakingPool$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.StakingPool", [
			{
				no: 1,
				name: "id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "activation_epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "deactivation_epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "sui_balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "rewards_pool",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "pool_token_balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "exchange_rates",
				kind: "message",
				T: () => MoveTable
			},
			{
				no: 8,
				name: "pending_stake",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 9,
				name: "pending_total_sui_withdraw",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 10,
				name: "pending_pool_token_withdraw",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 11,
				name: "extra_fields",
				kind: "message",
				T: () => MoveTable
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.StakingPool
*/
const StakingPool = new StakingPool$Type();

//#endregion
export { MoveTable, StakeSubsidy, StakingPool, StorageFund, SystemParameters, SystemState, Validator, ValidatorReportRecord, ValidatorSet };
//# sourceMappingURL=system_state.mjs.map