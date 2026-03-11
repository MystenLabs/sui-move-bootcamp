import type { SuiReadClient } from "./types";
import { suiGrpcClient } from "./grpcClient";

const SUI_COIN_TYPE = "0x2::sui::SUI";

export const suiReadClient: SuiReadClient = {
    async getSuiBalance(address: string) {
        const response = await suiGrpcClient.core.getBalance({
            address,
            coinType: SUI_COIN_TYPE,
        });

        return response.balance.balance;
    },

    async getCurrentEpoch() {
        const response = await suiGrpcClient.ledgerService.getEpoch({});
        const epoch = response.response.epoch?.epoch;

        if (epoch === undefined) {
            throw new Error("Unable to fetch current epoch from gRPC.");
        }

        return Number(epoch);
    },
};
