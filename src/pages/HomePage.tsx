import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { useReveals, scrollToTarget, ScrollTrigger } from "@/lib/animate";

// Açılış perdesi oturum başına bir kez gösterilir
const INTRO_KEY = "almila-intro-seen";

export function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem(INTRO_KEY)
  );

  useReveals(ref);

  // Detay sayfasından "/#hizmetler" gibi bir bağlantıyla dönünce ilgili bölüme kaydır
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          scrollToTarget(el);
        });
        return;
      }
    }
    scrollToTarget(0, { immediate: true });
  }, [hash]);

  return (
    <div ref={ref}>
      {showIntro && (
        <Preloader
          onDone={() => {
            sessionStorage.setItem(INTRO_KEY, "1");
            setShowIntro(false);
            ScrollTrigger.refresh();
          }}
        />
      )}
      <Header />
      <main>
        <Hero delay={showIntro ? 2.55 : 0.2} />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
