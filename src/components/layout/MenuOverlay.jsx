import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGS } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';
import { architectureProjects, artProjects, COLOR_TEXT } from '../../content/projects.js';
import Magnetic from '../ui/Magnetic.jsx';

const EASE = [0.76, 0, 0.24, 1];

// Apparition en cascade des lignes du menu.
const listV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const itemV = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease: EASE } },
};

/** Sous-menu déroulant d'une catégorie de projets (Architecture / Art). */
function ProjectGroup({ label, items, defaultOpen, onNavigate }) {
  const { lang } = useLanguage();
  const C = (ui[lang] || ui.FR).cursor;
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-ink/15 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-link
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/60">
          {label} ({String(items.length).padStart(2, '0')})
        </span>
        <span
          className={`font-sans text-[13px] text-ink/50 transition-transform duration-500 ease-cine ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="m-0 list-none overflow-hidden p-0"
          >
            {items.map((p) => (
              <li key={p.slug} className="mt-3 first:mt-4">
                <Link
                  to={`/projet/${p.slug}`}
                  onClick={onNavigate}
                  data-cursor={C.view}
                  className="group flex items-baseline gap-3"
                >
                  <span className={`font-sans text-[10px] uppercase tracking-editorial ${COLOR_TEXT[p.color]}`}>
                    {p.num}
                  </span>
                  <span className="pb-[0.1em] font-serif text-[clamp(20px,3.4vw,34px)] italic leading-tight text-ink transition-transform duration-500 ease-cine group-hover:translate-x-2">
                    {p.title[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Menu plein écran (overlay). Ouvert par le hamburger du Header.
 *   - Colonne gauche : grandes sections (scroll fluide Lenis).
 *   - Colonne droite : deux sous-menus distincts Architecture / Art,
 *     chaque projet menant à sa page /projet/:slug.
 * Verrouille le scroll de fond (Lenis stop) tant qu'il est ouvert.
 */
export default function MenuOverlay({ open, onClose }) {
  const { lang, setLang } = useLanguage();
  const L = ui[lang] || ui.FR;
  const M = L.menu;
  const C = L.cursor;
  const navigate = useNavigate();
  const location = useLocation();

  // Verrou du défilement de fond pendant l'ouverture.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Scroll fluide vers une section (gère le cas « on n'est pas sur l'accueil »).
  const goSection = (id) => {
    onClose();
    const doScroll = () => {
      const lenis = window.__lenis;
      lenis?.start();
      const to = id === 'top' ? 0 : `#${id}`;
      if (lenis) lenis.scrollTo(to, { offset: -20, duration: 1.2 });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 140);
    } else {
      setTimeout(doScroll, 60);
    }
  };

  // « Projets » n'est plus une section de l'accueil (couverture) : les projets
  // sont listés sur la couverture + dans les sous-menus ci-contre. On garde donc
  // les ancres réellement présentes sur la page d'accueil.
  const sections = [
    { id: 'top', label: M.home },
    { id: 'art', label: M.art },
    { id: 'skills', label: M.skills },
    { id: 'contact', label: M.contact },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-40 overflow-y-auto bg-paper text-ink"
          data-lenis-prevent
        >
          <div className="min-h-full px-6 pb-16 pt-24 md:px-10 md:pt-28">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              {/* Colonne gauche — grandes sections */}
              <nav className="md:col-span-6">
                <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/40">
                  {M.sections}
                </span>
                <motion.ul
                  variants={listV}
                  initial="hidden"
                  animate="show"
                  className="m-0 mt-6 list-none p-0"
                >
                  {sections.map((s) => (
                    <li key={s.id} className="overflow-hidden py-1.5">
                      <motion.button
                        variants={itemV}
                        type="button"
                        onClick={() => goSection(s.id)}
                        data-cursor={C.go}
                        className="block pb-[0.2em] font-serif text-[clamp(38px,7vw,84px)] italic leading-[0.98] tracking-tight text-ink transition-colors duration-300 hover:text-orange"
                      >
                        {s.label}
                      </motion.button>
                    </li>
                  ))}
                </motion.ul>
              </nav>

              {/* Colonne droite — sous-menus projets + langues */}
              <div className="md:col-span-6 md:pl-8">
                <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/40">
                  {M.projets}
                </span>
                <div className="mt-6">
                  <ProjectGroup
                    label={M.architecture}
                    items={architectureProjects}
                    defaultOpen
                    onNavigate={onClose}
                  />
                  <ProjectGroup
                    label={M.catArt}
                    items={artProjects}
                    defaultOpen
                    onNavigate={onClose}
                  />
                </div>

                {/* Sélecteur de langue (miroir du header, pratique sur mobile) */}
                <div className="mt-10 flex items-center gap-4 border-t border-ink/15 pt-6">
                  {LANGS.map((code) => (
                    <Magnetic key={code} strength={0.45}>
                      <button
                        type="button"
                        onClick={() => setLang(code)}
                        data-link
                        className={`font-sans text-[12px] uppercase tracking-editorial transition-colors duration-300 ${
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
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
