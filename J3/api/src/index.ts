import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { mintHero } from "./helpers/mintHero";
import {
  register,
  failedRequests,
  successfulRequests,
  totalRequests,
  mintRequestDurationSeconds,
} from "./metrics";
import { logger } from "./logger";
import { formatAddress } from "@mysten/sui/utils";

dotenv.config();
const app = express();
app.use(express.json());

// GET / endpoint for checking if the api is running
app.get("/", (req: Request, res: Response) => {
  logger.info("Received a request for the root endpoint");
  res.status(200).send("Hello, world!");
});

// metrics endpoint for Prometheus
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// POST /mint endpoint for minting a Hero NFT
app.post("/mint", async (req: Request, res: Response) => {
  logger.info(`Received a request for: ${formatAddress(req.body.address)}`);
  totalRequests.inc();
  const startTime = process.hrtime();

  try {
    const txDigest = await mintHero({ recipient: req.body.address });
    successfulRequests.inc();
    const diff = process.hrtime(startTime);
    const durationInSeconds = diff[0] + diff[1] / 1e9;
    mintRequestDurationSeconds.observe(durationInSeconds);
    res.status(200).send({
      message: "Minted Successfully!",
      txDigest,
    });
  } catch (err) {
    failedRequests.inc();
    logger.error(
      `Error for address ${req.body.address}: ${(err as Error).message}`
    );
    res.status(500).send({
      message: "Error minting Hero NFT",
      error: (err as Error).message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
