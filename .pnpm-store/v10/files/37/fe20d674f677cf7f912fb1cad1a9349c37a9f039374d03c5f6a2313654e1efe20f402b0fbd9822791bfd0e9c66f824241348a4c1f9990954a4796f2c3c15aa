import { SuiClientTypes } from "./types.mjs";

//#region src/client/utils.d.ts
declare function formatMoveAbortMessage(options: {
  command?: number;
  location?: {
    package?: string;
    module?: string;
    functionName?: string;
    instruction?: number;
  };
  abortCode: string;
  cleverError?: {
    lineNumber?: number;
    constantName?: string;
    value?: string;
  };
}): string;
declare function parseTransactionBcs(bytes: Uint8Array, onlyTransactionKind?: boolean): SuiClientTypes.TransactionData;
/**
 * Extracts just the status from transaction effects BCS without fully parsing.
 * This is optimized for cases where we only need the status (success/failure)
 * without parsing the entire effects structure.
 *
 * Uses a minimal BCS struct that only parses fields up to and including status,
 * since BCS fields are read sequentially. First tries to parse with full error details,
 * then falls back to a version without error parsing if the error enum has unknown variants.
 *
 * For errors with data, serializes the error as JSON to preserve all information.
 */
declare function extractStatusFromEffectsBcs(effectsBytes: Uint8Array): SuiClientTypes.ExecutionStatus;
declare function parseTransactionEffectsBcs(effects: Uint8Array): SuiClientTypes.TransactionEffects;
//#endregion
export { extractStatusFromEffectsBcs, formatMoveAbortMessage, parseTransactionBcs, parseTransactionEffectsBcs };
//# sourceMappingURL=utils.d.mts.map