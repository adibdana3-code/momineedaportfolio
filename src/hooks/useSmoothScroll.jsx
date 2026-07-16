import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialise le défilement fluide Lenis (Studio Freight) et le synchronise
 * avec la boucle d'animation. Retourne l'instance via un callback optionnel
 * pour permettre à GSAP ScrollTrigger de s'y accrocher plus tard.
 *
 * Courbe et durée choisies pour un mouvement « lourd et luxueux »
 * conforme au design system.
 */
export function useSmoothScroll(onInit) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (typeof onInit === 'function') onInit(lenis);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
