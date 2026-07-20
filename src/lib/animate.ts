import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// JS yüklendi: [data-reveal] öğeleri CSS ile gizlenir, GSAP ile açılır.
// JS yüklenmezse bu sınıf eklenmez ve içerik görünür kalır.
if (typeof document !== "undefined") {
  document.documentElement.classList.add("gsap-ready");
}

/**
 * Kapsayıcı içindeki tüm [data-reveal] öğelerine scroll-tetiklemeli
 * "aşağıdan yukarı belir" animasyonu uygular.
 * data-reveal-delay="0.2" ile gecikme verilebilir.
 */
export function useReveals(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [container]);
}

export { gsap, ScrollTrigger };
