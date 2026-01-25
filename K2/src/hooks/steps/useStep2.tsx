import { useEffect, useState } from "react";
import { SiGoogle } from "react-icons/si";
import { toast } from "react-toastify";
import { useAppContext } from "../../contexts/AppContext";
import { TOAST_OPTIONS } from "../../utils/constants";
import { getProceedButton, uppercaseFirstLetter } from "../../utils/generic";
import { useOauthConfig } from "../useOauthConfig";
import { useOauthLogin } from "../useOauthLogin";

export const useStep2 = (onNext: () => void) => {
    const [internalStep, setInternalStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const { oauth, jwt } = useAppContext();
    const { configureOauth, resetOauthConfig } = useOauthConfig();
    const { performOauthLogin, resetOauthLogin } = useOauthLogin();
    const [proceedButton, setProceedButton] = useState(<></>);

    const internalStep1 = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake timeout
        configureOauth();
        toast.success('Oauth was configured! Check the debug panel for the details.', TOAST_OPTIONS);
        setLoading(false);
        setInternalStep(1);
    }
    const internalStep2 = async () => {
        setLoading(true);
        await performOauthLogin(oauth.url!);
    }

    const processInternalStep = async () => {
        switch (internalStep) {
            case 0: // App Config
                await internalStep1();
                break;
            case 1: // Ephemeral Keypair Generation
                await internalStep2();
                break;
            default:
                onNext(); // Next step(external) callback
                break;
        }
    }

    useEffect(() => {
        if (internalStep == 1 && jwt.token) {
            setLoading(false);
            toast.success('Oauth token was received, you are now connected! Check the debug panel for the details.', TOAST_OPTIONS);
            setInternalStep(2);
        }
    }, [jwt.token]);

    useEffect(() => {
        setProceedButton(getProceedButton(
            loading,
            [
                "⚙️ Configure OAuth",
                <><SiGoogle /> Connect with {uppercaseFirstLetter(oauth.provider || "-")}</>
            ],
            internalStep,
            processInternalStep
        ));
    }, [loading, internalStep]);

    useEffect(() => {

        // reset configs for this step on mount if they were assigned before(e.g. getting back to home)
        resetOauthConfig();
        resetOauthLogin();

        // fake loading on step load
        async function hideFakeLoading() {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // fake timeout
            setLoading(false);
        }
        hideFakeLoading();
    }, []);

    return { proceedButton, processInternalStep };
};
