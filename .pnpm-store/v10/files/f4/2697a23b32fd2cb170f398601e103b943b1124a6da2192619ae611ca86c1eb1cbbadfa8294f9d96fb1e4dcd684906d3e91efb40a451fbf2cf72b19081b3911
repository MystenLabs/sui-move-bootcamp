import { MOVE_STDLIB_ADDRESS, SUI_CLOCK_OBJECT_ID, SUI_DENY_LIST_OBJECT_ID, SUI_RANDOM_OBJECT_ID, SUI_SYSTEM_STATE_OBJECT_ID } from "../utils/constants.mjs";
import { Inputs } from "./Inputs.mjs";

//#region src/transactions/object.ts
function createObjectMethods(makeObject) {
	function object(value) {
		return makeObject(value);
	}
	object.system = (options) => {
		const mutable = options?.mutable;
		if (mutable !== void 0) return object(Inputs.SharedObjectRef({
			objectId: SUI_SYSTEM_STATE_OBJECT_ID,
			initialSharedVersion: 1,
			mutable
		}));
		return object({
			$kind: "UnresolvedObject",
			UnresolvedObject: {
				objectId: SUI_SYSTEM_STATE_OBJECT_ID,
				initialSharedVersion: 1
			}
		});
	};
	object.clock = () => object(Inputs.SharedObjectRef({
		objectId: SUI_CLOCK_OBJECT_ID,
		initialSharedVersion: 1,
		mutable: false
	}));
	object.random = () => object({
		$kind: "UnresolvedObject",
		UnresolvedObject: {
			objectId: SUI_RANDOM_OBJECT_ID,
			mutable: false
		}
	});
	object.denyList = (options) => {
		return object({
			$kind: "UnresolvedObject",
			UnresolvedObject: {
				objectId: SUI_DENY_LIST_OBJECT_ID,
				mutable: options?.mutable
			}
		});
	};
	object.option = ({ type, value }) => (tx) => tx.moveCall({
		typeArguments: [type],
		target: `${MOVE_STDLIB_ADDRESS}::option::${value === null ? "none" : "some"}`,
		arguments: value === null ? [] : [tx.object(value)]
	});
	return object;
}

//#endregion
export { createObjectMethods };
//# sourceMappingURL=object.mjs.map