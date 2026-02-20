import { Bcs } from "./bcs.mjs";
import { Object as Object$1 } from "./object.mjs";
import { FieldMask } from "../../../google/protobuf/field_mask.mjs";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";

//#region src/grpc/proto/sui/rpc/v2/state_service.ts
/**
* Information about the state of the coin's MetadataCap
*
* @generated from protobuf enum sui.rpc.v2.CoinMetadata.MetadataCapState
*/
let CoinMetadata_MetadataCapState = /* @__PURE__ */ function(CoinMetadata_MetadataCapState$1) {
	/**
	* Indicates the state of the MetadataCap is unknown.
	* Set when the coin has not been migrated to the CoinRegistry.
	*
	* @generated from protobuf enum value: METADATA_CAP_STATE_UNKNOWN = 0;
	*/
	CoinMetadata_MetadataCapState$1[CoinMetadata_MetadataCapState$1["METADATA_CAP_STATE_UNKNOWN"] = 0] = "METADATA_CAP_STATE_UNKNOWN";
	/**
	* Indicates the MetadataCap has been claimed.
	*
	* @generated from protobuf enum value: CLAIMED = 1;
	*/
	CoinMetadata_MetadataCapState$1[CoinMetadata_MetadataCapState$1["CLAIMED"] = 1] = "CLAIMED";
	/**
	* Indicates the MetadataCap has not been claimed.
	*
	* @generated from protobuf enum value: UNCLAIMED = 2;
	*/
	CoinMetadata_MetadataCapState$1[CoinMetadata_MetadataCapState$1["UNCLAIMED"] = 2] = "UNCLAIMED";
	/**
	* Indicates the MetadataCap has been deleted.
	*
	* @generated from protobuf enum value: DELETED = 3;
	*/
	CoinMetadata_MetadataCapState$1[CoinMetadata_MetadataCapState$1["DELETED"] = 3] = "DELETED";
	return CoinMetadata_MetadataCapState$1;
}({});
/**
* Supply state of a coin, matching the Move SupplyState enum
*
* @generated from protobuf enum sui.rpc.v2.CoinTreasury.SupplyState
*/
let CoinTreasury_SupplyState = /* @__PURE__ */ function(CoinTreasury_SupplyState$1) {
	/**
	* Supply is unknown or TreasuryCap still exists (minting still possible)
	*
	* @generated from protobuf enum value: SUPPLY_STATE_UNKNOWN = 0;
	*/
	CoinTreasury_SupplyState$1[CoinTreasury_SupplyState$1["SUPPLY_STATE_UNKNOWN"] = 0] = "SUPPLY_STATE_UNKNOWN";
	/**
	* Supply is fixed (TreasuryCap consumed, no more minting possible)
	*
	* @generated from protobuf enum value: FIXED = 1;
	*/
	CoinTreasury_SupplyState$1[CoinTreasury_SupplyState$1["FIXED"] = 1] = "FIXED";
	/**
	* Supply can only decrease (burning allowed, minting not allowed)
	*
	* @generated from protobuf enum value: BURN_ONLY = 2;
	*/
	CoinTreasury_SupplyState$1[CoinTreasury_SupplyState$1["BURN_ONLY"] = 2] = "BURN_ONLY";
	return CoinTreasury_SupplyState$1;
}({});
/**
* Indicates the state of the regulation of the coin.
*
* @generated from protobuf enum sui.rpc.v2.RegulatedCoinMetadata.CoinRegulatedState
*/
let RegulatedCoinMetadata_CoinRegulatedState = /* @__PURE__ */ function(RegulatedCoinMetadata_CoinRegulatedState$1) {
	/**
	* Indicates the regulation state of the coin is unknown.
	* This is set when a coin has not been migrated to the
	* coin registry and has no `0x2::coin::RegulatedCoinMetadata`
	* object.
	*
	* @generated from protobuf enum value: COIN_REGULATED_STATE_UNKNOWN = 0;
	*/
	RegulatedCoinMetadata_CoinRegulatedState$1[RegulatedCoinMetadata_CoinRegulatedState$1["COIN_REGULATED_STATE_UNKNOWN"] = 0] = "COIN_REGULATED_STATE_UNKNOWN";
	/**
	* Indicates a coin is regulated. RegulatedCoinMetadata will be populated.
	*
	* @generated from protobuf enum value: REGULATED = 1;
	*/
	RegulatedCoinMetadata_CoinRegulatedState$1[RegulatedCoinMetadata_CoinRegulatedState$1["REGULATED"] = 1] = "REGULATED";
	/**
	* Indicates a coin is unregulated.
	*
	* @generated from protobuf enum value: UNREGULATED = 2;
	*/
	RegulatedCoinMetadata_CoinRegulatedState$1[RegulatedCoinMetadata_CoinRegulatedState$1["UNREGULATED"] = 2] = "UNREGULATED";
	return RegulatedCoinMetadata_CoinRegulatedState$1;
}({});
/**
* @generated from protobuf enum sui.rpc.v2.DynamicField.DynamicFieldKind
*/
let DynamicField_DynamicFieldKind = /* @__PURE__ */ function(DynamicField_DynamicFieldKind$1) {
	/**
	* @generated from protobuf enum value: DYNAMIC_FIELD_KIND_UNKNOWN = 0;
	*/
	DynamicField_DynamicFieldKind$1[DynamicField_DynamicFieldKind$1["DYNAMIC_FIELD_KIND_UNKNOWN"] = 0] = "DYNAMIC_FIELD_KIND_UNKNOWN";
	/**
	* @generated from protobuf enum value: FIELD = 1;
	*/
	DynamicField_DynamicFieldKind$1[DynamicField_DynamicFieldKind$1["FIELD"] = 1] = "FIELD";
	/**
	* @generated from protobuf enum value: OBJECT = 2;
	*/
	DynamicField_DynamicFieldKind$1[DynamicField_DynamicFieldKind$1["OBJECT"] = 2] = "OBJECT";
	return DynamicField_DynamicFieldKind$1;
}({});
var GetCoinInfoRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetCoinInfoRequest", [{
			no: 1,
			name: "coin_type",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetCoinInfoRequest
