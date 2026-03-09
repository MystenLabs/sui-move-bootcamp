import { ENV } from "./env";

const main = () => {
  console.log("Hello, world!");
  console.log("This is the Sui network: ", ENV.SUI_NETWORK);
};

main();
