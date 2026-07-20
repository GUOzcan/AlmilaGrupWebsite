import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="hizmetler" className="relative scroll-mt-20 bg-ink-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div data-reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-almila-red">
            Hizmetlerimiz
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-paper md:text-5xl">
            İhtiyacınıza özel <span className="text-almila-red">8 çözüm</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Araç kiralamadan taşımacılığa; her hizmetimizin detayına kartlara
            tıklayarak ulaşabilirsiniz.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/hizmet/${service.slug}`}
                data-reveal
                data-reveal-delay={`${(i % 4) * 0.08}`}
                className="group relative flex flex-col rounded-2xl border border-ink-line bg-ink p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-almila-red/60 hover:shadow-[0_12px_40px_rgba(236,28,36,0.12)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-almila-red/10 text-almila-red transition-colors group-hover:bg-almila-red group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-almila-red group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 text-base font-bold leading-snug text-paper">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {service.short}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
