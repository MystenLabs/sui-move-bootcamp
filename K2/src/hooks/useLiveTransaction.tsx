import { useState } from "react";
import { getZkLoginSignature } from "@mysten/sui/zklogin";
import { useAppContext } from "../contexts/AppContext";
import { suiWriteClient } from "../services/sui";

export const useLiveTransaction = () => {
    const { wallet, ephemeral, zkProof, liveTransaction } = useAppContext();
    
    const [recipientAddress, setRecipientAddress] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isRefreshingMyBalance, setIsRefreshingMyBalance] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const onSetRecipientAddress = async (address: string) => {
        liveTransaction.setRecipientAddress(address);
        await refreshRecipientBalance(address);
    }

    const refreshRecipientBalance = async (_address?: string) => {
        const address = _address ?? liveTransaction.recipientAddress!;
        void address;
        setIsRefreshing(true);

        const balance = { totalBalance: 0 }; // use suiReadClient.getSuiBalance(address)

        liveTransaction.setRecipientBalance(balance.totalBalance.toString());
        setIsRefreshing(false);
    }

    const sendSui = async (amount: number, recipientAddress: string) => {
        const { bytes: txBytes, signature: userSignature } =
            await suiWriteClient.buildAndSignTransfer(
                wallet.address!,
                recipientAddress,
                Math.floor(amount * 10 ** 9),
                ephemeral.keypair!,
            );

        const zkLoginSignature = getZkLoginSignature({
            inputs: {
                ...zkProof.value!,
                addressSeed: wallet.addressSeed!,
            },
            maxEpoch: ephemeral.maxEpoch!.toString(),
            userSignature,
        });

        return await suiWriteClient.executeZkLoginTransaction(
            txBytes,
            zkLoginSignature,
        );
    }

    const resetLiveTransaction = () => {
        liveTransaction.setSuiAmount(null);
        liveTransaction.setRecipientAddress(null);
        liveTransaction.setRecipientBalance(null);
        setRecipientAddress('');
        setSendAmount('');
        setIsAddressConfirmed(false);
        setIsRefreshing(false);
        setIsRefreshingMyBalance(false);
        setIsConfirming(false);
        setIsSending(false);
    }

    return { 
        recipientAddress, setRecipientAddress, sendAmount, setSendAmount,
        isAddressConfirmed, setIsAddressConfirmed, isRefreshing, isRefreshingMyBalance, setIsRefreshingMyBalance, isConfirming, setIsConfirming, isSending, setIsSending,
        onSetRecipientAddress, refreshRecipientBalance, sendSui, resetLiveTransaction
    };
};