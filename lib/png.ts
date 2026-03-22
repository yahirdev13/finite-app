// Satori + resvg render pipeline — JSX → SVG → PNG

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { join } from "path";

const fontData = readFileSync(
  join(process.cwd(), "public/fonts/Inter-Regular.ttf")
);

export async function renderToPng(
  element: React.ReactElement,
  width: number,
  height: number
): Promise<Buffer> {
  const svg = await satori(element, {
    width,
    height,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });

  return Buffer.from(resvg.render().asPng());
}
