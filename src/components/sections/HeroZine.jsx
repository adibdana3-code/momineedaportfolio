import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { architectureProjects, COLOR_HEX, COLOR_TEXT } from '../../content/projects.js';

const t = {
  FR: {
    kicker: 'Portfolio — Architecture & Espaces',
    intro:
      "Une pratique de l'espace pensée comme un récit — du croquis à la matière bâtie.",
    featured: 'En vitrine',
  },
  EN: {
    kicker: 'Portfolio — Architecture & Space',
    intro: 'A practice of space conceived as a narrative — from sketch to built matter.',
    featured: 'Featured',
  },
  DE: {
    kicker: 'Portfolio — Architektur & Raum',
    intro: 'Eine Praxis des Raums als Erzählung — von der Skizze zur gebauten Materie.',
    featured: 'Im Fokus',
  },
  AR: {
    kicker: 'بورتفوليو — عمارة ومساحات',
    intro: 'ممارسة للمكان تُصاغ كسرد — من المخطط الأولي إلى المادة المبنية.',
    featured: 'مختارة',
  },
};

// Ne garde que les projets pourvus d'une couverture (visuel « en vitrine »).
const featured = architectureProjects.filter((p) => p.cover);

/**
 * Hero — nom colossal en serif italique + « projet en vitrine » qui défile
 * automatiquement (fondu enchaîné toutes les ~3,6 s). Le visuel dynamique et
 * l'ombre brutale colorée (couleur d'accent du projet) cassent le côté trop
 * blanc de l'accueil et donnent le ton « magazine ».
 */
export default function HeroZine() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;

  const [i, setI] = useState(0);
  const active = featured[i] || null;

  // Rotation auto (désactivée si l'utilisateur préfère les mouvements réduits).
  useEffect(() => {
    if (featured.length < 2) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % featured.length), 3600);
    return () => clearInterval(id);
  }, []);

  const accent = active ? COLOR_HEX[active.color] : '#0A0A0A';

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-28 md:px-10"
    >
      <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
        {c.kicker}
      </span>

      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="mt-3 font-serif text-[clamp(56px,12vw,190px)] italic leading-[0.88] tracking-tight text-ink"
        >
          Dana Adib
        </motion.h1>
      </div>

      {/* Rangée : intro (gauche) + projet « en vitrine » dynamique (droite). */}
      <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
        <p className="max-w-xl font-sans text-base leading-relaxed text-ink/70 md:col-span-5 md:row-start-1">
          {c.intro}
        </p>

        {active && (
          <div className="md:col-span-6 md:col-start-7 md:row-start-1">
            <div className="mb-3 flex items-center justify-between">
              <span
                className="font-sans text-[10px] uppercase tracking-editorial"
                style={{ color: accent }}
              >
                {c.featured}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-editorial text-ink/40">
                {String(i + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
              </span>
            </div>

            <Link
              to={`/projet/${active.slug}`}
              data-cursor="Découvrir"
              className="group relative block aspect-[16/11] w-full overflow-hidden border-2 border-ink transition-transform duration-500 ease-cine"
              style={{ boxShadow: `12px 12px 0 0 ${accent}` }}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={active.slug}
                  src={active.cover}
                  alt={active.title[lang]}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Cartel bas : numéro + titre du projet en vitrine */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-12">
                <span className="font-serif text-[clamp(18px,2.4vw,30px)] italic leading-none text-paper">
                  {active.title[lang]}
                </span>
                <span className={`font-sans text-[11px] uppercase tracking-editorial ${COLOR_TEXT[active.color]}`}>
                  ({active.num})
                </span>
              </div>
            </Link>

            {/* Puces de navigation (indiquent le projet courant, cliquables). */}
            <div className="mt-4 flex flex-wrap gap-2">
              {featured.map((p, n) => (
                <button
                  key={p.slug}
                  type="button"
                  data-link
                  onClick={() => setI(n)}
                  aria-label={p.title[lang]}
                  className="h-2 rounded-full transition-all duration-500 ease-cine"
                  style={{
                    width: n === i ? 26 : 8,
                    background: n === i ? accent : 'rgba(10,10,10,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
