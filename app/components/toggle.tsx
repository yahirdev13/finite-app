"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 group">
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm text-primary/90 group-hover:text-primary transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-muted leading-tight">
              {description}
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex shrink-0 items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus-ring"
        style={{
          width: 44,
          height: 24,
          backgroundColor: checked ? "#0066FF" : "#1A2540",
          boxShadow: checked ? "0 0 12px rgba(0, 102, 255, 0.3)" : "none",
        }}
      >
        <span
          className="inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out"
          style={{
            width: 18,
            height: 18,
            transform: checked ? "translateX(23px)" : "translateX(3px)",
          }}
        />
      </button>
    </div>
  );
}
