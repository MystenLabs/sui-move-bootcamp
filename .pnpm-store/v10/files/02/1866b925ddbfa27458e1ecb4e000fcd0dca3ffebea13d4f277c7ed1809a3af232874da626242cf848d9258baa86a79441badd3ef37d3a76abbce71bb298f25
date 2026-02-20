import { SuiClientTypes } from "../client/types.mjs";
import { Argument, ArgumentSchema, CallArg, Command, ObjectRef, TransactionExpiration } from "./data/internal.mjs";
import { TransactionArgument } from "./Commands.mjs";
import { Inputs } from "./Inputs.mjs";
import { BuildTransactionOptions, SerializeTransactionOptions, TransactionPlugin } from "./resolve.mjs";
import { createObjectMethods } from "./object.mjs";
import { createPure } from "./pure.mjs";
import { SignatureWithBytes, Signer } from "../cryptography/keypair.mjs";
import "../cryptography/index.mjs";
import { ClientWithCoreApi } from "../client/core.mjs";
import * as _mysten_bcs1124 from "@mysten/bcs";
import { SerializedBcs } from "@mysten/bcs";
import { InferInput } from "valibot";

//#region src/transactions/Transaction.d.ts
type TransactionObjectArgument = Exclude<InferInput<typeof ArgumentSchema>, {
  Input: unknown;
  type?: 'pure';
}> | ((tx: Transaction) => Exclude<InferInput<typeof ArgumentSchema>, {
  Input: unknown;
  type?: 'pure';
}>) | AsyncTransactionThunk<TransactionResultArgument>;
type TransactionResult = Extract<Argument, {
  Result: unknown;
}> & Extract<Argument, {
  NestedResult: unknown;
}>[];
type TransactionResultArgument = Extract<Argument, {
  Result: unknown;
}> | readonly Extract<Argument, {
  NestedResult: unknown;
}>[];
type AsyncTransactionThunk<T extends TransactionResultArgument | void = TransactionResultArgument | void> = (tx: Transaction) => Promise<T | void>;
declare const TRANSACTION_BRAND: never;
interface SignOptions extends BuildTransactionOptions {
  signer: Signer;
}
declare function isTransaction(obj: unknown): obj is TransactionLike;
type TransactionObjectInput = string | CallArg | TransactionObjectArgument;
type TransactionLike = {
  getData(): unknown;
};
/**
 * Transaction Builder
 */
