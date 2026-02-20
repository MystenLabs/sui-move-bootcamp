import type { ReadonlyUint8Array, WalletAccount } from '@wallet-standard/base';
/**
 * Base implementation of a {@link "@wallet-standard/base".WalletAccount} to be used or extended by a
 * {@link "@wallet-standard/base".Wallet}.
 *
 * `WalletAccount` properties must be read-only. This class enforces this by making all properties
 * [truly private](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) and
 * read-only, using getters for access, returning copies instead of references, and calling
 * [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
 * on the instance.
 *
 * @group Account
 */
export declare class ReadonlyWalletAccount implements WalletAccount {
    #private;
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.address | WalletAccount::address} */
    get address(): string;
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.publicKey | WalletAccount::publicKey} */
    get publicKey(): Uint8Array;
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.chains | WalletAccount::chains} */
    get chains(): `${string}:${string}`[];
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.features | WalletAccount::features} */
    get features(): `${string}:${string}`[];
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.label | WalletAccount::label} */
    get label(): string | undefined;
    /** Implementation of {@link "@wallet-standard/base".WalletAccount.icon | WalletAccount::icon} */
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}` | undefined;
    /**
     * Create and freeze a read-only account.
     *
     * @param account Account to copy properties from.
     */
    constructor(account: WalletAccount);
}
/**
 * Efficiently compare {@link Indexed} arrays (e.g. `Array` and `Uint8Array`).
 *
 * @param a An array.
 * @param b Another array.
 *
 * @return `true` if the arrays have the same length and elements, `false` otherwise.
 *
 * @group Util
 */
export declare function arraysEqual<T>(a: Indexed<T>, b: Indexed<T>): boolean;
/**
 * Efficiently compare byte arrays, using {@link arraysEqual}.
 *
 * @param a A byte array.
 * @param b Another byte array.
 *
 * @return `true` if the byte arrays have the same length and bytes, `false` otherwise.
 *
 * @group Util
 */
export declare function bytesEqual(a: ReadonlyUint8Array, b: ReadonlyUint8Array): boolean;
/**
 * Efficiently concatenate byte arrays without modifying them.
 *
 * @param first  A byte array.
 * @param others Additional byte arrays.
 *
 * @return New byte array containing the concatenation of all the byte arrays.
 *
 * @group Util
 */
export declare function concatBytes(first: ReadonlyUint8Array, ...others: ReadonlyUint8Array[]): Uint8Array;
/**
 * Create a new object with a subset of fields from a source object.
 *
 * @param source Object to pick fields from.
 * @param keys   Names of fields to pick.
 *
 * @return New object with only the picked fields.
 *
 * @group Util
 */
export declare function pick<T, K extends keyof T>(source: T, ...keys: K[]): Pick<T, K>;
/**
 * Call a callback function, catch an error if it throws, and log the error without rethrowing.
 *
 * @param callback Function to call.
 *
 * @group Util
 */
export declare function guard(callback: () => void): void;
/**
 * @internal
 *
 * Type with a numeric `length` and numerically indexed elements of a generic type `T`.
 *
 * For example, `Array<T>` and `Uint8Array`.
 *
 * @group Internal
 */
export interface Indexed<T> {
    length: number;
    [index: number]: T;
}
//# sourceMappingURL=util.d.ts.map