"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import type { UserConfig } from "@/lib/config";

interface DevicePreset {
  name: string;
  width: number;
  height: number;
}

const DEVICES: DevicePreset[] = [
  { name: "iPhone 15 Pro Max", width: 1290, height: 2796 },
  { name: "iPhone 15 Pro", width: 1179, height: 2556 },
  { name: "iPhone 14/15", width: 1170, height: 2532 },
  { name: "iPhone SE", width: 750, height: 1334 },
];

interface PreviewPanelProps {
  config: UserConfig;
  adminKey: string;
}

export function PreviewPanel({ config, adminKey }: PreviewPanelProps) {
  const [deviceIndex, setDeviceIndex] = useState(2);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const device = DEVICES[deviceIndex];

  const generatePreview = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (adminKey) headers["x-admin-key"] = adminKey;

      const res = await fetch("/api/wallpaper/preview", {
        method: "POST",
        headers,
        body: JSON.stringify({
          config,
          width: device.width,
          height: device.height,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [config, device, adminKey]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generatePreview, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [generatePreview]);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (!previewUrl) return;
    const date = new Date().toISOString().split("T")[0];
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `finite-wallpaper-${date}.png`;
    a.click();
  };

  return (
    <div className="rounded-xl bg-card border border-border/40 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-primary tracking-tight">
          Preview
        </span>
        {loading && (
          <span className="text-[11px] text-accent animate-pulse">
            Generando...
          </span>
        )}
      </div>

      <select
        value={deviceIndex}
        onChange={(e) => setDeviceIndex(Number(e.target.value))}
        className="w-full bg-input border border-border/50 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus-ring cursor-pointer"
      >
        {DEVICES.map((d, i) => (
          <option key={d.name} value={i}>
            {d.name} ({d.width}&times;{d.height})
          </option>
        ))}
      </select>

      {/* Phone mockup using SVG frame */}
      <div className="flex justify-center py-2">
        <div className="relative" style={{ width: "280px" }}>
          {/* SVG mockup frame */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockups/iPhone14.svg"
            alt="iPhone frame"
            className="w-full h-auto relative z-10 pointer-events-none"
          />

          {/* Wallpaper image inside the frame */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: "2.8%",
              left: "5.8%",
              right: "5.8%",
              bottom: "2.8%",
              borderRadius: "2rem",
            }}
          >
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Wallpaper preview"
                className="w-full h-full object-cover"
                style={{
                  opacity: loading ? 0.4 : 1,
                  transition: "opacity 300ms ease",
                }}
              />
            )}

            {!previewUrl && loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0A1024]">
                <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#0A1024]">
                <div className="text-[10px] text-danger text-center">
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!previewUrl}
        className="w-full px-4 py-2 text-sm rounded-lg border border-border/50 text-muted hover:text-primary hover:border-secondary/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Descargar PNG
      </button>
    </div>
  );
}
