//#region src/types.d.ts
/** Contains data related to the gas payment for a Transaction */
interface GasData {
  /** The budget set for this transaction */
  budget: string | number | null;
  /** The gas price used for this transaction */
  price: string | number | null;
  /** The owner of the gas coins used to fund the transactions, this is either the sender or the gas sponsor */
  owner: string | null;
  /** The list of SUI coins to fund the transaction */
  payment: {
    objectId: string;
    version: string;
    digest: string;
  }[] | null;
}
/**
 * Represent the serialized state of a partially built Transaction
 * This format is designed to support transactions that have not been fully build
 * allowing most properties to be omitted or set to null.  It also supports
 * unresolved object references, unresolved pure values, and Transaction Intents.
 */
interface SerializedTransactionDataV2 {
  version: 2;
  /** The sender of the transaction */
  sender: string | null | undefined;
  /** The expiration of the transaction */
  expiration: {
    Epoch: number;
  } | {
    None: true;
  } | null | undefined;
  /** The gas data */
  gasData: GasData;
  /** The inputs to the transaction */
  inputs: CallArg[];
  /** The commands to execute */
  commands: Command[];
  /** Extra metadata for implementation specific use-cases */
  extensions?: {
    [key: string]: unknown;
  };
  /** The digest of the transaction, may be set when the transaction is fully resolved */
  digest: string | null | undefined;
}
/**
 * Represents an input to a Transaction, either as a fully resolved Object or Pure input
 * or as an unresolved partial reference which needs to be resolved before the transaction
 * can be serialized to bcs and executed.
 */
type CallArg = {
  Object: ObjectArg;
} | {
  Pure: PureArg;
} | {
  UnresolvedPure: UnresolvedPureArg;
} | {
  UnresolvedObject: UnresolvedObjectArg;
};
type ObjectArg = {
  ImmOrOwnedObject: {
    objectId: string;
    version: string | number;
    digest: string;
  };
} | {
  SharedObject: {
    objectId: string;
    initialSharedVersion: string;
    mutable: boolean;
  };
} | {
  Receiving: {
    objectId: string;
    version: string | number;
    digest: string;
  };
};
interface PureArg {
  bytes: string;
}
/**
 * Represents an un-serialized pure value.
 * The correct bcs schema will need to be determined before this value can be serialized to bcs */
interface UnresolvedPureArg {
  value: unknown;
}
/**
 * Represents an unresolved object reference.  This allows objects to be referenced by only their ID.
 * version and digest details may also be added to unresolved object references.
 * To fully resolve a reference, the correct ObjectArg type needs to be determined based on the type of object,
 * and how it used in the transaction (eg, is it used mutably if it's shared, and is it a receiving object if it's not shared)
 */
interface UnresolvedObjectArg {
  objectId: string;
  version?: string | null | undefined;
  digest?: string | null | undefined;
  initialSharedVersion?: string | null | undefined;
  mutable?: boolean | null | undefined;
}
type Argument = {
  GasCoin: true;
} | {
  Input: number;
} | {
  Result: number;
} | {
  NestedResult: [number, number];
};
type Command = {
  MoveCall: {
    package: string;
    module: string;
    function: string;
    typeArguments: string[];
    arguments: Argument[];
  };
} | {
  TransferObjects: {
    objects: Argument[];
    address: Argument;
  };
} | {
  SplitCoins: {
    coin: Argument;
    amounts: Argument[];
  };
} | {
  MergeCoins: {
    destination: Argument;
    sources: Argument[];
  };
} | {
  Publish: {
    modules: string[];
    dependencies: string[];
  };
} | {
  MakeMoveVec: {
    type: string | null;
    elements: Argument[];
  };
} | {
  Upgrade: {
    modules: string[];
    dependencies: string[];
    package: string;
    ticket: Argument;
  };
} | {
  $Intent: {
    name: string;
    inputs: {
      [key: string]: Argument | Argument[];
    };
    data: {
      [key: string]: unknown;
    };
  };
};
//#endregion
export { Argument, CallArg, Command, GasData, ObjectArg, PureArg, SerializedTransactionDataV2, UnresolvedObjectArg, UnresolvedPureArg };
//# sourceMappingURL=types.d.mts.map