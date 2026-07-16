import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { projects, getProject, COLOR_BG, COLOR_HEX } from '../content/projects.js';
import { ui } from '../content/ui.js';
import NotFound from './NotFound.jsx';
import Magnetic from '../components/ui/Magnetic.jsx';

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

  if (!project) return <NotFound />;

  const T = (ui[lang] || ui.FR).project;
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
      <header className="mt-8 border-b-2 border-ink pb-10">
        <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/40">
          {T.label} ({project.num})
        </span>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="mt-3 font-serif text-[clamp(48px,10vw,150px)] italic leading-[0.92] tracking-tight text-ink"
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

      {/* Galerie — sans contour, révélation « tracé » (wipe gauche→droite) */}
      {project.gallery?.length > 0 && (
        <section className="mt-16">
          <span className="font-sans text-[11px] uppercase tracking-editorial text-ink/50">
            {T.docs} ({String(project.gallery.length).padStart(2, '0')})
          </span>
          <div className="mt-8 grid grid-cols-12 gap-8 md:gap-12">
            {project.gallery.map((item, i) => (
              <figure key={item.src} className={`col-span-12 m-0 ${item.span || SPANS[i % SPANS.length]}`}>
                <div className="overflow-hidden">
                  <motion.img
                    src={item.src}
                    alt={`${project.title[lang]} — ${item.label}`}
                    loading="lazy"
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Projet suivant */}
      <Link
        to={`/projet/${next.slug}`}
        data-cursor="Suivant"
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
