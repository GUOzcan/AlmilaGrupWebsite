import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// JS yüklendi: [data-reveal] öğeleri CSS ile gizlenir, GSAP ile açılır.
// JS yüklenmezse bu sınıf eklenmez ve içerik görünür kalır.
if (typeof document !== "undefined") {
  document.documentElement.classList.add("gsap-ready");
}

// ── Lenis smooth scroll (uygulama ömrü boyunca tek örnek) ──
export const lenisRef = { current: null as Lenis | null };

export function initSmoothScroll() {
  if (lenisRef.current) return;
  // Dokunmatik cihazlarda native scroll daha doğal
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
  });
  lenisRef.current = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Lenis varsa yumuşak, yoksa native kaydırma */
export function scrollToTarget(
  target: Element | number,
  opts: { immediate?: boolean; offset?: number } = {}
) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement | number, {
      immediate: opts.immediate,
      offset: opts.offset ?? 0,
    });
  } else if (typeof target === "number") {
    window.scrollTo(0, target);
  } else {
    (target as HTMLElement).scrollIntoView({
      behavior: opts.immediate ? "auto" : "smooth",
    });
  }
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

/**
 * Bir başlığı karakterlerine böler (kendi hafif SplitText'imiz).
 * Türkçe karakterlerle sorunsuz çalışır; boşluklar korunur.
 */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const chars: HTMLElement[] = [];
  const frag = document.createDocumentFragment();

  // Karakterler kelime kapsayicilarinda gruplanir — satir sonu yalnizca
  // kelime aralarinda olusur.
  text.split(" ").forEach((word, wi, words) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "inline-block whitespace-nowrap";
    wordSpan.setAttribute("aria-hidden", "true");
    for (const ch of word) {
      const span = document.createElement("span");
      span.className = "inline-block will-change-transform";
      span.textContent = ch;
      wordSpan.appendChild(span);
      chars.push(span);
    }
    frag.appendChild(wordSpan);
    if (wi < words.length - 1) frag.appendChild(document.createTextNode(" "));
  });

  el.appendChild(frag);
  return chars;
}

/**
 * Bir paragrafı kelimelerine böler (scroll ile kelime kelime belirme için).
 * Boşluklar korunur; erişilebilirlik için aria-label eklenir.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const words: HTMLElement[] = [];
  text.split(" ").forEach((word, i, arr) => {
    const span = document.createElement("span");
    span.className = "inline-block";
    span.setAttribute("aria-hidden", "true");
    span.textContent = word;
    el.appendChild(span);
    words.push(span);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return words;
}

/** Buton/bağlantıya "mıknatıs" etkisi: imleç yaklaşınca öğe hafifçe ona doğru kayar */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.35
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}

export { gsap, ScrollTrigger };
