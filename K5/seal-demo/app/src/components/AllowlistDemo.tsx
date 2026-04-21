import { useState } from "react";
import { EncryptedObject } from "@mysten/seal";
import { fromBase64, toBase64 } from "@mysten/sui/utils";
import { useDAppKit } from "@mysten/dapp-kit-react";

import { PACKAGE_ID, SEAL_THRESHOLD } from "../config";
import {
  buildAddMemberTx,
  buildAllowlistApprovePtb,
  buildAllowlistIdentity,
  buildCreateAllowlistTx,
  parseAllowlistIdentity,
} from "../helpers";
import { useSealClient, useSuiClient } from "../hooks/useSealClient";
import { useSessionKey } from "../hooks/useSessionKey";
import { Btn, CopyableOutput, Panel, Result, Status } from "./ui";
import { inputStyle, preStyle } from "./styles";

const ADMIN_CAP_TYPE = `${PACKAGE_ID}::allowlist_seal::AdminCap`;

export function AllowlistDemo({ address }: { address: string }) {
  const seal = useSealClient();
  const suiClient = useSuiClient();
  const getSessionKey = useSessionKey();
  const dAppKit = useDAppKit();

  const [plaintext, setPlaintext] = useState(
    "Only allowlisted addresses can read this!",
  );
  const [ciphertext, setCiphertext] = useState("");
  const [encStatus, setEncStatus] = useState("");

  const [decryptInput, setDecryptInput] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [decStatus, setDecStatus] = useState("");

  const [allowlistId, setAllowlistId] = useState("");
  const [adminCapId, setAdminCapId] = useState("");
  const [setupStatus, setSetupStatus] = useState("");
  const [memberAddr, setMemberAddr] = useState("");
  const [addStatus, setAddStatus] = useState("");

  async function handleCreateAllowlist() {
    setSetupStatus("Creating allowlist on-chain...");
    try {
      const tx = buildCreateAllowlistTx(PACKAGE_ID);
      await dAppKit.signAndExecuteTransaction({ transaction: tx });
      setSetupStatus("Waiting for indexing...");
      await new Promise((r) => setTimeout(r, 3000));

      const owned = await suiClient.core.listOwnedObjects({
        owner: address,
        type: ADMIN_CAP_TYPE,
        include: { json: true },
      });

      const cap = owned.objects[0];
      if (!cap) throw new Error("AdminCap not found after creation");

      const capAllowlistId = (cap.json as { allowlist_id: string } | null)
        ?.allowlist_id;
      if (!capAllowlistId) throw new Error("AdminCap has no allowlist_id field");

      setAllowlistId(capAllowlistId);
      setAdminCapId(cap.objectId);
      setSetupStatus(
        `Allowlist created!\nAllowlist: ${capAllowlistId}\nAdminCap: ${cap.objectId}`,
      );
    } catch (err) {
      setSetupStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleAddMember() {
    if (!allowlistId || !adminCapId) return;
    const addr = memberAddr.trim() || address;
    setAddStatus(`Adding ${addr.slice(0, 10)}...`);
    try {
      const tx = buildAddMemberTx(PACKAGE_ID, allowlistId, adminCapId, addr);
      await dAppKit.signAndExecuteTransaction({ transaction: tx });
      setAddStatus(`Added ${addr.slice(0, 10)}... to allowlist!`);
    } catch (err) {
      setAddStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  async function handleEncrypt() {
    if (!allowlistId) return;
    setEncStatus("Encrypting...");
    setCiphertext("");
    try {
      const id = buildAllowlistIdentity(allowlistId);
      const { encryptedObject } = await seal.encrypt({
        threshold: SEAL_THRESHOLD,
        packageId: PACKAGE_ID,
        id,
        data: new TextEncoder().encode(plaintext),
      });
      setCiphertext(toBase64(encryptedObject));
      setEncStatus(
        "Encrypted to allowlist! Copy the ciphertext and paste it into decrypt.",
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
      const allowlistObjId = parseAllowlistIdentity(parsed.id);

      setDecStatus("Sign the session key in your wallet...");
      const sessionKey = await getSessionKey(address);

      setDecStatus("Building PTB with Allowlist object...");
      const txBytes = await buildAllowlistApprovePtb(
        suiClient,
        parsed.packageId,
        parsed.id,
        allowlistObjId,
      );

      setDecStatus("Key servers dry-running: is sender on the allowlist?");
      const dec = await seal.decrypt({
        data: encryptedBytes,
        sessionKey,
        txBytes,
      });
      setDecrypted(new TextDecoder().decode(dec));
      setDecStatus("Decrypted! You are on the allowlist.");
    } catch (err) {
      setDecStatus(`Error: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <>
      <Panel
        title="1. Create Allowlist"
        desc="Deploy a shared Allowlist object on-chain. You'll get an AdminCap to manage members."
      >
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
                  placeholder={address}
                />
                <Btn onClick={handleAddMember}>Add</Btn>
              </div>
              <Status text={addStatus} />
            </div>
          </>
        )}
      </Panel>

      <Panel
        title="2. Encrypt to Allowlist"
        desc="Identity = allowlist object ID. Only members can decrypt. Add/remove members without re-encrypting."
        disabled={!allowlistId}
      >
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          rows={2}
          style={inputStyle}
          placeholder="Secret message..."
        />
        <Btn onClick={handleEncrypt}>Encrypt</Btn>
        <Status text={encStatus} />
        {ciphertext && <CopyableOutput value={ciphertext} />}
      </Panel>

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
