import { Transaction, TransactionObjectInput, TransactionResult } from "./Transaction.mjs";

//#region src/transactions/object.d.ts
declare function createObjectMethods<T>(makeObject: (value: TransactionObjectInput) => T): {
  (value: TransactionObjectInput): T;
  system(options?: {
    mutable?: boolean;
  }): T;
  clock(): T;
  random(): T;
  denyList(options?: {
    mutable?: boolean;
  }): T;
  option({
    type,
    value
  }: {
    type: string;
    value: TransactionObjectInput | null;
  }): (tx: Transaction) => TransactionResult;
};
//#endregion
export { createObjectMethods };
//# sourceMappingURL=object.d.mts.map