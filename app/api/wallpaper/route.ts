import { NextRequest, NextResponse } from "next/server";

import { renderToPng } from "@/lib/png";
import { WallpaperComponent } from "@/lib/render/wallpaper";
import { getConfig } from "@/lib/config-server";
import { calculateAllMetrics } from "@/lib/metrics";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get("w") || "1170", 10);
    const height = parseInt(searchParams.get("h") || "2532", 10);

    const config = await getConfig();
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
      { error: "Failed to generate wallpaper", details: message },
      { status: 500 }
    );
  }
}
