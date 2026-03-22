# ESP32 to PZEM-004T Wiring

Use this as a reference wiring plan for the physical extension. Simulation mode
does not require any of these connections.

## UART wiring

| ESP32 pin | PZEM-004T pin | Notes |
| --- | --- | --- |
| `5V` | `5V` | Power the meter interface board |
| `GND` | `GND` | Shared ground |
| `GPIO16` | `TX` | ESP32 RX line |
| `GPIO17` | `RX` | ESP32 TX line |

## Safety notes

- Keep mains wiring isolated from the microcontroller side.
- Use the split-core or isolated variants when teaching beginners.
- Never breadboard mains AC directly.

## Diagram

```text
ESP32 DevKitC                PZEM-004T
-------------               ----------
5V        -----------------> 5V
GND       -----------------> GND
GPIO16    <----------------- TX
GPIO17    -----------------> RX
```
