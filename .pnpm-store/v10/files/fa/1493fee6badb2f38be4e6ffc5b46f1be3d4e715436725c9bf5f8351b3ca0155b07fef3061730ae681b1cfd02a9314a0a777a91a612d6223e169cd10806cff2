import { Bcs } from "./bcs.mjs";
import { Argument } from "./argument.mjs";
import { Object as Object$1 } from "./object.mjs";
import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { ObjectReference } from "./object_reference.mjs";
import { Jwk, JwkId } from "./jwk.mjs";
import { Duration } from "../../../google/protobuf/duration.mjs";
import { Input } from "./input.mjs";
import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/transaction.d.ts

/**
 * A transaction.
 *
 * @generated from protobuf message sui.rpc.v2.Transaction
 */
interface Transaction {
  /**
   * This Transaction serialized as BCS.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs bcs = 1;
   */
  bcs?: Bcs;
  /**
   * The digest of this Transaction.
   *
   * @generated from protobuf field: optional string digest = 2;
   */
  digest?: string;
  /**
   * Version of this Transaction.
   *
   * @generated from protobuf field: optional int32 version = 3;
   */
  version?: number;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.TransactionKind kind = 4;
   */
  kind?: TransactionKind;
  /**
   * @generated from protobuf field: optional string sender = 5;
   */
  sender?: string;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.GasPayment gas_payment = 6;
   */
  gasPayment?: GasPayment;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.TransactionExpiration expiration = 7;
   */
  expiration?: TransactionExpiration;
}
/**
 * Payment information for executing a transaction.
 *
 * @generated from protobuf message sui.rpc.v2.GasPayment
 */
interface GasPayment {
  /**
   * Set of gas objects to use for payment.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ObjectReference objects = 1;
   */
  objects: ObjectReference[];
  /**
   * Owner of the gas objects, either the transaction sender or a sponsor.
   *
   * @generated from protobuf field: optional string owner = 2;
   */
  owner?: string;
  /**
   * Gas unit price to use when charging for computation.
   *
   * Must be greater than or equal to the network's current RGP (reference gas price).
   *
   * @generated from protobuf field: optional uint64 price = 3;
   */
  price?: bigint;
  /**
   * Total budget willing to spend for the execution of a transaction.
   *
   * @generated from protobuf field: optional uint64 budget = 4;
   */
  budget?: bigint;
}
/**
 * A TTL for a transaction.
 *
 * @generated from protobuf message sui.rpc.v2.TransactionExpiration
 */
interface TransactionExpiration {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.TransactionExpiration.TransactionExpirationKind kind = 1;
   */
  kind?: TransactionExpiration_TransactionExpirationKind;
  /**
   * Maximum epoch in which a transaction can be executed. The provided maximal epoch
   * must be greater than or equal to the current epoch for a transaction to execute.
   *
   * @generated from protobuf field: optional uint64 epoch = 2;
   */
  epoch?: bigint;
  /**
   * Minimal epoch in which a transaction can be executed. The provided minimal epoch
   * must be less than or equal to the current epoch for a transaction to execute.
   *
   * @generated from protobuf field: optional uint64 min_epoch = 3;
   */
  minEpoch?: bigint;
  /**
   * Minimal UNIX timestamp in which a transaction can be executed. The
   * provided minimal timestamp must be less than or equal to the current
   * clock.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp min_timestamp = 4;
   */
  minTimestamp?: Timestamp;
  /**
   * Maximum UNIX timestamp in which a transaction can be executed. The
   * provided maximal timestamp must be greater than or equal to the current
   * clock.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp max_timestamp = 5;
   */
  maxTimestamp?: Timestamp;
  /**
   * ChainId of the network this transaction is intended for in order to prevent cross-chain replay
   *
   * @generated from protobuf field: optional string chain = 6;
   */
  chain?: string;
  /**
   * User-provided uniqueness identifier to differentiate otherwise identical transactions
   *
   * @generated from protobuf field: optional uint32 nonce = 7;
   */
  nonce?: number;
}
/**
 * @generated from protobuf enum sui.rpc.v2.TransactionExpiration.TransactionExpirationKind
 */
declare enum TransactionExpiration_TransactionExpirationKind {
  /**
   * @generated from protobuf enum value: TRANSACTION_EXPIRATION_KIND_UNKNOWN = 0;
   */
  TRANSACTION_EXPIRATION_KIND_UNKNOWN = 0,
  /**
   * The transaction has no expiration.
   *
   * @generated from protobuf enum value: NONE = 1;
   */
  NONE = 1,
  /**
   * Validators won't sign and execute transaction unless the expiration epoch
   * is greater than or equal to the current epoch.
   *
   * @generated from protobuf enum value: EPOCH = 2;
   */
  EPOCH = 2,
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
  VALID_DURING = 3,
}
/**
 * Transaction type.
 *
 * @generated from protobuf message sui.rpc.v2.TransactionKind
 */
