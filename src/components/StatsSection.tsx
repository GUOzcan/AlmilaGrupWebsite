import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animate";
import { company } from "@/data/company";

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  // Bölüm görünüme girince sayılar 0'dan hedefe doğru sayarak yükselir
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>("[data-count]");

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          numbers.forEach((el) => {
            const target = parseInt(el.dataset.count ?? "0", 10);
            const counter = { value: 0 };
            gsap.to(counter, {
              value: target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.value).toString();
              },
            });
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
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
    >
      {/* Kırmızı ışıma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(236,28,36,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div data-reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-almila-red">
            Sayılarla Biz
          </p>
          <h2 className="mt-4 text-3xl font-bold text-paper md:text-5xl">
            Rakamların anlattığı <span className="text-almila-red">güven</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {company.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              data-reveal-delay={`${i * 0.1}`}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-baseline text-5xl font-extrabold tracking-tight text-paper md:text-6xl">
                <span data-count={stat.value}>0</span>
                <span className="text-almila-red">{stat.suffix}</span>
              </div>
              <div className="mt-3 h-px w-10 bg-almila-red/50" />
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
