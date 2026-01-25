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

        const balance = { totalBalance: 0 }; // use suiClient to get balance

        liveTransaction.setRecipientBalance(balance.totalBalance.toString());
        setIsRefreshing(false);
    }

    const sendSui = async (amount: number, recipientAddress: string) => {
        // prepare transaction
        console.log("0. Prepare the transaction object");
        // const tx = ?

        console.log("1. Set sender of tx: the wallet");
        // tx.ACTION(_SENDER_);

        console.log("2. Add call: Split SUI Coins using tx.gas as coin, and amount * 10 ** 9 as amount; output the first [coin] as const");
        // const [coin] = tx.ACTION(COIN, AMOUNT);

        console.log("3. Add call: Transfer Objects to transfer the coin");
        // tx.ACTION([coin], recipientAddress);

        console.log("4. Sign Tx via Ephemeral Key Pair");
        /*
            const { bytes: txBytes, signature: userSignature } = await tx.sign({
                client: ?,
                signer: ?,
            });
        */
        console.log("5. Get the zkLogin signature");
        /*
            const zkLoginSignature = FUNCTION({
                inputs: {
                    ...?,
                    addressSeed: ?,
                },
                maxEpoch: ?,
                userSignature: ?,
            });
        */

        console.log("6. Execute Tx and return");
        /*
            return await ?.executeTransactionBlock({
                transactionBlock: ?,
                signature: ?,
            });
        */
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