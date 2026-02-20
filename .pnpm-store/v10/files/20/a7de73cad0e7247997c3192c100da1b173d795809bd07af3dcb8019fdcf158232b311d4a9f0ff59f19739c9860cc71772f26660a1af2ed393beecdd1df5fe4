import { BaseClient } from "../client/client.mjs";
import { TransactionExecutionServiceClient } from "./proto/sui/rpc/v2/transaction_execution_service.client.mjs";
import { LedgerServiceClient } from "./proto/sui/rpc/v2/ledger_service.client.mjs";
import { MovePackageServiceClient } from "./proto/sui/rpc/v2/move_package_service.client.mjs";
import { SignatureVerificationServiceClient } from "./proto/sui/rpc/v2/signature_verification_service.client.mjs";
import { StateServiceClient } from "./proto/sui/rpc/v2/state_service.client.mjs";
import { SubscriptionServiceClient } from "./proto/sui/rpc/v2/subscription_service.client.mjs";
import { GrpcCoreClient } from "./core.mjs";
import { NameServiceClient } from "./proto/sui/rpc/v2/name_service.client.mjs";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

//#region src/grpc/client.ts
const SUI_CLIENT_BRAND = Symbol.for("@mysten/SuiGrpcClient");
function isSuiGrpcClient(client) {
	return typeof client === "object" && client !== null && client[SUI_CLIENT_BRAND] === true;
}
var SuiGrpcClient = class extends BaseClient {
	get mvr() {
		return this.core.mvr;
	}
	get [SUI_CLIENT_BRAND]() {
		return true;
	}
	constructor(options) {
		super({ network: options.network });
		const transport = options.transport ?? new GrpcWebFetchTransport({
			baseUrl: options.baseUrl,
			fetchInit: options.fetchInit
		});
		this.transactionExecutionService = new TransactionExecutionServiceClient(transport);
		this.ledgerService = new LedgerServiceClient(transport);
		this.stateService = new StateServiceClient(transport);
		this.subscriptionService = new SubscriptionServiceClient(transport);
		this.movePackageService = new MovePackageServiceClient(transport);
		this.signatureVerificationService = new SignatureVerificationServiceClient(transport);
		this.nameService = new NameServiceClient(transport);
		this.core = new GrpcCoreClient({
			client: this,
			base: this,
			network: options.network,
			mvr: options.mvr
		});
	}
	getObjects(input) {
		return this.core.getObjects(input);
	}
	getObject(input) {
		return this.core.getObject(input);
	}
	listCoins(input) {
		return this.core.listCoins(input);
	}
	listOwnedObjects(input) {
		return this.core.listOwnedObjects(input);
	}
	getBalance(input) {
		return this.core.getBalance(input);
	}
	listBalances(input) {
		return this.core.listBalances(input);
	}
	getCoinMetadata(input) {
		return this.core.getCoinMetadata(input);
	}
	getTransaction(input) {
		return this.core.getTransaction(input);
	}
	executeTransaction(input) {
		return this.core.executeTransaction(input);
	}
	signAndExecuteTransaction(input) {
		return this.core.signAndExecuteTransaction(input);
	}
	waitForTransaction(input) {
		return this.core.waitForTransaction(input);
	}
	simulateTransaction(input) {
		return this.core.simulateTransaction(input);
	}
	getReferenceGasPrice() {
		return this.core.getReferenceGasPrice();
	}
	listDynamicFields(input) {
		return this.core.listDynamicFields(input);
	}
	getDynamicField(input) {
		return this.core.getDynamicField(input);
	}
	getMoveFunction(input) {
		return this.core.getMoveFunction(input);
	}
	resolveTransactionPlugin() {
		return this.core.resolveTransactionPlugin();
	}
	verifyZkLoginSignature(input) {
		return this.core.verifyZkLoginSignature(input);
	}
	defaultNameServiceName(input) {
		return this.core.defaultNameServiceName(input);
	}
};

//#endregion
export { SuiGrpcClient, isSuiGrpcClient };
//# sourceMappingURL=client.mjs.map