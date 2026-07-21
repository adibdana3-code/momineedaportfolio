import { useLanguage } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';

/**
 * Section LOGICIELS — pastilles (carrés très arrondis, bordure fine, fond
 * coloré, initiales en serif) + JAUGE de maîtrise qui se remplit au survol.
 *
 * `level` = niveau de maîtrise en %. Les pastilles sont triées par maîtrise
 * décroissante (tri explicite ci-dessous, indépendant de l'ordre d'écriture).
 * La barre est toujours présente (pas de saut de mise en page) mais ne se
 * remplit qu'au survol, via une variable CSS `--lvl` + `group-hover`.
 */
const SKILLS = [
  { code: 'Ac', name: 'AutoCAD', level: 100, bg: 'bg-bubblegum' },
  { code: 'Rv', name: 'Revit', level: 100, bg: 'bg-acid' },
  { code: 'Af', name: 'Affinity', level: 100, bg: 'bg-orange' },
  { code: 'Pr', name: 'Procreate', level: 100, bg: 'bg-butter' },
  { code: 'Ps', name: 'Photoshop', level: 85, bg: 'bg-bubblegum' },
  { code: 'Id', name: 'InDesign', level: 85, bg: 'bg-acid' },
  { code: 'Su', name: 'SketchUp', level: 85, bg: 'bg-orange' },
  { code: 'Ms', name: 'Suite Microsoft', level: 85, bg: 'bg-butter' },
  { code: 'Rh', name: 'Rhino', level: 15, bg: 'bg-bubblegum' },
  { code: 'Bl', name: 'Blender', level: 10, bg: 'bg-acid' },
].sort((a, b) => b.level - a.level); // maîtrise décroissante

export default function Skills() {
  const { lang } = useLanguage();
  return (
    <section id="skills" className="border-t-2 border-ink px-6 py-24 md:px-10">
      <span className="font-sans text-[11px] uppercase tracking-wide2 text-ink/50">
        {(ui[lang] || ui.FR).skills}
      </span>
      <div className="mt-10 flex flex-wrap gap-5 md:gap-7">
        {SKILLS.map((s) => (
          <div key={s.name} className="group flex w-[104px] flex-col items-center gap-3 md:w-[112px]">
            <div
              className={`flex h-[84px] w-[84px] items-center justify-center rounded-[26px] border-2 border-ink ${s.bg} shadow-brutalSm transition-transform duration-500 ease-cine group-hover:-translate-y-2 md:h-24 md:w-24`}
            >
              <span className="font-serif text-[30px] italic text-ink md:text-[34px]">
                {s.code}
              </span>
            </div>

            <span className="text-center font-sans text-[11px] lowercase leading-tight tracking-wide text-ink/70">
              {s.name}
            </span>

            {/* Jauge de maîtrise : se remplit au survol */}
            <div className="w-full">
              <div className="h-[5px] w-full overflow-hidden rounded-full bg-ink/15">
                <div
                  style={{ '--lvl': `${s.level}%` }}
                  className="h-full w-0 rounded-full bg-ink transition-[width] duration-700 ease-cine group-hover:w-[var(--lvl)]"
                />
              </div>
              <span className="mt-1 block text-center font-sans text-[10px] tracking-editorial text-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {s.level}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
