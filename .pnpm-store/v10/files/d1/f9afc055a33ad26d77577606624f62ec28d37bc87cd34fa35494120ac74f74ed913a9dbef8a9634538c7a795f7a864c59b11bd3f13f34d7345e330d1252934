import * as v from "valibot";
import { SignJWT, decodeJwt, jwtVerify } from "jose";

//#region src/jwt-session/index.ts
const AccountSchema = v.object({
	address: v.string(),
	publicKey: v.string()
});
const JwtSessionSchema = v.object({
	exp: v.number(),
	iat: v.number(),
	iss: v.string(),
	aud: v.string(),
	payload: v.object({ accounts: v.array(AccountSchema) })
});
async function createJwtSession(payload, options) {
	return await new SignJWT({ payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime(options.expirationTime).setIssuedAt().setIssuer(options.issuer).setAudience(options.audience).sign(options.secretKey);
}
function decodeJwtSession(jwt) {
	const decodedJwt = decodeJwt(jwt);
	return v.parse(JwtSessionSchema, decodedJwt);
}
async function verifyJwtSession(jwt, secretKey) {
	const verified = await jwtVerify(jwt, secretKey, { algorithms: ["HS256"] });
	return v.parse(JwtSessionSchema, verified.payload);
}

//#endregion
export { createJwtSession, decodeJwtSession, verifyJwtSession };
//# sourceMappingURL=index.mjs.map