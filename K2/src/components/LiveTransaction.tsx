import { FaArrowRight, FaCheck, FaCoins, FaExternalLinkAlt, FaPaperPlane, FaSync, FaWallet } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../contexts/AppContext';
import { useLiveTransaction } from '../hooks/useLiveTransaction';
import { useWallet } from '../hooks/useWallet';
import { TOAST_OPTIONS } from '../utils/constants';

const handleMintTokens = () => {
    window.open('https://faucet.sui.io/?network=devnet', '_blank');
};

const validateAddress = (address: string) => {
    return /^0x[0-9a-f]{64}$/i.test(address);
};

const LiveTransaction = () => {
    const { wallet, liveTransaction } = useAppContext();
    const { refreshBalance } = useWallet();
    const {
        recipientAddress, setRecipientAddress, sendAmount, setSendAmount,
        isAddressConfirmed, setIsAddressConfirmed, isRefreshing, isRefreshingMyBalance, setIsRefreshingMyBalance, isConfirming, setIsConfirming, isSending, setIsSending,
        onSetRecipientAddress, refreshRecipientBalance, sendSui
    } = useLiveTransaction();

    const handleSend = async () => {
        if (!sendAmount || !isAddressConfirmed) return;
        setIsSending(true);
        await sendSui(parseFloat(sendAmount), recipientAddress);
        await refreshBalance();
        await refreshRecipientBalance();
        setIsSending(false);
        toast.success('Transaction sent successfully! Balances updated.', TOAST_OPTIONS);
    };

    const handleConfirmAddress = async () => {
        if (!recipientAddress || !validateAddress(recipientAddress)) {
            toast.error('Please enter a valid SUI address (0x + 64 hex characters)', TOAST_OPTIONS);
            return;
        }
        setIsConfirming(true);
        onSetRecipientAddress(recipientAddress);
        setIsAddressConfirmed(true);
        setIsConfirming(false);
        toast.success('Recipient address confirmed! Balance loaded.', TOAST_OPTIONS);
    };

    const handleRefreshMyBalance = async () => {
        setIsRefreshingMyBalance(true);
        await refreshBalance();
        setIsRefreshingMyBalance(false);
    };

    const resetRecipient = () => {
        setIsAddressConfirmed(false);
        setRecipientAddress('');
        liveTransaction.setRecipientAddress(null);
        liveTransaction.setRecipientBalance(null);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-3">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Live example: Transfer Sui Tokens from your wallet to another
                </h2>
                <p className="text-[var(--text-secondary)] text-xs">
                    Experience zkLogin in action with real token transfers
                </p>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Panel - Your Wallet */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700/50 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg">
                                <FaWallet className="text-lg text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-base font-semibold text-[var(--text-primary)]">Your Wallet</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-[var(--text-muted)] mb-1">Wallet Address</p>
                                <p className="text-xs font-mono text-[var(--text-secondary)] break-all">
                                    {wallet.address || '0x1234567890abcdef1234567890abcdef12345678'}
                                </p>
                            </div>

                            <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-[var(--text-muted)] mb-1">SUI Balance</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {wallet.balance ? (parseFloat(wallet.balance) / 10**9).toFixed(3) : '0.000'} SUI
                                    </p>
                                    <button
                                        onClick={handleRefreshMyBalance}
                                        disabled={isRefreshingMyBalance}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors disabled:opacity-50"
                                    >
                                        <FaSync className={`text-xs ${isRefreshingMyBalance ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-[var(--text-primary)]">
                                    Amount to Send (SUI)
                                </label>
                                <input
                                    type="number"
                                    value={sendAmount}
                                    onChange={(e) => setSendAmount(e.target.value)}
                                    placeholder="0.1"
                                    step="0.001"
                                    min="0"
                                    className="w-full px-3 py-2 text-sm bg-white/80 dark:bg-black/30 border border-blue-200 dark:border-blue-700/50 rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                                />
                            </div>

                            <button
                                onClick={handleSend}
                                disabled={!sendAmount || !isAddressConfirmed || isSending}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>
                                        <FaSync className="text-xs animate-spin" />
                                        Submitting Transaction...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="text-xs" />
                                        Send SUI
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Recipient */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700/50 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg">
                                <FaPaperPlane className="text-lg text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-base font-semibold text-[var(--text-primary)]">Recipient</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-[var(--text-primary)]">
                                    Recipient Address
                                </label>
                                <textarea
                                    value={recipientAddress}
                                    onChange={(e) => {
                                        setRecipientAddress(e.target.value);
                                        if (isAddressConfirmed) {
                                            resetRecipient();
                                        }
                                    }}
                                    placeholder="0x..."
                                    rows={3}
                                    disabled={isAddressConfirmed}
                                    className={`w-full px-3 py-2 text-sm bg-white/80 dark:bg-black/30 border rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:border-transparent resize-none backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                                        isAddressConfirmed
                                            ? 'border-green-400 dark:border-green-500'
                                            : 'border-purple-200 dark:border-purple-700/50 focus:ring-purple-500'
                                    }`}
                                />
                            </div>

                            {!isAddressConfirmed ? (
                                <button
                                    onClick={handleConfirmAddress}
                                    disabled={!recipientAddress || !validateAddress(recipientAddress) || isConfirming}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    {isConfirming ? (
                                        <>
                                            <FaSync className="text-xs animate-spin" />
                                            Confirming...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheck className="text-xs" />
                                            Confirm Address
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="space-y-2">
                                    <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs text-[var(--text-muted)]">Recipient Balance</p>
                                            <button
                                                onClick={() => refreshRecipientBalance()}
                                                disabled={isRefreshing}
                                                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors disabled:opacity-50"
                                            >
                                                <FaSync className={`text-xs ${isRefreshing ? 'animate-spin' : ''}`} />
                                            </button>
                                        </div>
                                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                            {liveTransaction.recipientBalance ? (parseFloat(liveTransaction.recipientBalance) / 10**9).toFixed(3) : '0.000'} SUI
                                        </p>
                                    </div>
                                    
                                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg backdrop-blur-sm border border-green-300 dark:border-green-700/50">
                                        <div className="flex items-center gap-2">
                                            <FaCheck className="text-xs text-green-600 dark:text-green-400" />
                                            <p className="text-xs font-medium text-green-700 dark:text-green-300">
                                                Address confirmed and ready
                                            </p>
                                        </div>
                                        <button
                                            onClick={resetRecipient}
                                            className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline mt-1"
                                        >
                                            Change address
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Arrow in center */}
                <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg border-4 border-white dark:border-gray-800">
                        <FaArrowRight className="text-white text-lg" />
                    </div>
                </div>
            </div>

            {/* Mint Tokens Button */}
            <div className="text-center">
                <button
                    onClick={handleMintTokens}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-500 text-white font-medium py-3 px-6 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                    <FaCoins className="text-sm" />
                    Mint Devnet SUI Tokens
                    <FaExternalLinkAlt className="text-xs" />
                </button>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                    Get free testnet SUI tokens from the official faucet
                </p>
            </div>
        </div>
    );
};

export default LiveTransaction;