interface TransactionKind {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.TransactionKind.Kind kind = 1;
   */
  kind?: TransactionKind_Kind;
  /**
   * @generated from protobuf oneof: data
   */
  data: {
    oneofKind: 'programmableTransaction';
    /**
     * A transaction comprised of a list of native commands and Move calls.
     *
     * @generated from protobuf field: sui.rpc.v2.ProgrammableTransaction programmable_transaction = 2;
     */
    programmableTransaction: ProgrammableTransaction;
  } | {
    oneofKind: 'changeEpoch';
    /**
     * System transaction used to end an epoch.
     *
     * The `ChangeEpoch` variant is now deprecated (but the `ChangeEpoch` struct is still used by
     * `EndOfEpochTransaction`).
     *
     * @generated from protobuf field: sui.rpc.v2.ChangeEpoch change_epoch = 3;
     */
    changeEpoch: ChangeEpoch;
  } | {
    oneofKind: 'genesis';
    /**
     * Transaction used to initialize the chain state.
     *
     * Only valid if in the genesis checkpoint (0) and if this is the very first transaction ever
     * executed on the chain.
     *
     * @generated from protobuf field: sui.rpc.v2.GenesisTransaction genesis = 4;
     */
    genesis: GenesisTransaction;
  } | {
    oneofKind: 'consensusCommitPrologue';
    /**
     * consensus commit update info
     *
     * @generated from protobuf field: sui.rpc.v2.ConsensusCommitPrologue consensus_commit_prologue = 5;
     */
    consensusCommitPrologue: ConsensusCommitPrologue;
  } | {
    oneofKind: 'authenticatorStateUpdate';
    /**
     * Update set of valid JWKs used for zklogin.
     *
     * @generated from protobuf field: sui.rpc.v2.AuthenticatorStateUpdate authenticator_state_update = 6;
     */
    authenticatorStateUpdate: AuthenticatorStateUpdate;
  } | {
    oneofKind: 'endOfEpoch';
    /**
     * Set of operations to run at the end of the epoch to close out the current epoch and start
     * the next one.
     *
     * @generated from protobuf field: sui.rpc.v2.EndOfEpochTransaction end_of_epoch = 7;
     */
    endOfEpoch: EndOfEpochTransaction;
  } | {
    oneofKind: 'randomnessStateUpdate';
    /**
     * Randomness update.
     *
     * @generated from protobuf field: sui.rpc.v2.RandomnessStateUpdate randomness_state_update = 8;
     */
    randomnessStateUpdate: RandomnessStateUpdate;
  } | {
    oneofKind: undefined;
  };
}
/**
 * @generated from protobuf enum sui.rpc.v2.TransactionKind.Kind
 */
declare enum TransactionKind_Kind {
  /**
   * @generated from protobuf enum value: KIND_UNKNOWN = 0;
   */
  KIND_UNKNOWN = 0,
  /**
   * A user transaction comprised of a list of native commands and Move calls.
   *
   * @generated from protobuf enum value: PROGRAMMABLE_TRANSACTION = 1;
   */
  PROGRAMMABLE_TRANSACTION = 1,
  /**
   * System transaction used to end an epoch.
   *
   * The `ChangeEpoch` variant is now deprecated (but the `ChangeEpoch` struct is still used by
   * `EndOfEpochTransaction`).
   *
   * @generated from protobuf enum value: CHANGE_EPOCH = 2;
   */
  CHANGE_EPOCH = 2,
  /**
   * Transaction used to initialize the chain state.
   *
   * Only valid if in the genesis checkpoint (0) and if this is the very first transaction ever
   * executed on the chain.
   *
   * @generated from protobuf enum value: GENESIS = 3;
   */
  GENESIS = 3,
  /**
   * V1 consensus commit update.
   *
   * @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V1 = 4;
   */
  CONSENSUS_COMMIT_PROLOGUE_V1 = 4,
  /**
   * Update set of valid JWKs used for zklogin.
   *
   * @generated from protobuf enum value: AUTHENTICATOR_STATE_UPDATE = 5;
   */
  AUTHENTICATOR_STATE_UPDATE = 5,
  /**
   * Set of operations to run at the end of the epoch to close out the current epoch and start
   * the next one.
   *
   * @generated from protobuf enum value: END_OF_EPOCH = 6;
   */
  END_OF_EPOCH = 6,
  /**
   * Randomness update.
   *
   * @generated from protobuf enum value: RANDOMNESS_STATE_UPDATE = 7;
   */
  RANDOMNESS_STATE_UPDATE = 7,
  /**
   * V2 consensus commit update.
   *
   * @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V2 = 8;
   */
  CONSENSUS_COMMIT_PROLOGUE_V2 = 8,
  /**
   * V3 consensus commit update.
   *
   * @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V3 = 9;
   */
  CONSENSUS_COMMIT_PROLOGUE_V3 = 9,
  /**
   * V4 consensus commit update.
   *
   * @generated from protobuf enum value: CONSENSUS_COMMIT_PROLOGUE_V4 = 10;
   */
  CONSENSUS_COMMIT_PROLOGUE_V4 = 10,
  /**
   * A system transaction comprised of a list of native commands and Move calls.
   *
   * @generated from protobuf enum value: PROGRAMMABLE_SYSTEM_TRANSACTION = 11;
   */
  PROGRAMMABLE_SYSTEM_TRANSACTION = 11,
}
/**
 * A user transaction.
 *
 * Contains a series of native commands and Move calls where the results of one command can be
 * used in future commands.
 *
 * @generated from protobuf message sui.rpc.v2.ProgrammableTransaction
 */
