import DrawLine from '../ui/DrawLine.jsx';
import MaskReveal from '../ui/MaskReveal.jsx';
import fr from '../../content/fr.js';

/**
 * Pied de page / contact. Titre colossal « Travaillons ensemble »,
 * email en grand, liens sociaux et mentions.
 */
export default function Footer() {
  const { identity, footer } = fr;

  return (
    <footer id="contact" className="bg-chalk px-10 pb-11 pt-[130px]">
      <DrawLine />

      <div className="mt-20 font-sans text-[10px] uppercase tracking-editorial text-amaranth">
        {footer.tag}
      </div>

      <div className="mt-6">
        <MaskReveal
          as="h2"
          className="m-0 whitespace-pre-line font-display text-[clamp(48px,11vw,180px)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-forest"
        >
          {footer.title}
        </MaskReveal>
      </div>

      <div className="mt-[70px] flex flex-wrap items-end justify-between gap-8">
        <a
          href={`mailto:${identity.email}`}
          data-link
          className="font-display text-[clamp(22px,3.2vw,44px)] font-semibold lowercase tracking-[-0.01em] text-amaranth transition-opacity duration-300 hover:opacity-70"
        >
          {identity.email}
        </a>
        <div className="flex gap-[34px]">
          <a
            href={identity.instagram}
            target="_blank"
            rel="noreferrer"
            data-link
            className="font-sans text-[10px] uppercase tracking-editorial text-forest transition-colors duration-300 hover:text-amaranth"
          >
            {footer.instagramLabel}
          </a>
          <a
            href="#top"
            data-link
            className="font-sans text-[10px] uppercase tracking-editorial text-forest transition-colors duration-300 hover:text-amaranth"
          >
            {footer.cvLabel}
          </a>
        </div>
      </div>

      <div className="mt-20 flex justify-between font-sans text-[10px] uppercase tracking-editorial text-olive">
        <span>{footer.copyright}</span>
        <span>{identity.cities}</span>
      </div>
    </footer>
  );
}
