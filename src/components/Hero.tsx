import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap, splitChars } from "@/lib/animate";
import { Marquee } from "./Marquee";
import { services } from "@/data/services";
import { company } from "@/data/company";

export function Hero({ delay = 0.2 }: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Başlık satırlarını karaktere böl, maske içinden yukarı kaydır
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const allChars: HTMLElement[][] = lines.map((line) => splitChars(line));

      const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      allChars.forEach((chars, i) => {
        tl.fromTo(
          chars,
          { yPercent: 120, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.028 },
          i === 0 ? "-=0.45" : "-=0.85"
        );
      });

      tl.fromTo(
        "[data-hero-sub]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-band]",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.4"
        );

      // Işık hüzmeleri: sürekli süzülen skew'li şeritler
      gsap.utils.toArray<HTMLElement>("[data-beam]").forEach((beam, i) => {
        gsap.to(beam, {
          xPercent: i % 2 === 0 ? 18 : -14,
          opacity: 0.9,
          duration: 5 + i * 1.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      // Mouse parallax: katmanlar imleci farklı derinliklerde takip eder
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
        const setters = layers.map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" }),
          depth: parseFloat(layer.dataset.depth ?? "0.02"),
        }));
        const onMove = (e: MouseEvent) => {
          const cx = e.clientX - window.innerWidth / 2;
          const cy = e.clientY - window.innerHeight / 2;
          setters.forEach((s) => {
            s.x(cx * s.depth);
            s.y(cy * s.depth);
          });
        };
        root.addEventListener("mousemove", onMove, { passive: true });
      }

      // Scroll'da hero içeriği hafifçe yukarı süzülüp kararır
      gsap.to("[data-hero-content]", {
        yPercent: -12,
        opacity: 0.25,
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
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* ── Kod ile üretilen arka plan sahnesi ── */}
      {/* Zemin ışıması */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 115%, rgba(236,28,36,0.18), transparent 62%)," +
            "radial-gradient(ellipse 40% 30% at 92% -5%, rgba(236,28,36,0.08), transparent 60%)",
        }}
      />
      {/* İnce ızgara */}
      <div
        aria-hidden
        data-depth="0.012"
        className="pointer-events-none absolute -inset-12 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 55%, black, transparent 78%)",
        }}
      />
      {/* Işık hüzmeleri */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          data-beam
          className="absolute top-[8%] -left-1/4 h-[140%] w-40 -skew-x-12 bg-gradient-to-b from-transparent via-almila-red/12 to-transparent blur-2xl"
        />
        <div
          data-beam
          className="absolute top-[-15%] left-[55%] h-[140%] w-64 -skew-x-12 bg-gradient-to-b from-transparent via-almila-red/8 to-transparent blur-3xl"
        />
        <div
          data-beam
          className="absolute top-[-10%] left-[82%] h-[130%] w-24 -skew-x-12 bg-gradient-to-b from-transparent via-paper/6 to-transparent blur-2xl"
        />
      </div>
      {/* Dev arka plan konturu — derinlik katmanı */}
      <div
        aria-hidden
        data-depth="0.03"
        className="pointer-events-none absolute top-[16%] left-1/2 -translate-x-1/2 select-none"
      >
        <span className="font-display text-[30vw] leading-none font-black tracking-tighter text-outline opacity-45">
          2006
        </span>
      </div>

      {/* ── İçerik ── */}
      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 md:px-8 md:pb-32"
      >
        <p
          data-hero-eyebrow
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted opacity-0 md:text-xs"
        >
          <span className="inline-block h-px w-10 bg-almila-red" />
          Araç Kiralama &amp; Taşımacılık — {company.foundedYear}'dan beri
        </p>

        <h1 className="mt-6 font-display font-black tracking-tight uppercase leading-[1.06]">
          {/* pt: Ü/İ noktaları maskede kırpılmasın diye üstten nefes payı */}
          <span className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-1">
            <span
              data-hero-line
              className="block text-[9vw] text-paper md:text-[6.5vw]"
            >
              Sürdürülebilir Kalite,
            </span>
          </span>
          <span className="-mt-[0.14em] block overflow-hidden pt-[0.18em] pb-2">
            <span
              data-hero-line
              className="block text-[9vw] text-almila-red md:text-[6.5vw]"
              style={{ textShadow: "0 0 80px rgba(236,28,36,0.35)" }}
            >
              Mükemmel Hizmet.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-sub
            className="max-w-md text-sm leading-relaxed text-muted opacity-0 md:text-base"
          >
            Uzun dönem filo kiralamadan VIP taşımacılığa — kurumunuzun tüm
            ulaşım operasyonunu tek elden üstleniyoruz.
            <span className="mt-2 block text-paper/70">
              Ankara · Antalya · Çorum
            </span>
          </p>

          <div data-hero-cta className="flex flex-wrap gap-4 opacity-0">
            <Link
              to="/#hizmetler"
              className="rounded-full bg-almila-red px-8 py-4 text-sm font-bold text-white transition-all hover:bg-almila-red-dark hover:shadow-[0_0_40px_rgba(236,28,36,0.4)]"
            >
              Hizmetleri Keşfedin
            </Link>
            <Link
              to="/#iletisim"
              className="rounded-full border border-paper/25 px-8 py-4 text-sm font-bold text-paper transition-colors hover:border-almila-red hover:text-almila-red"
            >
              Teklif Alın
            </Link>
          </div>
        </div>
      </div>

      {/* ── Alt bant: kayan hizmet isimleri ── */}
      <div
        data-hero-band
        className="relative z-10 border-t border-ink-line bg-ink/60 py-4 opacity-0 backdrop-blur-sm"
      >
        <Marquee duration={38}>
          {services.map((s) => (
            <span
              key={s.slug}
              className="flex items-center whitespace-nowrap px-6 text-xs font-semibold uppercase tracking-[0.25em] text-paper/50"
            >
              {s.title}
              <span className="ml-12 text-almila-red">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