interface ProgrammableTransaction {
  /**
   * Input objects or primitive values.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Input inputs = 1;
   */
  inputs: Input[];
  /**
   * The commands to be executed sequentially. A failure in any command
   * results in the failure of the entire transaction.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Command commands = 2;
   */
  commands: Command[];
}
/**
 * A single command in a programmable transaction.
 *
 * @generated from protobuf message sui.rpc.v2.Command
 */
interface Command {
  /**
   * @generated from protobuf oneof: command
   */
  command: {
    oneofKind: 'moveCall';
    /**
     * A call to either an entry or a public Move function.
     *
     * @generated from protobuf field: sui.rpc.v2.MoveCall move_call = 1;
     */
    moveCall: MoveCall;
  } | {
    oneofKind: 'transferObjects';
    /**
     * `(Vec<forall T:key+store. T>, address)`
     * It sends n-objects to the specified address. These objects must have store
     * (public transfer) and either the previous owner must be an address or the object must
     * be newly created.
     *
     * @generated from protobuf field: sui.rpc.v2.TransferObjects transfer_objects = 2;
     */
    transferObjects: TransferObjects;
  } | {
    oneofKind: 'splitCoins';
    /**
     * `(&mut Coin<T>, Vec<u64>)` -> `Vec<Coin<T>>`
     * It splits off some amounts into new coins with those amounts.
     *
     * @generated from protobuf field: sui.rpc.v2.SplitCoins split_coins = 3;
     */
    splitCoins: SplitCoins;
  } | {
    oneofKind: 'mergeCoins';
    /**
     * `(&mut Coin<T>, Vec<Coin<T>>)`
     * It merges n-coins into the first coin.
     *
     * @generated from protobuf field: sui.rpc.v2.MergeCoins merge_coins = 4;
     */
    mergeCoins: MergeCoins;
  } | {
    oneofKind: 'publish';
    /**
     * Publishes a Move package. It takes the package bytes and a list of the package's transitive
     * dependencies to link against on chain.
     *
     * @generated from protobuf field: sui.rpc.v2.Publish publish = 5;
     */
    publish: Publish;
  } | {
    oneofKind: 'makeMoveVector';
    /**
     * `forall T: Vec<T> -> vector<T>`
     * Given n-values of the same type, it constructs a vector. For non-objects or an empty vector,
     * the type tag must be specified.
     *
     * @generated from protobuf field: sui.rpc.v2.MakeMoveVector make_move_vector = 6;
     */
    makeMoveVector: MakeMoveVector;
  } | {
    oneofKind: 'upgrade';
    /**
     * Upgrades a Move package.
     * Takes (in order):
     * 1. A vector of serialized modules for the package.
     * 2. A vector of object ids for the transitive dependencies of the new package.
     * 3. The object ID of the package being upgraded.
     * 4. An argument holding the `UpgradeTicket` that must have been produced from an earlier command in the same
     *    programmable transaction.
     *
     * @generated from protobuf field: sui.rpc.v2.Upgrade upgrade = 7;
     */
    upgrade: Upgrade;
  } | {
    oneofKind: undefined;
  };
}
/**
 * Command to call a Move function.
 *
 * Functions that can be called by a `MoveCall` command are those that have a function signature
 * that is either `entry` or `public` (which don't have a reference return type).
 *
 * @generated from protobuf message sui.rpc.v2.MoveCall
 */
interface MoveCall {
  /**
   * The package containing the module and function.
   *
   * @generated from protobuf field: optional string package = 1;
   */
  package?: string;
  /**
   * The specific module in the package containing the function.
   *
   * @generated from protobuf field: optional string module = 2;
   */
  module?: string;
  /**
   * The function to be called.
   *
   * @generated from protobuf field: optional string function = 3;
   */
  function?: string;
  /**
   * The type arguments to the function.
   *
   * @generated from protobuf field: repeated string type_arguments = 4;
   */
  typeArguments: string[];
  /**
   * The arguments to the function.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Argument arguments = 5;
   */
  arguments: Argument[];
}
/**
 * Command to transfer ownership of a set of objects to an address.
 *
 * @generated from protobuf message sui.rpc.v2.TransferObjects
 */
interface TransferObjects {
  /**
   * Set of objects to transfer.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Argument objects = 1;
   */
  objects: Argument[];
  /**
   * The address to transfer ownership to.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Argument address = 2;
   */
  address?: Argument;
}
/**
 * Command to split a single coin object into multiple coins.
 *
 * @generated from protobuf message sui.rpc.v2.SplitCoins
 */
