/**
 * Dictionnaire des libellés d'interface (FR / EN / DE).
 * Usage : `const T = ui[lang] || ui.FR;` dans les composants.
 * Les contenus longs par section (Hero, Studio, Contact, Art) vivent dans
 * leurs propres composants ; ici : navigation, boutons, en-têtes, page projet.
 */
export const ui = {
  FR: {
    nav: { index: 'Index', projets: 'Projets', studio: 'Studio', contact: 'Contact' },
    menu: {
      open: 'Menu',
      close: 'Fermer',
      sections: 'Sections',
      home: 'Accueil',
      projets: 'Projets',
      art: 'Art & Expérimentation',
      skills: 'Logiciels',
      contact: 'Contact',
      architecture: 'Architecture',
      catArt: 'Art & Expérimentation',
    },
    projects: { tag: '(Projets sélectionnés)', index: 'Index — 05' },
    feature: { cta: 'Voir le projet →' },
    project: {
      back: '← Index',
      label: 'Projet',
      model: 'Maquette 3D',
      modelSoon: 'Bientôt interactive',
      modelWait: 'En attente du modèle Revit / GLB',
      scene: 'Scène 3D',
      docs: 'Documents & images',
      next: 'Projet suivant',
    },
    skills: 'Logiciels',
    notFound: { text: "Cette page n'existe pas", home: "Retour à l'accueil" },
  },
  EN: {
    nav: { index: 'Index', projets: 'Projects', studio: 'Studio', contact: 'Contact' },
    menu: {
      open: 'Menu',
      close: 'Close',
      sections: 'Sections',
      home: 'Home',
      projets: 'Projects',
      art: 'Art & Experiments',
      skills: 'Software',
      contact: 'Contact',
      architecture: 'Architecture',
      catArt: 'Art & Experiments',
    },
    projects: { tag: '(Selected projects)', index: 'Index — 05' },
    feature: { cta: 'View project →' },
    project: {
      back: '← Index',
      label: 'Project',
      model: '3D model',
      modelSoon: 'Coming soon',
      modelWait: 'Awaiting the Revit / GLB model',
      scene: '3D scene',
      docs: 'Documents & images',
      next: 'Next project',
    },
    skills: 'Software',
    notFound: { text: "This page doesn't exist", home: 'Back to home' },
  },
  DE: {
    nav: { index: 'Index', projets: 'Projekte', studio: 'Studio', contact: 'Kontakt' },
    menu: {
      open: 'Menü',
      close: 'Schließen',
      sections: 'Bereiche',
      home: 'Startseite',
      projets: 'Projekte',
      art: 'Kunst & Experimente',
      skills: 'Software',
      contact: 'Kontakt',
      architecture: 'Architektur',
      catArt: 'Kunst & Experimente',
    },
    projects: { tag: '(Ausgewählte Projekte)', index: 'Index — 05' },
    feature: { cta: 'Projekt ansehen →' },
    project: {
      back: '← Index',
      label: 'Projekt',
      model: '3D-Modell',
      modelSoon: 'Bald interaktiv',
      modelWait: 'Warten auf das Revit-/GLB-Modell',
      scene: '3D-Szene',
      docs: 'Dokumente & Bilder',
      next: 'Nächstes Projekt',
    },
    skills: 'Software',
    notFound: { text: 'Diese Seite existiert nicht', home: 'Zurück zur Startseite' },
  },
};

export default ui;
