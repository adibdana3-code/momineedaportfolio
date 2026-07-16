import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ui } from '../content/ui.js';

/** Page 404 (routage React Router — distincte du 404.html GitHub Pages). */
export default function NotFound() {
  const { lang } = useLanguage();
  const T = (ui[lang] || ui.FR).notFound;
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-serif text-[clamp(80px,20vw,260px)] italic leading-none text-ink">
        404
      </h1>
      <p className="font-sans text-[11px] uppercase tracking-editorial text-ink/60">
        {T.text}
      </p>
      <Link
        to="/"
        data-link
        className="border-2 border-ink bg-butter px-6 py-3 font-sans text-[11px] uppercase tracking-editorial text-ink shadow-brutalSm transition-transform hover:-translate-y-0.5"
      >
        {T.home}
      </Link>
    </section>
  );
}
