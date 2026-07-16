import { motion } from 'framer-motion';

/**
 * Ligne structurelle qui se « dessine » (scaleX 0 → 1) à l'entrée dans le champ.
 * Évoque le trait d'un plan technique.
 */
export default function DrawLine({ className = '' }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`h-px origin-left bg-forest/30 ${className}`}
    />
  );
}
