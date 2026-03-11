export interface SuiReadClient {
  getSuiBalance(address: string): Promise<string>;
  getCurrentEpoch(): Promise<number>;
}
