/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PACKAGE_ID: string;
  readonly VITE_FAUCET_ID: string;
  readonly VITE_ROBOT_PET_ID: string;
  readonly VITE_REGISTRY_ID: string;
  readonly VITE_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
