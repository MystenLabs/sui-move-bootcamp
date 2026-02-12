import React, { useState } from 'react';
import { BiServer } from 'react-icons/bi';
import { CiMobile2 } from 'react-icons/ci';
import { FaBug, FaChevronRight, FaClock, FaGlobe, FaHashtag, FaKey, FaNetworkWired, FaRandom, FaSeedling, FaUser, FaWallet } from 'react-icons/fa';
import { GiCog, GiPlug } from 'react-icons/gi';
import { GrDocumentVerified } from 'react-icons/gr';
import { PiPlugsFill } from 'react-icons/pi';
import { SiSui } from 'react-icons/si';
import { useAppContext } from '../contexts/AppContext';
import { NOT_CONNECTED_TEXT, NOT_GENERATED_TEXT, PROVIDER_ICON, SUI_ICON_BLUE } from '../utils/constants';
import { uppercaseFirstLetter } from '../utils/generic';
import DebugPanelSection from './DebugPanelSection';

interface DebugPanelProps {
    className?: string;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // Get data from context
    const appContext = useAppContext();
    const { currentStep, network, ephemeral, wallet, salt, oauth, jwt, zkProof } = appContext;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getDebugDataRaw = () => {
        return <pre className="p-4 bg-[var(--bg-primary)] text-xs text-[var(--text-secondary)] font-mono overflow-x-auto whitespace-pre-wrap border-t border-[var(--border)]">
            {JSON.stringify(appContext, null, 2)}
        </pre>
    }

    const saltValueHex = salt.value ? BigInt(salt.value).toString(16).padStart(32, '0') : null;

    const getStepBadgeColor = (step: number) => {
        switch (step) {
            case 1: return 'bg-[var(--primary)]';
            case 2: return 'bg-[var(--accent)]';
            case 3: return 'bg-[var(--success)]';
            case 4: return 'bg-[var(--warning)]';
            default: return 'bg-[var(--text-secondary)]';
        }
    };

