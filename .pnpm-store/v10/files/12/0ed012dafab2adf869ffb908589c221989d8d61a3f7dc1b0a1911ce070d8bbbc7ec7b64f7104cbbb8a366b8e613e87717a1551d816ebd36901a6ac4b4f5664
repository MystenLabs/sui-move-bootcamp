import { JwtPayload } from "./jwt-decode.mjs";

//#region src/zklogin/jwt-utils.d.ts

declare function decodeJwt(jwt: string): Omit<JwtPayload, 'iss' | 'aud' | 'sub'> & {
  iss: string;
  aud: string;
  sub: string;
  rawIss: string;
};
//#endregion
export { decodeJwt };
//# sourceMappingURL=jwt-utils.d.mts.map