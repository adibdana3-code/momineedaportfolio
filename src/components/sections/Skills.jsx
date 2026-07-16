import { useLanguage } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';

/**
 * Section LOGICIELS — pastilles (carrés très arrondis, bordure noire fine,
 * fond coloré, initiale géante en serif, nom complet en dessous).
 * Légère élévation au survol.
 */
const SKILLS = [
  { code: 'Ac', name: 'AutoCAD', bg: 'bg-bubblegum' },
  { code: 'Rv', name: 'Revit', bg: 'bg-acid' },
  { code: 'Ps', name: 'Photoshop', bg: 'bg-orange' },
  { code: 'Id', name: 'InDesign', bg: 'bg-butter' },
  { code: 'Af', name: 'Affinity', bg: 'bg-bubblegum' },
  { code: 'Su', name: 'SketchUp', bg: 'bg-acid' },
  { code: 'Pr', name: 'Procreate', bg: 'bg-orange' },
];

export default function Skills() {
  const { lang } = useLanguage();
  return (
    <section id="skills" className="border-t-2 border-ink px-6 py-24 md:px-10">
      <span className="font-sans text-[11px] uppercase tracking-wide2 text-ink/50">
        {(ui[lang] || ui.FR).skills}
      </span>
      <div className="mt-10 flex flex-wrap gap-5 md:gap-7">
        {SKILLS.map((s) => (
          <div key={s.name} className="group flex flex-col items-center gap-3">
            <div
              className={`flex h-[84px] w-[84px] items-center justify-center rounded-[26px] border-2 border-ink ${s.bg} shadow-brutalSm transition-transform duration-500 ease-cine group-hover:-translate-y-2 md:h-24 md:w-24`}
            >
              <span className="font-serif text-[30px] italic text-ink md:text-[34px]">
                {s.code}
              </span>
            </div>
            <span className="font-sans text-[11px] lowercase tracking-wide text-ink/70">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
