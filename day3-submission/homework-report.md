# Day 3 Report

## Part A — Sui TypeScript SDK Basics (Module D1)

- What are the four network options available via `getJsonRpcFullnodeUrl()`?

These networks are, 'mainnet' | 'testnet' | 'devnet' | 'localnet'. [source](https://github.com/MystenLabs/ts-sdks/blob/6810deb456ac65d4fcb142c3cbb4950d14994d23/packages/sui/src/jsonRpc/network.ts#L4)

- Why would you use `localnet` during development instead of `devnet`?

There are few good reason and the main one is control and speed. A localnet run on your machine, so transaction confirm instantly. You can reset the whole chain state anytime. You also don't have to worry about a faucet and development is much faster and reliable.

- What is the difference between `devnet` and `testnet` in terms of data persistence and reset cycles?

Devnet get wiped frequently whenever there are updates. Devenet always has the latest version of the compiler. Tesnet however persists longer and only wipes whenever there a major protocol change.

## Part B — Read Queries (Module D2)

- What is the difference between `content` and `json` in `getObject` include(s)?

They give us 2 different representation of the object data.
- `content` gives us a `Uint8Array` reprsentation, aka, BCS.
- `json` gives us a human readible `JSON` reprsentation.

- What are Dynamic Object Fields and how do they differ from regular struct fields? When would you use one over the other?

My understand is that objects have fields and we can have 3 types,
1. Static Fields (SFs), core/fixed data.
2. Dynamic Fields (DFs), extensions of the object data but they are only primitive types.
3. Dynamic Object Fields(DOFs), extensions by attaching other objects to our main object.

The difference is that DOFs are discoverable on their own (speaking about the object contained in those fields), while DFs are hidden within the object. Both DOFs and SFs are discoverable via the explorer but while SFs are known at compile time, DOFs are not.

To me, main reason you want to use DOFs is if you want chunk of data of the main object to be tracked independently.


## Part C — Programmable Transaction Blocks (Module D4)

- How much gas was consumed (in MIST)?

We got, 

```json
gasUsed: {
    computationCost: '1000000',
    storageCost: '1976000',
    storageRebate: '978120',
    nonRefundableStorageFee: '9880'
  },
```

The consumed gas is `computationCost`+`storageCost`, which in our case is, 2,976,000 MIST. 

- Why does the sender's balance decrease by more than just the transferred amount?

Because they have to pay for the transaction fee aswell.

## Part D — Advanced PTBs: Minting NFTs (Module E1)

- Why are Programmable Transaction Blocks powerful compared to single-instruction transactions?

PTBs are powerful compared to SITs because they are more cost effective and also, they allow us to achieve "atomicity". Either everything succeed or all fails which is not possible with SITs. PTBs are fundamental to composability with no storage cost, intermediate steps just live within the transaction. And from a user perspective, sign one PTB, a complex workflow kicks in which makes the experience less of a click-fest.


- In your `mintHeroWithSword` implementation, how many Move calls does the single PTB contain? Could you add even more operations to the same PTB?

We have 3 move calls. Yes we can add more as long as we handle our objects correctly.

- What happens if one command in a PTB fails — do the previous commands still take effect?

Nothing takes effect.