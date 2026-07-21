import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { projects, getProject, COLOR_BG, COLOR_HEX } from '../content/projects.js';
import { ui } from '../content/ui.js';
import NotFound from './NotFound.jsx';
import Magnetic from '../components/ui/Magnetic.jsx';
import GenesisMark from '../components/ui/GenesisMarks.jsx';
import ProjectChapters from '../components/sections/ProjectChapters.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.jsx';

// Le viewer 3D (Three.js) est lazy-loadé — ne charge que sur les pages projet.
const ModelViewer = lazy(() => import('../components/sections/ModelViewer.jsx'));

// Rythme de la galerie (spans desktop qui alternent, images en ratio naturel
// pour ne pas rogner les plans/coupes/élévations).
const SPANS = [
  'md:col-span-8',
  'md:col-span-4',
  'md:col-span-6',
  'md:col-span-6',
  'md:col-span-7',
  'md:col-span-5',
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const project = getProject(slug);

  // Appelé AVANT le repli 404 : les hooks ne peuvent pas être conditionnels.
  // Sur slug inconnu on laisse NotFound poser son propre titre (`skip`).
  useDocumentMeta(project?.title[lang], { skip: !project });

  if (!project) return <NotFound />;

  const L = ui[lang] || ui.FR;
  const T = L.project;
  const C = L.cursor;
  const bg = COLOR_BG[project.color];
  const place = project.place[lang] ?? project.place;

  // Projet suivant (navigation cyclique DANS la même famille : archi ou art)
  const siblings = projects.filter((p) => p.category === project.category);
  const sidx = siblings.findIndex((p) => p.slug === slug);
  const next = siblings[(sidx + 1) % siblings.length];

  return (
    <article className="px-6 pb-24 pt-28 md:px-10">
      <Magnetic strength={0.4} className="self-start">
        <Link
          to="/"
          data-link
          className="inline-block font-sans text-[11px] uppercase tracking-editorial text-ink/60 transition-colors hover:text-orange"
        >
          {T.back}
        </Link>
      </Magnetic>

      {/* En-tête */}
      <header className="mt-8 border-b-2 border-ink pb-6">
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/40">
          {T.label} ({project.num})
        </span>
        {/* `pb` en em : l'interlignage serré (0.92) fait dépasser les jambages
            (« g », « J » en Playfair italique) sous la boîte de ligne, que le
            conteneur overflow-hidden rognait. 0.22em couvre le débord mesuré
            (0.205em) et suit la taille du clamp. */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="mt-3 pb-[0.22em] font-serif text-[clamp(48px,10vw,150px)] italic leading-[0.92] tracking-tight text-ink"
          >
            {project.title[lang]}
          </motion.h1>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 font-sans text-[11px] uppercase tracking-editorial text-ink/60">
          <span>{place}</span>
          {project.year && <span>{project.year}</span>}
          <span>{project.typology[lang]}</span>
        </div>
      </header>

      {/* Accroche colorée */}
      <section className={`mt-10 ${bg} px-6 py-16 md:px-12`}>
        <p className="max-w-2xl font-serif text-[clamp(22px,3.5vw,44px)] italic leading-tight text-ink">
          {project.summary[lang]}
        </p>
      </section>

      {/* Chapô — grande accroche éditoriale qui ouvre l'article. */}
      {project.article && (
        <section className="mt-14 md:mt-20">
          <p className="max-w-3xl font-serif text-[clamp(20px,2.6vw,34px)] italic leading-snug text-ink">
            {(project.article[lang] || project.article.FR).lead}
          </p>
        </section>
      )}

      {/* Corps de l'article en CHAPITRES alternés (texte d'un côté, images de
          l'autre, côtés inversés à chaque chapitre) — la double-page magazine. */}
      <ProjectChapters
        chapters={project.chapters}
        lang={lang}
        projectTitle={project.title[lang]}
        accent={COLOR_HEX[project.color]}
        draftLabel={T.draft}
        quote={(project.article?.[lang] || project.article?.FR)?.quote}
        quoteMarks={T.quoteMarks}
      />

      {/* Genèse — signes de référence puis fusion (projets graphiques).
          Les visuels de référence sont des placeholders SVG tant que Dana n'a
          pas fourni les images réelles (crédit affiché sous chacun). */}
      {project.genesis &&
        (() => {
          const G = project.genesis;
          const tr = (o) => (o ? o[lang] || o.FR : '');
          return (
            <section className="mt-16 md:mt-24">
              <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
                {tr(G.title)}
              </span>
              <p className="mt-6 max-w-3xl font-serif text-[clamp(19px,2.4vw,30px)] italic leading-snug text-ink">
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
                  <img
                    src={project.cover}
                    alt={project.title[lang]}
                    loading="lazy"
                    className="mt-8 w-full max-w-[420px] object-contain"
                  />
                )}
              </div>
            </section>
          );
        })()}

      {/* Bloc 3D — viewer réel si un modèle existe, sinon placeholder doux */}
      {project.model3d ? (
        <section className="mt-10">
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
      ) : project.hasModel ? (
        <section className="mt-10 flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-[#F3F1EA] text-center">
          <span className="font-sans text-[11px] uppercase tracking-editorial text-orange">
            {T.model}
          </span>
          <span className="font-serif text-[clamp(22px,3vw,40px)] italic text-ink">
            {T.modelSoon}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-editorial text-ink/50">
            {T.modelWait}
          </span>
        </section>
      ) : null}

      {/* Galerie de fin — uniquement les documents NON déjà montrés dans les
          chapitres (`restGallery`), pour ne pas afficher deux fois la même
          image sur la page. Vide sur les projets dont tous les documents ont
          été répartis dans le récit (ex. Wellness). */}
      {project.restGallery?.length > 0 && (
        <section className="mt-16">
          <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
            {T.docs} ({String(project.restGallery.length).padStart(2, '0')})
          </span>
          <div className="mt-8 grid grid-cols-12 gap-8 md:gap-12">
            {project.restGallery.map((item, i) => {
              // `item.label` est un objet i18n { FR, EN, DE, AR } (voir projects.js).
              const caption = item.label[lang] || item.label.FR;
              return (
              <figure key={item.src} className={`col-span-12 m-0 ${item.span || SPANS[i % SPANS.length]}`}>
                <div className="overflow-hidden">
                  <motion.img
                    src={item.src}
                    alt={`${project.title[lang]} — ${caption}`}
                    loading="lazy"
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full object-cover"
                  />
                </div>
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
    </article>
  );
}
