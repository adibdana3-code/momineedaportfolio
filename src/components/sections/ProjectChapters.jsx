import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

/** Révélation douce à l'entrée dans le viewport (identique à la galerie). */
const reveal = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: EASE },
};

const captionOf = (item, lang) => item.label[lang] || item.label.FR;

/**
 * Une image cliquable (ouvre la Lightbox).
 *
 * DÉFINIE AU NIVEAU DU MODULE, et non dans un composant parent : un composant
 * déclaré dans le corps d'un autre change d'identité à chaque rendu, ce qui
 * pousse React à démonter puis remonter tout le sous-arbre (les images se
 * redécodent et rejouent leur apparition à chaque ouverture de la modale).
 *
 * `button` plutôt que `div` : l'ouverture doit être atteignable au clavier.
 * La LARGEUR est pilotée par le parent via `className` (composition asymétrique).
 * `break-inside-avoid` sert la variante masonry (4+ images).
 */
function Figure({ item, lang, projectTitle, onImageClick, zoomLabel, className = '' }) {
  const caption = captionOf(item, lang);
  return (
    <figure className={`m-0 break-inside-avoid ${className}`}>
      <button
        type="button"
        data-cursor={zoomLabel}
        onClick={() => onImageClick?.(item.src)}
        aria-label={`${projectTitle} — ${caption}`}
        className="block w-full cursor-none overflow-hidden"
      >
        <motion.img
          {...reveal}
          src={item.src}
          alt={`${projectTitle} — ${caption}`}
          loading="lazy"
          // Hauteur AUTO (jamais de boîte fixe) : les plans, coupes et
          // élévations gardent leur ratio naturel, aucun recadrage. C'est cette
          // liberté de hauteur qui crée l'asymétrie « magazine ».
          className="w-full object-cover transition-transform duration-700 ease-cine hover:scale-[1.02]"
        />
      </button>
      <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Composition d'images ASYMÉTRIQUE — chaque chapitre dispose ses visuels comme
 * une planche de magazine (lookbook), jamais en alignement strict à côté du
 * texte. Le nombre d'images choisit la composition :
 *   1 image  → grand visuel décalé, blanc tournant volontaire ;
 *   2 images → paire déséquilibrée, la seconde décrochée vers le bas ;
 *   3 images → un grand visuel + deux plus petits empilés, côté alterné ;
 *   4+       → masonry deux colonnes.
 * `flip` (parité du chapitre) inverse les côtés pour rythmer le défilement.
 *
 * Aucune hauteur n'est imposée : le texte n'est plus étiré ni centré de force à
 * côté d'une image. Les visuels vivent librement « à la suite ou autour » de
 * l'article.
 */
function ImageComposition({ images, flip, lang, projectTitle, onImageClick, zoomLabel }) {
  const shared = { lang, projectTitle, onImageClick, zoomLabel };
  const n = images.length;
  const wrap = 'mt-10 md:mt-16';

  // 1 image — grande, décalée à gauche ou à droite (respiration asymétrique).
  if (n === 1) {
    return (
      <div className={wrap}>
        <Figure item={images[0]} {...shared} className={`md:w-[78%] ${flip ? 'md:ml-auto' : ''}`} />
      </div>
    );
  }

  // 2 images — paire déséquilibrée : une large, une plus petite décrochée vers
  // le bas. `flex-row-reverse` alterne le côté de la grande d'un chapitre à l'autre.
  if (n === 2) {
    return (
      <div
        className={`${wrap} flex flex-col gap-6 md:flex-row md:items-start md:gap-8 ${
          flip ? 'md:flex-row-reverse' : ''
        }`}
      >
        <Figure item={images[0]} {...shared} className="md:w-[60%]" />
        <Figure item={images[1]} {...shared} className="md:w-[34%] md:mt-24" />
      </div>
    );
  }

  // 3 images — un grand visuel d'un côté, deux plus petits empilés de l'autre,
  // le petit bloc légèrement décroché. Côté alterné par chapitre.
  if (n === 3) {
    return (
      <div
        className={`${wrap} flex flex-col gap-6 md:flex-row md:items-start md:gap-8 ${
          flip ? 'md:flex-row-reverse' : ''
        }`}
      >
        <Figure item={images[0]} {...shared} className="md:w-[57%]" />
        <div className="flex flex-col gap-8 md:mt-20 md:w-[39%]">
          <Figure item={images[1]} {...shared} />
          <Figure item={images[2]} {...shared} />
        </div>
      </div>
    );
  }

  // 4+ images — masonry deux colonnes (vrai « mur d'images » de lookbook).
  return (
    <div className={`${wrap} gap-6 [column-gap:1.5rem] sm:columns-2 [&>figure]:mb-8`}>
      {images.map((item) => (
        <Figure key={item.src} item={item} {...shared} />
      ))}
    </div>
  );
}

/**
 * Corps éditorial d'une page projet.
 *
 * NOUVELLE LOGIQUE — texte et images DÉSOLIDARISÉS. Le texte de chaque chapitre
 * se lit comme le corps d'un article, sur une colonne lisible décalée
 * alternativement (jamais étiré pour « remplir » la hauteur d'une image). Les
 * images suivent, en composition asymétrique de type lookbook (voir
 * `ImageComposition`). Résultat : plus de vides verticaux, une page qui respire
 * comme un magazine imprimé.
 *
 * En RTL (arabe), le sens de lecture du navigateur miroite naturellement les
 * décalages — comportement attendu.
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

  // La citation vient s'intercaler au milieu du récit, en pleine largeur.
  const quoteAt = Math.min(1, chapters.length - 1);

  return (
    <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
      {chapters.map((ch, i) => {
        const flip = i % 2 === 1; // un chapitre sur deux : bloc décalé de l'autre côté
        const title = ch.title[lang] || ch.title.FR;
        const hasImages = !!ch.images?.length;

        // Le texte n'a JAMAIS d'image à côté de lui (les visuels sont dessous) :
        // inutile de le tasser dans une demi-colonne décalée qui laisserait un
        // grand vide latéral. Il occupe donc toute la largeur. S'il est assez
        // long, le corps passe en DEUX COLONNES façon article imprimé ; s'il est
        // court, une seule colonne lisible suffit (deux colonnes couperaient un
        // paragraphe de deux lignes en deux moitiés ridicules).
        const bodyLen = ch.body.reduce((n, p) => n + ((p[lang] || p.FR)?.length || 0), 0);
        const twoCol = bodyLen > 340;

        return (
          <section key={i} className="border-t-2 border-ink pt-10 md:pt-14">
            {/* ── Bloc texte : corps d'article pleine largeur, de hauteur
                    INDÉPENDANTE des images. ── */}
            <div>
              <div className="flex items-baseline gap-4">
                <span
                  className="font-sans text-[11px] uppercase tracking-editorial"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h2 className="mt-3 pb-[0.12em] font-serif text-[clamp(26px,3.6vw,52px)] italic leading-[1.05] tracking-tight text-ink">
                {title}
              </h2>

              <div
                className={`mt-6 font-sans text-[15px] leading-relaxed text-ink/80 ${
                  twoCol
                    ? 'md:columns-2 md:[column-gap:3.5rem]'
                    : 'md:max-w-[54ch]'
                }`}
              >
                {ch.body.map((para, j) => (
                  <p
                    key={j}
                    className={
                      // Lettrine sur le tout premier paragraphe de la page.
                      // Volontairement LTR UNIQUEMENT (`ltr:`) : en arabe les
                      // lettres sont liées, isoler et agrandir la première
                      // briserait la ligature — la lettrine n'existe pas dans
                      // cette tradition typographique.
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

            {/* ── Composition d'images asymétrique (lookbook) ── */}
            {hasImages && (
              <ImageComposition
                images={ch.images}
                flip={flip}
                lang={lang}
                projectTitle={projectTitle}
                onImageClick={onImageClick}
                zoomLabel={zoomLabel}
              />
            )}

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
