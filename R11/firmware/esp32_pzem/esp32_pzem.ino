/**
 * R11 — ESP32 + PZEM-004T Energy Monitor
 *
 * Reads AC power data from a PZEM-004T meter over UART2 and outputs one JSON
 * line per interval on Serial (USB), matching the format expected by the R11
 * TypeScript bridge server.
 *
 * Output format (one line per interval):
 *   {"meterId":"<METER_ID>","watts":<W>,"totalKwhMilli":<mWh>,"timestampMs":<ms>}
 *
 * Wiring (see docs/wiring_esp32_pzem.md):
 *   ESP32 GPIO16 (RX2) ← PZEM-004T TX
 *   ESP32 GPIO17 (TX2) → PZEM-004T RX
 *   ESP32 5V           → PZEM-004T 5V
 *   ESP32 GND          → PZEM-004T GND
 *
 * Libraries required (install via Arduino Library Manager):
 *   - PZEM004Tv30 by olehs  (https://github.com/olehs/PZEM004Tv30)
 *
 * Board: "ESP32 Dev Module" (esp32 by Espressif, board manager URL:
 *   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json)
 */

#include <Arduino.h>
#include <PZEM004Tv30.h>

// ── Configuration ────────────────────────────────────────────────────────────

static const char* METER_ID        = "meter-lab-01";  // change to your meter name
static const uint32_t READ_INTERVAL_MS = 60000UL;      // one reading per minute

// UART2 pins connected to PZEM-004T
static const int PZEM_RX_PIN = 16;
static const int PZEM_TX_PIN = 17;

// ── Globals ───────────────────────────────────────────────────────────────────

PZEM004Tv30 pzem(Serial2, PZEM_RX_PIN, PZEM_TX_PIN);

uint32_t totalKwhMilli = 0;  // accumulated milli-kWh reported to bridge
uint32_t lastReadMs    = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Emit one JSON reading line on the USB serial port.
 * The R11 bridge server reads these lines from stdin.
 */
void emitReading(uint32_t watts, uint32_t kwhMilli, uint32_t timestampMs) {
  Serial.print(F("{\"meterId\":\""));
  Serial.print(METER_ID);
  Serial.print(F("\",\"watts\":"));
  Serial.print(watts);
  Serial.print(F(",\"totalKwhMilli\":"));
  Serial.print(kwhMilli);
  Serial.print(F(",\"timestampMs\":"));
  Serial.print(timestampMs);
  Serial.println(F("}"));
}

// ── Arduino lifecycle ─────────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, PZEM_RX_PIN, PZEM_TX_PIN);

  Serial.println(F("# R11 ESP32+PZEM energy monitor starting"));
  Serial.print(F("# Meter ID: "));
  Serial.println(METER_ID);
  Serial.print(F("# Read interval: "));
  Serial.print(READ_INTERVAL_MS / 1000);
  Serial.println(F(" s"));
}

void loop() {
  uint32_t now = millis();
  if (now - lastReadMs < READ_INTERVAL_MS) {
    return;
  }
  lastReadMs = now;

  float voltage  = pzem.voltage();
  float current  = pzem.current();
  float power    = pzem.power();    // Watts
  float energy   = pzem.energy();   // kWh (cumulative register on PZEM)
  float freq     = pzem.frequency();
  float pf       = pzem.pf();

  // pzem returns NaN when the meter is not responding
  if (isnan(power) || isnan(energy)) {
    Serial.println(F("# PZEM read error — check wiring"));
    return;
  }

  // Convert PZEM cumulative kWh to milli-kWh, clamped to uint32
  uint32_t kwhMilli = (uint32_t)(energy * 1000.0f);

  // Monotonicity guard: only update if PZEM register advanced
  if (kwhMilli < totalKwhMilli) {
    Serial.println(F("# kWh register not advanced — skipping"));
    return;
  }
  totalKwhMilli = kwhMilli;

  emitReading((uint32_t)power, totalKwhMilli, now);

  // Informational diagnostics (prefixed with # so the bridge ignores them)
  Serial.print(F("# V="));  Serial.print(voltage, 1);
  Serial.print(F(" A="));   Serial.print(current, 2);
  Serial.print(F(" Hz="));  Serial.print(freq, 1);
  Serial.print(F(" PF="));  Serial.println(pf, 2);
}
