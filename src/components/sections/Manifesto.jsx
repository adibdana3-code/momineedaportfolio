import { motion } from 'framer-motion';
import fr from '../../content/fr.js';

/**
 * Manifeste éditorial : petite étiquette + phrase manifeste en grande police
 * display, avec un fragment mis en exergue (italique amaranth).
 * Grille 12 colonnes, révélation en fondu montant.
 */
export default function Manifesto() {
  const { tag, statement } = fr.manifesto;
  // Le fragment entre ** ** est rendu en italique amaranth
  const parts = statement.split('**');

  return (
    <section className="grid grid-cols-12 items-start gap-10 px-10 py-[130px]">
      <div className="col-span-3 col-start-2">
        <span className="font-sans text-[10px] uppercase tracking-editorial text-amaranth">
          {tag}
        </span>
      </div>
      <div className="col-span-6 col-start-6 overflow-hidden">
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="m-0 font-display text-[clamp(24px,3vw,44px)] font-semibold leading-[1.18] tracking-[-0.01em] text-forest"
        >
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <em key={i} className="italic text-amaranth">
                {part}
              </em>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.p>
      </div>
    </section>
  );
}
