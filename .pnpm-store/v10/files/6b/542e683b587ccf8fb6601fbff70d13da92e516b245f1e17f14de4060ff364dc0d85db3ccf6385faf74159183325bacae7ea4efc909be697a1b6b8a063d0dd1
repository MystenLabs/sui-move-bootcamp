//#region src/client/errors.ts
var SuiClientError = class extends Error {};
var SimulationError = class extends SuiClientError {
	constructor(message, options) {
		super(message, { cause: options?.cause });
		this.executionError = options?.executionError;
	}
};
var ObjectError = class ObjectError extends SuiClientError {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
	static fromResponse(response, objectId) {
		switch (response.code) {
			case "notExists": return new ObjectError(response.code, `Object ${response.object_id} does not exist`);
			case "dynamicFieldNotFound": return new ObjectError(response.code, `Dynamic field not found for object ${response.parent_object_id}`);
			case "deleted": return new ObjectError(response.code, `Object ${response.object_id} has been deleted`);
			case "displayError": return new ObjectError(response.code, `Display error: ${response.error}`);
			case "unknown":
			default: return new ObjectError(response.code, `Unknown error while loading object${objectId ? ` ${objectId}` : ""}`);
		}
	}
};

//#endregion
export { ObjectError, SimulationError };
//# sourceMappingURL=errors.mjs.map