interface SplitCoins {
  /**
   * The coin to split.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Argument coin = 1;
   */
  coin?: Argument;
  /**
   * The amounts to split off.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Argument amounts = 2;
   */
  amounts: Argument[];
}
/**
 * Command to merge multiple coins of the same type into a single coin.
 *
 * @generated from protobuf message sui.rpc.v2.MergeCoins
 */
interface MergeCoins {
  /**
   * Coin to merge coins into.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Argument coin = 1;
   */
  coin?: Argument;
  /**
   * Set of coins to merge into `coin`.
   *
   * All listed coins must be of the same type and be the same type as `coin`
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Argument coins_to_merge = 2;
   */
  coinsToMerge: Argument[];
}
/**
 * Command to publish a new Move package.
 *
 * @generated from protobuf message sui.rpc.v2.Publish
 */
interface Publish {
  /**
   * The serialized Move modules.
   *
   * @generated from protobuf field: repeated bytes modules = 1;
   */
  modules: Uint8Array[];
  /**
   * Set of packages that the to-be published package depends on.
   *
   * @generated from protobuf field: repeated string dependencies = 2;
   */
  dependencies: string[];
}
/**
 * Command to build a Move vector out of a set of individual elements.
 *
 * @generated from protobuf message sui.rpc.v2.MakeMoveVector
 */
interface MakeMoveVector {
  /**
   * Type of the individual elements.
   *
   * This is required to be set when the type can't be inferred, for example when the set of
   * provided arguments are all pure input values.
   *
   * @generated from protobuf field: optional string element_type = 1;
   */
  elementType?: string;
  /**
   * The set individual elements to build the vector with.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Argument elements = 2;
   */
  elements: Argument[];
}
/**
 * Command to upgrade an already published package.
 *
 * @generated from protobuf message sui.rpc.v2.Upgrade
 */
interface Upgrade {
  /**
   * The serialized Move modules.
   *
   * @generated from protobuf field: repeated bytes modules = 1;
   */
  modules: Uint8Array[];
  /**
   * Set of packages that the to-be published package depends on.
   *
   * @generated from protobuf field: repeated string dependencies = 2;
   */
  dependencies: string[];
  /**
   * Package ID of the package to upgrade.
   *
   * @generated from protobuf field: optional string package = 3;
   */
  package?: string;
  /**
   * Ticket authorizing the upgrade.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Argument ticket = 4;
   */
  ticket?: Argument;
}
/**
 * Randomness update.
 *
 * @generated from protobuf message sui.rpc.v2.RandomnessStateUpdate
 */
interface RandomnessStateUpdate {
  /**
   * Epoch of the randomness state update transaction.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * Randomness round of the update.
   *
   * @generated from protobuf field: optional uint64 randomness_round = 2;
   */
  randomnessRound?: bigint;
  /**
   * Updated random bytes.
   *
   * @generated from protobuf field: optional bytes random_bytes = 3;
   */
  randomBytes?: Uint8Array;
  /**
   * The initial version of the randomness object that it was shared at.
   *
   * @generated from protobuf field: optional uint64 randomness_object_initial_shared_version = 4;
   */
  randomnessObjectInitialSharedVersion?: bigint;
}
/**
 * System transaction used to change the epoch.
 *
 * @generated from protobuf message sui.rpc.v2.ChangeEpoch
 */
interface ChangeEpoch {
  /**
   * The next (to become) epoch ID.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * The protocol version in effect in the new epoch.
   *
   * @generated from protobuf field: optional uint64 protocol_version = 2;
   */
  protocolVersion?: bigint;
  /**
   * The total amount of gas charged for storage during the epoch.
   *
   * @generated from protobuf field: optional uint64 storage_charge = 3;
   */
  storageCharge?: bigint;
  /**
   * The total amount of gas charged for computation during the epoch.
   *
   * @generated from protobuf field: optional uint64 computation_charge = 4;
   */
  computationCharge?: bigint;
  /**
   * The amount of storage rebate refunded to the txn senders.
   *
   * @generated from protobuf field: optional uint64 storage_rebate = 5;
   */
  storageRebate?: bigint;
  /**
   * The non-refundable storage fee.
   *
   * @generated from protobuf field: optional uint64 non_refundable_storage_fee = 6;
   */
  nonRefundableStorageFee?: bigint;
  /**
   * Unix timestamp when epoch started.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp epoch_start_timestamp = 7;
   */
  epochStartTimestamp?: Timestamp;
  /**
   * System packages (specifically framework and Move stdlib) that are written before the new
   * epoch starts. This tracks framework upgrades on chain. When executing the `ChangeEpoch` txn,
   * the validator must write out the following modules.  Modules are provided with the version they
   * will be upgraded to, their modules in serialized form (which include their package ID), and
   * a list of their transitive dependencies.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.SystemPackage system_packages = 8;
   */
  systemPackages: SystemPackage[];
}
/**
 * System package.
 *
 * @generated from protobuf message sui.rpc.v2.SystemPackage
 */
