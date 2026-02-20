import * as nanostores0 from "nanostores";
import { ReadableAtom, StoreValue } from "nanostores";
import { SignedPersonalMessage, SignedTransaction, StandardConnectInput, SuiSignAndExecuteTransactionInput, SuiSignPersonalMessageInput, SuiSignTransactionInput } from "@mysten/wallet-standard";
import { UiWallet, UiWalletAccount } from "@wallet-standard/ui";
import { Transaction } from "@mysten/sui/transactions";
import { ClientWithCoreApi, SuiClientTypes } from "@mysten/sui/client";

//#region src/utils/storage.d.ts
type StateStorage = {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => unknown | Promise<unknown>;
  removeItem: (name: string) => unknown | Promise<unknown>;
};
//#endregion
//#region src/wallets/index.d.ts
type InitializeArgs = {
  networks: Networks;
  getClient: (network?: Networks[number]) => DAppKitCompatibleClient;
};
type InitializeResult = {
  unregister: () => void;
};
type WalletInitializer = {
  id: string;
  initialize(input: InitializeArgs): InitializeResult | Promise<InitializeResult>;
};
//#endregion
//#region src/core/types.d.ts
type DAppKitCompatibleClient = ClientWithCoreApi;
type SlushWalletConfig = {
  /**
   * The name of your application, shown to the user when connecting to the wallet.
   * @default The value of the `<meta name="application-name">` tag, or `document.title` if the meta tag is not populated.
   */
  appName?: string;
  /**
   * The host origin of the wallet.
   * @default https://my.slush.app
   */
  origin?: string;
  /**
   * The URL to fetch the wallet metadata from.
   * @default https://api.slush.app/api/wallet/metadata
   */
  metadataApiUrl?: string;
};
type CreateDAppKitOptions<TNetworks extends Networks, Client extends DAppKitCompatibleClient> = {
  /**
   * Enables automatically connecting to the most recently used wallet account.
   * @default `true`
   */
  autoConnect?: boolean;
  /**
   * A list of networks supported by the application.
   */
  networks: TNetworks;
  /**
   * Creates a new client instance for the given network.
   *
   * @param network - A supported network identifier as defined by the `networks` field.
   * @returns A `DAppKitCompatibleClient` that’s pre-configured to interact with the specified network.
   */
  createClient: (network: TNetworks[number]) => Client;
  /**
   * The name of the network to use by default.
   * @default The first network specified in `networks`.
   */
  defaultNetwork?: TNetworks[number];
  /**
   * Configuration options for the Slush web wallet. Set to `null` to disable the wallet entirely.
   */
  slushWalletConfig?: SlushWalletConfig | null;
  /**
   * Enables a "burner" wallet when set to `true`. This setting is intended for development and testing only.
   * @default `false`
   */
  enableBurnerWallet?: boolean;
  /**
   * Configures how the most recently connected to wallet account is stored. Set to `null` to disable persisting state entirely.
   * @default `localStorage` if available
   */
  storage?: StateStorage | null;
  /**
   * The key to use to store the most recently connected wallet account.
   * @default `mysten-dapp-kit:selected-wallet-and-address`
   */
  storageKey?: string;
  /**
   * A list of wallet initializers used for registering additional wallet standard wallets.
   */
  walletInitializers?: WalletInitializer[];
};
//#endregion
//#region src/utils/networks.d.ts
type Networks = SuiClientTypes.Network[];
//#endregion
//#region src/core/store.d.ts
type InternalWalletConnection = {
  status: 'disconnected' | 'connecting';
  currentAccount: null;
} | {
  status: 'reconnecting' | 'connected';
  currentAccount: UiWalletAccount;
  supportedIntents: string[];
};
type DAppKitStores<TNetworks extends Networks = Networks, Client extends DAppKitCompatibleClient = DAppKitCompatibleClient> = ReturnType<typeof createStores<TNetworks, Client>>;
type WalletConnection = StoreValue<DAppKitStores['$connection']>;
declare function createStores<TNetworks extends Networks = [], Client extends DAppKitCompatibleClient = DAppKitCompatibleClient>({
  defaultNetwork,
  getClient
}: {
  defaultNetwork: TNetworks[number];
  getClient: (network: TNetworks[number]) => Client;
}): {
  $currentNetwork: nanostores0.PreinitializedWritableAtom<TNetworks[number]> & object;
  $registeredWallets: nanostores0.PreinitializedWritableAtom<UiWallet[]> & object;
  $compatibleWallets: nanostores0.ReadableAtom<UiWallet[]>;
  $baseConnection: nanostores0.PreinitializedMapStore<InternalWalletConnection> & object;
  $currentClient: nanostores0.ReadableAtom<Client>;
  $connection: nanostores0.ReadableAtom<{
    readonly wallet: UiWallet;
    readonly account: UiWalletAccount;
    readonly status: "connected";
    readonly supportedIntents: string[];
    readonly isConnected: true;
    readonly isConnecting: false;
    readonly isReconnecting: false;
    readonly isDisconnected: false;
  } | {
    readonly wallet: null;
    readonly account: null;
    readonly status: "connecting";
    readonly supportedIntents: readonly [];
    readonly isConnected: false;
    readonly isConnecting: true;
    readonly isReconnecting: false;
    readonly isDisconnected: false;
  } | {
    readonly wallet: UiWallet;
    readonly account: UiWalletAccount;
    readonly status: "reconnecting";
    readonly supportedIntents: string[];
    readonly isConnected: false;
    readonly isConnecting: false;
    readonly isReconnecting: true;
    readonly isDisconnected: false;
  } | {
    readonly wallet: null;
    readonly account: null;
    readonly status: "disconnected";
    readonly supportedIntents: readonly [];
    readonly isConnected: false;
    readonly isConnecting: false;
    readonly isReconnecting: false;
    readonly isDisconnected: true;
  }>;
};
//#endregion
//#region src/core/actions/connect-wallet.d.ts
type ConnectWalletArgs = {
  /** The wallet to connect to. */
  wallet: UiWallet;
  /**
   * An optional account to set as the selected account.
   * @default The first authorized account.
   */
  account?: UiWalletAccount;
} & Omit<StandardConnectInput, 'silent'>;
//#endregion
//#region src/core/actions/switch-account.d.ts
type SwitchAccountArgs = {
  /** The account to switch to. */
  account: UiWalletAccount;
};
//#endregion
//#region src/core/actions/sign-personal-message.d.ts
type SignPersonalMessageArgs = Omit<SuiSignPersonalMessageInput, 'account' | 'chain'>;
//#endregion
//#region src/utils/transaction-result.d.ts
type TransactionResultWithEffects = SuiClientTypes.TransactionResult<{
  effects: true;
  transaction: true;
  bcs: true;
}>;
//#endregion
//#region src/core/actions/sign-and-execute-transaction.d.ts
type SignAndExecuteTransactionArgs = {
  transaction: Transaction | string;
} & Omit<SuiSignAndExecuteTransactionInput, 'account' | 'chain' | 'transaction'>;
type SignAndExecuteTransactionResult = TransactionResultWithEffects;
//#endregion
//#region src/core/actions/sign-transaction.d.ts
type SignTransactionArgs = {
  transaction: Transaction | string;
} & Omit<SuiSignTransactionInput, 'account' | 'chain' | 'transaction'>;
//#endregion
//#region src/core/index.d.ts
type DAppKit<TNetworks extends Networks = [], Client extends DAppKitCompatibleClient = DAppKitCompatibleClient> = {
  networks: TNetworks;
  getClient: (network?: TNetworks[number]) => Client;
  signTransaction: (args: SignTransactionArgs) => Promise<SignedTransaction>;
  signAndExecuteTransaction: (args: SignAndExecuteTransactionArgs) => Promise<SignAndExecuteTransactionResult>;
  signPersonalMessage: (args: SignPersonalMessageArgs) => Promise<SignedPersonalMessage>;
  connectWallet: (args: ConnectWalletArgs) => Promise<{
    accounts: UiWalletAccount[];
  }>;
  disconnectWallet: () => Promise<void>;
  switchAccount: (args: SwitchAccountArgs) => void;
  switchNetwork: (network: TNetworks[number]) => void;
  stores: {
    $wallets: DAppKitStores['$compatibleWallets'];
    $connection: DAppKitStores['$connection'];
    $currentNetwork: ReadableAtom<TNetworks[number]>;
    $currentClient: ReadableAtom<Client>;
  };
};
declare function createDAppKit<TNetworks extends Networks = Networks, Client extends DAppKitCompatibleClient = DAppKitCompatibleClient>({
  autoConnect,
  networks,
  createClient,
  defaultNetwork,
  enableBurnerWallet,
  slushWalletConfig,
  storage,
  storageKey,
  walletInitializers
}: CreateDAppKitOptions<TNetworks, Client>): DAppKit<TNetworks, Client>;
//#endregion
//#region src/types.d.ts
interface Register {}
type ResolvedRegister = {
  dAppKit: Register extends {
    dAppKit: infer _DAppKit;
  } ? _DAppKit : DAppKit<[]>;
};
type RegisteredDAppKit = ResolvedRegister['dAppKit'];
type DefaultExpectedDppKit = DAppKit<[]> extends RegisteredDAppKit ? DAppKit<any> : RegisteredDAppKit;
//#endregion
export { DAppKit as a, DAppKitCompatibleClient as c, ResolvedRegister as i, StateStorage as l, Register as n, createDAppKit as o, RegisteredDAppKit as r, WalletConnection as s, DefaultExpectedDppKit as t };
//# sourceMappingURL=types-x68aipir.d.mts.map