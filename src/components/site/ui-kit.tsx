import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-[background-color,color,border-color,transform,box-shadow] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)] hover:shadow-lift",
        outline:
          "border border-border-strong bg-background text-foreground hover:border-primary hover:text-primary",
        ink: "bg-ink text-ink-foreground hover:bg-[color-mix(in_oklab,var(--ink)_85%,white)]",
        quiet: "text-foreground hover:text-primary",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ActionProps = VariantProps<typeof actionVariants> & { className?: string };

export function ActionLink({
  to,
  hash,
  children,
  variant,
  size,
  className,
}: ActionProps & { to: string; hash?: string; children: ReactNode }) {
  return (
    <Link to={to} hash={hash} className={cn(actionVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant,
  size,
  className,
  ...props
}: ActionProps & ComponentProps<"button">) {
  return (
    <button {...props} className={cn(actionVariants({ variant, size }), className)}>
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span aria-hidden className="h-px w-6 bg-primary/60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
  as: Heading = "h2",
}: {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading id={id} className="mt-4 text-3xl font-semibold sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.8em] text-muted-foreground">
      {children}
    </span>
  );
}
