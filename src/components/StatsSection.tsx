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
              duration: 2.2,
              delay: i * 0.14,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.value).toString();
              },
            });
            gsap.fromTo(
              el.closest("[data-stat]"),
              { y: 36, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, delay: i * 0.14, ease: "power3.out" }
            );
          });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sayilarla-biz"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-porcelain py-28 md:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-graphite md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              03 — Sayılarla
            </p>
            <h2 data-reveal className="mt-6 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink md:text-6xl">
              Rakamların anlattığı{" "}
              <em className="font-light italic text-accent">güven.</em>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {company.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-stat
              className={`flex flex-col gap-4 border-b border-line py-10 pr-6 md:py-14 ${
                i % 2 === 1 ? "border-l pl-6 md:pl-10" : ""
              } ${i >= 2 ? "md:border-l md:pl-10" : ""}`}
            >
              <div className="flex items-baseline font-display text-6xl tracking-tight text-ink md:text-7xl lg:text-8xl">
                <span data-count={stat.value}>0</span>
                <span className="ml-1 text-3xl italic text-accent md:text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-graphite md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Alt kayan bant */}
      <div className="mt-20 border-y border-line py-4">
        <Marquee duration={30}>
          {[
            "Kurumsal Filo Çözümleri",
            "7/24 Operasyon",
            "Belgeli Sürücü Kadrosu",
            "İkame Araç Garantisi",
            "Şeffaf Sözleşme",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center whitespace-nowrap px-8 font-display text-lg italic text-ink/25"
            >
              {t}
              <span className="ml-16 inline-block h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
