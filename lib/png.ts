import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { join } from "path";

import type { ReactElement } from "react";

const fontData = readFileSync(
  join(process.cwd(), "public/fonts/Inter-Regular.ttf")
);

export async function renderToPng(
  element: ReactElement,
  width: number,
  height: number
): Promise<Uint8Array> {
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

  return new Uint8Array(resvg.render().asPng());
}
