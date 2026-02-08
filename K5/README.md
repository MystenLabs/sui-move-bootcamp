# Seal Learning Guide

A structured learning module for developers integrating with Seal, the Decentralized Secrets Management service for Sui. Start at the top and work through each guide in order — each one builds on the previous.

## Contents

### [1. What Is Seal](./01_what_is_seal.md)
What Seal does, why it exists, and the use cases it enables.

### [2. Architecture](./02_architecture.md)
The two pillars (on-chain policies + off-chain key servers), the IBE identity model, and how encryption and decryption flow through the system.

### [3. Access Policies](./03_access_policies.md)
Writing `seal_approve` functions in Move, the five built-in patterns, and the constraints you need to know.

### [4. Encryption & Decryption](./04_encryption_decryption.md)
Using the TypeScript SDK to encrypt data, create session keys, and decrypt with access control.

### [5. Key Servers](./05_key_servers.md)
How key servers work, Open vs Permissioned modes, and the verified provider ecosystem.

### [6. Security Model](./06_security_model.md)
Trust assumptions, threshold configuration, envelope encryption, and operational security practices.

### [7. Advanced Topics](./07_advanced_topics.md)
On-chain decryption, MPC committee key servers, the Seal CLI, and future roadmap.
