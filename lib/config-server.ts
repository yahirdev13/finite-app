import "server-only";
import { kv } from "@vercel/kv";

import { DEFAULT_CONFIG } from "@/lib/config";

import type { UserConfig } from "@/lib/config";

export async function getConfig(): Promise<UserConfig> {
  try {
    const config = await kv.get<UserConfig>("config:user");
    if (config) {
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch {
    // KV not configured — use defaults
  }
  return DEFAULT_CONFIG;
}
