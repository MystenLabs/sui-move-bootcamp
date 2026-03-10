import { fromBase64, toBase64 } from '@mysten/sui/utils';
import type { SuiNetworkName } from '@/lib/sui-grpc-client';
import { createSuiGrpcClient } from '@/lib/sui-grpc-client';

/**
 * Creates an execute function that submits the transaction via Sui gRPC (F1-style).
 * Use this with dAppKit.signAndExecuteTransaction({ execute }) so writes go over
 * gRPC while build/toJSON still use the client from the active dApp Kit network.
 *
 * @param network - Current Sui network (mainnet | testnet | devnet)
 * @returns Execute function compatible with dAppKit.signAndExecuteTransaction
 */
export function createGrpcExecuteForNetwork(network: SuiNetworkName) {
  return async ({
    bytes,
    signature,
  }: {
    bytes: string;
    signature: string;
  }): Promise<{
    digest: string;
    rawEffects?: number[];
    effects?: { bcs?: string };
  }> => {
    const grpcClient = createSuiGrpcClient(network);

    const txBytes = typeof bytes === 'string' ? fromBase64(bytes) : bytes;

    const result = await grpcClient.core.executeTransaction({
      transaction: txBytes,
      signatures: [signature],
      include: {
        effects: true,
      },
    });

    const txResult =
      result.$kind === 'Transaction' ? result.Transaction : result.FailedTransaction;

    const rawEffects = txResult.effects?.bcs
      ? Array.from(txResult.effects.bcs)
      : undefined;

    return {
      digest: txResult.digest,
      rawEffects,
      effects: rawEffects
        ? { bcs: toBase64(new Uint8Array(rawEffects)) }
        : undefined,
    };
  };
}
