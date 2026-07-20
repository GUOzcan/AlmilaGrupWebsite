import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, MapPin, ShieldCheck, Handshake, Gauge } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useReveals, scrollToTarget } from "@/lib/animate";
import { company } from "@/data/company";

const values = [
  {
    icon: ShieldCheck,
    title: "Güvenlik",
    text: "Belgeli sürücüler, takip sistemli ve periyodik bakımlı araçlarla tavizsiz güvenlik standardı.",
  },
  {
    icon: Handshake,
    title: "Şeffaflık",
    text: "Sürpriz maliyet yok: net sözleşmeler, öngörülebilir bütçeler ve açık iletişim.",
  },
  {
    icon: Gauge,
    title: "Süreklilik",
    text: "İkame araç, yedek sürücü ve 7/24 operasyon desteğiyle kesintisiz hizmet.",
  },
];

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useReveals(ref);
  useEffect(() => scrollToTarget(0, { immediate: true }), []);

  return (
    <div ref={ref} className="bg-porcelain">
      <Header />
      <main className="pt-20">
        {/* Başlık */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-6 select-none">
            <span className="text-outline-ink font-display text-[30vw] italic leading-none md:text-[20vw]">
              {company.foundedYear}
            </span>
          </div>

          <div className="relative mx-auto max-w-4xl px-5 md:px-8">
            <Link
              to="/#hakkimizda"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-graphite transition-colors hover:text-accent"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              Ana Sayfa
            </Link>
            <p data-reveal className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-graphite md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Hakkımızda
            </p>
            <h1 data-reveal className="mt-6 font-display text-5xl font-normal leading-[1.04] tracking-tight text-ink md:text-7xl">
              Almila <em className="font-light italic text-accent">Grup</em>
            </h1>
            <p data-reveal className="mt-5 font-display text-xl italic text-graphite md:text-2xl">
              {company.slogan}
            </p>
            <div data-reveal className="mt-10 h-px w-full max-w-md bg-line" />
          </div>
        </section>

        {/* Kurumsal metin */}
        <section className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
          <div className="space-y-7">
            {company.aboutLong.map((p, i) => (
              <p
                key={i}
                data-reveal
                className="text-[15px] leading-relaxed text-ink/85 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Değerler */}
          <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  data-reveal
                  data-reveal-delay={`${i * 0.1}`}
                  className="bg-porcelain p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-graphite">{v.text}</p>
                </div>
              );
            })}
          </div>

          {/* Şubeler */}
          <div data-reveal className="mt-16">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-graphite">
              Yapılanmamız
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {company.branches.map((b) => (
                <div key={b.city} className="border-t-2 border-ink pt-4">
                  <div className="flex items-center gap-2 font-display text-2xl text-ink">
                    <MapPin size={15} className="text-accent" />
                    {b.city}
                  </div>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">{b.label}</p>
                  <p className="mt-3 text-xs leading-relaxed text-graphite">{b.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="mt-20 text-center">
            <Link
              to="/#iletisim"
              className="inline-block rounded-full bg-ink px-9 py-4 text-sm font-semibold text-porcelain transition-colors hover:bg-accent"
            >
              Bizimle İletişime Geçin
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
