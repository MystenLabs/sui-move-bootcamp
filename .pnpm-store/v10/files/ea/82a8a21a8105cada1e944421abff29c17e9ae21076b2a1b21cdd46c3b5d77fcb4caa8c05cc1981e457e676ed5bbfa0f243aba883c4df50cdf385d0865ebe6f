import * as v from "valibot";

//#region src/web-wallet-channel/responses.d.ts
declare const ResponseData: v.VariantSchema<"type", [v.ObjectSchema<{
  readonly type: v.LiteralSchema<"connect", undefined>;
  readonly session: v.StringSchema<"`session` is required">;
}, undefined>, v.ObjectSchema<{
  readonly type: v.LiteralSchema<"sign-transaction", undefined>;
  readonly bytes: v.StringSchema<undefined>;
  readonly signature: v.StringSchema<undefined>;
}, undefined>, v.ObjectSchema<{
  readonly type: v.LiteralSchema<"sign-and-execute-transaction", undefined>;
  readonly bytes: v.StringSchema<undefined>;
  readonly signature: v.StringSchema<undefined>;
  readonly digest: v.StringSchema<undefined>;
  readonly effects: v.StringSchema<undefined>;
}, undefined>, v.ObjectSchema<{
  readonly type: v.LiteralSchema<"sign-personal-message", undefined>;
  readonly bytes: v.StringSchema<undefined>;
  readonly signature: v.StringSchema<undefined>;
}, undefined>], undefined>;
type ResponseDataType = v.InferOutput<typeof ResponseData>;
declare const ResponsePayload: v.VariantSchema<"type", [v.ObjectSchema<{
  readonly type: v.LiteralSchema<"reject", undefined>;
  readonly reason: v.OptionalSchema<v.StringSchema<"`reason` must be a string">, undefined>;
}, undefined>, v.ObjectSchema<{
  readonly type: v.LiteralSchema<"resolve", undefined>;
  readonly data: v.VariantSchema<"type", [v.ObjectSchema<{
    readonly type: v.LiteralSchema<"connect", undefined>;
    readonly session: v.StringSchema<"`session` is required">;
  }, undefined>, v.ObjectSchema<{
    readonly type: v.LiteralSchema<"sign-transaction", undefined>;
    readonly bytes: v.StringSchema<undefined>;
    readonly signature: v.StringSchema<undefined>;
  }, undefined>, v.ObjectSchema<{
    readonly type: v.LiteralSchema<"sign-and-execute-transaction", undefined>;
    readonly bytes: v.StringSchema<undefined>;
    readonly signature: v.StringSchema<undefined>;
    readonly digest: v.StringSchema<undefined>;
    readonly effects: v.StringSchema<undefined>;
  }, undefined>, v.ObjectSchema<{
    readonly type: v.LiteralSchema<"sign-personal-message", undefined>;
    readonly bytes: v.StringSchema<undefined>;
    readonly signature: v.StringSchema<undefined>;
  }, undefined>], undefined>;
}, undefined>], undefined>;
type ResponsePayloadType = v.InferOutput<typeof ResponsePayload>;
type ResponseTypes = { [P in ResponseDataType as P['type']]: P };
//#endregion
export { ResponsePayloadType, ResponseTypes };
//# sourceMappingURL=responses.d.mts.map