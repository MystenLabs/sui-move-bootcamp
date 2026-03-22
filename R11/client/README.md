# R11 Client

The client package provides direct Sui transaction helpers for the module.

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm request-demo-tokens -- 10
pnpm submit-reading -- 500 12 12
pnpm check-balance
```

## Required configuration

- `PACKAGE_ADDRESS`
- `METER_OBJECT_ID`
- `USER_PHRASE` or `USER_PRIVATE_KEY`

`REWARD_VAULT_ID` is required for faucet requests and optional for bundled
reward minting in `submit-reading`.
