import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/execution_status.d.ts

/**
 * The status of an executed transaction.
 *
 * @generated from protobuf message sui.rpc.v2.ExecutionStatus
 */
interface ExecutionStatus {
  /**
   * Indicates if the transaction was successful or not.
   *
   * @generated from protobuf field: optional bool success = 1;
   */
  success?: boolean;
  /**
   * The error if `success` is false.
   *
   * @generated from protobuf field: optional sui.rpc.v2.ExecutionError error = 2;
   */
  error?: ExecutionError;
}
/**
 * An error that can occur during the execution of a transaction.
 *
 * @generated from protobuf message sui.rpc.v2.ExecutionError
 */
interface ExecutionError {
  /**
   * A human readable description of the error
   *
   * @generated from protobuf field: optional string description = 1;
   */
  description?: string;
  /**
   * The command, if any, during which the error occurred.
   *
   * @generated from protobuf field: optional uint64 command = 2;
   */
  command?: bigint;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.ExecutionError.ExecutionErrorKind kind = 3;
   */
  kind?: ExecutionError_ExecutionErrorKind;
  /**
   * @generated from protobuf oneof: error_details
   */
  errorDetails: {
    oneofKind: 'abort';
    /**
     * @generated from protobuf field: sui.rpc.v2.MoveAbort abort = 4;
     */
    abort: MoveAbort;
  } | {
    oneofKind: 'sizeError';
    /**
     * @generated from protobuf field: sui.rpc.v2.SizeError size_error = 5;
     */
    sizeError: SizeError;
  } | {
    oneofKind: 'commandArgumentError';
    /**
     * @generated from protobuf field: sui.rpc.v2.CommandArgumentError command_argument_error = 6;
     */
    commandArgumentError: CommandArgumentError;
  } | {
    oneofKind: 'typeArgumentError';
    /**
     * @generated from protobuf field: sui.rpc.v2.TypeArgumentError type_argument_error = 7;
     */
    typeArgumentError: TypeArgumentError;
  } | {
    oneofKind: 'packageUpgradeError';
    /**
     * @generated from protobuf field: sui.rpc.v2.PackageUpgradeError package_upgrade_error = 8;
     */
    packageUpgradeError: PackageUpgradeError;
  } | {
    oneofKind: 'indexError';
    /**
     * @generated from protobuf field: sui.rpc.v2.IndexError index_error = 9;
     */
    indexError: IndexError;
  } | {
    oneofKind: 'objectId';
    /**
     * @generated from protobuf field: string object_id = 10;
     */
    objectId: string;
  } | {
    oneofKind: 'coinDenyListError';
    /**
     * @generated from protobuf field: sui.rpc.v2.CoinDenyListError coin_deny_list_error = 11;
     */
    coinDenyListError: CoinDenyListError;
  } | {
    oneofKind: 'congestedObjects';
    /**
     * Set of objects that were congested, leading to the transaction's cancellation.
     *
     * @generated from protobuf field: sui.rpc.v2.CongestedObjects congested_objects = 12;
     */
    congestedObjects: CongestedObjects;
  } | {
    oneofKind: undefined;
  };
}
/**
 * @generated from protobuf enum sui.rpc.v2.ExecutionError.ExecutionErrorKind
 */
