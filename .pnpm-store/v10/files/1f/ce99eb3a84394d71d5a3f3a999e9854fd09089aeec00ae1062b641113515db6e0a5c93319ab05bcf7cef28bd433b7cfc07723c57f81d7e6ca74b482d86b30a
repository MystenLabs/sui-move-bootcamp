export function identifierArraysAreDifferent(a, b) {
    // NOTE: Do not optimize this with an `a.length !== b.length` check. A length check does not
    // take into consideration that the array might contain duplicate items.
    const itemsSetA = new Set(a);
    const itemsSetB = new Set(b);
    if (itemsSetA.size !== itemsSetB.size) {
        return true;
    }
    for (const itemFromA of itemsSetA) {
        if (!itemsSetB.has(itemFromA)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=compare.js.map