"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import { Toggle } from "@/app/components/toggle";
import { Collapsible } from "@/app/components/collapsible";
import { SaveBar } from "@/app/components/save-bar";
import { Toast } from "@/app/components/toast";
import { PreviewPanel } from "@/app/components/preview-panel";

import { DEFAULT_CONFIG } from "@/lib/config";
import type { UserConfig } from "@/lib/config";

interface ToastState {
  message: string;
  type: "success" | "error";
}

const METRIC_LABELS: Record<string, { name: string; description: string }> = {
  year_progress: { name: "Progreso del año", description: "Grid de 365 puntos, 15 por fila (quincena)" },
  year_percentage: { name: "Porcentaje del año", description: "Número grande con % del año transcurrido" },
  days_remaining: { name: "Días restantes", description: "Días que faltan para terminar el año" },
  day_of_year: { name: "Día del año", description: "Fracción día/total (ej: 81/365)" },
  life_day: { name: "Día de tu vida", description: "Número de días desde que naciste" },
  birthday_countdown: { name: "Countdown a cumpleaños", description: "Barra de progreso hasta tu próximo cumpleaños" },
};

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function AdminPage() {
  const [savedConfig, setSavedConfig] = useState<UserConfig>(DEFAULT_CONFIG);
  const [draft, setDraft] = useState<UserConfig>(deepClone(DEFAULT_CONFIG));
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [loaded, setLoaded] = useState(false);

  const adminKey = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("key") || "";
  }, []);

  const isDirty = useMemo(
    () => !deepEqual(savedConfig, draft),
    [savedConfig, draft]
  );

  const activeMetricCount = useMemo(
    () => Object.values(draft.metrics).filter(Boolean).length,
    [draft.metrics]
  );

  useEffect(() => {
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (adminKey) headers["x-admin-key"] = adminKey;
        const res = await fetch("/api/config", { headers });
        if (res.ok) {
          const data = await res.json();
          setSavedConfig(data.config);
          setDraft(deepClone(data.config));
        }
      } catch {
        // Use defaults
      }
      setLoaded(true);
    }
    load();
  }, [adminKey]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (adminKey) headers["x-admin-key"] = adminKey;
      const res = await fetch("/api/config", {
        method: "POST",
        headers,
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedConfig(data.config);
        setDraft(deepClone(data.config));
        setToast({ message: "Configuración guardada", type: "success" });
      } else {
        setToast({
          message: data.error || "Error al guardar",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Error de conexión", type: "error" });
    }
    setIsSaving(false);
  }, [draft, adminKey]);

  const handleDiscard = useCallback(() => {
    setDraft(deepClone(savedConfig));
  }, [savedConfig]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (isDirty && !isSaving) handleSave();
      }
      if (e.key === "Escape" && isDirty) handleDiscard();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDirty, isSaving, handleSave, handleDiscard]);

  const updateDraft = useCallback(
    (updater: (prev: UserConfig) => UserConfig) => {
      setDraft((prev) => updater(prev));
    },
    []
  );

  if (!loaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
        <div className="text-muted text-sm">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="border-b border-border/40 sticky top-0 z-40 bg-page/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-bold text-primary tracking-widest">
              FINITE
            </span>
            <span className="text-[11px] text-muted font-medium bg-border/60 px-2 py-0.5 rounded">
              config
            </span>
          </div>
          {isDirty && (
            <span className="text-[11px] text-accent font-medium">
              Sin guardar
            </span>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* Config panel */}
        <div className="flex-1 lg:max-w-[58%] flex flex-col gap-5">
          {/* Personal data */}
          <Collapsible title="Datos personales" defaultOpen>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-muted uppercase tracking-widest">
                  Nombre
                </span>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) =>
                    updateDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  maxLength={30}
                  placeholder="Tu nombre"
                  className="bg-input border border-border/60 rounded-lg px-4 py-2.5 text-sm text-primary placeholder:text-muted/40 focus:outline-none focus-ring transition-all"
                />
              </label>
              <DateOfBirthInput
                value={draft.date_of_birth}
                onChange={(val) =>
                  updateDraft((d) => ({ ...d, date_of_birth: val }))
                }
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-medium text-muted uppercase tracking-widest">
                    Expectativa de vida
                  </span>
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    {draft.life_expectancy} años
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={120}
                  value={draft.life_expectancy}
                  onChange={(e) =>
                    updateDraft((d) => ({
                      ...d,
                      life_expectancy: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </Collapsible>

          {/* Metrics toggles */}
          <Collapsible
            title="Métricas"
            summary={`${activeMetricCount}/${Object.keys(METRIC_LABELS).length}`}
            defaultOpen
          >
            <div className="flex flex-col divide-y divide-border/30">
              {Object.entries(METRIC_LABELS).map(([key, meta]) => (
                <Toggle
                  key={key}
                  label={meta.name}
                  description={meta.description}
                  checked={draft.metrics[key as keyof typeof draft.metrics]}
                  onChange={(val) =>
                    updateDraft((d) => ({
                      ...d,
                      metrics: { ...d.metrics, [key]: val },
                    }))
                  }
                />
              ))}
            </div>
          </Collapsible>

          {/* Appearance */}
          <Collapsible title="Apariencia">
            <Toggle
              label="Tema oscuro"
              description={
                draft.theme === "dark"
                  ? "Orbit Navy"
                  : "Tema claro"
              }
              checked={draft.theme === "dark"}
              onChange={(val) =>
                updateDraft((d) => ({
                  ...d,
                  theme: val ? "dark" : "light",
                }))
              }
            />
          </Collapsible>
        </div>

        {/* Preview panel */}
        <div className="lg:w-[42%] lg:sticky lg:top-20 lg:self-start">
          <PreviewPanel config={draft} adminKey={adminKey} />
        </div>
      </div>

      <SaveBar
        visible={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}

function DateOfBirthInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  // value is YYYY-MM-DD internally, display as dd/mm/aaaa
  const toDisplay = (iso: string): string => {
    const parts = iso.split("-");
    if (parts.length !== 3) return "";
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const toIso = (display: string): string | null => {
    const clean = display.replace(/[^0-9/]/g, "");
    const parts = clean.split("/");
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts;
    if (!dd || !mm || !yyyy || yyyy.length !== 4) return null;
    const d = Number(dd), m = Number(mm), y = Number(yyyy);
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) return null;
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime()) || date >= new Date()) return null;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  };

  const [text, setText] = useState(toDisplay(value));
  const [error, setError] = useState(false);

  const handleChange = (raw: string) => {
    // Auto-insert slashes
    let cleaned = raw.replace(/[^0-9/]/g, "");
    // Auto-add slash after dd and mm
    if (cleaned.length === 2 && !cleaned.includes("/")) cleaned += "/";
    if (cleaned.length === 5 && cleaned.split("/").length === 2) cleaned += "/";
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);

    setText(cleaned);

    const iso = toIso(cleaned);
    if (iso) {
      onChange(iso);
      setError(false);
    } else {
      setError(cleaned.length === 10);
    }
  };

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-muted uppercase tracking-widest">
        Fecha de nacimiento
      </span>
      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="dd/mm/aaaa"
        maxLength={10}
        className={`bg-input border rounded-lg px-4 py-2.5 text-sm text-primary placeholder:text-muted/40 focus:outline-none focus-ring transition-all tabular-nums ${error ? "border-danger/60" : "border-border/60"}`}
      />
      {error && (
        <span className="text-[10px] text-danger">Fecha inválida</span>
      )}
    </label>
  );
}
