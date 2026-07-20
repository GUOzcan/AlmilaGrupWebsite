import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animate";
import { Marquee } from "./Marquee";
import { services } from "@/data/services";
import { company } from "@/data/company";

/** Yörünge sahnesindeki cam bilgi kartları */
const chips = [
  { label: "Kuruluş", value: "2006", pos: "top-[6%] left-[4%]", delay: "0s" },
  { label: "Yapılanma", value: "3 Şehir", pos: "top-[30%] right-[-2%]", delay: "0.8s" },
  { label: "Operasyon", value: "7/24", pos: "bottom-[16%] left-[-2%]", delay: "1.6s" },
  { label: "Hizmet", value: "8 Disiplin", pos: "bottom-[2%] right-[8%]", delay: "2.4s" },
];

export function Hero({ delay = 0.2 }: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 115, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.12 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
          "-=0.9"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.65"
        )
        .fromTo(
          "[data-orbit-scene]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1.1"
        )
        .fromTo(
          "[data-hero-band]",
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
          "-=0.6"
        );

      // Yörünge elipsleri: eğik düzlemde sürekli dönüş
      gsap.utils.toArray<HTMLElement>("[data-orbit]").forEach((orbit, i) => {
        gsap.set(orbit, { rotateX: 72, rotateZ: i * 32 });
        gsap.to(orbit, {
          rotateZ: `+=${i % 2 === 0 ? 360 : -360}`,
          duration: 34 + i * 14,
          repeat: -1,
          ease: "none",
        });
      });

      // Sahne, imleci derinlik hissiyle takip eder
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const scene = root.querySelector<HTMLElement>("[data-orbit-scene]");
        if (scene) {
          const rx = gsap.quickTo(scene, "rotateX", { duration: 1, ease: "power3.out" });
          const ry = gsap.quickTo(scene, "rotateY", { duration: 1, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            ry(nx * 10);
            rx(ny * -8);
          };
          root.addEventListener("mousemove", onMove, { passive: true });
        }
      }

      // Scroll'da içerik hafifçe süzülüp kararır
      gsap.to("[data-hero-content]", {
        yPercent: -10,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [delay]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-porcelain"
    >
      {/* Zemin dokusu: ince ızgara + sıcak ışıma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,18,0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(20,20,18,0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 60% 40%, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 78% 30%, rgba(168,35,42,0.06), transparent 65%)",
        }}
      />

      <div
        data-hero-content
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-32 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-6 lg:pb-20"
      >
        {/* Sol: editoryal başlık */}
        <div>
          <p
            data-hero-eyebrow
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-graphite opacity-0 md:text-[11px]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Araç Kiralama &amp; Taşımacılık — Est. {company.foundedYear}
          </p>

          <h1 className="mt-8 font-display font-normal leading-[1.04] tracking-tight text-ink">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block text-[11.5vw] md:text-[7.5vw] lg:text-[5.6vw]">
                Sürdürülebilir
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block text-[11.5vw] md:text-[7.5vw] lg:text-[5.6vw]">
                kalite, <em className="font-light italic text-accent">mükemmel</em>
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="block text-[11.5vw] md:text-[7.5vw] lg:text-[5.6vw]">
                hizmet.
              </span>
            </span>
          </h1>

          <div data-hero-rule className="mt-8 h-px w-full max-w-md origin-left bg-line" />

          <p
            data-hero-sub
            className="mt-7 max-w-md text-[15px] leading-relaxed text-graphite opacity-0 md:text-base"
          >
            Uzun dönem filo kiralamadan VIP taşımacılığa — kurumunuzun tüm
            ulaşım operasyonunu {company.foundedYear}'dan beri tek elden,
            sessiz bir kusursuzlukla yönetiyoruz.
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-6 opacity-0">
            <Link
              to="/#iletisim"
              className="group flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-porcelain transition-colors hover:bg-accent"
            >
              Teklif Alın
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/#hizmetler"
              className="border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Hizmetleri Keşfedin
            </Link>
          </div>
        </div>

        {/* Sağ: 3D yörünge kompozisyonu — kod ile üretilen görsel */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-130 lg:block">
          <div data-orbit-scene className="orbit-scene absolute inset-0 opacity-0">
            {/* Merkez rozet */}
            <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-porcelain shadow-[0_24px_70px_rgba(20,20,18,0.12)]">
              <span className="font-display text-4xl text-ink">{new Date().getFullYear() - company.foundedYear}</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-graphite">Yıllık Miras</span>
            </div>

            {/* Yörünge elipsleri + uydu noktaları */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                data-orbit
                className="absolute left-1/2 top-1/2 rounded-full border border-ink/15"
                style={{
                  width: `${58 + i * 21}%`,
                  height: `${58 + i * 21}%`,
                  marginLeft: `-${(58 + i * 21) / 2}%`,
                  marginTop: `-${(58 + i * 21) / 2}%`,
                }}
              >
                <span
                  className={`absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    i === 1 ? "bg-accent" : "bg-ink/50"
                  }`}
                />
              </div>
            ))}

            {/* Süzülen cam bilgi kartları */}
            {chips.map((c) => (
              <div
                key={c.label}
                className={`absolute ${c.pos} rounded-xl border border-line bg-porcelain/70 px-4 py-3 shadow-[0_14px_40px_rgba(20,20,18,0.1)] backdrop-blur-md`}
                style={{ animation: `float-soft 6s ease-in-out ${c.delay} infinite` }}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone">{c.label}</p>
                <p className="mt-0.5 font-display text-xl text-ink">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alt bant: kayan hizmet isimleri */}
      <div data-hero-band className="relative z-10 border-t border-line py-5 opacity-0">
        <Marquee duration={44}>
          {services.map((s) => (
            <span
              key={s.slug}
              className="flex items-center whitespace-nowrap px-8 font-display text-lg italic text-ink/35"
            >
              {s.title}
              <span className="ml-16 inline-block h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
