import { CONFIG } from "../config";
import { useAppContext } from "../contexts/AppContext";

export const useAppConfig = () => {
    const { network, salt } = useAppContext();

    const configureApp = () => {
        // configure: network, and salt based on config
        const _network = CONFIG.app.network;
        const _salt = CONFIG.app.salt;

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
