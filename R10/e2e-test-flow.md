# R10 End-to-End Test Flow

Quick copy-paste guide to test the full Robot Rental Platform pipeline.

## Prerequisites

- Sui CLI installed (`sui --version`)
- Node.js + pnpm installed
- Active Sui wallet with gas (`sui client active-address`)
- Active environment set (devnet or testnet): `sui client active-env`

---

## 1. Build and test the Move contracts

```bash
cd R10/move
sui move build
sui move test
```

---

## 2. Publish contracts and bootstrap objects

This publishes the package, creates a RobotRegistry, creates a RobotPet, registers the robot in the registry (with a fresh Ed25519 operator keypair), and generates `.env` files for client/server/dapp.

```bash
cd R10/publish
chmod +x publish.sh
./publish.sh Bittle-1
```

Verify the output shows:
- Package published
- Faucet created
- RobotRegistry created
- RobotPet created
- Operator keypair generated
- Robot registered in registry
- `.env` files generated in `client/`, `server/`, `dapp/`

The robot is now ready for both Mode 1 (pay-per-action) and Mode 2 (rental sessions) — no separate registration step needed.

---

## 3. Configure the CLI client

Edit the generated `client/.env` — replace the placeholder mnemonic with your real one:

```bash
# Get your recovery phrase (if you need it):
cat ~/.sui/sui_config/sui.keystore

# Or export from Sui CLI and use the private key format:
# USER_PRIVATE_KEY=suiprivkey1...
```

Install client dependencies:

```bash
cd R10/client
pnpm install
```

---

## 4. Test Mode 1 — Direct action (feed robot)

### 4a. Request TREAT tokens from faucet

```bash
cd R10/client
pnpm request-treats
```

### 4b. Check balance

```bash
pnpm check-balance
```

### 4c. Feed the robot (queue an action on-chain)

```bash
pnpm feed-robot wave
```

Try a few more:

```bash
pnpm feed-robot sit
pnpm feed-robot jump
```

### 4d. List registered robots

```bash
pnpm list-robots
```

---

## 5. Test Mode 2 — Rental session (CLI)

### 5a. Start a rental session

```bash
cd R10/client
pnpm start-session
```

Note the session ID from the output.

### 5b. End the session

```bash
pnpm end-session
```

---

## 6. Test the WebSocket server

### 6a. Start the server

```bash
cd R10/server
pnpm install
pnpm start
```

Server should log: listening on port 8080.

### 6b. Quick WebSocket smoke test (separate terminal)

```bash
# Install wscat if needed: npm install -g wscat
wscat -c ws://localhost:8080
```

Once connected, send an auth message:

```json
{"type":"auth","sessionId":"<SESSION_ID_FROM_STEP_5>"}
```

You should get an `auth_response`. Type `Ctrl+C` to exit.

---

## 7. Test the dApp (frontend)

### 7a. Build and run

```bash
cd R10/dapp
pnpm install
pnpm build
pnpm dev
```

Open http://localhost:5173 in your browser.

### 7b. Manual test checklist

1. **Connect wallet** — click the connect button, approve in wallet extension
2. **Faucet tab** — request TREAT tokens, verify balance updates
3. **Feed Robot tab** — select an action, submit transaction, confirm on-chain
4. **Rent a Robot tab** — select a robot name, set duration, start a rental session
5. **Real-time control** — while a rental session is active, connect WebSocket and click action buttons
6. **End rental** — click "End Rental Session", verify refund

---

## 8. (Optional) Run the full demo script

The client includes an automated demo that exercises the main flows:

```bash
cd R10/client
pnpm demo
```

---

## 9. (Optional) Tunnel for remote access

To expose the WebSocket server via Cloudflare tunnel (useful for testing the dApp from a phone or sharing):

```bash
cd R10/server
chmod +x scripts/install-cloudflared.sh scripts/start-all.sh
./scripts/install-cloudflared.sh   # one-time install
./scripts/start-all.sh
```

Update `dapp/.env` with the tunnel URL:

```
VITE_WS_URL=wss://<tunnel-url>
```

Then restart the dApp dev server.

---

## Quick reset

If you need to redeploy from scratch:

```bash
cd R10/publish
./publish.sh Bittle-1
```

This backs up existing `.env` files and regenerates fresh ones with new object IDs.
