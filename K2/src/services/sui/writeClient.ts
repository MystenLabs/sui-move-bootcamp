import { fromBase64 } from "@mysten/utils";
import { Transaction } from "@mysten/sui/transactions";
import { suiGrpcClient } from "./grpcClient";

const SUI_COIN_TYPE = "0x2::sui::SUI";
const DEFAULT_GAS_BUDGET = 5_000_000;

type TransactionSigner = {
  signTransaction(bytes: Uint8Array): Promise<{
    bytes: string;
    signature: string;
  }>;
};

export const suiWriteClient = {
  async buildAndSignTransfer(
    sender: string,
    recipientAddress: string,
    amountMist: number,
    signer: TransactionSigner
  ) {
    const [coinsResponse, gasPriceResponse] = await Promise.all([
      suiGrpcClient.core.getCoins({
        address: sender,
        coinType: SUI_COIN_TYPE,
      }),
      suiGrpcClient.core.getReferenceGasPrice?.(),
    ]);

    const gasCoin = coinsResponse.objects
      .slice()
      .sort((a, b) => Number(b.balance) - Number(a.balance))[0];

    if (!gasCoin) {
      throw new Error("No SUI gas coin available for transaction.");
    }

    const tx = new Transaction();
    tx.setSender(sender);
    tx.setGasOwner(sender);
    tx.setGasBudget(DEFAULT_GAS_BUDGET);
    tx.setGasPrice(Number(gasPriceResponse?.referenceGasPrice ?? "1000"));
    tx.setGasPayment([
      {
        objectId: gasCoin.id,
        version: gasCoin.version,
        digest: gasCoin.digest,
      },
    ]);

    const [coin] = tx.splitCoins(tx.gas, [amountMist]);
    tx.transferObjects([coin], recipientAddress);

    const txBytes = await tx.build();
    return signer.signTransaction(txBytes);
  },

  async executeZkLoginTransaction(transactionBytes: string, signature: string) {
    const response =
      await suiGrpcClient.transactionExecutionService.executeTransaction({
        transaction: {
          bcs: {
            value: fromBase64(transactionBytes),
          },
        },
        signatures: [
          {
            bcs: {
              value: fromBase64(signature),
            },
            signature: {
              oneofKind: undefined,
            },
          },
        ],
      });

    return response.response;
  },
};
