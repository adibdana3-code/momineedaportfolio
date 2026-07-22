import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

/**
 * Lightbox éditoriale — modale plein écran pour parcourir TOUTES les images
 * d'une page projet (chapitres + documents de fin), dans l'ordre du défilement.
 *
 * Fond blanc « papier » : la page projet est en #FFFFFF, la modale prolonge la
 * feuille plutôt que de basculer sur le fond noir des visionneuses génériques.
 *
 * Navigation : flèches à l'écran, ← → au clavier, Échap pour fermer.
 * Le parcours est CYCLIQUE (dernière → première).
 *
 * `items` : [{ src, label }] où `label` est un objet i18n { FR, EN, DE, AR }.
 * `index` : index courant, ou null quand la modale est fermée.
 */
export default function Lightbox({ items, index, onClose, onIndexChange, lang, labels }) {
  const open = index !== null && index !== undefined;
  const total = items?.length || 0;
  // Mémorise l'élément qui avait le focus pour le rendre à la fermeture.
  const restoreRef = useRef(null);
  const closeRef = useRef(null);

  const go = useCallback(
    (delta) => {
      if (!total) return;
      onIndexChange((index + delta + total) % total);
    },
    [index, total, onIndexChange],
  );

  // Clavier : Échap ferme, ← → naviguent.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onClose]);

  // Gèle le défilement de la page derrière la modale. Lenis pilote le scroll
  // (smooth-scroll) : `overflow: hidden` seul ne suffit pas, il faut aussi
  // mettre son RAF en pause, sinon la page continue de glisser au trackpad.
  useEffect(() => {
    if (!open) return undefined;
    const lenis = window.__lenis;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    restoreRef.current = document.activeElement;
    // Le focus part sur le bouton Fermer → la modale est pilotable au clavier
    // dès l'ouverture, et Échap est immédiatement actif.
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      restoreRef.current?.focus?.();
    };
  }, [open]);

  // Fermée = RIEN dans le DOM. Volontairement sans `AnimatePresence` : le
  // fondu de sortie laissait la modale montée en `opacity: 0`, soit un calque
  // plein écran invisible qui interceptait tous les clics de la page ensuite.
  // La disparition est donc immédiate ; seule l'ouverture est animée.
  if (!open || !total) return null;

  const item = items[index];
  const caption = item.label?.[lang] || item.label?.FR || '';

  const arrowClass =
    'pointer-events-auto flex h-14 w-14 items-center justify-center border-2 border-ink ' +
    'bg-white font-serif text-[26px] leading-none text-ink transition-colors duration-300 ' +
    'ease-cine hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[80] flex flex-col bg-white"
      // Clic sur le fond = fermeture (comportement attendu d'une modale).
      onClick={onClose}
    >
      {/* ── Barre haute : compteur + fermer ── */}
      <div className="flex shrink-0 items-center justify-between border-b-2 border-ink px-6 py-4 md:px-10">
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          data-link
          aria-label={labels.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="font-sans text-[11px] uppercase tracking-editorial text-ink transition-colors duration-300 ease-cine hover:text-orange"
        >
          {labels.close} ✕
        </button>
      </div>

      {/* ── Scène : image + flèches ── */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 md:px-24">
        {/* PAS d'AnimatePresence imbriquée ici : un AnimatePresence enfant
                empêche le parent de terminer sa sortie, et la modale restait
                dans le DOM en `opacity: 0` — un calque plein écran invisible qui
                avalait tous les clics de la page. Le `key` suffit : changer
                d'image remonte le nœud et rejoue le fondu d'entrée. */}
        <motion.img
          key={item.src}
          src={item.src}
          alt={caption}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          // `object-contain` : jamais de recadrage — les plans, coupes et
          // élévations doivent rester lisibles en entier.
          className="max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {total > 1 && (
          // `dir="ltr"` FORCÉ : en arabe, <html dir="rtl"> inverserait
          // `justify-between`, plaçant la flèche « précédent » (←) à droite et
          // « suivant » (→) à gauche. On veut EXACTEMENT le même sens et la même
          // logique qu'en FR/EN/DE — flèche gauche = précédent, droite = suivant,
          // quelle que soit la langue.
          <div
            dir="ltr"
            className="pointer-events-none absolute inset-x-3 flex items-center justify-between md:inset-x-8"
          >
            <button
              type="button"
              data-link
              aria-label={labels.prev}
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className={arrowClass}
            >
              ←
            </button>
            <button
              type="button"
              data-link
              aria-label={labels.next}
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className={arrowClass}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* ── Cartel sous l'image ── */}
      <div className="shrink-0 border-t-2 border-ink px-6 py-5 text-center md:px-10">
        <p className="m-0 font-sans text-[11px] uppercase tracking-editorial text-ink/60">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}
