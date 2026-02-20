import * as v from "valibot";
import { SignJWT } from "jose";

//#region src/jwt-session/index.d.ts
declare const JwtSessionSchema: v.ObjectSchema<{
  readonly exp: v.NumberSchema<undefined>;
  readonly iat: v.NumberSchema<undefined>;
  readonly iss: v.StringSchema<undefined>;
  readonly aud: v.StringSchema<undefined>;
  readonly payload: v.ObjectSchema<{
    readonly accounts: v.ArraySchema<v.ObjectSchema<{
      readonly address: v.StringSchema<undefined>;
      readonly publicKey: v.StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>;
}, undefined>;
type JwtSessionPayload = v.InferOutput<typeof JwtSessionSchema>;
declare function createJwtSession(payload: JwtSessionPayload['payload'], options: {
  secretKey: Parameters<SignJWT['sign']>[0];
  expirationTime: Parameters<SignJWT['setExpirationTime']>[0];
  issuer: Parameters<SignJWT['setIssuer']>[0];
  audience: Parameters<SignJWT['setAudience']>[0];
}): Promise<string>;
declare function decodeJwtSession(jwt: string): {
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
};
declare function verifyJwtSession(jwt: string, secretKey: CryptoKey | Uint8Array): Promise<{
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
}>;
//#endregion
export { createJwtSession, decodeJwtSession, verifyJwtSession };
//# sourceMappingURL=index.d.mts.map