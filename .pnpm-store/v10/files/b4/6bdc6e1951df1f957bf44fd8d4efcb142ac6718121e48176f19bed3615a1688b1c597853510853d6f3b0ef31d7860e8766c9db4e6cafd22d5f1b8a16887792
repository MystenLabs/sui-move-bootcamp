import { normalizeStructTag } from "../../utils/sui-types.mjs";
import { bcs as suiBcs } from "../../bcs/index.mjs";
import { TransactionCommands } from "../Commands.mjs";
import { Inputs } from "../Inputs.mjs";
import { bigint, object, parse, string } from "valibot";

//#region src/transactions/intents/CoinWithBalance.ts
const COIN_WITH_BALANCE = "CoinWithBalance";
const SUI_TYPE = normalizeStructTag("0x2::sui::SUI");
function coinWithBalance({ type = SUI_TYPE, balance, useGasCoin = true }) {
	let coinResult = null;
	return (tx) => {
		if (coinResult) return coinResult;
		tx.addIntentResolver(COIN_WITH_BALANCE, resolveCoinBalance);
		const coinType = type === "gas" ? type : normalizeStructTag(type);
		coinResult = tx.add(TransactionCommands.Intent({
			name: COIN_WITH_BALANCE,
			inputs: {},
			data: {
				type: coinType === SUI_TYPE && useGasCoin ? "gas" : coinType,
				balance: BigInt(balance)
			}
		}));
		return coinResult;
	};
}
const CoinWithBalanceData = object({
	type: string(),
	balance: bigint()
});
async function resolveCoinBalance(transactionData, buildOptions, next) {
	const coinTypes = /* @__PURE__ */ new Set();
	const totalByType = /* @__PURE__ */ new Map();
	if (!transactionData.sender) throw new Error("Sender must be set to resolve CoinWithBalance");
	for (const command of transactionData.commands) if (command.$kind === "$Intent" && command.$Intent.name === COIN_WITH_BALANCE) {
		const { type, balance } = parse(CoinWithBalanceData, command.$Intent.data);
		if (type !== "gas" && balance > 0n) coinTypes.add(type);
		totalByType.set(type, (totalByType.get(type) ?? 0n) + balance);
	}
	const usedIds = /* @__PURE__ */ new Set();
	for (const input of transactionData.inputs) {
		if (input.Object?.ImmOrOwnedObject) usedIds.add(input.Object.ImmOrOwnedObject.objectId);
		if (input.UnresolvedObject?.objectId) usedIds.add(input.UnresolvedObject.objectId);
	}
	const coinsByType = /* @__PURE__ */ new Map();
	const addressBalanceByType = /* @__PURE__ */ new Map();
	const client = buildOptions.client;
	if (!client) throw new Error("Client must be provided to build or serialize transactions with CoinWithBalance intents");
	await Promise.all([...[...coinTypes].map(async (coinType) => {
		const { coins, addressBalance } = await getCoinsAndBalanceOfType({
			coinType,
			balance: totalByType.get(coinType),
			client,
			owner: transactionData.sender,
			usedIds
		});
		coinsByType.set(coinType, coins);
		addressBalanceByType.set(coinType, addressBalance);
	}), totalByType.has("gas") ? await client.core.getBalance({
		owner: transactionData.sender,
		coinType: SUI_TYPE
	}).then(({ balance }) => {
		addressBalanceByType.set("gas", BigInt(balance.addressBalance));
	}) : null]);
	const mergedCoins = /* @__PURE__ */ new Map();
	for (const [index, transaction] of transactionData.commands.entries()) {
		if (transaction.$kind !== "$Intent" || transaction.$Intent.name !== COIN_WITH_BALANCE) continue;
		const { type, balance } = transaction.$Intent.data;
		if (balance === 0n) {
			transactionData.replaceCommand(index, TransactionCommands.MoveCall({
				target: "0x2::coin::zero",
				typeArguments: [type === "gas" ? SUI_TYPE : type]
			}));
			continue;
		}
		const commands = [];
		if (addressBalanceByType.get(type) >= totalByType.get(type)) commands.push(TransactionCommands.MoveCall({
			target: "0x2::coin::redeem_funds",
			typeArguments: [type === "gas" ? SUI_TYPE : type],
			arguments: [transactionData.addInput("withdrawal", Inputs.FundsWithdrawal({
				reservation: {
					$kind: "MaxAmountU64",
					MaxAmountU64: String(balance)
				},
				typeArg: {
					$kind: "Balance",
					Balance: type === "gas" ? SUI_TYPE : type
				},
				withdrawFrom: {
					$kind: "Sender",
					Sender: true
				}
			}))]
		}));
		else {
			if (!mergedCoins.has(type)) {
				const addressBalance = addressBalanceByType.get(type) ?? 0n;
				const coinType = type === "gas" ? SUI_TYPE : type;
				let baseCoin;
				let restCoins;
				if (type === "gas") {
					baseCoin = {
						$kind: "GasCoin",
						GasCoin: true
					};
					restCoins = [];
				} else [baseCoin, ...restCoins] = coinsByType.get(type).map((coin) => transactionData.addInput("object", Inputs.ObjectRef({
					objectId: coin.objectId,
					digest: coin.digest,
					version: coin.version
				})));
				if (addressBalance > 0n) {
					commands.push(TransactionCommands.MoveCall({
						target: "0x2::coin::redeem_funds",
						typeArguments: [coinType],
						arguments: [transactionData.addInput("withdrawal", Inputs.FundsWithdrawal({
							reservation: {
								$kind: "MaxAmountU64",
								MaxAmountU64: String(addressBalance)
							},
							typeArg: {
								$kind: "Balance",
								Balance: coinType
							},
							withdrawFrom: {
								$kind: "Sender",
								Sender: true
							}
						}))]
					}));
					commands.push(TransactionCommands.MergeCoins(baseCoin, [{
						$kind: "Result",
						Result: index + commands.length - 1
					}, ...restCoins]));
				} else if (restCoins.length > 0) commands.push(TransactionCommands.MergeCoins(baseCoin, restCoins));
				mergedCoins.set(type, baseCoin);
			}
			commands.push(TransactionCommands.SplitCoins(mergedCoins.get(type), [transactionData.addInput("pure", Inputs.Pure(suiBcs.u64().serialize(balance)))]));
		}
		transactionData.replaceCommand(index, commands);
		transactionData.mapArguments((arg, _command, commandIndex) => {
			if (commandIndex >= index && commandIndex < index + commands.length) return arg;
			if (arg.$kind === "Result" && arg.Result === index) return {
				$kind: "NestedResult",
				NestedResult: [index + commands.length - 1, 0]
			};
			return arg;
		});
	}
	return next();
}
async function getCoinsAndBalanceOfType({ coinType, balance, client, owner, usedIds }) {
	let remainingBalance = balance;
	const coins = [];
	const balanceRequest = client.core.getBalance({
		owner,
		coinType
	}).then(({ balance: balance$1 }) => {
		remainingBalance -= BigInt(balance$1.addressBalance);
		return balance$1;
	});
	const [allCoins, balanceResponse] = await Promise.all([loadMoreCoins(), balanceRequest]);
	if (BigInt(balanceResponse.balance) < balance) throw new Error(`Insufficient balance of ${coinType} for owner ${owner}. Required: ${balance}, Available: ${balance - remainingBalance}`);
	return {
		coins: allCoins,
		balance: BigInt(balanceResponse.coinBalance),
		addressBalance: BigInt(balanceResponse.addressBalance),
		coinBalance: BigInt(balanceResponse.coinBalance)
	};
	async function loadMoreCoins(cursor = null) {
		const { objects, hasNextPage, cursor: nextCursor } = await client.core.listCoins({
			owner,
			coinType,
			cursor
		});
		await balanceRequest;
		if (remainingBalance > 0n) {
			for (const coin of objects) {
				if (usedIds.has(coin.objectId)) continue;
				const coinBalance = BigInt(coin.balance);
				coins.push(coin);
				remainingBalance -= coinBalance;
				if (remainingBalance <= 0) break;
			}
			if (hasNextPage) return loadMoreCoins(nextCursor);
		}
		return coins;
	}
}

//#endregion
export { COIN_WITH_BALANCE, coinWithBalance, resolveCoinBalance };
//# sourceMappingURL=CoinWithBalance.mjs.map