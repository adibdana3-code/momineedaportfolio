import { motion } from 'framer-motion';

/**
 * Révélation « masquée » : le conteneur cache le débordement, l'enfant
 * remonte de translateY(112%) → 0. Utilisé pour les titres éditoriaux.
 *
 * Important : le déclencheur `whileInView` est porté par le CONTENEUR (jamais
 * translaté, donc toujours détecté à l'entrée), et l'enfant s'anime via des
 * variants. Observer l'enfant translaté de 112 % échouerait (il démarre hors
 * du viewport et n'entrerait jamais « en vue »).
 *
 * @param {string}  as     - balise de l'élément animé (h1, h2, div…)
 * @param {number}  delay  - décalage d'entrée en secondes
 * @param {boolean} once   - n'anime qu'une fois (défaut true)
 */
export default function MaskReveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  once = true,
}) {
  const M = motion[as] || motion.div;
  return (
    <motion.div
      className="overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -8% 0px' }}
    >
      <M
        variants={{ hidden: { y: '112%' }, visible: { y: '0%' } }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {children}
      </M>
    </motion.div>
  );
}
