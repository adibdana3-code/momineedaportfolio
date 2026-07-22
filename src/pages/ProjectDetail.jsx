import { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { projects, getProject, COLOR_HEX } from '../content/projects.js';
import { ui } from '../content/ui.js';
import NotFound from './NotFound.jsx';
import Magnetic from '../components/ui/Magnetic.jsx';
import GenesisMark from '../components/ui/GenesisMarks.jsx';
import ProjectChapters from '../components/sections/ProjectChapters.jsx';
import Lightbox from '../components/ui/Lightbox.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.jsx';

// Le viewer 3D (Three.js) est lazy-loadé — ne charge que sur les pages projet.
const ModelViewer = lazy(() => import('../components/sections/ModelViewer.jsx'));

const EASE = [0.76, 0, 0.24, 1];

/**
 * Titre du hero — même typo que la couverture d'accueil : Playfair, en
 * ALTERNANT Regular et Italic d'un mot à l'autre (« mélange dans la même
 * phrase », cf. DA). Les titres d'un seul mot restent en Regular, c'est voulu.
 */
function HeroTitle({ text }) {
  const words = text.split(' ');
  return (
    <h1 className="m-0 font-serif text-[clamp(44px,9vw,150px)] leading-[0.9] text-paper">
      {words.map((w, i) => (
        <span key={i} className={i % 2 === 1 ? 'italic' : 'font-normal'}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const project = getProject(slug);

  // Appelé AVANT le repli 404 : les hooks ne peuvent pas être conditionnels.
  // Sur slug inconnu on laisse NotFound poser son propre titre (`skip`).
  useDocumentMeta(project?.title[lang], { skip: !project });

  // Index de l'image ouverte en Lightbox (null = modale fermée).
  const [lbIndex, setLbIndex] = useState(null);

  // Toutes les images de la page, DANS L'ORDRE DU DÉFILEMENT : d'abord celles
  // réparties dans les chapitres, puis les documents de fin. C'est ce parcours
  // que les flèches préc./suiv. suivent, pour que la modale reproduise la
  // lecture de la page. Comme aucune image n'est affichée deux fois, `src`
  // identifie de façon unique une position dans cette liste.
  const lightboxItems = useMemo(() => {
    if (!project) return [];
    // La couverture des projets à genèse s'intercale entre les chapitres et les
    // documents de fin — c'est sa position réelle dans la page.
    const genesisCover =
      project.genesis && project.cover
        ? [{ src: project.cover, label: project.genesis.resultLabel }]
        : [];
    return [
      ...(project.chapters || []).flatMap((c) => c.images || []),
      ...genesisCover,
      ...(project.restGallery || []),
    ];
  }, [project]);

  if (!project) return <NotFound />;

  const openLightbox = (src) => {
    const i = lightboxItems.findIndex((it) => it.src === src);
    if (i !== -1) setLbIndex(i);
  };

  const L = ui[lang] || ui.FR;
  const T = L.project;
  const C = L.cursor;
  const place = project.place[lang] ?? project.place;

  // Projet suivant (navigation cyclique DANS la même famille : archi ou art)
  const siblings = projects.filter((p) => p.category === project.category);
  const sidx = siblings.findIndex((p) => p.slug === slug);
  const next = siblings[(sidx + 1) % siblings.length];

  const lead = (project.article?.[lang] || project.article?.FR)?.lead;

  return (
    <article className="bg-white">
      {/* ─────────────────────────  HERO IMMERSIF (100vh)  ─────────────────────
          On retrouve l'effet de la couverture d'accueil : image du projet en
          fond plein cadre, assombrie, et le titre en immense au centre. */}
      <header className="relative flex h-[100svh] min-h-[560px] w-full flex-col overflow-hidden">
        {/* Fond : image principale du projet */}
        <div className="absolute inset-0">
          <img
            src={project.cover}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: project.coverZoom ? `scale(${project.coverZoom})` : undefined,
              transformOrigin: project.coverOrigin || 'center',
            }}
          />
          {/* Voiles de lisibilité (Deep Forest) — identiques à l'accueil */}
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
        </div>

        {/* Titre centré + méta */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 font-sans text-[11px] uppercase tracking-editorial text-paper/70"
          >
            {T.label} — {project.num}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <HeroTitle text={project.title[lang]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-sans text-[11px] uppercase tracking-editorial text-paper/70"
          >
            <span>{place}</span>
            {project.year && <span aria-hidden>·</span>}
            {project.year && <span>{project.year}</span>}
            <span aria-hidden>·</span>
            <span>{project.typology[lang]}</span>
          </motion.div>
        </div>

        {/* Indice de défilement */}
        <div className="relative z-10 flex justify-center pb-10">
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="font-sans text-lg text-paper/70"
          >
            ↓
          </motion.span>
        </div>
      </header>

      {/* ─────────────────────────  CONTENU (fond blanc)  ──────────────────────
          Zone de lecture, l'intérieur du magazine : 100 % blanc, colonnes de
          texte lisibles et images posées proprement à la suite. */}
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
        {/* Modèle 3D interactif — première pièce forte de la lecture, si présent. */}
        {project.model3d && (
          <section className="mb-16 md:mb-24">
            <Suspense
              fallback={<div className="aspect-[16/10] w-full animate-pulse bg-[#F3F1EA]" />}
            >
              <ModelViewer
                type={project.model3d.type}
                url={project.model3d.url}
                color={COLOR_HEX[project.color]}
                scene={project.model3d.scene}
                label={`${T.scene} · ${T.model}`}
              />
            </Suspense>
          </section>
        )}

        {/* Chapô — grande accroche éditoriale qui ouvre l'article. */}
        {lead && (
          <p className="max-w-3xl font-serif text-[clamp(20px,2.6vw,34px)] italic leading-snug text-ink">
            {lead}
          </p>
        )}

        {/* Corps de l'article : chapitres classiques (titre, colonne de texte
            lisible, images à la suite) — voir ProjectChapters. */}
        <ProjectChapters
          chapters={project.chapters}
          lang={lang}
          projectTitle={project.title[lang]}
          accent={COLOR_HEX[project.color]}
          quote={(project.article?.[lang] || project.article?.FR)?.quote}
          quoteMarks={T.quoteMarks}
          onImageClick={openLightbox}
          zoomLabel={C.look}
        />

        {/* Genèse — les trois signes de référence redessinés, puis leur fusion en
            logotype (projets d'identité graphique). */}
        {project.genesis &&
          (() => {
            const G = project.genesis;
            const tr = (o) => (o ? o[lang] || o.FR : '');
            return (
              <section className="mt-20 border-t-2 border-ink/10 pt-12 md:mt-28">
                <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
                  {tr(G.title)}
                </span>
                <p className="mt-6 max-w-[65ch] font-serif text-[clamp(19px,2.4vw,30px)] italic leading-snug text-ink">
                  {tr(G.intro)}
                </p>

                {/* Les trois signes de référence */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10">
                  {G.items.map((it) => (
                    <figure key={it.key} className="m-0">
                      <div
                        className="flex aspect-[4/5] items-center justify-center border-2 border-ink/15 p-8"
                        style={{ color: COLOR_HEX[project.color] }}
                      >
                        <GenesisMark name={it.key} className="h-full w-auto" />
                      </div>
                      <figcaption className="mt-3">
                        <div className="font-sans text-[11px] uppercase tracking-editorial text-ink">
                          {tr(it.label)}
                        </div>
                        <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink/70">
                          {tr(it.note)}
                        </p>
                        <p className="mt-2 font-sans text-[10px] leading-snug text-ink/40">
                          {tr(G.credit)}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {/* Fusion → le logotype final */}
                <div className="mt-14 flex flex-col items-center border-t-2 border-ink pt-10">
                  <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
                    {tr(G.resultLabel)}
                  </span>
                  {project.cover && (
                    <button
                      type="button"
                      data-cursor={C.look}
                      onClick={() => openLightbox(project.cover)}
                      aria-label={project.title[lang]}
                      className="mt-8 block w-full max-w-[420px] cursor-none"
                    >
                      <img
                        src={project.cover}
                        alt={project.title[lang]}
                        loading="lazy"
                        className="w-full object-contain"
                      />
                    </button>
                  )}
                </div>
              </section>
            );
          })()}

        {/* Galerie de fin — documents NON déjà montrés dans les chapitres, posés
            simplement à la suite (aucune image affichée deux fois). */}
        {project.restGallery?.length > 0 && (
          <section className="mt-20 border-t-2 border-ink/10 pt-12 md:mt-28">
            <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
              {T.docs} ({String(project.restGallery.length).padStart(2, '0')})
            </span>
            <div className="mt-8 flex flex-col gap-12">
              {project.restGallery.map((item) => {
                // `item.label` est un objet i18n { FR, EN, DE, AR } (voir projects.js).
                const caption = item.label[lang] || item.label.FR;
                return (
                  <figure key={item.src} className="m-0">
                    <button
                      type="button"
                      data-cursor={C.look}
                      onClick={() => openLightbox(item.src)}
                      aria-label={`${project.title[lang]} — ${caption}`}
                      className="block w-full cursor-none overflow-hidden"
                    >
                      <motion.img
                        src={item.src}
                        alt={`${project.title[lang]} — ${caption}`}
                        loading="lazy"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="w-full object-contain"
                      />
                    </button>
                    <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
                      {caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Projet suivant */}
        <Link
          to={`/projet/${next.slug}`}
          data-cursor={C.next}
          className="group mt-24 flex items-center justify-between border-t-2 border-ink pt-8"
        >
          <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
            {T.next}
          </span>
          <Magnetic strength={0.35}>
            <span className="font-serif text-[clamp(24px,4vw,56px)] italic leading-none text-ink">
              {next.title[lang]} →
            </span>
          </Magnetic>
        </Link>
      </div>

      {/* Visionneuse plein écran — parcourt toutes les images de la page. */}
      <Lightbox
        items={lightboxItems}
        index={lbIndex}
        onIndexChange={setLbIndex}
        onClose={() => setLbIndex(null)}
        lang={lang}
        labels={T.lightbox}
      />
    </article>
  );
}
