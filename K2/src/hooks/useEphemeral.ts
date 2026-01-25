import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { generateNonce, generateRandomness } from "@mysten/sui/zklogin";
import { useAppContext } from "../contexts/AppContext";
import { suiClient } from "./useAppConfig";
import { CONFIG } from "../config";

// Get the current epoch for the given network
const getEpoch = async () => {
    const { epoch } = { epoch: "0" }; // get epoch from sui client "getLatestSuiSystemState"
    return Number(epoch);
}

export const useEphemeral = () => {
    const { ephemeral } = useAppContext();

    const generateEphemeral = async () => {
        // Generate: ephemeral key pair, public key, randomness, nonce, and max epoch.
        const ephemeralKeyPair = "Not Implemented";
        const publicKey = "Not Implemented";
        const randomness = "Not Implemented";
        const maxEpoch = (await getEpoch()) + 0; // max epoch is current epoch + ephemeral key duration in config
        const nonce = "Not Implemented";

        // Update values in context
        ephemeral.setKeypair(ephemeralKeyPair);
        ephemeral.setPublicKey(publicKey);
        ephemeral.setRandomness(randomness);
        ephemeral.setNonce(nonce);
        ephemeral.setMaxEpoch(maxEpoch);
    }

    const resetEphemeral = () => {
        if (ephemeral.maxEpoch || ephemeral.nonce || ephemeral.publicKey) {
            ephemeral.setKeypair(null);
            ephemeral.setPublicKey(null);
            ephemeral.setRandomness(null);
            ephemeral.setNonce(null);
            ephemeral.setMaxEpoch(null);
        }
    }

    return { generateEphemeral, resetEphemeral }
}
