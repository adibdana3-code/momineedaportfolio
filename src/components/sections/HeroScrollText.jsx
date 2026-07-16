import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskReveal from '../ui/MaskReveal.jsx';
import fr from '../../content/fr.js';

/**
 * Hero — le « mot géant » lié au scroll.
 * - Nom colossal en deux lignes, révélation masquée à l'entrée.
 * - Léger parallaxe / zoom arrière du nom au défilement (useScroll).
 * - Cartouche image décalé (placeholder brook) avec parallaxe interne.
 */
export default function HeroScrollText() {
  const { hero } = fr;
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Zoom arrière + remontée douce du nom au défilement
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.35]);
  // Parallaxe du cartouche image (dérive plus lente)
  const coverY = useTransform(scrollYProgress, [0, 1], ['0px', '120px']);

  const microCls =
    'font-sans text-[10px] uppercase tracking-editorial text-olive leading-loose';

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden px-10 pb-[70px] pt-[150px]"
    >
      {/* Ligne supérieure */}
      <div className="flex items-start justify-between">
        <div className={microCls}>
          {hero.kicker}
          <br />
          {hero.subKicker}
        </div>
      </div>

      {/* Cartouche image décalé (placeholder) */}
      <div
        data-discover="Voir"
        className="absolute right-[5vw] top-[20vh] z-[1] aspect-[3/4] w-[33vw] max-w-[500px] overflow-hidden bg-brook"
      >
        <motion.div
          style={{ y: coverY }}
          className="absolute inset-x-0 -inset-y-[9%] flex items-start justify-end p-4"
        >
          <div className={`text-right ${microCls}`}>
            {hero.location}
            <br />
            {hero.availability}
          </div>
        </motion.div>
      </div>

      {/* Nom colossal */}
      <motion.div
        style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
        className="relative z-[2] mt-[15vh] origin-left will-change-transform"
      >
        <MaskReveal
          as="h1"
          className="m-0 font-display text-[clamp(70px,16vw,250px)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-forest"
        >
          {hero.nameLine1}
        </MaskReveal>
        <div className="pl-[8vw]">
          <MaskReveal
            as="h1"
            delay={0.08}
            className="m-0 font-display text-[clamp(70px,16vw,250px)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]"
          >
            <span
              style={{ color: 'transparent', WebkitTextStroke: '1.4px #933B5B' }}
            >
              {hero.nameLine2}
            </span>
          </MaskReveal>
        </div>
      </motion.div>

      {/* Pied du hero */}
      <div className="absolute bottom-10 left-10 flex max-w-[340px] items-end gap-[60px]">
        <p className="m-0 text-[13px] leading-[1.7] text-forest">{hero.intro}</p>
      </div>
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
        <span className="font-sans text-[10px] uppercase tracking-editorial text-olive">
          {hero.scroll}
        </span>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[54px] w-px origin-top bg-olive"
        />
      </div>
    </section>
  );
}
