# K1 - Sui Indexer Example

## Overview

This module demonstrates how to build a real-time event indexer for the Sui blockchain. You'll learn how to work with a Move smart contract that emits events and build a TypeScript-based backend service that subscribes to and processes those events using gRPC streaming.
It also includes a retriever that can be used to retrieve past events from the blockchain, using GraphQL.

In this example, we are using the `indexer_sample` contract, and the `UserRegistered` event.
To extend this example, you can change the event name to suit your needs, and extend the `parseEvent` function to handle different events, as well as the retriever and indexer.

### What You'll Learn

- Working with Move smart contracts with event emission
- Setting up a gRPC-based indexer to listen for blockchain events
- Decoding BCS (Binary Canonical Serialization) encoded event data
- Real-time blockchain data streaming and processing
- Retrieving past events from the blockchain using GraphQL

## Project Structure

```
K1/
├── contract/                 # Move smart contract
│   ├── sources/
│   │   └── indexer_sample.move
│   └── Move.toml
└── backend/                  # TypeScript indexer and tests
    ├── indexer.ts           # Main indexer implementation
    ├── retriever.ts         # Retriever implementation
    ├── utils/
    │   ├── clients.ts       # gRPC and GraphQL clients
    │   └── parseEvent.ts    # BCS event decoder
    ├── tests/
    │   ├── registerUser.test.ts
    │   └── helpers/
    │       └── getSigner.ts
    ├── package.json
    ├── tsconfig.json
    ├── vitest.config.ts
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
EVENT_NAME=YourEventName
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
npm run listen
```

You should see:

```
Subscribed to checkpoint stream...
```

The indexer will now print event data whenever a user registers.

### Emit Events

You can emit events by running the test suite:

```bash
npm run test
```
or by executing the contract function elsewhere (sdk, explorer, cli, ...)

### Retrieve Past Events

Retrieve past events from the blockchain:
```bash
npm run retrieve
```

You should see the past events in the console.

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
const FULL_EVENT_NAME = `${PACKAGE_ID}::${MODULE_NAME}::${EVENT_NAME}`;

if (FULL_EVENT_NAME === event.eventType) {
  // Process this event
}
```

### 5. Event Retrieval

The retriever is used to retrieve past events from the blockchain using GraphQL.

Use the `events` query to query past events using GraphQL, and pass as input the event type(`package::module::EventName`) you want to retrieve.
```typescript
const response = await graphqlClient.query({
  query: `
    query discoverEvents($type: String) {
      events(filter: { type: $type }) {
        nodes {
          contents {
            json
            type {
              layout
            }
          }
        }
      }
    }
  `,
  variables: { type: `${PACKAGE_ID}::${MODULE_NAME}::${EVENT_NAME}` }
});
```
For more info and description about parameters, see: https://docs.sui.io/guides/developer/accessing-data/query-with-graphql.

## Test Suite

The test suite is mainly used to emit events via Typescript, and checking if they are emitted correctly.

## Additional Resources

- [Sui Documentation](https://docs.sui.io/)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
- [gRPC API Documentation](https://docs.sui.io/references/sui-api/grpc)
- [Sui Events Guide](https://docs.sui.io/guides/developer/sui-101/using-events)
