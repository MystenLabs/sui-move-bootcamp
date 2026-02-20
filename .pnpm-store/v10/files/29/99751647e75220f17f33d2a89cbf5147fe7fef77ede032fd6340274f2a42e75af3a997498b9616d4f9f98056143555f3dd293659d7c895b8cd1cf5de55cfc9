import type { WalletStandardErrorCode } from './codes.js';
import type { WalletStandardErrorContext } from './context.js';
export declare function isWalletStandardError<TErrorCode extends WalletStandardErrorCode>(e: unknown, code?: TErrorCode): e is WalletStandardError<TErrorCode>;
type WalletStandardErrorCodedContext = Readonly<{
    [P in WalletStandardErrorCode]: (WalletStandardErrorContext[P] extends undefined ? object : WalletStandardErrorContext[P]) & {
        __code: P;
    };
}>;
export declare class WalletStandardError<TErrorCode extends WalletStandardErrorCode = WalletStandardErrorCode> extends Error {
    readonly context: WalletStandardErrorCodedContext[TErrorCode];
    constructor(...[code, contextAndErrorOptions]: WalletStandardErrorContext[TErrorCode] extends undefined ? [code: TErrorCode, errorOptions?: ErrorOptions | undefined] : [
        code: TErrorCode,
        contextAndErrorOptions: WalletStandardErrorContext[TErrorCode] & (ErrorOptions | undefined)
    ]);
}
export {};
//# sourceMappingURL=error.d.ts.map