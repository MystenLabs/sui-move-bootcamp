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

    // Create a new display using the registry
    let [display, cap] = tx.moveCall({
        target: '0x2::display_registry::new_with_publisher',
        arguments: [
            tx.object('0xd'), // DisplayRegistry (shared system object)
            tx.object(ENV.PUBLISHER_ID),
        ],
        typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
    });

    // Set the display fields
    for (let i = 0; i < keys.length; i++) {
        tx.moveCall({
            target: '0x2::display_registry::set',
            arguments: [
                display,
                cap,
                tx.pure.string(keys[i]),
                tx.pure.string(values[i]),
            ],
            typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
        });
    }

    // Share the display and transfer the cap
    tx.moveCall({
        target: '0x2::display_registry::share',
        arguments: [display],
        typeArguments: [`${ENV.DISPLAY_PACKAGE_ID}::hero::Hero`],
    });

    tx.transferObjects(
        [cap],
        tx.pure.address("0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37"),
    );

    tx.setGasBudget(1000000000);
    tx.setSender("0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37");

    let buildTx = await tx.build({client: suiClient, onlyTransactionKind: false});

    const response = await suiClient.dryRunTransactionBlock({ transactionBlock: buildTx });
    console.log("Dry Run Transaction Response: ", response);
    expect(response.effects.status.status).toBe("success");
})
