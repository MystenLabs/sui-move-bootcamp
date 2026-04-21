import { useRef } from "react";
import { SessionKey } from "@mysten/seal";
import { useDAppKit } from "@mysten/dapp-kit-react";

import { PACKAGE_ID, SESSION_KEY_TTL_MIN } from "../config";
import { useSuiClient } from "./useSealClient";

/**
 * Returns a `getSessionKey(address)` function that lazily creates (and caches)
 * a SessionKey, prompting the wallet for a personal-message signature the
 * first time or after expiry.
 */
export function useSessionKey() {
  const suiClient = useSuiClient();
  const dAppKit = useDAppKit();
  const ref = useRef<SessionKey | null>(null);

  return async function getSessionKey(address: string): Promise<SessionKey> {
    if (!ref.current || ref.current.isExpired()) {
      const sk = await SessionKey.create({
        address,
        packageId: PACKAGE_ID,
        ttlMin: SESSION_KEY_TTL_MIN,
        suiClient,
      });
      const message = sk.getPersonalMessage();
      const { signature } = await dAppKit.signPersonalMessage({ message });
      sk.setPersonalMessageSignature(signature);
      ref.current = sk;
    }
    return ref.current;
  };
}
