import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useReveals } from "@/lib/animate";

export function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  useReveals(ref);

  // Detay sayfasından "/#hizmetler" gibi bir bağlantıyla dönünce ilgili bölüme kaydır
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Reveal animasyonları layout'u etkilemeden önce bir frame bekle
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div ref={ref}>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
