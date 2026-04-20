import { useState } from "react";
import { EncryptedObject } from "@mysten/seal";
import { fromBase64, toBase64 } from "@mysten/sui/utils";

import { PACKAGE_ID, SEAL_THRESHOLD } from "../config";
import {
  buildTimelockApprovePtb,
  buildTimelockIdentity,
  parseTimelockIdentity,
} from "../helpers";
import { useSealClient, useSuiClient } from "../hooks/useSealClient";
import { useSessionKey } from "../hooks/useSessionKey";
import { Btn, CopyableOutput, Panel, Result, Status } from "./ui";
import { inputStyle } from "./styles";

export function TimelockDemo({ address }: { address: string }) {
  const seal = useSealClient();
  const suiClient = useSuiClient();
  const getSessionKey = useSessionKey();

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
      const unlock = Date.now() + delaySeconds * 1000;
      const id = buildTimelockIdentity(unlock);

      const { encryptedObject } = await seal.encrypt({
        threshold: SEAL_THRESHOLD,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });

      setCiphertext(toBase64(encryptedObject));
      setEncStatus(
        `Encrypted! Unlocks at ${new Date(unlock).toLocaleTimeString()} (in ${delaySeconds}s). Copy the ciphertext and paste it into decrypt.`,
      );
    } catch (err) {
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

      const unlockMs = parseTimelockIdentity(parsed.id);
      if (Date.now() < unlockMs) {
        setDecStatus(
          `Attempting decrypt anyway... seal_approve will check clock.timestamp_ms() >= ${unlockMs}`,
        );
      }

      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(address);

      setDecStatus("Building PTB with Clock object...");
      const txBytes = await buildTimelockApprovePtb(
        suiClient,
        parsed.packageId,
        parsed.id,
      );

      setDecStatus("Key servers dry-running: clock.timestamp_ms() >= unlock_time?");
      const dec = await seal.decrypt({
        data: encryptedBytes,
        sessionKey,
        txBytes,
      });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! Time-lock has passed, seal_approve approved.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("does not have access")) {
        setDecStatus(
          "Access denied! seal_approve aborted because clock.timestamp_ms() < unlock_time. The key servers dry-ran the policy and it failed.",
        );
      } else {
        setDecStatus(`Error: ${msg}`);
      }
    }
  }

  return (
    <>
      <Panel
        title="1. Encrypt with Time-Lock"
        desc="Identity = a future timestamp. Nobody can decrypt before the deadline."
      >
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          rows={2}
          style={inputStyle}
          placeholder="Secret message..."
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
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
      <Panel
        title="2. Decrypt (paste the ciphertext)"
        desc="Paste the ciphertext. Key servers dry-run seal_approve(id, clock) — checks clock >= timestamp in id."
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
