import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { getZkLoginSignature } from "@mysten/sui/zklogin";
import { useAppContext } from "../contexts/AppContext";
import { suiClient } from "./useAppConfig";

export const useLiveTransaction = () => {
    const { wallet, ephemeral, zkProof, liveTransaction } = useAppContext();
    
    const [recipientAddress, setRecipientAddress] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isRefreshingMyBalance, setIsRefreshingMyBalance] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const onSetRecipientAddress = (address: string) => {
        liveTransaction.setRecipientAddress(address);
        refreshRecipientBalance(address);
    }

    const refreshRecipientBalance = async (_address?: string) => {
        const address = _address ?? liveTransaction.recipientAddress!;
        setIsRefreshing(true);

        const balance = await suiClient.getBalance({ owner: address }); // use suiClient to get balance

        liveTransaction.setRecipientBalance(balance.totalBalance.toString());
        setIsRefreshing(false);
    }

    const sendSui = async (amount: number, recipientAddress: string) => {
        // prepare transaction
        const tx = new Transaction();
        tx.setSender(wallet.address!);
        const [coin] = tx.splitCoins(tx.gas, [amount * 10 ** 9]); 
        tx.transferObjects([coin], recipientAddress);

        const { bytes: txBytes, signature: userSignature } = await tx.sign({
            client: suiClient,
            signer: ephemeral.keypair!,
        });

        const zkLoginSignature = getZkLoginSignature({
            inputs: {
                ...zkProof.value!,
                addressSeed: wallet.addressSeed!,
            },
            maxEpoch: ephemeral.maxEpoch!.toString(),
            userSignature: userSignature,
        });

        return await suiClient.executeTransactionBlock({
            transactionBlock: txBytes,
            signature: zkLoginSignature,
        });
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