import client from "prom-client";

// Create a new registry to register all metrics
export const register = new client.Registry();

// Enable collection of default system metrics
client.collectDefaultMetrics({ register });

// Define custom counters
export const totalRequests = new client.Counter({
  name: "total_requests",
  help: "Total number of mint requests",
});

export const successfulRequests = new client.Counter({
  name: "successful_requests",
  help: "Number of successful mints",
});

export const failedRequests = new client.Counter({
  name: "failed_requests",
  help: "Requests that failed due to any kind of internal error",
});

export const mintRequestDurationSeconds = new client.Histogram({
  name: "mint_request_duration_in_sec",
  help: "Duration of mint requests in seconds",
  buckets: [0.5, 1, 2, 5],
});

// Register all metrics
register.registerMetric(totalRequests);
register.registerMetric(successfulRequests);
register.registerMetric(failedRequests);
register.registerMetric(mintRequestDurationSeconds);
