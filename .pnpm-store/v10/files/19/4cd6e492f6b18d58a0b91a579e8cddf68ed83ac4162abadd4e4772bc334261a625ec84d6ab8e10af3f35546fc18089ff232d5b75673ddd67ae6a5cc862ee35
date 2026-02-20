import { ZkLoginSignature } from "./bcs.mjs";

//#region src/zklogin/signature.d.ts
interface ZkLoginSignatureExtended extends Omit<ZkLoginSignature, 'userSignature'> {
  userSignature: string | ZkLoginSignature['userSignature'];
}
declare function getZkLoginSignature({
  inputs,
  maxEpoch,
  userSignature
}: ZkLoginSignatureExtended): string;
declare function parseZkLoginSignature(signature: string | Uint8Array): {
  inputs: {
    proofPoints: {
      a: string[];
      b: string[][];
      c: string[];
    };
    issBase64Details: {
      value: string;
      indexMod4: number;
    };
    headerBase64: string;
    addressSeed: string;
  };
  maxEpoch: string;
  userSignature: Uint8Array<ArrayBufferLike>;
};
//#endregion
export { getZkLoginSignature, parseZkLoginSignature };
//# sourceMappingURL=signature.d.mts.map