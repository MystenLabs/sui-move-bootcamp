import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit-react";
import { ConnectButton } from "@mysten/dapp-kit-react/ui";

import { AllowlistDemo } from "./components/AllowlistDemo";
import { PrivateDemo } from "./components/PrivateDemo";
import { TimelockDemo } from "./components/TimelockDemo";
import { tabStyle } from "./components/styles";

type Pattern = "private" | "timelock" | "allowlist";

const TABS: readonly [Pattern, string][] = [
  ["private", "Private Data"],
  ["timelock", "Time-Lock"],
  ["allowlist", "Allowlist"],
];

export default function App() {
  const account = useCurrentAccount();
  const [activeTab, setActiveTab] = useState<Pattern>("private");

  return (
    <div
      style={{
        maxWidth: 740,
        margin: "0 auto",
        padding: 40,
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>Seal Demo</h1>
      <p style={{ color: "#888", marginTop: 0, marginBottom: 24 }}>
        Three access control patterns — encrypt &amp; decrypt with Seal on Sui
      </p>

      <div style={{ marginBottom: 32 }}>
        <ConnectButton />
      </div>

      {account && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {TABS.map(([key, label]) => (
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

          {activeTab === "private" && <PrivateDemo address={account.address} />}
          {activeTab === "timelock" && <TimelockDemo address={account.address} />}
          {activeTab === "allowlist" && <AllowlistDemo address={account.address} />}
        </>
      )}
    </div>
  );
}
