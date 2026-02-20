import { TypeTag } from "./types.mjs";
import { IntentMessage } from "./bcs.mjs";
import { TypeTagSerializer } from "./type-tag-serializer.mjs";
import { PureTypeName, ShapeFromPureTypeName, pureBcsSchemaFromTypeName } from "./pure.mjs";
import * as _mysten_bcs0 from "@mysten/bcs";
import { BcsEnum, BcsStruct, BcsTuple, BcsType, BcsTypeOptions, compareBcsBytes } from "@mysten/bcs";

//#region src/bcs/index.d.ts
declare const suiBcs: {
  U8: _mysten_bcs0.BcsType<number, number, "u8">;
  U16: _mysten_bcs0.BcsType<number, number, "u16">;
  U32: _mysten_bcs0.BcsType<number, number, "u32">;
  U64: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
  U128: _mysten_bcs0.BcsType<string, string | number | bigint, "u128">;
  U256: _mysten_bcs0.BcsType<string, string | number | bigint, "u256">;
  ULEB128: _mysten_bcs0.BcsType<number, number, string>;
  Bool: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
  String: _mysten_bcs0.BcsType<string, string, "string">;
  Address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
  AppId: _mysten_bcs0.BcsEnum<{
    Sui: null;
  }, "AppId">;
  Argument: _mysten_bcs0.BcsEnum<{
    GasCoin: null;
    Input: _mysten_bcs0.BcsType<number, number, "u16">;
    Result: _mysten_bcs0.BcsType<number, number, "u16">;
    NestedResult: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsType<number, number, "u16">, _mysten_bcs0.BcsType<number, number, "u16">], string>;
  }, "Argument">;
  CallArg: _mysten_bcs0.BcsEnum<{
    Pure: _mysten_bcs0.BcsStruct<{
      bytes: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, string>;
    }, string>;
    Object: _mysten_bcs0.BcsEnum<{
      ImmOrOwnedObject: _mysten_bcs0.BcsStruct<{
        objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      }, string>;
      SharedObject: _mysten_bcs0.BcsStruct<{
        objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        mutable: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
      }, string>;
      Receiving: _mysten_bcs0.BcsStruct<{
        objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      }, string>;
    }, "ObjectArg">;
    FundsWithdrawal: _mysten_bcs0.BcsStruct<{
      reservation: _mysten_bcs0.BcsEnum<{
        MaxAmountU64: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      }, "Reservation">;
      typeArg: _mysten_bcs0.BcsEnum<{
        Balance: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
      }, "WithdrawalType">;
      withdrawFrom: _mysten_bcs0.BcsEnum<{
        Sender: null;
        Sponsor: null;
      }, "WithdrawFrom">;
    }, string>;
  }, "CallArg">;
  Command: _mysten_bcs0.BcsEnum<{
    MoveCall: _mysten_bcs0.BcsStruct<{
      package: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      module: _mysten_bcs0.BcsType<string, string, "string">;
      function: _mysten_bcs0.BcsType<string, string, "string">;
      typeArguments: _mysten_bcs0.BcsType<string[], Iterable<string | TypeTag> & {
        length: number;
      }, string>;
      arguments: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
        GasCoin: boolean | object | null;
        Input: number;
        Result: number;
        NestedResult: readonly [number, number];
      }>> & {
        length: number;
      }, string>;
    }, string>;
    TransferObjects: _mysten_bcs0.BcsStruct<{
      objects: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
        GasCoin: boolean | object | null;
        Input: number;
        Result: number;
        NestedResult: readonly [number, number];
      }>> & {
        length: number;
      }, string>;
      address: _mysten_bcs0.BcsEnum<{
        GasCoin: null;
        Input: _mysten_bcs0.BcsType<number, number, "u16">;
        Result: _mysten_bcs0.BcsType<number, number, "u16">;
        NestedResult: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsType<number, number, "u16">, _mysten_bcs0.BcsType<number, number, "u16">], string>;
      }, "Argument">;
    }, string>;
    SplitCoins: _mysten_bcs0.BcsStruct<{
      coin: _mysten_bcs0.BcsEnum<{
        GasCoin: null;
        Input: _mysten_bcs0.BcsType<number, number, "u16">;
        Result: _mysten_bcs0.BcsType<number, number, "u16">;
        NestedResult: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsType<number, number, "u16">, _mysten_bcs0.BcsType<number, number, "u16">], string>;
      }, "Argument">;
      amounts: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
        GasCoin: boolean | object | null;
        Input: number;
        Result: number;
        NestedResult: readonly [number, number];
      }>> & {
        length: number;
      }, string>;
    }, string>;
    MergeCoins: _mysten_bcs0.BcsStruct<{
      destination: _mysten_bcs0.BcsEnum<{
        GasCoin: null;
        Input: _mysten_bcs0.BcsType<number, number, "u16">;
        Result: _mysten_bcs0.BcsType<number, number, "u16">;
        NestedResult: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsType<number, number, "u16">, _mysten_bcs0.BcsType<number, number, "u16">], string>;
      }, "Argument">;
      sources: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
        GasCoin: boolean | object | null;
        Input: number;
        Result: number;
        NestedResult: readonly [number, number];
      }>> & {
        length: number;
      }, string>;
    }, string>;
    Publish: _mysten_bcs0.BcsStruct<{
      modules: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
        length: number;
      }, string>;
      dependencies: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
        length: number;
      }, string>;
    }, string>;
    MakeMoveVec: _mysten_bcs0.BcsStruct<{
      type: _mysten_bcs0.BcsType<string | null, string | null, string>;
      elements: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        GasCoin: true;
        Input: number;
        Result: number;
        NestedResult: [number, number];
      }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
        GasCoin: boolean | object | null;
        Input: number;
        Result: number;
        NestedResult: readonly [number, number];
      }>> & {
        length: number;
      }, string>;
    }, string>;
    Upgrade: _mysten_bcs0.BcsStruct<{
      modules: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
        length: number;
      }, string>;
      dependencies: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
        length: number;
      }, string>;
      package: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      ticket: _mysten_bcs0.BcsEnum<{
        GasCoin: null;
        Input: _mysten_bcs0.BcsType<number, number, "u16">;
        Result: _mysten_bcs0.BcsType<number, number, "u16">;
        NestedResult: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsType<number, number, "u16">, _mysten_bcs0.BcsType<number, number, "u16">], string>;
      }, "Argument">;
    }, string>;
  }, "Command">;
  CompressedSignature: _mysten_bcs0.BcsEnum<{
    ED25519: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[64]">;
    Secp256k1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[64]">;
    Secp256r1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[64]">;
    ZkLogin: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
    Passkey: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
  }, "CompressedSignature">;
  Data: _mysten_bcs0.BcsEnum<{
    Move: _mysten_bcs0.BcsStruct<{
      type: _mysten_bcs0.BcsEnum<{
        Other: _mysten_bcs0.BcsStruct<{
          address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
          module: _mysten_bcs0.BcsType<string, string, "string">;
          name: _mysten_bcs0.BcsType<string, string, "string">;
          typeParams: _mysten_bcs0.BcsType<TypeTag[], Iterable<TypeTag> & {
            length: number;
          }, string>;
        }, string>;
        GasCoin: null;
        StakedSui: null;
        Coin: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
        AccumulatorBalanceWrapper: null;
      }, "MoveObjectType">;
      hasPublicTransfer: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
      version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      contents: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
    }, string>;
    Package: _mysten_bcs0.BcsStruct<{
      id: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      moduleMap: _mysten_bcs0.BcsType<Map<string, Uint8Array<ArrayBufferLike>>, Map<string, Iterable<number>>, "Map<string, vector<u8>>">;
      typeOriginTable: _mysten_bcs0.BcsType<{
        moduleName: string;
        datatypeName: string;
        package: string;
      }[], Iterable<{
        moduleName: string;
        datatypeName: string;
        package: string | Uint8Array<ArrayBufferLike>;
      }> & {
        length: number;
      }, string>;
      linkageTable: _mysten_bcs0.BcsType<Map<string, {
        upgradedId: string;
        upgradedVersion: string;
      }>, Map<string | Uint8Array<ArrayBufferLike>, {
        upgradedId: string | Uint8Array<ArrayBufferLike>;
        upgradedVersion: string | number | bigint;
      }>, `Map<bytes[32], ${string}>`>;
    }, string>;
  }, "Data">;
  GasData: _mysten_bcs0.BcsStruct<{
    payment: _mysten_bcs0.BcsType<{
      objectId: string;
      version: string;
      digest: string;
    }[], Iterable<{
      objectId: string | Uint8Array<ArrayBufferLike>;
      version: string | number | bigint;
      digest: string;
    }> & {
      length: number;
    }, string>;
    owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    price: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    budget: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
  }, string>;
  Intent: _mysten_bcs0.BcsStruct<{
    scope: _mysten_bcs0.BcsEnum<{
      TransactionData: null;
      TransactionEffects: null;
      CheckpointSummary: null;
      PersonalMessage: null;
    }, "IntentScope">;
    version: _mysten_bcs0.BcsEnum<{
      V0: null;
    }, "IntentVersion">;
    appId: _mysten_bcs0.BcsEnum<{
      Sui: null;
    }, "AppId">;
  }, string>;
  IntentMessage: typeof IntentMessage;
  IntentScope: _mysten_bcs0.BcsEnum<{
    TransactionData: null;
    TransactionEffects: null;
    CheckpointSummary: null;
    PersonalMessage: null;
  }, "IntentScope">;
  IntentVersion: _mysten_bcs0.BcsEnum<{
    V0: null;
  }, "IntentVersion">;
  MoveObject: _mysten_bcs0.BcsStruct<{
    type: _mysten_bcs0.BcsEnum<{
      Other: _mysten_bcs0.BcsStruct<{
        address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        module: _mysten_bcs0.BcsType<string, string, "string">;
        name: _mysten_bcs0.BcsType<string, string, "string">;
        typeParams: _mysten_bcs0.BcsType<TypeTag[], Iterable<TypeTag> & {
          length: number;
        }, string>;
      }, string>;
      GasCoin: null;
      StakedSui: null;
      Coin: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
      AccumulatorBalanceWrapper: null;
    }, "MoveObjectType">;
    hasPublicTransfer: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
    version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    contents: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
  }, string>;
  MoveObjectType: _mysten_bcs0.BcsEnum<{
    Other: _mysten_bcs0.BcsStruct<{
      address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      module: _mysten_bcs0.BcsType<string, string, "string">;
      name: _mysten_bcs0.BcsType<string, string, "string">;
      typeParams: _mysten_bcs0.BcsType<TypeTag[], Iterable<TypeTag> & {
        length: number;
      }, string>;
    }, string>;
    GasCoin: null;
    StakedSui: null;
    Coin: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
    AccumulatorBalanceWrapper: null;
  }, "MoveObjectType">;
  MovePackage: _mysten_bcs0.BcsStruct<{
    id: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    moduleMap: _mysten_bcs0.BcsType<Map<string, Uint8Array<ArrayBufferLike>>, Map<string, Iterable<number>>, "Map<string, vector<u8>>">;
    typeOriginTable: _mysten_bcs0.BcsType<{
      moduleName: string;
      datatypeName: string;
      package: string;
    }[], Iterable<{
      moduleName: string;
      datatypeName: string;
      package: string | Uint8Array<ArrayBufferLike>;
    }> & {
      length: number;
    }, string>;
    linkageTable: _mysten_bcs0.BcsType<Map<string, {
      upgradedId: string;
      upgradedVersion: string;
    }>, Map<string | Uint8Array<ArrayBufferLike>, {
      upgradedId: string | Uint8Array<ArrayBufferLike>;
      upgradedVersion: string | number | bigint;
    }>, `Map<bytes[32], ${string}>`>;
  }, string>;
  MultiSig: _mysten_bcs0.BcsStruct<{
    sigs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
      ED25519: Uint8Array<ArrayBufferLike>;
      Secp256k1: Uint8Array<ArrayBufferLike>;
      Secp256r1: Uint8Array<ArrayBufferLike>;
      ZkLogin: Uint8Array<ArrayBufferLike>;
      Passkey: Uint8Array<ArrayBufferLike>;
    }, "ED25519" | "Secp256k1" | "Secp256r1" | "ZkLogin" | "Passkey">[], Iterable<_mysten_bcs0.EnumInputShape<{
      ED25519: Iterable<number>;
      Secp256k1: Iterable<number>;
      Secp256r1: Iterable<number>;
      ZkLogin: Iterable<number>;
      Passkey: Iterable<number>;
    }>> & {
      length: number;
    }, string>;
    bitmap: _mysten_bcs0.BcsType<number, number, "u16">;
    multisig_pk: _mysten_bcs0.BcsStruct<{
      pk_map: _mysten_bcs0.BcsType<{
        pubKey: _mysten_bcs0.EnumOutputShapeWithKeys<{
          ED25519: Uint8Array<ArrayBufferLike>;
          Secp256k1: Uint8Array<ArrayBufferLike>;
          Secp256r1: Uint8Array<ArrayBufferLike>;
          ZkLogin: Uint8Array<ArrayBufferLike>;
          Passkey: Uint8Array<ArrayBufferLike>;
        }, "ED25519" | "Secp256k1" | "Secp256r1" | "ZkLogin" | "Passkey">;
        weight: number;
      }[], Iterable<{
        pubKey: _mysten_bcs0.EnumInputShape<{
          ED25519: Iterable<number>;
          Secp256k1: Iterable<number>;
          Secp256r1: Iterable<number>;
          ZkLogin: Iterable<number>;
          Passkey: Iterable<number>;
        }>;
        weight: number;
      }> & {
        length: number;
      }, string>;
      threshold: _mysten_bcs0.BcsType<number, number, "u16">;
    }, string>;
  }, string>;
  MultiSigPkMap: _mysten_bcs0.BcsStruct<{
    pubKey: _mysten_bcs0.BcsEnum<{
      ED25519: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[32]">;
      Secp256k1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
      Secp256r1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
      ZkLogin: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
      Passkey: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
    }, "PublicKey">;
    weight: _mysten_bcs0.BcsType<number, number, "u8">;
  }, string>;
  MultiSigPublicKey: _mysten_bcs0.BcsStruct<{
    pk_map: _mysten_bcs0.BcsType<{
      pubKey: _mysten_bcs0.EnumOutputShapeWithKeys<{
        ED25519: Uint8Array<ArrayBufferLike>;
        Secp256k1: Uint8Array<ArrayBufferLike>;
        Secp256r1: Uint8Array<ArrayBufferLike>;
        ZkLogin: Uint8Array<ArrayBufferLike>;
        Passkey: Uint8Array<ArrayBufferLike>;
      }, "ED25519" | "Secp256k1" | "Secp256r1" | "ZkLogin" | "Passkey">;
      weight: number;
    }[], Iterable<{
      pubKey: _mysten_bcs0.EnumInputShape<{
        ED25519: Iterable<number>;
        Secp256k1: Iterable<number>;
        Secp256r1: Iterable<number>;
        ZkLogin: Iterable<number>;
        Passkey: Iterable<number>;
      }>;
      weight: number;
    }> & {
      length: number;
    }, string>;
    threshold: _mysten_bcs0.BcsType<number, number, "u16">;
  }, string>;
  Object: _mysten_bcs0.BcsStruct<{
    data: _mysten_bcs0.BcsEnum<{
      Move: _mysten_bcs0.BcsStruct<{
        type: _mysten_bcs0.BcsEnum<{
          Other: _mysten_bcs0.BcsStruct<{
            address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            module: _mysten_bcs0.BcsType<string, string, "string">;
            name: _mysten_bcs0.BcsType<string, string, "string">;
            typeParams: _mysten_bcs0.BcsType<TypeTag[], Iterable<TypeTag> & {
              length: number;
            }, string>;
          }, string>;
          GasCoin: null;
          StakedSui: null;
          Coin: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
          AccumulatorBalanceWrapper: null;
        }, "MoveObjectType">;
        hasPublicTransfer: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
        version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        contents: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
      }, string>;
      Package: _mysten_bcs0.BcsStruct<{
        id: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        moduleMap: _mysten_bcs0.BcsType<Map<string, Uint8Array<ArrayBufferLike>>, Map<string, Iterable<number>>, "Map<string, vector<u8>>">;
        typeOriginTable: _mysten_bcs0.BcsType<{
          moduleName: string;
          datatypeName: string;
          package: string;
        }[], Iterable<{
          moduleName: string;
          datatypeName: string;
          package: string | Uint8Array<ArrayBufferLike>;
        }> & {
          length: number;
        }, string>;
        linkageTable: _mysten_bcs0.BcsType<Map<string, {
          upgradedId: string;
          upgradedVersion: string;
        }>, Map<string | Uint8Array<ArrayBufferLike>, {
          upgradedId: string | Uint8Array<ArrayBufferLike>;
          upgradedVersion: string | number | bigint;
        }>, `Map<bytes[32], ${string}>`>;
      }, string>;
    }, "Data">;
    owner: _mysten_bcs0.BcsEnum<{
      AddressOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      ObjectOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      Shared: _mysten_bcs0.BcsStruct<{
        initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      }, string>;
      Immutable: null;
      ConsensusAddressOwner: _mysten_bcs0.BcsStruct<{
        startVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      }, string>;
    }, "Owner">;
    previousTransaction: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
    storageRebate: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
  }, string>;
  ObjectArg: _mysten_bcs0.BcsEnum<{
    ImmOrOwnedObject: _mysten_bcs0.BcsStruct<{
      objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
    }, string>;
    SharedObject: _mysten_bcs0.BcsStruct<{
      objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      mutable: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
    }, string>;
    Receiving: _mysten_bcs0.BcsStruct<{
      objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
    }, string>;
  }, "ObjectArg">;
  ObjectDigest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
  Owner: _mysten_bcs0.BcsEnum<{
    AddressOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    ObjectOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    Shared: _mysten_bcs0.BcsStruct<{
      initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    }, string>;
    Immutable: null;
    ConsensusAddressOwner: _mysten_bcs0.BcsStruct<{
      startVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    }, string>;
  }, "Owner">;
  PasskeyAuthenticator: _mysten_bcs0.BcsStruct<{
    authenticatorData: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
    clientDataJson: _mysten_bcs0.BcsType<string, string, "string">;
    userSignature: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
  }, string>;
  ProgrammableMoveCall: _mysten_bcs0.BcsStruct<{
    package: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    module: _mysten_bcs0.BcsType<string, string, "string">;
    function: _mysten_bcs0.BcsType<string, string, "string">;
    typeArguments: _mysten_bcs0.BcsType<string[], Iterable<string | TypeTag> & {
      length: number;
    }, string>;
    arguments: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
      GasCoin: true;
      Input: number;
      Result: number;
      NestedResult: [number, number];
    }, "GasCoin" | "Input" | "Result" | "NestedResult">[], Iterable<_mysten_bcs0.EnumInputShape<{
      GasCoin: boolean | object | null;
      Input: number;
      Result: number;
      NestedResult: readonly [number, number];
    }>> & {
      length: number;
    }, string>;
  }, string>;
  ProgrammableTransaction: _mysten_bcs0.BcsStruct<{
    inputs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
      Pure: {
        bytes: string;
      };
      Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
        ImmOrOwnedObject: {
          objectId: string;
          version: string;
          digest: string;
        };
        SharedObject: {
          objectId: string;
          initialSharedVersion: string;
          mutable: boolean;
        };
        Receiving: {
          objectId: string;
          version: string;
          digest: string;
        };
      }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
      FundsWithdrawal: {
        reservation: {
          MaxAmountU64: string;
          $kind: "MaxAmountU64";
        };
        typeArg: {
          Balance: string;
          $kind: "Balance";
        };
        withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
          Sender: true;
          Sponsor: true;
        }, "Sender" | "Sponsor">;
      };
    }, "Pure" | "Object" | "FundsWithdrawal">[], Iterable<_mysten_bcs0.EnumInputShape<{
      Pure: {
        bytes: string | Uint8Array<ArrayBufferLike>;
      };
      Object: _mysten_bcs0.EnumInputShape<{
        ImmOrOwnedObject: {
          objectId: string | Uint8Array<ArrayBufferLike>;
          version: string | number | bigint;
          digest: string;
        };
        SharedObject: {
          objectId: string | Uint8Array<ArrayBufferLike>;
          initialSharedVersion: string | number | bigint;
          mutable: boolean;
        };
        Receiving: {
          objectId: string | Uint8Array<ArrayBufferLike>;
          version: string | number | bigint;
          digest: string;
        };
      }>;
      FundsWithdrawal: {
        reservation: {
          MaxAmountU64: string | number | bigint;
        };
        typeArg: {
          Balance: string | TypeTag;
        };
        withdrawFrom: _mysten_bcs0.EnumInputShape<{
          Sender: boolean | object | null;
          Sponsor: boolean | object | null;
        }>;
      };
    }>> & {
      length: number;
    }, string>;
    commands: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
      MoveCall: {
        package: string;
        module: string;
        function: string;
        typeArguments: string[];
        arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
      };
      TransferObjects: {
        objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
        address: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">;
      };
      SplitCoins: {
        coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">;
        amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
      };
      MergeCoins: {
        destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">;
        sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
      };
      Publish: {
        modules: string[];
        dependencies: string[];
      };
      MakeMoveVec: {
        type: string | null;
        elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
      };
      Upgrade: {
        modules: string[];
        dependencies: string[];
        package: string;
        ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
          GasCoin: true;
          Input: number;
          Result: number;
          NestedResult: [number, number];
        }, "GasCoin" | "Input" | "Result" | "NestedResult">;
      };
    }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[], Iterable<_mysten_bcs0.EnumInputShape<{
      MoveCall: {
        package: string | Uint8Array<ArrayBufferLike>;
        module: string;
        function: string;
        typeArguments: Iterable<string | TypeTag> & {
          length: number;
        };
        arguments: Iterable<_mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>> & {
          length: number;
        };
      };
      TransferObjects: {
        objects: Iterable<_mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>> & {
          length: number;
        };
        address: _mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>;
      };
      SplitCoins: {
        coin: _mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>;
        amounts: Iterable<_mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>> & {
          length: number;
        };
      };
      MergeCoins: {
        destination: _mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>;
        sources: Iterable<_mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>> & {
          length: number;
        };
      };
      Publish: {
        modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
          length: number;
        };
        dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
          length: number;
        };
      };
      MakeMoveVec: {
        type: string | null;
        elements: Iterable<_mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>> & {
          length: number;
        };
      };
      Upgrade: {
        modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
          length: number;
        };
        dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
          length: number;
        };
        package: string | Uint8Array<ArrayBufferLike>;
        ticket: _mysten_bcs0.EnumInputShape<{
          GasCoin: boolean | object | null;
          Input: number;
          Result: number;
          NestedResult: readonly [number, number];
        }>;
      };
    }>> & {
      length: number;
    }, string>;
  }, string>;
  PublicKey: _mysten_bcs0.BcsEnum<{
    ED25519: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[32]">;
    Secp256k1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
    Secp256r1: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
    ZkLogin: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
    Passkey: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "bytes[33]">;
  }, "PublicKey">;
  SenderSignedData: _mysten_bcs0.BcsType<{
    intentMessage: {
      intent: {
        scope: _mysten_bcs0.EnumOutputShapeWithKeys<{
          TransactionData: true;
          TransactionEffects: true;
          CheckpointSummary: true;
          PersonalMessage: true;
        }, "TransactionData" | "TransactionEffects" | "CheckpointSummary" | "PersonalMessage">;
        version: {
          V0: true;
          $kind: "V0";
        };
        appId: {
          Sui: true;
          $kind: "Sui";
        };
      };
      value: {
        V1: {
          kind: _mysten_bcs0.EnumOutputShapeWithKeys<{
            ProgrammableTransaction: {
              inputs: _mysten_bcs0.EnumOutputShapeWithKeys<{
                Pure: {
                  bytes: string;
                };
                Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
                  ImmOrOwnedObject: {
                    objectId: string;
                    version: string;
                    digest: string;
                  };
                  SharedObject: {
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                  };
                  Receiving: {
                    objectId: string;
                    version: string;
                    digest: string;
                  };
                }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
                FundsWithdrawal: {
                  reservation: {
                    MaxAmountU64: string;
                    $kind: "MaxAmountU64";
                  };
                  typeArg: {
                    Balance: string;
                    $kind: "Balance";
                  };
                  withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    Sender: true;
                    Sponsor: true;
                  }, "Sender" | "Sponsor">;
                };
              }, "Pure" | "Object" | "FundsWithdrawal">[];
              commands: _mysten_bcs0.EnumOutputShapeWithKeys<{
                MoveCall: {
                  package: string;
                  module: string;
                  function: string;
                  typeArguments: string[];
                  arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                TransferObjects: {
                  objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                  address: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                };
                SplitCoins: {
                  coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                  amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                MergeCoins: {
                  destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                  sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                Publish: {
                  modules: string[];
                  dependencies: string[];
                };
                MakeMoveVec: {
                  type: string | null;
                  elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                Upgrade: {
                  modules: string[];
                  dependencies: string[];
                  package: string;
                  ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                };
              }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[];
            };
            ChangeEpoch: true;
            Genesis: true;
            ConsensusCommitPrologue: true;
          }, "ProgrammableTransaction" | "ChangeEpoch" | "Genesis" | "ConsensusCommitPrologue">;
          sender: string;
          gasData: {
            payment: {
              objectId: string;
              version: string;
              digest: string;
            }[];
            owner: string;
            price: string;
            budget: string;
          };
          expiration: _mysten_bcs0.EnumOutputShapeWithKeys<{
            None: true;
            Epoch: number;
            ValidDuring: {
              minEpoch: string | null;
              maxEpoch: string | null;
              minTimestamp: string | null;
              maxTimestamp: string | null;
              chain: string;
              nonce: number;
            };
          }, "None" | "Epoch" | "ValidDuring">;
        };
        $kind: "V1";
      };
    };
    txSignatures: string[];
  }[], Iterable<{
    intentMessage: {
      intent: {
        scope: _mysten_bcs0.EnumInputShape<{
          TransactionData: boolean | object | null;
          TransactionEffects: boolean | object | null;
          CheckpointSummary: boolean | object | null;
          PersonalMessage: boolean | object | null;
        }>;
        version: {
          V0: boolean | object | null;
        };
        appId: {
          Sui: boolean | object | null;
        };
      };
      value: {
        V1: {
          kind: _mysten_bcs0.EnumInputShape<{
            ProgrammableTransaction: {
              inputs: Iterable<_mysten_bcs0.EnumInputShape<{
                Pure: {
                  bytes: string | Uint8Array<ArrayBufferLike>;
                };
                Object: _mysten_bcs0.EnumInputShape<{
                  ImmOrOwnedObject: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    version: string | number | bigint;
                    digest: string;
                  };
                  SharedObject: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    initialSharedVersion: string | number | bigint;
                    mutable: boolean;
                  };
                  Receiving: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    version: string | number | bigint;
                    digest: string;
                  };
                }>;
                FundsWithdrawal: {
                  reservation: {
                    MaxAmountU64: string | number | bigint;
                  };
                  typeArg: {
                    Balance: string | TypeTag;
                  };
                  withdrawFrom: _mysten_bcs0.EnumInputShape<{
                    Sender: boolean | object | null;
                    Sponsor: boolean | object | null;
                  }>;
                };
              }>> & {
                length: number;
              };
              commands: Iterable<_mysten_bcs0.EnumInputShape<{
                MoveCall: {
                  package: string | Uint8Array<ArrayBufferLike>;
                  module: string;
                  function: string;
                  typeArguments: Iterable<string | TypeTag> & {
                    length: number;
                  };
                  arguments: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                TransferObjects: {
                  objects: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                  address: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                };
                SplitCoins: {
                  coin: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                  amounts: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                MergeCoins: {
                  destination: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                  sources: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                Publish: {
                  modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                };
                MakeMoveVec: {
                  type: string | null;
                  elements: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                Upgrade: {
                  modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  package: string | Uint8Array<ArrayBufferLike>;
                  ticket: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                };
              }>> & {
                length: number;
              };
            };
            ChangeEpoch: boolean | object | null;
            Genesis: boolean | object | null;
            ConsensusCommitPrologue: boolean | object | null;
          }>;
          sender: string | Uint8Array<ArrayBufferLike>;
          gasData: {
            payment: Iterable<{
              objectId: string | Uint8Array<ArrayBufferLike>;
              version: string | number | bigint;
              digest: string;
            }> & {
              length: number;
            };
            owner: string | Uint8Array<ArrayBufferLike>;
            price: string | number | bigint;
            budget: string | number | bigint;
          };
          expiration: _mysten_bcs0.EnumInputShape<{
            None: boolean | object | null;
            Epoch: string | number;
            ValidDuring: {
              minEpoch: string | number | bigint | null | undefined;
              maxEpoch: string | number | bigint | null | undefined;
              minTimestamp: string | number | bigint | null | undefined;
              maxTimestamp: string | number | bigint | null | undefined;
              chain: string;
              nonce: number;
            };
          }>;
        };
      };
    };
    txSignatures: Iterable<string | Uint8Array<ArrayBufferLike>> & {
      length: number;
    };
  }> & {
    length: number;
  }, "SenderSignedData">;
  SenderSignedTransaction: _mysten_bcs0.BcsStruct<{
    intentMessage: _mysten_bcs0.BcsStruct<{
      intent: _mysten_bcs0.BcsStruct<{
        scope: _mysten_bcs0.BcsEnum<{
          TransactionData: null;
          TransactionEffects: null;
          CheckpointSummary: null;
          PersonalMessage: null;
        }, "IntentScope">;
        version: _mysten_bcs0.BcsEnum<{
          V0: null;
        }, "IntentVersion">;
        appId: _mysten_bcs0.BcsEnum<{
          Sui: null;
        }, "AppId">;
      }, string>;
      value: _mysten_bcs0.BcsEnum<{
        V1: _mysten_bcs0.BcsStruct<{
          kind: _mysten_bcs0.BcsEnum<{
            ProgrammableTransaction: _mysten_bcs0.BcsStruct<{
              inputs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
                Pure: {
                  bytes: string;
                };
                Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
                  ImmOrOwnedObject: {
                    objectId: string;
                    version: string;
                    digest: string;
                  };
                  SharedObject: {
                    objectId: string;
                    initialSharedVersion: string;
                    mutable: boolean;
                  };
                  Receiving: {
                    objectId: string;
                    version: string;
                    digest: string;
                  };
                }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
                FundsWithdrawal: {
                  reservation: {
                    MaxAmountU64: string;
                    $kind: "MaxAmountU64";
                  };
                  typeArg: {
                    Balance: string;
                    $kind: "Balance";
                  };
                  withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    Sender: true;
                    Sponsor: true;
                  }, "Sender" | "Sponsor">;
                };
              }, "Pure" | "Object" | "FundsWithdrawal">[], Iterable<_mysten_bcs0.EnumInputShape<{
                Pure: {
                  bytes: string | Uint8Array<ArrayBufferLike>;
                };
                Object: _mysten_bcs0.EnumInputShape<{
                  ImmOrOwnedObject: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    version: string | number | bigint;
                    digest: string;
                  };
                  SharedObject: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    initialSharedVersion: string | number | bigint;
                    mutable: boolean;
                  };
                  Receiving: {
                    objectId: string | Uint8Array<ArrayBufferLike>;
                    version: string | number | bigint;
                    digest: string;
                  };
                }>;
                FundsWithdrawal: {
                  reservation: {
                    MaxAmountU64: string | number | bigint;
                  };
                  typeArg: {
                    Balance: string | TypeTag;
                  };
                  withdrawFrom: _mysten_bcs0.EnumInputShape<{
                    Sender: boolean | object | null;
                    Sponsor: boolean | object | null;
                  }>;
                };
              }>> & {
                length: number;
              }, string>;
              commands: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
                MoveCall: {
                  package: string;
                  module: string;
                  function: string;
                  typeArguments: string[];
                  arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                TransferObjects: {
                  objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                  address: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                };
                SplitCoins: {
                  coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                  amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                MergeCoins: {
                  destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                  sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                Publish: {
                  modules: string[];
                  dependencies: string[];
                };
                MakeMoveVec: {
                  type: string | null;
                  elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
                };
                Upgrade: {
                  modules: string[];
                  dependencies: string[];
                  package: string;
                  ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
                    GasCoin: true;
                    Input: number;
                    Result: number;
                    NestedResult: [number, number];
                  }, "GasCoin" | "Input" | "Result" | "NestedResult">;
                };
              }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[], Iterable<_mysten_bcs0.EnumInputShape<{
                MoveCall: {
                  package: string | Uint8Array<ArrayBufferLike>;
                  module: string;
                  function: string;
                  typeArguments: Iterable<string | TypeTag> & {
                    length: number;
                  };
                  arguments: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                TransferObjects: {
                  objects: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                  address: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                };
                SplitCoins: {
                  coin: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                  amounts: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                MergeCoins: {
                  destination: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                  sources: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                Publish: {
                  modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                };
                MakeMoveVec: {
                  type: string | null;
                  elements: Iterable<_mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>> & {
                    length: number;
                  };
                };
                Upgrade: {
                  modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                    length: number;
                  };
                  package: string | Uint8Array<ArrayBufferLike>;
                  ticket: _mysten_bcs0.EnumInputShape<{
                    GasCoin: boolean | object | null;
                    Input: number;
                    Result: number;
                    NestedResult: readonly [number, number];
                  }>;
                };
              }>> & {
                length: number;
              }, string>;
            }, string>;
            ChangeEpoch: null;
            Genesis: null;
            ConsensusCommitPrologue: null;
          }, "TransactionKind">;
          sender: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
          gasData: _mysten_bcs0.BcsStruct<{
            payment: _mysten_bcs0.BcsType<{
              objectId: string;
              version: string;
              digest: string;
            }[], Iterable<{
              objectId: string | Uint8Array<ArrayBufferLike>;
              version: string | number | bigint;
              digest: string;
            }> & {
              length: number;
            }, string>;
            owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            price: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            budget: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
          }, string>;
          expiration: _mysten_bcs0.BcsEnum<{
            None: null;
            Epoch: _mysten_bcs0.BcsType<number, string | number, "u64">;
            ValidDuring: _mysten_bcs0.BcsStruct<{
              minEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
              maxEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
              minTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
              maxTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
              chain: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
              nonce: _mysten_bcs0.BcsType<number, number, "u32">;
            }, string>;
          }, "TransactionExpiration">;
        }, string>;
      }, "TransactionData">;
    }, string>;
    txSignatures: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
      length: number;
    }, string>;
  }, string>;
  SharedObjectRef: _mysten_bcs0.BcsStruct<{
    objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    mutable: _mysten_bcs0.BcsType<boolean, boolean, "bool">;
  }, string>;
  StructTag: _mysten_bcs0.BcsStruct<{
    address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    module: _mysten_bcs0.BcsType<string, string, "string">;
    name: _mysten_bcs0.BcsType<string, string, "string">;
    typeParams: _mysten_bcs0.BcsType<TypeTag[], Iterable<TypeTag> & {
      length: number;
    }, string>;
  }, string>;
  SuiObjectRef: _mysten_bcs0.BcsStruct<{
    objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
  }, string>;
  TransactionData: _mysten_bcs0.BcsEnum<{
    V1: _mysten_bcs0.BcsStruct<{
      kind: _mysten_bcs0.BcsEnum<{
        ProgrammableTransaction: _mysten_bcs0.BcsStruct<{
          inputs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
            Pure: {
              bytes: string;
            };
            Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
              ImmOrOwnedObject: {
                objectId: string;
                version: string;
                digest: string;
              };
              SharedObject: {
                objectId: string;
                initialSharedVersion: string;
                mutable: boolean;
              };
              Receiving: {
                objectId: string;
                version: string;
                digest: string;
              };
            }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
            FundsWithdrawal: {
              reservation: {
                MaxAmountU64: string;
                $kind: "MaxAmountU64";
              };
              typeArg: {
                Balance: string;
                $kind: "Balance";
              };
              withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
                Sender: true;
                Sponsor: true;
              }, "Sender" | "Sponsor">;
            };
          }, "Pure" | "Object" | "FundsWithdrawal">[], Iterable<_mysten_bcs0.EnumInputShape<{
            Pure: {
              bytes: string | Uint8Array<ArrayBufferLike>;
            };
            Object: _mysten_bcs0.EnumInputShape<{
              ImmOrOwnedObject: {
                objectId: string | Uint8Array<ArrayBufferLike>;
                version: string | number | bigint;
                digest: string;
              };
              SharedObject: {
                objectId: string | Uint8Array<ArrayBufferLike>;
                initialSharedVersion: string | number | bigint;
                mutable: boolean;
              };
              Receiving: {
                objectId: string | Uint8Array<ArrayBufferLike>;
                version: string | number | bigint;
                digest: string;
              };
            }>;
            FundsWithdrawal: {
              reservation: {
                MaxAmountU64: string | number | bigint;
              };
              typeArg: {
                Balance: string | TypeTag;
              };
              withdrawFrom: _mysten_bcs0.EnumInputShape<{
                Sender: boolean | object | null;
                Sponsor: boolean | object | null;
              }>;
            };
          }>> & {
            length: number;
          }, string>;
          commands: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
            MoveCall: {
              package: string;
              module: string;
              function: string;
              typeArguments: string[];
              arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
            };
            TransferObjects: {
              objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
              address: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">;
            };
            SplitCoins: {
              coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">;
              amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
            };
            MergeCoins: {
              destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">;
              sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
            };
            Publish: {
              modules: string[];
              dependencies: string[];
            };
            MakeMoveVec: {
              type: string | null;
              elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
            };
            Upgrade: {
              modules: string[];
              dependencies: string[];
              package: string;
              ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
                GasCoin: true;
                Input: number;
                Result: number;
                NestedResult: [number, number];
              }, "GasCoin" | "Input" | "Result" | "NestedResult">;
            };
          }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[], Iterable<_mysten_bcs0.EnumInputShape<{
            MoveCall: {
              package: string | Uint8Array<ArrayBufferLike>;
              module: string;
              function: string;
              typeArguments: Iterable<string | TypeTag> & {
                length: number;
              };
              arguments: Iterable<_mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>> & {
                length: number;
              };
            };
            TransferObjects: {
              objects: Iterable<_mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>> & {
                length: number;
              };
              address: _mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>;
            };
            SplitCoins: {
              coin: _mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>;
              amounts: Iterable<_mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>> & {
                length: number;
              };
            };
            MergeCoins: {
              destination: _mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>;
              sources: Iterable<_mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>> & {
                length: number;
              };
            };
            Publish: {
              modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              };
              dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              };
            };
            MakeMoveVec: {
              type: string | null;
              elements: Iterable<_mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>> & {
                length: number;
              };
            };
            Upgrade: {
              modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              };
              dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              };
              package: string | Uint8Array<ArrayBufferLike>;
              ticket: _mysten_bcs0.EnumInputShape<{
                GasCoin: boolean | object | null;
                Input: number;
                Result: number;
                NestedResult: readonly [number, number];
              }>;
            };
          }>> & {
            length: number;
          }, string>;
        }, string>;
        ChangeEpoch: null;
        Genesis: null;
        ConsensusCommitPrologue: null;
      }, "TransactionKind">;
      sender: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      gasData: _mysten_bcs0.BcsStruct<{
        payment: _mysten_bcs0.BcsType<{
          objectId: string;
          version: string;
          digest: string;
        }[], Iterable<{
          objectId: string | Uint8Array<ArrayBufferLike>;
          version: string | number | bigint;
          digest: string;
        }> & {
          length: number;
        }, string>;
        owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        price: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        budget: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      }, string>;
      expiration: _mysten_bcs0.BcsEnum<{
        None: null;
        Epoch: _mysten_bcs0.BcsType<number, string | number, "u64">;
        ValidDuring: _mysten_bcs0.BcsStruct<{
          minEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
          maxEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
          minTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
          maxTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
          chain: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
          nonce: _mysten_bcs0.BcsType<number, number, "u32">;
        }, string>;
      }, "TransactionExpiration">;
    }, string>;
  }, "TransactionData">;
  TransactionDataV1: _mysten_bcs0.BcsStruct<{
    kind: _mysten_bcs0.BcsEnum<{
      ProgrammableTransaction: _mysten_bcs0.BcsStruct<{
        inputs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
          Pure: {
            bytes: string;
          };
          Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
            ImmOrOwnedObject: {
              objectId: string;
              version: string;
              digest: string;
            };
            SharedObject: {
              objectId: string;
              initialSharedVersion: string;
              mutable: boolean;
            };
            Receiving: {
              objectId: string;
              version: string;
              digest: string;
            };
          }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
          FundsWithdrawal: {
            reservation: {
              MaxAmountU64: string;
              $kind: "MaxAmountU64";
            };
            typeArg: {
              Balance: string;
              $kind: "Balance";
            };
            withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
              Sender: true;
              Sponsor: true;
            }, "Sender" | "Sponsor">;
          };
        }, "Pure" | "Object" | "FundsWithdrawal">[], Iterable<_mysten_bcs0.EnumInputShape<{
          Pure: {
            bytes: string | Uint8Array<ArrayBufferLike>;
          };
          Object: _mysten_bcs0.EnumInputShape<{
            ImmOrOwnedObject: {
              objectId: string | Uint8Array<ArrayBufferLike>;
              version: string | number | bigint;
              digest: string;
            };
            SharedObject: {
              objectId: string | Uint8Array<ArrayBufferLike>;
              initialSharedVersion: string | number | bigint;
              mutable: boolean;
            };
            Receiving: {
              objectId: string | Uint8Array<ArrayBufferLike>;
              version: string | number | bigint;
              digest: string;
            };
          }>;
          FundsWithdrawal: {
            reservation: {
              MaxAmountU64: string | number | bigint;
            };
            typeArg: {
              Balance: string | TypeTag;
            };
            withdrawFrom: _mysten_bcs0.EnumInputShape<{
              Sender: boolean | object | null;
              Sponsor: boolean | object | null;
            }>;
          };
        }>> & {
          length: number;
        }, string>;
        commands: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
          MoveCall: {
            package: string;
            module: string;
            function: string;
            typeArguments: string[];
            arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
          };
          TransferObjects: {
            objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
            address: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">;
          };
          SplitCoins: {
            coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">;
            amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
          };
          MergeCoins: {
            destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">;
            sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
          };
          Publish: {
            modules: string[];
            dependencies: string[];
          };
          MakeMoveVec: {
            type: string | null;
            elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
          };
          Upgrade: {
            modules: string[];
            dependencies: string[];
            package: string;
            ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
              GasCoin: true;
              Input: number;
              Result: number;
              NestedResult: [number, number];
            }, "GasCoin" | "Input" | "Result" | "NestedResult">;
          };
        }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[], Iterable<_mysten_bcs0.EnumInputShape<{
          MoveCall: {
            package: string | Uint8Array<ArrayBufferLike>;
            module: string;
            function: string;
            typeArguments: Iterable<string | TypeTag> & {
              length: number;
            };
            arguments: Iterable<_mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>> & {
              length: number;
            };
          };
          TransferObjects: {
            objects: Iterable<_mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>> & {
              length: number;
            };
            address: _mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>;
          };
          SplitCoins: {
            coin: _mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>;
            amounts: Iterable<_mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>> & {
              length: number;
            };
          };
          MergeCoins: {
            destination: _mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>;
            sources: Iterable<_mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>> & {
              length: number;
            };
          };
          Publish: {
            modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
              length: number;
            };
            dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
              length: number;
            };
          };
          MakeMoveVec: {
            type: string | null;
            elements: Iterable<_mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>> & {
              length: number;
            };
          };
          Upgrade: {
            modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
              length: number;
            };
            dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
              length: number;
            };
            package: string | Uint8Array<ArrayBufferLike>;
            ticket: _mysten_bcs0.EnumInputShape<{
              GasCoin: boolean | object | null;
              Input: number;
              Result: number;
              NestedResult: readonly [number, number];
            }>;
          };
        }>> & {
          length: number;
        }, string>;
      }, string>;
      ChangeEpoch: null;
      Genesis: null;
      ConsensusCommitPrologue: null;
    }, "TransactionKind">;
    sender: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    gasData: _mysten_bcs0.BcsStruct<{
      payment: _mysten_bcs0.BcsType<{
        objectId: string;
        version: string;
        digest: string;
      }[], Iterable<{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }> & {
        length: number;
      }, string>;
      owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
      price: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      budget: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
    }, string>;
    expiration: _mysten_bcs0.BcsEnum<{
      None: null;
      Epoch: _mysten_bcs0.BcsType<number, string | number, "u64">;
      ValidDuring: _mysten_bcs0.BcsStruct<{
        minEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        maxEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        minTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        maxTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        chain: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
        nonce: _mysten_bcs0.BcsType<number, number, "u32">;
      }, string>;
    }, "TransactionExpiration">;
  }, string>;
  TransactionEffects: _mysten_bcs0.BcsEnum<{
    V1: _mysten_bcs0.BcsStruct<{
      status: _mysten_bcs0.BcsEnum<{
        Success: null;
        Failure: _mysten_bcs0.BcsStruct<{
          error: _mysten_bcs0.BcsEnum<{
            InsufficientGas: null;
            InvalidGasObject: null;
            InvariantViolation: null;
            FeatureNotYetSupported: null;
            MoveObjectTooBig: _mysten_bcs0.BcsStruct<{
              objectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxObjectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            MovePackageTooBig: _mysten_bcs0.BcsStruct<{
              objectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxObjectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            CircularObjectOwnership: _mysten_bcs0.BcsStruct<{
              object: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            }, string>;
            InsufficientCoinBalance: null;
            CoinBalanceOverflow: null;
            PublishErrorNonZeroAddress: null;
            SuiMoveVerificationError: null;
            MovePrimitiveRuntimeError: _mysten_bcs0.BcsType<{
              module: {
                address: string;
                name: string;
              };
              function: number;
              instruction: number;
              functionName: string | null;
            } | null, {
              module: {
                address: string | Uint8Array<ArrayBufferLike>;
                name: string;
              };
              function: number;
              instruction: number;
              functionName: string | null | undefined;
            } | null | undefined, `Option<${string}>`>;
            MoveAbort: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsStruct<{
              module: _mysten_bcs0.BcsStruct<{
                address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                name: _mysten_bcs0.BcsType<string, string, "string">;
              }, string>;
              function: _mysten_bcs0.BcsType<number, number, "u16">;
              instruction: _mysten_bcs0.BcsType<number, number, "u16">;
              functionName: _mysten_bcs0.BcsType<string | null, string | null | undefined, "Option<string>">;
            }, string>, _mysten_bcs0.BcsType<string, string | number | bigint, "u64">], string>;
            VMVerificationOrDeserializationError: null;
            VMInvariantViolation: null;
            FunctionNotFound: null;
            ArityMismatch: null;
            TypeArityMismatch: null;
            NonEntryFunctionInvoked: null;
            CommandArgumentError: _mysten_bcs0.BcsStruct<{
              argIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              kind: _mysten_bcs0.BcsEnum<{
                TypeMismatch: null;
                InvalidBCSBytes: null;
                InvalidUsageOfPureArg: null;
                InvalidArgumentToPrivateEntryFunction: null;
                IndexOutOfBounds: _mysten_bcs0.BcsStruct<{
                  idx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                SecondaryIndexOutOfBounds: _mysten_bcs0.BcsStruct<{
                  resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                  secondaryIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                InvalidResultArity: _mysten_bcs0.BcsStruct<{
                  resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                InvalidGasCoinUsage: null;
                InvalidValueUsage: null;
                InvalidObjectByValue: null;
                InvalidObjectByMutRef: null;
                SharedObjectOperationNotAllowed: null;
                InvalidArgumentArity: null;
                InvalidTransferObject: null;
                InvalidMakeMoveVecNonObjectArgument: null;
                ArgumentWithoutValue: null;
                CannotMoveBorrowedValue: null;
                CannotWriteToExtendedReference: null;
                InvalidReferenceArgument: null;
              }, "CommandArgumentError">;
            }, string>;
            TypeArgumentError: _mysten_bcs0.BcsStruct<{
              argumentIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              kind: _mysten_bcs0.BcsEnum<{
                TypeNotFound: null;
                ConstraintNotSatisfied: null;
              }, "TypeArgumentError">;
            }, string>;
            UnusedValueWithoutDrop: _mysten_bcs0.BcsStruct<{
              resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              secondaryIdx: _mysten_bcs0.BcsType<number, number, "u16">;
            }, string>;
            InvalidPublicFunctionReturnType: _mysten_bcs0.BcsStruct<{
              idx: _mysten_bcs0.BcsType<number, number, "u16">;
            }, string>;
            InvalidTransferObject: null;
            EffectsTooLarge: _mysten_bcs0.BcsStruct<{
              currentSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            PublishUpgradeMissingDependency: null;
            PublishUpgradeDependencyDowngrade: null;
            PackageUpgradeError: _mysten_bcs0.BcsStruct<{
              upgradeError: _mysten_bcs0.BcsEnum<{
                UnableToFetchPackage: _mysten_bcs0.BcsStruct<{
                  packageId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
                NotAPackage: _mysten_bcs0.BcsStruct<{
                  objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
                IncompatibleUpgrade: null;
                DigestDoesNotMatch: _mysten_bcs0.BcsStruct<{
                  digest: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
                }, string>;
                UnknownUpgradePolicy: _mysten_bcs0.BcsStruct<{
                  policy: _mysten_bcs0.BcsType<number, number, "u8">;
                }, string>;
                PackageIDDoesNotMatch: _mysten_bcs0.BcsStruct<{
                  packageId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                  ticketId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
              }, "PackageUpgradeError">;
            }, string>;
            WrittenObjectsTooLarge: _mysten_bcs0.BcsStruct<{
              currentSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            CertificateDenied: null;
            SuiMoveVerificationTimedout: null;
            SharedObjectOperationNotAllowed: null;
            InputObjectDeleted: null;
            ExecutionCancelledDueToSharedObjectCongestion: _mysten_bcs0.BcsStruct<{
              congested_objects: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              }, string>;
            }, string>;
            AddressDeniedForCoin: _mysten_bcs0.BcsStruct<{
              address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
              coinType: _mysten_bcs0.BcsType<string, string, "string">;
            }, string>;
            CoinTypeGlobalPause: _mysten_bcs0.BcsStruct<{
              coinType: _mysten_bcs0.BcsType<string, string, "string">;
            }, string>;
            ExecutionCancelledDueToRandomnessUnavailable: null;
            MoveVectorElemTooBig: _mysten_bcs0.BcsStruct<{
              valueSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxScaledSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            MoveRawValueTooBig: _mysten_bcs0.BcsStruct<{
              valueSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxScaledSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            InvalidLinkage: null;
            InsufficientBalanceForWithdraw: null;
            NonExclusiveWriteInputObjectModified: _mysten_bcs0.BcsStruct<{
              id: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            }, string>;
          }, "ExecutionFailureStatus">;
          command: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        }, string>;
      }, "ExecutionStatus">;
      executedEpoch: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      gasUsed: _mysten_bcs0.BcsStruct<{
        computationCost: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        storageCost: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        storageRebate: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        nonRefundableStorageFee: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      }, string>;
      modifiedAtVersions: _mysten_bcs0.BcsType<[string, string][], Iterable<readonly [string | Uint8Array<ArrayBufferLike>, string | number | bigint]> & {
        length: number;
      }, string>;
      sharedObjects: _mysten_bcs0.BcsType<{
        objectId: string;
        version: string;
        digest: string;
      }[], Iterable<{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }> & {
        length: number;
      }, string>;
      transactionDigest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      created: _mysten_bcs0.BcsType<[{
        objectId: string;
        version: string;
        digest: string;
      }, _mysten_bcs0.EnumOutputShapeWithKeys<{
        AddressOwner: string;
        ObjectOwner: string;
        Shared: {
          initialSharedVersion: string;
        };
        Immutable: true;
        ConsensusAddressOwner: {
          startVersion: string;
          owner: string;
        };
      }, "AddressOwner" | "ObjectOwner" | "Shared" | "Immutable" | "ConsensusAddressOwner">][], Iterable<readonly [{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }, _mysten_bcs0.EnumInputShape<{
        AddressOwner: string | Uint8Array<ArrayBufferLike>;
        ObjectOwner: string | Uint8Array<ArrayBufferLike>;
        Shared: {
          initialSharedVersion: string | number | bigint;
        };
        Immutable: boolean | object | null;
        ConsensusAddressOwner: {
          startVersion: string | number | bigint;
          owner: string | Uint8Array<ArrayBufferLike>;
        };
      }>]> & {
        length: number;
      }, string>;
      mutated: _mysten_bcs0.BcsType<[{
        objectId: string;
        version: string;
        digest: string;
      }, _mysten_bcs0.EnumOutputShapeWithKeys<{
        AddressOwner: string;
        ObjectOwner: string;
        Shared: {
          initialSharedVersion: string;
        };
        Immutable: true;
        ConsensusAddressOwner: {
          startVersion: string;
          owner: string;
        };
      }, "AddressOwner" | "ObjectOwner" | "Shared" | "Immutable" | "ConsensusAddressOwner">][], Iterable<readonly [{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }, _mysten_bcs0.EnumInputShape<{
        AddressOwner: string | Uint8Array<ArrayBufferLike>;
        ObjectOwner: string | Uint8Array<ArrayBufferLike>;
        Shared: {
          initialSharedVersion: string | number | bigint;
        };
        Immutable: boolean | object | null;
        ConsensusAddressOwner: {
          startVersion: string | number | bigint;
          owner: string | Uint8Array<ArrayBufferLike>;
        };
      }>]> & {
        length: number;
      }, string>;
      unwrapped: _mysten_bcs0.BcsType<[{
        objectId: string;
        version: string;
        digest: string;
      }, _mysten_bcs0.EnumOutputShapeWithKeys<{
        AddressOwner: string;
        ObjectOwner: string;
        Shared: {
          initialSharedVersion: string;
        };
        Immutable: true;
        ConsensusAddressOwner: {
          startVersion: string;
          owner: string;
        };
      }, "AddressOwner" | "ObjectOwner" | "Shared" | "Immutable" | "ConsensusAddressOwner">][], Iterable<readonly [{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }, _mysten_bcs0.EnumInputShape<{
        AddressOwner: string | Uint8Array<ArrayBufferLike>;
        ObjectOwner: string | Uint8Array<ArrayBufferLike>;
        Shared: {
          initialSharedVersion: string | number | bigint;
        };
        Immutable: boolean | object | null;
        ConsensusAddressOwner: {
          startVersion: string | number | bigint;
          owner: string | Uint8Array<ArrayBufferLike>;
        };
      }>]> & {
        length: number;
      }, string>;
      deleted: _mysten_bcs0.BcsType<{
        objectId: string;
        version: string;
        digest: string;
      }[], Iterable<{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }> & {
        length: number;
      }, string>;
      unwrappedThenDeleted: _mysten_bcs0.BcsType<{
        objectId: string;
        version: string;
        digest: string;
      }[], Iterable<{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }> & {
        length: number;
      }, string>;
      wrapped: _mysten_bcs0.BcsType<{
        objectId: string;
        version: string;
        digest: string;
      }[], Iterable<{
        objectId: string | Uint8Array<ArrayBufferLike>;
        version: string | number | bigint;
        digest: string;
      }> & {
        length: number;
      }, string>;
      gasObject: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsStruct<{
        objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        version: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        digest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      }, string>, _mysten_bcs0.BcsEnum<{
        AddressOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        ObjectOwner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        Shared: _mysten_bcs0.BcsStruct<{
          initialSharedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        }, string>;
        Immutable: null;
        ConsensusAddressOwner: _mysten_bcs0.BcsStruct<{
          startVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
          owner: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
        }, string>;
      }, "Owner">], string>;
      eventsDigest: _mysten_bcs0.BcsType<string | null, string | null | undefined, "Option<ObjectDigest>">;
      dependencies: _mysten_bcs0.BcsType<string[], Iterable<string> & {
        length: number;
      }, string>;
    }, string>;
    V2: _mysten_bcs0.BcsStruct<{
      status: _mysten_bcs0.BcsEnum<{
        Success: null;
        Failure: _mysten_bcs0.BcsStruct<{
          error: _mysten_bcs0.BcsEnum<{
            InsufficientGas: null;
            InvalidGasObject: null;
            InvariantViolation: null;
            FeatureNotYetSupported: null;
            MoveObjectTooBig: _mysten_bcs0.BcsStruct<{
              objectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxObjectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            MovePackageTooBig: _mysten_bcs0.BcsStruct<{
              objectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxObjectSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            CircularObjectOwnership: _mysten_bcs0.BcsStruct<{
              object: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            }, string>;
            InsufficientCoinBalance: null;
            CoinBalanceOverflow: null;
            PublishErrorNonZeroAddress: null;
            SuiMoveVerificationError: null;
            MovePrimitiveRuntimeError: _mysten_bcs0.BcsType<{
              module: {
                address: string;
                name: string;
              };
              function: number;
              instruction: number;
              functionName: string | null;
            } | null, {
              module: {
                address: string | Uint8Array<ArrayBufferLike>;
                name: string;
              };
              function: number;
              instruction: number;
              functionName: string | null | undefined;
            } | null | undefined, `Option<${string}>`>;
            MoveAbort: _mysten_bcs0.BcsTuple<readonly [_mysten_bcs0.BcsStruct<{
              module: _mysten_bcs0.BcsStruct<{
                address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                name: _mysten_bcs0.BcsType<string, string, "string">;
              }, string>;
              function: _mysten_bcs0.BcsType<number, number, "u16">;
              instruction: _mysten_bcs0.BcsType<number, number, "u16">;
              functionName: _mysten_bcs0.BcsType<string | null, string | null | undefined, "Option<string>">;
            }, string>, _mysten_bcs0.BcsType<string, string | number | bigint, "u64">], string>;
            VMVerificationOrDeserializationError: null;
            VMInvariantViolation: null;
            FunctionNotFound: null;
            ArityMismatch: null;
            TypeArityMismatch: null;
            NonEntryFunctionInvoked: null;
            CommandArgumentError: _mysten_bcs0.BcsStruct<{
              argIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              kind: _mysten_bcs0.BcsEnum<{
                TypeMismatch: null;
                InvalidBCSBytes: null;
                InvalidUsageOfPureArg: null;
                InvalidArgumentToPrivateEntryFunction: null;
                IndexOutOfBounds: _mysten_bcs0.BcsStruct<{
                  idx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                SecondaryIndexOutOfBounds: _mysten_bcs0.BcsStruct<{
                  resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                  secondaryIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                InvalidResultArity: _mysten_bcs0.BcsStruct<{
                  resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
                }, string>;
                InvalidGasCoinUsage: null;
                InvalidValueUsage: null;
                InvalidObjectByValue: null;
                InvalidObjectByMutRef: null;
                SharedObjectOperationNotAllowed: null;
                InvalidArgumentArity: null;
                InvalidTransferObject: null;
                InvalidMakeMoveVecNonObjectArgument: null;
                ArgumentWithoutValue: null;
                CannotMoveBorrowedValue: null;
                CannotWriteToExtendedReference: null;
                InvalidReferenceArgument: null;
              }, "CommandArgumentError">;
            }, string>;
            TypeArgumentError: _mysten_bcs0.BcsStruct<{
              argumentIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              kind: _mysten_bcs0.BcsEnum<{
                TypeNotFound: null;
                ConstraintNotSatisfied: null;
              }, "TypeArgumentError">;
            }, string>;
            UnusedValueWithoutDrop: _mysten_bcs0.BcsStruct<{
              resultIdx: _mysten_bcs0.BcsType<number, number, "u16">;
              secondaryIdx: _mysten_bcs0.BcsType<number, number, "u16">;
            }, string>;
            InvalidPublicFunctionReturnType: _mysten_bcs0.BcsStruct<{
              idx: _mysten_bcs0.BcsType<number, number, "u16">;
            }, string>;
            InvalidTransferObject: null;
            EffectsTooLarge: _mysten_bcs0.BcsStruct<{
              currentSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            PublishUpgradeMissingDependency: null;
            PublishUpgradeDependencyDowngrade: null;
            PackageUpgradeError: _mysten_bcs0.BcsStruct<{
              upgradeError: _mysten_bcs0.BcsEnum<{
                UnableToFetchPackage: _mysten_bcs0.BcsStruct<{
                  packageId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
                NotAPackage: _mysten_bcs0.BcsStruct<{
                  objectId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
                IncompatibleUpgrade: null;
                DigestDoesNotMatch: _mysten_bcs0.BcsStruct<{
                  digest: _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
                }, string>;
                UnknownUpgradePolicy: _mysten_bcs0.BcsStruct<{
                  policy: _mysten_bcs0.BcsType<number, number, "u8">;
                }, string>;
                PackageIDDoesNotMatch: _mysten_bcs0.BcsStruct<{
                  packageId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                  ticketId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
                }, string>;
              }, "PackageUpgradeError">;
            }, string>;
            WrittenObjectsTooLarge: _mysten_bcs0.BcsStruct<{
              currentSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            CertificateDenied: null;
            SuiMoveVerificationTimedout: null;
            SharedObjectOperationNotAllowed: null;
            InputObjectDeleted: null;
            ExecutionCancelledDueToSharedObjectCongestion: _mysten_bcs0.BcsStruct<{
              congested_objects: _mysten_bcs0.BcsType<string[], Iterable<string | Uint8Array<ArrayBufferLike>> & {
                length: number;
              }, string>;
            }, string>;
            AddressDeniedForCoin: _mysten_bcs0.BcsStruct<{
              address: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
              coinType: _mysten_bcs0.BcsType<string, string, "string">;
            }, string>;
            CoinTypeGlobalPause: _mysten_bcs0.BcsStruct<{
              coinType: _mysten_bcs0.BcsType<string, string, "string">;
            }, string>;
            ExecutionCancelledDueToRandomnessUnavailable: null;
            MoveVectorElemTooBig: _mysten_bcs0.BcsStruct<{
              valueSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxScaledSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            MoveRawValueTooBig: _mysten_bcs0.BcsStruct<{
              valueSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
              maxScaledSize: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
            }, string>;
            InvalidLinkage: null;
            InsufficientBalanceForWithdraw: null;
            NonExclusiveWriteInputObjectModified: _mysten_bcs0.BcsStruct<{
              id: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
            }, string>;
          }, "ExecutionFailureStatus">;
          command: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
        }, string>;
      }, "ExecutionStatus">;
      executedEpoch: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      gasUsed: _mysten_bcs0.BcsStruct<{
        computationCost: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        storageCost: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        storageRebate: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
        nonRefundableStorageFee: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      }, string>;
      transactionDigest: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      gasObjectIndex: _mysten_bcs0.BcsType<number | null, number | null | undefined, "Option<u32>">;
      eventsDigest: _mysten_bcs0.BcsType<string | null, string | null | undefined, "Option<ObjectDigest>">;
      dependencies: _mysten_bcs0.BcsType<string[], Iterable<string> & {
        length: number;
      }, string>;
      lamportVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
      changedObjects: _mysten_bcs0.BcsType<[string, {
        inputState: _mysten_bcs0.EnumOutputShapeWithKeys<{
          NotExist: true;
          Exist: [[string, string], _mysten_bcs0.EnumOutputShapeWithKeys<{
            AddressOwner: string;
            ObjectOwner: string;
            Shared: {
              initialSharedVersion: string;
            };
            Immutable: true;
            ConsensusAddressOwner: {
              startVersion: string;
              owner: string;
            };
          }, "AddressOwner" | "ObjectOwner" | "Shared" | "Immutable" | "ConsensusAddressOwner">];
        }, "NotExist" | "Exist">;
        outputState: _mysten_bcs0.EnumOutputShapeWithKeys<{
          NotExist: true;
          ObjectWrite: [string, _mysten_bcs0.EnumOutputShapeWithKeys<{
            AddressOwner: string;
            ObjectOwner: string;
            Shared: {
              initialSharedVersion: string;
            };
            Immutable: true;
            ConsensusAddressOwner: {
              startVersion: string;
              owner: string;
            };
          }, "AddressOwner" | "ObjectOwner" | "Shared" | "Immutable" | "ConsensusAddressOwner">];
          PackageWrite: [string, string];
          AccumulatorWriteV1: {
            address: {
              address: string;
              ty: string;
            };
            operation: _mysten_bcs0.EnumOutputShapeWithKeys<{
              Merge: true;
              Split: true;
            }, "Merge" | "Split">;
            value: _mysten_bcs0.EnumOutputShapeWithKeys<{
              Integer: string;
              IntegerTuple: [string, string];
              EventDigest: [string, string][];
            }, "Integer" | "IntegerTuple" | "EventDigest">;
          };
        }, "NotExist" | "ObjectWrite" | "PackageWrite" | "AccumulatorWriteV1">;
        idOperation: _mysten_bcs0.EnumOutputShapeWithKeys<{
          None: true;
          Created: true;
          Deleted: true;
        }, "None" | "Created" | "Deleted">;
      }][], Iterable<readonly [string | Uint8Array<ArrayBufferLike>, {
        inputState: _mysten_bcs0.EnumInputShape<{
          NotExist: boolean | object | null;
          Exist: readonly [readonly [string | number | bigint, string], _mysten_bcs0.EnumInputShape<{
            AddressOwner: string | Uint8Array<ArrayBufferLike>;
            ObjectOwner: string | Uint8Array<ArrayBufferLike>;
            Shared: {
              initialSharedVersion: string | number | bigint;
            };
            Immutable: boolean | object | null;
            ConsensusAddressOwner: {
              startVersion: string | number | bigint;
              owner: string | Uint8Array<ArrayBufferLike>;
            };
          }>];
        }>;
        outputState: _mysten_bcs0.EnumInputShape<{
          NotExist: boolean | object | null;
          ObjectWrite: readonly [string, _mysten_bcs0.EnumInputShape<{
            AddressOwner: string | Uint8Array<ArrayBufferLike>;
            ObjectOwner: string | Uint8Array<ArrayBufferLike>;
            Shared: {
              initialSharedVersion: string | number | bigint;
            };
            Immutable: boolean | object | null;
            ConsensusAddressOwner: {
              startVersion: string | number | bigint;
              owner: string | Uint8Array<ArrayBufferLike>;
            };
          }>];
          PackageWrite: readonly [string | number | bigint, string];
          AccumulatorWriteV1: {
            address: {
              address: string | Uint8Array<ArrayBufferLike>;
              ty: string | TypeTag;
            };
            operation: _mysten_bcs0.EnumInputShape<{
              Merge: boolean | object | null;
              Split: boolean | object | null;
            }>;
            value: _mysten_bcs0.EnumInputShape<{
              Integer: string | number | bigint;
              IntegerTuple: readonly [string | number | bigint, string | number | bigint];
              EventDigest: Iterable<readonly [string | number | bigint, string]> & {
                length: number;
              };
            }>;
          };
        }>;
        idOperation: _mysten_bcs0.EnumInputShape<{
          None: boolean | object | null;
          Created: boolean | object | null;
          Deleted: boolean | object | null;
        }>;
      }]> & {
        length: number;
      }, string>;
      unchangedConsensusObjects: _mysten_bcs0.BcsType<[string, _mysten_bcs0.EnumOutputShapeWithKeys<{
        ReadOnlyRoot: [string, string];
        MutateConsensusStreamEnded: string;
        ReadConsensusStreamEnded: string;
        Cancelled: string;
        PerEpochConfig: true;
      }, "ReadOnlyRoot" | "MutateConsensusStreamEnded" | "ReadConsensusStreamEnded" | "Cancelled" | "PerEpochConfig">][], Iterable<readonly [string | Uint8Array<ArrayBufferLike>, _mysten_bcs0.EnumInputShape<{
        ReadOnlyRoot: readonly [string | number | bigint, string];
        MutateConsensusStreamEnded: string | number | bigint;
        ReadConsensusStreamEnded: string | number | bigint;
        Cancelled: string | number | bigint;
        PerEpochConfig: boolean | object | null;
      }>]> & {
        length: number;
      }, string>;
      auxDataDigest: _mysten_bcs0.BcsType<string | null, string | null | undefined, "Option<ObjectDigest>">;
    }, string>;
  }, "TransactionEffects">;
  TransactionExpiration: _mysten_bcs0.BcsEnum<{
    None: null;
    Epoch: _mysten_bcs0.BcsType<number, string | number, "u64">;
    ValidDuring: _mysten_bcs0.BcsStruct<{
      minEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
      maxEpoch: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
      minTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
      maxTimestamp: _mysten_bcs0.BcsType<string | null, string | number | bigint | null | undefined, "Option<u64>">;
      chain: _mysten_bcs0.BcsType<string, string, "ObjectDigest">;
      nonce: _mysten_bcs0.BcsType<number, number, "u32">;
    }, string>;
  }, "TransactionExpiration">;
  TransactionKind: _mysten_bcs0.BcsEnum<{
    ProgrammableTransaction: _mysten_bcs0.BcsStruct<{
      inputs: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        Pure: {
          bytes: string;
        };
        Object: _mysten_bcs0.EnumOutputShapeWithKeys<{
          ImmOrOwnedObject: {
            objectId: string;
            version: string;
            digest: string;
          };
          SharedObject: {
            objectId: string;
            initialSharedVersion: string;
            mutable: boolean;
          };
          Receiving: {
            objectId: string;
            version: string;
            digest: string;
          };
        }, "ImmOrOwnedObject" | "SharedObject" | "Receiving">;
        FundsWithdrawal: {
          reservation: {
            MaxAmountU64: string;
            $kind: "MaxAmountU64";
          };
          typeArg: {
            Balance: string;
            $kind: "Balance";
          };
          withdrawFrom: _mysten_bcs0.EnumOutputShapeWithKeys<{
            Sender: true;
            Sponsor: true;
          }, "Sender" | "Sponsor">;
        };
      }, "Pure" | "Object" | "FundsWithdrawal">[], Iterable<_mysten_bcs0.EnumInputShape<{
        Pure: {
          bytes: string | Uint8Array<ArrayBufferLike>;
        };
        Object: _mysten_bcs0.EnumInputShape<{
          ImmOrOwnedObject: {
            objectId: string | Uint8Array<ArrayBufferLike>;
            version: string | number | bigint;
            digest: string;
          };
          SharedObject: {
            objectId: string | Uint8Array<ArrayBufferLike>;
            initialSharedVersion: string | number | bigint;
            mutable: boolean;
          };
          Receiving: {
            objectId: string | Uint8Array<ArrayBufferLike>;
            version: string | number | bigint;
            digest: string;
          };
        }>;
        FundsWithdrawal: {
          reservation: {
            MaxAmountU64: string | number | bigint;
          };
          typeArg: {
            Balance: string | TypeTag;
          };
          withdrawFrom: _mysten_bcs0.EnumInputShape<{
            Sender: boolean | object | null;
            Sponsor: boolean | object | null;
          }>;
        };
      }>> & {
        length: number;
      }, string>;
      commands: _mysten_bcs0.BcsType<_mysten_bcs0.EnumOutputShapeWithKeys<{
        MoveCall: {
          package: string;
          module: string;
          function: string;
          typeArguments: string[];
          arguments: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
        };
        TransferObjects: {
          objects: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
          address: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">;
        };
        SplitCoins: {
          coin: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">;
          amounts: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
        };
        MergeCoins: {
          destination: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">;
          sources: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
        };
        Publish: {
          modules: string[];
          dependencies: string[];
        };
        MakeMoveVec: {
          type: string | null;
          elements: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">[];
        };
        Upgrade: {
          modules: string[];
          dependencies: string[];
          package: string;
          ticket: _mysten_bcs0.EnumOutputShapeWithKeys<{
            GasCoin: true;
            Input: number;
            Result: number;
            NestedResult: [number, number];
          }, "GasCoin" | "Input" | "Result" | "NestedResult">;
        };
      }, "MoveCall" | "TransferObjects" | "SplitCoins" | "MergeCoins" | "Publish" | "MakeMoveVec" | "Upgrade">[], Iterable<_mysten_bcs0.EnumInputShape<{
        MoveCall: {
          package: string | Uint8Array<ArrayBufferLike>;
          module: string;
          function: string;
          typeArguments: Iterable<string | TypeTag> & {
            length: number;
          };
          arguments: Iterable<_mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>> & {
            length: number;
          };
        };
        TransferObjects: {
          objects: Iterable<_mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>> & {
            length: number;
          };
          address: _mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>;
        };
        SplitCoins: {
          coin: _mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>;
          amounts: Iterable<_mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>> & {
            length: number;
          };
        };
        MergeCoins: {
          destination: _mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>;
          sources: Iterable<_mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>> & {
            length: number;
          };
        };
        Publish: {
          modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
            length: number;
          };
          dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
            length: number;
          };
        };
        MakeMoveVec: {
          type: string | null;
          elements: Iterable<_mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>> & {
            length: number;
          };
        };
        Upgrade: {
          modules: Iterable<string | Uint8Array<ArrayBufferLike>> & {
            length: number;
          };
          dependencies: Iterable<string | Uint8Array<ArrayBufferLike>> & {
            length: number;
          };
          package: string | Uint8Array<ArrayBufferLike>;
          ticket: _mysten_bcs0.EnumInputShape<{
            GasCoin: boolean | object | null;
            Input: number;
            Result: number;
            NestedResult: readonly [number, number];
          }>;
        };
      }>> & {
        length: number;
      }, string>;
    }, string>;
    ChangeEpoch: null;
    Genesis: null;
    ConsensusCommitPrologue: null;
  }, "TransactionKind">;
  TypeOrigin: _mysten_bcs0.BcsStruct<{
    moduleName: _mysten_bcs0.BcsType<string, string, "string">;
    datatypeName: _mysten_bcs0.BcsType<string, string, "string">;
    package: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
  }, string>;
  TypeTag: _mysten_bcs0.BcsType<string, string | TypeTag, string>;
  UpgradeInfo: _mysten_bcs0.BcsStruct<{
    upgradedId: _mysten_bcs0.BcsType<string, string | Uint8Array<ArrayBufferLike>, "bytes[32]">;
    upgradedVersion: _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
  }, string>;
  u8(options?: _mysten_bcs0.BcsTypeOptions<number>): _mysten_bcs0.BcsType<number, number, "u8">;
  u16(options?: _mysten_bcs0.BcsTypeOptions<number>): _mysten_bcs0.BcsType<number, number, "u16">;
  u32(options?: _mysten_bcs0.BcsTypeOptions<number>): _mysten_bcs0.BcsType<number, number, "u32">;
  u64(options?: _mysten_bcs0.BcsTypeOptions<string, number | bigint | string>): _mysten_bcs0.BcsType<string, string | number | bigint, "u64">;
  u128(options?: _mysten_bcs0.BcsTypeOptions<string, number | bigint | string>): _mysten_bcs0.BcsType<string, string | number | bigint, "u128">;
  u256(options?: _mysten_bcs0.BcsTypeOptions<string, number | bigint | string>): _mysten_bcs0.BcsType<string, string | number | bigint, "u256">;
  bool(options?: _mysten_bcs0.BcsTypeOptions<boolean>): _mysten_bcs0.BcsType<boolean, boolean, "bool">;
  uleb128(options?: _mysten_bcs0.BcsTypeOptions<number>): _mysten_bcs0.BcsType<number, number, string>;
  bytes<T extends number>(size: T, options?: _mysten_bcs0.BcsTypeOptions<Uint8Array, Iterable<number>>): _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, `bytes[${T}]`>;
  byteVector(options?: _mysten_bcs0.BcsTypeOptions<Uint8Array, Iterable<number>>): _mysten_bcs0.BcsType<Uint8Array<ArrayBufferLike>, Iterable<number>, "vector<u8>">;
  string(options?: _mysten_bcs0.BcsTypeOptions<string>): _mysten_bcs0.BcsType<string, string, "string">;
  fixedArray: {
    <T extends _mysten_bcs0.BcsType<any>, Name extends string = string>(size: number, type: T, options?: _mysten_bcs0.BcsTypeOptions<_mysten_bcs0.InferBcsType<T>[], Iterable<_mysten_bcs0.InferBcsInput<T>> & {
      length: number;
    }, Name>): _mysten_bcs0.BcsType<_mysten_bcs0.InferBcsType<T>[], Iterable<_mysten_bcs0.InferBcsInput<T>> & {
      length: number;
    }, Name>;
    <T, Input, Name extends string = string>(size: number, type: _mysten_bcs0.BcsType<T, Input>, options?: _mysten_bcs0.BcsTypeOptions<T[], Iterable<Input> & {
      length: number;
    }, Name>): _mysten_bcs0.BcsType<T[], Iterable<Input> & {
      length: number;
    }, Name>;
  };
  option: {
    <T extends _mysten_bcs0.BcsType<any>>(type: T): _mysten_bcs0.BcsType<_mysten_bcs0.InferBcsType<T> | null, _mysten_bcs0.InferBcsInput<T> | null | undefined, `Option<${T["name"]}>`>;
    <T, Input, Name extends string = string>(type: _mysten_bcs0.BcsType<T, Input, Name>): _mysten_bcs0.BcsType<T | null, Input | null | undefined>;
  };
  vector: {
    <T extends _mysten_bcs0.BcsType<any>, Name extends string = `vector<${T["name"]}>`>(type: T, options?: _mysten_bcs0.BcsTypeOptions<_mysten_bcs0.InferBcsType<T>[], Iterable<_mysten_bcs0.InferBcsInput<T>> & {
      length: number;
    }, Name>): _mysten_bcs0.BcsType<_mysten_bcs0.InferBcsType<T>[], Iterable<_mysten_bcs0.InferBcsInput<T>> & {
      length: number;
    }, Name>;
    <T, Input, Name extends string = string>(type: _mysten_bcs0.BcsType<T, Input, Name>, options?: _mysten_bcs0.BcsTypeOptions<T[], Iterable<Input> & {
      length: number;
    }, `vector<${Name}>`>): _mysten_bcs0.BcsType<T[], Iterable<Input> & {
      length: number;
    }, `vector<${Name}>`>;
  };
  tuple<const T extends readonly _mysten_bcs0.BcsType<any, any>[], const Name extends string = `(${_mysten_bcs0.JoinString<{ [K in keyof T]: T[K] extends _mysten_bcs0.BcsType<any, any, infer T_1 extends string> ? T_1 : never }, ", ">})`>(fields: T, options?: _mysten_bcs0.BcsTypeOptions<{ -readonly [K_1 in keyof T]: T[K_1] extends _mysten_bcs0.BcsType<infer T_1, any> ? T_1 : never }, { [K_1 in keyof T]: T[K_1] extends _mysten_bcs0.BcsType<any, infer T_1> ? T_1 : never }, Name>): _mysten_bcs0.BcsTuple<T, Name>;
  struct<T extends Record<string, _mysten_bcs0.BcsType<any>>, const Name extends string = string>(name: Name, fields: T, options?: Omit<_mysten_bcs0.BcsTypeOptions<{ [K in keyof T]: T[K] extends _mysten_bcs0.BcsType<infer U, any> ? U : never }, { [K in keyof T]: T[K] extends _mysten_bcs0.BcsType<any, infer U> ? U : never }>, "name">): _mysten_bcs0.BcsStruct<T, string>;
  enum<T extends Record<string, _mysten_bcs0.BcsType<any> | null>, const Name extends string = string>(name: Name, fields: T, options?: Omit<_mysten_bcs0.BcsTypeOptions<_mysten_bcs0.EnumOutputShape<{ [K in keyof T]: T[K] extends _mysten_bcs0.BcsType<infer U, any, any> ? U : true }>, _mysten_bcs0.EnumInputShape<{ [K in keyof T]: T[K] extends _mysten_bcs0.BcsType<any, infer U, any> ? U : boolean | object | null }>, Name>, "name">): _mysten_bcs0.BcsEnum<T, Name>;
  map: {
    <K$1 extends _mysten_bcs0.BcsType<any>, V extends _mysten_bcs0.BcsType<any>>(keyType: K$1, valueType: V): _mysten_bcs0.BcsType<Map<_mysten_bcs0.InferBcsType<K$1>, _mysten_bcs0.InferBcsType<V>>, Map<_mysten_bcs0.InferBcsInput<K$1>, _mysten_bcs0.InferBcsInput<V>>, `Map<${K$1["name"]}, ${V["name"]}>`>;
    <K$1, V, InputK = K$1, InputV = V>(keyType: _mysten_bcs0.BcsType<K$1, InputK>, valueType: _mysten_bcs0.BcsType<V, InputV>): _mysten_bcs0.BcsType<Map<K$1, V>, Map<InputK, InputV>, `Map<${string}, ${string}>`>;
  };
  lazy<T extends _mysten_bcs0.BcsType<any>>(cb: () => T): T;
};
//#endregion
export { BcsEnum, BcsStruct, BcsTuple, BcsType, type BcsTypeOptions, type PureTypeName, type ShapeFromPureTypeName, type TypeTag, TypeTagSerializer, suiBcs as bcs, compareBcsBytes, pureBcsSchemaFromTypeName };
//# sourceMappingURL=index.d.mts.map