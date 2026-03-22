import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FINITE — Preview</title>
  <style>
    body {
      margin: 0;
      background: #09090B;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    h1 {
      color: #B4FF00;
      font-size: 18px;
      font-weight: 400;
    }
    img {
      max-height: 90vh;
      width: auto;
      border-radius: 24px;
      border: 2px solid #1A2600;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>FINITE Preview</h1>
    <img src="/api/wallpaper?w=1170&h=2532" alt="Wallpaper preview" />
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
