import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animate";

/**
 * Özel imleç: küçük kırmızı nokta + gecikmeli takip eden halka.
 * Bağlantı/düğme üzerine gelince halka büyür.
 * Dokunmatik cihazlarda hiç etkinleşmez.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest("a, button, [role='button'], input, textarea, [data-cursor]");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1.9, backgroundColor: "rgba(255,255,255,0.14)", duration: 0.3 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,255,255,0)", duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };
    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <>
      {/* mix-blend-difference: imleç hem açık hem koyu zeminde görünür kalır */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-95 h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ marginLeft: "-4px", marginTop: "-4px" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-95 h-9 w-9 rounded-full border border-white/70 opacity-0 mix-blend-difference"
        style={{ marginLeft: "-18px", marginTop: "-18px" }}
      />
    </>
  );
}