declare enum ExecutionError_ExecutionErrorKind {
  /**
   * @generated from protobuf enum value: EXECUTION_ERROR_KIND_UNKNOWN = 0;
   */
  EXECUTION_ERROR_KIND_UNKNOWN = 0,
  /**
   * Insufficient gas.
   *
   * @generated from protobuf enum value: INSUFFICIENT_GAS = 1;
   */
  INSUFFICIENT_GAS = 1,
  /**
   * Invalid `Gas` object.
   *
   * @generated from protobuf enum value: INVALID_GAS_OBJECT = 2;
   */
  INVALID_GAS_OBJECT = 2,
  /**
   * Invariant violation.
   *
   * @generated from protobuf enum value: INVARIANT_VIOLATION = 3;
   */
  INVARIANT_VIOLATION = 3,
  /**
   * Attempted to use feature that is not supported yet.
   *
   * @generated from protobuf enum value: FEATURE_NOT_YET_SUPPORTED = 4;
   */
  FEATURE_NOT_YET_SUPPORTED = 4,
  /**
   * Move object is larger than the maximum allowed size.
   *
   * @generated from protobuf enum value: OBJECT_TOO_BIG = 5;
   */
  OBJECT_TOO_BIG = 5,
  /**
   * Package is larger than the maximum allowed size.
   *
   * @generated from protobuf enum value: PACKAGE_TOO_BIG = 6;
   */
  PACKAGE_TOO_BIG = 6,
  /**
   * Circular object ownership.
   *
   * @generated from protobuf enum value: CIRCULAR_OBJECT_OWNERSHIP = 7;
   */
  CIRCULAR_OBJECT_OWNERSHIP = 7,
  /**
   * Insufficient coin balance for requested operation.
   *
   * @generated from protobuf enum value: INSUFFICIENT_COIN_BALANCE = 8;
   */
  INSUFFICIENT_COIN_BALANCE = 8,
  /**
   * Coin balance overflowed an u64.
   *
   * @generated from protobuf enum value: COIN_BALANCE_OVERFLOW = 9;
   */
  COIN_BALANCE_OVERFLOW = 9,
  /**
   * Publish error, non-zero address.
   * The modules in the package must have their self-addresses set to zero.
   *
   * @generated from protobuf enum value: PUBLISH_ERROR_NON_ZERO_ADDRESS = 10;
   */
  PUBLISH_ERROR_NON_ZERO_ADDRESS = 10,
  /**
   * Sui Move bytecode verification error.
   *
   * @generated from protobuf enum value: SUI_MOVE_VERIFICATION_ERROR = 11;
   */
  SUI_MOVE_VERIFICATION_ERROR = 11,
  /**
   * Error from a non-abort instruction.
   * Possible causes:
   *     Arithmetic error, stack overflow, max value depth, or similar.
   *
   * @generated from protobuf enum value: MOVE_PRIMITIVE_RUNTIME_ERROR = 12;
   */
  MOVE_PRIMITIVE_RUNTIME_ERROR = 12,
  /**
   * Move runtime abort.
   *
   * @generated from protobuf enum value: MOVE_ABORT = 13;
   */
  MOVE_ABORT = 13,
  /**
   * Bytecode verification error.
   *
   * @generated from protobuf enum value: VM_VERIFICATION_OR_DESERIALIZATION_ERROR = 14;
   */
  VM_VERIFICATION_OR_DESERIALIZATION_ERROR = 14,
  /**
   * MoveVm invariant violation.
   *
   * @generated from protobuf enum value: VM_INVARIANT_VIOLATION = 15;
   */
  VM_INVARIANT_VIOLATION = 15,
  /**
   * Function not found.
   *
   * @generated from protobuf enum value: FUNCTION_NOT_FOUND = 16;
   */
  FUNCTION_NOT_FOUND = 16,
  /**
   * Parity mismatch for Move function.
   * The number of arguments does not match the number of parameters.
   *
   * @generated from protobuf enum value: ARITY_MISMATCH = 17;
   */
  ARITY_MISMATCH = 17,
  /**
   * Type parity mismatch for Move function.
   * Mismatch between the number of actual versus expected type arguments.
   *
   * @generated from protobuf enum value: TYPE_ARITY_MISMATCH = 18;
   */
  TYPE_ARITY_MISMATCH = 18,
  /**
   * Non-entry function invoked. Move Call must start with an entry function.
   *
   * @generated from protobuf enum value: NON_ENTRY_FUNCTION_INVOKED = 19;
   */
  NON_ENTRY_FUNCTION_INVOKED = 19,
  /**
   * Invalid command argument.
   *
   * @generated from protobuf enum value: COMMAND_ARGUMENT_ERROR = 20;
   */
  COMMAND_ARGUMENT_ERROR = 20,
  /**
   * Type argument error.
   *
   * @generated from protobuf enum value: TYPE_ARGUMENT_ERROR = 21;
   */
  TYPE_ARGUMENT_ERROR = 21,
  /**
   * Unused result without the drop ability.
   *
   * @generated from protobuf enum value: UNUSED_VALUE_WITHOUT_DROP = 22;
   */
  UNUSED_VALUE_WITHOUT_DROP = 22,
  /**
   * Invalid public Move function signature.
   * Unsupported return type for return value.
   *
   * @generated from protobuf enum value: INVALID_PUBLIC_FUNCTION_RETURN_TYPE = 23;
   */
  INVALID_PUBLIC_FUNCTION_RETURN_TYPE = 23,
  /**
   * Invalid transfer object, object does not have public transfer.
   *
   * @generated from protobuf enum value: INVALID_TRANSFER_OBJECT = 24;
   */
  INVALID_TRANSFER_OBJECT = 24,
  /**
   * Effects from the transaction are too large.
   *
   * @generated from protobuf enum value: EFFECTS_TOO_LARGE = 25;
   */
  EFFECTS_TOO_LARGE = 25,
  /**
   * Publish or Upgrade is missing dependency.
   *
   * @generated from protobuf enum value: PUBLISH_UPGRADE_MISSING_DEPENDENCY = 26;
   */
  PUBLISH_UPGRADE_MISSING_DEPENDENCY = 26,
  /**
   * Publish or upgrade dependency downgrade.
   *
   * Indirect (transitive) dependency of published or upgraded package has been assigned an
   * on-chain version that is less than the version required by one of the package's
   * transitive dependencies.
   *
   * @generated from protobuf enum value: PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE = 27;
   */
  PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE = 27,
  /**
   * Invalid package upgrade.
   *
   * @generated from protobuf enum value: PACKAGE_UPGRADE_ERROR = 28;
   */
  PACKAGE_UPGRADE_ERROR = 28,
  /**
   * Indicates the transaction tried to write objects too large to storage.
   *
   * @generated from protobuf enum value: WRITTEN_OBJECTS_TOO_LARGE = 29;
   */
  WRITTEN_OBJECTS_TOO_LARGE = 29,
  /**
   * Certificate is on the deny list.
   *
   * @generated from protobuf enum value: CERTIFICATE_DENIED = 30;
   */
  CERTIFICATE_DENIED = 30,
  /**
   * Sui Move bytecode verification timed out.
   *
   * @generated from protobuf enum value: SUI_MOVE_VERIFICATION_TIMEDOUT = 31;
   */
  SUI_MOVE_VERIFICATION_TIMEDOUT = 31,
  /**
   * The requested consensus object operation is not allowed.
   *
   * @generated from protobuf enum value: CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 32;
   */
  CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 32,
  /**
   * Requested consensus object has been deleted.
   *
   * @generated from protobuf enum value: INPUT_OBJECT_DELETED = 33;
   */
  INPUT_OBJECT_DELETED = 33,
  /**
   * Certificate is canceled due to congestion on consensus objects.
   *
   * @generated from protobuf enum value: EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION = 34;
   */
  EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION = 34,
  /**
   * Address is denied for this coin type.
   *
   * @generated from protobuf enum value: ADDRESS_DENIED_FOR_COIN = 35;
   */
  ADDRESS_DENIED_FOR_COIN = 35,
  /**
   * Coin type is globally paused for use.
   *
   * @generated from protobuf enum value: COIN_TYPE_GLOBAL_PAUSE = 36;
   */
  COIN_TYPE_GLOBAL_PAUSE = 36,
  /**
   * Certificate is canceled because randomness could not be generated this epoch.
   *
   * @generated from protobuf enum value: EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE = 37;
   */
  EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE = 37,
  /**
   * Move vector element (passed to MakeMoveVec) with size {value_size} is larger \
   * than the maximum size {max_scaled_size}. Note that this maximum is scaled based on the \
   * type of the vector element.
   *
   * @generated from protobuf enum value: MOVE_VECTOR_ELEM_TOO_BIG = 38;
   */
  MOVE_VECTOR_ELEM_TOO_BIG = 38,
  /**
   * Move value (possibly an upgrade ticket or a dev-inspect value) with size {value_size} \
   * is larger than the maximum size  {max_scaled_size}. Note that this maximum is scaled based \
   * on the type of the value.
   *
   * @generated from protobuf enum value: MOVE_RAW_VALUE_TOO_BIG = 39;
   */
  MOVE_RAW_VALUE_TOO_BIG = 39,
  /**
   * A valid linkage was unable to be determined for the transaction or one of its commands.
   *
   * @generated from protobuf enum value: INVALID_LINKAGE = 40;
   */
  INVALID_LINKAGE = 40,
  /**
   * Insufficient funds for transaction withdrawal
   *
   * @generated from protobuf enum value: INSUFFICIENT_FUNDS_FOR_WITHDRAW = 41;
   */
  INSUFFICIENT_FUNDS_FOR_WITHDRAW = 41,
  /**
   * An input object with non-exclusive write mutability was modified
   *
   * @generated from protobuf enum value: NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED = 42;
   */
  NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED = 42,
}
/**
 * @generated from protobuf message sui.rpc.v2.MoveAbort
 */
