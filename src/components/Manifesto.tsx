import { useEffect, useRef } from "react";
import { gsap, splitWords } from "@/lib/animate";

const statement =
  "Bir araç kiralamak kolaydır. Zor olan; filoyu, sürücüyü, güzergâhı ve zamanı her gün aynı kusursuzlukla yönetmek. Almila Grup, 2006'dan beri tam olarak bunu yapıyor.";

/**
 * Manifesto: koyu zeminde, scroll ilerledikçe kelime kelime aydınlanan
 * kurumsal beyan — sayfanın nefes aldığı editoryal an.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const p = root.querySelector<HTMLElement>("[data-manifesto]");
      if (!p) return;
      const words = splitWords(p);

      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        "[data-manifesto-label]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-32 md:py-44">
      {/* Köşe ışıması */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 15% 0%, rgba(236,28,36,0.07), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <p
          data-manifesto-label
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-mist md:text-[11px]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-almila-red" />
          Manifesto
        </p>

        <p
          data-manifesto
          className="mt-10 font-display text-3xl leading-[1.35] text-paper md:text-5xl md:leading-[1.3]"
        >
          {statement}
        </p>

        <div className="mt-12 h-px w-24 bg-almila-red/70" />
      </div>
    </section>
  );
}
