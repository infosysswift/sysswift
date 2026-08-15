import type { ReactNode } from "react";
import { Eyebrow } from "./ui-kit";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div className="ambient-glow pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="shell relative py-20 lg:py-24">
        <div className="hero-enter">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="hero-enter mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
