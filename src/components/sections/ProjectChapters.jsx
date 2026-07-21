import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

/** Révélation douce à l'entrée dans le viewport (identique à la galerie). */
const reveal = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: EASE },
};

/**
 * Colonne d'images d'un chapitre — rythme « magazine » selon le nombre :
 *   1 image  → pleine largeur de la colonne ;
 *   2 images → une pleine, une décalée en retrait (asymétrie éditoriale) ;
 *   3+       → une pleine puis une grille à deux colonnes.
 */
function ChapterImages({ images, lang, projectTitle }) {
  if (!images?.length) return null;

  const caption = (item) => item.label[lang] || item.label.FR;
  const Figure = ({ item, className = '' }) => (
    <figure className={`m-0 ${className}`}>
      <div className="overflow-hidden">
        <motion.img
          {...reveal}
          src={item.src}
          alt={`${projectTitle} — ${caption(item)}`}
          loading="lazy"
          className="w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
        {caption(item)}
      </figcaption>
    </figure>
  );

  const [first, ...rest] = images;

  return (
    <div className="flex flex-col gap-10">
      <Figure item={first} />
      {rest.length === 1 && (
        // Retrait volontaire : la seconde image ne s'aligne pas sur la première,
        // ce décalage crée la respiration typique d'une double-page.
        <Figure item={rest[0]} className="w-full sm:w-[72%] sm:self-end" />
      )}
      {rest.length > 1 && (
        <div className="grid grid-cols-2 gap-6">
          {rest.map((item) => (
            <Figure key={item.src} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Corps éditorial d'une page projet, en CHAPITRES alternés « double-page ».
 *
 * Chaque chapitre occupe une rangée de la grille 12 colonnes : le texte d'un
 * côté, les images de l'autre, et l'on INVERSE les côtés à chaque chapitre
 * (impair : texte à gauche · pair : texte à droite). Sur mobile, tout retombe
 * en une seule colonne, texte avant images.
 *
 * En RTL (arabe), `order` suit le sens de lecture du navigateur : l'alternance
 * est donc automatiquement en miroir, ce qui est le comportement attendu.
 *
 * La colonne de texte est `sticky` sur desktop : elle accompagne le défilement
 * de la colonne d'images, effet de lecture très « magazine ».
 */
export default function ProjectChapters({
  chapters,
  lang,
  projectTitle,
  accent,
  draftLabel,
  quote,
  quoteMarks = ['« ', ' »'],
}) {
  if (!chapters?.length) return null;

  // La citation vient s'intercaler au milieu du récit, en pleine largeur.
  const quoteAt = Math.min(1, chapters.length - 1);

  return (
    <div className="mt-16 md:mt-24">
      {chapters.map((ch, i) => {
        const flip = i % 2 === 1; // un chapitre sur deux : texte à droite
        const title = ch.title[lang] || ch.title.FR;
        const hasImages = !!ch.images?.length;

        return (
          <section key={i}>
            <div className="grid grid-cols-12 items-start gap-x-8 gap-y-10 border-t-2 border-ink pt-10 md:gap-x-14 md:pt-14">
              {/* ── Colonne texte ── */}
              <div
                className={`col-span-12 md:sticky md:top-28 ${
                  hasImages ? 'md:col-span-5' : 'md:col-span-8'
                } ${flip ? 'md:order-2' : 'md:order-1'}`}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-sans text-[11px] uppercase tracking-editorial"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {ch.draft && (
                    <span className="font-sans text-[10px] uppercase tracking-editorial text-ink/35">
                      {draftLabel}
                    </span>
                  )}
                </div>

                <h2 className="mt-3 pb-[0.12em] font-serif text-[clamp(26px,3.6vw,52px)] italic leading-[1.05] tracking-tight text-ink">
                  {title}
                </h2>

                <div className="mt-6 font-sans text-[15px] leading-relaxed text-ink/80">
                  {ch.body.map((para, j) => (
                    <p
                      key={j}
                      className={
                        // Lettrine sur le tout premier paragraphe de la page.
                        // Volontairement LTR UNIQUEMENT (`ltr:`) : en arabe les
                        // lettres sont liées entre elles, isoler et agrandir la
                        // première briserait la ligature et rendrait le mot
                        // illisible — la lettrine n'existe pas dans cette
                        // tradition typographique.
                        i === 0 && j === 0
                          ? 'mb-4 ltr:first-letter:float-left ltr:first-letter:mr-2 ltr:first-letter:mt-1 ltr:first-letter:font-serif ltr:first-letter:text-[3.1em] ltr:first-letter:italic ltr:first-letter:leading-[0.78] ltr:first-letter:text-ink'
                          : 'mb-4'
                      }
                    >
                      {para[lang] || para.FR}
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Colonne images ── */}
              {hasImages && (
                <div className={`col-span-12 md:col-span-7 ${flip ? 'md:order-1' : 'md:order-2'}`}>
                  <ChapterImages images={ch.images} lang={lang} projectTitle={projectTitle} />
                </div>
              )}
            </div>

            {/* ── Citation pleine largeur, une fois, au milieu du récit ── */}
            {quote && i === quoteAt && (
              <motion.blockquote
                {...reveal}
                className="m-0 mt-16 border-y-2 border-ink px-4 py-12 text-center font-serif text-[clamp(26px,4.4vw,64px)] italic leading-[1.08] md:mt-20 md:py-16"
                style={{ color: accent }}
              >
                {quoteMarks[0]}
                {quote}
                {quoteMarks[1]}
              </motion.blockquote>
            )}
          </section>
        );
      })}
    </div>
  );
}
