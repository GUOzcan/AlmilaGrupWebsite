import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useReveals, scrollToTarget } from "@/lib/animate";
import { getService, services } from "@/data/services";
import { company } from "@/data/company";

export function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug ?? "");
  const ref = useRef<HTMLDivElement>(null);

  useReveals(ref);
  useEffect(() => scrollToTarget(0, { immediate: true }), [slug]);

  if (!service) {
    return (
      <div>
        <Header />
        <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
          <h1 className="text-3xl font-bold text-paper">Hizmet bulunamadı</h1>
          <Link to="/#hizmetler" className="mt-6 text-almila-red hover:text-paper">
            ← Tüm hizmetlere dön
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div ref={ref} key={service.slug}>
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
              to="/#hizmetler"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-almila-red"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Tüm Hizmetler
            </Link>

            <div data-reveal className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-almila-red/10 text-almila-red">
              <Icon size={30} strokeWidth={1.7} />
            </div>
            <h1 data-reveal className="mt-6 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-paper md:text-6xl">
              {service.title}
            </h1>
            <p data-reveal className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {service.short}
            </p>
          </div>
        </section>

        {/* İçerik */}
        <section className="mx-auto max-w-4xl px-5 pb-20 md:px-8">
          <div className="grid gap-12 md:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {service.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  className="text-base leading-relaxed text-paper/85"
                >
                  {p}
                </p>
              ))}
            </div>

            <aside>
              <div data-reveal className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-paper">
                  Öne Çıkanlar
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-almila-red" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="mt-5 rounded-2xl border border-almila-red/30 bg-almila-red/5 p-6">
                <h3 className="text-sm font-bold text-paper">Teklif alın</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  İhtiyacınızı görüşelim, size özel çözüm sunalım.
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-almila-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-almila-red-dark"
                >
                  <Phone size={15} />
                  Hemen Arayın
                </a>
                <Link
                  to="/#iletisim"
                  className="mt-3 flex items-center justify-center rounded-xl border border-paper/20 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:border-almila-red hover:text-almila-red"
                >
                  Mesaj Bırakın
                </Link>
              </div>
            </aside>
          </div>

          {/* Diğer hizmetler */}
          <div className="mt-20 border-t border-ink-line pt-12">
            <h2 data-reveal className="text-xl font-bold text-paper">
              Diğer Hizmetlerimiz
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {others.map((s, i) => {
                const OtherIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/hizmet/${s.slug}`}
                    data-reveal
                    data-reveal-delay={`${i * 0.08}`}
                    className="group rounded-2xl border border-ink-line bg-ink-soft p-5 transition-all duration-300 hover:-translate-y-1 hover:border-almila-red/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-almila-red/10 text-almila-red transition-colors group-hover:bg-almila-red group-hover:text-white">
                      <OtherIcon size={19} strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold leading-snug text-paper">
                      {s.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-almila-red">
                      İncele <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
