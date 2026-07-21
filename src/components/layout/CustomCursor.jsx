import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';

/**
 * Curseur personnalisé « cinématique ».
 *
 * Toujours en mix-blend-mode:difference + blanc → il s'inverse par rapport à
 * n'importe quel fond, donc reste visible partout (blanc, noir, rose, vert…).
 *
 * États : point plein (défaut) · anneau moyen (liens) · grand anneau + label
 * (éléments [data-cursor], le label venant de l'attribut).
 *
 * MULTILINGUE : les composants posent déjà un `data-cursor` TRADUIT (les
 * libellés viennent de `ui[lang].cursor`). Deux précautions ici :
 *   1. le repli quand l'attribut est vide suit la langue courante ;
 *   2. si l'utilisateur change de langue ALORS QU'IL SURVOLE un élément, le
 *      label affiché serait figé dans l'ancienne langue (il n'est relu qu'au
 *      `mouseover`) → on garde une référence sur l'élément survolé et on relit
 *      son attribut à chaque changement de langue.
 *
 * NB : on utilise `data-cursor` (et NON `data-discover`) car React Router
 * injecte lui-même un `data-discover="true"` sur chaque <Link> — la collision
 * faisait apparaître « true » dans le curseur.
 */
export default function CustomCursor() {
  const { lang } = useLanguage();
  const C = (ui[lang] || ui.FR).cursor;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cfg = { damping: 30, stiffness: 260, mass: 0.55 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);

  const [mode, setMode] = useState('default'); // 'default' | 'link' | 'discover'
  const [label, setLabel] = useState(C.discover);
  const [enabled, setEnabled] = useState(false);

  // Dernier élément [data-cursor] survolé — sert à relire son libellé traduit
  // quand la langue change sans que la souris ne bouge.
  const hovered = useRef(null);
  // Repli de libellé toujours à jour, sans réabonner les écouteurs à chaque
  // changement de langue.
  const fallback = useRef(C.discover);
  fallback.current = C.discover;

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const cursorEl = e.target.closest?.('[data-cursor]');
      if (cursorEl) {
        hovered.current = cursorEl;
        setMode('discover');
        setLabel(cursorEl.getAttribute('data-cursor') || fallback.current);
        return;
      }
      hovered.current = null;
      if (e.target.closest?.('a, button, [data-link]')) {
        setMode('link');
        return;
      }
      setMode('default');
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  // Traduction « à chaud » : au changement de langue, on relit l'attribut de
  // l'élément encore survolé (React l'a déjà re-rendu avec le libellé traduit).
  // Hors survol, on remet le libellé par défaut dans la nouvelle langue — sans
  // quoi le tout premier survol afficherait encore la langue précédente.
  useEffect(() => {
    const el = hovered.current;
    setLabel(el?.isConnected ? el.getAttribute('data-cursor') || C.discover : C.discover);
  }, [lang, C.discover]);

  if (!enabled) return null;

  const enlarged = mode === 'discover' || mode === 'link';
  const size = mode === 'discover' ? 104 : mode === 'link' ? 38 : 12;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, mixBlendMode: 'difference' }}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          borderWidth: enlarged ? 1.5 : 0,
          backgroundColor: enlarged ? 'rgba(255,255,255,0)' : '#ffffff',
        }}
        transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
        style={{ borderColor: '#ffffff', borderStyle: 'solid' }}
        className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
      >
        <motion.span
          animate={{ opacity: mode === 'discover' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.18em] text-white"
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
