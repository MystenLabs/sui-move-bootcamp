import axios from "axios";

import { Transaction } from "@mysten/sui/transactions";
import { formatAddress, fromBase64, toBase64 } from "@mysten/sui/utils";
import { SuiClient } from "@mysten/sui/client";
import { getAdminSigner } from "./getAdminSigner";
import dotenv from "dotenv";
import { logger } from "../logger";

dotenv.config();

const suiClient = new SuiClient({
  url: process.env.SUI_NETWORK!,
});
const MOCK_ERROR_RATE = 0.05;

/**
 * Signs, Sponsors, and Executes a transaction to mint a Hero NFT.
 * Returns the txDigest of the mint transaction if successful.
 * Throws the error if anything goes wrong.
 */
export const mintHero = async ({
  recipient,
}: {
  recipient: string;
}): Promise<string> => {
  if (Math.random() < MOCK_ERROR_RATE) {
    throw new Error("Mock error for testing");
  }

  // create and populate the tx with commands
  logger.debug(`Populating PTB for: ${formatAddress(recipient)}`);
  const tx = new Transaction();
  const hero = tx.moveCall({
    target: `${process.env.PACKAGE_ID}::hero::mint`,
    arguments: [
      // randomly throw errors to have real-world monitoring outputs
      tx.pure.string("Name"),
      tx.object(process.env.HEROES_REGISTRY_ID!),
    ],
  });
  tx.transferObjects([hero], recipient);

  // build the transaction bytes
  logger.debug(`Building PTB for: ${formatAddress(recipient)}`);
  const txBytes = await tx.build({
    client: suiClient,
    onlyTransactionKind: true,
  });

  // send the bytes to Enoki API for sponsorship
  logger.debug(`Creating sponsored tx for: ${formatAddress(recipient)}`);
  const { digest, bytes } = await axios
    .post<{
      data: { digest: string; bytes: string };
    }>(
      "https://api.enoki.mystenlabs.com/v1/transaction-blocks/sponsor",
      {
        network: process.env.SUI_NETWORK_NAME,
        transactionBlockKindBytes: toBase64(txBytes),
        sender: process.env.ADMIN_ADDRESS!,
        allowedAddresses: [recipient],
        allowedMoveCallTargets: [`${process.env.PACKAGE_ID}::hero::mint`],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ENOKI_SECRET_KEY}`,
        },
      }
    )
    .then((resp) => resp.data.data);

  // sign over the sponsored bytes
  logger.debug(`Signing sponsored tx for: ${formatAddress(recipient)}`);
  const signer = getAdminSigner();
  const { signature } = await signer.signTransaction(fromBase64(bytes));

  // send them to Enoki API for execution
  logger.debug(`Executing sponsored tx for: ${formatAddress(recipient)}`);
  const txDigest: string = await axios
    .post(
      `https://api.enoki.mystenlabs.com/v1/transaction-blocks/sponsor/${digest}`,
      {
        signature,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ENOKI_SECRET_KEY}`,
        },
      }
    )
    .then((resp) => resp.data.data.digest);

  logger.info(`Minted for ${formatAddress(recipient)}. txDigest: ${txDigest}`);
  return txDigest;
};
