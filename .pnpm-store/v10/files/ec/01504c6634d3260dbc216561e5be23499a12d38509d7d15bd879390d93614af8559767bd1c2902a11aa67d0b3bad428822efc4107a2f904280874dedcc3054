import { normalizeSuiAddress } from "../utils/sui-types.mjs";
import { toBase64 } from "@mysten/bcs";

//#region src/transactions/Inputs.ts
function Pure(data) {
	return {
		$kind: "Pure",
		Pure: { bytes: data instanceof Uint8Array ? toBase64(data) : data.toBase64() }
	};
}
const Inputs = {
	Pure,
	ObjectRef({ objectId, digest, version }) {
		return {
			$kind: "Object",
			Object: {
				$kind: "ImmOrOwnedObject",
				ImmOrOwnedObject: {
					digest,
					version,
					objectId: normalizeSuiAddress(objectId)
				}
			}
		};
	},
	SharedObjectRef({ objectId, mutable, initialSharedVersion }) {
		return {
			$kind: "Object",
			Object: {
				$kind: "SharedObject",
				SharedObject: {
					mutable,
					initialSharedVersion,
					objectId: normalizeSuiAddress(objectId)
				}
			}
		};
	},
	ReceivingRef({ objectId, digest, version }) {
		return {
			$kind: "Object",
			Object: {
				$kind: "Receiving",
				Receiving: {
					digest,
					version,
					objectId: normalizeSuiAddress(objectId)
				}
			}
		};
	},
	FundsWithdrawal({ reservation, typeArg, withdrawFrom }) {
		return {
			$kind: "FundsWithdrawal",
			FundsWithdrawal: {
				reservation,
				typeArg,
				withdrawFrom
			}
		};
	}
};

//#endregion
export { Inputs };
//# sourceMappingURL=Inputs.mjs.map