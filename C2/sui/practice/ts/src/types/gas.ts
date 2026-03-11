export interface GasInfo {
  computationCost: string;
  storageCost: string;
  storageRebate: string;
  totalGas: string;
}

export interface GasResult {
  n: number;
  gas: GasInfo;
}

export interface StoreId {
  n: number;
  id: string;
}
