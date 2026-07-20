import { useEffect, useRef } from "react";
import { gsap, lenisRef } from "@/lib/animate";
import { company } from "@/data/company";

/**
 * Açılış perdesi: serif marka yazısı harf harf belirir, ince çizgi dolarken
 * sayaç ilerler; ardından perde yukarı kalkar.
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

    tl.fromTo(
      "[data-pre-letter]",
      { yPercent: 110 },
      { yPercent: 0, duration: 0.9, stagger: 0.05, ease: "power4.out" }
    )
      .fromTo(
        "[data-pre-sub]",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        "[data-pre-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate() {
            counter.v = this.progress() * 100;
            if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        "-=0.35"
      )
      .to("[data-pre-fade]", {
        opacity: 0,
        y: -16,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-porcelain"
    >
      <div data-pre-fade className="flex w-full max-w-xl flex-col items-center px-8">
        <h1
          aria-label="Almila Grup"
          className="flex overflow-hidden font-display text-5xl font-medium tracking-tight text-ink md:text-7xl"
        >
          {"Almila".split("").map((ch, i) => (
            <span key={i} data-pre-letter aria-hidden className="inline-block">
              {ch}
            </span>
          ))}
          <span className="inline-block w-3 md:w-4" />
          {"Grup".split("").map((ch, i) => (
            <span key={`g${i}`} data-pre-letter aria-hidden className="inline-block italic text-accent">
              {ch}
            </span>
          ))}
        </h1>

        <p
          data-pre-sub
          className="mt-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-graphite opacity-0 md:text-xs"
        >
          {company.slogan}
        </p>

        <div className="mt-10 h-px w-full bg-line">
          <div data-pre-line className="h-px origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
        </div>
        <div className="mt-3 flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-stone">
          <span>Est. {company.foundedYear}</span>
          <span data-pre-num className="font-display text-sm tabular-nums text-ink">000</span>
        </div>
      </div>
    </div>
  );
}
