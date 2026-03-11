import { useAppContext } from "../contexts/AppContext";
import { fetchZkProof, randomnessToBase64, saltToBase64 } from "../utils/zk";

export const useZkProof = () => {
  const { zkProof } = useAppContext();

  const preparePayload = () => {
    // TODO, All of these should be exposed through app context
    return {
      jwt: "JWT TOKEN?",
      extendedEphemeralPublicKey: "EXTENDED PUBLIC KEY?",
      maxEpoch: "MAX EPOCH?",
      jwtRandomness: randomnessToBase64("RANDOMNESS?"),
      salt: saltToBase64("SALT?"),
      keyClaimName: "sub",
    };
  };

  const getZkProof = async () => {
    const proof = await fetchZkProof(preparePayload());
    zkProof.set(proof);
  };

  const resetZkProof = () => {
    zkProof.set(null);
  };

  return { getZkProof, resetZkProof };
};
