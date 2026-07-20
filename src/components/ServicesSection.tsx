import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animate";
import { services } from "@/data/services";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Masaüstü: bölüm sabitlenir, dikey scroll yatay kaymaya dönüşür
    mm.add("(min-width: 1024px)", () => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Kartlar görünüme kayarken hafif belirir
      gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 55%",
              scrub: true,
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === section)
          .forEach((st) => st.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hizmetler"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden bg-ink-soft"
    >
      <div className="flex min-h-svh flex-col justify-center py-20 lg:py-0">
        {/* Başlık */}
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p data-reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-almila-red md:text-xs">
                02 <span className="inline-block h-px w-10 bg-almila-red/50" /> Hizmetlerimiz
              </p>
              <h2
                data-reveal
                className="mt-5 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-paper md:text-6xl"
              >
                İhtiyacınıza özel{" "}
                <span className="text-almila-red">8 çözüm</span>
              </h2>
            </div>
            <p data-reveal className="hidden max-w-xs text-sm leading-relaxed text-muted lg:block">
              Kaydırmaya devam edin — hizmetler yana akar. Detay için karta
              tıklayın.
            </p>
          </div>
        </div>

        {/* Slider rayı */}
        <div className="mt-12 lg:mt-16">
          <div
            ref={trackRef}
            className="no-scrollbar flex w-max snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:px-8 lg:snap-none lg:overflow-visible"
            style={{ maxWidth: "100vw" }}
            data-lenis-prevent
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/hizmet/${service.slug}`}
                  data-slide
                  className="group relative flex h-105 w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-ink-line bg-ink p-7 transition-colors duration-300 hover:border-almila-red/70 sm:w-95 lg:h-115 lg:w-105 lg:p-9"
                >
                  {/* Dev sıra numarası */}
                  <span className="pointer-events-none absolute -top-6 -right-2 font-display text-[7.5rem] leading-none font-black tracking-tighter text-outline opacity-60 transition-opacity duration-300 group-hover:opacity-100 lg:text-[9rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Hover ışıması */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 55% at 50% 110%, rgba(236,28,36,0.14), transparent 65%)",
                    }}
                  />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-almila-red/10 text-almila-red transition-colors duration-300 group-hover:bg-almila-red group-hover:text-white">
                    <Icon size={26} strokeWidth={1.7} />
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-paper lg:text-[1.7rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-almila-red">
                      İncele
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Kapanış slaytı: CTA */}
            <Link
              to="/#iletisim"
              data-slide
              className="group relative flex h-105 w-[82vw] shrink-0 snap-center flex-col items-center justify-center gap-6 rounded-2xl border border-almila-red/40 bg-almila-red/5 p-8 text-center transition-colors hover:bg-almila-red/10 sm:w-95 lg:h-115 lg:w-105"
            >
              <p className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-paper">
                Hangisi size <span className="text-almila-red">uygun?</span>
              </p>
              <p className="max-w-60 text-sm text-muted">
                Birlikte belirleyelim — ihtiyacınıza özel teklif hazırlayalım.
              </p>
              <span className="rounded-full bg-almila-red px-7 py-3.5 text-sm font-bold text-white transition-all group-hover:shadow-[0_0_40px_rgba(236,28,36,0.4)]">
                Teklif Alın
              </span>
            </Link>
          </div>
        </div>

        {/* İlerleme çubuğu (masaüstü) */}
        <div className="mx-auto mt-12 hidden w-full max-w-7xl px-5 md:px-8 lg:block">
          <div className="h-px w-full bg-ink-line">
            <div
              ref={progressRef}
              className="h-px origin-left bg-almila-red"
              style={{ transform: "scaleX(0)", boxShadow: "0 0 10px rgba(236,28,36,0.7)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
