import { Link } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { company } from "@/data/company";

export function AboutSection() {
  return (
    <section id="hakkimizda" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-almila-red">
            Hakkımızda
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-paper md:text-5xl">
            {company.foundedYear}'dan bugüne{" "}
            <span className="text-almila-red">güvenle</span> taşıyoruz
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </div>

        <div data-reveal data-reveal-delay="0.15">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {company.aboutShort}
          </p>
          <Link
            to="/hakkimizda"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-almila-red transition-colors hover:text-paper"
          >
            Devamını Oku
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
