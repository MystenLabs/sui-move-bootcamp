import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { CONFIG } from "../config";
import { useAppContext } from "../contexts/AppContext";

export const suiClient = new SuiClient({ url: getFullnodeUrl(CONFIG.app.network) });

export const useAppConfig = () => {
    const { network, salt } = useAppContext();

    const configureApp = () => {
        // configure: network, and salt based on config
        const _network = "Not Implemented";
        const _salt = "Not Implemented";

        network.set(_network);
        salt.set(_salt);
    }

    const resetApp = () => {
        if(network.value || salt.value) {
            network.set(null);
            salt.set(null);
        }
    }

    return { configureApp, resetApp };
}