interface SystemPackage {
  /**
   * Version of the package.
   *
   * @generated from protobuf field: optional uint64 version = 1;
   */
  version?: bigint;
  /**
   * Move modules.
   *
   * @generated from protobuf field: repeated bytes modules = 2;
   */
  modules: Uint8Array[];
  /**
   * Package dependencies.
   *
   * @generated from protobuf field: repeated string dependencies = 3;
   */
  dependencies: string[];
}
/**
 * The genesis transaction.
 *
 * @generated from protobuf message sui.rpc.v2.GenesisTransaction
 */
interface GenesisTransaction {
  /**
   * Set of genesis objects.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Object objects = 1;
   */
  objects: Object$1[];
}
/**
 * Consensus commit prologue system transaction.
 *
 * This message can represent V1, V2, and V3 prologue types.
 *
 * @generated from protobuf message sui.rpc.v2.ConsensusCommitPrologue
 */
interface ConsensusCommitPrologue {
  /**
   * Epoch of the commit prologue transaction.
   *
   * Present in V1, V2, V3, V4.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * Consensus round of the commit.
   *
   * Present in V1, V2, V3, V4.
   *
   * @generated from protobuf field: optional uint64 round = 2;
   */
  round?: bigint;
  /**
   * Unix timestamp from consensus.
   *
   * Present in V1, V2, V3, V4.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp commit_timestamp = 3;
   */
  commitTimestamp?: Timestamp;
  /**
   * Digest of consensus output.
   *
   * Present in V2, V3, V4.
   *
   * @generated from protobuf field: optional string consensus_commit_digest = 4;
   */
  consensusCommitDigest?: string;
  /**
   * The sub DAG index of the consensus commit. This field is populated if there
   * are multiple consensus commits per round.
   *
   * Present in V3, V4.
   *
   * @generated from protobuf field: optional uint64 sub_dag_index = 5;
   */
  subDagIndex?: bigint;
  /**
   * Stores consensus handler determined consensus object version assignments.
   *
   * Present in V3, V4.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ConsensusDeterminedVersionAssignments consensus_determined_version_assignments = 6;
   */
  consensusDeterminedVersionAssignments?: ConsensusDeterminedVersionAssignments;
  /**
   * Digest of any additional state computed by the consensus handler.
   * Used to detect forking bugs as early as possible.
   *
   * Present in V4.
   *
   * @generated from protobuf field: optional string additional_state_digest = 7;
   */
  additionalStateDigest?: string;
}
/**
 * Object version assignment from consensus.
 *
 * @generated from protobuf message sui.rpc.v2.VersionAssignment
 */
interface VersionAssignment {
  /**
   * `ObjectId` of the object.
   *
   * @generated from protobuf field: optional string object_id = 1;
   */
  objectId?: string;
  /**
   * start version of the consensus stream for this object
   *
   * @generated from protobuf field: optional uint64 start_version = 2;
   */
  startVersion?: bigint;
  /**
   * Assigned version.
   *
   * @generated from protobuf field: optional uint64 version = 3;
   */
  version?: bigint;
}
/**
 * A transaction that was canceled.
 *
 * @generated from protobuf message sui.rpc.v2.CanceledTransaction
 */
interface CanceledTransaction {
  /**
   * Digest of the canceled transaction.
   *
   * @generated from protobuf field: optional string digest = 1;
   */
  digest?: string;
  /**
   * List of object version assignments.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.VersionAssignment version_assignments = 2;
   */
  versionAssignments: VersionAssignment[];
}
/**
 * Version assignments performed by consensus.
 *
 * @generated from protobuf message sui.rpc.v2.ConsensusDeterminedVersionAssignments
 */
interface ConsensusDeterminedVersionAssignments {
  /**
   * Version of this message
   *
   * @generated from protobuf field: optional int32 version = 1;
   */
  version?: number;
  /**
   * Canceled transaction version assignment.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.CanceledTransaction canceled_transactions = 3;
   */
  canceledTransactions: CanceledTransaction[];
}
/**
 * Update the set of valid JWKs.
 *
 * @generated from protobuf message sui.rpc.v2.AuthenticatorStateUpdate
 */
interface AuthenticatorStateUpdate {
  /**
   * Epoch of the authenticator state update transaction.
   *
   * @generated from protobuf field: optional uint64 epoch = 1;
   */
  epoch?: bigint;
  /**
   * Consensus round of the authenticator state update.
   *
   * @generated from protobuf field: optional uint64 round = 2;
   */
  round?: bigint;
  /**
   * Newly active JWKs.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.ActiveJwk new_active_jwks = 3;
   */
  newActiveJwks: ActiveJwk[];
  /**
   * The initial version of the authenticator object that it was shared at.
   *
   * @generated from protobuf field: optional uint64 authenticator_object_initial_shared_version = 4;
   */
  authenticatorObjectInitialSharedVersion?: bigint;
}
/**
 * A new JWK.
 *
 * @generated from protobuf message sui.rpc.v2.ActiveJwk
 */
