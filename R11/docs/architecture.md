# R11 Architecture

`R11` is structured to let learners swap transport layers without changing the
core on-chain model.

```mermaid
flowchart LR
    subgraph Device
        SIM[Simulator]
        ESP[ESP32]
        PZEM[PZEM-004T / SCT-013]
        RELAY[Relay]
    end

    subgraph Bridge
        SERIAL[Serial parser]
        LORA[LoRa packet parser]
        SUBMIT[Sui submitter]
    end

    subgraph Chain
        METER[energy_meter.move]
        WATT[watt.move]
        BILL[billing.move]
    end

    subgraph UI
        INDEXER[Indexer]
        DASH[React dApp]
    end

    PZEM --> ESP
    SIM --> SERIAL
    ESP --> SERIAL
    ESP --> LORA
    SERIAL --> SUBMIT
    LORA --> SUBMIT
    SUBMIT --> METER
    SUBMIT --> WATT
    SUBMIT --> BILL
    METER --> INDEXER
    WATT --> INDEXER
    BILL --> INDEXER
    INDEXER --> DASH
    DASH --> RELAY
```

## Why this shape

- `move/` stays small and testable, focusing on validation, rewards, and billing
- `server/` owns transport normalization so learners can start with stdin or
  JSON and add hardware later
- `simulator/` makes the module deterministic enough for CI and review
- `dapp/` mirrors the R9/R10 wallet pattern instead of inventing a new stack
