"use client";

interface SaveBarProps {
  visible: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export function SaveBar({ visible, isSaving, onSave, onDiscard }: SaveBarProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-card/95 backdrop-blur-md border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-sm text-secondary">Cambios sin guardar</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onDiscard}
              disabled={isSaving}
              className="px-4 py-2 text-sm rounded-lg text-muted hover:text-primary border border-border/50 hover:border-secondary/40 transition-all disabled:opacity-40"
            >
              Descartar
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="px-5 py-2 text-sm rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-all disabled:opacity-40"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
