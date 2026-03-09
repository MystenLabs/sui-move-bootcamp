import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { ENV } from "../env";

test("Create Display - Devnet", async () => {

    const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });
    const tx = new Transaction();

    let keys = ["name", "image_url", "description"];
    let values = [
        "{name}", 
        "https://aggregator.walrus-testnet.walrus.space/v1/blobs/{blob_id}", 
        "{name} - A true Hero of the Sui ecosystem!"
    ];

    //TODO: Create a new display object
    
    //TODO: Update the display object version

    //TODO: Transfer the display object to your address

    tx.setGasBudget(1000000000);
    tx.setSender("0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37");

    let buildTx = await tx.build({client: suiClient, onlyTransactionKind: false});

    const response = await suiClient.dryRunTransactionBlock({ transactionBlock: buildTx });
    console.log("Dry Run Transaction Response: ", response);
    expect(response.effects.status.status).toBe("success");
})