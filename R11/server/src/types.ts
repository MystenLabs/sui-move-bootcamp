export type EnergyReading = {
  meterId: string;
  watts: number;
  totalKwhMilli: number;
  timestampMs: number;
};

export type LoRaPacket = {
  rssi: number;
  snr: number;
  payload: EnergyReading;
};
