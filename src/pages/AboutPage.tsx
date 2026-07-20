import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, MapPin, ShieldCheck, Handshake, Gauge } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useReveals } from "@/lib/animate";
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
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div ref={ref}>
      <Header />
      <main className="pt-20">
        {/* Başlık */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% -10%, rgba(236,28,36,0.12), transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-5 md:px-8">
            <Link
              to="/#hakkimizda"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-almila-red"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Ana Sayfa
            </Link>
            <p data-reveal className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-almila-red">
              Hakkımızda
            </p>
            <h1 data-reveal className="mt-4 text-4xl font-bold leading-tight text-paper md:text-6xl">
              {company.name}
            </h1>
            <p data-reveal className="mt-4 text-lg text-muted">
              {company.slogan}
            </p>
          </div>
        </section>

        {/* Kurumsal metin */}
        <section className="mx-auto max-w-4xl px-5 pb-20 md:px-8">
          <div className="space-y-6">
            {company.aboutLong.map((p, i) => (
              <p
                key={i}
                data-reveal
                className="text-base leading-relaxed text-paper/85 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Değerler */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  data-reveal
                  data-reveal-delay={`${i * 0.1}`}
                  className="rounded-2xl border border-ink-line bg-ink-soft p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-almila-red/10 text-almila-red">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-paper">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              );
            })}
          </div>

          {/* Şubeler */}
          <div data-reveal className="mt-16 rounded-2xl border border-ink-line bg-ink-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-paper">Yapılanmamız</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {company.branches.map((b) => (
                <div key={b.city} className="rounded-xl border border-ink-line bg-ink p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-paper">
                    <MapPin size={14} className="text-almila-red" />
                    {b.city}
                  </div>
                  <p className="mt-1 text-xs text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="mt-16 text-center">
            <Link
              to="/#iletisim"
              className="inline-block rounded-full bg-almila-red px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-almila-red-dark hover:shadow-[0_0_32px_rgba(236,28,36,0.35)]"
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
