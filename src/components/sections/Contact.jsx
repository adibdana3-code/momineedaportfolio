import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import Magnetic from '../ui/Magnetic.jsx';

const EMAIL = 'adibdana3@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/momineedaportfolio/';
const CV_URL = `${import.meta.env.BASE_URL}cv-dana-adib.pdf`;

const t = {
  FR: { tag: '(Prenons contact)', title: 'Travaillons\nensemble', cv: 'CV (pdf)', cities: 'Paris · Berlin · Beyrouth' },
  EN: { tag: "(Let's talk)", title: "Let's work\ntogether", cv: 'CV (pdf)', cities: 'Paris · Berlin · Beirut' },
  DE: { tag: '(Kontakt)', title: 'Arbeiten wir\nzusammen', cv: 'CV (pdf)', cities: 'Paris · Berlin · Beirut' },
};

/** Contact — bloc plein Amaranth (#933B5B), texte Chalk pour le contraste. */
export default function Contact() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;

  return (
    <footer id="contact" className="border-t-2 border-ink bg-amaranth px-6 py-24 text-chalk md:px-10 md:py-32">
      <span className="font-sans text-[11px] uppercase tracking-editorial text-chalk/70">
        {c.tag}
      </span>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 whitespace-pre-line font-serif text-[clamp(48px,11vw,170px)] italic leading-[0.9] tracking-tight text-chalk"
        >
          {c.title}
        </motion.h2>
      </div>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t-2 border-chalk/30 pt-8">
        <Magnetic strength={0.3}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Écrire"
            className="font-serif text-[clamp(22px,3.4vw,48px)] italic lowercase text-chalk underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {EMAIL}
          </a>
        </Magnetic>
        <div className="flex gap-8">
          <Magnetic strength={0.45}>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              data-link
              className="font-sans text-[11px] uppercase tracking-editorial text-chalk transition-opacity hover:opacity-60"
            >
              Instagram
            </a>
          </Magnetic>
          <Magnetic strength={0.45}>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="Ouvrir"
              className="font-sans text-[11px] uppercase tracking-editorial text-chalk transition-opacity hover:opacity-60"
            >
              {c.cv}
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-between gap-4 font-sans text-[10px] uppercase tracking-editorial text-chalk/60">
        <span>© 2026 — Dana Adib</span>
        <span>{c.cities}</span>
      </div>
    </footer>
  );
}
