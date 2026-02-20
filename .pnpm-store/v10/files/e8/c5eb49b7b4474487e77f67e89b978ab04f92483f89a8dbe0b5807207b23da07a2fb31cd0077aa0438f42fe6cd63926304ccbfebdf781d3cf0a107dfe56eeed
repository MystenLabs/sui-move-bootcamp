import { createObjectMethods } from "./object.mjs";
import { createPure } from "./pure.mjs";

//#region src/transactions/Arguments.ts
const Arguments = {
	pure: createPure((value) => (tx) => tx.pure(value)),
	object: createObjectMethods((value) => (tx) => tx.object(value)),
	sharedObjectRef: (...args) => (tx) => tx.sharedObjectRef(...args),
	objectRef: (...args) => (tx) => tx.objectRef(...args),
	receivingRef: (...args) => (tx) => tx.receivingRef(...args)
};

//#endregion
export { Arguments };
//# sourceMappingURL=Arguments.mjs.map