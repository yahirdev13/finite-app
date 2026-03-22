import { NextRequest, NextResponse } from "next/server";

import { renderToPng } from "@/lib/png";
import { WallpaperComponent } from "@/lib/render/wallpaper";
import { calculateAllMetrics } from "@/lib/metrics";
import { DEFAULT_CONFIG } from "@/lib/config";

import type { UserConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      config?: UserConfig;
      width?: number;
      height?: number;
    };

    const config = body.config
      ? { ...DEFAULT_CONFIG, ...body.config }
      : DEFAULT_CONFIG;
    const width = body.width || 1170;
    const height = body.height || 2532;

    const metrics = calculateAllMetrics(new Date(), config);

    const png = await renderToPng(
      WallpaperComponent({ metrics, config, width, height }),
      width,
      height
    );

    return new NextResponse(png.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate preview", details: message },
      { status: 500 }
    );
  }
}
