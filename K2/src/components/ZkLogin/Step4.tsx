import { FaCog, FaHome, FaMoneyBillWave, FaUsers, FaUserTie, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import LiveTransaction from '../LiveTransaction';

interface Step4Props {
    onComplete: () => void;
}

const Step4 = ({ onComplete }: Step4Props) => {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <FaCog className="text-3xl text-[var(--warning)]" />
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">Step 4: Transaction Execution</h2>
                </div>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                    Now comes the beautiful part! The user simply clicks a button and everything happens seamlessly under the hood.
                </p>
            </div>

            <div className="bg-[var(--gradient-card)] rounded-2xl p-8 border border-[var(--border)]">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-[var(--warning)] bg-opacity-20 rounded-full">
                            <FaCog className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Transaction Execution</h3>
                    </div>

                    <p className="text-[var(--text-secondary)] mb-6 text-justify">
                        Now comes the beautiful part! The user simply clicks a button (like "Send Tokens" or "Buy NFT") and everything happens seamlessly under the hood.<br /><br />

                        <b>Important:</b> There is only ONE wallet involved - the zkLogin address derived from your OAuth identity. The <b>ephemeral keypair</b> signs the transaction on behalf of this zkLogin wallet, and the <b>ZK proof</b> proves that the ephemeral key is authorized to act for the zkLogin address.<br /><br />

                        <span className="text-[var(--primary)] font-semibold">User sees nothing but a button!</span> No wallet popups, no seed phrases, no complex blockchain interactions - just a familiar web experience.
                    </p>

                    <div className="mb-6">
                        <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                            <FaUsers className="text-[var(--warning)]" />
                            Who Does What?
                        </h4>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <FaUserTie className="text-[var(--primary)]" />
                                    <span className="font-semibold text-sm">The Only Wallet: zkLogin Address</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mb-2">There is only ONE wallet - the zkLogin address derived from your OAuth identity (sub, iss, aud, user_salt)</p>
                                <p className="text-xs text-[var(--text-secondary)]">This address owns all your assets and is the sender of transactions</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <FaUserTie className="text-[var(--accent)]" />
                                    <span className="font-semibold text-sm">Who Signs?</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mb-2">The <b>Ephemeral Keypair</b> signs on behalf of the zkLogin address</p>
                                <p className="text-xs text-[var(--text-secondary)]">The ZK proof proves the ephemeral key is authorized to sign for the zkLogin wallet</p>
                            </div>
                            <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <FaMoneyBillWave className="text-[var(--success)]" />
                                    <span className="font-semibold text-sm">Who Owns Assets?</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mb-2">The <b>zkLogin Address</b> (your only wallet)</p>
                                <p className="text-xs text-[var(--text-secondary)]">All funds and NFTs belong to this single deterministic address</p>
                            </div>
                        </div>
                    </div>

                    <LiveTransaction />

                    <div className="bg-[var(--primary)] bg-opacity-10 p-4 rounded-xl border-l-4 border-[var(--primary)] mb-4">
                        <p className="text-sm text-[var(--text-secondary)]">
                            <strong className="text-[var(--text-primary)]">What's Next?</strong> You can now use this zkLogin address
                            for any Sui blockchain interactions, including DeFi, NFTs, gaming, and more - all without needing a traditional crypto wallet!
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-700/50 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <FaLightbulb className="text-2xl text-amber-600 dark:text-amber-400" />
                            <h4 className="font-bold text-lg text-[var(--text-primary)]">Pro Tip</h4>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                            <strong className="text-[var(--text-primary)]">Slush Wallet</strong> supports zkLogin natively and handles all the zkLogin logic for websites automatically. 
                            It allows users to register and login with OAuth by default, providing stable addresses through a secure, 
                            non-disclosed salt system - making zkLogin even easier for end users!
                        </p>
                        <div className="text-center">
                            <a
                                href="https://slush.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
                            >
                                Get Slush Wallet
                                <FaExternalLinkAlt className="text-xs" />
                            </a>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <button
                            onClick={onComplete}
                            className="bg-gradient-to-r from-[var(--success)] to-[var(--primary)] hover:from-[var(--primary)] hover:to-[var(--accent)] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                        >
                            <FaHome />
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4;
