import { JsonData, RequestType } from "./requests.mjs";
import { ResponsePayloadType } from "./responses.mjs";
import { verifyJwtSession } from "../jwt-session/index.mjs";

//#region src/web-wallet-channel/wallet-post-message-channel.d.ts
declare class WalletPostMessageChannel {
  #private;
  constructor(request: RequestType);
  static fromPayload(payload: RequestType): WalletPostMessageChannel;
  static fromUrlHash(hash?: string): WalletPostMessageChannel;
  getRequestData(): {
    version: "1";
    requestId: string;
    appUrl: string;
    appName: string;
    payload: {
      type: "connect";
    } | {
      type: "sign-transaction";
      transaction: string;
      address: string;
      chain: string;
      session: string;
    } | {
      type: "sign-and-execute-transaction";
      transaction: string;
      address: string;
      chain: string;
      session: string;
    } | {
      type: "sign-personal-message";
      chain: string;
      message: string;
      address: string;
      session: string;
    };
    metadata?: {
      [x: string]: JsonData;
    } | undefined;
    extraRequestOptions?: {
      [x: string]: JsonData;
    } | undefined;
  };
  verifyJwtSession(secretKey: Parameters<typeof verifyJwtSession>[1]): Promise<{
    exp: number;
    iat: number;
    iss: string;
    aud: string;
    payload: {
      accounts: {
        address: string;
        publicKey: string;
      }[];
    };
  } | null>;
  sendMessage(payload: ResponsePayloadType): void;
  close(payload?: ResponsePayloadType): void;
}
//#endregion
export { WalletPostMessageChannel };
//# sourceMappingURL=wallet-post-message-channel.d.mts.map