interface MoveAbort {
  /**
   * @generated from protobuf field: optional uint64 abort_code = 1;
   */
  abortCode?: bigint;
  /**
   * Location in Move where the error occurred.
   *
   * @generated from protobuf field: optional sui.rpc.v2.MoveLocation location = 2;
   */
  location?: MoveLocation;
  /**
   * Extra error information if abort code is a "Clever Error"
   *
   * @generated from protobuf field: optional sui.rpc.v2.CleverError clever_error = 3;
   */
  cleverError?: CleverError;
}
/**
 * Location in Move bytecode where an error occurred.
 *
 * @generated from protobuf message sui.rpc.v2.MoveLocation
 */
interface MoveLocation {
  /**
   * The package ID.
   *
   * @generated from protobuf field: optional string package = 1;
   */
  package?: string;
  /**
   * The module name.
   *
   * @generated from protobuf field: optional string module = 2;
   */
  module?: string;
  /**
   * The function index.
   *
   * @generated from protobuf field: optional uint32 function = 3;
   */
  function?: number;
  /**
   * Offset of the instruction where the error occurred.
   *
   * @generated from protobuf field: optional uint32 instruction = 4;
   */
  instruction?: number;
  /**
   * The name of the function, if available.
   *
   * @generated from protobuf field: optional string function_name = 5;
   */
  functionName?: string;
}
/**
 * @generated from protobuf message sui.rpc.v2.CleverError
 */
