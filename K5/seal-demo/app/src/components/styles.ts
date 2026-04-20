import type { CSSProperties } from "react";

export const panelStyle: CSSProperties = {
  border: "1px solid #333",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  background: "#1a1a1a",
};

export const tabStyle: CSSProperties = {
  padding: "8px 20px",
  borderRadius: 8,
  border: "1px solid #333",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

export const inputStyle: CSSProperties = {
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

export const buttonStyle: CSSProperties = {
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

export const preStyle: CSSProperties = {
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
