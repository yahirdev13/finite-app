"use client";

import { useState } from "react";

interface CollapsibleProps {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Collapsible({
  title,
  summary,
  defaultOpen = false,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-card border border-border/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-card-hover/50 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-semibold text-primary tracking-tight">
            {title}
          </span>
          {!open && summary && (
            <span className="text-[11px] text-muted bg-border/50 px-2 py-0.5 rounded">
              {summary}
            </span>
          )}
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-muted group-hover:text-secondary transition-all"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: open ? "2000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-border/30">
          {children}
        </div>
      </div>
    </div>
  );
}
