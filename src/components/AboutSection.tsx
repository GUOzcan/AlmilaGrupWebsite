import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/animate";
import { company } from "@/data/company";

const milestones = [
  {
    year: "2006",
    title: "Çorum'da kuruluş",
    text: "Almila Grup, araç kiralama ve taşımacılık vizyonuyla Çorum'da faaliyetlerine başladı.",
  },
  {
    year: "Büyüme",
    title: "Merkez Ankara'ya",
    text: "Genişleyen kurumsal müşteri ağıyla birlikte merkez, başkent Ankara'ya taşındı.",
  },
  {
    year: "Bugün",
    title: "3 şehir, tek standart",
    text: "Ankara, Antalya ve Çorum yapılanmasıyla Türkiye genelinde aynı kalite standardı.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Zaman tüneli rayı scroll ile boydan boya çizilir
      gsap.fromTo(
        "[data-rail]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 78%", once: true },
          }
        );
      });

      // Dev arka plan yılı hafif parallax
      gsap.to("[data-about-year]", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hakkimizda"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-porcelain py-28 md:py-40"
    >
      {/* Dev kontur yıl — parallax derinlik */}
      <div
        aria-hidden
        data-about-year
        className="pointer-events-none absolute -right-6 top-20 select-none md:top-8"
      >
        <span className="text-outline-ink font-display text-[36vw] italic leading-none md:text-[22vw]">
          06
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Sol: başlık + metin */}
          <div>
            <p data-reveal className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-graphite md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              01 — Hakkımızda
            </p>
            <h2
              data-reveal
              className="mt-7 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink md:text-6xl"
            >
              {company.foundedYear}'dan bugüne,{" "}
              <em className="font-light italic text-accent">güvenle.</em>
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-xl text-[15px] leading-relaxed text-graphite md:text-lg"
            >
              {company.aboutShort}
            </p>

            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              {company.branches.map((b) => (
                <span
                  key={b.city}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-porcelain-2/60 px-4 py-2 text-xs font-semibold text-ink/80"
                >
                  <MapPin size={13} className="text-accent" />
                  {b.city}
                  <span className="font-normal text-stone">· {b.label}</span>
                </span>
              ))}
            </div>

            <Link
              to="/hakkimizda"
              data-reveal
              className="group mt-11 inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Devamını Oku
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Sağ: kuruluş hikayesi zaman tüneli */}
          <div data-timeline className="relative pl-10 md:pl-14">
            <div className="absolute bottom-2 left-2 top-2 w-px bg-line md:left-3" />
            <div
              data-rail
              className="absolute bottom-2 left-2 top-2 w-px origin-top bg-accent md:left-3"
            />

            <div className="flex flex-col gap-14 py-2 md:gap-20">
              {milestones.map((m) => (
                <div key={m.title} data-milestone className="relative">
                  <span className="absolute -left-10 top-2 h-3 w-3 rounded-full border-2 border-accent bg-porcelain md:-left-[46px]" />
                  <p className="font-display text-3xl italic text-accent md:text-4xl">
                    {m.year}
                  </p>
                  <h3 className="mt-2.5 font-display text-xl text-ink md:text-2xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-graphite md:text-[15px]">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
