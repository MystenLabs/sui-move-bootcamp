/**
 * R11 — ESP32 + PZEM-004T + LoRa Uplink
 *
 * Reads AC power from a PZEM-004T meter and transmits each reading as a LoRa
 * packet. A gateway node (or a second ESP32 running a serial passthrough)
 * forwards the packets to the R11 bridge using the "lora" transport mode.
 *
 * LoRa packet JSON format (transmitted payload):
 *   {"meterId":"<ID>","watts":<W>,"totalKwhMilli":<mWh>,"timestampMs":<ms>}
 *
 * The receiving gateway wraps this in the LoRa envelope expected by the bridge:
 *   {"rssi":<dBm>,"snr":<dB>,"payload":{...inner...}}
 *
 * Wiring:
 *   PZEM-004T: see docs/wiring_esp32_pzem.md (UART2, GPIO16/17)
 *   LoRa Ra-02: see docs/wiring_esp32_lora.md (SPI, GPIO5/14/18/19/23/26)
 *
 * Libraries required (install via Arduino Library Manager):
 *   - PZEM004Tv30 by olehs
 *   - LoRa       by sandeep-mistry  (https://github.com/sandeepmistry/arduino-LoRa)
 *
 * Board: "ESP32 Dev Module"
 */

#include <Arduino.h>
#include <PZEM004Tv30.h>
#include <LoRa.h>
#include <SPI.h>

// ── Configuration ─────────────────────────────────────────────────────────────

static const char*    METER_ID           = "meter-lab-01";
static const uint32_t READ_INTERVAL_MS   = 60000UL;    // one reading per minute
static const long     LORA_FREQUENCY     = 868E6;      // 868 MHz EU; use 915E6 for US
static const int      LORA_TX_POWER      = 17;         // dBm — stay within local limit

// PZEM UART2
static const int PZEM_RX = 16;
static const int PZEM_TX = 17;

// LoRa SPI (Ra-02 / SX1276)
static const int LORA_SS  =  5;
static const int LORA_RST = 14;
static const int LORA_DIO =  26;

// ── Globals ───────────────────────────────────────────────────────────────────

PZEM004Tv30 pzem(Serial2, PZEM_RX, PZEM_TX);

uint32_t totalKwhMilli = 0;
uint32_t lastReadMs    = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────

bool initLoRa() {
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO);
  if (!LoRa.begin(LORA_FREQUENCY)) {
    Serial.println(F("# LoRa init failed — check wiring/frequency"));
    return false;
  }
  LoRa.setTxPower(LORA_TX_POWER);
  LoRa.enableCrc();
  Serial.println(F("# LoRa ready"));
  return true;
}

/**
 * Transmit a compact JSON payload over LoRa.
 * Keeps the packet small to stay within the LoRa duty-cycle limit.
 */
void transmitReading(uint32_t watts, uint32_t kwhMilli, uint32_t timestampMs) {
  LoRa.beginPacket();
  LoRa.print(F("{\"meterId\":\""));
  LoRa.print(METER_ID);
  LoRa.print(F("\",\"watts\":"));
  LoRa.print(watts);
  LoRa.print(F(",\"totalKwhMilli\":"));
  LoRa.print(kwhMilli);
  LoRa.print(F(",\"timestampMs\":"));
  LoRa.print(timestampMs);
  LoRa.print(F("}"));
  LoRa.endPacket();

  // Also echo to USB serial for local debug
  Serial.print(F("# tx watts="));
  Serial.print(watts);
  Serial.print(F(" kwhMilli="));
  Serial.println(kwhMilli);
}

// ── Arduino lifecycle ─────────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, PZEM_RX, PZEM_TX);

  Serial.println(F("# R11 ESP32+PZEM+LoRa energy monitor starting"));

  if (!initLoRa()) {
    Serial.println(F("# Halting — fix LoRa before continuing"));
    while (true) delay(1000);
  }
}

void loop() {
  uint32_t now = millis();
  if (now - lastReadMs < READ_INTERVAL_MS) {
    return;
  }
  lastReadMs = now;

  float power  = pzem.power();
  float energy = pzem.energy();

  if (isnan(power) || isnan(energy)) {
    Serial.println(F("# PZEM read error — check wiring"));
    return;
  }

  uint32_t kwhMilli = (uint32_t)(energy * 1000.0f);
  if (kwhMilli < totalKwhMilli) {
    Serial.println(F("# kWh register not advanced — skipping"));
    return;
  }
  totalKwhMilli = kwhMilli;

  transmitReading((uint32_t)power, totalKwhMilli, now);
}
