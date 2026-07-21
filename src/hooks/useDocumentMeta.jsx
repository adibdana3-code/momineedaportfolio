import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ui } from '../content/ui.js';

/**
 * Titre de l'onglet + méta-description, suivant la langue active.
 *
 * `index.html` ne peut porter qu'un seul titre (en français) : il sert de
 * valeur initiale avant l'hydratation de React. Ce hook le remplace dès le
 * montage de la page, puis à chaque changement de langue — l'arabe compris.
 *
 * @param {string} [pageTitle] titre de la page (ex. nom du projet). Composé
 *   avec le titre du site : « Projet — Dana Adib — Architecture ». Omis sur
 *   l'accueil, qui n'affiche que le titre du site.
 * @param {{skip?: boolean}} [options] `skip` neutralise le hook sans enfreindre
 *   les règles des hooks. Utile quand un composant délègue son rendu (et donc
 *   son titre) à un autre : les effets des ENFANTS s'exécutant avant ceux du
 *   parent, sans ce garde-fou le parent écraserait le titre posé par l'enfant
 *   (cas de ProjectDetail → NotFound sur un slug inconnu).
 */
export function useDocumentMeta(pageTitle, { skip = false } = {}) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (skip) return;
    const D = (ui[lang] || ui.FR).doc;

    document.title = pageTitle ? `${pageTitle} — ${D.title}` : D.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', D.description);
  }, [lang, pageTitle, skip]);
}

export default useDocumentMeta;
