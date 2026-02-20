import { Bcs } from "./bcs.mjs";
import { Object as Object$1 } from "./object.mjs";
import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/state_service.d.ts

/**
 * Request message for `NodeService.GetCoinInfo`.
 *
 * @generated from protobuf message sui.rpc.v2.GetCoinInfoRequest
 */
interface GetCoinInfoRequest {
  /**
   * The coin type to request information about
   *
   * @generated from protobuf field: optional string coin_type = 1;
   */
  coinType?: string;
}
/**
 * Response message for `NodeService.GetCoinInfo`.
 *
 * @generated from protobuf message sui.rpc.v2.GetCoinInfoResponse
 */
interface GetCoinInfoResponse {
  /**
   * Required. The coin type.
   *
   * @generated from protobuf field: optional string coin_type = 1;
   */
  coinType?: string;
  /**
   * This field will be populated with information about this coin
   * type's `0x2::coin::CoinMetadata` if it exists and has not been wrapped.
   *
   * @generated from protobuf field: optional sui.rpc.v2.CoinMetadata metadata = 2;
   */
  metadata?: CoinMetadata;
  /**
   * This field will be populated with information about this coin
   * type's `0x2::coin::TreasuryCap` if it exists and has not been wrapped.
   *
   * @generated from protobuf field: optional sui.rpc.v2.CoinTreasury treasury = 3;
   */
  treasury?: CoinTreasury;
  /**
   * If this coin type is a regulated coin, this field will be
   * populated with information either from its Currency object
   * in the CoinRegistry, or from its `0x2::coin::RegulatedCoinMetadata`
   * object for coins that have not been migrated to the CoinRegistry
   *
   * If this coin is not known to be regulated, only the
   * coin_regulated_state field will be populated.
   *
   * @generated from protobuf field: optional sui.rpc.v2.RegulatedCoinMetadata regulated_metadata = 4;
   */
  regulatedMetadata?: RegulatedCoinMetadata;
}
/**
 * Metadata for a coin type
 *
 * @generated from protobuf message sui.rpc.v2.CoinMetadata
 */
interface CoinMetadata {
  /**
   * ObjectId of the `0x2::coin::CoinMetadata` object or
   * 0x2::sui::coin_registry::Currency object (when registered with CoinRegistry).
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * Number of decimal places to coin uses.
   *
   * @generated from protobuf field: optional uint32 decimals = 2;
   */
  decimals?: number;
  /**
   * Name for the token
   *
   * @generated from protobuf field: optional string name = 3;
   */
  name?: string;
  /**
   * Symbol for the token
   *
   * @generated from protobuf field: optional string symbol = 4;
   */
  symbol?: string;
  /**
   * Description of the token
   *
   * @generated from protobuf field: optional string description = 5;
   */
  description?: string;
  /**
   * URL for the token logo
   *
   * @generated from protobuf field: optional string icon_url = 6;
   */
  iconUrl?: string;
  /**
   * The MetadataCap ID if it has been claimed for this coin type.
   * This capability allows updating the coin's metadata fields.
   * Only populated when metadata is from CoinRegistry.
   *
   * @generated from protobuf field: optional string metadata_cap_id = 7;
   */
  metadataCapId?: string;
  /**
   * State of the MetadataCap for this coin type.
   *
   * @generated from protobuf field: optional sui.rpc.v2.CoinMetadata.MetadataCapState metadata_cap_state = 8;
   */
  metadataCapState?: CoinMetadata_MetadataCapState;
}
/**
 * Information about the state of the coin's MetadataCap
 *
 * @generated from protobuf enum sui.rpc.v2.CoinMetadata.MetadataCapState
 */
declare enum CoinMetadata_MetadataCapState {
  /**
   * Indicates the state of the MetadataCap is unknown.
   * Set when the coin has not been migrated to the CoinRegistry.
   *
   * @generated from protobuf enum value: METADATA_CAP_STATE_UNKNOWN = 0;
   */
  METADATA_CAP_STATE_UNKNOWN = 0,
  /**
   * Indicates the MetadataCap has been claimed.
   *
   * @generated from protobuf enum value: CLAIMED = 1;
   */
  CLAIMED = 1,
  /**
   * Indicates the MetadataCap has not been claimed.
   *
   * @generated from protobuf enum value: UNCLAIMED = 2;
   */
  UNCLAIMED = 2,
  /**
   * Indicates the MetadataCap has been deleted.
   *
   * @generated from protobuf enum value: DELETED = 3;
   */
  DELETED = 3,
}
/**
 * Information about a coin type's `0x2::coin::TreasuryCap` and its total available supply
 *
 * @generated from protobuf message sui.rpc.v2.CoinTreasury
 */
