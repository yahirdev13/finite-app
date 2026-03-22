"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, type === "success" ? 3000 : 5000);
    return () => clearTimeout(timeout);
  }, [onDismiss, type]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in">
      <div
        className={`
          px-4 py-3 rounded-xl text-sm font-medium
          backdrop-blur-md border shadow-lg
          ${isSuccess
            ? "bg-accent/10 border-accent/20 text-accent shadow-accent/10"
            : "bg-danger/10 border-danger/20 text-danger shadow-danger/10"
          }
        `}
      >
        <div className="flex items-center gap-2">
          {isSuccess ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 8.5L6.5 11L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 5V8.5M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {message}
        </div>
      </div>
    </div>
  );
}
