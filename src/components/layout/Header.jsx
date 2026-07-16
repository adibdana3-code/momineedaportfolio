import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage, LANGS } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';
import MenuOverlay from './MenuOverlay.jsx';
import Magnetic from '../ui/Magnetic.jsx';

/**
 * En-tête fixe, multilingue.
 *   - À gauche : bouton hamburger (fixe) qui ouvre le grand menu overlay,
 *     puis marque en serif italique.
 *   - À droite : sélecteur de langue FR·EN·DE (langue active soulignée).
 * Le header reste au-dessus de l'overlay (z-50) : le hamburger se transforme
 * en croix pour refermer le menu.
 */
export default function Header() {
  const { lang, setLang } = useLanguage();
  const M = (ui[lang] || ui.FR).menu;
  const [open, setOpen] = useState(false);

  // Traits du hamburger : animés en croix à l'ouverture.
  const bar = 'absolute left-0 h-[1.5px] w-6 bg-ink';
  const barTrans = { duration: 0.4, ease: [0.76, 0, 0.24, 1] };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-5 md:gap-7">
          {/* Hamburger → croix */}
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? M.close : M.open}
              aria-expanded={open}
              data-link
              className="relative flex h-6 w-6 items-center justify-center"
            >
              <span className="relative block h-4 w-6">
                <motion.span
                  className={`${bar} top-0`}
                  animate={open ? { rotate: 45, top: 7 } : { rotate: 0, top: 0 }}
                  transition={barTrans}
                />
                <motion.span
                  className={`${bar} top-1/2 -translate-y-1/2`}
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={`${bar} bottom-0`}
                  animate={open ? { rotate: -45, bottom: 7 } : { rotate: 0, bottom: 0 }}
                  transition={barTrans}
                />
              </span>
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="font-serif text-2xl italic leading-none text-ink"
            >
              Dana Adib
            </Link>
          </Magnetic>
        </div>

        {/* Sélecteur de langue */}
        <div className="flex items-center gap-2.5">
          {LANGS.map((code) => (
            <Magnetic key={code} strength={0.45}>
              <button
                type="button"
                onClick={() => setLang(code)}
                data-link
                className={`font-sans text-[11px] uppercase tracking-editorial transition-all duration-300 ${
                  lang === code
                    ? 'text-ink underline decoration-orange decoration-2 underline-offset-4'
                    : 'text-ink/40 hover:text-ink'
                }`}
              >
                {code}
              </button>
            </Magnetic>
          ))}
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
