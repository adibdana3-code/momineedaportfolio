import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Effet « magnétique » : l'élément est attiré vers le curseur quand il le
 * survole, puis revient à sa place avec une inertie douce (spring).
 *
 * Enveloppe générique (span inline-block par défaut → ne casse pas les mises en
 * page flex). Désactivé sur les pointeurs grossiers (tactile) : on rend alors
 * l'enfant tel quel, sans surcharge.
 *
 * @param {number} strength  fraction du déplacement curseur reprise (0.2–0.5).
 * @param {string} className classe appliquée à l'enveloppe.
 */
export default function Magnetic({ children, strength = 0.35, className = '', as = 'span' }) {
  const ref = useRef(null);
  const [fine, setFine] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Ressort « lourd/luxueux » cohérent avec le design system.
  const cfg = { stiffness: 200, damping: 15, mass: 0.4 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) setFine(true);
  }, []);

  if (!fine) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] || motion.span;
  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