interface CleverError {
  /**
   * @generated from protobuf field: optional uint64 error_code = 1;
   */
  errorCode?: bigint;
  /**
   * @generated from protobuf field: optional uint64 line_number = 2;
   */
  lineNumber?: bigint;
  /**
   * @generated from protobuf field: optional string constant_name = 3;
   */
  constantName?: string;
  /**
   * @generated from protobuf field: optional string constant_type = 4;
   */
  constantType?: string;
  /**
   * @generated from protobuf oneof: value
   */
  value: {
    oneofKind: 'rendered';
    /**
     * @generated from protobuf field: string rendered = 5;
     */
    rendered: string;
  } | {
    oneofKind: 'raw';
    /**
     * @generated from protobuf field: bytes raw = 6;
     */
    raw: Uint8Array;
  } | {
    oneofKind: undefined;
  };
}
/**
 * A size error.
 *
 * @generated from protobuf message sui.rpc.v2.SizeError
 */
interface SizeError {
  /**
   * The offending size.
   *
   * @generated from protobuf field: optional uint64 size = 1;
   */
  size?: bigint;
  /**
   * The maximum allowable size.
   *
   * @generated from protobuf field: optional uint64 max_size = 2;
   */
  maxSize?: bigint;
}
/**
 * @generated from protobuf message sui.rpc.v2.IndexError
 */
interface IndexError {
  /**
   * Index of an input or result.
   *
   * @generated from protobuf field: optional uint32 index = 1;
   */
  index?: number;
  /**
   * Index of a subresult.
   *
   * @generated from protobuf field: optional uint32 subresult = 2;
   */
  subresult?: number;
}
/**
 * @generated from protobuf message sui.rpc.v2.CoinDenyListError
 */
interface CoinDenyListError {
  /**
   * Denied address.
   *
   * @generated from protobuf field: optional string address = 1;
   */
  address?: string;
  /**
   * Coin type.
   *
   * @generated from protobuf field: optional string coin_type = 2;
   */
  coinType?: string;
}
/**
 * Set of objects that were congested, leading to the transaction's cancellation.
 *
 * @generated from protobuf message sui.rpc.v2.CongestedObjects
 */
