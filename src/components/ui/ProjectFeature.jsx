import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { COLOR_BG, COLOR_TEXT, COLOR_GROUP_HOVER } from '../../content/projects.js';
import { ui } from '../../content/ui.js';
import Magnetic from './Magnetic.jsx';

/**
 * « Feature » projet façon magazine : image d'un côté, texte de l'autre,
 * qui s'échangent d'une ligne à l'autre (alternance gauche/droite au scroll).
 * Pas de contour dur — révélation douce (fondu + montée) et léger parallaxe
 * sur l'image. Sur mobile : image puis texte, empilés.
 *
 * @param {object} project
 * @param {number} index    parité → alternance
 * @param {string} aspect   ratio de la couverture (accordé à l'orientation)
 */
export default function ProjectFeature({ project, index, aspect = 'aspect-[4/3]' }) {
  const { lang } = useLanguage();
  const T = ui[lang] || ui.FR;
  const ref = useRef(null);
  const flip = index % 2 === 1; // impair → image à droite, texte à gauche
  const place = project.place[lang] ?? project.place;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="grid grid-cols-12 items-center gap-8 md:gap-12"
    >
      {/* Image (DOM-first → apparaît en premier sur mobile) */}
      <Link
        to={`/projet/${project.slug}`}
        data-cursor="Découvrir"
        className={`group relative col-span-12 block overflow-hidden md:col-span-7 ${
          flip ? 'md:col-start-6' : 'md:col-start-1'
        } ${aspect}`}
      >
        {project.cover ? (
          <motion.div style={{ y: imgY }} className="absolute inset-x-0 -inset-y-[6%]">
            <img
              src={project.hover || project.cover}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-105 object-cover"
            />
            <img
              src={project.cover}
              alt={project.title[lang]}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-cine group-hover:opacity-0"
            />
          </motion.div>
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${COLOR_BG[project.color]} transition-transform duration-700 ease-cine group-hover:scale-[1.03]`}
          >
            <span className="px-6 text-center font-serif text-[clamp(28px,4vw,56px)] italic leading-tight text-ink">
              {project.title[lang]}
            </span>
          </div>
        )}
      </Link>

      {/* Texte */}
      <div
        className={`col-span-12 flex flex-col justify-center md:col-span-4 md:row-start-1 ${
          flip ? 'md:col-start-1' : 'md:col-start-9'
        }`}
      >
        <span className={`font-sans text-[11px] uppercase tracking-editorial ${COLOR_TEXT[project.color]}`}>
          ({project.num})
        </span>
        <Link to={`/projet/${project.slug}`} className="group mt-3">
          <h3
            className={`m-0 font-serif text-[clamp(32px,4.2vw,68px)] italic leading-[0.95] text-ink transition-colors duration-300 ${COLOR_GROUP_HOVER[project.color]}`}
          >
            {project.title[lang]}
          </h3>
        </Link>
        <div className="mt-4 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
          {place}
          {project.year && ` — ${project.year}`} · {project.typology[lang]}
        </div>
        <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-ink/70">
          {project.summary[lang]}
        </p>
        <Magnetic strength={0.4} className="mt-7 self-start">
          <Link
            to={`/projet/${project.slug}`}
            data-link
            className="inline-block font-sans text-[11px] uppercase tracking-editorial text-ink underline decoration-2 underline-offset-4 transition-colors duration-300 hover:text-orange"
          >
            {T.feature.cta}
          </Link>
        </Magnetic>
      </div>
    </motion.div>
  );
}
