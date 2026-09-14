import { useEffect, useState } from "react";
import { weddingTimestamp } from "@/lib/album";

function parts(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: clamped <= 0,
  };
}

export function Countdown({ isoDate }: { isoDate: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-hidden="true">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <TimeCell key={label} value="—" label={label} />
        ))}
      </div>
    );
  }

  const remain = parts(weddingTimestamp(isoDate) - now);

  if (remain.done) {
    return (
      <p className="font-display text-2xl text-wine">
        The day is here. We are married.
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-4"
      aria-label="Countdown to the wedding"
    >
      <TimeCell value={remain.days} label="Days" />
      <TimeCell value={remain.hours} label="Hours" />
      <TimeCell value={remain.minutes} label="Minutes" />
      <TimeCell value={remain.seconds} label="Seconds" />
    </div>
  );
}

function TimeCell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-lg bg-cream px-2 py-3 text-center shadow-soft sm:px-3 sm:py-4">
      <div className="font-display text-3xl tabular-nums text-wine sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs tracking-label text-muted uppercase sm:text-xs">
        {label}
      </div>
    </div>
  );
}