interface CongestedObjects {
  /**
   * @generated from protobuf field: repeated string objects = 1;
   */
  objects: string[];
}
/**
 * An error with an argument to a command.
 *
 * @generated from protobuf message sui.rpc.v2.CommandArgumentError
 */
interface CommandArgumentError {
  /**
   * Position of the problematic argument.
   *
   * @generated from protobuf field: optional uint32 argument = 1;
   */
  argument?: number;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.CommandArgumentError.CommandArgumentErrorKind kind = 2;
   */
  kind?: CommandArgumentError_CommandArgumentErrorKind;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.IndexError index_error = 3;
   */
  indexError?: IndexError;
}
/**
 * @generated from protobuf enum sui.rpc.v2.CommandArgumentError.CommandArgumentErrorKind
 */
declare enum CommandArgumentError_CommandArgumentErrorKind {
  /**
   * @generated from protobuf enum value: COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN = 0;
   */
  COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN = 0,
  /**
   * The type of the value does not match the expected type.
   *
   * @generated from protobuf enum value: TYPE_MISMATCH = 1;
   */
  TYPE_MISMATCH = 1,
  /**
   * The argument cannot be deserialized into a value of the specified type.
   *
   * @generated from protobuf enum value: INVALID_BCS_BYTES = 2;
   */
  INVALID_BCS_BYTES = 2,
  /**
   * The argument cannot be instantiated from raw bytes.
   *
   * @generated from protobuf enum value: INVALID_USAGE_OF_PURE_ARGUMENT = 3;
   */
  INVALID_USAGE_OF_PURE_ARGUMENT = 3,
  /**
   * Invalid argument to private entry function.
   * Private entry functions cannot take arguments from other Move functions.
   *
   * @generated from protobuf enum value: INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION = 4;
   */
  INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION = 4,
  /**
   * Out of bounds access to input or results.
   *
   * `index` field will be set indicating the invalid index value.
   *
   * @generated from protobuf enum value: INDEX_OUT_OF_BOUNDS = 5;
   */
  INDEX_OUT_OF_BOUNDS = 5,
  /**
   * Out of bounds access to subresult.
   *
   * `index` and `subresult` fields will be set indicating the invalid index value.
   *
   * @generated from protobuf enum value: SECONDARY_INDEX_OUT_OF_BOUNDS = 6;
   */
  SECONDARY_INDEX_OUT_OF_BOUNDS = 6,
  /**
   * Invalid usage of result.
   * Expected a single result but found either no return value or multiple.
   * `index` field will be set indicating the invalid index value.
   *
   * @generated from protobuf enum value: INVALID_RESULT_ARITY = 7;
   */
  INVALID_RESULT_ARITY = 7,
  /**
   * Invalid usage of gas coin.
   * The gas coin can only be used by-value with a `TransferObject` command.
   *
   * @generated from protobuf enum value: INVALID_GAS_COIN_USAGE = 8;
   */
  INVALID_GAS_COIN_USAGE = 8,
  /**
   * Invalid usage of Move value.
   *    - Mutably borrowed values require unique usage.
   *    - Immutably borrowed values cannot be taken or borrowed mutably.
   *    - Taken values cannot be used again.
   *
   * @generated from protobuf enum value: INVALID_VALUE_USAGE = 9;
   */
  INVALID_VALUE_USAGE = 9,
  /**
   * Immutable objects cannot be passed by-value.
   *
   * @generated from protobuf enum value: INVALID_OBJECT_BY_VALUE = 10;
   */
  INVALID_OBJECT_BY_VALUE = 10,
  /**
   * Immutable objects cannot be passed by mutable reference, `&mut`.
   *
   * @generated from protobuf enum value: INVALID_OBJECT_BY_MUT_REF = 11;
   */
  INVALID_OBJECT_BY_MUT_REF = 11,
  /**
   * Consensus object operations such as wrapping, freezing, or converting to owned are not
   * allowed.
   *
   * @generated from protobuf enum value: CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 12;
   */
  CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 12,
  /**
   * Invalid argument arity. Expected a single argument but found a result that expanded to
   * multiple arguments.
   *
   * @generated from protobuf enum value: INVALID_ARGUMENT_ARITY = 13;
   */
  INVALID_ARGUMENT_ARITY = 13,
  /**
   * Object passed to TransferObject does not have public transfer, i.e. the `store` ability
   *
   * @generated from protobuf enum value: INVALID_TRANSFER_OBJECT = 14;
   */
  INVALID_TRANSFER_OBJECT = 14,
  /**
   * First argument to MakeMoveVec is not an object. If no type is specified for MakeMoveVec,
   * all arguments must be the same object type.
   *
   * @generated from protobuf enum value: INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT = 15;
   */
  INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT = 15,
  /**
   * Specified argument location does not have a value and cannot be used
   *
   * @generated from protobuf enum value: ARGUMENT_WITHOUT_VALUE = 16;
   */
  ARGUMENT_WITHOUT_VALUE = 16,
  /**
   * Cannot move a borrowed value. The value's type does resulted in this argument usage being
   * inferred as a move. This is likely due to the type not having the `copy` ability; although
   * in rare cases, it could also be this is the last usage of a value without the `drop`
   * ability.
   *
   * @generated from protobuf enum value: CANNOT_MOVE_BORROWED_VALUE = 17;
   */
  CANNOT_MOVE_BORROWED_VALUE = 17,
  /**
   * Cannot write to an argument location that is still borrowed, and where that borrow is an
   * extension of that reference. This is likely due to this argument being used in a Move call
   * that returns a reference, and that reference is used in a later command.
   *
   * @generated from protobuf enum value: CANNOT_WRITE_TO_EXTENDED_REFERENCE = 18;
   */
  CANNOT_WRITE_TO_EXTENDED_REFERENCE = 18,
  /**
   * The argument specified cannot be used as a reference argument in the Move call. Either the
   * argument is a mutable reference and it conflicts with another argument to the call, or the
   * argument is mutable and another reference extends it and will be used in a later command.
   *
   * @generated from protobuf enum value: INVALID_REFERENCE_ARGUMENT = 19;
   */
  INVALID_REFERENCE_ARGUMENT = 19,
}
/**
 * An error with upgrading a package.
 *
 * @generated from protobuf message sui.rpc.v2.PackageUpgradeError
 */
