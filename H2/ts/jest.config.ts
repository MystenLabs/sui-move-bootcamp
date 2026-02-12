import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(ts)?$": [
      "ts-jest",
      {
        useESM: true,
        diagnostics: { ignoreCodes: ["TS151001"] },
      },
    ],
  },
  // setupFilesAfterEnv: ['./setup-jest.ts'],
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  testTimeout: 300000, // Set timeout to 300 seconds per test
};
export default config;
