import { bcs as suiBcs } from "../bcs/index.mjs";

//#region src/cryptography/intent.d.ts
type IntentScope = Exclude<keyof typeof suiBcs.IntentScope.$inferType, '$kind'>;
/**
 * Inserts a domain separator for a message that is being signed
 */
declare function messageWithIntent(scope: IntentScope, message: Uint8Array): Uint8Array<ArrayBuffer>;
//#endregion
export { IntentScope, messageWithIntent };
//# sourceMappingURL=intent.d.mts.map