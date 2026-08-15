import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  nav: {
    small: "text-[1.15rem] tracking-[-0.05em] sm:text-[1.25rem]",
    large: "text-[1.7rem] tracking-[-0.07em] sm:text-[1.85rem]",
  },
  inline: {
    small: "text-[0.92em] tracking-[-0.05em]",
    large: "text-[1.38em] tracking-[-0.07em]",
  },
  footer: {
    small: "text-[2.35rem] tracking-[0.08em] sm:text-[2.75rem]",
    large: "text-[3.5rem] tracking-[0.06em] sm:text-[4rem]",
  },
} as const;

export function Logo({
  className,
  size = "nav",
}: {
  className?: string;
  size?: keyof typeof sizeStyles;
  showWord?: boolean;
}) {
  const s = sizeStyles[size];
  return (
    <span
      aria-label="sySSwift"
      className={cn(
        "inline-flex items-baseline whitespace-nowrap normal-case text-primary",
        size === "footer" && "origin-left scale-x-[1.35]",
        className,
      )}
    >
      <span className={cn("font-logo font-normal leading-none", s.small)}>sy</span>
      <span className={cn("font-logo font-normal leading-none", s.large)}>SS</span>
      <span className={cn("font-logo font-normal leading-none", s.small)}>wift</span>
    </span>
  );
}

const BRAND_RE = /(sySSwift|Sysswift)/g;

export function BrandCopy({ text }: { text: string }): ReactNode {
  const parts = text.split(BRAND_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part === "sySSwift" || part === "Sysswift" ? <Logo key={i} size="inline" /> : part,
  );
}
