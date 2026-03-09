import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";
import { getAddress } from "./getAddress";
import { SuiClientTypes } from "@mysten/sui/client";

/**
 * Builds, signs, and executes a transaction for:
 * * minting a Hero NFT
 * * minting a Sword NFT
 * * attaching the Sword to the Hero
 * * transferring the Hero to the signer
 */
export const mintHeroWithSword =
  async (): Promise<SuiClientTypes.TransactionResult<{ effects: true }>> => {
    // TODO: Implement this function
    return {} as SuiClientTypes.TransactionResult<{ effects: true }>;
  };