interface ActiveJwk {
  /**
   * Identifier used to uniquely identify a JWK.
   *
   * @generated from protobuf field: optional sui.rpc.v2.JwkId id = 1;
   */
  id?: JwkId;
  /**
   * The JWK.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Jwk jwk = 2;
   */
  jwk?: Jwk;
  /**
   * Most recent epoch in which the JWK was validated.
   *
   * @generated from protobuf field: optional uint64 epoch = 3;
   */
  epoch?: bigint;
}
/**
 * Set of operations run at the end of the epoch to close out the current epoch
 * and start the next one.
 *
 * @generated from protobuf message sui.rpc.v2.EndOfEpochTransaction
 */
interface EndOfEpochTransaction {
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.EndOfEpochTransactionKind transactions = 1;
   */
  transactions: EndOfEpochTransactionKind[];
}
/**
 * Operation run at the end of an epoch.
 *
 * @generated from protobuf message sui.rpc.v2.EndOfEpochTransactionKind
 */
interface EndOfEpochTransactionKind {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.EndOfEpochTransactionKind.Kind kind = 1;
   */
  kind?: EndOfEpochTransactionKind_Kind;
  /**
   * @generated from protobuf oneof: data
   */
  data: {
    oneofKind: 'changeEpoch';
    /**
     * End the epoch and start the next one.
     *
     * @generated from protobuf field: sui.rpc.v2.ChangeEpoch change_epoch = 2;
     */
    changeEpoch: ChangeEpoch;
  } | {
    oneofKind: 'authenticatorStateExpire';
    /**
     * Expire JWKs used for zklogin.
     *
     * @generated from protobuf field: sui.rpc.v2.AuthenticatorStateExpire authenticator_state_expire = 3;
     */
    authenticatorStateExpire: AuthenticatorStateExpire;
  } | {
    oneofKind: 'executionTimeObservations';
    /**
     * Execution time observations from the committee to preserve cross epoch
     *
     * @generated from protobuf field: sui.rpc.v2.ExecutionTimeObservations execution_time_observations = 4;
     */
    executionTimeObservations: ExecutionTimeObservations;
  } | {
    oneofKind: 'bridgeChainId';
    /**
     * ChainId used when initializing the bridge
     *
     * @generated from protobuf field: string bridge_chain_id = 5;
     */
    bridgeChainId: string;
  } | {
    oneofKind: 'bridgeObjectVersion';
    /**
     * Start version of the Bridge object
     *
     * @generated from protobuf field: uint64 bridge_object_version = 6;
     */
    bridgeObjectVersion: bigint;
  } | {
    oneofKind: 'storageCost';
    /**
     * Contains the end-of-epoch-computed storage cost for accumulator objects.
     *
     * @generated from protobuf field: uint64 storage_cost = 7;
     */
    storageCost: bigint;
  } | {
    oneofKind: undefined;
  };
}
/**
 * @generated from protobuf enum sui.rpc.v2.EndOfEpochTransactionKind.Kind
 */
declare enum EndOfEpochTransactionKind_Kind {
  /**
   * @generated from protobuf enum value: KIND_UNKNOWN = 0;
   */
  KIND_UNKNOWN = 0,
  /**
   * End the epoch and start the next one.
   *
   * @generated from protobuf enum value: CHANGE_EPOCH = 1;
   */
  CHANGE_EPOCH = 1,
  /**
   * Create and initialize the authenticator object used for zklogin.
   *
   * @generated from protobuf enum value: AUTHENTICATOR_STATE_CREATE = 2;
   */
  AUTHENTICATOR_STATE_CREATE = 2,
  /**
   * Expire JWKs used for zklogin.
   *
   * @generated from protobuf enum value: AUTHENTICATOR_STATE_EXPIRE = 3;
   */
  AUTHENTICATOR_STATE_EXPIRE = 3,
  /**
   * Create and initialize the randomness object.
   *
   * @generated from protobuf enum value: RANDOMNESS_STATE_CREATE = 4;
   */
  RANDOMNESS_STATE_CREATE = 4,
  /**
   * Create and initialize the deny list object.
   *
   * @generated from protobuf enum value: DENY_LIST_STATE_CREATE = 5;
   */
  DENY_LIST_STATE_CREATE = 5,
  /**
   * Create and initialize the bridge object.
   *
   * @generated from protobuf enum value: BRIDGE_STATE_CREATE = 6;
   */
  BRIDGE_STATE_CREATE = 6,
  /**
   * Initialize the bridge committee.
   *
   * @generated from protobuf enum value: BRIDGE_COMMITTEE_INIT = 7;
   */
  BRIDGE_COMMITTEE_INIT = 7,
  /**
   * Execution time observations from the committee to preserve cross epoch
   *
   * @generated from protobuf enum value: STORE_EXECUTION_TIME_OBSERVATIONS = 8;
   */
  STORE_EXECUTION_TIME_OBSERVATIONS = 8,
  /**
   * Create the accumulator root object.
   *
   * @generated from protobuf enum value: ACCUMULATOR_ROOT_CREATE = 9;
   */
  ACCUMULATOR_ROOT_CREATE = 9,
  /**
   * Create and initialize the Coin Registry object.
   *
   * @generated from protobuf enum value: COIN_REGISTRY_CREATE = 10;
   */
  COIN_REGISTRY_CREATE = 10,
  /**
   * Create and initialize the Display Registry object.
   *
   * @generated from protobuf enum value: DISPLAY_REGISTRY_CREATE = 11;
   */
  DISPLAY_REGISTRY_CREATE = 11,
  /**
   * Create and initialize the Address Alias State object.
   *
   * @generated from protobuf enum value: ADDRESS_ALIAS_STATE_CREATE = 12;
   */
  ADDRESS_ALIAS_STATE_CREATE = 12,
  /**
   * Write the end-of-epoch-computed storage cost for accumulator objects.
   *
   * @generated from protobuf enum value: WRITE_ACCUMULATOR_STORAGE_COST = 13;
   */
  WRITE_ACCUMULATOR_STORAGE_COST = 13,
}
/**
 * Expire old JWKs.
 *
 * @generated from protobuf message sui.rpc.v2.AuthenticatorStateExpire
 */
