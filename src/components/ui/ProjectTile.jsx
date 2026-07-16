import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { COLOR_BG, COLOR_GROUP_HOVER } from '../../content/projects.js';

/**
 * Tuile projet de la grille d'accueil.
 * - Avec images : image par défaut (`cover`) qui se fond au survol pour révéler
 *   `hover` (interaction A→B demandée).
 * - Sans image : bloc de couleur d'accent + titre (placeholder propre).
 * Clic → page projet dédiée.
 *
 * @param {object} project  entrée de content/projects.js
 * @param {object} tile     { span, aspect } — classes de mise en page
 */
export default function ProjectTile({ project, tile }) {
  const { lang } = useLanguage();
  const place = project.place[lang] ?? project.place;

  return (
    <Link
      to={`/projet/${project.slug}`}
      data-discover="Voir"
      className={`group col-span-12 block ${tile.span}`}
    >
      <div
        className={`relative overflow-hidden border-2 border-ink shadow-brutal transition-transform duration-500 ease-cine group-hover:-translate-y-1 ${tile.aspect}`}
      >
        {project.cover ? (
          <>
            {/* Image révélée (B) dessous */}
            <img
              src={project.hover || project.cover}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-105 object-cover"
            />
            {/* Image par défaut (A) dessus, se fond au survol */}
            <img
              src={project.cover}
              alt={project.title[lang]}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-cine group-hover:opacity-0"
            />
          </>
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${COLOR_BG[project.color]}`}>
            <span className="px-6 text-center font-serif text-[clamp(26px,4vw,52px)] italic leading-tight text-ink">
              {project.title[lang]}
            </span>
          </div>
        )}
        <span
          className="absolute left-3 top-3 font-sans text-[11px] uppercase tracking-editorial text-ink"
          style={{ mixBlendMode: 'difference', color: '#fff' }}
        >
          ({project.num})
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3
          className={`m-0 font-serif text-[clamp(26px,3.4vw,48px)] italic leading-none text-ink transition-colors duration-300 ${COLOR_GROUP_HOVER[project.color]}`}
        >
          {project.title[lang]}
        </h3>
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-editorial text-ink/50">
          {place}
          {project.year && ` — ${project.year}`}
        </span>
      </div>
      <div className="mt-1 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
        {project.typology[lang]}
      </div>
    </Link>
  );
}
