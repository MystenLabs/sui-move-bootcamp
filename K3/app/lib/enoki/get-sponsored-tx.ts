'use server';

import serverConfig from '@/lib/env-config-server';
import { EnokiClient } from '@mysten/enoki';

/**
 * Creates a sponsored transaction via Enoki
 * @param txBytes - Transaction bytes built with `onlyTransactionKind: true`
 * @param sender - The sender's wallet address
 * @returns Sponsored transaction with bytes and digest
 */
export const getSponsoredTx = async ({
  txBytes: _txBytes,
  sender: _sender,
}: {
  txBytes: Uint8Array;
  sender: string;
}) => {
  // TODO (TS Milestone C):
  // 1) Create Enoki client using private key
  // 2) Request sponsored tx with toBase64(txBytes)
  // 3) Restrict allowed addresses and Move call targets
  // Hint: import helpers you need (toBase64, getMoveTarget, EnokiNetwork) when implementing.
  throw new Error('TODO: implement getSponsoredTx');
};

/**
 * Executes a sponsored transaction after user signs
 * @param digest - The sponsored transaction digest
 * @param signature - User's signature
 * @returns The result of the executed transaction
 */
export const executeSponsoredTx = async ({
  digest,
  signature,
}: {
  digest: string;
  signature: string;
}) => {
  const enokiClient = new EnokiClient({
    apiKey: serverConfig.ENOKI_PRIVATE_KEY,
  });

  const result = await enokiClient.executeSponsoredTransaction({
    digest,
    signature,
  });

  return result;
};
