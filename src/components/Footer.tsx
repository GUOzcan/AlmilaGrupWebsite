import { Link } from "react-router";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink">
      {/* Dev kontur marka yazısı */}
      <div aria-hidden className="pointer-events-none select-none px-5 pt-14 md:px-8">
        <p className="font-display text-[13.5vw] leading-[0.85] font-black uppercase tracking-tighter text-outline opacity-50">
          Almila Grup
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <img src="/logo-white.png" alt="Almila Grup" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {company.slogan}. {company.foundedYear}'dan beri kurumsal araç
            kiralama ve taşımacılık.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-paper/60">
            Hizmetler
          </h4>
          <ul className="mt-4 grid gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/hizmet/${s.slug}`}
                  className="text-sm text-muted transition-colors hover:text-almila-red"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-paper/60">
            İletişim
          </h4>
          <ul className="mt-4 grid gap-2.5 text-sm text-muted">
            <li>
              <a href={company.phoneHref} className="transition-colors hover:text-almila-red">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-almila-red">
                {company.email}
              </a>
            </li>
            {company.branches.map((b) => (
              <li key={b.city}>
                {b.city} <span className="text-muted/60">· {b.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted/70 md:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.
          </p>
          <p>Ankara · Antalya · Çorum</p>
        </div>
      </div>
    </footer>
  );
}