interface CoinTreasury {
  /**
   * ObjectId of the `0x2::coin::TreasuryCap` object.
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * Total available supply for this coin type.
   *
   * @generated from protobuf field: optional uint64 total_supply = 2;
   */
  totalSupply?: bigint;
  /**
   * Supply state indicating if the supply is fixed or can still be minted
   *
   * @generated from protobuf field: optional sui.rpc.v2.CoinTreasury.SupplyState supply_state = 3;
   */
  supplyState?: CoinTreasury_SupplyState;
}
/**
 * Supply state of a coin, matching the Move SupplyState enum
 *
 * @generated from protobuf enum sui.rpc.v2.CoinTreasury.SupplyState
 */
declare enum CoinTreasury_SupplyState {
  /**
   * Supply is unknown or TreasuryCap still exists (minting still possible)
   *
   * @generated from protobuf enum value: SUPPLY_STATE_UNKNOWN = 0;
   */
  SUPPLY_STATE_UNKNOWN = 0,
  /**
   * Supply is fixed (TreasuryCap consumed, no more minting possible)
   *
   * @generated from protobuf enum value: FIXED = 1;
   */
  FIXED = 1,
  /**
   * Supply can only decrease (burning allowed, minting not allowed)
   *
   * @generated from protobuf enum value: BURN_ONLY = 2;
   */
  BURN_ONLY = 2,
}
/**
 * Information about a regulated coin, which indicates that it makes use of the transfer deny list.
 *
 * @generated from protobuf message sui.rpc.v2.RegulatedCoinMetadata
 */
interface RegulatedCoinMetadata {
  /**
   * ObjectId of the `0x2::coin::RegulatedCoinMetadata` object.
   * Only present for coins that have not been migrated to CoinRegistry.
   *
   * @generated from protobuf field: optional string id = 1;
   */
  id?: string;
  /**
   * The ID of the coin's `CoinMetadata` or `CoinData` object.
   *
   * @generated from protobuf field: optional string coin_metadata_object = 2;
   */
  coinMetadataObject?: string;
  /**
   * The ID of the coin's `DenyCap` object.
   *
   * @generated from protobuf field: optional string deny_cap_object = 3;
   */
  denyCapObject?: string;
  /**
   * Whether the coin can be globally paused
   *
   * @generated from protobuf field: optional bool allow_global_pause = 4;
   */
  allowGlobalPause?: boolean;
  /**
   * Variant of the regulated coin metadata
   *
   * @generated from protobuf field: optional uint32 variant = 5;
   */
  variant?: number;
  /**
   * Indicates the coin's regulated state.
   *
   * @generated from protobuf field: optional sui.rpc.v2.RegulatedCoinMetadata.CoinRegulatedState coin_regulated_state = 6;
   */
  coinRegulatedState?: RegulatedCoinMetadata_CoinRegulatedState;
}
/**
 * Indicates the state of the regulation of the coin.
 *
 * @generated from protobuf enum sui.rpc.v2.RegulatedCoinMetadata.CoinRegulatedState
 */
declare enum RegulatedCoinMetadata_CoinRegulatedState {
  /**
   * Indicates the regulation state of the coin is unknown.
   * This is set when a coin has not been migrated to the
   * coin registry and has no `0x2::coin::RegulatedCoinMetadata`
   * object.
   *
   * @generated from protobuf enum value: COIN_REGULATED_STATE_UNKNOWN = 0;
   */
  COIN_REGULATED_STATE_UNKNOWN = 0,
  /**
   * Indicates a coin is regulated. RegulatedCoinMetadata will be populated.
   *
   * @generated from protobuf enum value: REGULATED = 1;
   */
  REGULATED = 1,
  /**
   * Indicates a coin is unregulated.
   *
   * @generated from protobuf enum value: UNREGULATED = 2;
   */
  UNREGULATED = 2,
}
/**
 * Request message for `LiveDataService.GetBalance`.
 *
 * @generated from protobuf message sui.rpc.v2.GetBalanceRequest
 */
