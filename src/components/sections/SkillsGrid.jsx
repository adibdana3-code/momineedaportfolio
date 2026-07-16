import fr from '../../content/fr.js';

/**
 * Pastilles de compétences logicielles (pur CSS).
 * Squircle à bordure fine, initiales en serif au centre, nom complet en
 * micro-copie dessous. Légère élévation au survol.
 */
export default function SkillsGrid() {
  const { tag, items } = fr.skills;

  return (
    <section className="px-10 pb-10 pt-[100px]">
      <span className="font-sans text-[10px] uppercase tracking-wide2 text-amaranth">
        {tag}
      </span>
      <div className="mt-[34px] flex flex-wrap gap-[34px]">
        {items.map((s) => (
          <div
            key={s.code}
            data-discover=" "
            className="group flex cursor-none flex-col items-center gap-3"
          >
            <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[22px] border-[0.5px] border-forest/30 bg-sand font-serif text-[26px] font-bold text-forest transition-transform duration-500 ease-cine group-hover:-translate-y-2">
              {s.code}
            </div>
            <span className="font-sans text-[11px] lowercase text-olive">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
