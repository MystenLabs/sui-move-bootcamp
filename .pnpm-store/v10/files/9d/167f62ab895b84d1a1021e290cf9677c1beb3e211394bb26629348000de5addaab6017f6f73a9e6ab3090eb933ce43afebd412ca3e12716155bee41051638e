import { MessageType } from "@protobuf-ts/runtime";

//#region src/grpc/proto/sui/rpc/v2/execution_status.ts
/**
* @generated from protobuf enum sui.rpc.v2.ExecutionError.ExecutionErrorKind
*/
let ExecutionError_ExecutionErrorKind = /* @__PURE__ */ function(ExecutionError_ExecutionErrorKind$1) {
	/**
	* @generated from protobuf enum value: EXECUTION_ERROR_KIND_UNKNOWN = 0;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["EXECUTION_ERROR_KIND_UNKNOWN"] = 0] = "EXECUTION_ERROR_KIND_UNKNOWN";
	/**
	* Insufficient gas.
	*
	* @generated from protobuf enum value: INSUFFICIENT_GAS = 1;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INSUFFICIENT_GAS"] = 1] = "INSUFFICIENT_GAS";
	/**
	* Invalid `Gas` object.
	*
	* @generated from protobuf enum value: INVALID_GAS_OBJECT = 2;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INVALID_GAS_OBJECT"] = 2] = "INVALID_GAS_OBJECT";
	/**
	* Invariant violation.
	*
	* @generated from protobuf enum value: INVARIANT_VIOLATION = 3;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INVARIANT_VIOLATION"] = 3] = "INVARIANT_VIOLATION";
	/**
	* Attempted to use feature that is not supported yet.
	*
	* @generated from protobuf enum value: FEATURE_NOT_YET_SUPPORTED = 4;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["FEATURE_NOT_YET_SUPPORTED"] = 4] = "FEATURE_NOT_YET_SUPPORTED";
	/**
	* Move object is larger than the maximum allowed size.
	*
	* @generated from protobuf enum value: OBJECT_TOO_BIG = 5;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["OBJECT_TOO_BIG"] = 5] = "OBJECT_TOO_BIG";
	/**
	* Package is larger than the maximum allowed size.
	*
	* @generated from protobuf enum value: PACKAGE_TOO_BIG = 6;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["PACKAGE_TOO_BIG"] = 6] = "PACKAGE_TOO_BIG";
	/**
	* Circular object ownership.
	*
	* @generated from protobuf enum value: CIRCULAR_OBJECT_OWNERSHIP = 7;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["CIRCULAR_OBJECT_OWNERSHIP"] = 7] = "CIRCULAR_OBJECT_OWNERSHIP";
	/**
	* Insufficient coin balance for requested operation.
	*
	* @generated from protobuf enum value: INSUFFICIENT_COIN_BALANCE = 8;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INSUFFICIENT_COIN_BALANCE"] = 8] = "INSUFFICIENT_COIN_BALANCE";
	/**
	* Coin balance overflowed an u64.
	*
	* @generated from protobuf enum value: COIN_BALANCE_OVERFLOW = 9;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["COIN_BALANCE_OVERFLOW"] = 9] = "COIN_BALANCE_OVERFLOW";
	/**
	* Publish error, non-zero address.
	* The modules in the package must have their self-addresses set to zero.
	*
	* @generated from protobuf enum value: PUBLISH_ERROR_NON_ZERO_ADDRESS = 10;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["PUBLISH_ERROR_NON_ZERO_ADDRESS"] = 10] = "PUBLISH_ERROR_NON_ZERO_ADDRESS";
	/**
	* Sui Move bytecode verification error.
	*
	* @generated from protobuf enum value: SUI_MOVE_VERIFICATION_ERROR = 11;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["SUI_MOVE_VERIFICATION_ERROR"] = 11] = "SUI_MOVE_VERIFICATION_ERROR";
	/**
	* Error from a non-abort instruction.
	* Possible causes:
	*     Arithmetic error, stack overflow, max value depth, or similar.
	*
	* @generated from protobuf enum value: MOVE_PRIMITIVE_RUNTIME_ERROR = 12;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["MOVE_PRIMITIVE_RUNTIME_ERROR"] = 12] = "MOVE_PRIMITIVE_RUNTIME_ERROR";
	/**
	* Move runtime abort.
	*
	* @generated from protobuf enum value: MOVE_ABORT = 13;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["MOVE_ABORT"] = 13] = "MOVE_ABORT";
	/**
	* Bytecode verification error.
	*
	* @generated from protobuf enum value: VM_VERIFICATION_OR_DESERIALIZATION_ERROR = 14;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["VM_VERIFICATION_OR_DESERIALIZATION_ERROR"] = 14] = "VM_VERIFICATION_OR_DESERIALIZATION_ERROR";
	/**
	* MoveVm invariant violation.
	*
	* @generated from protobuf enum value: VM_INVARIANT_VIOLATION = 15;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["VM_INVARIANT_VIOLATION"] = 15] = "VM_INVARIANT_VIOLATION";
	/**
	* Function not found.
	*
	* @generated from protobuf enum value: FUNCTION_NOT_FOUND = 16;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["FUNCTION_NOT_FOUND"] = 16] = "FUNCTION_NOT_FOUND";
	/**
	* Parity mismatch for Move function.
	* The number of arguments does not match the number of parameters.
	*
	* @generated from protobuf enum value: ARITY_MISMATCH = 17;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["ARITY_MISMATCH"] = 17] = "ARITY_MISMATCH";
	/**
	* Type parity mismatch for Move function.
	* Mismatch between the number of actual versus expected type arguments.
	*
	* @generated from protobuf enum value: TYPE_ARITY_MISMATCH = 18;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["TYPE_ARITY_MISMATCH"] = 18] = "TYPE_ARITY_MISMATCH";
	/**
	* Non-entry function invoked. Move Call must start with an entry function.
	*
	* @generated from protobuf enum value: NON_ENTRY_FUNCTION_INVOKED = 19;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["NON_ENTRY_FUNCTION_INVOKED"] = 19] = "NON_ENTRY_FUNCTION_INVOKED";
	/**
	* Invalid command argument.
	*
	* @generated from protobuf enum value: COMMAND_ARGUMENT_ERROR = 20;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["COMMAND_ARGUMENT_ERROR"] = 20] = "COMMAND_ARGUMENT_ERROR";
	/**
	* Type argument error.
	*
	* @generated from protobuf enum value: TYPE_ARGUMENT_ERROR = 21;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["TYPE_ARGUMENT_ERROR"] = 21] = "TYPE_ARGUMENT_ERROR";
	/**
	* Unused result without the drop ability.
	*
	* @generated from protobuf enum value: UNUSED_VALUE_WITHOUT_DROP = 22;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["UNUSED_VALUE_WITHOUT_DROP"] = 22] = "UNUSED_VALUE_WITHOUT_DROP";
	/**
	* Invalid public Move function signature.
	* Unsupported return type for return value.
	*
	* @generated from protobuf enum value: INVALID_PUBLIC_FUNCTION_RETURN_TYPE = 23;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INVALID_PUBLIC_FUNCTION_RETURN_TYPE"] = 23] = "INVALID_PUBLIC_FUNCTION_RETURN_TYPE";
	/**
	* Invalid transfer object, object does not have public transfer.
	*
	* @generated from protobuf enum value: INVALID_TRANSFER_OBJECT = 24;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INVALID_TRANSFER_OBJECT"] = 24] = "INVALID_TRANSFER_OBJECT";
	/**
	* Effects from the transaction are too large.
	*
	* @generated from protobuf enum value: EFFECTS_TOO_LARGE = 25;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["EFFECTS_TOO_LARGE"] = 25] = "EFFECTS_TOO_LARGE";
	/**
	* Publish or Upgrade is missing dependency.
	*
	* @generated from protobuf enum value: PUBLISH_UPGRADE_MISSING_DEPENDENCY = 26;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["PUBLISH_UPGRADE_MISSING_DEPENDENCY"] = 26] = "PUBLISH_UPGRADE_MISSING_DEPENDENCY";
	/**
	* Publish or upgrade dependency downgrade.
	*
	* Indirect (transitive) dependency of published or upgraded package has been assigned an
	* on-chain version that is less than the version required by one of the package's
	* transitive dependencies.
	*
	* @generated from protobuf enum value: PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE = 27;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE"] = 27] = "PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE";
	/**
	* Invalid package upgrade.
	*
	* @generated from protobuf enum value: PACKAGE_UPGRADE_ERROR = 28;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["PACKAGE_UPGRADE_ERROR"] = 28] = "PACKAGE_UPGRADE_ERROR";
	/**
	* Indicates the transaction tried to write objects too large to storage.
	*
	* @generated from protobuf enum value: WRITTEN_OBJECTS_TOO_LARGE = 29;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["WRITTEN_OBJECTS_TOO_LARGE"] = 29] = "WRITTEN_OBJECTS_TOO_LARGE";
	/**
	* Certificate is on the deny list.
	*
	* @generated from protobuf enum value: CERTIFICATE_DENIED = 30;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["CERTIFICATE_DENIED"] = 30] = "CERTIFICATE_DENIED";
	/**
	* Sui Move bytecode verification timed out.
	*
	* @generated from protobuf enum value: SUI_MOVE_VERIFICATION_TIMEDOUT = 31;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["SUI_MOVE_VERIFICATION_TIMEDOUT"] = 31] = "SUI_MOVE_VERIFICATION_TIMEDOUT";
	/**
	* The requested consensus object operation is not allowed.
	*
	* @generated from protobuf enum value: CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 32;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED"] = 32] = "CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED";
	/**
	* Requested consensus object has been deleted.
	*
	* @generated from protobuf enum value: INPUT_OBJECT_DELETED = 33;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INPUT_OBJECT_DELETED"] = 33] = "INPUT_OBJECT_DELETED";
	/**
	* Certificate is canceled due to congestion on consensus objects.
	*
	* @generated from protobuf enum value: EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION = 34;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION"] = 34] = "EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION";
	/**
	* Address is denied for this coin type.
	*
	* @generated from protobuf enum value: ADDRESS_DENIED_FOR_COIN = 35;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["ADDRESS_DENIED_FOR_COIN"] = 35] = "ADDRESS_DENIED_FOR_COIN";
	/**
	* Coin type is globally paused for use.
	*
	* @generated from protobuf enum value: COIN_TYPE_GLOBAL_PAUSE = 36;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["COIN_TYPE_GLOBAL_PAUSE"] = 36] = "COIN_TYPE_GLOBAL_PAUSE";
	/**
	* Certificate is canceled because randomness could not be generated this epoch.
	*
	* @generated from protobuf enum value: EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE = 37;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE"] = 37] = "EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE";
	/**
	* Move vector element (passed to MakeMoveVec) with size {value_size} is larger \
	* than the maximum size {max_scaled_size}. Note that this maximum is scaled based on the \
	* type of the vector element.
	*
	* @generated from protobuf enum value: MOVE_VECTOR_ELEM_TOO_BIG = 38;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["MOVE_VECTOR_ELEM_TOO_BIG"] = 38] = "MOVE_VECTOR_ELEM_TOO_BIG";
	/**
	* Move value (possibly an upgrade ticket or a dev-inspect value) with size {value_size} \
	* is larger than the maximum size  {max_scaled_size}. Note that this maximum is scaled based \
	* on the type of the value.
	*
	* @generated from protobuf enum value: MOVE_RAW_VALUE_TOO_BIG = 39;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["MOVE_RAW_VALUE_TOO_BIG"] = 39] = "MOVE_RAW_VALUE_TOO_BIG";
	/**
	* A valid linkage was unable to be determined for the transaction or one of its commands.
	*
	* @generated from protobuf enum value: INVALID_LINKAGE = 40;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INVALID_LINKAGE"] = 40] = "INVALID_LINKAGE";
	/**
	* Insufficient funds for transaction withdrawal
	*
	* @generated from protobuf enum value: INSUFFICIENT_FUNDS_FOR_WITHDRAW = 41;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["INSUFFICIENT_FUNDS_FOR_WITHDRAW"] = 41] = "INSUFFICIENT_FUNDS_FOR_WITHDRAW";
	/**
	* An input object with non-exclusive write mutability was modified
	*
	* @generated from protobuf enum value: NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED = 42;
	*/
	ExecutionError_ExecutionErrorKind$1[ExecutionError_ExecutionErrorKind$1["NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED"] = 42] = "NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED";
	return ExecutionError_ExecutionErrorKind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.CommandArgumentError.CommandArgumentErrorKind
*/
let CommandArgumentError_CommandArgumentErrorKind = /* @__PURE__ */ function(CommandArgumentError_CommandArgumentErrorKind$1) {
	/**
	* @generated from protobuf enum value: COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN = 0;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN"] = 0] = "COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN";
	/**
	* The type of the value does not match the expected type.
	*
	* @generated from protobuf enum value: TYPE_MISMATCH = 1;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["TYPE_MISMATCH"] = 1] = "TYPE_MISMATCH";
	/**
	* The argument cannot be deserialized into a value of the specified type.
	*
	* @generated from protobuf enum value: INVALID_BCS_BYTES = 2;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_BCS_BYTES"] = 2] = "INVALID_BCS_BYTES";
	/**
	* The argument cannot be instantiated from raw bytes.
	*
	* @generated from protobuf enum value: INVALID_USAGE_OF_PURE_ARGUMENT = 3;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_USAGE_OF_PURE_ARGUMENT"] = 3] = "INVALID_USAGE_OF_PURE_ARGUMENT";
	/**
	* Invalid argument to private entry function.
	* Private entry functions cannot take arguments from other Move functions.
	*
	* @generated from protobuf enum value: INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION = 4;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION"] = 4] = "INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION";
	/**
	* Out of bounds access to input or results.
	*
	* `index` field will be set indicating the invalid index value.
	*
	* @generated from protobuf enum value: INDEX_OUT_OF_BOUNDS = 5;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INDEX_OUT_OF_BOUNDS"] = 5] = "INDEX_OUT_OF_BOUNDS";
	/**
	* Out of bounds access to subresult.
	*
	* `index` and `subresult` fields will be set indicating the invalid index value.
	*
	* @generated from protobuf enum value: SECONDARY_INDEX_OUT_OF_BOUNDS = 6;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["SECONDARY_INDEX_OUT_OF_BOUNDS"] = 6] = "SECONDARY_INDEX_OUT_OF_BOUNDS";
	/**
	* Invalid usage of result.
	* Expected a single result but found either no return value or multiple.
	* `index` field will be set indicating the invalid index value.
	*
	* @generated from protobuf enum value: INVALID_RESULT_ARITY = 7;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_RESULT_ARITY"] = 7] = "INVALID_RESULT_ARITY";
	/**
	* Invalid usage of gas coin.
	* The gas coin can only be used by-value with a `TransferObject` command.
	*
	* @generated from protobuf enum value: INVALID_GAS_COIN_USAGE = 8;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_GAS_COIN_USAGE"] = 8] = "INVALID_GAS_COIN_USAGE";
	/**
	* Invalid usage of Move value.
	*    - Mutably borrowed values require unique usage.
	*    - Immutably borrowed values cannot be taken or borrowed mutably.
	*    - Taken values cannot be used again.
	*
	* @generated from protobuf enum value: INVALID_VALUE_USAGE = 9;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_VALUE_USAGE"] = 9] = "INVALID_VALUE_USAGE";
	/**
	* Immutable objects cannot be passed by-value.
	*
	* @generated from protobuf enum value: INVALID_OBJECT_BY_VALUE = 10;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_OBJECT_BY_VALUE"] = 10] = "INVALID_OBJECT_BY_VALUE";
	/**
	* Immutable objects cannot be passed by mutable reference, `&mut`.
	*
	* @generated from protobuf enum value: INVALID_OBJECT_BY_MUT_REF = 11;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_OBJECT_BY_MUT_REF"] = 11] = "INVALID_OBJECT_BY_MUT_REF";
	/**
	* Consensus object operations such as wrapping, freezing, or converting to owned are not
	* allowed.
	*
	* @generated from protobuf enum value: CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 12;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED"] = 12] = "CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED";
	/**
	* Invalid argument arity. Expected a single argument but found a result that expanded to
	* multiple arguments.
	*
	* @generated from protobuf enum value: INVALID_ARGUMENT_ARITY = 13;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_ARGUMENT_ARITY"] = 13] = "INVALID_ARGUMENT_ARITY";
	/**
	* Object passed to TransferObject does not have public transfer, i.e. the `store` ability
	*
	* @generated from protobuf enum value: INVALID_TRANSFER_OBJECT = 14;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_TRANSFER_OBJECT"] = 14] = "INVALID_TRANSFER_OBJECT";
	/**
	* First argument to MakeMoveVec is not an object. If no type is specified for MakeMoveVec,
	* all arguments must be the same object type.
	*
	* @generated from protobuf enum value: INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT = 15;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT"] = 15] = "INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT";
	/**
	* Specified argument location does not have a value and cannot be used
	*
	* @generated from protobuf enum value: ARGUMENT_WITHOUT_VALUE = 16;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["ARGUMENT_WITHOUT_VALUE"] = 16] = "ARGUMENT_WITHOUT_VALUE";
	/**
	* Cannot move a borrowed value. The value's type does resulted in this argument usage being
	* inferred as a move. This is likely due to the type not having the `copy` ability; although
	* in rare cases, it could also be this is the last usage of a value without the `drop`
	* ability.
	*
	* @generated from protobuf enum value: CANNOT_MOVE_BORROWED_VALUE = 17;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["CANNOT_MOVE_BORROWED_VALUE"] = 17] = "CANNOT_MOVE_BORROWED_VALUE";
	/**
	* Cannot write to an argument location that is still borrowed, and where that borrow is an
	* extension of that reference. This is likely due to this argument being used in a Move call
	* that returns a reference, and that reference is used in a later command.
	*
	* @generated from protobuf enum value: CANNOT_WRITE_TO_EXTENDED_REFERENCE = 18;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["CANNOT_WRITE_TO_EXTENDED_REFERENCE"] = 18] = "CANNOT_WRITE_TO_EXTENDED_REFERENCE";
	/**
	* The argument specified cannot be used as a reference argument in the Move call. Either the
	* argument is a mutable reference and it conflicts with another argument to the call, or the
	* argument is mutable and another reference extends it and will be used in a later command.
	*
	* @generated from protobuf enum value: INVALID_REFERENCE_ARGUMENT = 19;
	*/
	CommandArgumentError_CommandArgumentErrorKind$1[CommandArgumentError_CommandArgumentErrorKind$1["INVALID_REFERENCE_ARGUMENT"] = 19] = "INVALID_REFERENCE_ARGUMENT";
	return CommandArgumentError_CommandArgumentErrorKind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.PackageUpgradeError.PackageUpgradeErrorKind
*/
let PackageUpgradeError_PackageUpgradeErrorKind = /* @__PURE__ */ function(PackageUpgradeError_PackageUpgradeErrorKind$1) {
	/**
	* @generated from protobuf enum value: PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN = 0;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN"] = 0] = "PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN";
	/**
	* Unable to fetch package.
	*
	* @generated from protobuf enum value: UNABLE_TO_FETCH_PACKAGE = 1;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["UNABLE_TO_FETCH_PACKAGE"] = 1] = "UNABLE_TO_FETCH_PACKAGE";
	/**
	* Object is not a package.
	*
	* @generated from protobuf enum value: NOT_A_PACKAGE = 2;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["NOT_A_PACKAGE"] = 2] = "NOT_A_PACKAGE";
	/**
	* Package upgrade is incompatible with previous version.
	*
	* @generated from protobuf enum value: INCOMPATIBLE_UPGRADE = 3;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["INCOMPATIBLE_UPGRADE"] = 3] = "INCOMPATIBLE_UPGRADE";
	/**
	* Digest in upgrade ticket and computed digest differ.
	*
	* @generated from protobuf enum value: DIGEST_DOES_NOT_MATCH = 4;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["DIGEST_DOES_NOT_MATCH"] = 4] = "DIGEST_DOES_NOT_MATCH";
	/**
	* Upgrade policy is not valid.
	*
	* @generated from protobuf enum value: UNKNOWN_UPGRADE_POLICY = 5;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["UNKNOWN_UPGRADE_POLICY"] = 5] = "UNKNOWN_UPGRADE_POLICY";
	/**
	* Package ID does not match `PackageId` in upgrade ticket.
	*
	* @generated from protobuf enum value: PACKAGE_ID_DOES_NOT_MATCH = 6;
	*/
	PackageUpgradeError_PackageUpgradeErrorKind$1[PackageUpgradeError_PackageUpgradeErrorKind$1["PACKAGE_ID_DOES_NOT_MATCH"] = 6] = "PACKAGE_ID_DOES_NOT_MATCH";
	return PackageUpgradeError_PackageUpgradeErrorKind$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.TypeArgumentError.TypeArgumentErrorKind
*/
let TypeArgumentError_TypeArgumentErrorKind = /* @__PURE__ */ function(TypeArgumentError_TypeArgumentErrorKind$1) {
	/**
	* @generated from protobuf enum value: TYPE_ARGUMENT_ERROR_KIND_UNKNOWN = 0;
	*/
	TypeArgumentError_TypeArgumentErrorKind$1[TypeArgumentError_TypeArgumentErrorKind$1["TYPE_ARGUMENT_ERROR_KIND_UNKNOWN"] = 0] = "TYPE_ARGUMENT_ERROR_KIND_UNKNOWN";
	/**
	* A type was not found in the module specified.
	*
	* @generated from protobuf enum value: TYPE_NOT_FOUND = 1;
	*/
	TypeArgumentError_TypeArgumentErrorKind$1[TypeArgumentError_TypeArgumentErrorKind$1["TYPE_NOT_FOUND"] = 1] = "TYPE_NOT_FOUND";
	/**
	* A type provided did not match the specified constraint.
	*
	* @generated from protobuf enum value: CONSTRAINT_NOT_SATISFIED = 2;
	*/
	TypeArgumentError_TypeArgumentErrorKind$1[TypeArgumentError_TypeArgumentErrorKind$1["CONSTRAINT_NOT_SATISFIED"] = 2] = "CONSTRAINT_NOT_SATISFIED";
	return TypeArgumentError_TypeArgumentErrorKind$1;
}({});
var ExecutionStatus$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecutionStatus", [{
			no: 1,
			name: "success",
			kind: "scalar",
			opt: true,
			T: 8
		}, {
			no: 2,
			name: "error",
			kind: "message",
			T: () => ExecutionError
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecutionStatus
*/
const ExecutionStatus = new ExecutionStatus$Type();
var ExecutionError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ExecutionError", [
			{
				no: 1,
				name: "description",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "command",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.ExecutionError.ExecutionErrorKind", ExecutionError_ExecutionErrorKind]
			},
			{
				no: 4,
				name: "abort",
				kind: "message",
				oneof: "errorDetails",
				T: () => MoveAbort
			},
			{
				no: 5,
				name: "size_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => SizeError
			},
			{
				no: 6,
				name: "command_argument_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => CommandArgumentError
			},
			{
				no: 7,
				name: "type_argument_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => TypeArgumentError
			},
			{
				no: 8,
				name: "package_upgrade_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => PackageUpgradeError
			},
			{
				no: 9,
				name: "index_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => IndexError
			},
			{
				no: 10,
				name: "object_id",
				kind: "scalar",
				oneof: "errorDetails",
				T: 9
			},
			{
				no: 11,
				name: "coin_deny_list_error",
				kind: "message",
				oneof: "errorDetails",
				T: () => CoinDenyListError
			},
			{
				no: 12,
				name: "congested_objects",
				kind: "message",
				oneof: "errorDetails",
				T: () => CongestedObjects
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ExecutionError
*/
const ExecutionError = new ExecutionError$Type();
var MoveAbort$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MoveAbort", [
			{
				no: 1,
				name: "abort_code",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "location",
				kind: "message",
				T: () => MoveLocation
			},
			{
				no: 3,
				name: "clever_error",
				kind: "message",
				T: () => CleverError
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MoveAbort
*/
const MoveAbort = new MoveAbort$Type();
var MoveLocation$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.MoveLocation", [
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
				T: 13
			},
			{
				no: 4,
				name: "instruction",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 5,
				name: "function_name",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.MoveLocation
*/
const MoveLocation = new MoveLocation$Type();
var CleverError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CleverError", [
			{
				no: 1,
				name: "error_code",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 2,
				name: "line_number",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "constant_name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "constant_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "rendered",
				kind: "scalar",
				oneof: "value",
				T: 9
			},
			{
				no: 6,
				name: "raw",
				kind: "scalar",
				oneof: "value",
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CleverError
*/
const CleverError = new CleverError$Type();
var SizeError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.SizeError", [{
			no: 1,
			name: "size",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}, {
			no: 2,
			name: "max_size",
			kind: "scalar",
			opt: true,
			T: 4,
			L: 0
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.SizeError
*/
const SizeError = new SizeError$Type();
var IndexError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.IndexError", [{
			no: 1,
			name: "index",
			kind: "scalar",
			opt: true,
			T: 13
		}, {
			no: 2,
			name: "subresult",
			kind: "scalar",
			opt: true,
			T: 13
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.IndexError
*/
const IndexError = new IndexError$Type();
var CoinDenyListError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CoinDenyListError", [{
			no: 1,
			name: "address",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "coin_type",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CoinDenyListError
*/
const CoinDenyListError = new CoinDenyListError$Type();
var CongestedObjects$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CongestedObjects", [{
			no: 1,
			name: "objects",
			kind: "scalar",
			repeat: 2,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CongestedObjects
*/
const CongestedObjects = new CongestedObjects$Type();
var CommandArgumentError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CommandArgumentError", [
			{
				no: 1,
				name: "argument",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 2,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.CommandArgumentError.CommandArgumentErrorKind", CommandArgumentError_CommandArgumentErrorKind]
			},
			{
				no: 3,
				name: "index_error",
				kind: "message",
				T: () => IndexError
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CommandArgumentError
*/
const CommandArgumentError = new CommandArgumentError$Type();
var PackageUpgradeError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.PackageUpgradeError", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.PackageUpgradeError.PackageUpgradeErrorKind", PackageUpgradeError_PackageUpgradeErrorKind]
			},
			{
				no: 2,
				name: "package_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "digest",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "policy",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 5,
				name: "ticket_id",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.PackageUpgradeError
*/
const PackageUpgradeError = new PackageUpgradeError$Type();
var TypeArgumentError$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.TypeArgumentError", [{
			no: 1,
			name: "type_argument",
			kind: "scalar",
			opt: true,
			T: 13
		}, {
			no: 2,
			name: "kind",
			kind: "enum",
			opt: true,
			T: () => ["sui.rpc.v2.TypeArgumentError.TypeArgumentErrorKind", TypeArgumentError_TypeArgumentErrorKind]
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.TypeArgumentError
*/
const TypeArgumentError = new TypeArgumentError$Type();

//#endregion
export { CleverError, CoinDenyListError, CommandArgumentError, CommandArgumentError_CommandArgumentErrorKind, CongestedObjects, ExecutionError, ExecutionError_ExecutionErrorKind, ExecutionStatus, IndexError, MoveAbort, MoveLocation, PackageUpgradeError, PackageUpgradeError_PackageUpgradeErrorKind, SizeError, TypeArgumentError, TypeArgumentError_TypeArgumentErrorKind };
//# sourceMappingURL=execution_status.mjs.map