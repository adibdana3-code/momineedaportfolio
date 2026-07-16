import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';

const t = {
  FR: {
    kicker: 'Portfolio — Architecture & Espaces',
    intro:
      "Une pratique de l'espace pensée comme un récit — du croquis à la matière bâtie.",
  },
  EN: {
    kicker: 'Portfolio — Architecture & Space',
    intro: 'A practice of space conceived as a narrative — from sketch to built matter.',
  },
  DE: {
    kicker: 'Portfolio — Architektur & Raum',
    intro: 'Eine Praxis des Raums als Erzählung — von der Skizze zur gebauten Materie.',
  },
};

/** Hero — nom colossal en serif italique, épuré (sans pastille). */
export default function HeroZine() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;

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
          className="mt-3 font-serif text-[clamp(64px,15vw,240px)] italic leading-[0.88] tracking-tight text-ink"
        >
          Dana Adib
        </motion.h1>
      </div>

      <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/70">
        {c.intro}
      </p>
    </section>
  );
}
