/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PACKAGE_ID: string;
  readonly VITE_METER_OBJECT_ID: string;
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
