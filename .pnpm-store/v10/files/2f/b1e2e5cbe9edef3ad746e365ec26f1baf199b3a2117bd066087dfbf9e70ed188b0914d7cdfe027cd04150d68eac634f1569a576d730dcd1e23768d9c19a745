import { Argument } from "./data/internal.mjs";
import { createPure } from "./pure.mjs";
import { Transaction, TransactionObjectArgument, TransactionObjectInput, TransactionResult } from "./Transaction.mjs";

//#region src/transactions/Arguments.d.ts
declare const Arguments: {
  pure: ReturnType<typeof createPure<(tx: Transaction) => Argument>>;
  object: {
    (value: TransactionObjectInput): TransactionObjectArgument;
    system(options?: {
      mutable?: boolean;
    } | undefined): TransactionObjectArgument;
    clock(): TransactionObjectArgument;
    random(): TransactionObjectArgument;
    denyList(options?: {
      mutable?: boolean;
    } | undefined): TransactionObjectArgument;
    option({
      type,
      value
    }: {
      type: string;
      value: TransactionObjectInput | null;
    }): (tx: Transaction) => TransactionResult;
  };
  sharedObjectRef: (args_0: {
    objectId: string;
    mutable: boolean;
    initialSharedVersion: number | string;
  }) => (tx: Transaction) => {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
  objectRef: (args_0: {
    objectId: string;
    version: string | number;
    digest: string;
  }) => (tx: Transaction) => {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
  receivingRef: (args_0: {
    objectId: string;
    version: string | number;
    digest: string;
  }) => (tx: Transaction) => {
    $kind: "Input";
    Input: number;
    type?: "object";
  };
};
//#endregion
export { Arguments };
//# sourceMappingURL=Arguments.d.mts.map