interface PackageUpgradeError {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.PackageUpgradeError.PackageUpgradeErrorKind kind = 1;
   */
  kind?: PackageUpgradeError_PackageUpgradeErrorKind;
  /**
   * The Package Id.
   *
   * @generated from protobuf field: optional string package_id = 2;
   */
  packageId?: string;
  /**
   * A digest.
   *
   * @generated from protobuf field: optional string digest = 3;
   */
  digest?: string;
  /**
   * The policy.
   *
   * @generated from protobuf field: optional uint32 policy = 4;
   */
  policy?: number;
  /**
   * The ticket Id.
   *
   * @generated from protobuf field: optional string ticket_id = 5;
   */
  ticketId?: string;
}
/**
 * @generated from protobuf enum sui.rpc.v2.PackageUpgradeError.PackageUpgradeErrorKind
 */
declare enum PackageUpgradeError_PackageUpgradeErrorKind {
  /**
   * @generated from protobuf enum value: PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN = 0;
   */
  PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN = 0,
  /**
   * Unable to fetch package.
   *
   * @generated from protobuf enum value: UNABLE_TO_FETCH_PACKAGE = 1;
   */
  UNABLE_TO_FETCH_PACKAGE = 1,
  /**
   * Object is not a package.
   *
   * @generated from protobuf enum value: NOT_A_PACKAGE = 2;
   */
  NOT_A_PACKAGE = 2,
  /**
   * Package upgrade is incompatible with previous version.
   *
   * @generated from protobuf enum value: INCOMPATIBLE_UPGRADE = 3;
   */
  INCOMPATIBLE_UPGRADE = 3,
  /**
   * Digest in upgrade ticket and computed digest differ.
   *
   * @generated from protobuf enum value: DIGEST_DOES_NOT_MATCH = 4;
   */
  DIGEST_DOES_NOT_MATCH = 4,
  /**
   * Upgrade policy is not valid.
   *
   * @generated from protobuf enum value: UNKNOWN_UPGRADE_POLICY = 5;
   */
  UNKNOWN_UPGRADE_POLICY = 5,
  /**
   * Package ID does not match `PackageId` in upgrade ticket.
   *
   * @generated from protobuf enum value: PACKAGE_ID_DOES_NOT_MATCH = 6;
   */
  PACKAGE_ID_DOES_NOT_MATCH = 6,
}
/**
 * Type argument error.
 *
 * @generated from protobuf message sui.rpc.v2.TypeArgumentError
 */
