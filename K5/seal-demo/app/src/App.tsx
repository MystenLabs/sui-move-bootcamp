import { useState, useRef } from "react";
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClient,
  useSignPersonalMessage,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { SealClient, SessionKey, EncryptedObject } from "@mysten/seal";
import { Transaction } from "@mysten/sui/transactions";
import { fromHex, toHex, fromBase64, toBase64 } from "@mysten/sui/utils";
import { bcs } from "@mysten/sui/bcs";

// ─── Configuration ─────────────────────────────────────────
const PACKAGE_ID =
  "0x2b5472a9002d97045c8448cda76284aa0de81df3ab902fdfc785feaa2c0b4cc0";

const KEY_SERVER_OBJECT_ID =
  "0xb012378c9f3799fb5b1a7083da74a4069e3c3f1c93de0b27212a5799ce1e1e98";
const AGGREGATOR_URL = "https://seal-aggregator-testnet.mystenlabs.com";

const SUI_CLOCK =
  "0x0000000000000000000000000000000000000000000000000000000000000006";

type Pattern = "private" | "timelock" | "allowlist";

export default function App() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const [activeTab, setActiveTab] = useState<Pattern>("private");

  // ─── Shared ──────────────────────────────────────────────
  const sealClientRef = useRef<SealClient | null>(null);
  const sessionKeyRef = useRef<SessionKey | null>(null);

  function getSealClient() {
    if (!sealClientRef.current) {
      sealClientRef.current = new SealClient({
        suiClient,
        serverConfigs: [
          {
            objectId: KEY_SERVER_OBJECT_ID,
            weight: 1,
            aggregatorUrl: AGGREGATOR_URL,
          },
        ],
        verifyKeyServers: false,
      });
    }
    return sealClientRef.current;
  }

  async function getSessionKey(address: string) {
    if (!sessionKeyRef.current || sessionKeyRef.current.isExpired()) {
      const sk = await SessionKey.create({
        address,
        packageId: PACKAGE_ID,
        ttlMin: 10,
        suiClient,
      });
      const message = sk.getPersonalMessage();
      const { signature } = await signPersonalMessage({ message });
      sk.setPersonalMessageSignature(signature);
      sessionKeyRef.current = sk;
    }
    return sessionKeyRef.current;
  }

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 4 }}>Seal Demo</h1>
      <p style={{ color: "#888", marginTop: 0, marginBottom: 24 }}>
        Three access control patterns — encrypt &amp; decrypt with Seal on Sui
      </p>

      <div style={{ marginBottom: 32 }}>
        <ConnectButton />
      </div>

      {account && (
        <>
          {/* ── TAB BAR ── */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {(
              [
                ["private", "Private Data"],
                ["timelock", "Time-Lock"],
                ["allowlist", "Allowlist"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  ...tabStyle,
                  background: activeTab === key ? "#4a9eff" : "#222",
                  color: activeTab === key ? "#fff" : "#888",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "private" && (
            <PrivateDemo
              account={account}
              getSealClient={getSealClient}
              getSessionKey={getSessionKey}
              suiClient={suiClient}
            />
          )}
          {activeTab === "timelock" && (
            <TimelockDemo
              account={account}
              getSealClient={getSealClient}
              getSessionKey={getSessionKey}
              suiClient={suiClient}
            />
          )}
          {activeTab === "allowlist" && (
            <AllowlistDemo
              account={account}
              getSealClient={getSealClient}
              getSessionKey={getSessionKey}
              suiClient={suiClient}
              signAndExecute={signAndExecute}
            />
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PRIVATE DATA PATTERN
// ═══════════════════════════════════════════════════════════

function PrivateDemo({
  account,
  getSealClient,
  getSessionKey,
  suiClient,
}: DemoProps) {
  const [plaintext, setPlaintext] = useState("Hello from Seal!");
  const [ciphertext, setCiphertext] = useState("");
  const [encStatus, setEncStatus] = useState("");

  const [decryptInput, setDecryptInput] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [decStatus, setDecStatus] = useState("");

  async function handleEncrypt() {
    setEncStatus("Encrypting...");
    setCiphertext("");
    try {
      const client = getSealClient();
      const id = toHex(bcs.Address.serialize(account.address).toBytes());

      const { encryptedObject } = await client.encrypt({
        threshold: 1,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });

      setCiphertext(toBase64(encryptedObject));
      setEncStatus("Encrypted! Copy the ciphertext below and paste it into the decrypt step.");
    } catch (err: unknown) {
      setEncStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleDecrypt() {
    if (!decryptInput.trim()) return;
    setDecStatus("Parsing ciphertext...");
    setDecrypted("");
    try {
      const encryptedBytes = fromBase64(decryptInput.trim());
      const parsed = EncryptedObject.parse(encryptedBytes);

      const client = getSealClient();
      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(account.address);

      setDecStatus("Building PTB and contacting key servers...");
      const tx = new Transaction();
      tx.moveCall({
        target: `${parsed.packageId}::private_seal::seal_approve`,
        arguments: [tx.pure.vector("u8", fromHex(parsed.id))],
      });
      const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

      setDecStatus("Key servers verifying policy via dry-run...");
      const dec = await client.decrypt({ data: encryptedBytes, sessionKey, txBytes });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! seal_approve confirmed sender == owner.");
    } catch (err: unknown) {
      setDecStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <>
      <Panel title="1. Encrypt" desc="Identity = your address. Only you can decrypt. Encryption is entirely local.">
        <textarea value={plaintext} onChange={(e) => setPlaintext(e.target.value)} rows={3} style={inputStyle} placeholder="Secret message..." />
        <Btn onClick={handleEncrypt}>Encrypt</Btn>
        <Status text={encStatus} />
        {ciphertext && <CopyableOutput value={ciphertext} />}
      </Panel>
      <Panel title="2. Decrypt" desc="Paste the ciphertext. Key servers dry-run seal_approve(id, ctx) — checks id == sender address.">
        <textarea
          value={decryptInput}
          onChange={(e) => setDecryptInput(e.target.value)}
          rows={4}
          style={inputStyle}
          placeholder="Paste the ciphertext here..."
        />
        <Btn onClick={handleDecrypt}>Decrypt</Btn>
        <Status text={decStatus} />
        {decrypted && <Result text={decrypted} />}
      </Panel>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// TIME-LOCK PATTERN
// ═══════════════════════════════════════════════════════════

function TimelockDemo({
  account,
  getSealClient,
  getSessionKey,
  suiClient,
}: DemoProps) {
  const [plaintext, setPlaintext] = useState("This message is time-locked!");
  const [delaySeconds, setDelaySeconds] = useState(30);
  const [ciphertext, setCiphertext] = useState("");
  const [encStatus, setEncStatus] = useState("");

  const [decryptInput, setDecryptInput] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [decStatus, setDecStatus] = useState("");

  async function handleEncrypt() {
    setEncStatus("Encrypting...");
    setCiphertext("");
    try {
      const client = getSealClient();
      const unlock = Date.now() + delaySeconds * 1000;

      const idBytes = bcs.u64().serialize(unlock).toBytes();
      const id = toHex(idBytes);

      const { encryptedObject } = await client.encrypt({
        threshold: 1,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });

      setCiphertext(toBase64(encryptedObject));
      setEncStatus(
        `Encrypted! Unlocks at ${new Date(unlock).toLocaleTimeString()} (in ${delaySeconds}s). Copy the ciphertext and paste it into decrypt.`,
      );
    } catch (err: unknown) {
      setEncStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleDecrypt() {
    if (!decryptInput.trim()) return;
    setDecStatus("Parsing ciphertext...");
    setDecrypted("");
    try {
      const encryptedBytes = fromBase64(decryptInput.trim());
      const parsed = EncryptedObject.parse(encryptedBytes);

      // Extract the unlock timestamp from the identity
      const idBytes = fromHex(parsed.id);
      const unlockMs = Number(bcs.u64().parse(idBytes));
      const now = Date.now();

      if (now < unlockMs) {
        setDecStatus(
          `Attempting decrypt anyway... seal_approve will check clock.timestamp_ms() >= ${unlockMs}`,
        );
      }

      const client = getSealClient();
      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(account.address);

      setDecStatus("Building PTB with Clock object...");
      const tx = new Transaction();
      tx.moveCall({
        target: `${parsed.packageId}::timelock_seal::seal_approve`,
        arguments: [
          tx.pure.vector("u8", fromHex(parsed.id)),
          tx.object(SUI_CLOCK),
        ],
      });
      const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

      setDecStatus("Key servers dry-running: clock.timestamp_ms() >= unlock_time?");
      const dec = await client.decrypt({ data: encryptedBytes, sessionKey, txBytes });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! Time-lock has passed, seal_approve approved.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("does not have access")) {
        setDecStatus(
          `Access denied! seal_approve aborted because clock.timestamp_ms() < unlock_time. The key servers dry-ran the policy and it failed.`,
        );
      } else {
        setDecStatus(`Error: ${msg}`);
      }
    }
  }

  return (
    <>
      <Panel title="1. Encrypt with Time-Lock" desc="Identity = a future timestamp. Nobody can decrypt before the deadline.">
        <textarea value={plaintext} onChange={(e) => setPlaintext(e.target.value)} rows={2} style={inputStyle} placeholder="Secret message..." />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <label style={{ color: "#888", fontSize: 14 }}>Unlock in:</label>
          <input
            type="number"
            value={delaySeconds}
            onChange={(e) => setDelaySeconds(Number(e.target.value))}
            min={5}
            max={300}
            style={{ ...inputStyle, width: 80 }}
          />
          <span style={{ color: "#888", fontSize: 14 }}>seconds</span>
        </div>
        <Btn onClick={handleEncrypt}>Encrypt (Time-Lock)</Btn>
        <Status text={encStatus} />
        {ciphertext && <CopyableOutput value={ciphertext} />}
      </Panel>
      <Panel title="2. Decrypt (paste the ciphertext)" desc="Paste the ciphertext. Key servers dry-run seal_approve(id, clock) — checks clock >= timestamp in id.">
        <textarea
          value={decryptInput}
          onChange={(e) => setDecryptInput(e.target.value)}
          rows={4}
          style={inputStyle}
          placeholder="Paste the ciphertext here..."
        />
        <Btn onClick={handleDecrypt}>Decrypt</Btn>
        <Status text={decStatus} />
        {decrypted && <Result text={decrypted} />}
      </Panel>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ALLOWLIST PATTERN
// ═══════════════════════════════════════════════════════════

function AllowlistDemo({
  account,
  getSealClient,
  getSessionKey,
  suiClient,
  signAndExecute,
}: DemoProps & { signAndExecute: SignAndExecuteFn }) {
  const [plaintext, setPlaintext] = useState("Only allowlisted addresses can read this!");
  const [ciphertext, setCiphertext] = useState("");
  const [encStatus, setEncStatus] = useState("");

  const [decryptInput, setDecryptInput] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [decStatus, setDecStatus] = useState("");

  // Allowlist state
  const [allowlistId, setAllowlistId] = useState("");
  const [adminCapId, setAdminCapId] = useState("");
  const [setupStatus, setSetupStatus] = useState("");
  const [memberAddr, setMemberAddr] = useState("");
  const [addStatus, setAddStatus] = useState("");

  async function handleCreateAllowlist() {
    setSetupStatus("Creating allowlist on-chain...");
    try {
      const tx = new Transaction();
      tx.moveCall({ target: `${PACKAGE_ID}::allowlist_seal::create` });

      await signAndExecute({ transaction: tx });
      setSetupStatus("Waiting for indexing...");

      await new Promise((r) => setTimeout(r, 3000));

      const ownedObjects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: { Package: PACKAGE_ID },
        options: { showType: true },
      });

      let foundAllowlist = "";
      let foundCap = "";
      for (const obj of ownedObjects.data) {
        const type = obj.data?.type ?? "";
        if (type.includes("::AdminCap")) foundCap = obj.data!.objectId;
      }

      if (foundCap) {
        const capObj = await suiClient.getObject({
          id: foundCap,
          options: { showContent: true },
        });
        const content = capObj.data?.content;
        if (content && "fields" in content) {
          foundAllowlist = (content.fields as any).allowlist_id;
        }
      }

      setAllowlistId(foundAllowlist);
      setAdminCapId(foundCap);
      setSetupStatus(`Allowlist created!\nAllowlist: ${foundAllowlist}\nAdminCap: ${foundCap}`);
    } catch (err: unknown) {
      setSetupStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleAddMember() {
    if (!allowlistId || !adminCapId) return;
    const addr = memberAddr.trim() || account.address;
    setAddStatus(`Adding ${addr.slice(0, 10)}...`);
    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::allowlist_seal::add_member`,
        arguments: [
          tx.object(allowlistId),
          tx.object(adminCapId),
          tx.pure.address(addr),
        ],
      });
      await signAndExecute({ transaction: tx });
      setAddStatus(`Added ${addr.slice(0, 10)}... to allowlist!`);
    } catch (err: unknown) {
      setAddStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleEncrypt() {
    if (!allowlistId) return;
    setEncStatus("Encrypting...");
    setCiphertext("");
    try {
      const client = getSealClient();

      const nonce = crypto.getRandomValues(new Uint8Array(5));
      const alBytes = fromHex(allowlistId);
      const idBytes = new Uint8Array([...alBytes, ...nonce]);
      const id = toHex(idBytes);

      const { encryptedObject } = await client.encrypt({
        threshold: 1,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });

      setCiphertext(toBase64(encryptedObject));
      setEncStatus("Encrypted to allowlist! Copy the ciphertext and paste it into decrypt.");
    } catch (err: unknown) {
      setEncStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleDecrypt() {
    if (!decryptInput.trim()) return;
    setDecStatus("Parsing ciphertext...");
    setDecrypted("");
    try {
      const encryptedBytes = fromBase64(decryptInput.trim());
      const parsed = EncryptedObject.parse(encryptedBytes);

      // Extract allowlist object ID from the identity (first 32 bytes)
      const idBytes = fromHex(parsed.id);
      const allowlistObjId = "0x" + toHex(idBytes.slice(0, 32));

      const client = getSealClient();
      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(account.address);

      setDecStatus("Building PTB with Allowlist object...");
      const tx = new Transaction();
      tx.moveCall({
        target: `${parsed.packageId}::allowlist_seal::seal_approve`,
        arguments: [
          tx.pure.vector("u8", fromHex(parsed.id)),
          tx.object(allowlistObjId),
        ],
      });
      const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

      setDecStatus("Key servers dry-running: is sender on the allowlist?");
      const dec = await client.decrypt({ data: encryptedBytes, sessionKey, txBytes });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! You are on the allowlist.");
    } catch (err: unknown) {
      setDecStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <>
      {/* ── SETUP PANEL ── */}
      <Panel title="1. Create Allowlist" desc="Deploy a shared Allowlist object on-chain. You'll get an AdminCap to manage members.">
        {!allowlistId ? (
          <>
            <Btn onClick={handleCreateAllowlist}>Create Allowlist</Btn>
            <Status text={setupStatus} />
          </>
        ) : (
          <>
            <pre style={preStyle}>{setupStatus}</pre>
            <div style={{ marginTop: 16 }}>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
                Add a member (leave empty to add yourself):
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={memberAddr}
                  onChange={(e) => setMemberAddr(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                  placeholder={account.address}
                />
                <Btn onClick={handleAddMember}>Add</Btn>
              </div>
              <Status text={addStatus} />
            </div>
          </>
        )}
      </Panel>

      {/* ── ENCRYPT PANEL ── */}
      <Panel
        title="2. Encrypt to Allowlist"
        desc="Identity = allowlist object ID. Only members can decrypt. Add/remove members without re-encrypting."
        disabled={!allowlistId}
      >
        <textarea value={plaintext} onChange={(e) => setPlaintext(e.target.value)} rows={2} style={inputStyle} placeholder="Secret message..." />
        <Btn onClick={handleEncrypt}>Encrypt</Btn>
        <Status text={encStatus} />
        {ciphertext && <CopyableOutput value={ciphertext} />}
      </Panel>

      {/* ── DECRYPT PANEL ── */}
      <Panel
        title="3. Decrypt"
        desc="Paste the ciphertext. Key servers dry-run seal_approve(id, allowlist, ctx) — checks sender is in allowlist.members."
      >
        <textarea
          value={decryptInput}
          onChange={(e) => setDecryptInput(e.target.value)}
          rows={4}
          style={inputStyle}
          placeholder="Paste the ciphertext here..."
        />
        <Btn onClick={handleDecrypt}>Decrypt</Btn>
        <Status text={decStatus} />
        {decrypted && <Result text={decrypted} />}
      </Panel>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// SHARED COMPONENTS & TYPES
// ═══════════════════════════════════════════════════════════

type SignAndExecuteFn = ReturnType<typeof useSignAndExecuteTransaction>["mutateAsync"];

interface DemoProps {
  account: { address: string };
  getSealClient: () => SealClient;
  getSessionKey: (address: string) => Promise<SessionKey>;
  suiClient: ReturnType<typeof useSuiClient>;
}

function Panel({
  title,
  desc,
  disabled,
  children,
}: {
  title: string;
  desc: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...panelStyle, opacity: disabled ? 0.4 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>{desc}</p>
      {children}
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
}

function Status({ text }: { text: string }) {
  if (!text) return null;
  const isError = text.startsWith("Error") || text.startsWith("Access denied");
  return (
    <p style={{ marginTop: 12, fontSize: 14, color: isError ? "#e55" : "#5a5" }}>
      {text}
    </p>
  );
}

function Result({ text }: { text: string }) {
  return (
    <div style={{ ...preStyle, background: "#1a3a1a", borderColor: "#2a5a2a", color: "#6f6", fontSize: 16 }}>
      {text}
    </div>
  );
}

function CopyableOutput({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ marginTop: 12, position: "relative" }}>
      <pre style={{ ...preStyle, marginTop: 0, paddingRight: 80, maxHeight: 120, overflow: "auto" }}>
        {value}
      </pre>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: "4px 12px",
          borderRadius: 6,
          border: "1px solid #444",
          background: copied ? "#2a5a2a" : "#222",
          color: copied ? "#6f6" : "#aaa",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════

const panelStyle: React.CSSProperties = {
  border: "1px solid #333",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  background: "#1a1a1a",
};

const tabStyle: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: 8,
  border: "1px solid #333",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #444",
  background: "#111",
  color: "#eee",
  fontSize: 14,
  fontFamily: "monospace",
  resize: "vertical",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 24px",
  borderRadius: 8,
  border: "none",
  background: "#4a9eff",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const preStyle: React.CSSProperties = {
  marginTop: 12,
  padding: 12,
  borderRadius: 8,
  border: "1px solid #333",
  background: "#111",
  color: "#aaa",
  fontSize: 13,
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
};
