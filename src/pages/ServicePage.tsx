import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
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
          <h1 className="font-display text-3xl text-ink">Hizmet bulunamadı</h1>
          <Link to="/#hizmetler" className="mt-6 text-accent hover:text-ink">
            ← Tüm hizmetlere dön
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const serviceIndex = services.findIndex((s) => s.slug === service.slug);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div ref={ref} key={service.slug} className="bg-porcelain">
      <Header />
      <main className="pt-20">
        {/* Başlık */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 select-none"
          >
            <span className="text-outline-ink font-display text-[38vw] italic leading-none md:text-[24vw]">
              {String(serviceIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="relative mx-auto max-w-5xl px-5 md:px-8">
            <Link
              to="/#hizmetler"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-graphite transition-colors hover:text-accent"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              Tüm Hizmetler
            </Link>

            <p data-reveal className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-graphite md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Hizmet — {String(serviceIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
            <h1 data-reveal className="mt-6 max-w-3xl font-display text-4xl font-normal leading-[1.06] tracking-tight text-ink md:text-6xl">
              {service.title}
            </h1>
            <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
              {service.short}
            </p>
            <div data-reveal className="mt-10 h-px w-full max-w-md bg-line" />
          </div>
        </section>

        {/* İçerik */}
        <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
          <div className="grid gap-14 md:grid-cols-[1fr_320px]">
            <div className="space-y-7">
              {service.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  className="text-[15px] leading-relaxed text-ink/85 md:text-base"
                >
                  {p}
                </p>
              ))}
            </div>

            <aside>
              <div data-reveal className="border-t-2 border-ink pt-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-graphite">
                  Öne Çıkanlar
                </h3>
                <ul className="mt-5 space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 border-b border-line pb-4 text-sm leading-snug text-ink/80">
                      <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="mt-9 rounded-2xl bg-ink p-7">
                <h3 className="font-display text-2xl text-paper">Teklif alın</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  İhtiyacınızı görüşelim, size özel çözüm sunalım.
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-almila-red hover:text-white"
                >
                  <Phone size={15} />
                  Hemen Arayın
                </a>
                <Link
                  to="/#iletisim"
                  className="mt-3 flex items-center justify-center rounded-full border border-line-dark px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-almila-red hover:text-almila-red"
                >
                  Mesaj Bırakın
                </Link>
              </div>
            </aside>
          </div>

          {/* Diğer hizmetler */}
          <div className="mt-24 border-t border-line pt-12">
            <h2 data-reveal className="font-display text-3xl text-ink">
              Diğer <em className="font-light italic text-accent">hizmetlerimiz</em>
            </h2>
            <div className="mt-8">
              {others.map((s, i) => {
                const idx = services.findIndex((x) => x.slug === s.slug);
                return (
                  <Link
                    key={s.slug}
                    to={`/hizmet/${s.slug}`}
                    data-reveal
                    data-reveal-delay={`${i * 0.08}`}
                    className="group flex items-center justify-between border-b border-line py-6"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="font-display text-sm italic text-stone transition-colors group-hover:text-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl text-ink/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-ink md:text-2xl">
                        {s.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-stone transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
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
