import { SUI_ADDRESS_LENGTH, normalizeStructTag, parseStructTag } from "../utils/sui-types.mjs";
import { TypeTagSerializer } from "../bcs/type-tag-serializer.mjs";
import { bcs as suiBcs } from "../bcs/index.mjs";
import { BaseClient } from "./client.mjs";
import { deriveDynamicFieldID } from "../utils/dynamic-fields.mjs";
import { MvrClient } from "./mvr.mjs";

//#region src/client/core.ts
const DEFAULT_MVR_URLS = {
	mainnet: "https://mainnet.mvr.mystenlabs.com",
	testnet: "https://testnet.mvr.mystenlabs.com"
};
var CoreClient = class extends BaseClient {
	constructor(options) {
		super(options);
		this.core = this;
		this.mvr = new MvrClient({
			cache: this.cache.scope("core.mvr"),
			url: options.mvr?.url ?? DEFAULT_MVR_URLS[this.network],
			pageSize: options.mvr?.pageSize,
			overrides: options.mvr?.overrides
		});
	}
	async getObject(options) {
		const { objectId } = options;
		const { objects: [result] } = await this.getObjects({
			objectIds: [objectId],
			signal: options.signal,
			include: options.include
		});
		if (result instanceof Error) throw result;
		return { object: result };
	}
	async getDynamicField(options) {
		const normalizedNameType = TypeTagSerializer.parseFromStr((await this.core.mvr.resolveType({ type: options.name.type })).type);
		const fieldId = deriveDynamicFieldID(options.parentId, normalizedNameType, options.name.bcs);
		const { objects: [fieldObject] } = await this.getObjects({
			objectIds: [fieldId],
			signal: options.signal,
			include: {
				previousTransaction: true,
				content: true
			}
		});
		if (fieldObject instanceof Error) throw fieldObject;
		const fieldType = parseStructTag(fieldObject.type);
		const content = await fieldObject.content;
		return { dynamicField: {
			fieldId: fieldObject.objectId,
			digest: fieldObject.digest,
			version: fieldObject.version,
			type: fieldObject.type,
			previousTransaction: fieldObject.previousTransaction,
			name: {
				type: typeof fieldType.typeParams[0] === "string" ? fieldType.typeParams[0] : normalizeStructTag(fieldType.typeParams[0]),
				bcs: options.name.bcs
			},
			value: {
				type: typeof fieldType.typeParams[1] === "string" ? fieldType.typeParams[1] : normalizeStructTag(fieldType.typeParams[1]),
				bcs: content.slice(SUI_ADDRESS_LENGTH + options.name.bcs.length)
			}
		} };
	}
	async getDynamicObjectField(options) {
		const wrappedType = `0x2::dynamic_object_field::Wrapper<${(await this.core.mvr.resolveType({ type: options.name.type })).type}>`;
		const { dynamicField } = await this.getDynamicField({
			parentId: options.parentId,
			name: {
				type: wrappedType,
				bcs: options.name.bcs
			},
			signal: options.signal
		});
		const { object } = await this.getObject({
			objectId: suiBcs.Address.parse(dynamicField.value.bcs),
			signal: options.signal,
			include: options.include
		});
		return { object };
	}
	async waitForTransaction(options) {
		const { signal, timeout = 60 * 1e3, include } = options;
		const digest = "result" in options && options.result ? (options.result.Transaction ?? options.result.FailedTransaction).digest : options.digest;
		const abortSignal = signal ? AbortSignal.any([AbortSignal.timeout(timeout), signal]) : AbortSignal.timeout(timeout);
		const abortPromise = new Promise((_, reject) => {
			abortSignal.addEventListener("abort", () => reject(abortSignal.reason));
		});
		abortPromise.catch(() => {});
		while (true) {
			abortSignal.throwIfAborted();
			try {
				return await this.getTransaction({
					digest,
					include,
					signal: abortSignal
				});
			} catch {
				await Promise.race([new Promise((resolve) => setTimeout(resolve, 2e3)), abortPromise]);
			}
		}
	}
	async signAndExecuteTransaction({ transaction, signer, additionalSignatures = [], ...input }) {
		let transactionBytes;
		if (transaction instanceof Uint8Array) transactionBytes = transaction;
		else {
			transaction.setSenderIfNotSet(signer.toSuiAddress());
			transactionBytes = await transaction.build({ client: this });
		}
		const { signature } = await signer.signTransaction(transactionBytes);
		return this.executeTransaction({
			transaction: transactionBytes,
			signatures: [signature, ...additionalSignatures],
			...input
		});
	}
};

//#endregion
export { CoreClient };
//# sourceMappingURL=core.mjs.map