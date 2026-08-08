/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STATICFORMS_KEY?: string;
  readonly GIST_STATS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