declare class Transaction {
  #private;
  [TRANSACTION_BRAND]: boolean;
  /**
   * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
   * Supports either a byte array, or base64-encoded bytes.
   */
  static fromKind(serialized: string | Uint8Array): Transaction;
  /**
   * Converts from a serialized transaction format to a `Transaction` class.
   * There are two supported serialized formats:
   * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
   * - A byte array (or base64-encoded bytes) containing BCS transaction data.
   */
  static from(transaction: string | Uint8Array | TransactionLike): Transaction;
  addSerializationPlugin(step: TransactionPlugin): void;
  addBuildPlugin(step: TransactionPlugin): void;
  addIntentResolver(intent: string, resolver: TransactionPlugin): void;
  setSender(sender: string): void;
  /**
   * Sets the sender only if it has not already been set.
   * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
   */
  setSenderIfNotSet(sender: string): void;
  setExpiration(expiration?: InferInput<typeof TransactionExpiration> | null): void;
  setGasPrice(price: number | bigint | string): void;
  setGasBudget(budget: number | bigint | string): void;
  setGasBudgetIfNotSet(budget: number | bigint | string): void;
  setGasOwner(owner: string): void;
  setGasPayment(payments: ObjectRef[]): void;
  /** Get a snapshot of the transaction data, in JSON form: */
  getData(): {
    version: 2;
    sender?: string | null | undefined;
    expiration?: _mysten_bcs1124.EnumOutputShapeWithKeys<{
      None: true;
      Epoch: string | number;
      ValidDuring: {
        minEpoch: string | number | null;
        maxEpoch: string | number | null;
        minTimestamp: string | number | null;
        maxTimestamp: string | number | null;
        chain: string;
        nonce: number;
      };
    }, "None" | "Epoch" | "ValidDuring"> | null | undefined;
    gasData: {
      budget: string | number | null;
      price: string | number | null;
      owner: string | null;
      payment: {
        objectId: string;
        version: string | number;
        digest: string;
      }[] | null;
    };
    inputs: _mysten_bcs1124.EnumOutputShapeWithKeys<{
      Object: _mysten_bcs1124.EnumOutputShapeWithKeys<{
        ImmOrOwnedObject: {
          objectId: string;
          version: string | number;
          digest: string;
        };
        SharedObject: {
          objectId: string;
          initialSharedVersion: string | number;
          mutable: boolean;
        };
        Receiving: {
          objectId: string;
          version: string | number;
          digest: string;
        };
      }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
      Pure: {
        bytes: string;
      };
      UnresolvedPure: {
        value: unknown;
      };
      UnresolvedObject: {
        objectId: string;
        version?: string | number | null | undefined;
        digest?: string | null | undefined;
        initialSharedVersion?: string | number | null | undefined;
        mutable?: boolean | null | undefined;
      };
      FundsWithdrawal: {
        reservation: {
          MaxAmountU64: string | number;
          $kind: "MaxAmountU64";
        };
        typeArg: {
          Balance: string;
          $kind: "Balance";
        };
        withdrawFrom: _mysten_bcs1124.EnumOutputShapeWithKeys<{
          Sender: true;
          Sponsor: true;
        }, "Sender" | "Sponsor">;
      };
    }, "Pure" | "Object" | "FundsWithdrawal" | "UnresolvedPure" | "UnresolvedObject">[];
    commands: _mysten_bcs1124.EnumOutputShapeWithKeys<{
      MoveCall: {
        package: string;
        module: string;
        function: string;
        typeArguments: string[];
        arguments: ({
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        })[];
        _argumentTypes?: {
          reference: "mutable" | "unknown" | "immutable" | null;
          body: SuiClientTypes.OpenSignatureBody;
        }[] | null | undefined;
      };
      TransferObjects: {
        objects: ({
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        })[];
        address: {
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        };
      };
      SplitCoins: {
        coin: {
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        };
        amounts: ({
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        })[];
      };
      MergeCoins: {
        destination: {
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        };
        sources: ({
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        })[];
      };
      Publish: {
        modules: string[];
        dependencies: string[];
      };
      MakeMoveVec: {
        type: string | null;
        elements: ({
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        })[];
      };
      Upgrade: {
        modules: string[];
        dependencies: string[];
        package: string;
        ticket: {
          GasCoin: true;
          $kind: "GasCoin";
        } | {
          Input: number;
          type?: "object" | "pure" | "withdrawal" | undefined;
          $kind: "Input";
        } | {
          Result: number;
          $kind: "Result";
        } | {
          NestedResult: [number, number];
          $kind: "NestedResult";
        };
      };
      $Intent: {
        name: string;
        inputs: {
          [x: string]: {
            GasCoin: true;
            $kind: "GasCoin";
          } | {
            Input: number;
            type?: "object" | "pure" | "withdrawal" | undefined;
            $kind: "Input";
          } | {
            Result: number;
            $kind: "Result";
          } | {
            NestedResult: [number, number];
            $kind: "NestedResult";
          } | ({
            GasCoin: true;
            $kind: "GasCoin";
          } | {
            Input: number;
            type?: "object" | "pure" | "withdrawal" | undefined;
            $kind: "Input";
          } | {
            Result: number;
            $kind: "Result";
          } | {
            NestedResult: [number, number];
            $kind: "NestedResult";
          })[];
        };
        data: {
          [x: string]: unknown;
        };
      };
    }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade" | "$Intent">[];
  };
  get pure(): ReturnType<typeof createPure<Argument>>;
  constructor();
  /** Returns an argument for the gas coin, to be used in a transaction. */
  get gas(): {
    $kind: "GasCoin";
    GasCoin: true;
  };
  /**
   * Add a new object input to the transaction.
   */
  object: ReturnType<typeof createObjectMethods<{
    $kind: 'Input';
    Input: number;
    type?: 'object';
  }>>;
  /**
   * Add a new object input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  objectRef(...args: Parameters<(typeof Inputs)['ObjectRef']>): {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
  /**
   * Add a new receiving input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  receivingRef(...args: Parameters<(typeof Inputs)['ReceivingRef']>): {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
  /**
   * Add a new shared object input to the transaction using the fully-resolved shared object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  sharedObjectRef(...args: Parameters<(typeof Inputs)['SharedObjectRef']>): {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
  /** Add a transaction to the transaction */
  add<T extends Command>(command: T): TransactionResult;
  add<T extends void | TransactionResultArgument | TransactionArgument | Command>(thunk: (tx: Transaction) => T): T;
  add<T extends TransactionResultArgument | void>(asyncTransactionThunk: AsyncTransactionThunk<T>): T;
  splitCoins<const Amounts extends (TransactionArgument | SerializedBcs<any> | number | string | bigint)[]>(coin: TransactionObjectArgument | string, amounts: Amounts): Extract<Argument, {
    Result: unknown;
  }> & { [K in keyof Amounts]: Extract<Argument, {
    NestedResult: unknown;
  }> };
  mergeCoins(destination: TransactionObjectArgument | string, sources: (TransactionObjectArgument | string)[]): TransactionResult;
  publish({
    modules,
    dependencies
  }: {
    modules: number[][] | string[];
    dependencies: string[];
  }): TransactionResult;
  upgrade({
    modules,
    dependencies,
    package: packageId,
    ticket
  }: {
    modules: number[][] | string[];
    dependencies: string[];
    package: string;
    ticket: TransactionObjectArgument | string;
  }): TransactionResult;
  moveCall({
    arguments: args,
    ...input
  }: {
    package: string;
    module: string;
    function: string;
    arguments?: (TransactionArgument | SerializedBcs<any>)[];
    typeArguments?: string[];
  } | {
    target: string;
    arguments?: (TransactionArgument | SerializedBcs<any>)[];
    typeArguments?: string[];
  }): TransactionResult;
  transferObjects(objects: (TransactionObjectArgument | string)[], address: TransactionArgument | SerializedBcs<any> | string): TransactionResult;
  makeMoveVec({
    type,
    elements
  }: {
    elements: (TransactionObjectArgument | string)[];
    type?: string;
  }): TransactionResult;
  /**
   * Create a FundsWithdrawal input for withdrawing Balance<T> from an address balance accumulator.
   * This is used for gas payments from address balances.
   *
   * @param options.amount - The Amount to withdraw (u64).
   * @param options.type - The balance type (e.g., "0x2::sui::SUI"). Defaults to SUI.
   */
  withdrawal({
    amount,
    type
  }: {
    amount: number | bigint | string;
    type?: string | null;
  }): {
    $kind: 'Input';
    Input: number;
    type?: 'object';
  };
  /**
   * @deprecated Use toJSON instead.
   * For synchronous serialization, you can use `getData()`
   * */
  serialize(): string;
  toJSON(options?: SerializeTransactionOptions): Promise<string>;
  /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
  sign(options: SignOptions): Promise<SignatureWithBytes>;
  /**
   * Checks if the transaction is prepared for serialization to JSON.
   * This means:
   *  - All async thunks have been fully resolved
   *  - All transaction intents have been resolved (unless in supportedIntents)
   *
   * Unlike `isFullyResolved()`, this does not require the sender, gas payment,
   * budget, or object versions to be set.
   */
  isPreparedForSerialization(options?: {
    supportedIntents?: string[];
  }): boolean;
  /**
   *  Ensures that:
   *  - All objects have been fully resolved to a specific version
   *  - All pure inputs have been serialized to bytes
   *  - All async thunks have been fully resolved
   *  - All transaction intents have been resolved
   * 	- The gas payment, budget, and price have been set
   *  - The transaction sender has been set
   *
   *  When true, the transaction will always be built to the same bytes and digest (unless the transaction is mutated)
   */
  isFullyResolved(): boolean;
  /** Build the transaction to BCS bytes. */
  build(options?: BuildTransactionOptions): Promise<Uint8Array<ArrayBuffer>>;
  /** Derive transaction digest */
  getDigest(options?: {
    client?: ClientWithCoreApi;
  }): Promise<string>;
  prepareForSerialization(options: SerializeTransactionOptions): Promise<void>;
}
//#endregion
export { AsyncTransactionThunk, Transaction, TransactionObjectArgument, TransactionObjectInput, TransactionResult, isTransaction };
//# sourceMappingURL=Transaction.d.mts.map