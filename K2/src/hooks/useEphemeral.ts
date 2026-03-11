import { useAppContext } from "../contexts/AppContext";
import { suiReadClient } from "../services/sui";

// Get the current epoch for the given network
const getEpoch = async () => {
  return suiReadClient.getCurrentEpoch();
};

export const useEphemeral = () => {
  const { ephemeral } = useAppContext();

  const generateEphemeral = async () => {
    // Generate: ephemeral key pair, public key, randomness, nonce, and max epoch.
    const ephemeralKeyPair = null; // TODO
    const publicKey = null; // TOODO
    const randomness = "Not Implemented"; // TODO
    const maxEpoch = (await getEpoch()) + 0; // max epoch is current epoch + ephemeral key duration in config
    const nonce = "Not Implemented"; // TODO

    // Update values in context
    ephemeral.setKeypair(ephemeralKeyPair);
    ephemeral.setPublicKey(publicKey);
    ephemeral.setRandomness(randomness);
    ephemeral.setNonce(nonce);
    ephemeral.setMaxEpoch(maxEpoch);
  };

  const resetEphemeral = () => {
    if (ephemeral.maxEpoch || ephemeral.nonce || ephemeral.publicKey) {
      ephemeral.setKeypair(null);
      ephemeral.setPublicKey(null);
      ephemeral.setRandomness(null);
      ephemeral.setNonce(null);
      ephemeral.setMaxEpoch(null);
    }
  };

  return { generateEphemeral, resetEphemeral };
};
