import { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { openOauthPopup } from "../utils/oauth";

export const useOauthLogin = () => {
    const { jwt } = useAppContext();
    
    const handleJwtToken = (jwtToken: string) => {
        jwt.set(jwtToken);
    }

    const listener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data.type === "GOOGLE_TOKEN") {
            window.removeEventListener("message", listener);
            handleJwtToken(event.data.token);
        }
    };

    const performOauthLogin = async (providerUrl: string) => {
        openOauthPopup(providerUrl);
        window.addEventListener("message", listener);
    };

    const resetOauthLogin = () => {
        window.removeEventListener("message", listener);
        jwt.destroy();
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("message", listener);
        };
    }, []);

    return { performOauthLogin, resetOauthLogin };
}
