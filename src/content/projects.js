/**
 * Données des projets — pilotent la grille d'accueil ET les pages projet.
 *
 * Deux familles via `category` :
 *   - 'architecture' → section « Projets » (magazine)
 *   - 'art'          → section « Art & Expérimentation »
 * Les deux partagent le même modèle de page (/projet/:slug).
 *
 * Champs i18n (title/place/typology/summary) : objets { FR, EN, DE }.
 * Images : `cover` (grille) + `hover` (survol A→B) + `gallery` (page projet),
 * optimisées en webp dans public/img/projects.
 *
 * ⚠️ Projet Hamra : métadonnées à CONFIRMER par Dana.
 */
const asset = (p) => `${import.meta.env.BASE_URL}img/projects/${p}`;
const model = (p) => `${import.meta.env.BASE_URL}models/${p}`;
// i18n : 4 langues. AR (arabe) retombe sur FR si non fourni → aucune casse.
const tri = (fr, en, de, ar) => ({ FR: fr, EN: en ?? fr, DE: de ?? fr, AR: ar ?? fr });
// span optionnel = classe de largeur desktop de la vignette dans la galerie
const g = (file, label, span) => ({ src: asset(file), label, span });

export const projects = [
  // ─────────────────────────── ARCHITECTURE ───────────────────────────
  // Ordre voulu (mise en valeur) : Wellness (majeur) → dossiers les plus
  // complets / effet « wow » → Détails (minimal) en clôture.
  {
    slug: 'wellness-rochefoucauld',
    num: '01',
    category: 'architecture',
    title: tri('Le Wellness Rochefoucauld', 'Le Wellness Rochefoucauld', 'Le Wellness Rochefoucauld', 'ويلنس روشفوكو'),
    place: tri('Paris', 'Paris', 'Paris', 'باريس'),
    year: '2026',
    typology: tri('Bien-être · Spa urbain', 'Wellness · Urban spa', 'Wellness · Stadt-Spa', 'عافية · سبا حضري'),
    summary: tri(
      "Un lieu de soin et de silence au cœur de Paris — travail sur la coupe, la lumière zénithale et l'enveloppe.",
      'A place of care and silence in the heart of Paris — a study of section, zenithal light and envelope.',
      'Ein Ort der Pflege und Stille im Herzen von Paris — eine Studie über Schnitt, Zenitlicht und Gebäudehülle.',
      'مكان للعناية والصمت في قلب باريس — دراسة في المقطع والضوء الزينيتي والغلاف.'
    ),
    color: 'bubblegum',
    cover: asset('s6-pers1.webp'),
    hover: asset('s6-pers2.webp'),
    hasModel: true,
    model3d: { type: 'fbx', url: model('wellness.fbx') },
    gallery: [
      g('s6-pers1.webp', 'Perspective'),
      g('s6-pers2.webp', 'Perspective'),
      g('s6-pers3.webp', 'Perspective'),
      g('s6-axo.webp', 'Axonométrie'),
      g('s6-coupe.webp', 'Coupe'),
      g('s6-elev-est.webp', 'Élévation est', 'md:col-span-8'), // grand
      g('s6-elev-sud.webp', 'Élévation sud', 'md:col-span-4'), // petit
      g('s6-elev-nord.webp', 'Élévation nord'),
      g('s6-elev-ouest.webp', 'Élévation ouest'),
    ],
  },
  {
    slug: 'maison-residentielle-etude',
    num: '02',
    category: 'architecture',
    title: tri('Maison résidentielle', 'Residential House', 'Wohnhaus', 'منزل سكني'),
    place: tri("Travail d'étude", 'Academic project', 'Studienarbeit', 'عمل أكاديمي'),
    year: '2025',
    typology: tri('Résidentiel · Revit', 'Residential · Revit', 'Wohnbau · Revit', 'سكني · Revit'),
    summary: tri(
      'Projet de studio — rendus intérieurs/extérieurs, plans et maquette 3D.',
      'Studio project — interior/exterior renders, plans and 3D model.',
      'Studioprojekt — Innen-/Außenrenderings, Pläne und 3D-Modell.',
      'مشروع استوديو — مناظر داخلية وخارجية، ومخططات، ومجسّم ثلاثي الأبعاد.'
    ),
    color: 'orange',
    cover: asset('maison-ind-rend-5.webp'),
    hover: asset('maison-ind-rend-2.webp'),
    hasModel: true,
    // `scene.hideMeshes` : retire du rendu le cercle/terrain (« Toposolid ») et la
    // barrière (« Railing », 209 meshes) qui polluaient la lecture du volume.
    model3d: { type: 'fbx', url: model('maison.fbx'), scene: { hideMeshes: ['Toposolid', 'Railing'] } },
    gallery: [
      // Plans juste sous la 3D (côte à côte) pour une meilleure lecture
      g('maison-ind-plan-rdc.webp', 'Plan RDC', 'md:col-span-6'),
      g('maison-ind-plan-r1.webp', 'Plan R+1', 'md:col-span-6'),
      g('maison-ind-rend-5.webp', 'Rendu'),
      g('maison-ind-rend-1.webp', 'Rendu'),
      g('maison-ind-rend-2.webp', 'Rendu'),
      g('maison-ind-rend-3.webp', 'Rendu'),
      g('maison-ind-rend-4.webp', 'Rendu'),
      g('maison-ind-1.webp', 'Vue'),
      g('maison-ind-2.webp', 'Vue'),
    ],
  },
  {
    slug: 'cuisine',
    num: '03',
    category: 'architecture',
    title: tri('Cuisine', 'Kitchen', 'Küche', 'مطبخ'),
    place: tri('Beyrouth', 'Beirut', 'Beirut', 'بيروت'),
    year: '2026',
    typology: tri('Design intérieur · Cuisine', 'Interior design · Kitchen', 'Innenarchitektur · Küche', 'تصميم داخلي · مطبخ'),
    summary: tri(
      "Étude d'une cuisine — visite 3D immersive à 360° depuis l'intérieur de la pièce.",
      'A kitchen study — immersive 360° walkthrough from inside the room.',
      'Studie einer Küche — immersiver 360°-Rundgang aus dem Rauminneren.',
      'دراسة مطبخ — جولة غامرة بزاوية 360° من داخل الغرفة.'
    ),
    color: 'acid',
    cover: asset('cuisine-1.webp'), // rendus réels intégrés (fondu A→B en grille)
    hover: asset('cuisine-3.webp'),
    hasModel: true,
    // `scene.interior` : caméra placée DANS la géométrie → visite panoramique (voir ModelViewer)
    model3d: { type: 'fbx', url: model('kitchen.fbx'), scene: { interior: true } },
    gallery: [
      g('cuisine-1.webp', 'Rendu'),
      g('cuisine-3.webp', 'Rendu'),
      g('cuisine-2.webp', 'Rendu'),
    ],
  },
  {
    slug: 'villa-montagnes-liban',
    num: '04',
    category: 'architecture',
    title: tri('Villa dans les montagnes', 'Villa in the Mountains', 'Villa in den Bergen', 'فيلا في الجبال'),
    place: tri('Liban', 'Lebanon', 'Libanon', 'لبنان'),
    year: '2025',
    typology: tri('Résidentiel · Villa', 'Residential · Villa', 'Wohnbau · Villa', 'سكني · فيلا'),
    summary: tri(
      'Une villa posée dans le relief libanais — maquette 3D interactive (Revit/GLB) à intégrer.',
      'A villa set into the Lebanese relief — interactive 3D model (Revit/GLB) to be integrated.',
      'Eine Villa im libanesischen Relief — interaktives 3D-Modell (Revit/GLB) folgt.',
      'فيلا تستقر في التضاريس اللبنانية — مجسّم ثلاثي الأبعاد تفاعلي.'
    ),
    color: 'acid',
    cover: asset('villa-fond.webp'),
    hover: asset('villa-fond.webp'),
    hasModel: true,
    model3d: { type: 'fbx', url: model('villa.fbx') },
    gallery: [g('villa-fond.webp', 'Vue')],
  },
  {
    slug: 'dat',
    num: '05',
    category: 'architecture',
    title: tri('D.A.T.', 'D.A.T.', 'D.A.T.', 'D.A.T.'),
    place: tri('Arabie Saoudite', 'Saudi Arabia', 'Saudi-Arabien', 'السعودية'),
    year: '2026',
    typology: tri('Tertiaire · Immeuble mixte', 'Mixed-use · Office building', 'Mischnutzung · Bürogebäude', 'مكاتب · مبنى متعدد الاستخدامات'),
    summary: tri(
      "Immeuble tertiaire en Arabie Saoudite — halls d'accueil, commerces et espaces de bureaux, autour d'un vocabulaire de moucharabiehs.",
      'A mixed-use office building in Saudi Arabia — reception lobbies, retail and workspaces built around a mashrabiya language.',
      'Ein Bürogebäude in Saudi-Arabien — Empfangshallen, Handel und Büroflächen rund um eine Maschrabiyya-Sprache.',
      'مبنى مكاتب في السعودية — بهوات استقبال ومحلات ومساحات عمل حول مفردات المشربية.'
    ),
    color: 'orange',
    cover: asset('dat-1.webp'),
    hover: asset('dat-2.webp'),
    hasModel: false,
    // Toutes les images « dat-* » du dossier images sont intégrées ici.
    gallery: [g('dat-1.webp', 'Hall'), g('dat-2.webp', 'Vue'), g('dat-3.webp', 'Vue')],
  },
  {
    slug: 'entree-de-bureaux',
    num: '06',
    category: 'architecture',
    title: tri('Entrée de bureaux', 'Office entrance', 'Bürolobby', 'مدخل مكاتب'),
    place: tri('Beyrouth', 'Beirut', 'Beirut', 'بيروت'),
    year: '2026',
    typology: tri('Tertiaire · Hall d’entrée', 'Office · Entrance lobby', 'Büro · Eingangshalle', 'مكاتب · بهو مدخل'),
    summary: tri(
      "Aménagement d'une entrée de bureaux — hall d'accueil, signalétique et matières, autour de l'identité de l'enseigne.",
      'Design of an office entrance — reception lobby, signage and materials, built around the brand identity.',
      'Gestaltung eines Büroeingangs — Empfangshalle, Beschilderung und Materialien rund um die Markenidentität.',
      'تهيئة مدخل مكاتب — بهو استقبال ولوحات إرشادية ومواد، حول هوية العلامة.'
    ),
    color: 'bubblegum',
    cover: asset('hamra-1.webp'),
    hover: asset('hamra-2.webp'),
    hasModel: false,
    gallery: [
      g('hamra-1.webp', 'Entrée'),
      g('hamra-2.webp', 'Hall'),
      g('hamra-3.webp', 'Détail — mur végétal'),
      g('hamra-4.webp', 'Détail'),
    ],
  },
  {
    slug: 'details-berlin',
    num: '07',
    category: 'architecture',
    title: tri('Détails', 'Details', 'Details', 'تفاصيل'),
    place: tri('Berlin', 'Berlin', 'Berlin', 'برلين'),
    year: '2024',
    typology: tri(
      "Détails d'exécution · Menuiserie",
      'Construction details · Joinery',
      'Ausführungsdetails · Tischlerei',
      'تفاصيل تنفيذية · نجارة'
    ),
    summary: tri(
      "Détails d'enveloppe et de menuiserie — stage en agence d'architecture, Berlin.",
      'Envelope and joinery details — architecture office internship, Berlin.',
      'Fassaden- und Tischlerdetails — Praktikum in einem Architekturbüro, Berlin.',
      'تفاصيل الغلاف والنجارة — تدريب في مكتب عمارة، برلين.'
    ),
    color: 'butter',
    cover: asset('berlin-detail.webp'),
    hover: asset('berlin-detail.webp'), // dp-* déplacées vers la section Art
    hasModel: false,
    // dp-1/2/3 retirées : elles inaugurent désormais la section « Art »
    gallery: [g('berlin-detail.webp', 'Détail')],
  },

  // ──────────────────────── ART & EXPÉRIMENTATION ──────────────────────
  {
    slug: 'littoral-variations',
    num: '01',
    category: 'art',
    title: tri('Littoral, variations', 'Shoreline, variations', 'Küste, Variationen', 'الساحل، تنويعات'),
    place: tri('Liban', 'Lebanon', 'Libanon', 'لبنان'),
    year: '2024',
    typology: tri('Photographie · Traitements', 'Photography · Treatments', 'Fotografie · Bearbeitungen', 'تصوير · معالجات'),
    summary: tri(
      "Un même littoral relu trois fois — détection, géométrie, trame. La côte comme matière à expérimentation.",
      'One shoreline read three times — detection, geometry, halftone. The coast as material for experiment.',
      'Eine Küste dreifach gelesen — Erkennung, Geometrie, Raster. Die Küste als Versuchsmaterial.',
      'ساحل واحد يُقرأ ثلاث مرات — كشف، هندسة، تنقيط. الساحل مادةً للتجريب.'
    ),
    color: 'acid',
    cover: asset('dp-1.webp'),
    hover: asset('dp-2.webp'),
    hasModel: false,
    gallery: [
      g('dp-1.webp', 'Détection'),
      g('dp-2.webp', 'Géométrie'),
      g('dp-3.webp', 'Trame'),
    ],
  },
  {
    slug: 'photographie-mode-manuel',
    num: '02',
    category: 'art',
    title: tri('Photographie en mode manuel', 'Manual-mode photography', 'Fotografie im manuellen Modus', 'تصوير بالوضع اليدوي'),
    place: tri('Séries personnelles', 'Personal series', 'Persönliche Serien', 'سلاسل شخصية'),
    year: '2024',
    typology: tri('Photographie · Mode manuel', 'Photography · Manual mode', 'Fotografie · Manueller Modus', 'تصوير · وضع يدوي'),
    summary: tri(
      "Apprendre la lumière en mode 100 % manuel — ouverture, vitesse, sensibilité. Quatre cadrages, quatre décisions.",
      'Learning light in fully manual mode — aperture, shutter, ISO. Four frames, four decisions.',
      'Licht lernen im rein manuellen Modus — Blende, Zeit, ISO. Vier Bilder, vier Entscheidungen.',
      'تعلّم الضوء بالوضع اليدوي بالكامل — فتحة، سرعة، حساسية. أربع لقطات، أربعة قرارات.'
    ),
    color: 'butter',
    cover: asset('photo-manuel-3.webp'), // vignette imposée : photo n°3
    hover: asset('photo-manuel-1.webp'),
    hasModel: false,
    gallery: [
      g('photo-manuel-1.webp', 'Mode manuel'),
      g('photo-manuel-2.webp', 'Mode manuel'),
      g('photo-manuel-3.webp', 'Mode manuel'),
      g('photo-manuel-4.webp', 'Mode manuel'),
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Vues filtrées par famille (grille projets, section Art, menu, navigation cyclique).
export const architectureProjects = projects.filter((p) => p.category === 'architecture');
export const artProjects = projects.filter((p) => p.category === 'art');

// Palette utilitaire (classes en toutes lettres pour le scanner Tailwind).
// Palette éditoriale (voir tailwind.config.js — mêmes valeurs remappées).
export const COLOR_HEX = {
  bubblegum: '#B5728A', // Thulian
  acid: '#AABAAE', // Brook Green
  orange: '#933B5B', // Amaranth
  butter: '#9F9679', // Pomelo
};

export const COLOR_BG = {
  bubblegum: 'bg-bubblegum',
  acid: 'bg-acid',
  orange: 'bg-orange',
  butter: 'bg-butter',
};

export const COLOR_TEXT = {
  bubblegum: 'text-bubblegum',
  acid: 'text-acid',
  orange: 'text-orange',
  butter: 'text-butter',
};

export const COLOR_GROUP_HOVER = {
  bubblegum: 'group-hover:text-bubblegum',
  acid: 'group-hover:text-acid',
  orange: 'group-hover:text-orange',
  butter: 'group-hover:text-butter',
};

export default projects;
