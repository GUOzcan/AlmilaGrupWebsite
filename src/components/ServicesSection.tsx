import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animate";
import { services } from "@/data/services";

const STEP = 360 / services.length;

/**
 * Hizmetler: kendi kendine sürekli dönen 3D silindir carousel.
 * — İmleç üzerine gelince yavaşlar, sürüklenerek çevrilebilir,
 *   karta tıklanınca detay sayfası açılır.
 * — Altta erişilebilir numaralı dizin listesi yer alır.
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scene = sceneRef.current;
    const ring = ringRef.current;
    if (!scene || !ring) return;

    const cards = Array.from(ring.querySelectorAll<HTMLElement>("[data-ring-card]"));

    // Ekran genişliğine göre kart/yarıçap
    const layout = () => {
      const mobile = window.innerWidth < 768;
      const cardW = mobile ? 225 : 320;
      const radius = (cardW + (mobile ? 40 : 56)) / (2 * Math.tan(Math.PI / services.length));
      cards.forEach((card, i) => {
        card.style.width = `${cardW}px`;
        card.style.transform = `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(${radius}px)`;
      });
    };
    layout();
    window.addEventListener("resize", layout);

    // Dönüş durumu
    const state = {
      angle: 0,
      vel: -7,          // derece/saniye — sürekli dönüş hızı
      target: -7,
      dragging: false,
      lastX: 0,
      dragVel: 0,
      moved: 0,
    };

    const render = () => {
      ring.style.transform = `rotateX(-6deg) rotateY(${state.angle}deg)`;
      // Öndeki kartlar net, arkadakiler karanlığa gömülür
      cards.forEach((card, i) => {
        const theta = ((state.angle + i * STEP) * Math.PI) / 180;
        const depth = Math.cos(theta); // 1 = tam önde, -1 = tam arkada
        // Arkaya dönen kartlar tamamen kaybolur (aynalanmış metin görünmesin)
        const o = Math.max(0.015, Math.pow(Math.max(0, depth), 0.85));
        card.style.opacity = o.toFixed(3);
        card.style.pointerEvents = depth > 0.25 ? "auto" : "none";
      });
    };
    render();

    const tick = (_t: number, deltaMS: number) => {
      const dt = deltaMS / 1000;
      if (!state.dragging) {
        state.vel += (state.target - state.vel) * Math.min(1, dt * 2.2);
        state.angle += state.vel * dt;
        render();
      }
    };
    gsap.ticker.add(tick);

    // Hover: nazikçe yavaşla
    const slow = () => { state.target = -1.2; };
    const resume = () => { state.target = -7; };
    scene.addEventListener("mouseenter", slow);
    scene.addEventListener("mouseleave", resume);

    // Sürükleyerek çevirme (mouse + dokunmatik)
    const onDown = (e: PointerEvent) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.moved = 0;
      state.dragVel = 0;
      scene.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      state.lastX = e.clientX;
      state.moved += Math.abs(dx);
      state.angle += dx * 0.28;
      state.dragVel = dx * 0.28 * 60; // yaklaşık derece/saniye
      render();
    };
    const onUp = () => {
      if (!state.dragging) return;
      state.dragging = false;
      // Fırlatma hızıyla devam et, sonra doğal hıza dön
      state.vel = Math.max(-160, Math.min(160, state.dragVel));
      if (state.moved > 6) {
        suppressClick.current = true;
        setTimeout(() => { suppressClick.current = false; }, 120);
      }
    };
    scene.addEventListener("pointerdown", onDown);
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerup", onUp);
    scene.addEventListener("pointercancel", onUp);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", layout);
      scene.removeEventListener("mouseenter", slow);
      scene.removeEventListener("mouseleave", resume);
      scene.removeEventListener("pointerdown", onDown);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerup", onUp);
      scene.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      id="hizmetler"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden bg-ink py-28 md:py-36"
    >
      {/* Zemin ışıması */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 108%, rgba(236,28,36,0.08), transparent 62%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-mist md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-almila-red" />
              02 — Hizmetler
            </p>
            <h2
              data-reveal
              className="mt-6 font-display text-4xl font-normal leading-[1.08] tracking-tight text-paper md:text-6xl"
            >
              Sekiz disiplin,{" "}
              <em className="font-light italic text-almila-red">tek standart.</em>
            </h2>
          </div>
          <p data-reveal className="hidden max-w-xs text-sm leading-relaxed text-mist lg:block">
            Carousel kendiliğinden döner — sürükleyerek çevirin, incelemek
            istediğiniz karta tıklayın.
          </p>
        </div>
      </div>

      {/* 3D silindir sahnesi */}
      <div
        ref={sceneRef}
        data-reveal
        className="ring-scene relative mx-auto mt-10 h-[380px] w-full max-w-6xl cursor-grab touch-pan-y select-none active:cursor-grabbing md:mt-14 md:h-[460px]"
      >
        <div ref={ringRef} className="ring-track absolute left-1/2 top-1/2 h-0 w-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/hizmet/${service.slug}`}
                data-ring-card
                onClick={(e) => {
                  if (suppressClick.current) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  navigate(`/hizmet/${service.slug}`);
                }}
                className="ring-card-slot group absolute left-0 top-0 flex h-[330px] flex-col justify-between rounded-2xl border border-line-dark bg-ink-2/90 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-almila-red/50 md:h-[400px] md:p-7"
                draggable={false}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-paper/80 transition-colors duration-300 group-hover:border-almila-red group-hover:text-almila-red">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>
                  <span className="font-display text-5xl italic text-outline md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-[1.45rem] leading-snug text-paper md:text-[1.6rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-mist">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-almila-red">
                    İncele
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Numaralı dizin — erişilebilir liste */}
      <div className="relative mx-auto mt-16 w-full max-w-7xl px-5 md:mt-20 md:px-8">
        <div className="grid md:grid-cols-2 md:gap-x-14">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              to={`/hizmet/${service.slug}`}
              data-reveal
              data-reveal-delay={`${(i % 4) * 0.06}`}
              className="group flex items-center justify-between border-b border-line-dark py-5"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-display text-sm italic text-mist/70 transition-colors group-hover:text-almila-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg text-paper/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-paper md:text-xl">
                  {service.title}
                </span>
              </span>
              <ArrowUpRight
                size={17}
                className="text-mist/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-almila-red"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
