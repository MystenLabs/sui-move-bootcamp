import { useAppContext } from "../contexts/AppContext";

export const useWallet = () => {
    const { wallet } = useAppContext();

    const getWallet = async () => {
        const address = "Not Implemented"; // use jwtToAddress helper function
        const addressSeed = "Not Implemented"; // useGenAddressSeed helper function

        wallet.setAddress(address);
        wallet.setAddressSeed(addressSeed);
        await refreshBalance(address);
    }

    const refreshBalance = async (_address?: string) => {
        const address = _address ?? wallet.address!;
        void address;
        const balance = { totalBalance: 0 }; // use suiReadClient.getSuiBalance(address)
        wallet.setBalance(balance.totalBalance.toString());
    }

    const resetWallet = () => {
        wallet.setAddress(null);
        wallet.setBalance(null);
        wallet.setAddressSeed(null);
    }

    return { getWallet, resetWallet, refreshBalance };
}
