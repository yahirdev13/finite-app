import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

import { getConfig } from "@/lib/config-server";
import type { UserConfig } from "@/lib/config";

function checkAdminKey(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return true;
  const provided = request.headers.get("x-admin-key");
  return provided === adminKey;
}

interface ValidationError {
  field: string;
  message: string;
}

const VALID_METRIC_KEYS = [
  "year_progress",
  "year_percentage",
  "days_remaining",
  "day_of_year",
  "life_day",
  "birthday_countdown",
] as const;

function validateConfig(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.length < 1 || data.name.length > 30) {
      errors.push({ field: "name", message: "name must be 1-30 characters" });
    }
  }

  if (data.date_of_birth !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof data.date_of_birth !== "string" || !dateRegex.test(data.date_of_birth)) {
      errors.push({ field: "date_of_birth", message: "date_of_birth must be YYYY-MM-DD" });
    } else {
      const dob = new Date(data.date_of_birth);
      if (isNaN(dob.getTime()) || dob >= new Date()) {
        errors.push({ field: "date_of_birth", message: "date_of_birth must be a valid past date" });
      }
    }
  }

  if (data.life_expectancy !== undefined) {
    if (typeof data.life_expectancy !== "number" || data.life_expectancy < 50 || data.life_expectancy > 120) {
      errors.push({ field: "life_expectancy", message: "life_expectancy must be 50-120" });
    }
  }

  if (data.theme !== undefined) {
    if (data.theme !== "dark" && data.theme !== "light") {
      errors.push({ field: "theme", message: "theme must be 'dark' or 'light'" });
    }
  }

  if (data.metrics !== undefined) {
    if (typeof data.metrics !== "object" || data.metrics === null) {
      errors.push({ field: "metrics", message: "metrics must be an object" });
    } else {
      const metrics = data.metrics as Record<string, unknown>;
      for (const key of Object.keys(metrics)) {
        if (!(VALID_METRIC_KEYS as readonly string[]).includes(key)) {
          continue; // Silently ignore unknown metric keys
        }
        if (typeof metrics[key] !== "boolean") {
          errors.push({ field: `metrics.${key}`, message: `metrics.${key} must be a boolean` });
        }
      }
    }
  }

  return errors;
}

function sanitizeMetrics(metrics: Record<string, unknown>): Partial<UserConfig["metrics"]> {
  const result: Record<string, boolean> = {};
  for (const key of VALID_METRIC_KEYS) {
    if (key in metrics && typeof metrics[key] === "boolean") {
      result[key] = metrics[key] as boolean;
    }
  }
  return result as Partial<UserConfig["metrics"]>;
}

export async function GET(request: NextRequest) {
  if (!checkAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await getConfig();
  return NextResponse.json({ config });
}

export async function POST(request: NextRequest) {
  if (!checkAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const errors = validateConfig(body);

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Invalid configuration", details: errors },
        { status: 400 }
      );
    }

    const current = await getConfig();

    // Build merged config, only accepting known fields
    const merged: UserConfig = {
      ...current,
      ...(body.name !== undefined && { name: body.name as string }),
      ...(body.date_of_birth !== undefined && { date_of_birth: body.date_of_birth as string }),
      ...(body.life_expectancy !== undefined && { life_expectancy: body.life_expectancy as number }),
      ...(body.theme !== undefined && { theme: body.theme as "dark" | "light" }),
      metrics: {
        ...current.metrics,
        ...(body.metrics ? sanitizeMetrics(body.metrics as Record<string, unknown>) : {}),
      },
    };

    try {
      await kv.set("config:user", merged);
    } catch {
      return NextResponse.json(
        { error: "KV not configured", config: merged },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, config: merged });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
