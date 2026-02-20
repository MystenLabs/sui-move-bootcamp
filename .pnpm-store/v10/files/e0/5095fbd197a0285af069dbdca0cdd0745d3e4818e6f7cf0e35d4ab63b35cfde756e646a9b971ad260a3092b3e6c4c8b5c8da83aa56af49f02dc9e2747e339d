import { Argument, CallArg, Command, GasData, TransactionData, TransactionExpiration } from "./data/internal.mjs";
import { SerializedTransactionDataV1 } from "./data/v1.mjs";
import { SerializedTransactionDataV2Schema } from "./data/v2.mjs";
import { TransactionResult } from "./Transaction.mjs";
import { InferInput } from "valibot";

//#region src/transactions/TransactionData.d.ts
declare class TransactionDataBuilder implements TransactionData {
  static fromKindBytes(bytes: Uint8Array): TransactionDataBuilder;
  static fromBytes(bytes: Uint8Array): TransactionDataBuilder;
  static restore(data: InferInput<typeof SerializedTransactionDataV2Schema> | InferInput<typeof SerializedTransactionDataV1>): TransactionDataBuilder;
  /**
   * Generate transaction digest.
   *
   * @param bytes BCS serialized transaction data
   * @returns transaction digest.
   */
  static getDigestFromBytes(bytes: Uint8Array): string;
  version: 2;
  sender: string | null;
  expiration: TransactionExpiration | null;
  gasData: GasData;
  inputs: CallArg[];
  commands: Command[];
  constructor(clone?: TransactionData);
  build({
    maxSizeBytes,
    overrides,
    onlyTransactionKind
  }?: {
    maxSizeBytes?: number;
    overrides?: {
      expiration?: TransactionExpiration;
      sender?: string;
      gasData?: Partial<GasData>;
    };
    onlyTransactionKind?: boolean;
  }): Uint8Array<ArrayBuffer>;
  addInput<T extends 'object' | 'pure' | 'withdrawal'>(type: T, arg: CallArg): {
    Input: number;
    type: T;
    $kind: "Input";
  };
  getInputUses(index: number, fn: (arg: Argument, command: Command) => void): void;
  mapCommandArguments(index: number, fn: (arg: Argument, command: Command, commandIndex: number) => Argument): void;
  mapArguments(fn: (arg: Argument, command: Command, commandIndex: number) => Argument): void;
  replaceCommand(index: number, replacement: Command | Command[], resultIndex?: number | {
    Result: number;
  } | {
    NestedResult: [number, number];
  }): void;
  replaceCommandWithTransaction(index: number, otherTransaction: TransactionData, result: TransactionResult): void;
  insertTransaction(atCommandIndex: number, otherTransaction: TransactionData): void;
  getDigest(): string;
  snapshot(): TransactionData;
  shallowClone(): TransactionDataBuilder;
  applyResolvedData(resolved: TransactionData): void;
}
//#endregion
export { TransactionDataBuilder };
//# sourceMappingURL=TransactionData.d.mts.map