import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

/** Révélation douce à l'entrée dans le viewport. */
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: EASE },
};

const captionOf = (item, lang) => item.label[lang] || item.label.FR;

/**
 * Une image cliquable (ouvre la Lightbox). Largeur pleine de la colonne de
 * contenu, hauteur naturelle (jamais de recadrage sur les plans/coupes).
 *
 * DÉFINIE AU NIVEAU DU MODULE : un composant déclaré dans le corps d'un autre
 * change d'identité à chaque rendu et force React à tout remonter (les images
 * se redécodent et rejouent leur apparition à chaque ouverture de la modale).
 */
function Figure({ item, lang, projectTitle, onImageClick, zoomLabel }) {
  const caption = captionOf(item, lang);
  return (
    // `w-fit` : la figure épouse la taille de l'image (bornée ci-dessous), elle
    // est centrée par le conteneur et ne s'étire plus sur toute la largeur.
    <figure className="m-0 w-fit max-w-full">
      <button
        type="button"
        data-cursor={zoomLabel}
        onClick={() => onImageClick?.(item.src)}
        aria-label={`${projectTitle} — ${caption}`}
        className="block cursor-none overflow-hidden"
      >
        {/* Dimensions BORNÉES : largeur au plus celle de la colonne, hauteur au
            plus ~78vh — un plan vertical ne dépasse plus la hauteur de l'écran. */}
        <motion.img
          {...reveal}
          src={item.src}
          alt={`${projectTitle} — ${caption}`}
          loading="lazy"
          className="block max-h-[78vh] w-auto max-w-full object-contain"
        />
      </button>
      <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Corps éditorial d'une page projet — mise en page CLASSIQUE et lisible.
 *
 * Chaque chapitre : un numéro, un titre en serif italique, une colonne de texte
 * bien margée (mesure de lecture confortable), puis les images du chapitre
 * posées simplement à la suite, en pleine largeur de la colonne de contenu.
 * Pas de composition asymétrique : la lecture doit être fluide et sans vide.
 *
 * La citation vient s'intercaler une fois, en pleine largeur, au fil du récit.
 */
export default function ProjectChapters({
  chapters,
  lang,
  projectTitle,
  accent,
  quote,
  quoteMarks = ['« ', ' »'],
  onImageClick,
  zoomLabel,
}) {
  if (!chapters?.length) return null;

  const quoteAt = Math.min(1, chapters.length - 1);
  const shared = { lang, projectTitle, onImageClick, zoomLabel };

  return (
    <div className="mt-16 flex flex-col gap-16 md:mt-20 md:gap-24">
      {chapters.map((ch, i) => {
        const title = ch.title[lang] || ch.title.FR;

        return (
          <section key={i} className="border-t-2 border-ink/10 pt-10 md:pt-12">
            {/* Numéro + titre */}
            <span
              className="font-sans text-[11px] uppercase tracking-editorial"
              style={{ color: accent }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-3 font-serif text-[clamp(26px,3.4vw,46px)] italic leading-[1.05] tracking-tight text-ink">
              {title}
            </h2>

            {/* Colonne de texte lisible, bien margée. */}
            <div className="mt-6 max-w-[65ch] space-y-4 font-sans text-[15px] leading-relaxed text-ink/80">
              {ch.body.map((para, j) => (
                <p key={j} className="m-0">
                  {para[lang] || para.FR}
                </p>
              ))}
            </div>

            {/* Images du chapitre, à la suite, centrées et à taille bornée. */}
            {ch.images?.length > 0 && (
              <div className="mt-10 flex flex-col items-center gap-12 md:mt-12">
                {ch.images.map((item) => (
                  <Figure key={item.src} item={item} {...shared} />
                ))}
              </div>
            )}

            {/* Citation pleine largeur, une seule fois, au milieu du récit. */}
            {quote && i === quoteAt && (
              <motion.blockquote
                {...reveal}
                className="m-0 mt-16 border-y-2 border-ink px-4 py-12 text-center font-serif text-[clamp(26px,4.4vw,60px)] italic leading-[1.08] md:mt-20 md:py-16"
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
