import { useEffect, useRef } from "react";
import { gsap, lenisRef } from "@/lib/animate";
import { company } from "@/data/company";

/**
 * Açılış perdesi: 00 → 100 sayaç, ardından perde yukarı kalkar.
 * Oturum başına yalnızca bir kez gösterilir (HomePage yönetir).
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    lenisRef.current?.stop();
    const counter = { v: 0 };
    const num = el.querySelector("[data-pre-num]");

    const tl = gsap.timeline({
      onComplete: () => {
        lenisRef.current?.start();
        onDone();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .to("[data-pre-fade]", {
        yPercent: -30,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      })
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.05");

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-100 flex flex-col justify-between bg-ink px-6 pt-8 pb-6 md:px-12 md:pb-10"
    >
      {/* Üst: logo */}
      <div data-pre-fade className="flex items-center justify-between">
        <img src="/logo-white.png" alt="Almila Grup" className="h-8 w-auto md:h-9" />
        <p className="hidden text-xs uppercase tracking-[0.3em] text-muted md:block">
          Araç Kiralama · Taşımacılık
        </p>
      </div>

      {/* Alt: slogan + dev sayaç */}
      <div className="flex items-end justify-between gap-6">
        <p data-pre-fade className="max-w-55 pb-3 text-sm leading-relaxed text-muted md:max-w-none md:text-base">
          {company.slogan}
        </p>
        <div
          data-pre-fade
          data-pre-num
          className="font-display text-[26vw] leading-[0.8] font-extrabold tracking-tighter text-outline md:text-[18vw]"
        >
          000
        </div>
      </div>
    </div>
  );
}
