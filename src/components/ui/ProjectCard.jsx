import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskReveal from './MaskReveal.jsx';
import PlaceholderImage from './PlaceholderImage.jsx';

// Trame « croquis / plan » (grille fine sur fond chalk)
const SKETCH_BG =
  'repeating-linear-gradient(0deg,#d7c8ac 0,#d7c8ac 1px,transparent 1px,transparent 26px),' +
  'repeating-linear-gradient(90deg,#d7c8ac 0,#d7c8ac 1px,transparent 1px,transparent 26px),#E3D6BF';

/**
 * Carte projet de la grille asymétrique.
 * Interaction clé : au survol, la trame « croquis » se fond pour révéler
 * le rendu (fondu A→B). Léger parallaxe interne au défilement.
 */
export default function ProjectCard({ project }) {
  const [hover, setHover] = useState(false);
  const frameRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <article className={`${project.layout} ${project.offset}`}>
      <div
        ref={frameRef}
        data-cross
        data-discover="Voir"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`relative w-full overflow-hidden ${project.aspect} ${project.bg}`}
      >
        {/* Rendu (arrière) + parallaxe */}
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
          <PlaceholderImage
            src={project.img}
            alt={`${project.title} — rendu`}
            label={`Rendu — ${project.title}`}
          />
        </motion.div>

        {/* Trame croquis (avant), se fond au survol */}
        <div
          className="absolute inset-0 z-[3] flex items-end p-4 transition-opacity duration-1000 ease-cine"
          style={{ background: SKETCH_BG, opacity: hover ? 0 : 1 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-editorial text-olive">
            {project.sketch}
          </span>
        </div>

        {/* Numéro */}
        <div
          className="absolute left-4 top-4 z-[4] font-sans text-[10px] uppercase tracking-editorial text-forest"
          style={{ mixBlendMode: 'difference' }}
        >
          ({project.num})
        </div>
      </div>

      {/* Titre + lieu */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <MaskReveal
          as="h3"
          className="m-0 font-display text-[clamp(24px,3vw,46px)] font-bold uppercase tracking-[-0.01em] text-forest"
        >
          {project.title}
        </MaskReveal>
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-editorial text-olive">
          {project.place}
        </span>
      </div>
      <div className="mt-2 font-sans text-[10px] uppercase tracking-editorial text-olive">
        {project.meta}
      </div>
    </article>
  );
}
