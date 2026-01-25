import { useState } from 'react';
import { BiMath } from 'react-icons/bi';
import { FaArrowRight, FaChevronDown, FaChevronUp, FaCog, FaGoogle, FaKey, FaRocket, FaShieldAlt, FaUserShield } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { SiSui } from 'react-icons/si';
import { useNavigate } from 'react-router';
import { SUI_TEXT } from '../utils/constants';

const Home = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const handleStartDemo = () => {
        navigate('/zklogin');
    };

    const toggleFaq = (faqId: string) => {
        setOpenFaq(openFaq === faqId ? null : faqId);
    };

    return (
        <div className="mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <HiSparkles className="text-3xl text-[var(--accent)]" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                        Welcome to ZK Login Demo!
                    </h1>
                    <HiSparkles className="text-3xl text-[var(--accent)]" />
                </div>
                <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
                    Experience the future of Web3 authentication with zero-knowledge proofs and seamless OAuth(Google, Facebook, etc.) integration
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8">
                <div className="bg-[var(--gradient-card)] rounded-2xl p-8 border border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-[var(--primary)] bg-opacity-20 rounded-full">
                            <FaShieldAlt className="text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">What is ZkLogin?</h2>
                    </div>

                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                        ZKLogin is a revolutionary authentication system that allows users to create a {SUI_TEXT} wallet using their Google (or other OAuth providers) account and use it in the Blockchain, without the need of managing private keys or installing traditional blockchain wallets.<br /><br />

                        <span className="font-bold">How it works:</span> Your OAuth identity (Google account) is used to derive a deterministic {SUI_TEXT} address. An ephemeral keypair signs transactions on behalf of this address, and zero-knowledge proofs verify that the ephemeral key is authorized to act for your zkLogin wallet.<br /><br />

                        <span className="font-bold">Key Point:</span> You have <u>ONE wallet</u> - your zkLogin address. There are no separate wallets. Your Google account is just the login method to access your zkLogin wallet.
                        <br /><br />
                        This system enables users to experience a familiar login flow just like any other Web2 application, and can be used for many purposes like DeFi, NFTs, Gaming, and more.
                    </p>

                    <p className="text-[var(--text-primary)] font-semibold mb-4">
                        ZK Login achieves the following:
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="card-hover bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-start gap-3">
                            <div className="p-2 bg-[var(--primary)] bg-opacity-20 rounded-lg flex-shrink-0">
                                <SiSui className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Deterministic Wallet</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Your Google identity derives a consistent {SUI_TEXT} address</p>
                            </div>
                        </div>

                        <div className="card-hover bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-start gap-3">
                            <div className="p-2 bg-[var(--success)] bg-opacity-20 rounded-lg flex-shrink-0">
                                <FaUserShield className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Complete Privacy</h3>
                                <p className="text-sm text-[var(--text-secondary)]">No personal information stored on-chain</p>
                            </div>
                        </div>

                        <div className="card-hover bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-start gap-3">
                            <div className="p-2 bg-[var(--accent)] bg-opacity-20 rounded-lg flex-shrink-0">
                                <FaGoogle className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Familiar OAuth</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Login with Google - no new accounts or passwords</p>
                            </div>
                        </div>

                        <div className="card-hover bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-start gap-3">
                            <div className="p-2 bg-[var(--secondary)] bg-opacity-20 rounded-lg flex-shrink-0">
                                <FaRocket className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1">No Private Keys</h3>
                                <p className="text-sm text-[var(--text-secondary)]">No seed phrases or wallet management needed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-[var(--gradient-card)] rounded-2xl p-8 border border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-[var(--accent)] bg-opacity-20 rounded-full">
                            <FaKey className="text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {/* FAQ 1: What changes and what stays consistent */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('changes-consistent')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">What changes and what stays consistent?</span>
                                {openFaq === 'changes-consistent' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'changes-consistent' && (
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">🔄 Changes Every Session</h5>
                                            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                                <li>• <b>Nonce</b> - New value each login</li>
                                                <li>• <b>Ephemeral keypair</b> - New keys generated</li>
                                                <li>• <b>Max epoch</b> - Proof validity period</li>
                                                <li>• <b>JWT content</b> - New token each time</li>
                                            </ul>
                                            <p className="text-xs text-[var(--text-muted)] mt-2 italic">These are used only for ZK proof generation</p>
                                        </div>
                                        <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">🔒 Constant*<span className="text-xs text-gray-300 font-normal">(unless the app changes the params)</span></h5>
                                            <div className="mb-3">
                                                <p className="text-lg font-bold">- YOUR SUI ADDRESS</p>
                                            </div>
                                            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                                <li>• <b>sub</b> - Your unique user ID</li>
                                                <li>• <b>iss</b> - OAuth provider</li>
                                                <li>• <b>aud</b> - App client ID</li>
                                                <li>• <b>user_salt</b> - Your wallet salt</li>
                                            </ul>
                                            <p className="text-xs mt-2 italic">These determine your wallet address</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 2: When and how does the address change */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('address-change')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">Can my address change in an Application?</span>
                                {openFaq === 'address-change' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'address-change' && (
                                <div className="px-4 pb-4">

                                    Your zkLogin address ideally and more commonly(for example, in a DeFi application) stays the same unless an application changes its (usually)constant parameters.<br />
                                    More in depth, your wallet address changes ONLY if one of the deterministic parameters changes:
                                    <ul className="mt-1 ml-4 space-y-1">
                                        <li>• Different OAuth account (different <b>sub</b>)</li>
                                        <li>• Different OAuth provider (different <b>iss</b>)</li>
                                        <li>• Different app (different <b>aud</b>)</li>
                                        <li>• Different user_salt (if you choose a new one)</li>
                                    </ul>
                                    <div className="p-3 mt-4 bg-[var(--warning)] bg-opacity-20 rounded-lg border border-[var(--warning)] font-semibold text-xl underline">
                                        Warning! Changing construction parameters is not a common practice, and it is recommended to avoid it unless esplicitly declared in your/others Application(s)!<br />
                                        In such cases, the Application should enable users to see(or export) the parameters used initially to construct your address,<br />
                                        otherwise the address <b className="text-xl">WILL BE LOST FOREVER</b>.
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 3: How is the address derived */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('address-derivation')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">How is the address derived?</span>
                                {openFaq === 'address-derivation' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'address-derivation' && (
                                <div className="px-4 pb-4">
                                    <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                                        <BiMath className="text-[var(--accent)]" />
                                        Address Derivation Formula
                                    </h4>
                                    <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg font-mono text-sm">
                                        <div className="text-[var(--text-secondary)] mb-2">
                                            <span className="text-[var(--accent)]">zklogin_address</span> =
                                            <span className="text-[var(--primary)]"> blake2b</span>(
                                            <span className="text-[var(--warning)]">user_salt</span> ||
                                            <span className="text-[var(--success)]">sub</span> ||
                                            <span className="text-[var(--secondary)]">iss</span> ||
                                            <span className="text-[var(--accent)]">aud</span>
                                            )[0:20]
                                        </div>
                                        <div className="text-xs text-[var(--text-muted)] mb-2">
                                            Where <b>sub</b> = User's unique ID from JWT, <b>iss</b> = OAuth provider, <b>aud</b> = OAuth Client ID, <b>user_salt</b> = User-specific salt
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)] font-sans">
                                            <b>Blake2b</b> is a cryptographic hash function that produces a deterministic 32-byte output.
                                            We take the first 20 bytes to create the {SUI_TEXT} address. The same inputs always produce the same address.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 4: How long will the Proof be valid */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('proof-validity')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">How long will the Proof be valid?</span>
                                {openFaq === 'proof-validity' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'proof-validity' && (
                                <div className="px-4 pb-4">
                                    <div className="px-4">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="mb-2">
                                                    Each Proof(along with the Ephemeral Key) will be valid until <b>max_epoch</b> parameter, determined by the current blockchain epoch + additional duration in epochs.
                                                </p>
                                                <p className="text-[var(--text-secondary)]">
                                                    • The proof can only be used for transactions until this epoch expires<br />
                                                    • After expiration, you need to generate a new proof with a new max_epoch<br />
                                                    • This prevents old proofs from being reused indefinitely
                                                </p>
                                            </div>
                                            <div className="bg-[var(--info)] p-3 rounded-lg">
                                                <b>Remember:</b> Your wallet address changes ONLY if you change one of the deterministic parameters (different Google account, different app, etc.).<br />
                                                Changing <b className="text-white">max_epoch</b> and/or <b className="text-white">nonce</b> will NOT change your wallet address, but will invalidate the previous proof.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 5: What is an Ephemeral Key and why we need it */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('ephemeral-key')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">What is an Ephemeral Key and why we need it?</span>
                                {openFaq === 'ephemeral-key' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'ephemeral-key' && (
                                <div className="px-4 pt-4 pb-8 space-y-4">
                                    <div className="px-4">
                                        <h5 className="font-semibold text-[var(--text-primary)] mb-2">🔑 What is an Ephemeral Key?</h5>
                                        <p className="text-[var(--text-secondary)] mb-2">
                                            An Ephemeral Key is a temporary Ed25519 keypair (public + private key) that is generated fresh for each zkLogin session.
                                        </p>
                                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 ml-4">
                                            <li>• <b>Temporary:</b> Generated new for each session, then discarded</li>
                                            <li>• <b>Not a wallet:</b> It doesn't have its own {SUI_TEXT} address</li>
                                            <li>• <b>Signing only:</b> Used purely to sign transactions</li>
                                        </ul>
                                    </div>
                                    <div className="px-4">
                                        <h5 className="font-semibold text-[var(--text-primary)] mb-2">❓ Why do we need it?</h5>
                                        <p className="text-[var(--text-secondary)] mb-2">
                                            {SUI_TEXT} blockchain requires valid cryptographic signatures to execute transactions.<br /> Since your zkLogin wallet doesn't have traditional private keys, the ephemeral key provides the signing capability.
                                        </p>
                                        <ul className="text-xs text-[var(--text-secondary)] space-y-1 ml-4">
                                            <li>• <b>Blockchain requirement:</b> All transactions need cryptographic signatures</li>
                                            <li>• <b>Security:</b> Fresh keys each session prevent key reuse attacks</li>
                                            <li>• <b>Privacy:</b> No long-term private keys to manage or lose</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 6: How are the Ephemeral Key and the Wallet linked */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('key-wallet-link')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">How are the Ephemeral Key and the Wallet linked?</span>
                                {openFaq === 'key-wallet-link' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'key-wallet-link' && (
                                <div className="px-4 pb-4">
                                    <div className="space-y-4">
                                        The ephemeral key can sign transactions on behalf of your zkLogin address, but only for this session(as a new session will likely have a new nonce).<br />
                                        The ZK proof ensures that only you (with your OAuth identity) can authorize this ephemeral key to act for your wallet.<br /><br />
                                        The Ephemeral Key has no address, and nobody, even with its private key, can use it to sign transactions on behalf of your wallet, unless it reconstructs the same ZK Proof ...by having your OAuth credentials, websites credentials, and all the other parameters... it is impossible unless YOU share them!
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 7: Why do we need a prover service */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('prover-service')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">Why do we need a prover service?</span>
                                {openFaq === 'prover-service' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'prover-service' && (
                                <div className="px-4 pb-4">
                                    <div className="p-4">
                                        ZK proof generation involves complex cryptographic computations (circuit evaluation, witness generation, proof construction) that would be too slow and resource-intensive for client devices. The prover service is privacy-preserving - it only sees the JWT and ephemeral public key, never your private keys or personal data.
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 8: What is a nonce and why do we need it */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('nonce-explanation')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">What is a nonce and why do we need it?</span>
                                {openFaq === 'nonce-explanation' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'nonce-explanation' && (
                                <div className="px-4 pb-4">
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">🔢 What is a Nonce?</h5>
                                            <p className="text-sm text-[var(--text-secondary)] mb-2">
                                                A nonce (number used once) is a unique value that is generated by the ephemeral keypair and embedded in the OAuth JWT during the authentication process.
                                            </p>
                                            <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                                                <li>• <b>Generated by:</b> The @mysten/sui/zkLogin <b>generateNonce</b> function; computed from: the ephemeral public key, randomness(a random value generated from @mysten/sui/zkLogin lib), and max epoch(the current blockchain epoch + additional duration in epochs) parameters</li>
                                                <li>• <b>Changes:</b> Every refresh/new session, unless declared as constant</li>
                                                <li>• <b>Purpose:</b> Links your OAuth identity to the specific ephemeral key for this session</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">❓ Why do we need it?</h5>
                                            <p className="text-sm text-[var(--text-secondary)] mb-2">
                                                The nonce creates a cryptographic link between your OAuth identity and the ephemeral key, ensuring that only the correct ephemeral key can be used to sign transactions for your zkLogin wallet.
                                            </p>
                                            <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                                                <li>• <b>Security:</b> Prevents replay attacks and unauthorized key usage</li>
                                                <li>• <b>Linking:</b> Connects your OAuth session to the specific ephemeral keypair</li>
                                                <li>• <b>Validation:</b> Used in ZK proof generation to verify authorization</li>
                                            </ul>
                                        </div>
                                        <div className="bg-[var(--primary)] bg-opacity-10 p-3 rounded-lg">
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                <b>Important:</b> The nonce changes every session (unless explicitly declared as constant by the application), but this doesn't affect your wallet address. It only ensures that each session has a fresh, secure connection between your OAuth identity and the ephemeral key.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FAQ 9: Can I Backup my zkProof Wallet */}
                        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)]">
                            <button
                                onClick={() => toggleFaq('wallet-backup')}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors duration-200 rounded-xl"
                            >
                                <span className="font-semibold text-[var(--text-primary)]">Can I Backup my zkProof Wallet?</span>
                                {openFaq === 'wallet-backup' ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {openFaq === 'wallet-backup' && (
                                <div className="px-4 pb-4">
                                    <div className="p-4 space-y-4">
                                        <div className="p-4 rounded-lg">
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">✅ Yes, if the application allows exporting the construction parameters</h5>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                If the application creator (and/or, in the case, you) enables the operation to export and make visible to the user their own JWT parameters(or the JWT Token itself), yes.
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-lg">
                                            <h5 className="font-semibold text-[var(--text-primary)] mb-2">⚠️ Otherwise, no</h5>
                                            <p className="text-sm text-[var(--text-secondary)] mb-2">
                                                If the application doesn't provide export functionality for the construction parameters, you cannot backup your wallet.
                                            </p>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                <b>Required parameters for backup:</b>
                                            </p>
                                            <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4 mt-2 mb-2">
                                                <li>• <b>user_salt</b> - Your personal wallet salt</li>
                                                <li>• <b>aud</b> - App client ID</li>
                                                <li>• <b>iss</b> - OAuth provider identifier</li>
                                                <li>• <b>sub</b> - Your OAuth user ID (from your account)</li>
                                            </ul>
                                            <u>or the JWT Token itself.</u>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[var(--warning)]">
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                <b>Important:</b> Always check if the application provides wallet export/backup functionality before using it with significant funds.<br />
                                                Without these parameters, you cannot recover your wallet if you lose access to your OAuth account or the application becomes unavailable.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-2xl p-8 text-center">
                <div className="bg-[var(--bg-primary)] bg-opacity-95 rounded-xl p-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Ready to Explore ZkLogin?</h2>
                    </div>

                    <p className="text-[var(--text-secondary)] text-lg mb-6 max-w-2xl mx-auto">
                        This is an interactive demo that will guide you step by step through the ZkLogin process.
                        You'll learn how it works and get hands-on experience with each stage of the authentication flow.
                    </p>

                    <div className="space-y-4">
                        <p className="text-[var(--text-primary)] font-semibold mb-4">
                            What you'll learn:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-center gap-3 hover:shadow-md transition-shadow duration-200">
                                <div className="p-2 bg-[var(--accent)] bg-opacity-20 rounded-lg flex-shrink-0">
                                    <FaGoogle className="text-lg" />
                                </div>
                                <span className="text-sm text-[var(--text-primary)] font-medium">OAuth integration with Google</span>
                            </div>
                            <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-center gap-3 hover:shadow-md transition-shadow duration-200">
                                <div className="p-2 bg-[var(--success)] bg-opacity-20 rounded-lg flex-shrink-0">
                                    <FaShieldAlt className="text-lg" />
                                </div>
                                <span className="text-sm text-[var(--text-primary)] font-medium">Zero-knowledge proof generation</span>
                            </div>
                            <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-center gap-3 hover:shadow-md transition-shadow duration-200">
                                <div className="p-2 bg-[var(--primary)] bg-opacity-20 rounded-lg flex-shrink-0">
                                    <FaKey className="text-lg" />
                                </div>
                                <span className="text-sm text-[var(--text-primary)] font-medium">{SUI_TEXT} address derivation</span>
                            </div>
                            <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border)] flex items-center gap-3 hover:shadow-md transition-shadow duration-200">
                                <div className="p-2 bg-[var(--warning)] bg-opacity-20 rounded-lg flex-shrink-0">
                                    <FaCog className="text-lg" />
                                </div>
                                <span className="text-sm text-[var(--text-primary)] font-medium">Transaction execution</span>
                            </div>
                        </div>

                        <button
                            onClick={handleStartDemo}
                            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--secondary)] hover:to-[var(--accent)] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto text-lg"
                        >
                            Start Using ZkLogin
                            <FaArrowRight className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
