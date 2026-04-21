import { useState, type ReactNode } from "react";

import { buttonStyle, panelStyle, preStyle } from "./styles";

export function Panel({
  title,
  desc,
  disabled,
  children,
}: {
  title: string;
  desc: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        ...panelStyle,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>{desc}</p>
      {children}
    </div>
  );
}

export function Btn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
}

export function Status({ text }: { text: string }) {
  if (!text) return null;
  const isError = text.startsWith("Error") || text.startsWith("Access denied");
  return (
    <p
      style={{
        marginTop: 12,
        fontSize: 14,
        color: isError ? "#e55" : "#5a5",
      }}
    >
      {text}
    </p>
  );
}

export function Result({ text }: { text: string }) {
  return (
    <div
      style={{
        ...preStyle,
        background: "#1a3a1a",
        borderColor: "#2a5a2a",
        color: "#6f6",
        fontSize: 16,
      }}
    >
      {text}
    </div>
  );
}

export function CopyableOutput({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ marginTop: 12, position: "relative" }}>
      <pre
        style={{
          ...preStyle,
          marginTop: 0,
          paddingRight: 80,
          maxHeight: 120,
          overflow: "auto",
        }}
      >
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
