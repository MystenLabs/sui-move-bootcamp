import type { PublicKey } from "@mysten/sui/cryptography";
import type { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

interface AppContextType {
    currentStep: {
        value: number;
        set: (step: number) => void;
    },
    network: {
        value: string | null,
        set: (network: string | null) => void;
    }
    salt: {
        value: string | null;
        set: (salt: string | null) => void;
    },
    oauth: {
        provider: string | null;
        setProvider: (provider: string | null) => void;
        clientId: string | null;
        setClientId: (clientId: string | null) => void;
        url: string | null;
        setUrl: (url: string | null) => void;
    },
    ephemeral: {
        publicKey: PublicKey | null;
        setPublicKey: (publicKey: PublicKey | null) => void;
        randomness: string | null;
        setRandomness: (randomness: string | null) => void;
        nonce: string | null;
        setNonce: (nonce: string | null) => void;
        maxEpoch: number | null;
        setMaxEpoch: (maxEpoch: number | null) => void;
        keypair: Ed25519Keypair | null;
        setKeypair: (keypair: Ed25519Keypair | null) => void;
    },
    jwt: {
        token: string | null;
        aud: string | null;
        iss: string | null;
        sub: string | null;
        nonce: string | null;
        // all-in-one setter and destroyer
        set: (token: string | null) => void;
        destroy: () => void;
    },
    zkProof: {
        value: any | null;
        set: (zkProof: any | null) => void;
    },
    wallet: {
        address: string | null,
        setAddress: (address: string | null) => void;
        balance: string | null,
        setBalance: (balance: string | null) => void;
        addressSeed: string | null;
        setAddressSeed: (addressSeed: string | null) => void;
    },
    liveTransaction: {
        suiAmount: number | null,
        setSuiAmount: (amount: number | null) => void;
        recipientAddress: string | null,
        setRecipientAddress: (address: string | null) => void;
        recipientBalance: string | null,
        setRecipientBalance: (balance: string | null) => void;
    }
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [jwt, _setJwt] = useState<string | null>(null);
    const [aud, _setAud] = useState<string | null>(null);
    const [iss, _setIss] = useState<string | null>(null);
    const [sub, _setSub] = useState<string | null>(null);
    const [jwtNonce, _setJwtNonce] = useState<string | null>(null);
    const [oauthProvider, setOauthProvider] = useState<string | null>(null);
    const [oauthClientId, setOauthClientId] = useState<string | null>(null);
    const [oauthUrl, setOauthUrl] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [addressSeed, setAddressSeed] = useState<string | null>(null);
    const [maxEpoch, setMaxEpoch] = useState<number | null>(null);
    const [nonce, setNonce] = useState<string | null>(null);
    const [randomness, setRandomness] = useState<string | null>(null);
    const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [salt, setSalt] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [zkProof, setZkProof] = useState<string | null>(null);
    const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
    const [recipientBalance, setRecipientBalance] = useState<string | null>(null);
    const [suiAmount, setSuiAmount] = useState<number | null>(null);

    const setJwt = (token: string | null) => {
        _setJwt(token);

        if (!token) {
            _setAud(null);
            _setIss(null);
            _setSub(null);
            _setJwtNonce(null);
            return;
        }

        const parsedJwt = jwtDecode(token);
        _setAud(parsedJwt.aud as string);
        _setIss(parsedJwt.iss as string);
        _setSub(parsedJwt.sub as string);
        _setJwtNonce((parsedJwt as unknown as { nonce: string }).nonce as string);
    }

    return (
        <AppContext.Provider value={{
            currentStep: {
                value: currentStep,
                set: setCurrentStep
            },
            network: {
                value: network,
                set: setNetwork
            },
            salt: {
                value: salt,
                set: setSalt
            },
            oauth: {
                provider: oauthProvider,
                setProvider: setOauthProvider,
                clientId: oauthClientId,
                setClientId: setOauthClientId,
                url: oauthUrl,
                setUrl: setOauthUrl
            },
            ephemeral: {
                publicKey: publicKey,
                setPublicKey: setPublicKey,
                randomness: randomness,
                setRandomness: setRandomness,
                nonce: nonce,
                setNonce: setNonce,
                maxEpoch: maxEpoch,
                setMaxEpoch: setMaxEpoch,
                keypair: keypair,
                setKeypair: setKeypair
            },
            jwt: {
                token: jwt,
                aud: aud,
                iss: iss,
                sub: sub,
                nonce: jwtNonce,
                set: setJwt,
                destroy: () => setJwt(null),
            },
            zkProof: {
                value: zkProof,
                set: setZkProof,
            },
            wallet: {
                address: address,
                setAddress: setAddress,
                balance: balance,
                setBalance: setBalance,
                addressSeed: addressSeed,
                setAddressSeed: setAddressSeed
            },
            liveTransaction: {
                suiAmount: suiAmount,
                setSuiAmount: setSuiAmount,
                recipientAddress: recipientAddress,
                setRecipientAddress: setRecipientAddress,
                recipientBalance: recipientBalance,
                setRecipientBalance: setRecipientBalance
            }
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }

    return context;
}

export { AppProvider, useAppContext };
