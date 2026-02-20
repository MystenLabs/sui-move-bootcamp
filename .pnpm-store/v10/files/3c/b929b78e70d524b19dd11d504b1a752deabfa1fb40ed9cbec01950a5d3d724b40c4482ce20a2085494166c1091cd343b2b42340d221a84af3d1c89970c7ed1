"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStandardError = void 0;
exports.isWalletStandardError = isWalletStandardError;
const message_formatter_js_1 = require("./message-formatter.js");
function isWalletStandardError(e, code) {
    const isWalletStandardError = e instanceof Error && e.name === 'WalletStandardError';
    if (isWalletStandardError) {
        if (code !== undefined) {
            return e.context.__code === code;
        }
        return true;
    }
    return false;
}
class WalletStandardError extends Error {
    constructor(...[code, contextAndErrorOptions]) {
        let context;
        let errorOptions;
        if (contextAndErrorOptions) {
            // If the `ErrorOptions` type ever changes, update this code.
            const { cause } = contextAndErrorOptions, contextRest = __rest(contextAndErrorOptions, ["cause"]);
            if (cause) {
                errorOptions = { cause };
            }
            if (Object.keys(contextRest).length > 0) {
                context = contextRest;
            }
        }
        const message = (0, message_formatter_js_1.getErrorMessage)(code, context);
        super(message, errorOptions);
        this.context = Object.assign({ __code: code }, context);
        // This is necessary so that `isWalletStandardError()` can identify a `WalletStandardError`
        // without having to import the class for use in an `instanceof` check.
        this.name = 'WalletStandardError';
    }
}
exports.WalletStandardError = WalletStandardError;
//# sourceMappingURL=error.js.map