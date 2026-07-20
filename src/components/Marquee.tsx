import type { ReactNode } from "react";

/**
 * Sonsuz kayan bant. İçerik iki kez basılır, CSS animasyonu %50 kaydırır —
 * kesintisiz döngü. `duration` saniye cinsinden hız.
 */
export function Marquee({
  children,
  duration = 32,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
