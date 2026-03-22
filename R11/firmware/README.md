# R11 Firmware

Arduino sketches for the ESP32-based hardware transports.

## Sketches

### `esp32_pzem/`

Direct wired path: **ESP32 + PZEM-004T → USB serial → R11 bridge**

- Reads voltage, current, power, and cumulative energy from a PZEM-004T AC
  meter over UART2
- Emits one JSON line per interval on USB serial (115200 baud)
- The R11 bridge reads these lines from `stdin` with `TRANSPORT=serial`

**Required libraries** (install via Arduino Library Manager):
- `PZEM004Tv30` by olehs

**Wiring**: see [`../docs/wiring_esp32_pzem.md`](../docs/wiring_esp32_pzem.md)

**Flash and connect**:
```bash
# Flash with Arduino IDE or arduino-cli
arduino-cli compile --fqbn esp32:esp32:esp32 esp32_pzem/
arduino-cli upload  --fqbn esp32:esp32:esp32 --port /dev/ttyUSB0 esp32_pzem/

# Pipe USB output into the bridge
cat /dev/ttyUSB0 | pnpm dev   # from R11/server, with TRANSPORT=serial
```

---

### `esp32_lora/`

Wireless path: **ESP32 + PZEM-004T + Ra-02 LoRa → gateway → R11 bridge**

- Same PZEM-004T reading as above
- Transmits each reading as a compact JSON LoRa packet
- A gateway node receives the packet and forwards it to the bridge in the LoRa
  envelope format expected by `TRANSPORT=lora`

**Required libraries** (install via Arduino Library Manager):
- `PZEM004Tv30` by olehs
- `LoRa` by sandeep-mistry

**Wiring**: see [`../docs/wiring_esp32_lora.md`](../docs/wiring_esp32_lora.md)

**Frequency**: set `LORA_FREQUENCY` to `868E6` (EU) or `915E6` (US/AU) in the
sketch to match your local ISM band and hardware variant.

---

## Simulator alternative

If you do not have hardware, the Python simulator produces the same JSON format:

```bash
# Equivalent to the esp32_pzem USB output
cd ../simulator
python3 energy_sim.py --count 10 | (cd ../server && pnpm dev)
```
