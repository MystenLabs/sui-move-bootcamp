import { useAppContext } from "../contexts/AppContext";
import { fetchZkProof, randomnessToBase64, saltToBase64 } from "../utils/zk";
import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';

export const useZkProof = () => {
    const { salt, ephemeral, jwt, zkProof } = useAppContext();

    const preparePayload = () => {
        return {
            jwt: "JWT TOKEN?",
            extendedEphemeralPublicKey: "EXTENDED PUBLIC KEY?",
            maxEpoch: "MAX EPOCH?",
            jwtRandomness: randomnessToBase64("RANDOMNESS?"),
            salt: saltToBase64("SALT?"),
            keyClaimName: 'sub'
        }
    }

    const getZkProof = async () => {
        const proof = await fetchZkProof(preparePayload());
        zkProof.set(proof);
    }

    const resetZkProof = () => {
        zkProof.set(null);
    }

    return { getZkProof, resetZkProof }
}