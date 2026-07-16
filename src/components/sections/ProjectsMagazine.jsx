import ProjectFeature from '../ui/ProjectFeature.jsx';
import { architectureProjects as projects } from '../../content/projects.js';
import { ui } from '../../content/ui.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

// Ratio de couverture accordé à l'orientation réelle de chaque image.
const ASPECTS = [
  'aspect-[3/4]', // P1 — perspective (portrait)
  'aspect-[3/2]', // P2 — villa (paysage)
  'aspect-[4/3]', // P3 — maison
  'aspect-[4/3]', // P4 — détails
  'aspect-[4/3]', // P5 — entrée de bureaux
  'aspect-[3/2]', // P6 — cuisine
  'aspect-[16/9]', // P7 — D.A.T. (hall large)
];

/** Section projets « magazine » : features en alternance gauche/droite. */
export default function ProjectsMagazine() {
  const { lang } = useLanguage();
  const T = (ui[lang] || ui.FR).projects;
  return (
    <section id="projets" className="border-t-2 border-ink px-6 py-24 md:px-10 md:py-28">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
          {T.tag}
        </span>
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
          Index — {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-16 flex flex-col gap-28 md:mt-24 md:gap-40">
        {projects.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} index={i} aspect={ASPECTS[i]} />
        ))}
      </div>
    </section>
  );
}
