import type { Wallet } from '@wallet-standard/base';
/**
 * Get an API for {@link Wallets.get | getting}, {@link Wallets.on | listening for}, and
 * {@link Wallets.register | registering} {@link "@wallet-standard/base".Wallet | Wallets}.
 *
 * When called for the first time --
 *
 * This dispatches a {@link "@wallet-standard/base".WindowAppReadyEvent} to notify each Wallet that the app is ready
 * to register it.
 *
 * This also adds a listener for {@link "@wallet-standard/base".WindowRegisterWalletEvent} to listen for a notification
 * from each Wallet that the Wallet is ready to be registered by the app.
 *
 * This combination of event dispatch and listener guarantees that each Wallet will be registered synchronously as soon
 * as the app is ready whether the app loads before or after each Wallet.
 *
 * @return API for getting, listening for, and registering Wallets.
 *
 * @group App
 */
export declare function getWallets(): Wallets;
/**
 * API for {@link Wallets.get | getting}, {@link Wallets.on | listening for}, and
 * {@link Wallets.register | registering} {@link "@wallet-standard/base".Wallet | Wallets}.
 *
 * @group App
 */
export interface Wallets {
    /**
     * Get all Wallets that have been registered.
     *
     * @return Registered Wallets.
     */
    get(): readonly Wallet[];
    /**
     * Add an event listener and subscribe to events for Wallets that are
     * {@link WalletsEventsListeners.register | registered} and
     * {@link WalletsEventsListeners.unregister | unregistered}.
     *
     * @param event    Event type to listen for. {@link WalletsEventsListeners.register | `register`} and
     * {@link WalletsEventsListeners.unregister | `unregister`} are the only event types.
     * @param listener Function that will be called when an event of the type is emitted.
     *
     * @return
     * `off` function which may be called to remove the event listener and unsubscribe from events.
     *
     * As with all event listeners, be careful to avoid memory leaks.
     */
    on<E extends WalletsEventNames>(event: E, listener: WalletsEventsListeners[E]): () => void;
    /**
     * Register Wallets. This can be used to programmatically wrap non-standard wallets as Standard Wallets.
     *
     * Apps generally do not need to, and should not, call this.
     *
     * @param wallets Wallets to register.
     *
     * @return
     * `unregister` function which may be called to programmatically unregister the registered Wallets.
     *
     * Apps generally do not need to, and should not, call this.
     */
    register(...wallets: Wallet[]): () => void;
}
/**
 * Types of event listeners of the {@link Wallets} API.
 *
 * @group App
 */
export interface WalletsEventsListeners {
    /**
     * Emitted when Wallets are registered.
     *
     * @param wallets Wallets that were registered.
     */
    register(...wallets: Wallet[]): void;
    /**
     * Emitted when Wallets are unregistered.
     *
     * @param wallets Wallets that were unregistered.
     */
    unregister(...wallets: Wallet[]): void;
}
/**
 * Names of {@link WalletsEventsListeners} that can be listened for.
 *
 * @group App
 */
export type WalletsEventNames = keyof WalletsEventsListeners;
/**
 * @deprecated Use {@link WalletsEventsListeners} instead.
 *
 * @group Deprecated
 */
export type WalletsEvents = WalletsEventsListeners;
/**
 * @deprecated Use {@link getWallets} instead.
 *
 * @group Deprecated
 */
export declare function DEPRECATED_getWallets(): Wallets;
//# sourceMappingURL=wallets.d.ts.map