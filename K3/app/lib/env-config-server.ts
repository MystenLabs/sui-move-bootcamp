import { z } from 'zod';

/**
 * Server-side environment configuration
 * These variables are NOT exposed to the browser
 * Only use in Server Actions or API routes
 */
const serverConfigSchema = z.object({
  ENOKI_PRIVATE_KEY: z.string(),
});

const serverConfig = serverConfigSchema.safeParse({
  ENOKI_PRIVATE_KEY: process.env.ENOKI_PRIVATE_KEY,
});

if (!serverConfig.success) {
  console.error('Invalid environment variables:', serverConfig.error.format());
  throw new Error('Invalid environment variables');
}

export default serverConfig.data;
