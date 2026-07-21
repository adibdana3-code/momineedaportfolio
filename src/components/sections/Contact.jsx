import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';
import Magnetic from '../ui/Magnetic.jsx';

const EMAIL = 'dana.adib@cesmo.org';
const INSTAGRAM = 'https://www.instagram.com/momineedaportfolio/';
const CV_URL = `${import.meta.env.BASE_URL}cv-dana-adib.pdf`;

// `instagram` : le nom de la plateforme est translittéré en arabe (إنستغرام),
// usage courant en RTL — le lien, lui, reste évidemment identique.
const t = {
  FR: { tag: '(Prenons contact)', title: 'Travaillons\nensemble', cv: 'CV (pdf)', instagram: 'Instagram', cities: 'Paris · Berlin · Beyrouth' },
  EN: { tag: "(Let's talk)", title: "Let's work\ntogether", cv: 'CV (pdf)', instagram: 'Instagram', cities: 'Paris · Berlin · Beirut' },
  DE: { tag: '(Kontakt)', title: 'Arbeiten wir\nzusammen', cv: 'CV (pdf)', instagram: 'Instagram', cities: 'Paris · Berlin · Beirut' },
  AR: { tag: '(لنتواصل)', title: 'لنعمل\nمعًا', cv: 'السيرة الذاتية (PDF)', instagram: 'إنستغرام', cities: 'باريس · برلين · بيروت' },
};

/** Contact — bloc plein Amaranth (#933B5B), texte Chalk pour le contraste. */
export default function Contact() {
  const { lang } = useLanguage();
  const c = t[lang] || t.FR;
  const C = (ui[lang] || ui.FR).cursor;

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
          className="mt-4 whitespace-pre-line pb-[0.24em] font-serif text-[clamp(48px,11vw,170px)] italic leading-[0.9] tracking-tight text-chalk"
        >
          {c.title}
        </motion.h2>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-8 border-t-2 border-chalk/30 pt-8">
        <Magnetic strength={0.3}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor={C.write}
            className="font-serif text-[clamp(22px,3.4vw,48px)] italic lowercase text-chalk underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {EMAIL}
          </a>
        </Magnetic>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <Magnetic strength={0.4}>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              data-link
              className="font-serif text-[clamp(22px,3vw,44px)] italic lowercase text-chalk underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
            >
              {c.instagram}
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor={C.open}
              className="font-serif text-[clamp(22px,3vw,44px)] italic lowercase text-chalk underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
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
