import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiSui } from "react-icons/si";
import type { ToastOptions } from "react-toastify";

export const NOT_GENERATED_TEXT = <span className="text-[var(--text-muted)] italic font-mono text-sm">Not generated</span>;
export const NOT_CONNECTED_TEXT = <span className="text-[var(--text-muted)] italic font-mono text-sm">Not connected</span>;

export const SUI_ICON = <SiSui className="text-xl inline-block align-sub" />;
export const SUI_ICON_BLUE = <SiSui className="text-xl inline-block align-sub text-blue-400" />;

export const SUI_TEXT = <span className="text-blue-400 font-bold">{SUI_ICON}Sui</span>;

export const TOAST_OPTIONS: ToastOptions = {
    position: 'top-right',
    autoClose: 2000,
    style: { width: "100%"}
};

export const PROVIDER_ICON: Record<string, any> = {
    google: <FcGoogle style={{ display: "inline-block" }} size={20} className="align-sub"/>,
    apple: <FaApple style={{ display: "inline-block" }} size={20} className="align-sub"/>,
}