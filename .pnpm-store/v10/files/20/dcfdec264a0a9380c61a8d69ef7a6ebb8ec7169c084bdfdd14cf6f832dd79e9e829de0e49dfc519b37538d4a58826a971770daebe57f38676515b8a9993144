import { Duration } from "../../../google/protobuf/duration.mjs";
import { Jwk, JwkId } from "./jwk.mjs";
import { Bcs } from "./bcs.mjs";
import { Object as Object$1 } from "./object.mjs";
import { Argument } from "./argument.mjs";
import { Input } from "./input.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { ObjectReference } from "./object_reference.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/transaction.ts
/**
* @generated from protobuf enum sui.rpc.v2.TransactionExpiration.TransactionExpirationKind
*/
let TransactionExpiration_TransactionExpirationKind = /* @__PURE__ */ function(TransactionExpiration_TransactionExpirationKind$1) {
	/**
	* @generated from protobuf enum value: TRANSACTION_EXPIRATION_KIND_UNKNOWN = 0;
	*/
	TransactionExpiration_TransactionExpirationKind$1[TransactionExpiration_TransactionExpirationKind$1["TRANSACTION_EXPIRATION_KIND_UNKNOWN"] = 0] = "TRANSACTION_EXPIRATION_KIND_UNKNOWN";
	/**
	* The transaction has no expiration.
	*
	* @generated from protobuf enum value: NONE = 1;
	*/
	TransactionExpiration_TransactionExpirationKind$1[TransactionExpiration_TransactionExpirationKind$1["NONE"] = 1] = "NONE";
	/**
	* Validators won't sign and execute transaction unless the expiration epoch
	* is greater than or equal to the current epoch.
	*
	* @generated from protobuf enum value: EPOCH = 2;
	*/
	TransactionExpiration_TransactionExpirationKind$1[TransactionExpiration_TransactionExpirationKind$1["EPOCH"] = 2] = "EPOCH";
	/**
	* This variant enables gas payments from address balances.
	*
	* When transactions use address balances for gas payment instead of explicit gas coins,
	* we lose the natural transaction uniqueness and replay prevention that comes from
	* mutation of gas coin objects.
	*
	* By bounding expiration and providing a nonce, validators must only retain
	* executed digests for the maximum possible expiry range to differentiate
	* retries from unique transactions with otherwise identical inputs.
	*
	* @generated from protobuf enum value: VALID_DURING = 3;
	*/
	TransactionExpiration_TransactionExpirationKind$1[TransactionExpiration_TransactionExpirationKind$1["VALID_DURING"] = 3] = "VALID_DURING";
	return TransactionExpiration_TransactionExpirationKind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.TransactionKind.Kind
*/
let TransactionKind_Kind = /* @__PURE__ */ function(TransactionKind_Kind$1) {
	/**
	* @generated from protobuf enum value: KIND_UNKNOWN = 0;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["KIND_UNKNOWN"] = 0] = "KIND_UNKNOWN";
	/**
	* A user transaction comprised of a list of native commands and Move calls.
	*
	* @generated from protobuf enum value: PROGRAMMABLE_TRANSACTION = 1;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["PROGRAMMABLE_TRANSACTION"] = 1] = "PROGRAMMABLE_TRANSACTION";
	/**
	* System transaction used to end an epoch.
	*
	* The `ChangeEpoch` variant is now deprecated (but the `ChangeEpoch` struct is still used by
	* `EndOfEpochTransaction`).
	*
	* @generated from protobuf enum value: CHANGE_EPOCH = 2;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["CHANGE_EPOCH"] = 2] = "CHANGE_EPOCH";
	/**
	* Transaction used to initialize the chain state.
	*
	* Only valid if in the genesis checkpoint (0) and if this is the very first transaction ever
	* executed on the chain.
	*
	* @generated from protobuf enum value: GENESIS = 3;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["GENESIS"] = 3] = "GENESIS";
	/**
	* V1 consensus commit update.
	*
	* @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V1 = 4;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["CONSENSUS_COMMIT_PROLOGUE_V1"] = 4] = "CONSENSUS_COMMIT_PROLOGUE_V1";
	/**
	* Update set of valid JWKs used for zklogin.
	*
	* @generated from protobuf enum value: AUTHENTICATOR_STATE_UPDATE = 5;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["AUTHENTICATOR_STATE_UPDATE"] = 5] = "AUTHENTICATOR_STATE_UPDATE";
	/**
	* Set of operations to run at the end of the epoch to close out the current epoch and start
	* the next one.
	*
	* @generated from protobuf enum value: END_OF_EPOCH = 6;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["END_OF_EPOCH"] = 6] = "END_OF_EPOCH";
	/**
	* Randomness update.
	*
	* @generated from protobuf enum value: RANDOMNESS_STATE_UPDATE = 7;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["RANDOMNESS_STATE_UPDATE"] = 7] = "RANDOMNESS_STATE_UPDATE";
	/**
	* V2 consensus commit update.
	*
	* @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V2 = 8;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["CONSENSUS_COMMIT_PROLOGUE_V2"] = 8] = "CONSENSUS_COMMIT_PROLOGUE_V2";
	/**
	* V3 consensus commit update.
	*
	* @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V3 = 9;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["CONSENSUS_COMMIT_PROLOGUE_V3"] = 9] = "CONSENSUS_COMMIT_PROLOGUE_V3";
	/**
	* V4 consensus commit update.
	*
	* @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V4 = 10;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["CONSENSUS_COMMIT_PROLOGUE_V4"] = 10] = "CONSENSUS_COMMIT_PROLOGUE_V4";
	/**
	* A system transaction comprised of a list of native commands and Move calls.
	*
	* @generated from protobuf enum value: PROGRAMMABLE_SYSTEM_TRANSACTION = 11;
	*/
	TransactionKind_Kind$1[TransactionKind_Kind$1["PROGRAMMABLE_SYSTEM_TRANSACTION"] = 11] = "PROGRAMMABLE_SYSTEM_TRANSACTION";
	return TransactionKind_Kind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.EndOfEpochTransactionKind.Kind
*/
let EndOfEpochTransactionKind_Kind = /* @__PURE__ */ function(EndOfEpochTransactionKind_Kind$1) {
	/**
	* @generated from protobuf enum value: KIND_UNKNOWN = 0;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["KIND_UNKNOWN"] = 0] = "KIND_UNKNOWN";
	/**
	* End the epoch and start the next one.
	*
	* @generated from protobuf enum value: CHANGE_EPOCH = 1;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["CHANGE_EPOCH"] = 1] = "CHANGE_EPOCH";
	/**
	* Create and initialize the authenticator object used for zklogin.
	*
	* @generated from protobuf enum value: AUTHENTICATOR_STATE_CREATE = 2;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["AUTHENTICATOR_STATE_CREATE"] = 2] = "AUTHENTICATOR_STATE_CREATE";
	/**
	* Expire JWKs used for zklogin.
	*
	* @generated from protobuf enum value: AUTHENTICATOR_STATE_EXPIRE = 3;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["AUTHENTICATOR_STATE_EXPIRE"] = 3] = "AUTHENTICATOR_STATE_EXPIRE";
	/**
	* Create and initialize the randomness object.
	*
	* @generated from protobuf enum value: RANDOMNESS_STATE_CREATE = 4;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["RANDOMNESS_STATE_CREATE"] = 4] = "RANDOMNESS_STATE_CREATE";
	/**
	* Create and initialize the deny list object.
	*
	* @generated from protobuf enum value: DENY_LIST_STATE_CREATE = 5;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["DENY_LIST_STATE_CREATE"] = 5] = "DENY_LIST_STATE_CREATE";
	/**
	* Create and initialize the bridge object.
	*
	* @generated from protobuf enum value: BRIDGE_STATE_CREATE = 6;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["BRIDGE_STATE_CREATE"] = 6] = "BRIDGE_STATE_CREATE";
	/**
	* Initialize the bridge committee.
	*
	* @generated from protobuf enum value: BRIDGE_COMMITTEE_INIT = 7;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["BRIDGE_COMMITTEE_INIT"] = 7] = "BRIDGE_COMMITTEE_INIT";
	/**
	* Execution time observations from the committee to preserve cross epoch
	*
	* @generated from protobuf enum value: STORE_EXECUTION_TIME_OBSERVATIONS = 8;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["STORE_EXECUTION_TIME_OBSERVATIONS"] = 8] = "STORE_EXECUTION_TIME_OBSERVATIONS";
	/**
	* Create the accumulator root object.
	*
	* @generated from protobuf enum value: ACCUMULATOR_ROOT_CREATE = 9;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["ACCUMULATOR_ROOT_CREATE"] = 9] = "ACCUMULATOR_ROOT_CREATE";
	/**
	* Create and initialize the Coin Registry object.
	*
	* @generated from protobuf enum value: COIN_REGISTRY_CREATE = 10;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["COIN_REGISTRY_CREATE"] = 10] = "COIN_REGISTRY_CREATE";
	/**
	* Create and initialize the Display Registry object.
	*
	* @generated from protobuf enum value: DISPLAY_REGISTRY_CREATE = 11;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["DISPLAY_REGISTRY_CREATE"] = 11] = "DISPLAY_REGISTRY_CREATE";
	/**
	* Create and initialize the Address Alias State object.
	*
	* @generated from protobuf enum value: ADDRESS_ALIAS_STATE_CREATE = 12;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["ADDRESS_ALIAS_STATE_CREATE"] = 12] = "ADDRESS_ALIAS_STATE_CREATE";
	/**
	* Write the end-of-epoch-computed storage cost for accumulator objects.
	*
	* @generated from protobuf enum value: WRITE_ACCUMULATOR_STORAGE_COST = 13;
	*/
	EndOfEpochTransactionKind_Kind$1[EndOfEpochTransactionKind_Kind$1["WRITE_ACCUMULATOR_STORAGE_COST"] = 13] = "WRITE_ACCUMULATOR_STORAGE_COST";
	return EndOfEpochTransactionKind_Kind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.ExecutionTimeObservation.ExecutionTimeObservationKind
*/
let ExecutionTimeObservation_ExecutionTimeObservationKind = /* @__PURE__ */ function(ExecutionTimeObservation_ExecutionTimeObservationKind$1) {
	/**
	* @generated from protobuf enum value: EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN = 0;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN"] = 0] = "EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN";
	/**
	* @generated from protobuf enum value: MOVE_ENTRY_POINT = 1;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["MOVE_ENTRY_POINT"] = 1] = "MOVE_ENTRY_POINT";
	/**
	* @generated from protobuf enum value: TRANSFER_OBJECTS = 2;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["TRANSFER_OBJECTS"] = 2] = "TRANSFER_OBJECTS";
	/**
	* @generated from protobuf enum value: SPLIT_COINS = 3;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["SPLIT_COINS"] = 3] = "SPLIT_COINS";
	/**
	* @generated from protobuf enum value: MERGE_COINS = 4;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["MERGE_COINS"] = 4] = "MERGE_COINS";
	/**
	* @generated from protobuf enum value: PUBLISH = 5;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["PUBLISH"] = 5] = "PUBLISH";
	/**
	* @generated from protobuf enum value: MAKE_MOVE_VECTOR = 6;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["MAKE_MOVE_VECTOR"] = 6] = "MAKE_MOVE_VECTOR";
	/**
	* @generated from protobuf enum value: UPGRADE = 7;
	*/
	ExecutionTimeObservation_ExecutionTimeObservationKind$1[ExecutionTimeObservation_ExecutionTimeObservationKind$1["UPGRADE"] = 7] = "UPGRADE";
	return ExecutionTimeObservation_ExecutionTimeObservationKind$1;
}({});
var Transaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Transaction", [
			{
				no: 1,
				name: "bcs",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 2,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 5
			},
			{
				no: 4,
				name: "kind",
				kind: "message",
				T: () => TransactionKind
			},
			{
				no: 5,
				name: "sender",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 6,
				name: "gas_payment",
				kind: "message",
				T: () => GasPayment
			},
			{
				no: 7,
				name: "expiration",
				kind: "message",
				T: () => TransactionExpiration
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Transaction
*/
const Transaction = new Transaction$Type();
var GasPayment$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GasPayment", [
			{
				no: 1,
				name: "objects",
				kind: "message",
				repeat: 1,
				T: () => ObjectReference
			},
			{
				no: 2,
				name: "owner",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "price",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "budget",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GasPayment
*/
const GasPayment = new GasPayment$Type();
var TransactionExpiration$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TransactionExpiration", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.TransactionExpiration.TransactionExpirationKind", TransactionExpiration_TransactionExpirationKind]
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
				name: "min_epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "min_timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 5,
				name: "max_timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 6,
				name: "chain",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 7,
				name: "nonce",
				kind: "scalar",
				opt: true,
				T: 13
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TransactionExpiration
*/
const TransactionExpiration = new TransactionExpiration$Type();
var TransactionKind$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TransactionKind", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.TransactionKind.Kind", TransactionKind_Kind]
			},
			{
				no: 2,
				name: "programmable_transaction",
				kind: "message",
				oneof: "data",
				T: () => ProgrammableTransaction
			},
			{
				no: 3,
				name: "change_epoch",
				kind: "message",
				oneof: "data",
				T: () => ChangeEpoch
			},
			{
				no: 4,
				name: "genesis",
				kind: "message",
				oneof: "data",
				T: () => GenesisTransaction
			},
			{
				no: 5,
				name: "consensus_commit_prologue",
				kind: "message",
				oneof: "data",
				T: () => ConsensusCommitPrologue
			},
			{
				no: 6,
				name: "authenticator_state_update",
				kind: "message",
				oneof: "data",
				T: () => AuthenticatorStateUpdate
			},
			{
				no: 7,
				name: "end_of_epoch",
				kind: "message",
				oneof: "data",
				T: () => EndOfEpochTransaction
			},
			{
				no: 8,
				name: "randomness_state_update",
				kind: "message",
				oneof: "data",
				T: () => RandomnessStateUpdate
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TransactionKind
*/
const TransactionKind = new TransactionKind$Type();
var ProgrammableTransaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ProgrammableTransaction", [{
			no: 1,
			name: "inputs",
			kind: "message",
			repeat: 1,
			T: () => Input
		}, {
			no: 2,
			name: "commands",
			kind: "message",
			repeat: 1,
			T: () => Command
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ProgrammableTransaction
*/
const ProgrammableTransaction = new ProgrammableTransaction$Type();
var Command$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Command", [
			{
				no: 1,
				name: "move_call",
				kind: "message",
				oneof: "command",
				T: () => MoveCall
			},
			{
				no: 2,
				name: "transfer_objects",
				kind: "message",
				oneof: "command",
				T: () => TransferObjects
			},
			{
				no: 3,
				name: "split_coins",
				kind: "message",
				oneof: "command",
				T: () => SplitCoins
			},
			{
				no: 4,
				name: "merge_coins",
				kind: "message",
				oneof: "command",
				T: () => MergeCoins
			},
			{
				no: 5,
				name: "publish",
				kind: "message",
				oneof: "command",
				T: () => Publish
			},
			{
				no: 6,
				name: "make_move_vector",
				kind: "message",
				oneof: "command",
				T: () => MakeMoveVector
			},
			{
				no: 7,
				name: "upgrade",
				kind: "message",
				oneof: "command",
				T: () => Upgrade
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Command
*/
const Command = new Command$Type();
var MoveCall$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MoveCall", [
			{
				no: 1,
				name: "package",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "module",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "function",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "type_arguments",
				kind: "scalar",
				repeat: 2,
				T: 9
			},
			{
				no: 5,
				name: "arguments",
				kind: "message",
				repeat: 1,
				T: () => Argument
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MoveCall
*/
const MoveCall = new MoveCall$Type();
var TransferObjects$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TransferObjects", [{
			no: 1,
			name: "objects",
			kind: "message",
			repeat: 1,
			T: () => Argument
		}, {
			no: 2,
			name: "address",
			kind: "message",
			T: () => Argument
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TransferObjects
*/
const TransferObjects = new TransferObjects$Type();
var SplitCoins$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SplitCoins", [{
			no: 1,
			name: "coin",
			kind: "message",
			T: () => Argument
		}, {
			no: 2,
			name: "amounts",
			kind: "message",
			repeat: 1,
			T: () => Argument
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SplitCoins
*/
const SplitCoins = new SplitCoins$Type();
var MergeCoins$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MergeCoins", [{
			no: 1,
			name: "coin",
			kind: "message",
			T: () => Argument
		}, {
			no: 2,
			name: "coins_to_merge",
			kind: "message",
			repeat: 1,
			T: () => Argument
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MergeCoins
*/
const MergeCoins = new MergeCoins$Type();
var Publish$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Publish", [{
			no: 1,
			name: "modules",
			kind: "scalar",
			repeat: 2,
			T: 12
		}, {
			no: 2,
			name: "dependencies",
			kind: "scalar",
			repeat: 2,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Publish
*/
const Publish = new Publish$Type();
var MakeMoveVector$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MakeMoveVector", [{
			no: 1,
			name: "element_type",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "elements",
			kind: "message",
			repeat: 1,
			T: () => Argument
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MakeMoveVector
*/
const MakeMoveVector = new MakeMoveVector$Type();
var Upgrade$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Upgrade", [
			{
				no: 1,
				name: "modules",
				kind: "scalar",
				repeat: 2,
				T: 12
			},
			{
				no: 2,
				name: "dependencies",
				kind: "scalar",
				repeat: 2,
				T: 9
			},
			{
				no: 3,
				name: "package",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "ticket",
				kind: "message",
				T: () => Argument
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Upgrade
*/
const Upgrade = new Upgrade$Type();
var RandomnessStateUpdate$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.RandomnessStateUpdate", [
			{
				no: 1,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "randomness_round",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "random_bytes",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 4,
				name: "randomness_object_initial_shared_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.RandomnessStateUpdate
*/
const RandomnessStateUpdate = new RandomnessStateUpdate$Type();
var ChangeEpoch$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ChangeEpoch", [
			{
				no: 1,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "protocol_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "storage_charge",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "computation_charge",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "storage_rebate",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "non_refundable_storage_fee",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "epoch_start_timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 8,
				name: "system_packages",
				kind: "message",
				repeat: 1,
				T: () => SystemPackage
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ChangeEpoch
*/
const ChangeEpoch = new ChangeEpoch$Type();
var SystemPackage$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SystemPackage", [
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
				name: "modules",
				kind: "scalar",
				repeat: 2,
				T: 12
			},
			{
				no: 3,
				name: "dependencies",
				kind: "scalar",
				repeat: 2,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SystemPackage
*/
const SystemPackage = new SystemPackage$Type();
var GenesisTransaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GenesisTransaction", [{
			no: 1,
			name: "objects",
			kind: "message",
			repeat: 1,
			T: () => Object$1
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GenesisTransaction
*/
const GenesisTransaction = new GenesisTransaction$Type();
var ConsensusCommitPrologue$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ConsensusCommitPrologue", [
			{
				no: 1,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "round",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "commit_timestamp",
				kind: "message",
				T: () => Timestamp
			},
			{
				no: 4,
				name: "consensus_commit_digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "sub_dag_index",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 6,
				name: "consensus_determined_version_assignments",
				kind: "message",
				T: () => ConsensusDeterminedVersionAssignments
			},
			{
				no: 7,
				name: "additional_state_digest",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ConsensusCommitPrologue
*/
const ConsensusCommitPrologue = new ConsensusCommitPrologue$Type();
var VersionAssignment$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.VersionAssignment", [
			{
				no: 1,
				name: "object_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "start_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.VersionAssignment
*/
const VersionAssignment = new VersionAssignment$Type();
var CanceledTransaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CanceledTransaction", [{
			no: 1,
			name: "digest",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "version_assignments",
			kind: "message",
			repeat: 1,
			T: () => VersionAssignment
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CanceledTransaction
*/
const CanceledTransaction = new CanceledTransaction$Type();
var ConsensusDeterminedVersionAssignments$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ConsensusDeterminedVersionAssignments", [{
			no: 1,
			name: "version",
			kind: "scalar",
			opt: true,
			T: 5
		}, {
			no: 3,
			name: "canceled_transactions",
			kind: "message",
			repeat: 1,
			T: () => CanceledTransaction
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ConsensusDeterminedVersionAssignments
*/
const ConsensusDeterminedVersionAssignments = new ConsensusDeterminedVersionAssignments$Type();
var AuthenticatorStateUpdate$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.AuthenticatorStateUpdate", [
			{
				no: 1,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "round",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "new_active_jwks",
				kind: "message",
				repeat: 1,
				T: () => ActiveJwk
			},
			{
				no: 4,
				name: "authenticator_object_initial_shared_version",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.AuthenticatorStateUpdate
*/
const AuthenticatorStateUpdate = new AuthenticatorStateUpdate$Type();
var ActiveJwk$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ActiveJwk", [
			{
				no: 1,
				name: "id",
				kind: "message",
				T: () => JwkId
			},
			{
				no: 2,
				name: "jwk",
				kind: "message",
				T: () => Jwk
			},
			{
				no: 3,
				name: "epoch",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ActiveJwk
*/
const ActiveJwk = new ActiveJwk$Type();
var EndOfEpochTransaction$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.EndOfEpochTransaction", [{
			no: 1,
			name: "transactions",
			kind: "message",
			repeat: 1,
			T: () => EndOfEpochTransactionKind
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochTransaction
*/
const EndOfEpochTransaction = new EndOfEpochTransaction$Type();
var EndOfEpochTransactionKind$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.EndOfEpochTransactionKind", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.EndOfEpochTransactionKind.Kind", EndOfEpochTransactionKind_Kind]
			},
			{
				no: 2,
				name: "change_epoch",
				kind: "message",
				oneof: "data",
				T: () => ChangeEpoch
			},
			{
				no: 3,
				name: "authenticator_state_expire",
				kind: "message",
				oneof: "data",
				T: () => AuthenticatorStateExpire
			},
			{
				no: 4,
				name: "execution_time_observations",
				kind: "message",
				oneof: "data",
				T: () => ExecutionTimeObservations
			},
			{
				no: 5,
				name: "bridge_chain_id",
				kind: "scalar",
				oneof: "data",
				T: 9
			},
			{
				no: 6,
				name: "bridge_object_version",
				kind: "scalar",
				oneof: "data",
				T: 4,
				L: 0
			},
			{
				no: 7,
				name: "storage_cost",
				kind: "scalar",
				oneof: "data",
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochTransactionKind
*/
const EndOfEpochTransactionKind = new EndOfEpochTransactionKind$Type();
var AuthenticatorStateExpire$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.AuthenticatorStateExpire", [{
			no: 1,
			name: "min_epoch",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "authenticator_object_initial_shared_version",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.AuthenticatorStateExpire
*/
const AuthenticatorStateExpire = new AuthenticatorStateExpire$Type();
var ExecutionTimeObservations$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecutionTimeObservations", [{
			no: 1,
			name: "version",
			kind: "scalar",
			opt: true,
			T: 5
		}, {
			no: 2,
			name: "observations",
			kind: "message",
			repeat: 1,
			T: () => ExecutionTimeObservation
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecutionTimeObservations
*/
const ExecutionTimeObservations = new ExecutionTimeObservations$Type();
var ExecutionTimeObservation$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecutionTimeObservation", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.ExecutionTimeObservation.ExecutionTimeObservationKind", ExecutionTimeObservation_ExecutionTimeObservationKind]
			},
			{
				no: 2,
				name: "move_entry_point",
				kind: "message",
				T: () => MoveCall
			},
			{
				no: 3,
				name: "validator_observations",
				kind: "message",
				repeat: 1,
				T: () => ValidatorExecutionTimeObservation
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecutionTimeObservation
*/
const ExecutionTimeObservation = new ExecutionTimeObservation$Type();
var ValidatorExecutionTimeObservation$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ValidatorExecutionTimeObservation", [{
			no: 1,
			name: "validator",
			kind: "scalar",
			opt: true,
			T: 12
		}, {
			no: 2,
			name: "duration",
			kind: "message",
			T: () => Duration
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ValidatorExecutionTimeObservation
*/
const ValidatorExecutionTimeObservation = new ValidatorExecutionTimeObservation$Type();

//#endregion
export { ActiveJwk, AuthenticatorStateExpire, AuthenticatorStateUpdate, CanceledTransaction, ChangeEpoch, Command, ConsensusCommitPrologue, ConsensusDeterminedVersionAssignments, EndOfEpochTransaction, EndOfEpochTransactionKind, EndOfEpochTransactionKind_Kind, ExecutionTimeObservation, ExecutionTimeObservation_ExecutionTimeObservationKind, ExecutionTimeObservations, GasPayment, GenesisTransaction, MakeMoveVector, MergeCoins, MoveCall, ProgrammableTransaction, Publish, RandomnessStateUpdate, SplitCoins, SystemPackage, Transaction, TransactionExpiration, TransactionExpiration_TransactionExpirationKind, TransactionKind, TransactionKind_Kind, TransferObjects, Upgrade, ValidatorExecutionTimeObservation, VersionAssignment };
//# sourceMappingURL=transaction.mjs.map