    return (
        <div className={`bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] ${className}`}>
            <button
                onClick={toggleExpanded}
                className="w-full p-4 bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)] transition-colors duration-200 border-none cursor-pointer"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-3 text-[var(--text-primary)]">
                    <div className="flex-shrink-0">
                        <FaChevronRight
                            className={`text-lg transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-1 text-left">
                        <FaBug className="text-[var(--accent)]" />
                        <span className="font-semibold">Debug Info</span>
                    </div>
                    <div className="flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStepBadgeColor(currentStep.value)}`}>
                            {currentStep.value.toString().toUpperCase()}
                        </span>
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div className="p-6 bg-[var(--bg-primary)] border-t border-[var(--border)]">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                            ZkLogin Debug Information
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Internal state for development and troubleshooting
                        </p>
                    </div>

                    {/* Configuration Title */}

                    <div className="grid grid-cols-1 gap-4 mb-6">

                        <DebugPanelSection
                            title="Application"
                            items={[
                                {
                                    key: <><FaNetworkWired /> Network</>,
                                    value: network.value ? (
                                        <>
                                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                                                🌐 {network.value.toUpperCase()}
                                            </span>
                                            <span className="text-xs text-[var(--text-muted)] italic ml-2">
                                                Compatible with prover-dev.mystenlabs.com
                                            </span>
                                        </>
                                    ) : (
                                        NOT_GENERATED_TEXT
                                    )
                                },
                                {
                                    key: <><FaClock /> Current Step</>,
                                    value: currentStep.value ? (
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStepBadgeColor(currentStep.value)}`}>
                                            {currentStep.value.toString().toUpperCase()}
                                        </span>
                                    ) : (
                                        NOT_GENERATED_TEXT
                                    )
                                },
                                {
                                    key: <><FaHashtag /> Salt</>,
                                    value: salt.value ?
                                        <div className="space-y-2 text-xs">
                                            <div>
                                                <strong className="text-[var(--text-primary)]">Value:</strong>{' '}
                                                <code className="bg-[var(--bg-tertiary)] px-2 py-1 rounded font-mono break-all">
                                                    {salt.value}
                                                </code>
                                            </div>
                                            <div>
                                                <strong className="text-[var(--text-primary)]">Hex:</strong>{' '}
                                                <code className="bg-[var(--bg-tertiary)] px-2 py-1 rounded font-mono break-all">
                                                    {saltValueHex}
                                                </code>
                                            </div>
                                            <div>
                                                <strong className="text-[var(--text-primary)]">Bytes Length:</strong>{' '}
                                                <span className={saltValueHex!.length === 32 ? 'text-[var(--success)]' : 'text-[var(--error)]'}>
                                                    {saltValueHex!.length / 2} bytes {saltValueHex!.length / 2 === 16 ? '✅' : '❌'}
                                                </span>
                                            </div>
                                        </div>
                                        : NOT_GENERATED_TEXT
                                },
                            ]} />

                        <DebugPanelSection
                            title="Ephemeral Keypair"
                            items={[
                                {
                                    key: <><FaKey /> Public Key</>,
                                    value: ephemeral.publicKey ? (() => {
                                        const publicKey = ephemeral.publicKey.toSuiBytes().toString();
                                        return (
                                            <>
                                                {publicKey.slice(0, 10)}...{publicKey.slice(-4)}
                                            </>
                                        )
                                    })() : (
                                        NOT_GENERATED_TEXT
                                    ),
                                    valueType: "code"
                                },
                                {
                                    key: <><FaRandom /> Randomness</>,
                                    value: ephemeral.randomness ? ephemeral.randomness : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><FaHashtag /> Nonce</>,
                                    value: ephemeral.nonce ? ephemeral.nonce : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><FaClock /> Max Epoch</>,
                                    value: ephemeral.maxEpoch ? ephemeral.maxEpoch : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                }
                            ]} />

                        <DebugPanelSection
                            title="OAuth Configuration"
                            items={[
                                {
                                    key: <><FaNetworkWired /> Provider</>,
                                    value: oauth.provider ? (
                                        <>
                                            {PROVIDER_ICON[oauth.provider]} {uppercaseFirstLetter(oauth.provider)}
                                        </>
                                    ) : (
                                        NOT_GENERATED_TEXT
                                    )
                                },
                                {
                                    key: <><GiCog /> Client ID</>,
                                    value: oauth.clientId ? oauth.clientId.slice(0, 5) + '...' + oauth.clientId.slice(-25) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><FaGlobe /> URL</>,
                                    value: oauth.url ? oauth.url.slice(0, 30) + '...' + oauth.url.slice(-8) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                            ]} />

                        <DebugPanelSection
                            title="OAuth Account & JWT(JSON Web Token)"
                            items={[
                                {
                                    key: <><GiPlug /> Account</>,
                                    value: jwt.token ? (
                                        <span className="px-3 py-1 bg-green-700 text-white text-xs font-bold rounded-full">
                                            CONNECTED
                                        </span>
                                    ) : NOT_CONNECTED_TEXT
                                },
                                {
                                    key: <><CiMobile2 /> AUD</>,
                                    value: jwt.aud ? jwt.aud.slice(0, 5) + '...' + jwt.aud.slice(-25) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><BiServer /> ISS</>,
                                    value: jwt.iss ? jwt.iss : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><FaUser /> SUB</>,
                                    value: jwt.sub ? jwt.sub.slice(0, 3) + '...' + jwt.sub.slice(-4) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                                {
                                    key: <><PiPlugsFill /> Nonces Match</>,
                                    value: jwt.nonce ? (
                                        jwt.nonce === ephemeral.nonce ? '✅ yes' : '❌ mismatch'
                                    ) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                            ]} />

                        <DebugPanelSection
                            title="ZK Proof"
                            items={[
                                {
                                    key: <><GrDocumentVerified /> ZK Proof</>,
                                    value: zkProof.value ? (
                                        <span className="px-3 py-1 bg-green-700 text-white text-xs font-bold rounded-full">
                                            GENERATED
                                        </span>
                                    ) : NOT_GENERATED_TEXT
                                },
                            ]} />

                        <DebugPanelSection
                            title="Wallet"
                            items={[
                                {
                                    key: <><FaWallet /> Address</>,
                                    value: wallet.address ? wallet.address : NOT_GENERATED_TEXT
                                },
                                {
                                    key: <><SiSui />SUI Balance</>,
                                    value: wallet.balance
                                        ? <span className="font-bold font-mono uppercase">
                                            {(parseFloat(wallet.balance) / 10**9).toFixed(3)} SUI {SUI_ICON_BLUE}
                                          </span>
                                        : NOT_GENERATED_TEXT
                                },
                                {
                                    key: <><FaSeedling /> Address Seed</>,
                                    value: wallet.addressSeed ? wallet.addressSeed.slice(0, 3) + '...' + wallet.addressSeed.slice(-5) : NOT_GENERATED_TEXT,
                                    valueType: "code"
                                },
                            ]} />

                    </div>

                    {/* Raw Data Section */}
                    <div className="mb-6">
                        <details className="bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border)]">
                            <summary className="p-4 cursor-pointer font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                                Raw Debug Data (JSON)
                            </summary>
                            {getDebugDataRaw()}
                        </details>
                    </div>

                    {/* Footer */}
                    {/* <div className="text-center pt-4 border-t border-[var(--border)]">
            <small className="text-[var(--text-muted)] text-xs">
              Last updated: {debugData.timestamp}
            </small>
          </div> */}
                </div>
            )}
        </div>
    );
};

export default DebugPanel;
