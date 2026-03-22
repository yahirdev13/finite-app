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

function validateConfig(data: Partial<UserConfig>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.length < 1 || data.name.length > 30) {
      errors.push({ field: "name", message: "name must be 1-30 characters" });
    }
  }

  if (data.date_of_birth !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.date_of_birth)) {
      errors.push({ field: "date_of_birth", message: "date_of_birth must be YYYY-MM-DD" });
    } else {
      const dob = new Date(data.date_of_birth);
      if (isNaN(dob.getTime()) || dob >= new Date()) {
        errors.push({ field: "date_of_birth", message: "date_of_birth must be a valid past date" });
      }
    }
  }

  if (data.theme !== undefined) {
    if (data.theme !== "dark" && data.theme !== "light") {
      errors.push({ field: "theme", message: "theme must be 'dark' or 'light'" });
    }
  }

  if (data.countdowns !== undefined) {
    if (!Array.isArray(data.countdowns)) {
      errors.push({ field: "countdowns", message: "countdowns must be an array" });
    } else {
      if (data.countdowns.length > 10) {
        errors.push({ field: "countdowns", message: "max 10 countdowns allowed" });
      }
      for (let i = 0; i < data.countdowns.length; i++) {
        const c = data.countdowns[i];
        if (!c.label || c.label.length < 1 || c.label.length > 40) {
          errors.push({ field: `countdowns[${i}].label`, message: "label must be 1-40 characters" });
        }
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!c.date || !dateRegex.test(c.date)) {
          errors.push({ field: `countdowns[${i}].date`, message: "date must be YYYY-MM-DD" });
        }
        if (c.emoji !== undefined && c.emoji.length > 2) {
          errors.push({ field: `countdowns[${i}].emoji`, message: "emoji must be max 2 characters" });
        }
      }
    }
  }

  if (data.goals !== undefined) {
    const g = data.goals;
    if (g.books_year !== undefined) {
      if (g.books_year.current < 0 || g.books_year.current > 999) {
        errors.push({ field: "goals.books_year.current", message: "must be 0-999" });
      }
      if (g.books_year.target < 1 || g.books_year.target > 999) {
        errors.push({ field: "goals.books_year.target", message: "must be 1-999" });
      }
    }
    if (g.projects_year !== undefined) {
      if (g.projects_year.current < 0 || g.projects_year.current > 999) {
        errors.push({ field: "goals.projects_year.current", message: "must be 0-999" });
      }
      if (g.projects_year.target < 1 || g.projects_year.target > 999) {
        errors.push({ field: "goals.projects_year.target", message: "must be 1-999" });
      }
    }
    if (g.savings_percent !== undefined) {
      if (g.savings_percent < 0 || g.savings_percent > 100) {
        errors.push({ field: "goals.savings_percent", message: "must be 0-100" });
      }
    }
  }

  return errors;
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
    const body = await request.json() as Partial<UserConfig>;
    const errors = validateConfig(body);

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Invalid configuration", details: errors },
        { status: 400 }
      );
    }

    const current = await getConfig();
    const merged: UserConfig = {
      ...current,
      ...body,
      metrics: { ...current.metrics, ...(body.metrics || {}) },
      goals: {
        ...current.goals,
        ...(body.goals || {}),
        books_year: { ...current.goals.books_year, ...(body.goals?.books_year || {}) },
        projects_year: { ...current.goals.projects_year, ...(body.goals?.projects_year || {}) },
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

    return NextResponse.json({ config: merged });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
