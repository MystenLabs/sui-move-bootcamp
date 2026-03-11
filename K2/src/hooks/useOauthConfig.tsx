import { CONFIG } from "../config";
import { useAppContext } from "../contexts/AppContext";
import { getOauthUrl } from "../utils/oauth";

export const useOauthConfig = () => {
    const { oauth, ephemeral } = useAppContext();

    const configureOauth = () => {
        const providerName = CONFIG.oauth.providerName;
        const clientId = CONFIG.oauth.clientId;
        const url = getOauthUrl(CONFIG.oauth, ephemeral.nonce!);

        oauth.setProvider(providerName); // ZKLogin supports multiple providers, but for simplicity and demonstration purposes, we only support one provider for now
        oauth.setClientId(clientId);
        oauth.setUrl(url);
    }

    const resetOauthConfig = () => {
        if (oauth.provider || oauth.url) {
            oauth.setProvider(null);
            oauth.setClientId(null);
            oauth.setUrl(null);
        }
    }

    return { configureOauth, resetOauthConfig };
}
