import { useEffect, useRef, useState } from 'react';
import ProjectFeature from '../ui/ProjectFeature.jsx';
import { architectureProjects as projects, COLOR_TEXT } from '../../content/projects.js';
import { ui } from '../../content/ui.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

// Ratio de couverture accordé à l'orientation réelle de chaque image.
const ASPECTS = [
  'aspect-[3/4]', // 01 — Wellness (perspective portrait)
  'aspect-[4/3]', // 02 — Maison
  'aspect-[3/2]', // 03 — Cuisine
  'aspect-[3/2]', // 04 — Villa (paysage)
  'aspect-[16/9]', // 05 — D.A.T. (hall large)
  'aspect-[4/3]', // 06 — Entrée de bureaux
  'aspect-[4/3]', // 07 — Détails
];

/**
 * Section projets « magazine ».
 *
 * Deux colonnes sur desktop :
 *   - GAUCHE : un « Sommaire / Index » STICKY listant tous les projets. Le
 *     projet actuellement à l'écran est surligné dans sa couleur d'accent ;
 *     un clic défile (Lenis) jusqu'à sa feature. → repère éditorial.
 *   - DROITE : les features en alternance gauche/droite (ProjectFeature).
 *
 * En arabe (dir=rtl), la grille place naturellement l'index à droite.
 * Sur mobile, l'index est masqué (on scrolle directement les features).
 */
export default function ProjectsMagazine() {
  const { lang } = useLanguage();
  const T = (ui[lang] || ui.FR).projects;

  const listRef = useRef(null);
  const [active, setActive] = useState(projects[0]?.slug);

  // Détecte la feature qui croise le centre de l'écran → projet « actif ».
  useEffect(() => {
    const els = listRef.current?.querySelectorAll('[data-slug]');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.slug);
        });
      },
      // Bande centrale étroite : la feature qui la traverse devient active.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Défilement fluide vers une feature depuis le sommaire.
  const goTo = (slug) => {
    const el = document.getElementById(`p-${slug}`);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.1 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

      <div className="mt-12 grid grid-cols-12 gap-10 md:mt-16 md:gap-12">
        {/* Sommaire sticky (desktop) */}
        <aside className="hidden md:col-span-3 md:block">
          <div className="sticky top-28">
            <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/40">
              {T.sommaire}
            </span>
            <ol className="m-0 mt-6 list-none p-0">
              {projects.map((p) => {
                const on = active === p.slug;
                return (
                  <li key={p.slug} className="border-t border-ink/10 first:border-t-0">
                    <button
                      type="button"
                      data-link
                      onClick={() => goTo(p.slug)}
                      className="group flex w-full items-baseline gap-3 py-3 text-left"
                    >
                      <span
                        className={`font-sans text-[10px] uppercase tracking-editorial transition-colors duration-300 ${
                          on ? COLOR_TEXT[p.color] : 'text-ink/35'
                        }`}
                      >
                        {p.num}
                      </span>
                      <span
                        className={`font-serif text-[clamp(16px,1.5vw,22px)] italic leading-tight transition-all duration-300 ease-cine ${
                          on
                            ? 'translate-x-1 text-ink'
                            : 'text-ink/45 group-hover:translate-x-1 group-hover:text-ink/80'
                        }`}
                      >
                        {p.title[lang]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        {/* Colonne des features */}
        <div className="col-span-12 flex flex-col gap-28 md:col-span-9 md:gap-40">
          {projects.map((p, i) => (
            <div key={p.slug} id={`p-${p.slug}`} data-slug={p.slug} className="scroll-mt-28">
              <ProjectFeature project={p} index={i} aspect={ASPECTS[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
