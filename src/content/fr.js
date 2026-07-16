/**
 * Contenu FR du site. Structure pensée pour accueillir EN/DE plus tard
 * (même forme d'objet sous src/content/en.js, de.js, sélection via LanguageContext).
 *
 * Projets = vrais rendus optimisés (public/img/projects/*.webp).
 * ⚠️ Les métadonnées (lieu, année, rôle, surface) sont à CONFIRMER par Dana.
 * Œuvres « Art » = encore des placeholders (pas de scans d'œuvres perso fournis).
 */

// Résout un chemin d'asset en tenant compte du base Vite (GitHub Pages)
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

export const fr = {
  identity: {
    name: 'Dana Adib',
    role: 'Architecte',
    email: 'adibdana3@gmail.com',
    instagram: 'https://www.instagram.com/momineedaportfolio/',
    cities: 'Paris · Berlin · Beyrouth',
  },
  nav: {
    projets: 'Projets',
    art: 'Art',
    studio: 'Studio',
    contact: 'Contact',
  },
  hero: {
    kicker: 'Portfolio — 2026',
    subKicker: 'Architecture & Espaces',
    location: 'Basée à Paris',
    availability: 'Disponible en commande',
    nameLine1: 'Dana',
    nameLine2: 'Adib',
    intro:
      "Une pratique de l'architecture pensée comme un récit : chaque projet, du croquis à l'espace bâti, cherche la juste tension entre matière, lumière et vide.",
    scroll: 'Défiler',
  },
  manifesto: {
    tag: '(Manifeste)',
    // Le mot mis en exergue est balisé par ** ** et rendu en italique amaranth.
    statement:
      "Concevoir un lieu, c'est **sculpter le silence** — dessiner ce qui reste quand la lumière traverse la pièce.",
  },
  giant: {
    chapter: 'Chapitre 01',
    caption: 'La matière du vide',
    word: 'Espaces',
  },
  gallery: {
    tag: '(Projets sélectionnés)',
    count: '04 — Réalisations',
    // Bloc « Espace 3D réservé »
    scene: {
      kicker: 'Espace 3D réservé',
      title: 'Maquette\ninteractive',
      caption: 'Rotation · Coupe · Lumière',
    },
    projects: [
      {
        id: 'proj-1',
        num: '01',
        title: 'Maison', // à confirmer
        place: 'Résidentiel — 2025', // à confirmer
        meta: 'Habitat individuel · Revit',
        sketch: 'Croquis · Vue extérieure',
        img: asset('img/projects/maison-exterieur.webp'),
        layout: 'col-start-1 col-span-6',
        aspect: 'aspect-[3/2]',
        bg: 'bg-brook',
        offset: '',
      },
      {
        id: 'proj-2',
        num: '02',
        title: 'DAT', // à confirmer
        place: 'Tertiaire — 2025', // à confirmer (Beyrouth ?)
        meta: 'Bureaux & commerce · Atrium',
        sketch: 'Croquis · Coupe',
        img: asset('img/projects/dat-atrium.webp'),
        layout: 'col-start-8 col-span-5',
        aspect: 'aspect-[4/3]',
        bg: 'bg-blush',
        offset: 'mt-[150px]',
      },
      {
        id: 'proj-3',
        num: '03',
        title: 'Détails',
        place: 'Berlin — Stage',
        meta: "Détails d'enveloppe · Menuiserie",
        sketch: 'Détail · Élévation',
        img: asset('img/projects/berlin-detail.webp'),
        layout: 'col-start-8 col-span-5',
        aspect: 'aspect-[4/3]',
        bg: 'bg-olive',
        offset: '',
      },
      {
        id: 'proj-4',
        num: '04',
        title: 'DAT — Retail', // à confirmer
        place: 'Tertiaire — 2025', // à confirmer
        meta: 'Devantures commerciales',
        sketch: 'Croquis · Façade',
        img: asset('img/projects/dat-retail.webp'),
        layout: 'col-start-1 col-span-6',
        aspect: 'aspect-[3/2]',
        bg: 'bg-brook',
        offset: 'mt-[60px]',
      },
    ],
  },
  art: {
    title: 'Art & Expérimentations',
    scrollHint: 'Défiler →',
    cartel: "Cartel d'exposition — travaux personnels",
    pieces: [
      { id: 'art-1', title: 'Étude n°01 — Seuils', medium: 'Encre sur papier', spec: '420 × 297 mm — 2024', w: 300, h: 400, bg: 'bg-brook', low: false },
      { id: 'art-2', title: 'Étude n°02 — Trames', medium: 'Gouache & graphite', spec: '594 × 420 mm — 2023', w: 360, h: 260, bg: 'bg-blush', low: true },
      { id: 'art-3', title: 'Étude n°03 — Ombres portées', medium: 'Cyanotype', spec: '297 × 210 mm — 2025', w: 280, h: 380, bg: 'bg-olive', low: false },
      { id: 'art-4', title: 'Étude n°04 — Pleins & vides', medium: 'Collage papier découpé', spec: '500 × 700 mm — 2024', w: 340, h: 300, bg: 'bg-amaranth', low: true },
      { id: 'art-5', title: 'Étude n°05 — Lumière rasante', medium: 'Photographie argentique', spec: '240 × 300 mm — 2022', w: 300, h: 420, bg: 'bg-brook', low: false },
      { id: 'art-6', title: 'Étude n°06 — Fragments', medium: 'Maquette carton plume', spec: 'Variable — 2025', w: 330, h: 280, bg: 'bg-blush', low: true },
    ],
  },
  skills: {
    tag: 'Logiciels',
    items: [
      { code: 'Ac', name: 'autocad' },
      { code: 'Su', name: 'sketchup' },
      { code: 'Rh', name: 'rhino' },
      { code: 'Ai', name: 'illustrator' },
      { code: 'Ps', name: 'photoshop' },
      { code: 'Id', name: 'indesign' },
    ],
  },
  footer: {
    tag: '(Prenons contact)',
    title: 'Travaillons\nensemble',
    cvLabel: 'CV',
    instagramLabel: 'Instagram',
    copyright: '© 2026 — Dana Adib',
  },
};

export default fr;
