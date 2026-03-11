import { genAddressSeed, jwtToAddress } from "@mysten/sui/zklogin";
import { useAppContext } from "../contexts/AppContext";
import { suiReadClient } from "../services/sui";

export const useWallet = () => {
    const { wallet, jwt, salt } = useAppContext();

    const getWallet = async () => {
        const address = jwtToAddress(jwt.token!, salt.value!); // use jwtToAddress helper function
        const addressSeed = genAddressSeed(BigInt(salt.value!), 'sub', jwt.sub!, jwt.aud!).toString(); // useGenAddressSeed helper function

        wallet.setAddress(address);
        wallet.setAddressSeed(addressSeed);
        await refreshBalance(address);
    }

    const refreshBalance = async (_address?: string) => {
        const address = _address ?? wallet.address!;
        const balance = await suiReadClient.getSuiBalance(address);
        wallet.setBalance(balance);
    }

    const resetWallet = () => {
        wallet.setAddress(null);
        wallet.setBalance(null);
        wallet.setAddressSeed(null);
    }

    return { getWallet, resetWallet, refreshBalance };
}
