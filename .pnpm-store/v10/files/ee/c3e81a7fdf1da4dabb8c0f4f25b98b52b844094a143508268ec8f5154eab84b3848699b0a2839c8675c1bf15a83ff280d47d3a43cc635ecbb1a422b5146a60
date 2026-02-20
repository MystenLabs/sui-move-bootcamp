import { ReadonlyWalletAccount, StandardConnectFeature, StandardDisconnectFeature, StandardEventsFeature, SuiChain, SuiSignAndExecuteTransactionFeature, SuiSignPersonalMessageFeature, SuiSignTransactionBlockFeature, SuiSignTransactionFeature, Wallet } from "@mysten/wallet-standard";
import * as valibot0 from "valibot";
import { InferOutput } from "valibot";

//#region src/wallet/index.d.ts
declare const SLUSH_WALLET_NAME: "Slush";
declare const SLUSH_WALLET_ICON: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMjRDMCAxMC43NDUyIDEwLjc0NTIgMCAyNCAwQzM3LjI1NDggMCA0OCAxMC43NDUyIDQ4IDI0QzQ4IDM3LjI1NDggMzcuMjU0OCA0OCAyNCA0OEMxMC43NDUyIDQ4IDAgMzcuMjU0OCAwIDI0WiIgZmlsbD0iIzBDMEExRiIvPgo8cGF0aCBkPSJNMTMuMTM1OCAzMi4xMDg1QzE0LjE3MDEgMzUuOTY4MyAxOC4wMzMxIDM5LjQ2MjQgMjYuMDI1NSAzNy4zMjA4QzMzLjY1MTUgMzUuMjc3NCAzOC40MzA5IDI5LjAwNCAzNy4xOTE2IDI0LjM3ODlDMzYuNzYzNiAyMi43ODE3IDM1LjQ3NDYgMjEuNzAwNiAzMy40ODcyIDIxLjg3NjVMMTUuNzE2NSAyMy4zNTcyQzE0LjU5NzMgMjMuNDQzIDE0LjA4NDIgMjMuMjU5NiAxMy43ODgxIDIyLjU1NDNDMTMuNTAxIDIxLjg4MjMgMTMuNjY0NiAyMS4xNjA5IDE1LjAxNjMgMjAuNDc3N0wyOC41NDAxIDEzLjUzNzRDMjkuNTc2NyAxMy4wMSAzMC4yNjcxIDEyLjc4OTMgMzAuODk4IDEzLjAxMjZDMzEuMjkzNCAxMy4xNTYzIDMxLjU1MzggMTMuNzI4NCAzMS4zMTQ3IDE0LjQzNDRMMzAuNDM3OCAxNy4wMjMyQzI5LjM2MTcgMjAuMjAwMiAzMS42NjUzIDIwLjkzODIgMzIuOTY0MSAyMC41OTAyQzM0LjkyODkgMjAuMDYzNyAzNS4zOTExIDE4LjE5MjMgMzQuNzU4MSAxNS44Mjk5QzMzLjE1MzMgOS44NDA1NCAyNi43OTkgOC45MDQxMSAyMS4wMzc4IDEwLjQ0NzhDMTUuMTc2NyAxMi4wMTgzIDEwLjA5NiAxNi43Njc2IDExLjY0NzQgMjIuNTU3M0MxMi4wMTI5IDIzLjkyMTYgMTMuMjY4NyAyNS4wMTE2IDE0LjcyMzIgMjQuOTc4NUwxNi45NDM4IDI0Ljk3MzFDMTcuNDAwNCAyNC45NjI1IDE3LjIzNiAyNSAxOC4xMTcgMjQuOTI3MUMxOC45OTggMjQuODU0MSAyMS4zNTA5IDI0LjU2NDYgMjEuMzUwOSAyNC41NjQ2TDMyLjg5NjIgMjMuMjU4TDMzLjE5MzcgMjMuMjE0OEMzMy44Njg5IDIzLjA5OTcgMzQuMzc5MiAyMy4yNzUgMzQuODEwNiAyNC4wMTgzQzM1LjQ1NjMgMjUuMTMwNCAzNC40NzEyIDI1Ljk2OTEgMzMuMjkyIDI2Ljk3MzFDMzMuMjYwNSAyNyAzMy4yMjg4IDI3LjAyNyAzMy4xOTcgMjcuMDU0MUwyMy4wNDgyIDM1LjgwMDVDMjEuMzA4NyAzNy4zMDA4IDIwLjA4NjcgMzYuNzM2NyAxOS42NTg4IDM1LjEzOTVMMTguMTQzMSAyOS40ODI5QzE3Ljc2ODcgMjguMDg1NCAxNi40MDQxIDI2Ljk4ODkgMTQuODA1NiAyNy40MTcyQzEyLjgwNzUgMjcuOTUyNiAxMi42NDU1IDMwLjI3ODQgMTMuMTM1OCAzMi4xMDg1WiIgZmlsbD0iI0ZCRkFGRiIvPgo8L3N2Zz4K";
declare const WalletMetadataSchema: valibot0.ObjectSchema<{
  readonly id: valibot0.StringSchema<"Wallet ID is required">;
  readonly walletName: valibot0.StringSchema<"Wallet name is required">;
  readonly icon: valibot0.StringSchema<"Icon must be a valid wallet icon format">;
  readonly enabled: valibot0.BooleanSchema<"Enabled is required">;
}, undefined>;
type WalletMetadata = InferOutput<typeof WalletMetadataSchema>;
declare class SlushWallet implements Wallet {
  #private;
  get name(): string;
  get id(): string;
  get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
  get version(): "1.0.0";
  get chains(): readonly ["sui:devnet", "sui:testnet", "sui:localnet", "sui:mainnet"];
  get accounts(): ReadonlyWalletAccount[];
  get features(): StandardConnectFeature & StandardDisconnectFeature & StandardEventsFeature & SuiSignTransactionBlockFeature & SuiSignTransactionFeature & SuiSignPersonalMessageFeature & SuiSignAndExecuteTransactionFeature;
  constructor({
    name,
    origin,
    metadata
  }: {
    name: string;
    origin?: string;
    chain?: SuiChain;
    metadata: WalletMetadata;
  });
  updateMetadata(metadata: WalletMetadata): void;
}
declare function registerSlushWallet(name: string, {
  origin,
  metadataApiUrl
}?: {
  origin?: string;
  metadataApiUrl?: string;
}): {
  wallet: SlushWallet;
  unregister: () => void;
} | undefined;
//#endregion
export { SLUSH_WALLET_ICON, SLUSH_WALLET_NAME, SlushWallet, registerSlushWallet };
//# sourceMappingURL=index.d.mts.map