interface TypeArgumentError {
  /**
   * Index of the problematic type argument.
   *
   * @generated from protobuf field: optional uint32 type_argument = 1;
   */
  typeArgument?: number;
  /**
   * @generated from protobuf field: optional sui.rpc.v2.TypeArgumentError.TypeArgumentErrorKind kind = 2;
   */
  kind?: TypeArgumentError_TypeArgumentErrorKind;
}
/**
 * @generated from protobuf enum sui.rpc.v2.TypeArgumentError.TypeArgumentErrorKind
 */
declare enum TypeArgumentError_TypeArgumentErrorKind {
  /**
   * @generated from protobuf enum value: TYPE_ARGUMENT_ERROR_KIND_UNKNOWN = 0;
   */
  TYPE_ARGUMENT_ERROR_KIND_UNKNOWN = 0,
  /**
   * A type was not found in the module specified.
   *
   * @generated from protobuf enum value: TYPE_NOT_FOUND = 1;
   */
  TYPE_NOT_FOUND = 1,
  /**
   * A type provided did not match the specified constraint.
   *
   * @generated from protobuf enum value: CONSTRAINT_NOT_SATISFIED = 2;
   */
  CONSTRAINT_NOT_SATISFIED = 2,
}
declare class ExecutionStatus$Type extends MessageType<ExecutionStatus> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ExecutionStatus
 */
declare const ExecutionStatus: ExecutionStatus$Type;
declare class ExecutionError$Type extends MessageType<ExecutionError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ExecutionError
 */
declare const ExecutionError: ExecutionError$Type;
declare class MoveAbort$Type extends MessageType<MoveAbort> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MoveAbort
 */
declare const MoveAbort: MoveAbort$Type;
declare class MoveLocation$Type extends MessageType<MoveLocation> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.MoveLocation
 */
declare const MoveLocation: MoveLocation$Type;
declare class CleverError$Type extends MessageType<CleverError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CleverError
 */
declare const CleverError: CleverError$Type;
declare class SizeError$Type extends MessageType<SizeError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.SizeError
 */
declare const SizeError: SizeError$Type;
declare class IndexError$Type extends MessageType<IndexError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.IndexError
 */
declare const IndexError: IndexError$Type;
declare class CoinDenyListError$Type extends MessageType<CoinDenyListError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CoinDenyListError
 */
declare const CoinDenyListError: CoinDenyListError$Type;
declare class CongestedObjects$Type extends MessageType<CongestedObjects> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CongestedObjects
 */
declare const CongestedObjects: CongestedObjects$Type;
declare class CommandArgumentError$Type extends MessageType<CommandArgumentError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CommandArgumentError
 */
declare const CommandArgumentError: CommandArgumentError$Type;
declare class PackageUpgradeError$Type extends MessageType<PackageUpgradeError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.PackageUpgradeError
 */
declare const PackageUpgradeError: PackageUpgradeError$Type;
declare class TypeArgumentError$Type extends MessageType<TypeArgumentError> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.TypeArgumentError
 */
declare const TypeArgumentError: TypeArgumentError$Type;
//#endregion
export { CleverError, CoinDenyListError, CommandArgumentError, CommandArgumentError_CommandArgumentErrorKind, CongestedObjects, ExecutionError, ExecutionError_ExecutionErrorKind, ExecutionStatus, IndexError, MoveAbort, MoveLocation, PackageUpgradeError, PackageUpgradeError_PackageUpgradeErrorKind, SizeError, TypeArgumentError, TypeArgumentError_TypeArgumentErrorKind };
//# sourceMappingURL=execution_status.d.mts.map