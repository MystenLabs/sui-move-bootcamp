# R11 Bridge Server

The bridge server normalizes simulator, serial, or LoRa-style readings and can
either print a submission plan or send the transaction on-chain when
`AUTO_SUBMIT=true`.

## Quick Start

```bash
pnpm install
python3 ../simulator/energy_sim.py --count 5 | pnpm dev
```

For LoRa-style packets:

```bash
python3 ../simulator/lora_sim.py --count 5 | TRANSPORT=lora pnpm dev
```

Set `AUTO_SUBMIT=true` and configure wallet credentials in `.env` to send the
parsed readings as Sui transactions.
