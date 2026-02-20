import { JsonData, RequestDataType } from "./requests.mjs";
import { ResponseTypes } from "./responses.mjs";

//#region src/web-wallet-channel/dapp-post-message-channel.d.ts
type DappPostMessageChannelOptions = {
  appName: string;
  hostOrigin: string;
  hostPathname?: string;
  extraRequestOptions?: Record<string, JsonData>;
  popupWindow?: Window;
};
declare class DappPostMessageChannel {
  #private;
  constructor({
    appName,
    hostOrigin,
    hostPathname,
    extraRequestOptions,
    popupWindow
  }: DappPostMessageChannelOptions);
  send<T extends RequestDataType['type']>({
    type,
    ...data
  }: {
    type: T;
  } & Extract<RequestDataType, {
    type: T;
  }>): Promise<ResponseTypes[T]>;
  close(): void;
}
//#endregion
export { DappPostMessageChannel };
//# sourceMappingURL=dapp-post-message-channel.d.mts.map