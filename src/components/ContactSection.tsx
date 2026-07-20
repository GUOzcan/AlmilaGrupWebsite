import { type FormEvent, useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  // Şimdilik form verisi e-posta taslağına yönlendirilir (backend yok).
  // İleride Netlify Forms / Formspree gibi bir servise bağlanabilir.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const message = data.get("message");
    const body = encodeURIComponent(
      `Ad Soyad: ${name}\nTelefon: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      "Web Sitesi İletişim Formu"
    )}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="iletisim" className="relative scroll-mt-20 overflow-hidden bg-ink py-28 md:py-36">
      {/* Köşe ışıması */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 85% 10%, rgba(236,28,36,0.07), transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        {/* Sol: bilgiler */}
        <div data-reveal>
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-mist md:text-[11px]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-almila-red" />
            04 — İletişim
          </p>
          <h2 className="mt-6 font-display text-4xl font-normal leading-[1.08] tracking-tight text-paper md:text-6xl">
            Projenizi{" "}
            <em className="font-light italic text-almila-red">konuşalım.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Filo ihtiyacınız, servis planlamanız veya taşımacılık projeniz için
            bize ulaşın; aynı gün içinde dönüş yapalım.
          </p>

          <div className="mt-11 space-y-6">
            <a href={company.phoneHref} className="group flex items-center gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-paper/80 transition-colors group-hover:border-almila-red group-hover:text-almila-red">
                <Phone size={18} strokeWidth={1.7} />
              </span>
              <span className="font-display text-xl text-paper transition-colors group-hover:text-almila-red md:text-2xl">
                {company.phone}
              </span>
            </a>
            <a href={`mailto:${company.email}`} className="group flex items-center gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-paper/80 transition-colors group-hover:border-almila-red group-hover:text-almila-red">
                <Mail size={18} strokeWidth={1.7} />
              </span>
              <span className="font-display text-xl text-paper transition-colors group-hover:text-almila-red md:text-2xl">
                {company.email}
              </span>
            </a>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-3">
            {company.branches.map((b) => (
              <div key={b.city} className="bg-ink-2 p-5">
                <div className="flex items-center gap-2 font-display text-lg text-paper">
                  <MapPin size={14} className="text-almila-red" />
                  {b.city}
                </div>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-mist/70">
                  {b.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-mist">
                  {b.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: form */}
        <div data-reveal data-reveal-delay="0.15">
          {sent ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-line-dark p-10 text-center">
              <CheckCircle2 size={44} className="text-almila-red" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl text-paper">
                E-posta taslağınız hazırlandı
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                E-posta uygulamanız açıldı. Göndermeyi tamamladığınızda en kısa
                sürede size dönüş yapacağız.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-7 border-b border-almila-red pb-0.5 text-sm font-semibold text-almila-red hover:text-paper"
              >
                Yeni mesaj yaz
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="md:pt-24">
              <div className="grid gap-9">
                <div>
                  <label htmlFor="name" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-mist/80">
                    Ad Soyad
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="field-dark w-full text-base"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-mist/80">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="field-dark w-full text-base"
                    placeholder="0 (5__) ___ __ __"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-mist/80">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="field-dark w-full resize-none text-base"
                    placeholder="İhtiyacınızı kısaca anlatın…"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex w-fit items-center gap-2.5 rounded-full bg-paper px-9 py-4 text-sm font-semibold text-ink transition-colors hover:bg-almila-red hover:text-white"
                >
                  Gönder
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
