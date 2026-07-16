import { motion } from 'framer-motion';
import ProjectTile from '../ui/ProjectTile.jsx';
import { projects } from '../../content/projects.js';

// Rythme éditorial asymétrique (desktop), accordé à l'orientation des couvertures.
// Base : pile verticale sur mobile.
const TILES = [
  { span: 'md:col-span-5', aspect: 'aspect-[3/4]' }, // P1 — perspective (portrait)
  { span: 'md:col-span-7 md:mt-24', aspect: 'aspect-[3/2]' }, // P2 — villa (paysage)
  { span: 'md:col-span-6', aspect: 'aspect-[4/3]' }, // P3 — maison (paysage)
  { span: 'md:col-span-6 md:mt-20', aspect: 'aspect-[4/3]' }, // P4 — détails (paysage)
  { span: 'md:col-span-6 md:col-start-4', aspect: 'aspect-[4/3]' }, // P5 — hamra (centré)
];

/** Grille de projets asymétrique avec survol A→B. */
export default function ProjectGrid() {
  return (
    <section id="projets" className="border-t-2 border-ink px-6 py-24 md:px-10 md:py-28">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
          (Projets sélectionnés)
        </span>
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
          Index — 05
        </span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="mt-14 grid grid-cols-12 gap-x-6 gap-y-16 md:gap-y-24"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className={`col-span-12 ${TILES[i].span}`}
          >
            <ProjectTile project={p} tile={{ span: '', aspect: TILES[i].aspect }} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
