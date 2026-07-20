import { type FormEvent, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
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
    <section id="iletisim" className="relative scroll-mt-20 bg-ink-soft py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
        {/* Sol: bilgiler */}
        <div data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-almila-red">
            İletişim
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-paper md:text-5xl">
            Projenizi <span className="text-almila-red">konuşalım</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Filo ihtiyacınız, servis planlamanız veya taşımacılık projeniz için
            bize ulaşın; aynı gün içinde dönüş yapalım.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={company.phoneHref}
              className="group flex items-center gap-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-almila-red/10 text-almila-red transition-colors group-hover:bg-almila-red group-hover:text-white">
                <Phone size={19} />
              </span>
              <span className="text-base font-medium text-paper transition-colors group-hover:text-almila-red">
                {company.phone}
              </span>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="group flex items-center gap-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-almila-red/10 text-almila-red transition-colors group-hover:bg-almila-red group-hover:text-white">
                <Mail size={19} />
              </span>
              <span className="text-base font-medium text-paper transition-colors group-hover:text-almila-red">
                {company.email}
              </span>
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {company.branches.map((b) => (
              <div
                key={b.city}
                className="rounded-xl border border-ink-line bg-ink p-4"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-paper">
                  <MapPin size={14} className="text-almila-red" />
                  {b.city}
                </div>
                <p className="mt-1 text-xs text-muted">{b.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {b.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: form */}
        <div data-reveal data-reveal-delay="0.15">
          {sent ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-ink-line bg-ink p-10 text-center">
              <CheckCircle2 size={44} className="text-almila-red" />
              <h3 className="mt-5 text-xl font-bold text-paper">
                E-posta taslağınız hazırlandı
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                E-posta uygulamanız açıldı. Göndermeyi tamamladığınızda en kısa
                sürede size dönüş yapacağız.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-semibold text-almila-red hover:text-paper"
              >
                Yeni mesaj yaz
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-ink-line bg-ink p-6 md:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Ad Soyad
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted/50 focus:border-almila-red"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted/50 focus:border-almila-red"
                    placeholder="0 (5__) ___ __ __"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted/50 focus:border-almila-red"
                    placeholder="İhtiyacınızı kısaca anlatın…"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-almila-red px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-almila-red-dark hover:shadow-[0_0_32px_rgba(236,28,36,0.3)]"
                >
                  <Send size={16} />
                  Gönder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
