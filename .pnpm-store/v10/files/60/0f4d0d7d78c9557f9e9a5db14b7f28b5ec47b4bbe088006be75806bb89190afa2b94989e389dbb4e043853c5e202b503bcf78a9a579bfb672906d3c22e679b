import { CallArg, ObjectRef, Reservation, WithdrawFrom, WithdrawalTypeArg } from "./data/internal.mjs";
import { SerializedBcs } from "@mysten/bcs";

//#region src/transactions/Inputs.d.ts
declare function Pure(data: Uint8Array | SerializedBcs<any>): Extract<CallArg, {
  Pure: unknown;
}>;
declare const Inputs: {
  Pure: typeof Pure;
  ObjectRef({
    objectId,
    digest,
    version
  }: ObjectRef): Extract<CallArg, {
    Object: unknown;
  }>;
  SharedObjectRef({
    objectId,
    mutable,
    initialSharedVersion
  }: {
    objectId: string;
    mutable: boolean;
    initialSharedVersion: number | string;
  }): Extract<CallArg, {
    Object: unknown;
  }>;
  ReceivingRef({
    objectId,
    digest,
    version
  }: ObjectRef): Extract<CallArg, {
    Object: unknown;
  }>;
  FundsWithdrawal({
    reservation,
    typeArg,
    withdrawFrom
  }: {
    reservation: Reservation;
    typeArg: WithdrawalTypeArg;
    withdrawFrom: WithdrawFrom;
  }): Extract<CallArg, {
    FundsWithdrawal: unknown;
  }>;
};
//#endregion
export { Inputs };
//# sourceMappingURL=Inputs.d.mts.map