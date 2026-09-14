import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gold/45" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-gold/45" />
    </div>
  );
}

export function Monogram({
  bride,
  groom,
  className,
}: {
  bride: string;
  groom: string;
  className?: string;
}) {
  const a = (bride.trim()[0] ?? "A").toUpperCase();
  const b = (groom.trim()[0] ?? "A").toUpperCase();
  return (
    <div
      className={cn(
        "font-display text-lg tracking-mono text-gold uppercase",
        className,
      )}
      aria-hidden="true"
    >
      {a}
      <span className="mx-1.5 font-display italic tracking-normal text-gold-soft lowercase">
        and
      </span>
      {b}
    </div>
  );
}

export function KasavuFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gold/35 bg-cream p-1.5 shadow-soft",
        className,
      )}
    >
      <div className="overflow-hidden rounded-lg">{children}</div>
    </div>
  );
}
