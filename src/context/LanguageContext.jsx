import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Gestion d'état multilingue simple (FR / EN / AR — voir note sur l'allemand).
 * Volontairement léger (pas d'i18next) : le contenu est fourni via un
 * dictionnaire `t[lang]` défini au niveau des composants ou dans /src/content.
 *
 * L'arabe (AR) déclenche le mode RTL : on pose `dir="rtl"` + `lang="ar"` sur
 * <html>, ce qui inverse tout le layout et active les règles CSS spécifiques
 * (voir index.css). Les polices arabes (Reem Kufi + IBM Plex Sans Arabic) sont
 * chargées à la demande pour ne pas alourdir le chargement initial.
 */

// ⚠️ ALLEMAND (« DE ») RETIRÉ DU SÉLECTEUR (demande de Dana), mais GARDÉ EN
// RÉSERVE : toutes les traductions allemandes restent dans le code (ui.DE, le
// 3e argument de tri() dans content/projects.js, et les blocs `DE` des
// dictionnaires `t` des composants). Pour REMETTRE l'allemand plus tard, il
// suffit de rajouter 'DE' dans ce tableau (idéalement en 3e position) :
//   export const LANGS = ['FR', 'EN', 'DE', 'AR'];
export const LANGS = ['FR', 'EN', 'AR'];

// Langues à lecture droite→gauche.
export const RTL_LANGS = ['AR'];
export const isRTL = (lang) => RTL_LANGS.includes(lang);

const LanguageContext = createContext({
  lang: 'FR',
  setLang: () => {},
  dir: 'ltr',
});

/**
 * Charge à la demande la police de CORPS arabe (IBM Plex Sans Arabic), une seule
 * fois, quand l'arabe est sélectionné. Reem Kufi (titres & nom) est, lui, chargé
 * en permanence depuis index.html (il sert aussi au nom arabe de l'accueil).
 */
function ensureArabicFonts() {
  if (typeof document === 'undefined' || document.getElementById('ar-fonts')) return;
  const link = document.createElement('link');
  link.id = 'ar-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('FR');
  const dir = isRTL(lang) ? 'rtl' : 'ltr';

  // Applique la langue et le sens de lecture au niveau du document.
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('lang', lang.toLowerCase());
    el.setAttribute('dir', dir);
    if (isRTL(lang)) ensureArabicFonts();
  }, [lang, dir]);

  const value = useMemo(() => ({ lang, setLang, dir }), [lang, dir]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
