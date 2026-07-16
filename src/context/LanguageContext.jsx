import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Gestion d'état multilingue simple (FR / EN / DE).
 * Volontairement léger (pas d'i18next) : le contenu est fourni via un
 * dictionnaire `t[lang]` défini au niveau des composants ou dans /src/i18n.
 * On pourra basculer vers i18next si le volume de contenu l'exige.
 */

export const LANGS = ['FR', 'EN', 'DE'];

const LanguageContext = createContext({
  lang: 'FR',
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('FR');
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
