//#region src/zklogin/address.d.ts
declare function computeZkLoginAddressFromSeed(addressSeed: bigint, iss: string, legacyAddress: boolean): string;
declare function jwtToAddress(jwt: string, userSalt: string | bigint, legacyAddress: boolean): string;
interface ComputeZkLoginAddressOptions {
  claimName: string;
  claimValue: string;
  userSalt: string | bigint;
  iss: string;
  aud: string;
  legacyAddress: boolean;
}
declare function computeZkLoginAddress({
  claimName,
  claimValue,
  iss,
  aud,
  userSalt,
  legacyAddress
}: ComputeZkLoginAddressOptions): string;
//#endregion
export { ComputeZkLoginAddressOptions, computeZkLoginAddress, computeZkLoginAddressFromSeed, jwtToAddress };
//# sourceMappingURL=address.d.mts.map