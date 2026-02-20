"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEncodedContext = decodeEncodedContext;
exports.encodeContextObject = encodeContextObject;
function decodeEncodedContext(encodedContext) {
    const decodedUrlString = atob(encodedContext);
    return Object.fromEntries(new URLSearchParams(decodedUrlString).entries());
}
function encodeValue(value) {
    if (Array.isArray(value)) {
        const commaSeparatedValues = value.map(encodeValue).join('%2C%20' /* ", " */);
        return '%5B' /* "[" */ + commaSeparatedValues + /* "]" */ '%5D';
    }
    else if (typeof value === 'bigint') {
        return `${value}n`;
    }
    else {
        return encodeURIComponent(String(value != null && Object.getPrototypeOf(value) === null
            ? // Plain objects with no prototype don't have a `toString` method.
             Object.assign({}, value) : value));
    }
}
function encodeObjectContextEntry([key, value]) {
    return `${key}=${encodeValue(value)}`;
}
function encodeContextObject(context) {
    const searchParamsString = Object.entries(context).map(encodeObjectContextEntry).join('&');
    return btoa(searchParamsString);
}
//# sourceMappingURL=context.js.map