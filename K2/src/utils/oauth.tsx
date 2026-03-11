import type { Config } from "../config";

export const getOauthUrl = (
  oauthConfig: Config["oauth"],
  nonce: string
) => {
  switch (oauthConfig.providerName.toLowerCase()) {
    case "google": {
      const redirectUri = window.location.origin;
      const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=${oauthConfig.clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=openid%20email%20profile&prompt=select_account&nonce=${nonce}`;
      return url;
    }
    case "apple":
      return "https://appleid.apple.com/auth/authorize";
    default:
      throw new Error(`Unsupported provider: ${oauthConfig.providerName}`);
  }
}

export const openOauthPopup = (url: string) => {
  const popup = window.open(url, "_blank", "width=500,height=600");
  if (!popup) {
    throw new Error("Failed to open popup");
  }
  return popup;
}
