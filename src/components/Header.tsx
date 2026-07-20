import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Phone } from "lucide-react";
import { company } from "@/data/company";

const navItems = [
  { label: "Ana Sayfa", to: "/#top" },
  { label: "Hakkımızda", to: "/#hakkimizda" },
  { label: "Hizmetler", to: "/#hizmetler" },
  { label: "İletişim", to: "/#iletisim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rota değişince mobil menüyü kapat
  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-porcelain/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/#top" aria-label="Almila Grup ana sayfa" className="shrink-0">
          <img
            src="/logo-dark.png"
            alt="Almila Grup"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[13px] font-semibold text-porcelain transition-colors hover:bg-accent"
          >
            <Phone size={14} />
            <span className="hidden lg:inline">{company.phone}</span>
            <span className="lg:hidden">Ara</span>
          </a>
        </nav>

        {/* Mobil menü düğmesi */}
        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobil menü */}
      {open && (
        <nav className="border-t border-line bg-porcelain/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-5 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3.5 font-display text-lg text-ink last:border-0 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-porcelain"
            >
              <Phone size={15} /> {company.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
