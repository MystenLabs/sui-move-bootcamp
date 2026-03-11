## The blockchains core currency: Gas

### What is the Gas Fee
Gas Fee is a Fee that users for every transaction they execute.
The Gas Fee's Currency/Token(commonly referenced as just Gas) of a blockchain is its native currency, used for incentivizing Validators(in PoS) and Miners(in PoW).
In Sui, the gas token is the SUI coin.

The formulae of the Total Gas Fee of a transaction in Sui is:
```
Total Gas Fee = Computation Gas Cost + Storage Gas Cost
```

### Who pays for Gas
The Gas is paid always by users, for every transaction they execute.
Every transaction and operation has its own gas cost, and it is determined through a math operation based on multiple factors.
To figure out why and how the gas is measured, we can initially think about it like "the more complex a transaction is, the more gas I pay" (computational units).

An interesting way of translating gas cost to "real world" scenarios, is to think about them as they were computation time in general programming languages.
The more complex a transaction is, the more time it will take to execute -> The more complex a transaction is, the more Gas it will pay.

A very high level sample is depicted in the following:
```code
fun f(): u64 {
    let x = 1;
    let y = 2;
    let z = 3;
    let a = 4;
    x + y + z + a
}
```
It will consume more gas than:
```code
fun f(): u64 {
    let x = 1;
    let y = 2;
    x + y
}
```
The above is true for generic and high level cases, but in Sui, as we will see in the following material, it is not always true.
It can happen that, thanks to the "bucketing" algorithm, these 2 transactions above will cost the same Gas if they fall under the same bucket range!
Learn more at: [https://docs.sui.io/concepts/tokenomics/gas-in-sui#computation]

### Where to get Gas
Since the Gas of a blockchain is indeed its native currency, there are many ways of obtaining some.
Think about it indeed, like you are actually buying SUI.
You can Buy, Transfer, get from Airdrops, use Faucets(for testnets/devnets) and any other way you would usually buy SUI.

### Where does the Gas go
The Gas, as mentioned earlier, is used for incentivizing the Validators and therefore the network.
In Sui blockchain, at the end of every epoch, the validators earn Gas(rewards) based on their current Stake(amount of SUI staked).
The Total amount of Gas paid in an epoch is distributed among validators, you can think about it as:
- Total Gas: 5000 SUI
- Validator 1: 2% stake of the total staked SUI in the "validators pool"
- Validator 2: 10% stake of the total staked SUI in the "validators pool"
At the end of the epoch:
- Validator 1: will earn approximately: (2 * 5000 / 100) SUI = 100 SUI
- Validator 2 will earn approximately: (10 * 5000 / 100) SUI = 500 SUI
- Every other validator will earn accordingly based on their stake
Learn more at: https://www.sui.io/validators
