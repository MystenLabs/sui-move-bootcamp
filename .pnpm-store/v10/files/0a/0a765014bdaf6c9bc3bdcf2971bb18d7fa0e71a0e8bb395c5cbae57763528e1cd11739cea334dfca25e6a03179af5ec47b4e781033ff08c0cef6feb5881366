import { bcs as suiBcs } from "../bcs/index.mjs";

//#region src/cryptography/intent.ts
/**
* Inserts a domain separator for a message that is being signed
*/
function messageWithIntent(scope, message) {
	return suiBcs.IntentMessage(suiBcs.bytes(message.length)).serialize({
		intent: {
			scope: { [scope]: true },
			version: { V0: true },
			appId: { Sui: true }
		},
		value: message
	}).toBytes();
}

//#endregion
export { messageWithIntent };
//# sourceMappingURL=intent.mjs.map