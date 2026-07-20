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

      // Her durak: nokta kırmızıya döner, içerik belirir
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
      className="relative scroll-mt-20 overflow-hidden py-28 md:py-40"
    >
      {/* Dev kontur yıl — parallax derinlik */}
      <div
        aria-hidden
        data-about-year
        className="pointer-events-none absolute -right-8 top-24 select-none md:top-12"
      >
        <span className="font-display text-[38vw] leading-none font-black tracking-tighter text-outline opacity-40 md:text-[24vw]">
          20
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Sol: başlık + metin */}
          <div>
            <p data-reveal className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-almila-red md:text-xs">
              01 <span className="inline-block h-px w-10 bg-almila-red/50" /> Hakkımızda
            </p>
            <h2
              data-reveal
              className="mt-6 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-paper md:text-6xl"
            >
              {company.foundedYear}'dan bugüne{" "}
              <span className="text-almila-red">güvenle</span> taşıyoruz
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {company.aboutShort}
            </p>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              {company.branches.map((b) => (
                <span
                  key={b.city}
                  className="flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-xs font-medium text-paper/80"
                >
                  <MapPin size={13} className="text-almila-red" />
                  {b.city}
                  <span className="text-muted">· {b.label}</span>
                </span>
              ))}
            </div>

            <Link
              to="/hakkimizda"
              data-reveal
              className="group mt-10 inline-flex items-center gap-2 border-b border-almila-red pb-1 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:text-almila-red"
            >
              Devamını Oku
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Sağ: kuruluş hikayesi zaman tüneli */}
          <div data-timeline className="relative pl-10 md:pl-14">
            {/* Ray: soluk zemin + scroll ile dolan kırmızı çizgi */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-ink-line md:left-3" />
            <div
              data-rail
              className="absolute left-2 top-2 bottom-2 w-px origin-top bg-almila-red md:left-3"
              style={{ boxShadow: "0 0 12px rgba(236,28,36,0.6)" }}
            />

            <div className="flex flex-col gap-14 py-2 md:gap-20">
              {milestones.map((m) => (
                <div key={m.title} data-milestone className="relative">
                  <span className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-almila-red bg-ink md:-left-[47px]" />
                  <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-almila-red md:text-3xl">
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-paper md:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted md:text-base">
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
