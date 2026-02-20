import { isValidSuiNSName } from "./suins.mjs";
import { isValidStructTag } from "./sui-types.mjs";

//#region src/utils/move-registry.ts
/** The pattern to find an optionally versioned name */
const NAME_PATTERN = /^([a-z0-9]+(?:-[a-z0-9]+)*)$/;
/** The pattern for a valid version number */
const VERSION_REGEX = /^\d+$/;
/** The maximum size for an app */
const MAX_APP_SIZE = 64;
/** The separator for the name */
const NAME_SEPARATOR = "/";
const isValidNamedPackage = (name) => {
	const parts = name.split(NAME_SEPARATOR);
	if (parts.length < 2 || parts.length > 3) return false;
	const [org, app, version] = parts;
	if (version !== void 0 && !VERSION_REGEX.test(version)) return false;
	if (!isValidSuiNSName(org)) return false;
	return NAME_PATTERN.test(app) && app.length < MAX_APP_SIZE;
};
/**
* Checks if a type contains valid named packages and is a valid Move struct tag.
*/
const isValidNamedType = (type) => {
	const splitType = type.split(/::|<|>|,/);
	for (const t of splitType) if (t.includes(NAME_SEPARATOR) && !isValidNamedPackage(t)) return false;
	return isValidStructTag(type);
};

//#endregion
export { isValidNamedPackage, isValidNamedType };
//# sourceMappingURL=move-registry.mjs.map