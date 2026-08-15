import { useEffect, useRef, useState } from "react";

/**
 * Lightweight pseudo-3D composition: layered UI panels + connected nodes.
 * CSS transforms only — no 3D library. Tilts with the pointer on fine pointers.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const onMove = (event: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: Math.max(-1, Math.min(1, px)), y: Math.max(-1, Math.min(1, py)) });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const rotateY = tilt.x * 10;
  const rotateX = -tilt.y * 7;

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto w-full max-w-lg select-none"
      style={{ perspective: "1600px" }}
    >
      <div className="ambient-glow pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />

      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute -right-2 top-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary shadow-soft sm:-right-6"
          style={{ transform: "translateZ(70px)" }}
        >
          Design
        </div>

        <div
          className="absolute -left-6 top-10 w-52 rounded-lg border border-border bg-card/95 p-4 shadow-soft backdrop-blur-sm sm:-left-10"
          style={{ transform: "translateZ(-70px)" }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Backend
          </p>
          <div className="mt-3 space-y-2">
            {["api/orders", "api/users", "api/events"].map((row, i) => (
              <div key={row} className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.7rem] text-foreground">{row}</span>
                <span
                  className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary"
                  style={{ animationDelay: `${i * 280}ms` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative ml-auto w-full max-w-md rounded-xl border border-border bg-card shadow-lift"
          style={{ transform: "translateZ(36px)" }}
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="ml-3 h-5 flex-1 rounded bg-muted" />
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            <div className="col-span-2 space-y-3">
              <div className="h-24 rounded-lg bg-linear-to-br from-primary to-[color-mix(in_oklab,var(--primary)_50%,#004d80)]" />
              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="h-8 w-28 rounded-md bg-ink" />
            </div>
            <div className="space-y-3">
              <div className="h-12 rounded-lg border border-border bg-surface" />
              <div className="h-12 rounded-lg border border-border bg-surface" />
              <div className="h-12 rounded-lg border border-border bg-surface" />
            </div>
          </div>
        </div>

        <div
          className="float-slow absolute -bottom-8 left-2 w-56 rounded-lg border border-border bg-card p-4 shadow-lift sm:-left-6"
          style={{ transform: "translateZ(100px)" }}
        >
          <div className="flex items-baseline justify-between">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Experience
            </p>
            <p className="font-display text-sm font-semibold text-primary">Live</p>
          </div>
          <div className="mt-3 flex h-12 items-end gap-1.5">
            {[35, 55, 45, 70, 60, 85, 100].map((h, i) => (
              <span
                key={i}
                className="bar-rise flex-1 rounded-sm bg-[color-mix(in_oklab,var(--primary)_40%,transparent)]"
                style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
              />
            ))}
          </div>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-primary/50"
          viewBox="0 0 400 320"
          fill="none"
        >
          <path
            className="dash-flow"
            d="M40 90 C 140 60, 240 140, 360 120"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      </div>
    </div>
  );
}
