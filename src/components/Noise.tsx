/**
 * Tüm sayfanın üzerine çok hafif film greni serer — kod ile üretilmiş doku,
 * görsel dosya kullanılmaz (SVG feTurbulence data-URI).
 */
const noiseUri =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export function Noise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-90 opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: noiseUri }}
    />
  );
}
