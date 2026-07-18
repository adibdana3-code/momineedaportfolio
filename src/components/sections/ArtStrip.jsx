import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { artProjects } from '../../content/projects.js';
import { COLOR_BG } from '../../content/projects.js';

/**
 * Section « Art & Expérimentation » — défilement STRICTEMENT horizontal.
 *
 * Affiche les vrais projets Art (données `artProjects`) sous forme de cartes
 * cliquables menant à leur page dédiée /projet/:slug. Chaque carte reprend le
 * fondu couverture→survol du reste du site.
 *
 * Scroll : overflow-x:auto / overflow-y:hidden (classe .h-scroll) → l'axe
 * vertical est verrouillé. Glisser-déposer (pointer events) pour les souris ;
 * `data-lenis-prevent` empêche Lenis d'interférer. On distingue clic et drag
 * (seuil de déplacement) pour ne pas déclencher la navigation en glissant.
 */

const t = {
  FR: { title: 'Art & Expérimentation', hint: 'Glisser →', cartel: 'Travaux personnels — photographie & expérimentations' },
  EN: { title: 'Art & Experiments', hint: 'Drag →', cartel: 'Personal works — photography & experiments' },
  DE: { title: 'Kunst & Experimente', hint: 'Ziehen →', cartel: 'Eigene Arbeiten — Fotografie & Experimente' },
  AR: { title: 'فنّ وتجريب', hint: '← اسحب', cartel: 'أعمال شخصية — تصوير وتجارب' },
};

export default function ArtStrip() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });

  const onDown = (e) => {
    drag.current = { active: true, startX: e.clientX, startLeft: ref.current.scrollLeft, moved: 0 };
  };
  const onMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    ref.current.scrollLeft = drag.current.startLeft - dx;
  };
  const stop = () => {
    drag.current.active = false;
  };
  // Empêche le clic (navigation) si l'utilisateur a glissé de plus de 6px.
  const guardClick = (e) => {
    if (drag.current.moved > 6) e.preventDefault();
  };

  return (
    <section id="art" className="border-t-2 border-ink bg-ink py-20 text-paper">
      <div className="flex items-baseline justify-between px-6 md:px-10">
        <h2 className="m-0 font-serif text-[clamp(30px,5vw,72px)] italic leading-none">{c.title}</h2>
        <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-editorial text-orange">
          {c.hint}
        </span>
      </div>
      <div className="mt-3 px-6 font-sans text-[10px] uppercase tracking-editorial text-paper/50 md:px-10">
        {c.cartel}
      </div>

      <div
        ref={ref}
        data-lenis-prevent
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={stop}
        onPointerLeave={stop}
        className="h-scroll mt-10 flex select-none gap-6 px-6 md:px-10"
        style={{ cursor: 'grab' }}
      >
        {artProjects.map((p) => (
          <Link
            key={p.slug}
            to={`/projet/${p.slug}`}
            onClick={guardClick}
            data-cursor="Voir"
            draggable={false}
            className="group m-0 block flex-none"
            style={{ width: 340 }}
          >
            <figure className="m-0">
              <div className="relative aspect-[3/4] overflow-hidden border-2 border-paper/15">
                {p.cover ? (
                  <>
                    {/* Image de survol (dessous) */}
                    <img
                      src={p.hover || p.cover}
                      alt=""
                      aria-hidden
                      draggable={false}
                      className="absolute inset-0 h-full w-full scale-105 object-cover"
                    />
                    {/* Couverture (dessus, s'efface au survol) */}
                    <img
                      src={p.cover}
                      alt={p.title[lang]}
                      loading="lazy"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-cine group-hover:opacity-0"
                    />
                  </>
                ) : (
                  <div className={`flex h-full w-full items-center justify-center ${COLOR_BG[p.color]}`}>
                    <span className="px-4 text-center font-serif text-2xl italic text-ink">
                      {p.title[lang]}
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-3">
                <div className="font-sans text-[12px] uppercase tracking-[0.02em] text-paper">
                  {p.title[lang]}
                </div>
                <div className="mt-1 font-sans text-[10px] uppercase tracking-editorial text-paper/45">
                  {p.typology[lang]}
                  {p.year && ` · ${p.year}`}
                </div>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </section>
  );
}
