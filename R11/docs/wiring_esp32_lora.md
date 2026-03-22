# ESP32 to LoRa Module Wiring

Example SPI wiring for a Ra-02 style module connected to an ESP32 DevKitC.

| ESP32 pin | LoRa pin | Notes |
| --- | --- | --- |
| `3V3` | `VCC` | LoRa modules are generally 3.3V-only |
| `GND` | `GND` | Shared ground |
| `GPIO18` | `SCK` | SPI clock |
| `GPIO19` | `MISO` | SPI MISO |
| `GPIO23` | `MOSI` | SPI MOSI |
| `GPIO5` | `NSS` | Chip select |
| `GPIO14` | `RST` | Reset |
| `GPIO26` | `DIO0` | Interrupt pin |

## Diagram

```text
ESP32 DevKitC                Ra-02 / SX1276 class
-------------               --------------------
3V3       -----------------> VCC
GND       -----------------> GND
GPIO18    -----------------> SCK
GPIO19    <----------------- MISO
GPIO23    -----------------> MOSI
GPIO5     -----------------> NSS
GPIO14    -----------------> RST
GPIO26    <----------------- DIO0
```

## Bring-up notes

- Keep antenna attached before transmission tests.
- Match the module frequency to your local ISM band and board variant.
- Start with simulation mode before introducing radio troubleshooting.
