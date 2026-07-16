/**
 * Emplacement d'image (placeholder). Occupe tout le cadre parent (dont il
 * hérite la couleur de fond) et affiche un libellé discret. Sera remplacé
 * par une vraie image .webp — il suffira d'ajouter <img> ou un fond CSS.
 */
export default function PlaceholderImage({ label = '', src, alt = '', className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      <span className="px-6 text-center font-sans text-[10px] uppercase tracking-editorial text-forest/45">
        {label}
      </span>
    </div>
  );
}
