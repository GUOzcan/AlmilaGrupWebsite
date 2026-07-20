import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animate";
import { company } from "@/data/company";
import { Marquee } from "./Marquee";

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  // Bölüm görünüme girince sayılar 0'dan hedefe doğru sayarak yükselir
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>("[data-count]");

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          numbers.forEach((el, i) => {
            const target = parseInt(el.dataset.count ?? "0", 10);
            const counter = { value: 0 };
            gsap.to(counter, {
              value: target,
              duration: 2.4,
              delay: i * 0.12,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.value).toString();
              },
            });
            gsap.fromTo(
              el.closest("[data-stat]"),
              { scale: 0.9, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.9, delay: i * 0.12, ease: "power3.out" }
            );
          });
        },
      });

      // Arka planda süzülen dev kontur yazı
      gsap.to("[data-stats-bg]", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sayilarla-biz"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-28 md:py-40"
    >
      {/* Kırmızı ışıma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(236,28,36,0.08), transparent 70%)",
        }}
      />
      {/* Süzülen dev kontur yazı */}
      <div
        aria-hidden
        data-stats-bg
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none whitespace-nowrap"
      >
        <span className="font-display text-[22vw] leading-none font-black uppercase tracking-tighter text-outline opacity-30">
          Almila Grup — Almila Grup —
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div data-reveal className="text-center">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-almila-red md:text-xs">
            03 <span className="inline-block h-px w-10 bg-almila-red/50" /> Sayılarla Biz
          </p>
          <h2 className="mt-5 font-display text-4xl font-black uppercase tracking-tight text-paper md:text-6xl">
            Rakamların anlattığı{" "}
            <span className="text-almila-red">güven</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="flex flex-col items-center text-center"
            >
              <div
                className="flex items-baseline font-display text-6xl font-black tracking-tighter text-paper md:text-8xl"
                style={{ textShadow: "0 0 60px rgba(236,28,36,0.25)" }}
              >
                <span data-count={stat.value}>0</span>
                <span className="text-almila-red">{stat.suffix}</span>
              </div>
              <div className="mt-4 h-px w-12 bg-almila-red/60" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-muted md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Alt kayan bant */}
      <div className="mt-24 border-y border-ink-line py-4">
        <Marquee duration={26}>
          {[
            "Kurumsal Filo Çözümleri",
            "7/24 Operasyon",
            "Belgeli Sürücü Kadrosu",
            "İkame Araç Garantisi",
            "Şeffaf Sözleşme",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center whitespace-nowrap px-6 font-display text-lg font-extrabold uppercase tracking-wide text-paper/25"
            >
              {t}
              <span className="ml-12 text-almila-red/60">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
