import * as v from "valibot";

//#region src/web-wallet-channel/requests.ts
const JsonSchema = v.lazy(() => v.union([
	v.string(),
	v.number(),
	v.boolean(),
	v.null(),
	v.record(v.string(), JsonSchema),
	v.array(JsonSchema)
]));
const RequestData = v.variant("type", [
	v.object({ type: v.literal("connect") }),
	v.object({
		type: v.literal("sign-transaction"),
		transaction: v.string("`transaction` is required"),
		address: v.string("`address` is required"),
		chain: v.string("`chain` is required"),
		session: v.string("`session` is required")
	}),
	v.object({
		type: v.literal("sign-and-execute-transaction"),
		transaction: v.string("`transaction` is required"),
		address: v.string("`address` is required"),
		chain: v.string("`chain` is required"),
		session: v.string("`session` is required")
	}),
	v.object({
		type: v.literal("sign-personal-message"),
		chain: v.string("`chain` is required"),
		message: v.string("`message` is required"),
		address: v.string("`address` is required"),
		session: v.string("`session` is required")
	})
]);
const Request = v.object({
	version: v.literal("1"),
	requestId: v.pipe(v.string("`requestId` is required"), v.uuid()),
	appUrl: v.pipe(v.string(), v.url("`appUrl` must be a valid URL")),
	appName: v.string("`appName` is required"),
	payload: RequestData,
	metadata: v.optional(v.record(v.string(), JsonSchema)),
	extraRequestOptions: v.optional(v.record(v.string(), JsonSchema))
});

//#endregion
export { Request };
//# sourceMappingURL=requests.mjs.map