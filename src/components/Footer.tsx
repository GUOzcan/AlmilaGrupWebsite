import { Link } from "react-router";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-ink">
      {/* Dev serif marka yazısı */}
      <div aria-hidden className="pointer-events-none select-none px-5 pt-16 md:px-8">
        <p className="text-outline font-display text-[13vw] italic leading-[0.9]">
          Almila Grup
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <img src="/logo-white.png" alt="Almila Grup" className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            {company.slogan}. {company.foundedYear}'dan beri kurumsal araç
            kiralama ve taşımacılık.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-mist/70">
            Hizmetler
          </h4>
          <ul className="mt-5 grid gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/hizmet/${s.slug}`}
                  className="text-sm text-mist transition-colors hover:text-almila-red"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-mist/70">
            İletişim
          </h4>
          <ul className="mt-5 grid gap-2.5 text-sm text-mist">
            <li>
              <a href={company.phoneHref} className="font-display text-lg text-paper transition-colors hover:text-almila-red">
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
                {b.city} <span className="text-mist/50">· {b.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-mist/60 md:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.
          </p>
          <p className="font-display italic">Ankara · Antalya · Çorum</p>
        </div>
      </div>
    </footer>
  );
}
