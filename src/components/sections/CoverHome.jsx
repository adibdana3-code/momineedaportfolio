import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { architectureProjects, COLOR_TEXT } from '../../content/projects.js';

// Nom en arabe (Reem Kufi imposé par la DA), affiché en permanence sur la couverture.
const NAME_AR = 'دانا أديب';

const t = {
  FR: { edition: 'Édition 2026', tagline: "Portfolio d'architecture", subtitle: 'Architecture, espaces & récit', index: 'Sommaire' },
  EN: { edition: 'Edition 2026', tagline: 'Architecture portfolio', subtitle: 'Architecture, space & narrative', index: 'Contents' },
  DE: { edition: 'Ausgabe 2026', tagline: 'Architektur-Portfolio', subtitle: 'Architektur, Raum & Erzählung', index: 'Inhalt' },
  AR: { edition: 'إصدار 2026', tagline: 'بورتفوليو معماري', subtitle: 'عمارة، فضاء وسرد', index: 'الفهرس' },
};

// Projets pourvus d'une couverture (fond + vignettes).
const items = architectureProjects.filter((p) => p.cover);

/**
 * Accueil « Couverture de magazine ».
 *   - Image en fond plein cadre (celle du projet survolé), assombrie pour la
 *     lisibilité ; fondu au survol d'un projet du menu.
 *   - Masthead central immense : nom en latin (Playfair, regular + italic) +
 *     nom en arabe (Reem Kufi) « à côté », + sous-titre.
 *   - Menu des projets aligné à gauche, avec une petite VIGNETTE flottante qui
 *     apparaît au survol de chaque projet (CSS pur → robuste).
 *
 * Plus de long défilement de détails ici : chaque projet mène à sa page.
 */
export default function CoverHome() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;
  const [active, setActive] = useState(items[0]?.slug);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Fonds (fondu enchaîné selon le projet survolé) */}
      <div className="absolute inset-0 -z-0">
        {items.map((p) => (
          <img
            key={p.slug}
            src={p.cover}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-cine"
            style={{
              opacity: active === p.slug ? 1 : 0,
              // `coverZoom` : recadrage optionnel (ex. masquer un cartouche de plan)
              transform: p.coverZoom ? `scale(${p.coverZoom})` : undefined,
              transformOrigin: p.coverOrigin || 'center',
            }}
          />
        ))}
        {/* Voiles de lisibilité (Deep Forest) */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-28 md:px-10 md:pb-14">
        {/* Bandeau haut : mention d'édition */}
        <div className="flex items-center justify-between font-sans text-[11px] uppercase tracking-editorial text-paper/70">
          <span>{c.tagline}</span>
          <span>{c.edition}</span>
        </div>

        {/* Masthead central bilingue */}
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2">
            {/* Nom en Regular, sans italique : « Dana » et « Adib » ont exactement
                la même graisse et le même style. */}
            <h1 className="m-0 font-serif text-[clamp(56px,10vw,168px)] font-normal leading-[0.82] text-paper">
              Dana Adib
            </h1>
            <span
              dir="rtl"
              lang="ar"
              className="font-kufi text-[clamp(40px,7vw,120px)] leading-none text-paper/90"
            >
              {NAME_AR}
            </span>
          </div>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-wide2 text-paper/70">
            {c.subtitle}
          </p>
        </div>

        {/* Menu des projets (gauche) + vignettes flottantes */}
        <nav className="w-full max-w-lg">
          <span className="font-sans text-[11px] uppercase tracking-editorial text-paper/50">
            {c.index} — {String(items.length).padStart(2, '0')}
          </span>
          <ul className="m-0 mt-3 list-none p-0">
            {items.map((p) => {
              const on = active === p.slug;
              return (
                <li key={p.slug} className="group relative border-t border-paper/15">
                  <Link
                    to={`/projet/${p.slug}`}
                    onMouseEnter={() => setActive(p.slug)}
                    onFocus={() => setActive(p.slug)}
                    data-cursor="Voir"
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className={`font-sans text-[10px] uppercase tracking-editorial ${on ? COLOR_TEXT[p.color] : 'text-paper/45'}`}>
                      {p.num}
                    </span>
                    <span
                      className={`font-serif text-[clamp(20px,2.4vw,32px)] italic leading-tight transition-all duration-300 ease-cine ${
                        on ? 'translate-x-1 text-paper' : 'text-paper/55 group-hover:text-paper/90'
                      }`}
                    >
                      {p.title[lang]}
                    </span>
                  </Link>

                  {/* Vignette flottante (apparaît au survol, à droite du titre).
                      La rotation vit sur le conteneur, le zoom de recadrage sur
                      l'image → les deux transforms ne se marchent pas dessus. */}
                  <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-8 hidden -translate-y-1/2 lg:block">
                    <span className="block h-20 w-28 -rotate-2 overflow-hidden border-2 border-paper opacity-0 shadow-brutalSm transition-all duration-500 ease-cine group-hover:rotate-0 group-hover:opacity-100">
                      <img
                        src={p.cover}
                        alt=""
                        aria-hidden
                        className="h-full w-full object-cover"
                        style={{
                          transform: p.coverZoom ? `scale(${p.coverZoom})` : undefined,
                          transformOrigin: p.coverOrigin || 'center',
                        }}
                      />
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
