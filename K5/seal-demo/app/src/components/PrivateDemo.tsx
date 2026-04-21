import { useState } from "react";
import { EncryptedObject } from "@mysten/seal";
import { fromBase64, toBase64 } from "@mysten/sui/utils";

import { PACKAGE_ID, SEAL_THRESHOLD } from "../config";
import {
  buildPrivateApprovePtb,
  buildPrivateIdentity,
} from "../helpers";
import { useSealClient, useSuiClient } from "../hooks/useSealClient";
import { useSessionKey } from "../hooks/useSessionKey";
import { Btn, CopyableOutput, Panel, Result, Status } from "./ui";
import { inputStyle } from "./styles";

export function PrivateDemo({ address }: { address: string }) {
  const seal = useSealClient();
  const suiClient = useSuiClient();
  const getSessionKey = useSessionKey();

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
      const id = buildPrivateIdentity(address);
      const { encryptedObject } = await seal.encrypt({
        threshold: SEAL_THRESHOLD,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });
      setCiphertext(toBase64(encryptedObject));
      setEncStatus(
        "Encrypted! Copy the ciphertext below and paste it into the decrypt step.",
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

      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(address);

      setDecStatus("Building PTB and contacting key servers...");
      const txBytes = await buildPrivateApprovePtb(
        suiClient,
        parsed.packageId,
        parsed.id,
      );

      setDecStatus("Key servers verifying policy via dry-run...");
      const dec = await seal.decrypt({
        data: encryptedBytes,
        sessionKey,
        txBytes,
      });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! seal_approve confirmed sender == owner.");
    } catch (err) {
      setDecStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <>
      <Panel
        title="1. Encrypt"
        desc="Identity = your address. Only you can decrypt. Encryption is entirely local."
      >
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          rows={3}
          style={inputStyle}
          placeholder="Secret message..."
        />
        <Btn onClick={handleEncrypt}>Encrypt</Btn>
        <Status text={encStatus} />
        {ciphertext && <CopyableOutput value={ciphertext} />}
      </Panel>
      <Panel
        title="2. Decrypt"
        desc="Paste the ciphertext. Key servers dry-run seal_approve(id, ctx) — checks id == sender address."
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
