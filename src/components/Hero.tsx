import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { gsap } from "@/lib/animate";
import { company } from "@/data/company";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-logo]",
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1 }
        )
        .fromTo(
          "[data-hero-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-slogan]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.35"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Arka plan: köşelerden kırmızı ışıma + ince ızgara */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 118%, rgba(236,28,36,0.16), transparent 65%)," +
            "radial-gradient(ellipse 45% 35% at 88% -8%, rgba(236,28,36,0.07), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, black, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <img
          data-hero-logo
          src="/logo-white.png"
          alt="Almila Grup"
          className="w-[78%] max-w-130 opacity-0"
        />

        <div
          data-hero-line
          className="mt-10 h-px w-24 origin-center bg-almila-red md:mt-12"
        />

        <h1
          data-hero-slogan
          className="mt-8 text-2xl font-light tracking-[0.02em] text-paper opacity-0 md:mt-10 md:text-4xl"
        >
          Sürdürülebilir Kalite,{" "}
          <span className="font-semibold text-almila-red">Mükemmel Hizmet</span>
        </h1>

        <p
          data-hero-sub
          className="mt-5 max-w-xl text-sm leading-relaxed text-muted opacity-0 md:text-base"
        >
          {company.foundedYear}'dan bugüne kurumsal araç kiralama ve taşımacılıkta
          güvenilir çözüm ortağınız. Ankara · Antalya · Çorum
        </p>

        <div data-hero-cta className="mt-9 flex flex-wrap justify-center gap-4 opacity-0">
          <Link
            to="/#hizmetler"
            className="rounded-full bg-almila-red px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-almila-red-dark hover:shadow-[0_0_32px_rgba(236,28,36,0.35)]"
          >
            Hizmetlerimiz
          </Link>
          <Link
            to="/#iletisim"
            className="rounded-full border border-paper/25 px-7 py-3 text-sm font-semibold text-paper transition-colors hover:border-almila-red hover:text-almila-red"
          >
            Teklif Alın
          </Link>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#hakkimizda"
        aria-label="Aşağı kaydır"
        className="absolute bottom-8 z-10 animate-bounce text-muted opacity-0 transition-colors hover:text-almila-red"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
