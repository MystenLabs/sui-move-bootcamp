import { incrementTransaction } from '@/lib/counter/counter-transactions';
import clientConfig from '@/lib/env-config-client';
import { TransactionError } from '@/lib/errors';
import { useCurrentClient, useCurrentAccount } from '@mysten/dapp-kit-react';
import { useMutation } from '@tanstack/react-query';

export interface IncrementParams {
  note: string;
}

/**
 * Hook for incrementing the counter with Enoki-sponsored transactions
 *
 * Works with both traditional wallets AND zkLogin wallets seamlessly.
 * When zkLogin is registered via registerEnokiWallets(), it appears as
 * a standard wallet in dapp-kit, so the same hooks work for both.
 */
export const useIncrement = () => {
  const client = useCurrentClient();
  const sender = useCurrentAccount();

  return useMutation({
    mutationFn: async (params: IncrementParams) => {
      const { note } = params;

      // TS Milestone A (already scaffolded): validate sender is connected.
      if (!sender) {
        throw new TransactionError('Wallet not connected', 'wallet');
      }

      // TS Milestone B: Build increment transaction bytes.
      let txBytes: Uint8Array;
      try {
        const transaction = incrementTransaction(
          clientConfig.NEXT_PUBLIC_COUNTER_OBJECT_ID,
          note,
          clientConfig.NEXT_PUBLIC_PACKAGE_ADDRESS,
        );

        txBytes = await transaction.build({
          client,
          onlyTransactionKind: true,
        });
      } catch (error) {
        throw new TransactionError(
          'Failed to build transaction',
          'build',
          error,
        );
      }

      // TODO (TS Milestones C + D):
      // 1) Request sponsorship from server with getSponsoredTx(...)
      // 2) Sign sponsored bytes with dAppKit.signTransaction(...)
      // 3) Execute with executeSponsoredTx(...)
      // 4) Wait for confirmation and return { digest, result }
      throw new TransactionError(
        `TODO: complete sponsored increment flow for ${txBytes.length} built bytes`,
        'sponsor',
      );
    },
  });
};