interface AuthenticatorStateExpire {
  /**
   * Expire JWKs that have a lower epoch than this.
   *
   * @generated from protobuf field: optional uint64 min_epoch = 1;
   */
  minEpoch?: bigint;
  /**
   * The initial version of the authenticator object that it was shared at.
   *
   * @generated from protobuf field: optional uint64 authenticator_object_initial_shared_version = 2;
   */
  authenticatorObjectInitialSharedVersion?: bigint;
}
/**
 * @generated from protobuf message sui.rpc.v2.ExecutionTimeObservations
 */
interface ExecutionTimeObservations {
  /**
   * Version of this ExecutionTimeObservations
   *
   * @generated from protobuf field: optional int32 version = 1;
   */
  version?: number;
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.ExecutionTimeObservation observations = 2;
   */
  observations: ExecutionTimeObservation[];
}
/**
 * @generated from protobuf message sui.rpc.v2.ExecutionTimeObservation
 */
interface ExecutionTimeObservation {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ExecutionTimeObservation.ExecutionTimeObservationKind kind = 1;
   */
  kind?: ExecutionTimeObservation_ExecutionTimeObservationKind;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.MoveCall move_entry_point = 2;
   */
  moveEntryPoint?: MoveCall;
  /**
   * @generated from protobuf field: repeated sui.rpc.v2.ValidatorExecutionTimeObservation validator_observations = 3;
   */
  validatorObservations: ValidatorExecutionTimeObservation[];
}
/**
 * @generated from protobuf enum sui.rpc.v2.ExecutionTimeObservation.ExecutionTimeObservationKind
 */
declare enum ExecutionTimeObservation_ExecutionTimeObservationKind {
  /**
   * @generated from protobuf enum value: EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN = 0;
   */
  EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: MOVE_ENTRY_POINT = 1;
   */
  MOVE_ENTRY_POINT = 1,
  /**
   * @generated from protobuf enum value: TRANSFER_OBJECTS = 2;
   */
  TRANSFER_OBJECTS = 2,
  /**
   * @generated from protobuf enum value: SPLIT_COINS = 3;
   */
  SPLIT_COINS = 3,
  /**
   * @generated from protobuf enum value: MERGE_COINS = 4;
   */
  MERGE_COINS = 4,
  /**
   * @generated from protobuf enum value: PUBLISH = 5;
   */
  PUBLISH = 5,
  /**
   * @generated from protobuf enum value: MAKE_MOVE_VECTOR = 6;
   */
  MAKE_MOVE_VECTOR = 6,
  /**
   * @generated from protobuf enum value: UPGRADE = 7;
   */
  UPGRADE = 7,
}
/**
 * @generated from protobuf message sui.rpc.v2.ValidatorExecutionTimeObservation
 */
interface ValidatorExecutionTimeObservation {
  /**
   * Bls12381 public key of the validator
   *
   * @generated from protobuf field: optional bytes validator = 1;
   */
  validator?: Uint8Array;
  /**
   * Duration of an execution observation
   *
   * @generated from protobuf field: optional google.protobuf.Duration duration = 2;
   */
  duration?: Duration;
}
declare class Transaction$Type extends MessageType<Transaction> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Transaction
 */
declare const Transaction: Transaction$Type;
declare class GasPayment$Type extends MessageType<GasPayment> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GasPayment
 */
declare const GasPayment: GasPayment$Type;
declare class TransactionExpiration$Type extends MessageType<TransactionExpiration> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.TransactionExpiration
 */
declare const TransactionExpiration: TransactionExpiration$Type;
declare class TransactionKind$Type extends MessageType<TransactionKind> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.TransactionKind
 */
declare const TransactionKind: TransactionKind$Type;
declare class ProgrammableTransaction$Type extends MessageType<ProgrammableTransaction> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ProgrammableTransaction
 */
declare const ProgrammableTransaction: ProgrammableTransaction$Type;
declare class Command$Type extends MessageType<Command> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Command
 */
declare const Command: Command$Type;
declare class MoveCall$Type extends MessageType<MoveCall> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MoveCall
 */
