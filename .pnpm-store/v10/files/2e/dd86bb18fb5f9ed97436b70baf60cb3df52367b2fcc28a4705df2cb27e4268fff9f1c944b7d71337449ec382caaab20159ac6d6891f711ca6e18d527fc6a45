import { SUI_ADDRESS_LENGTH, normalizeSuiAddress } from "../utils/sui-types.mjs";
import { SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.mjs";
import { genAddressSeed, normalizeZkLoginIssuer, toBigEndianBytes, toPaddedBigEndianBytes } from "./utils.mjs";
import { decodeJwt } from "./jwt-utils.mjs";
import { blake2b } from "@noble/hashes/blake2.js";
import { bytesToHex } from "@noble/hashes/utils.js";

//#region src/zklogin/address.ts
function computeZkLoginAddressFromSeed(addressSeed, iss, legacyAddress) {
	if (legacyAddress === void 0) throw new Error("legacyAddress parameter must be specified");
	const addressSeedBytesBigEndian = legacyAddress ? toBigEndianBytes(addressSeed, 32) : toPaddedBigEndianBytes(addressSeed, 32);
	const addressParamBytes = new TextEncoder().encode(normalizeZkLoginIssuer(iss));
	const tmp = new Uint8Array(2 + addressSeedBytesBigEndian.length + addressParamBytes.length);
	tmp.set([SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
	tmp.set([addressParamBytes.length], 1);
	tmp.set(addressParamBytes, 2);
	tmp.set(addressSeedBytesBigEndian, 2 + addressParamBytes.length);
	return normalizeSuiAddress(bytesToHex(blake2b(tmp, { dkLen: 32 })).slice(0, SUI_ADDRESS_LENGTH * 2));
}
const MAX_HEADER_LEN_B64 = 248;
const MAX_PADDED_UNSIGNED_JWT_LEN = 1600;
function lengthChecks(jwt) {
	const [header, payload] = jwt.split(".");
	if (header.length > MAX_HEADER_LEN_B64) throw new Error(`Header is too long`);
	const L = (header.length + 1 + payload.length) * 8;
	const K = (960 - (L % 512 + 1)) % 512;
	if ((L + 1 + K + 64) / 8 > MAX_PADDED_UNSIGNED_JWT_LEN) throw new Error(`JWT is too long`);
}
function jwtToAddress(jwt, userSalt, legacyAddress) {
	if (legacyAddress === void 0) throw new Error("legacyAddress parameter must be specified");
	lengthChecks(jwt);
	const decodedJWT = decodeJwt(jwt);
	return computeZkLoginAddress({
		userSalt,
		claimName: "sub",
		claimValue: decodedJWT.sub,
		aud: decodedJWT.aud,
		iss: decodedJWT.iss,
		legacyAddress
	});
}
function computeZkLoginAddress({ claimName, claimValue, iss, aud, userSalt, legacyAddress }) {
	if (legacyAddress === void 0) throw new Error("legacyAddress parameter must be specified");
	return computeZkLoginAddressFromSeed(genAddressSeed(userSalt, claimName, claimValue, aud), iss, legacyAddress);
}

//#endregion
export { computeZkLoginAddress, computeZkLoginAddressFromSeed, jwtToAddress };
//# sourceMappingURL=address.mjs.map