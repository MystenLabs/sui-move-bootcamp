import { Timestamp } from "../../../google/protobuf/timestamp.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/name_service.d.ts

/**
 * @generated from protobuf message sui.rpc.v2.LookupNameRequest
 */
interface LookupNameRequest {
  /**
   * Required. The SuiNS name to lookup.
   *
   * Supports both `@name` as well as `name.sui` formats.
   *
   * @generated from protobuf field: optional string name = 1;
   */
  name?: string;
}
/**
 * @generated from protobuf message sui.rpc.v2.LookupNameResponse
 */
interface LookupNameResponse {
  /**
   * The record for the requested name
   *
   * @generated from protobuf field: optional sui.rpc.v2.NameRecord record = 1;
   */
  record?: NameRecord;
}
/**
 * @generated from protobuf message sui.rpc.v2.ReverseLookupNameRequest
 */
interface ReverseLookupNameRequest {
  /**
   * Required. The address to perform a reverse lookup for.
   *
   * @generated from protobuf field: optional string address = 1;
   */
  address?: string;
}
/**
 * @generated from protobuf message sui.rpc.v2.ReverseLookupNameResponse
 */
interface ReverseLookupNameResponse {
  /**
   * The record for the SuiNS name linked to the requested address
   *
   * @generated from protobuf field: optional sui.rpc.v2.NameRecord record = 1;
   */
  record?: NameRecord;
}
/**
 * @generated from protobuf message sui.rpc.v2.NameRecord
 */
interface NameRecord {
  /**
   * Id of this record.
   *
   * Note that records are stored on chain as dynamic fields of the type
   * `Field<Domain,NameRecord>`.
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * The SuiNS name of this record
   *
   * @generated from protobuf field: optional string name = 2;
   */
  name?: string;
  /**
   * The ID of the `RegistrationNFT` assigned to this record.
   *
   * The owner of the corresponding `RegistrationNFT` has the rights to
   * be able to change and adjust the `target_address` of this domain.
   *
   * It is possible that the ID changes if the record expires and is
   * purchased by someone else.
   *
   * @generated from protobuf field: optional string registration_nft_id = 3;
   */
  registrationNftId?: string;
  /**
   * Timestamp when the record expires.
   *
   * This is either the expiration of the record itself or the expiration of
   * this record's parent if this is a leaf record.
   *
   * @generated from protobuf field: optional google.protobuf.Timestamp expiration_timestamp = 4;
   */
  expirationTimestamp?: Timestamp;
  /**
   * The target address that this name points to
   *
   * @generated from protobuf field: optional string target_address = 5;
   */
  targetAddress?: string;
  /**
   * Additional data which may be stored in a record
   *
   * @generated from protobuf field: map<string, string> data = 6;
   */
  data: {
    [key: string]: string;
  };
}
declare class LookupNameRequest$Type extends MessageType<LookupNameRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.LookupNameRequest
 */
declare const LookupNameRequest: LookupNameRequest$Type;
declare class LookupNameResponse$Type extends MessageType<LookupNameResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.LookupNameResponse
 */
declare const LookupNameResponse: LookupNameResponse$Type;
declare class ReverseLookupNameRequest$Type extends MessageType<ReverseLookupNameRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ReverseLookupNameRequest
 */
declare const ReverseLookupNameRequest: ReverseLookupNameRequest$Type;
declare class ReverseLookupNameResponse$Type extends MessageType<ReverseLookupNameResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ReverseLookupNameResponse
 */
declare const ReverseLookupNameResponse: ReverseLookupNameResponse$Type;
declare class NameRecord$Type extends MessageType<NameRecord> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.NameRecord
 */
declare const NameRecord: NameRecord$Type;
/**
 * @generated ServiceType for protobuf service sui.rpc.v2.NameService
 */
declare const NameService: ServiceType;
//#endregion
export { LookupNameRequest, LookupNameResponse, NameRecord, NameService, ReverseLookupNameRequest, ReverseLookupNameResponse };
//# sourceMappingURL=name_service.d.mts.map