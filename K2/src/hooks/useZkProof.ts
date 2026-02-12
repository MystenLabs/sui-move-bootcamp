import { useAppContext } from "../contexts/AppContext";
import { fetchZkProof, randomnessToBase64, saltToBase64 } from "../utils/zk";
import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';

export const useZkProof = () => {
    const { salt, ephemeral, jwt, zkProof } = useAppContext();

    const preparePayload = () => {
        return {
            jwt: jwt.token,
            extendedEphemeralPublicKey: getExtendedEphemeralPublicKey(ephemeral.publicKey!),
            maxEpoch: ephemeral.maxEpoch?.toString(),
            jwtRandomness: randomnessToBase64(ephemeral.randomness!),
            salt: saltToBase64(salt.value!),
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