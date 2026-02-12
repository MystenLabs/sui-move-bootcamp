# K1 - Sui Indexer Example

## Overview

This module demonstrates how to build a real-time event indexer for the Sui blockchain. You'll learn how to work with a Move smart contract that emits events and build a TypeScript-based backend service that subscribes to and processes those events using gRPC streaming.

### What You'll Learn

- Working with Move smart contracts with event emission
- Setting up a gRPC-based indexer to listen for blockchain events
- Decoding BCS (Binary Canonical Serialization) encoded event data
- Real-time blockchain data streaming and processing

## Project Structure

```
K1/
├── contract/                 # Move smart contract
│   ├── sources/
│   │   └── indexer_sample.move
│   └── Move.toml
└── backend/                  # TypeScript indexer and tests
    ├── indexer.ts           # Main indexer implementation
    ├── utils/
    │   └── parseEvent.ts    # BCS event decoder
    ├── tests/
    │   ├── registerUser.test.ts
    │   └── helpers/
    │       └── getSigner.ts
    ├── package.json
    ├── tsconfig.json
    ├── jest.config.js
    └── env.example
```

## Prerequisites

Before starting, ensure you have:

- [Sui CLI](https://docs.sui.io/build/install) installed
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Sui wallet with testnet SUI tokens

## Smart Contract Overview

The `indexer_sample.move` contract implements a simple user registration system:

### Key Components

**1. UsersCounter (Shared Object)**

```move
public struct UsersCounter has key {
    id: UID,
    count: u64,
}
```

- Tracks the total number of registered users
- Shared object accessible by all users

**2. UserRegistered Event**

```move
public struct UserRegistered has copy, drop {
    owner: address,
    name: String,
    users_id: u64,
}
```

- Emitted when a new user registers
- Contains user information that the indexer will capture

**3. register_user Function**

- Public entry function to register a new user
- Increments the counter and emits an event

## Setup Instructions

### 1. Deploy the Smart Contract

Navigate to the contract directory:

```bash
cd contract
```

Build the contract:

```bash
sui move build
```

Deploy to testnet:

```bash
sui client publish
```

After deployment, note down:

- **Package ID**: The deployed package address
- **UsersCounter Object ID**: The shared object created during initialization

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd ../backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `env.example`:

```bash
cp env.example .env
```

Configure your `.env` file:

```env
PACKAGE_ID=<your_package_id_from_deployment>
MODULE_NAME=indexer_sample
PRIVATE_KEY=<your_base64_encoded_private_key>
USERS_COUNTER_OBJECT_ID=<your_shared_users_counter_object_id>
```

**Getting Your Private Key:**

1.

```bash
# Export your private key in Bech32 format
sui keytool export --key-identity <your-address>
```

2. Hold your suiprivkey..

3. Run

```bash
# Convert your private key in base64 format
sui keytool convert <your-suiprivkey>
```

4. Copy your private key in Base64 format

## Running the Project

### Start the Indexer

The indexer listens for `UserRegistered` events in real-time:

```bash
npm start
```

You should see:

```
Subscribed to checkpoint stream...
```

The indexer will now print event data whenever a user registers.

### Run Tests

Execute the test suite:

```bash
npm test
```

### Inspect results

You should see the event appear in your indexer output:

````json
Event Data: {
  owner: '0x...',
  name: 'Alice',
  users_id: '1'
}


## Key Concepts Explained

### 1. Event Emission in Move

Events in Move are structs with `copy` and `drop` abilities:
```move
public struct UserRegistered has copy, drop {
    owner: address,
    name: String,
    users_id: u64,
}

// Emit the event
event::emit(user_registered);
````

Events are indexed by type and can be queried by external services.

### 2. gRPC Checkpoint Subscription

The indexer uses Sui's gRPC service to subscribe to checkpoints:

```typescript
const stream = grpcClient.subscriptionService.subscribeCheckpoints({
  readMask: {
    paths: ["transactions.events"],
  },
});
```

This provides a real-time stream of blockchain data without polling.

### 3. BCS Decoding

Events are encoded using BCS. To decode them:

```typescript
const USER_REGISTERED_EVENT_BCS = bcs.struct("UserRegistered", {
  owner: bcs.Address,
  name: bcs.string(),
  users_id: bcs.u64(),
});

const decoded = USER_REGISTERED_EVENT_BCS.parse(bytes);
```

The structure must match the Move struct definition exactly.

### 4. Event Filtering

Filter events by constructing the fully qualified event name:

```typescript
const FULL_EVENT_NAME = `${PACKAGE_ID}::${MODULE_NAME}::UserRegistered`;

if (FULL_EVENT_NAME === event.eventType) {
  // Process this event
}
```

### 5. Shared Objects

The `UsersCounter` is a shared object that can be accessed concurrently:

```move
fun init(ctx: &mut TxContext) {
    let users_counter = UsersCounter {
        id: object::new(ctx),
        count: 0,
    };
    transfer::share_object(users_counter);
}
```

All users can call `register_user` with the same shared object.

## Testing Strategy

The test suite demonstrates:

1. **Transaction Building**: Creating and signing transactions
2. **Smart Contract Interaction**: Calling Move functions
3. **Event Verification**: Checking that events are emitted correctly
4. **Error Handling**: Managing transaction failures

Example test structure:

```typescript
test("should successfully register a new user", async () => {
  // Arrange: Set up transaction
  const tx = new Transaction();
  tx.moveCall({
    target: `${packageId}::${moduleName}::register_user`,
    arguments: [tx.pure.string(userName), tx.object(usersCounterObjectId)],
  });

  // Act: Execute transaction
  const result = await client.signAndExecuteTransaction({
    signer: getSigner({ secretKey: process.env.PRIVATE_KEY! }),
    transaction: tx,
  });

  // Assert: Verify success
  expect(result.effects?.status.status).toBe("success");
});
```

## Additional Resources

- [Sui Documentation](https://docs.sui.io/)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
- [gRPC API Documentation](https://docs.sui.io/references/sui-api/grpc)
- [Sui Events Guide](https://docs.sui.io/guides/developer/sui-101/using-events)
