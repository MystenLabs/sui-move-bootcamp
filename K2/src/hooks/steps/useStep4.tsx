import { useLiveTransaction } from "../useLiveTransaction";
import { useWallet } from "../useWallet";

export const useStep4 = () => {
    const { refreshBalance, resetWallet } = useWallet();
    const { onSetRecipientAddress, refreshRecipientBalance, sendSui, resetLiveTransaction } = useLiveTransaction();

    const resetStep4 = () => {
        resetWallet();
        resetLiveTransaction();
    };

    return {
        refreshBalance,
        refreshRecipientBalance,
        onSetRecipientAddress,
        sendSui,
        resetStep4
    };
};
