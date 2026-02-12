## Sui & Move Bootcamp

This is a simple Node project with Typescript, that:

- reads and validates the .env variables using [dotenv](https://www.npmjs.com/package/dotenv), [env-cmd](https://www.npmjs.com/package/env-cmd) and [zod](https://zod.dev/)
- runs tests with [Jest](https://jestjs.io/)
- communicates with the Sui blockchain using [@mysten/sui](https://www.npmjs.com/package/@mysten/sui)

### Prerequisites

Ensure you have installed locally:

- [node + npm](https://nodejs.org/en)
- [typescript](https://www.npmjs.com/package/typescript)

### Quickstart

1. Create a `.env` file in the root of the node project, following the structure of the `.env.example`
2. Install the required npm dependencies with `npm i`
3. Validate your .env with `npm run dev`
4. Run your tests with `npm run test` / `npm run test:watch`

### Project Structure
```bash
ptbs/
├── src/
│ ├── tests/ # Jest test cases, run with `npm run test`
│ │ ├── *.test.ts # any test case should have a .test.ts suffix
│ ├── env.ts # Reads & validates .env variables
│ ├── index.ts # Entry point, run with `npm run dev`
├── .env # Environment variables
├── .env.example # Example env file
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── jest.config.ts # Jest configuration
├── README.md # Project documentation
```