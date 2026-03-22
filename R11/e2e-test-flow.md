# R11 End-to-End Test Flow

Quick copy-paste guide to validate the full DePIN Energy Monitor pipeline
without hardware.

## Prerequisites

- Sui CLI installed (`sui --version`)
- Node.js 20+ and pnpm installed
- Active Sui wallet with testnet SUI (`sui client active-address`)
- Active environment set: `sui client active-env`

---

## 1. Build and test the Move package

```bash
cd R11/move
sui move build
sui move test
```

Expected output:
```
Test result: OK. Total tests: 7; passed: 7; failed: 0
```

---

## 2. Publish the package

```bash
cd R11/publish
chmod +x publish.sh
./publish.sh
```

Record the following from the output:

- **Package ID** → `PACKAGE_ADDRESS`
- **Meter object ID** → `METER_OBJECT_ID`
- **RewardVault object ID** → `REWARD_VAULT_ID`

Add these to `server/.env`, `client/.env`, and `dapp/.env`.

---

## 3. Run the simulator in plan mode

No wallet required — the bridge describes what it *would* submit without
sending transactions.

```bash
cd R11/server
pnpm install
cp .env.example .env
# Fill PACKAGE_ADDRESS and METER_OBJECT_ID, leave AUTO_SUBMIT blank

python3 ../simulator/energy_sim.py --count 5 | pnpm dev
```

Verify you see JSON summaries like:

```json
{"target":"0x...::energy_meter::record_reading","meterObjectId":"0x...","watts":320,"totalKwhMilli":5,...}
```

---

## 4. Submit readings on-chain

Edit `server/.env`:

```env
AUTO_SUBMIT=true
USER_PHRASE="your twelve word mnemonic here"
REWARD_VAULT_ID=0x...
```

Run the bridge again:

```bash
python3 ../simulator/energy_sim.py --count 5 | pnpm dev
```

Verify you see `submitted_digest=<TX_HASH>` for each reading.

---

## 5. Test the LoRa transport

```bash
TRANSPORT=lora python3 ../simulator/lora_sim.py --count 3 | pnpm dev
```

Verify readings are parsed from the wrapped LoRa packet format.

---

## 6. Run the server unit tests

```bash
cd R11/server
pnpm test
```

Expected:

```
✔ parseSerialLine accepts simulator output
✔ parseLoRaPacket unwraps payload
✔ describeSubmission builds a deterministic summary
pass 3
```

---

## 7. Test the CLI client

```bash
cd R11/client
pnpm install
cp .env.example .env
# Fill PACKAGE_ADDRESS, REWARD_VAULT_ID, USER_PHRASE

# Request demo WATT tokens from the on-chain faucet
pnpm request-demo-tokens -- 10

# Check WATT balance
pnpm check-balance

# Submit a single reading manually (500 W, 12 milli-kWh total)
pnpm submit-reading -- 500 12
```

---

## 8. Test the dApp (frontend)

```bash
cd R11/dapp
pnpm install
cp .env.example .env
# Fill VITE_PACKAGE_ID and VITE_METER_OBJECT_ID

pnpm build
pnpm dev    # opens http://localhost:5173
```

Manual check:

1. **Connect wallet** — click Connect, approve in wallet extension
2. **Faucet** — request WATT tokens, verify balance updates
3. **Meter status** — check last watts and cumulative kWh render correctly
4. **Submit reading** — send a reading via the UI, confirm the event appears

---

## 9. Verify Python simulator directly

```bash
# Syntax check
python3 -m py_compile R11/simulator/energy_sim.py R11/simulator/lora_sim.py

# Smoke test — print 3 readings to stdout
python3 R11/simulator/energy_sim.py --count 3

# LoRa-wrapped output
python3 R11/simulator/lora_sim.py --count 3
```

---

## Quick reset

If you need to redeploy from scratch, republish the package and copy the new
object IDs into the `.env` files. Create a new `Meter` object if the old one
accumulated readings you want to clear (the contract enforces monotonic kWh, so
restarting the simulator against the same Meter object only works if you
continue from the last `totalKwhMilli` value).
