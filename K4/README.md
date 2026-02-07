# Sui & Move Bootcamp - K4: Nautilus

## Overview

Nautilus is a framework for secure and verifiable off-chain computation on Sui. It enables developers to delegate resource-intensive or sensitive tasks to a **Trusted Execution Environment (TEE)** while maintaining on-chain verification through Move smart contracts.

This lesson provides a theoretical foundation for understanding Nautilus, including its architecture, security model, and how it enables trustless off-chain computation. You'll learn how TEEs work with blockchain verification and see code examples demonstrating the key concepts.

> 📺 **Companion Slides**: [Nautilus Theory Presentation](https://docs.google.com/presentation/d/1TfXcnQqzbQzcR35FaoCPKR3SKpN3RaELKTEIPZVCs0g/edit?slide=id.g3c2d3c20532_0_249#slide=id.g3c2d3c20532_0_249)
>
> This README provides detailed reference material. For a visual walkthrough, see the slides.

### What You'll Learn

- What Trusted Execution Environments (TEEs) are and why they matter for blockchain
- How Nautilus bridges off-chain computation with on-chain verification
- The role of Platform Configuration Registers (PCRs) in code verification
- How attestation documents prove enclave integrity
- Move smart contract patterns for enclave registration and verification
- Rust server patterns for building Nautilus applications
- The complete trust model and security guarantees

> **How to use this material**:
>
> - **Slides** → Conceptual understanding, visual flow
> - **README** → Reference material, code examples, deployment commands

## Project Structure

```
K4/
├── README.md                    # This file
└── example/
    ├── move/
    │   └── weather.move         # On-chain weather oracle app
    └── rust/
        ├── mod.rs               # Enclave server implementation (your custom logic)
        └── allowed_endpoints.yaml
```

> **Note**: The example files above show only the code you customize. The complete Nautilus server requires additional files (`main.rs`, `common.rs`, etc.) which are referenced via GitHub links in this document. See the [Nautilus repository](https://github.com/MystenLabs/nautilus) for the full template.

## The Problem Nautilus Solves

Traditional blockchain applications face a fundamental challenge:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     THE BLOCKCHAIN TRILEMMA                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   On-Chain Computation:                                             │
│   ✓ Trustless & Verifiable                                          │
│   ✗ Expensive (gas costs)                                           │
│   ✗ Public (no privacy)                                             │
│   ✗ Limited computation power                                       │
│                                                                     │
│   Traditional Off-Chain:                                            │
│   ✓ Cheap & Fast                                                    │
│   ✓ Private                                                         │
│   ✗ Requires trusting the operator                                  │
│   ✗ No verifiable guarantees                                        │
│                                                                     │
│   Nautilus (TEE-based):                                             │
│   ✓ Cheap & Fast                                                    │
│   ✓ Private (isolated memory)                                       │
│   ✓ Cryptographically verifiable                                    │
│   ✓ Trustless (verify, don't trust)                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Nautilus enables the best of both worlds: off-chain computation that is cryptographically provable on-chain.

## Core Concepts

### Trusted Execution Environments (TEEs)

A TEE is a secure area within a processor that guarantees code and data loaded inside are protected with respect to confidentiality and integrity. Think of it as a "black box" that:

1. **Isolates execution** - Code runs in protected memory that even the host OS cannot access
2. **Proves its identity** - Can generate cryptographic attestations of what code is running
3. **Protects secrets** - Private keys and sensitive data never leave the enclave

Nautilus currently uses **AWS Nitro Enclaves**, which provide hardware-based isolation:

```
┌────────────────────────────────────────────────────────────────────┐
│                        AWS EC2 Instance                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Host Operating System                     │  │
│  │                                                              │  │
│  │   ┌─────────────────────────────────────────────────────┐    │  │
│  │   │              NITRO ENCLAVE (TEE)                    │    │  │
│  │   │  ┌─────────────────────────────────────────────┐    │    │  │
│  │   │  │         Nautilus Application                │    │    │  │
│  │   │  │                                             │    │    │  │
│  │   │  │  • Ephemeral keypair (private key stays)    │    │    │  │
│  │   │  │  • Application logic                        │    │    │  │
│  │   │  │  • Signs responses                          │    │    │  │
│  │   │  └─────────────────────────────────────────────┘    │    │  │
│  │   │                                                     │    │  │
│  │   │  ✗ No direct network access                         │    │  │
│  │   │  ✗ No persistent storage                            │    │  │
│  │   │  ✗ No interactive access (SSH)                      │    │  │
│  │   │  ✓ Cryptographic attestation                        │    │  │
│  │   └─────────────────────────────────────────────────────┘    │  │
│  │                           │                                  │  │
│  │                    vsock (secure channel)                    │  │
│  │                           │                                  │  │
│  │   ┌─────────────────────────────────────────────────────┐    │  │
│  │   │              Proxy Application                      │    │  │
│  │   │         (forwards HTTP requests to enclave)         │    │  │
│  │   └─────────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Platform Configuration Registers (PCRs)

PCRs are SHA-384 hashes that uniquely identify the enclave's code and configuration. They act as a "fingerprint" of exactly what software is running:

| PCR      | What It Measures        | Changes When...                  |
| -------- | ----------------------- | -------------------------------- |
| **PCR0** | OS and boot environment | Enclave image or kernel changes  |
| **PCR1** | Application code        | Any code changes                 |
| **PCR2** | Runtime configuration   | `run.sh` or traffic rules change |

**Key Property**: If a single byte changes in any component, the corresponding PCR changes. This allows on-chain contracts to verify that the enclave is running exactly the expected code.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PCR VERIFICATION FLOW                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Developer publishes code    User builds locally    Compare PCRs    │
│         on GitHub       ──►  from source code   ──►  with on-chain  │
│                                                                     │
│  ┌─────────────┐            ┌─────────────┐        ┌─────────────┐  │
│  │ Source Code │            │   Build     │        │  On-Chain   │  │
│  │    repo     │──builds───►│  Process    │──hash─►│   PCRs      │  │
│  └─────────────┘            └─────────────┘        └─────────────┘  │
│                                    │                      │         │
│                                    ▼                      ▼         │
│                             PCR0: abc123...       PCR0: abc123... ✓ │
│                             PCR1: def456...       PCR1: def456... ✓ │
│                             PCR2: ghi789...       PCR2: ghi789... ✓ │
│                                                                     │
│  If ANY PCR doesn't match ──► Computation is REJECTED               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Attestation Documents

An attestation document is a cryptographically signed proof from AWS that certifies:

- The enclave is running on genuine AWS Nitro hardware
- The exact PCR values of the running code
- The enclave's public key (for signature verification)
- A timestamp (to prevent replay attacks)

The certificate chain leads back to AWS as the root of trust:

```
AWS Root CA
    │
    └─► AWS Nitro CA
            │
            └─► Enclave Instance Certificate
                    │
                    └─► Attestation Document
                            │
                            ├── PCR0, PCR1, PCR2
                            ├── Public Key
                            ├── Timestamp
                            └── Signature
```

## Architecture Deep Dive

### Enclave Endpoints

Every Nautilus enclave exposes three HTTP endpoints:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                        NAUTILUS ENCLAVE ENDPOINTS                             │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  GET /health_check                                                            │
│  ├── Purpose: Verify enclave can reach allowed external domains               │
│  ├── Use: Debugging connectivity issues                                       │
│  └── Returns: {                                                               │
│         "pk": "f343dae1df7f...",           // Hex-encoded enclave public key  │
│         "endpoints_status": {                                                 │
│           "api.weatherapi.com": true       // Domain → reachable status       │
│         }                                                                     │
│       }                                                                       │
│                                                                               │
│  GET /get_attestation                                                         │
│  ├── Purpose: Get signed attestation document for on-chain registration       │
│  ├── Use: Called once during enclave registration                             │
│  └── Returns: {                                                               │
│         "attestation": "845902b5..."       // Hex-encoded attestation doc     │
│       }                                                                       │
│                                                                               │
│  POST /process_data                                                           │
│  ├── Purpose: Execute custom application logic (developer implements this)    │
│  ├── Use: dApp frontend sends requests here                                   │
│  └── Returns: {                                                               │
│         "response": {                                                         │
│           "intent": 0,                     // Intent scope (matches Move)     │
│           "timestamp_ms": 1744041600000,   // Timestamp for replay protection │
│           "data": { ... }                  // Your custom response data       │
│         },                                                                    │
│         "signature": "b75d2d44c4a6..."     // Hex-encoded Ed25519 signature   │
│       }                                                                       │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Complete Data Flow

Here's how a complete Nautilus interaction works:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NAUTILUS DATA FLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────┐     ┌─────────┐     ┌─────────────────────────────────┐   │
│  │ User │     │ Enclave │     │     Sui Blockchain              │   │
│  └──┬───┘     └────┬────┘     │  ┌────────────┐ ┌────────────┐  │   │
│     │              │          │  │  Enclave   │ │  your_dapp │  │   │
│     │              │          │  │  (pk, cfg) │ │   .move    │  │   │
│     │              │          │  └────────────┘ └─────┬──────┘  │   │
│     │              │          └───────────────────────┼─────────┘   │
│     │              │                                  │             │
│     │  1. Request  │                                  │             │
│     │   (process   │                                  │             │
│     │    _data)    │                                  │             │
│     │─────────────►│                                  │             │
│     │              │                                  │             │
│     │              │ 2. Process in TEE                │             │
│     │              │    - Fetch external data         │             │
│     │              │    - Sign response               │             │
│     │              │                                  │             │
│     │ 3. Signed    │                                  │             │
│     │    response  │                                  │             │
│     │◄─────────────│                                  │             │
│     │              │                                  │             │
│     │ 4. Submit transaction calling dApp function     │             │
│     │    (e.g., update_weather with enclave, sig,     │             │
│     │     response data)                              │             │
│     │────────────────────────────────────────────────►│             │
│     │              │                                  │             │
│     │              │                   5. Verify sig  │             │
│     │              │                      using       │             │
│     │              │                      enclave.pk  │             │
│     │              │                                  │             │
│     │              │                   6. Execute     │             │
│     │              │                      app logic   │             │
│     │              │                      (mint NFT)  │             │
│     │              │                                  │             │
│     │ 7. Transaction result                           │             │
│     │◄────────────────────────────────────────────────│             │
│     │              │                                  │             │
└─────┴──────────────┴──────────────────────────────────┴─────────────┘
```

> **Deep Dive**: For details on what happens inside the enclave (ephemeral key generation, attestation, signing), see [What Happens Inside the Enclave](https://docs.sui.io/concepts/cryptography/nautilus/nautilus-design#what-happens-inside-the-enclave) in the official docs.

## Code Examples

This lesson includes reference code examples in the `example/` directory.

### Move: Enclave Library

The core enclave module handles PCR storage, enclave registration, and signature verification. View the full implementation here:

**[enclave.move](https://github.com/MystenLabs/nautilus/blob/main/move/enclave/sources/enclave.move)** (GitHub)

Key structs and functions:

- `EnclaveConfig<T>` - Stores PCR values and config version
- `Enclave<T>` - Registered enclave with its public key
- `Cap<T>` - Capability to update enclave config
- `IntentMessage<T>` - Wrapper for signed messages with intent scope and timestamp
- `new_cap()` - Create a capability using a one-time witness
- `create_enclave_config()` - Initialize config with PCR values
- `register_enclave()` - Register an enclave from attestation document
- `verify_signature()` - Verify Ed25519 signature from enclave

### Move: Application Example

| File                                      | Description                                      |
| ----------------------------------------- | ------------------------------------------------ |
| [weather.move](example/move/weather.move) | Weather oracle app that uses the enclave library |

The weather app demonstrates how to build on top of the enclave module:

1. **One-Time Witness Pattern** - `WEATHER` struct for module initialization
2. **Enclave Config Setup** - Creates config with placeholder PCRs in `init()`
3. **Response Struct** - `WeatherResponse` must match Rust BCS serialization exactly
4. **Signature Verification** - `update_weather()` verifies enclave signature before minting NFT

```move
public fun update_weather<T>(
    location: String,
    temperature: u64,
    timestamp_ms: u64,
    sig: &vector<u8>,
    enclave: &Enclave<T>,
    ctx: &mut TxContext,
): WeatherNFT {
    let res = enclave.verify_signature(
        WEATHER_INTENT,
        timestamp_ms,
        WeatherResponse { location, temperature },
        sig,
    );
    assert!(res, EInvalidSignature);
    // Mint NFT with verified data
    WeatherNFT { id: object::new(ctx), location, temperature, timestamp_ms }
}
```

### Rust: Enclave Server

The Nautilus server runs inside the TEE and consists of several components:

| File                                                                                            | Description                                                                       |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [mod.rs](example/rust/mod.rs)                                                                   | **Your app logic** - fetches API data, signs responses                            |
| [allowed_endpoints.yaml](example/rust/allowed_endpoints.yaml)                                   | Whitelist of external APIs the enclave can access                                 |
| [main.rs](https://github.com/MystenLabs/nautilus/blob/main/src/nautilus-server/src/main.rs)     | Server initialization - sets up ephemeral keypair and HTTP routes (do not modify) |
| [common.rs](https://github.com/MystenLabs/nautilus/blob/main/src/nautilus-server/src/common.rs) | Attestation handling and response signing utilities (do not modify)               |

The `mod.rs` demonstrates the enclave-side implementation that you customize:

1. **IntentScope Enum** - Defines intent types as a domain separator (the value used when signing must match the value passed to `verify_signature` in Move)
2. **Request/Response Structs** - `WeatherRequest` and `WeatherResponse` (BCS serialization must match Move)
3. **process_data Handler** - Fetches external data, validates timestamp, returns signed response

```rust
pub async fn process_data(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ProcessDataRequest<WeatherRequest>>,
) -> Result<Json<ProcessedDataResponse<IntentMessage<WeatherResponse>>>, EnclaveError> {
    // 1. Fetch weather from external API
    // 2. Validate timestamp freshness (reject if > 1 hour old)
    // 3. Return signed response using enclave's ephemeral keypair
    Ok(Json(to_signed_response(
        &state.eph_kp,
        WeatherResponse { location, temperature },
        last_updated_timestamp_ms,
        IntentScope::ProcessData as u8,
    )))
}
```

> **Note**: The `main.rs` and `common.rs` files are part of the Nautilus template and typically don't need modification. You only need to implement your custom `mod.rs` and `allowed_endpoints.yaml`.

## Developer Workflow Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEVELOPER WORKFLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. DEVELOP                                                         │
│     ├── Clone nautilus template                                     │
│     ├── Implement custom logic in /src/nautilus-server/apps/        │
│     ├── Configure allowed domains in allowed_endpoints.yaml         │
│     └── Test locally with `make run-debug`                          │
│                                                                     │
│  2. BUILD                                                           │
│     ├── Build reproducible enclave image                            │
│     ├── Record PCR0, PCR1, PCR2 values                              │
│     └── Publish source code to GitHub for transparency              │
│                                                                     │
│  3. DEPLOY CONTRACTS                                                │
│     ├── Deploy enclave config contract                              │
│     ├── Set PCR values on-chain                                     │
│     └── Deploy application contract                                 │
│                                                                     │
│  4. DEPLOY ENCLAVE                                                  │
│     ├── Provision AWS EC2 with Nitro Enclave                        │
│     ├── Deploy enclave image                                        │
│     └── Get attestation document                                    │
│                                                                     │
│  5. REGISTER                                                        │
│     ├── Submit attestation to contract                              │
│     ├── Contract verifies PCRs match                                │
│     └── Enclave public key stored on-chain                          │
│                                                                     │
│  6. OPERATE                                                         │
│     ├── Frontend sends requests to enclave                          │
│     ├── Enclave processes and signs responses                       │
│     └── Signed responses verified and used on-chain                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Building a Nautilus App: High-Level Steps

This section provides a condensed overview of the steps to build and deploy a Nautilus application. For complete step-by-step instructions with all commands, see the [official Using Nautilus guide](https://github.com/MystenLabs/nautilus/blob/main/UsingNautilus.md).

### Step 1: Implement Your Application

**Move Contract:**

1. Create your app module under `move/your_app/`
2. Use the [enclave library](https://github.com/MystenLabs/nautilus/blob/main/move/enclave/sources/enclave.move) for registration and verification
3. Define response structs that match your Rust code exactly (BCS serialization)
4. Implement signature verification before processing enclave responses

**Rust Server:**

1. Create your app directory under `src/nautilus-server/src/apps/your_app/`
2. Define `allowed_endpoints.yaml` with external domains your app needs
3. Implement `mod.rs` with your `process_data` handler
4. Ensure request/response structs match Move exactly

### Step 2: Configure AWS Environment

1. Set up an AWS developer account with CLI access
2. Export required credentials:
   ```shell
   export KEY_PAIR=<your-key-pair-name>
   export AWS_ACCESS_KEY_ID=<your-access-key>
   export AWS_SECRET_ACCESS_KEY=<your-secret-key>
   export AWS_SESSION_TOKEN=<your-session-token>
   ```
3. Run the configuration script:
   ```shell
   sh configure_enclave.sh <APP>  # e.g., weather-example
   ```
4. Optionally configure secrets via AWS Secrets Manager (for API keys, etc.)

### Step 3: Build and Deploy the Enclave

1. Connect to your EC2 instance via SSH
2. Clone the repository with your committed code changes
3. Build the enclave image and record PCR values:
   ```shell
   make ENCLAVE_APP=<APP>
   cat out/nitro.pcrs  # Record PCR0, PCR1, PCR2
   ```
4. Run the enclave:
   ```shell
   make run              # Production mode
   # or: make run-debug  # Debug mode (PCRs will be zeros)
   ```
5. Expose the HTTP endpoint:
   ```shell
   sh expose_enclave.sh
   ```

### Step 4: Deploy Move Contracts

1. Deploy the enclave package:
   ```shell
   cd move/enclave && sui client publish
   # Record ENCLAVE_PACKAGE_ID
   ```
2. Deploy your application package:
   ```shell
   cd move/<APP> && sui client publish
   # Record CAP_OBJECT_ID, ENCLAVE_CONFIG_OBJECT_ID, APP_PACKAGE_ID
   ```
3. Update PCRs on-chain:
   ```shell
   sui client call --function update_pcrs --module enclave \
     --package $ENCLAVE_PACKAGE_ID \
     --type-args "$APP_PACKAGE_ID::$MODULE_NAME::$OTW_NAME" \
     --args $ENCLAVE_CONFIG_OBJECT_ID $CAP_OBJECT_ID 0x$PCR0 0x$PCR1 0x$PCR2
   ```

### Step 5: Register the Enclave On-Chain

1. Get attestation from your enclave and register it:
   ```shell
   sh register_enclave.sh $ENCLAVE_PACKAGE_ID $APP_PACKAGE_ID \
     $ENCLAVE_CONFIG_OBJECT_ID $ENCLAVE_URL $MODULE_NAME $OTW_NAME
   # Record ENCLAVE_OBJECT_ID
   ```

### Step 6: Use the Enclave

1. Send requests to your enclave:
   ```shell
   curl -H 'Content-Type: application/json' \
     -d '{"payload": { "location": "San Francisco"}}' \
     -X POST http://<PUBLIC_IP>:3000/process_data
   ```
2. Use the signed response in your Move contract (frontend integration)

> **Full Guide**: For detailed instructions including troubleshooting, ALB/SSL setup, and multiple examples, see [Using Nautilus](https://github.com/MystenLabs/nautilus/blob/main/UsingNautilus.md).

## Security Considerations

### What Nautilus Protects Against

- **Operator Tampering**: Code verification via PCRs
- **Data Exposure**: Isolated memory in TEE
- **Response Forgery**: Cryptographic signatures
- **Replay Attacks**: Timestamp verification
- **Code Modification**: Any change invalidates PCRs

### What Nautilus Does NOT Protect Against

- **Side-Channel Attacks**: TEEs have known vulnerabilities (though AWS patches quickly)
- **Buggy Application Code**: Verified code can still have bugs
- **Compromised Dependencies**: Supply chain attacks during build
- **AWS Compromise**: Root of trust is AWS (nation-state level threat)

### Best Practices

1. **Minimize Enclave Code**: Less code = smaller attack surface
2. **Audit Dependencies**: Review all libraries used in enclave
3. **Use Short Timestamps**: Reduce replay attack window
4. **Monitor PCRs**: Alert if unexpected PCR values appear
5. **Defense in Depth**: Don't rely solely on TEE guarantees

## Important Limitations

> **Note**: The Nautilus template is not feature complete and has not undergone a security audit. It is offered as a reference for evaluation purposes only. Developers must deploy and manage their own TEEs (AWS Nitro Enclaves).

- **Self-Managed Infrastructure**: No native TEE network - you run your own
- **AWS Dependency**: Currently only supports AWS Nitro Enclaves
- **Cost**: EC2 with Nitro costs approximately $0.19/hour [as of February 2026]
- **Complexity**: Requires AWS account setup, enclave provisioning, and key management

## Useful Links

### Getting Started

- **[Using Nautilus Guide (GitHub)](https://github.com/MystenLabs/nautilus/blob/main/UsingNautilus.md)** - Complete step-by-step deployment guide with all commands
- **[Nautilus Design (GitHub)](https://github.com/MystenLabs/nautilus/blob/main/Design.md)** - Detailed architecture and design decisions

### Official Documentation

- [Nautilus Overview](https://docs.sui.io/guides/developer/nautilus/)
- [Nautilus Design](https://docs.sui.io/concepts/cryptography/nautilus/nautilus-design)
- [Using Nautilus](https://docs.sui.io/guides/developer/nautilus/using-nautilus)
- [Seal](https://github.com/MystenLabs/seal) - Secure key storage that complements Nautilus for persisting keys across enclave restarts

### Code Repositories

- [Nautilus Template](https://github.com/MystenLabs/nautilus) - Clone this to start building
- [Enclave Library (enclave.move)](https://github.com/MystenLabs/nautilus/blob/main/move/enclave/sources/enclave.move) - Core Move module
- [Server Template (main.rs)](https://github.com/MystenLabs/nautilus/blob/main/src/nautilus-server/src/main.rs) - Rust server entry point
- [Common Utilities (common.rs)](https://github.com/MystenLabs/nautilus/blob/main/src/nautilus-server/src/common.rs) - Attestation and signing
- [Sui Framework](https://github.com/MystenLabs/sui)

### AWS Resources

- [AWS Nitro Enclaves](https://aws.amazon.com/ec2/nitro/nitro-enclaves/)
- [Nitro Enclaves User Guide](https://docs.aws.amazon.com/enclaves/latest/user/)

### Related Concepts

- [Trusted Execution Environments (TEEs)](https://en.wikipedia.org/wiki/Trusted_execution_environment)
- [Remote Attestation](https://en.wikipedia.org/wiki/Trusted_Computing#Remote_attestation)
- [Reproducible Builds](https://reproducible-builds.org/)

## Summary

Nautilus bridges the gap between on-chain trust and off-chain computation by leveraging hardware-based Trusted Execution Environments. Key takeaways:

1. **TEEs provide isolation**: Code runs in protected memory that even the host cannot access
2. **PCRs enable verification**: Anyone can verify exactly what code is running
3. **Attestation proves integrity**: AWS cryptographically certifies the enclave state
4. **Signatures ensure authenticity**: Every response is signed and verifiable on-chain
5. **Trust is cryptographic**: Users verify rather than trust operators

This combination enables powerful use cases like private computation, sealed-bid auctions, and verifiable oracles - all with cryptographic guarantees rather than operator trust.