declare const MoveCall: MoveCall$Type;
declare class TransferObjects$Type extends MessageType<TransferObjects> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.TransferObjects
 */
declare const TransferObjects: TransferObjects$Type;
declare class SplitCoins$Type extends MessageType<SplitCoins> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SplitCoins
 */
declare const SplitCoins: SplitCoins$Type;
declare class MergeCoins$Type extends MessageType<MergeCoins> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MergeCoins
 */
declare const MergeCoins: MergeCoins$Type;
declare class Publish$Type extends MessageType<Publish> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Publish
 */
declare const Publish: Publish$Type;
declare class MakeMoveVector$Type extends MessageType<MakeMoveVector> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MakeMoveVector
 */
declare const MakeMoveVector: MakeMoveVector$Type;
declare class Upgrade$Type extends MessageType<Upgrade> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Upgrade
 */
declare const Upgrade: Upgrade$Type;
declare class RandomnessStateUpdate$Type extends MessageType<RandomnessStateUpdate> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.RandomnessStateUpdate
 */
declare const RandomnessStateUpdate: RandomnessStateUpdate$Type;
declare class ChangeEpoch$Type extends MessageType<ChangeEpoch> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ChangeEpoch
 */
declare const ChangeEpoch: ChangeEpoch$Type;
declare class SystemPackage$Type extends MessageType<SystemPackage> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SystemPackage
 */
declare const SystemPackage: SystemPackage$Type;
declare class GenesisTransaction$Type extends MessageType<GenesisTransaction> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GenesisTransaction
 */
declare const GenesisTransaction: GenesisTransaction$Type;
declare class ConsensusCommitPrologue$Type extends MessageType<ConsensusCommitPrologue> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ConsensusCommitPrologue
 */
declare const ConsensusCommitPrologue: ConsensusCommitPrologue$Type;
declare class VersionAssignment$Type extends MessageType<VersionAssignment> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.VersionAssignment
 */
declare const VersionAssignment: VersionAssignment$Type;
declare class CanceledTransaction$Type extends MessageType<CanceledTransaction> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CanceledTransaction
 */
declare const CanceledTransaction: CanceledTransaction$Type;
declare class ConsensusDeterminedVersionAssignments$Type extends MessageType<ConsensusDeterminedVersionAssignments> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ConsensusDeterminedVersionAssignments
 */
declare const ConsensusDeterminedVersionAssignments: ConsensusDeterminedVersionAssignments$Type;
declare class AuthenticatorStateUpdate$Type extends MessageType<AuthenticatorStateUpdate> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.AuthenticatorStateUpdate
 */
declare const AuthenticatorStateUpdate: AuthenticatorStateUpdate$Type;
declare class ActiveJwk$Type extends MessageType<ActiveJwk> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ActiveJwk
 */
declare const ActiveJwk: ActiveJwk$Type;
declare class EndOfEpochTransaction$Type extends MessageType<EndOfEpochTransaction> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochTransaction
 */
declare const EndOfEpochTransaction: EndOfEpochTransaction$Type;
declare class EndOfEpochTransactionKind$Type extends MessageType<EndOfEpochTransactionKind> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.EndOfEpochTransactionKind
 */
declare const EndOfEpochTransactionKind: EndOfEpochTransactionKind$Type;
declare class AuthenticatorStateExpire$Type extends MessageType<AuthenticatorStateExpire> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.AuthenticatorStateExpire
 */
declare const AuthenticatorStateExpire: AuthenticatorStateExpire$Type;
declare class ExecutionTimeObservations$Type extends MessageType<ExecutionTimeObservations> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ExecutionTimeObservations
 */
declare const ExecutionTimeObservations: ExecutionTimeObservations$Type;
declare class ExecutionTimeObservation$Type extends MessageType<ExecutionTimeObservation> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ExecutionTimeObservation
 */
declare const ExecutionTimeObservation: ExecutionTimeObservation$Type;
declare class ValidatorExecutionTimeObservation$Type extends MessageType<ValidatorExecutionTimeObservation> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ValidatorExecutionTimeObservation
 */
declare const ValidatorExecutionTimeObservation: ValidatorExecutionTimeObservation$Type;
//#endregion
export { ActiveJwk, AuthenticatorStateExpire, AuthenticatorStateUpdate, CanceledTransaction, ChangeEpoch, Command, ConsensusCommitPrologue, ConsensusDeterminedVersionAssignments, EndOfEpochTransaction, EndOfEpochTransactionKind, EndOfEpochTransactionKind_Kind, ExecutionTimeObservation, ExecutionTimeObservation_ExecutionTimeObservationKind, ExecutionTimeObservations, GasPayment, GenesisTransaction, MakeMoveVector, MergeCoins, MoveCall, ProgrammableTransaction, Publish, RandomnessStateUpdate, SplitCoins, SystemPackage, Transaction, TransactionExpiration, TransactionExpiration_TransactionExpirationKind, TransactionKind, TransactionKind_Kind, TransferObjects, Upgrade, ValidatorExecutionTimeObservation, VersionAssignment };
//# sourceMappingURL=transaction.d.mts.map