*/
const GetCoinInfoRequest = new GetCoinInfoRequest$Type();
var GetCoinInfoResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetCoinInfoResponse", [
			{
				no: 1,
				name: "coin_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "metadata",
				kind: "message",
				T: () => CoinMetadata
			},
			{
				no: 3,
				name: "treasury",
				kind: "message",
				T: () => CoinTreasury
			},
			{
				no: 4,
				name: "regulated_metadata",
				kind: "message",
				T: () => RegulatedCoinMetadata
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetCoinInfoResponse
*/
const GetCoinInfoResponse = new GetCoinInfoResponse$Type();
var CoinMetadata$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CoinMetadata", [
			{
				no: 1,
				name: "id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "decimals",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "name",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "symbol",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 5,
				name: "description",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 6,
				name: "icon_url",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 7,
				name: "metadata_cap_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 8,
				name: "metadata_cap_state",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.CoinMetadata.MetadataCapState", CoinMetadata_MetadataCapState]
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CoinMetadata
*/
const CoinMetadata = new CoinMetadata$Type();
var CoinTreasury$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.CoinTreasury", [
			{
				no: 1,
				name: "id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "total_supply",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 3,
				name: "supply_state",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.CoinTreasury.SupplyState", CoinTreasury_SupplyState]
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.CoinTreasury
*/
const CoinTreasury = new CoinTreasury$Type();
var RegulatedCoinMetadata$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.RegulatedCoinMetadata", [
			{
				no: 1,
				name: "id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "coin_metadata_object",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "deny_cap_object",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "allow_global_pause",
				kind: "scalar",
				opt: true,
				T: 8
			},
			{
				no: 5,
				name: "variant",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 6,
				name: "coin_regulated_state",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.RegulatedCoinMetadata.CoinRegulatedState", RegulatedCoinMetadata_CoinRegulatedState]
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.RegulatedCoinMetadata
*/
const RegulatedCoinMetadata = new RegulatedCoinMetadata$Type();
var GetBalanceRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetBalanceRequest", [{
			no: 1,
			name: "owner",
			kind: "scalar",
			opt: true,
			T: 9
		}, {
			no: 2,
			name: "coin_type",
			kind: "scalar",
			opt: true,
			T: 9
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetBalanceRequest
*/
const GetBalanceRequest = new GetBalanceRequest$Type();
var GetBalanceResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.GetBalanceResponse", [{
			no: 1,
			name: "balance",
			kind: "message",
			T: () => Balance
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.GetBalanceResponse
*/
const GetBalanceResponse = new GetBalanceResponse$Type();
var ListBalancesRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListBalancesRequest", [
			{
				no: 1,
				name: "owner",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "page_size",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "page_token",
				kind: "scalar",
				opt: true,
				T: 12
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListBalancesRequest
*/
const ListBalancesRequest = new ListBalancesRequest$Type();
var ListBalancesResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListBalancesResponse", [{
			no: 1,
			name: "balances",
			kind: "message",
			repeat: 1,
			T: () => Balance
		}, {
			no: 2,
			name: "next_page_token",
			kind: "scalar",
			opt: true,
			T: 12
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListBalancesResponse
*/
const ListBalancesResponse = new ListBalancesResponse$Type();
var Balance$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.Balance", [
			{
				no: 1,
				name: "coin_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 4,
				name: "address_balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			},
			{
				no: 5,
				name: "coin_balance",
				kind: "scalar",
				opt: true,
				T: 4,
				L: 0
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.Balance
*/
const Balance = new Balance$Type();
var ListDynamicFieldsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListDynamicFieldsRequest", [
			{
				no: 1,
				name: "parent",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "page_size",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "page_token",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 4,
				name: "read_mask",
				kind: "message",
				T: () => FieldMask
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListDynamicFieldsRequest
*/
const ListDynamicFieldsRequest = new ListDynamicFieldsRequest$Type();
var ListDynamicFieldsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListDynamicFieldsResponse", [{
			no: 1,
			name: "dynamic_fields",
			kind: "message",
			repeat: 1,
			T: () => DynamicField
		}, {
			no: 2,
			name: "next_page_token",
			kind: "scalar",
			opt: true,
			T: 12
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListDynamicFieldsResponse
*/
const ListDynamicFieldsResponse = new ListDynamicFieldsResponse$Type();
var DynamicField$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.DynamicField", [
			{
				no: 1,
				name: "kind",
				kind: "enum",
				opt: true,
				T: () => ["sui.rpc.v2.DynamicField.DynamicFieldKind", DynamicField_DynamicFieldKind]
			},
			{
				no: 2,
				name: "parent",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 3,
				name: "field_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 4,
				name: "field_object",
				kind: "message",
				T: () => Object$1
			},
			{
				no: 5,
				name: "name",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 6,
				name: "value",
				kind: "message",
				T: () => Bcs
			},
			{
				no: 7,
				name: "value_type",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 8,
				name: "child_id",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 9,
				name: "child_object",
				kind: "message",
				T: () => Object$1
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.DynamicField
*/
const DynamicField = new DynamicField$Type();
var ListOwnedObjectsRequest$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListOwnedObjectsRequest", [
			{
				no: 1,
				name: "owner",
				kind: "scalar",
				opt: true,
				T: 9
			},
			{
				no: 2,
				name: "page_size",
				kind: "scalar",
				opt: true,
				T: 13
			},
			{
				no: 3,
				name: "page_token",
				kind: "scalar",
				opt: true,
				T: 12
			},
			{
				no: 4,
				name: "read_mask",
				kind: "message",
				T: () => FieldMask
			},
			{
				no: 5,
				name: "object_type",
				kind: "scalar",
				opt: true,
				T: 9
			}
		]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListOwnedObjectsRequest
*/
const ListOwnedObjectsRequest = new ListOwnedObjectsRequest$Type();
var ListOwnedObjectsResponse$Type = class extends MessageType {
	constructor() {
		super("sui.rpc.v2.ListOwnedObjectsResponse", [{
			no: 1,
			name: "objects",
			kind: "message",
			repeat: 1,
			T: () => Object$1
		}, {
			no: 2,
			name: "next_page_token",
			kind: "scalar",
			opt: true,
			T: 12
		}]);
	}
};
/**
* @generated MessageType for protobuf message sui.rpc.v2.ListOwnedObjectsResponse
*/
const ListOwnedObjectsResponse = new ListOwnedObjectsResponse$Type();
/**
* @generated ServiceType for protobuf service sui.rpc.v2.StateService
*/
const StateService = new ServiceType("sui.rpc.v2.StateService", [
	{
		name: "ListDynamicFields",
		options: {},
		I: ListDynamicFieldsRequest,
		O: ListDynamicFieldsResponse
	},
	{
		name: "ListOwnedObjects",
		options: {},
		I: ListOwnedObjectsRequest,
		O: ListOwnedObjectsResponse
	},
	{
		name: "GetCoinInfo",
		options: {},
		I: GetCoinInfoRequest,
		O: GetCoinInfoResponse
	},
	{
		name: "GetBalance",
		options: {},
		I: GetBalanceRequest,
		O: GetBalanceResponse
	},
	{
		name: "ListBalances",
		options: {},
		I: ListBalancesRequest,
		O: ListBalancesResponse
	}
]);

//#endregion
export { Balance, CoinMetadata, CoinMetadata_MetadataCapState, CoinTreasury, CoinTreasury_SupplyState, DynamicField, DynamicField_DynamicFieldKind, GetBalanceRequest, GetBalanceResponse, GetCoinInfoRequest, GetCoinInfoResponse, ListBalancesRequest, ListBalancesResponse, ListDynamicFieldsRequest, ListDynamicFieldsResponse, ListOwnedObjectsRequest, ListOwnedObjectsResponse, RegulatedCoinMetadata, RegulatedCoinMetadata_CoinRegulatedState, StateService };
//# sourceMappingURL=state_service.mjs.map