interface GetBalanceRequest {
  /**
   * Required. The owner's Sui address.
   *
   * @generated from protobuf field: optional string owner = 1;
   */
  owner?: string;
  /**
   * Required. The type names for the coin (e.g., 0x2::sui::SUI).
   *
   * @generated from protobuf field: optional string coin_type = 2;
   */
  coinType?: string;
}
/**
 * Response message for `LiveDataService.GetBalance`.
 * Return the total coin balance for one coin type, owned by the address owner.
 *
 * @generated from protobuf message sui.rpc.v2.GetBalanceResponse
 */
interface GetBalanceResponse {
  /**
   * The balance information for the requested coin type.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Balance balance = 1;
   */
  balance?: Balance;
}
/**
 * Request message for `LiveDataService.ListBalances`.
 *
 * @generated from protobuf message sui.rpc.v2.ListBalancesRequest
 */
interface ListBalancesRequest {
  /**
   * Required. The owner's Sui address.
   *
   * @generated from protobuf field: optional string owner = 1;
   */
  owner?: string;
  /**
   * The maximum number of balance entries to return. The service may return fewer than this value.
   * If unspecified, at most `50` entries will be returned.
   * The maximum value is `1000`; values above `1000` will be coerced to `1000`.
   *
   * @generated from protobuf field: optional uint32 page_size = 2;
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBalances` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListBalances` must
   * match the call that provided the page token.
   *
   * @generated from protobuf field: optional bytes page_token = 3;
   */
  pageToken?: Uint8Array;
}
/**
 * Response message for `LiveDataService.ListBalances`.
 * Return the total coin balance for all coin types, owned by the address owner.
 *
 * @generated from protobuf message sui.rpc.v2.ListBalancesResponse
 */
