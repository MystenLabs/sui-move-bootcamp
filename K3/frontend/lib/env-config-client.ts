import { z } from 'zod';

/**
 * Client-side environment configuration
 * These variables are exposed to the browser (prefixed with NEXT_PUBLIC_)
 */
const clientConfigSchema = z.object({
  NEXT_PUBLIC_SUI_NETWORK_NAME: z.enum(['mainnet', 'testnet', 'devnet']),
  NEXT_PUBLIC_PACKAGE_ADDRESS: z.string(),
  NEXT_PUBLIC_COUNTER_OBJECT_ID: z.string(),
  // Enoki zkLogin configuration
  NEXT_PUBLIC_ENOKI_API_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
});

const clientConfig = clientConfigSchema.safeParse({
  NEXT_PUBLIC_SUI_NETWORK_NAME: process.env.NEXT_PUBLIC_SUI_NETWORK_NAME,
  NEXT_PUBLIC_PACKAGE_ADDRESS: process.env.NEXT_PUBLIC_PACKAGE_ADDRESS,
  NEXT_PUBLIC_COUNTER_OBJECT_ID: process.env.NEXT_PUBLIC_COUNTER_OBJECT_ID,
  NEXT_PUBLIC_ENOKI_API_KEY: process.env.NEXT_PUBLIC_ENOKI_API_KEY,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
});

if (!clientConfig.success) {
  console.error('Invalid environment variables:', clientConfig.error.format());
  throw new Error('Invalid environment variables');
}

export default clientConfig.data;
