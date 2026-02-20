//#region src/faucet/faucet.d.ts
declare class FaucetRateLimitError extends Error {}
type FaucetCoinInfo = {
  amount: number;
  id: string;
  transferTxDigest: string;
};
type FaucetResponseV2 = {
  status: 'Success' | FaucetFailure;
  coins_sent: FaucetCoinInfo[] | null;
};
type FaucetFailure = {
  Failure: {
    internal: string;
  };
};
declare function requestSuiFromFaucetV2(input: {
  host: string;
  recipient: string;
  headers?: HeadersInit;
}): Promise<FaucetResponseV2>;
declare function getFaucetHost(network: 'testnet' | 'devnet' | 'localnet'): "https://faucet.testnet.sui.io" | "https://faucet.devnet.sui.io" | "http://127.0.0.1:9123";
//#endregion
export { FaucetRateLimitError, getFaucetHost, requestSuiFromFaucetV2 };
//# sourceMappingURL=faucet.d.mts.map