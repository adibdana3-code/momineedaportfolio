import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskReveal from '../ui/MaskReveal.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import fr from '../../content/fr.js';

/**
 * Section « Art & Expérimentations » : défilement horizontal piloté par le
 * scroll vertical. Fond forest sombre (rupture). La piste (track) se translate
 * de 0 à -(largeur débordante) sur la hauteur de la section.
 */
export default function ArtScroll() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const maxX = useRef(0);
  const [, force] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  // Lit maxX.current dynamiquement (recalculé au resize)
  const x = useTransform(scrollYProgress, (v) => -(maxX.current * v));

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      maxX.current = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      force((n) => n + 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { title, scrollHint, cartel, pieces } = fr.art;

  return (
    <section id="art">
      {/* En-tête de section */}
      <div className="flex items-baseline justify-between px-10 pb-[60px] pt-[110px]">
        <MaskReveal
          as="h2"
          className="m-0 font-display text-[clamp(30px,5vw,74px)] font-extrabold uppercase tracking-[-0.01em] text-forest"
        >
          {title}
        </MaskReveal>
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-editorial text-amaranth">
          {scrollHint}
        </span>
      </div>

      {/* Piste horizontale */}
      <div ref={wrapRef} className="relative h-[340vh] bg-forest text-chalk">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="absolute left-10 top-10 font-sans text-[10px] uppercase tracking-editorial text-brook">
            {cartel}
          </div>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-16 px-20 will-change-transform"
          >
            {pieces.map((p) => (
              <figure
                key={p.id}
                className={`m-0 flex-none ${p.low ? 'self-end' : ''}`}
                style={{ width: p.w }}
              >
                <div
                  data-discover="Voir"
                  className={`overflow-hidden ${p.bg}`}
                  style={{ width: p.w, height: p.h }}
                >
                  <PlaceholderImage label={p.title} />
                </div>
                <figcaption className="mt-[18px]">
                  <div className="font-display text-[14px] uppercase tracking-[0.02em] text-chalk">
                    {p.title}
                  </div>
                  <div className="mt-2 font-sans text-[10px] uppercase leading-[1.9] tracking-[0.22em] text-brook">
                    {p.medium}
                    <br />
                    {p.spec}
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
