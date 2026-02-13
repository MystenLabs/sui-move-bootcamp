'use server';

import serverConfig from '@/lib/env-config-server';
import { getMoveTarget } from '@/lib/helpers-onchain';
import { EnokiClient, type EnokiNetwork } from '@mysten/enoki';
import { toBase64 } from '@mysten/sui/utils';

/**
 * Creates a sponsored transaction via Enoki
 * @param txBytes - Transaction bytes built with `onlyTransactionKind: true`
 * @param sender - The sender's wallet address
 * @returns Sponsored transaction with bytes and digest
 */
export const getSponsoredTx = async ({
  txBytes,
  sender,
}: {
  txBytes: Uint8Array;
  sender: string;
}) => {
  const enokiClient = new EnokiClient({
    apiKey: serverConfig.ENOKI_PRIVATE_KEY,
  });

  const sponsoredTransaction = await enokiClient.createSponsoredTransaction({
    network: process.env.NEXT_PUBLIC_SUI_NETWORK_NAME as EnokiNetwork,
    transactionKindBytes: toBase64(txBytes),
    sender: sender,
    allowedAddresses: [sender],
    allowedMoveCallTargets: [
      getMoveTarget('counter', 'increment'),
      getMoveTarget('counter', 'decrement'),
    ],
  });

  return sponsoredTransaction;
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