interface ListBalancesResponse {
  /**
   * The list of coin types and their respective balances.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Balance balances = 1;
   */
  balances: Balance[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   *
   * @generated from protobuf field: optional bytes next_page_token = 2;
   */
  nextPageToken?: Uint8Array;
}
/**
 * Balance information for a specific coin type.
 *
 * @generated from protobuf message sui.rpc.v2.Balance
 */
interface Balance {
  /**
   * The type of the coin (e.g., 0x2::sui::SUI).
   *
   * @generated from protobuf field: optional string coin_type = 1;
   */
  coinType?: string;
  /**
   * The total balance of `coin_type` in its smallest unit.
   * This is the sum of all spendable amounts of `coin_type` (`address_balance`
   * and `coin_balance`).
   *
   * @generated from protobuf field: optional uint64 balance = 3;
   */
  balance?: bigint;
  /**
   * The balance of `Balance<T>` in this address's Address Balance.
   *
   * @generated from protobuf field: optional uint64 address_balance = 4;
   */
  addressBalance?: bigint;
  /**
   * The balance of all `Coin<T>` objects owned by this address.
   *
   * @generated from protobuf field: optional uint64 coin_balance = 5;
   */
  coinBalance?: bigint;
}
/**
 * Request message for `NodeService.ListDynamicFields`
 *
 * @generated from protobuf message sui.rpc.v2.ListDynamicFieldsRequest
 */
interface ListDynamicFieldsRequest {
  /**
   * Required. The `UID` of the parent, which owns the collections of dynamic fields.
   *
   * @generated from protobuf field: optional string parent = 1;
   */
  parent?: string;
  /**
   * The maximum number of dynamic fields to return. The service may return fewer than this value.
   * If unspecified, at most `50` entries will be returned.
   * The maximum value is `1000`; values above `1000` will be coerced to `1000`.
   *
   * @generated from protobuf field: optional uint32 page_size = 2;
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListDynamicFields` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListDynamicFields` must
   * match the call that provided the page token.
   *
   * @generated from protobuf field: optional bytes page_token = 3;
   */
  pageToken?: Uint8Array;
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `parent,field_id`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 4;
   */
  readMask?: FieldMask;
}
/**
 * Response message for `NodeService.ListDynamicFields`
 *
 * @generated from protobuf message sui.rpc.v2.ListDynamicFieldsResponse
 */
interface ListDynamicFieldsResponse {
  /**
   * Page of dynamic fields owned by the specified parent.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.DynamicField dynamic_fields = 1;
   */
  dynamicFields: DynamicField[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   *
   * @generated from protobuf field: optional bytes next_page_token = 2;
   */
  nextPageToken?: Uint8Array;
}
/**
 * @generated from protobuf message sui.rpc.v2.DynamicField
 */
interface DynamicField {
  /**
   * @generated from protobuf field: optional sui.rpc.v2.DynamicField.DynamicFieldKind kind = 1;
   */
  kind?: DynamicField_DynamicFieldKind;
  /**
   * ObjectId of this dynamic field's parent.
   *
   * @generated from protobuf field: optional string parent = 2;
   */
  parent?: string;
  /**
   * ObjectId of this dynamic field.
   *
   * @generated from protobuf field: optional string field_id = 3;
   */
  fieldId?: string;
  /**
   * The field object itself
   *
   * @generated from protobuf field: optional sui.rpc.v2.Object field_object = 4;
   */
  fieldObject?: Object$1;
  /**
   * The dynamic field's "name"
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs name = 5;
   */
  name?: Bcs;
  /**
   * The dynamic field's "value"
   *
   * @generated from protobuf field: optional sui.rpc.v2.Bcs value = 6;
   */
  value?: Bcs;
  /**
   * The type of the dynamic field "value".
   *
   * If this is a dynamic object field then this is the type of the object
   * itself (which is a child of this field), otherwise this is the type of the
   * value of this field.
   *
   * @generated from protobuf field: optional string value_type = 7;
   */
  valueType?: string;
  /**
   * The ObjectId of the child object when a child is a dynamic
   * object field.
   *
   * The presence or absence of this field can be used to determine if a child
   * is a dynamic field or a dynamic child object
   *
   * @generated from protobuf field: optional string child_id = 8;
   */
  childId?: string;
  /**
   * The object itself when a child is a dynamic object field.
   *
   * @generated from protobuf field: optional sui.rpc.v2.Object child_object = 9;
   */
  childObject?: Object$1;
}
/**
 * @generated from protobuf enum sui.rpc.v2.DynamicField.DynamicFieldKind
 */
declare enum DynamicField_DynamicFieldKind {
  /**
   * @generated from protobuf enum value: DYNAMIC_FIELD_KIND_UNKNOWN = 0;
   */
  DYNAMIC_FIELD_KIND_UNKNOWN = 0,
  /**
   * @generated from protobuf enum value: FIELD = 1;
   */
  FIELD = 1,
  /**
   * @generated from protobuf enum value: OBJECT = 2;
   */
  OBJECT = 2,
}
/**
 * @generated from protobuf message sui.rpc.v2.ListOwnedObjectsRequest
 */
interface ListOwnedObjectsRequest {
  /**
   * Required. The address of the account that owns the objects.
   *
   * @generated from protobuf field: optional string owner = 1;
   */
  owner?: string;
  /**
   * The maximum number of entries return. The service may return fewer than this value.
   * If unspecified, at most `50` entries will be returned.
   * The maximum value is `1000`; values above `1000` will be coerced to `1000`.
   *
   * @generated from protobuf field: optional uint32 page_size = 2;
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListOwnedObjects` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListOwnedObjects` must
   * match the call that provided the page token.
   *
   * @generated from protobuf field: optional bytes page_token = 3;
   */
  pageToken?: Uint8Array;
  /**
   * Mask specifying which fields to read.
   * If no mask is specified, defaults to `object_id,version,object_type`.
   *
   * @generated from protobuf field: optional google.protobuf.FieldMask read_mask = 4;
   */
  readMask?: FieldMask;
  /**
   * Optional type filter to limit the types of objects listed.
   *
   * Providing an object type with no type params will return objects of that
   * type with any type parameter, e.g. `0x2::coin::Coin` will return all
   * `Coin<T>` objects regardless of the type parameter `T`. Providing a type
   * with a type param will restrict the returned objects to only those objects
   * that match the provided type parameters, e.g.
   * `0x2::coin::Coin<0x2::sui::SUI>` will only return `Coin<SUI>` objects.
   *
   * @generated from protobuf field: optional string object_type = 5;
   */
  objectType?: string;
}
/**
 * @generated from protobuf message sui.rpc.v2.ListOwnedObjectsResponse
 */
interface ListOwnedObjectsResponse {
  /**
   * Page of dynamic fields owned by the specified parent.
   *
   * @generated from protobuf field: repeated sui.rpc.v2.Object objects = 1;
   */
  objects: Object$1[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   *
   * @generated from protobuf field: optional bytes next_page_token = 2;
   */
  nextPageToken?: Uint8Array;
}
declare class GetCoinInfoRequest$Type extends MessageType<GetCoinInfoRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetCoinInfoRequest
 */
declare const GetCoinInfoRequest: GetCoinInfoRequest$Type;
declare class GetCoinInfoResponse$Type extends MessageType<GetCoinInfoResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetCoinInfoResponse
 */
declare const GetCoinInfoResponse: GetCoinInfoResponse$Type;
declare class CoinMetadata$Type extends MessageType<CoinMetadata> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CoinMetadata
 */
declare const CoinMetadata: CoinMetadata$Type;
declare class CoinTreasury$Type extends MessageType<CoinTreasury> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.CoinTreasury
 */
declare const CoinTreasury: CoinTreasury$Type;
declare class RegulatedCoinMetadata$Type extends MessageType<RegulatedCoinMetadata> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.RegulatedCoinMetadata
 */
declare const RegulatedCoinMetadata: RegulatedCoinMetadata$Type;
declare class GetBalanceRequest$Type extends MessageType<GetBalanceRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetBalanceRequest
 */
declare const GetBalanceRequest: GetBalanceRequest$Type;
declare class GetBalanceResponse$Type extends MessageType<GetBalanceResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.GetBalanceResponse
 */
declare const GetBalanceResponse: GetBalanceResponse$Type;
declare class ListBalancesRequest$Type extends MessageType<ListBalancesRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListBalancesRequest
 */
declare const ListBalancesRequest: ListBalancesRequest$Type;
declare class ListBalancesResponse$Type extends MessageType<ListBalancesResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListBalancesResponse
 */
declare const ListBalancesResponse: ListBalancesResponse$Type;
declare class Balance$Type extends MessageType<Balance> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.Balance
 */
declare const Balance: Balance$Type;
declare class ListDynamicFieldsRequest$Type extends MessageType<ListDynamicFieldsRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListDynamicFieldsRequest
 */
declare const ListDynamicFieldsRequest: ListDynamicFieldsRequest$Type;
declare class ListDynamicFieldsResponse$Type extends MessageType<ListDynamicFieldsResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListDynamicFieldsResponse
 */
declare const ListDynamicFieldsResponse: ListDynamicFieldsResponse$Type;
declare class DynamicField$Type extends MessageType<DynamicField> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.DynamicField
 */
declare const DynamicField: DynamicField$Type;
declare class ListOwnedObjectsRequest$Type extends MessageType<ListOwnedObjectsRequest> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListOwnedObjectsRequest
 */
declare const ListOwnedObjectsRequest: ListOwnedObjectsRequest$Type;
declare class ListOwnedObjectsResponse$Type extends MessageType<ListOwnedObjectsResponse> {
  constructor();
}
/**
 * @generated MessageType for protobuf message sui.rpc.v2.ListOwnedObjectsResponse
 */
declare const ListOwnedObjectsResponse: ListOwnedObjectsResponse$Type;
/**
 * @generated ServiceType for protobuf service sui.rpc.v2.StateService
 */
declare const StateService: ServiceType;
//#endregion
export { Balance, CoinMetadata, CoinMetadata_MetadataCapState, CoinTreasury, CoinTreasury_SupplyState, DynamicField, DynamicField_DynamicFieldKind, GetBalanceRequest, GetBalanceResponse, GetCoinInfoRequest, GetCoinInfoResponse, ListBalancesRequest, ListBalancesResponse, ListDynamicFieldsRequest, ListDynamicFieldsResponse, ListOwnedObjectsRequest, ListOwnedObjectsResponse, RegulatedCoinMetadata, RegulatedCoinMetadata_CoinRegulatedState, StateService };
//# sourceMappingURL=state_service.d.mts.map