import * as React from "react";
import { createContext, useContext } from "react";
import { createComponent } from "@lit/react";
import { DAppKitConnectButton, DAppKitConnectModal } from "@mysten/dapp-kit-core/web";
import { jsx } from "react/jsx-runtime";
import { useStore } from "@nanostores/react";

export * from "@mysten/dapp-kit-core"

//#region src/components/DAppKitProvider.tsx
const DAppKitContext = createContext(null);
function DAppKitProvider({ dAppKit, children }) {
	return /* @__PURE__ */ jsx(DAppKitContext.Provider, {
		value: dAppKit,
		children
	});
}

//#endregion
//#region src/hooks/useDAppKit.ts
function useDAppKit(dAppKit) {
	const contextValue = useContext(DAppKitContext);
	if (dAppKit) return dAppKit;
	if (!contextValue) throw new Error("Could not find DAppKitContext. Ensure that you have set up the `DAppKitProvider` component.");
	return contextValue;
}

//#endregion
//#region src/components/ConnectButton.tsx
const ConnectButtonComponent = createComponent({
	react: React,
	tagName: "mysten-dapp-kit-connect-button",
	elementClass: DAppKitConnectButton
});
function ConnectButton({ instance, ...props }) {
	const dAppKit = useDAppKit(instance);
	return /* @__PURE__ */ jsx(ConnectButtonComponent, {
		...props,
		instance: dAppKit
	});
}

//#endregion
//#region src/components/ConnectModal.tsx
const ConnectModalComponent = createComponent({
	react: React,
	tagName: "mysten-dapp-kit-connect-modal",
	elementClass: DAppKitConnectModal
});
function ConnectModal({ instance, ...props }) {
	const dAppKit = useDAppKit(instance);
	return /* @__PURE__ */ jsx(ConnectModalComponent, {
		...props,
		instance: dAppKit
	});
}

//#endregion
//#region src/hooks/useWallets.ts
function useWallets({ dAppKit } = {}) {
	return useStore(useDAppKit(dAppKit).stores.$wallets);
}

//#endregion
//#region src/hooks/useWalletConnection.ts
function useWalletConnection({ dAppKit } = {}) {
	return useStore(useDAppKit(dAppKit).stores.$connection);
}

//#endregion
//#region src/hooks/useCurrentAccount.ts
function useCurrentAccount({ dAppKit } = {}) {
	return useWalletConnection({ dAppKit }).account;
}

//#endregion
//#region src/hooks/useCurrentWallet.ts
function useCurrentWallet({ dAppKit } = {}) {
	return useWalletConnection({ dAppKit }).wallet;
}

//#endregion
//#region src/hooks/useCurrentClient.ts
function useCurrentClient({ dAppKit } = {}) {
	return useStore(useDAppKit(dAppKit).stores.$currentClient);
}

//#endregion
//#region src/hooks/useCurrentNetwork.ts
function useCurrentNetwork({ dAppKit } = {}) {
	return useStore(useDAppKit(dAppKit).stores.$currentNetwork);
}

//#endregion
export { ConnectButton, ConnectModal, DAppKitProvider, useCurrentAccount, useCurrentClient, useCurrentNetwork, useCurrentWallet, useDAppKit, useWalletConnection, useWallets };
//# sourceMappingURL=index.mjs.map