import { z } from "zod";

const envSchema = z.object({
  VITE_NETWORK: z.string().trim().min(1),
  VITE_SUI_GRPC_URL: z
    .string()
    .trim()
    .url()
    .default("https://fullnode.devnet.sui.io:443"),
  VITE_SALT: z.string().trim().min(1),
  VITE_EPHEMERAL_KEY_DURATION_EPOCHS: z.coerce.number().int().positive(),
  VITE_OAUTH_PROVIDER_NAME: z.string().trim().min(1),
  VITE_OAUTH_CLIENT_ID: z.string().trim().min(1),
});

const env = envSchema.parse(import.meta.env);

export const CONFIG = {
  app: {
    network: env.VITE_NETWORK,
    grpcUrl: env.VITE_SUI_GRPC_URL,
    salt: env.VITE_SALT,
    ephemeralKeyDuration: env.VITE_EPHEMERAL_KEY_DURATION_EPOCHS,
  },
  oauth: {
    providerName: env.VITE_OAUTH_PROVIDER_NAME,
    clientId: env.VITE_OAUTH_CLIENT_ID,
    url: "", // set by the app depending on provider
  },
} as const;

export type Config = typeof CONFIG;

