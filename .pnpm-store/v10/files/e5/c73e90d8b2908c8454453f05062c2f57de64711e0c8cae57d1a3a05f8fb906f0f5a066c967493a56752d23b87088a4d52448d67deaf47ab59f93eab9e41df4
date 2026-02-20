import { SuiClientTypes } from "./types.mjs";
import "../jsonRpc/index.mjs";

//#region src/client/errors.d.ts
declare class SuiClientError extends Error {}
declare class SimulationError extends SuiClientError {
  executionError?: SuiClientTypes.ExecutionError;
  constructor(message: string, options?: {
    cause?: unknown;
    executionError?: SuiClientTypes.ExecutionError;
  });
}
//#endregion
export { SimulationError };
//# sourceMappingURL=errors.d.mts.map