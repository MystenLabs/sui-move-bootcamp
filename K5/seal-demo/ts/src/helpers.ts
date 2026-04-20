import { Transaction } from "@mysten/sui/transactions";
import { fromHex, toHex } from "@mysten/sui/utils";
import { bcs } from "@mysten/sui/bcs";
import type { ClientWithCoreApi } from "@mysten/sui/client";

/** Private pattern: identity = BCS-encoded owner address. */
export function buildPrivateIdentity(address: string): string {
  return toHex(bcs.Address.serialize(address).toBytes());
}

/** Time-lock pattern: identity = BCS-encoded u64 unlock timestamp (ms). */
export function buildTimelockIdentity(unlockMs: number): string {
  return toHex(bcs.u64().serialize(unlockMs).toBytes());
}

/** Parse back the unlock timestamp from a time-lock identity. */
export function parseTimelockIdentity(id: string): number {
  return Number(bcs.u64().parse(fromHex(id)));
}

/** Allowlist pattern: identity = allowlist ID (32 bytes) ++ random nonce. */
export function buildAllowlistIdentity(allowlistId: string, nonceLen = 5): string {
  const nonce = crypto.getRandomValues(new Uint8Array(nonceLen));
  const alBytes = fromHex(allowlistId);
  return toHex(new Uint8Array([...alBytes, ...nonce]));
}

/** Recover the allowlist object ID from an allowlist identity (first 32 bytes). */
export function parseAllowlistIdentity(id: string): string {
  return "0x" + toHex(fromHex(id).slice(0, 32));
}

async function buildTxKindBytes(
  tx: Transaction,
  client: ClientWithCoreApi,
): Promise<Uint8Array> {
  return await tx.build({ client, onlyTransactionKind: true });
}

/** PTB bytes for private_seal::seal_approve(id). */
export async function buildPrivateApprovePtb(
  client: ClientWithCoreApi,
  packageId: string,
  id: string,
): Promise<Uint8Array> {
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageId}::private_seal::seal_approve`,
    arguments: [tx.pure.vector("u8", fromHex(id))],
  });
  return buildTxKindBytes(tx, client);
}

/** PTB bytes for timelock_seal::seal_approve(id, clock). */
export async function buildTimelockApprovePtb(
  client: ClientWithCoreApi,
  packageId: string,
  id: string,
): Promise<Uint8Array> {
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageId}::timelock_seal::seal_approve`,
    arguments: [tx.pure.vector("u8", fromHex(id)), tx.object.clock()],
  });
  return buildTxKindBytes(tx, client);
}

/** PTB bytes for allowlist_seal::seal_approve(id, allowlist). */
export async function buildAllowlistApprovePtb(
  client: ClientWithCoreApi,
  packageId: string,
  id: string,
  allowlistId: string,
): Promise<Uint8Array> {
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageId}::allowlist_seal::seal_approve`,
    arguments: [tx.pure.vector("u8", fromHex(id)), tx.object(allowlistId)],
  });
  return buildTxKindBytes(tx, client);
}
