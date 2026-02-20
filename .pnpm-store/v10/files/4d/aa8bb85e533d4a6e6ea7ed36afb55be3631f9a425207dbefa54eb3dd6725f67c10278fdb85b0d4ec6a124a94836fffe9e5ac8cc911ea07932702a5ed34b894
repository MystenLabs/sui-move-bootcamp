import { c as DAppKitCompatibleClient, s as WalletConnection, t as DefaultExpectedDppKit } from "../types-x68aipir.mjs";
import { UiWallet, UiWalletAccount } from "@wallet-standard/ui";
import "@webcomponents/scoped-custom-element-registry";
import * as lit17 from "lit";
import { LitElement } from "lit";

//#region src/web/internal/wallet-list-item.d.ts
declare class WalletListItem extends LitElement {
  #private;
  static styles: (lit17.CSSResult | lit17.CSSResult[])[];
  wallet: UiWallet;
  autofocus: boolean;
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/internal/button.d.ts
declare class Button extends LitElement {
  static shadowRootOptions: {
    delegatesFocus: boolean;
    clonable?: boolean;
    customElementRegistry?: CustomElementRegistry;
    mode: ShadowRootMode;
    serializable?: boolean;
    slotAssignment?: SlotAssignmentMode;
    customElements?: CustomElementRegistry;
  };
  static styles: (lit17.CSSResult | lit17.CSSResult[])[];
  variant: 'primary' | 'secondary';
  href: string;
  disabled: boolean;
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/internal/wallet-list.d.ts
declare const WalletList_base: typeof LitElement;
declare class WalletList extends WalletList_base {
  static elementDefinitions: {
    'wallet-list-item': typeof WalletListItem;
    'internal-button': typeof Button;
  };
  static styles: (lit17.CSSResult | lit17.CSSResult[])[];
  wallets: UiWallet[];
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/internal/base-modal.d.ts
declare class BaseModal extends LitElement {
  #private;
  static shadowRootOptions: {
    delegatesFocus: boolean;
    clonable?: boolean;
    customElementRegistry?: CustomElementRegistry;
    mode: ShadowRootMode;
    serializable?: boolean;
    slotAssignment?: SlotAssignmentMode;
    customElements?: CustomElementRegistry;
  };
  /**
   * Opens the dialog when set to `true` and closes it when set to `false`.
   */
  get open(): boolean;
  set open(open: boolean);
  private readonly _dialog;
  /**
   * Opens the dialog and fires a cancelable `open` event. An `opened` event
   * is fired after the dialog opens.
   *
   * @returns A `Promise` that resolves after the `opened` event was fired.
   */
  show(): Promise<void>;
  /**
   * Closes the dialog and fires a cancelable `close` event. After a dialog's
   * animation, a `closed` event is fired.
   *
   * @param returnValue A return value usually indicating which button was used
   *     to close a dialog. If a dialog is canceled by clicking the backdrop or
   *     pressing Escape, it will not change the return value after closing.
   * @returns A Promise that resolves after the `closed` event was fired.
   */
  close(returnValue?: string | undefined): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected handleContentClick(): void;
  protected handleDialogClick(): void;
}
//#endregion
//#region src/web/internal/connection-status.d.ts
declare class ConnectionStatus extends LitElement {
  static styles: (lit17.CSSResult | lit17.CSSResult[])[];
  wallet: UiWallet;
  title: string;
  copy: string;
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/dapp-kit-connect-modal.d.ts
type DAppKitConnectModalOptions = {
  filterFn?: (value: UiWallet, index: number, array: UiWallet[]) => boolean;
  sortFn?: (a: UiWallet, b: UiWallet) => number;
};
declare const DAppKitConnectModal_base: typeof BaseModal;
/**
 * A modal component for connecting to a Sui wallet, meant to be opened via a trigger button.
 *
 * Opens a modal to let the user select and connect to a wallet.
 *
 * @element mysten-dapp-kit-connect-modal
 *
 * @fires open - Fired *before* the dialog opens (cancelable).
 * @fires opened - Fired *after* the dialog has fully opened.
 * @fires close - Fired *before* the dialog closes (cancelable).
 * @fires closed - Fired *after* the dialog has fully closed.
 * @fires cancel - Fired when clicking the backdrop or pressing Escape (cancelable).
 *
 * @prop {Boolean} open - Programmatic access to the open state of the dialog.
 * @prop {DAppKitConnectModalOptions['filterFn']} filterFn - Function to filter the list of shown wallets (optional).
 * @prop {DAppKitConnectModalOptions['sortFn']} sortFn - Function to sort the list of available wallets (optional).
 * @prop {RegisteredDAppKit} instance - The dApp Kit instance used for state management.
 *
 * @cssprop --background - Background color of the component. Used as the default background for UI elements.
 * @cssprop --foreground - Foreground color of the component. Used as the default text color.
 * @cssprop --primary - Primary color used for interactive elements such as buttons and links.
 * @cssprop --primary-foreground - Text or icon color placed on top of primary elements.
 * @cssprop --secondary - Secondary color used for less prominent interactive elements.
 * @cssprop --secondary-foreground - Text or icon color placed on top of secondary elements.
 * @cssprop --border - Border color for UI elements.
 * @cssprop --accent - Accent color used for highlights and decorative elements.
 * @cssprop --accent-foreground - Text or icon color placed on top of accent elements.
 * @cssprop --muted - Background color for subtle or muted UI elements (e.g., placeholders, disabled states).
 * @cssprop --muted-foreground - Text or icon color for muted UI elements.
 * @cssprop --popover - Background color for floating elements such as popovers, dropdowns, or tooltips.
 * @cssprop --popover-foreground - Text or icon color inside popover elements.
 * @cssprop --ring - Color used for focus rings (visible focus indicators on interactive elements).
 * @cssprop --radius - Border radius used for UI elements.
 * @cssprop --font-sans - Font family used for text content.
 * @cssprop --font-weight-medium - Medium font weight for text (typically used for buttons and interactive elements).
 * @cssprop --font-weight-semibold - Semibold font weight for text (typically used for headings or emphasized text).
 */
declare class DAppKitConnectModal extends DAppKitConnectModal_base implements DAppKitConnectModalOptions {
  #private;
  static styles: (lit17.CSSResult | (lit17.CSSResult | lit17.CSSResult[])[])[];
  static elementDefinitions: {
    'wallet-list': typeof WalletList;
    'internal-button': typeof Button;
    'connection-status': typeof ConnectionStatus;
  };
  /**
   * The dApp Kit instance used for state management.
   */
  instance: DefaultExpectedDppKit;
  private _state;
  /**
   * Function to filter the list of shown wallets.
   */
  filterFn: DAppKitConnectModalOptions['filterFn'];
  /**
   * Function to sort the list of shown wallets.
   */
  sortFn: DAppKitConnectModalOptions['sortFn'];
  render(): lit17.TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    'mysten-dapp-kit-connect-modal': DAppKitConnectModal;
  }
}
//#endregion
//#region src/web/internal/connected-account-menu-item.d.ts
declare class AccountMenuItem extends LitElement {
  #private;
  createRenderRoot(): this;
  account: UiWalletAccount;
  client: DAppKitCompatibleClient;
  selected: boolean;
  private _wasCopySuccessful;
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/internal/connected-account-menu.d.ts
declare const ConnectedAccountMenu_base: typeof LitElement;
declare class ConnectedAccountMenu extends ConnectedAccountMenu_base {
  #private;
  static elementDefinitions: {
    'internal-button': typeof Button;
    'account-menu-item': typeof AccountMenuItem;
  };
  static styles: (lit17.CSSResult | lit17.CSSResult[])[];
  connection: Extract<WalletConnection, {
    status: 'connected';
  }>;
  client: DAppKitCompatibleClient;
  private _trigger;
  private _menu;
  private _open;
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): lit17.TemplateResult<1>;
}
//#endregion
//#region src/web/dapp-kit-connect-button.d.ts
declare const DAppKitConnectButton_base: typeof LitElement;
/**
 * A button component for connecting to a Sui wallet.
 *
 * Displays a "Connect Wallet" button when no wallet is connected or a connected account menu when a wallet is active.
 *
 * @element mysten-dapp-kit-connect-button
 *
 * @prop {DAppKitConnectModalOptions} modalOptions - Options to configure the connect modal.
 * @prop {RegisteredDAppKit} instance - The dApp Kit instance used for state management.
 *
 * @slot - The default slot used to customize the button content (shown when not connected).
 *
 * @cssprop --background - Background color of the component. Used as the default background for UI elements.
 * @cssprop --foreground - Foreground color of the component. Used as the default text color.
 * @cssprop --primary - Primary color used for interactive elements such as buttons and links.
 * @cssprop --primary-foreground - Text or icon color placed on top of primary elements.
 * @cssprop --secondary - Secondary color used for less prominent interactive elements.
 * @cssprop --secondary-foreground - Text or icon color placed on top of secondary elements.
 * @cssprop --border - Border color for UI elements.
 * @cssprop --accent - Accent color used for highlights and decorative elements.
 * @cssprop --accent-foreground - Text or icon color placed on top of accent elements.
 * @cssprop --muted - Background color for subtle or muted UI elements (e.g., placeholders, disabled states).
 * @cssprop --muted-foreground - Text or icon color for muted UI elements.
 * @cssprop --popover - Background color for floating elements such as popovers, dropdowns, or tooltips.
 * @cssprop --popover-foreground - Text or icon color inside popover elements.
 * @cssprop --ring - Color used for focus rings (visible focus indicators on interactive elements).
 * @cssprop --radius - Border radius used for UI elements.
 * @cssprop --font-sans - Font family used for text content.
 * @cssprop --font-weight-medium - Medium font weight for text (typically used for buttons and interactive elements).
 * @cssprop --font-weight-semibold - Semibold font weight for text (typically used for headings or emphasized text).
 */
declare class DAppKitConnectButton extends DAppKitConnectButton_base {
  #private;
  static elementDefinitions: {
    'internal-button': typeof Button;
    'mysten-dapp-kit-connect-modal': typeof DAppKitConnectModal;
    'connected-account-menu': typeof ConnectedAccountMenu;
  };
  static shadowRootOptions: {
    delegatesFocus: boolean;
    clonable?: boolean;
    customElementRegistry?: CustomElementRegistry;
    mode: ShadowRootMode;
    serializable?: boolean;
    slotAssignment?: SlotAssignmentMode;
    customElements?: CustomElementRegistry;
  };
  static styles: lit17.CSSResult[];
  /**
   * Options to configure the connect modal.
   */
  modalOptions?: DAppKitConnectModalOptions;
  /**
   * The dApp Kit instance used for state management.
   */
  instance: DefaultExpectedDppKit;
  private readonly _modal;
  render(): lit17.TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    'mysten-dapp-kit-connect-button': DAppKitConnectButton;
  }
}
//#endregion
export { DAppKitConnectButton, DAppKitConnectModal, type DAppKitConnectModalOptions };
//# sourceMappingURL=index.d.mts.map