import { DevInspectResults } from "@mysten/sui/client";
import { GasInfo, GasResult } from "../types/gas";

export const extractGasInfo = (
  response: DevInspectResults
): GasInfo | null => {
  if (!response.effects?.gasUsed) return null;

  const gas = response.effects.gasUsed;
  const total =
    BigInt(gas.computationCost) +
    BigInt(gas.storageCost) -
    BigInt(gas.storageRebate);

  return {
    computationCost: gas.computationCost,
    storageCost: gas.storageCost,
    storageRebate: gas.storageRebate,
    totalGas: total.toString(),
  };
};

export const extractGasFromEffects = (gasUsed: {
  computationCost: string;
  storageCost: string;
  storageRebate: string;
}): GasInfo => {
  const total =
    BigInt(gasUsed.computationCost) +
    BigInt(gasUsed.storageCost) -
    BigInt(gasUsed.storageRebate);

  return {
    computationCost: gasUsed.computationCost,
    storageCost: gasUsed.storageCost,
    storageRebate: gasUsed.storageRebate,
    totalGas: total.toString(),
  };
};

export const logGasComparison = (label: string, results: GasResult[]): void => {
  console.log(`\n📊 ${label}`);
  console.log("─".repeat(60));
  for (const { n, gas } of results) {
    console.log(
      `  n=${n.toString().padStart(3)}: computation=${gas.computationCost.padStart(10)}, storage=${gas.storageCost.padStart(10)}, rebate=${gas.storageRebate.padStart(10)}, total=${gas.totalGas.padStart(10)}`
    );
  }
};

export const logVectorVsTableComparison = (
  n: number,
  vecGas: GasInfo,
  tabGas: GasInfo
): void => {
  const vecComp = BigInt(vecGas.computationCost);
  const tabComp = BigInt(tabGas.computationCost);
  const savings = vecComp - tabComp;
  const savingsPercent = Number((savings * 100n) / vecComp);

  console.log(`\n  n=${n}:`);
  console.log(`    Vector: ${vecGas.computationCost} computation`);
  console.log(`    Table:  ${tabGas.computationCost} computation`);
  console.log(
    `    Savings: ${savings.toString()} (${savingsPercent}% less with Table)`
  );
};
