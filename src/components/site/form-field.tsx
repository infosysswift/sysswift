import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  tone = "light",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={cn("block text-sm font-semibold", dark ? "text-white" : "text-foreground")}
      >
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden>
            *
          </span>
        ) : (
          <span className={cn("ml-2 text-xs font-medium", dark ? "text-white/50" : "text-muted-foreground")}>
            Optional
          </span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p
          id={`${id}-hint`}
          className={cn("text-xs leading-relaxed", dark ? "text-white/50" : "text-muted-foreground")}
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("text-xs font-medium", dark ? "text-red-300" : "text-destructive")}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldControlClass = cn(
  "flex w-full rounded-md border border-input bg-background px-3.5 text-base text-foreground shadow-soft transition-[border-color,box-shadow] placeholder:text-muted-foreground",
  "h-12 md:text-sm",
  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export const fieldTextareaClass = cn(fieldControlClass, "h-auto min-h-32 py-3");
