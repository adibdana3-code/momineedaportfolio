import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import fr from '../../content/fr.js';

/**
 * « Mot géant » lié au scroll (Chapitre 01).
 * Section haute (230vh) avec un bloc collant (sticky) : le mot apparaît
 * (fade-in), tenu, puis disparaît (fade-out), avec un léger zoom arrière.
 */
export default function GiantWord() {
  const { chapter, caption, word } = fr.giant;
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 0.9]);

  const micro = 'font-sans text-[10px] uppercase tracking-editorial text-olive';

  return (
    <section ref={wrapRef} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className={`absolute left-10 top-10 ${micro}`}>{chapter}</div>
        <div className={`absolute bottom-10 right-10 ${micro}`}>{caption}</div>
        <motion.h2
          style={{ opacity, scale }}
          className="m-0 whitespace-nowrap font-display text-[min(30vw,440px)] font-extrabold uppercase leading-[0.8] tracking-[0.06em] text-amaranth will-change-transform"
        >
          {word}
        </motion.h2>
      </div>
    </section>
  );
}
