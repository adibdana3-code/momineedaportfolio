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
import { ui } from './ui.js';

const asset = (p) => `${import.meta.env.BASE_URL}img/projects/${p}`;
const model = (p) => `${import.meta.env.BASE_URL}models/${p}`;
// i18n : 4 langues. AR (arabe) retombe sur FR si non fourni → aucune casse.
const tri = (fr, en, de, ar) => ({ FR: fr, EN: en ?? fr, DE: de ?? fr, AR: ar ?? fr });

/**
 * Légendes des documents de galerie (le cartel sous chaque image de la page
 * projet). Elles étaient auparavant écrites en dur en français : elles sont
 * désormais traduites dans les quatre langues, comme le reste du site.
 * Le vocabulaire est mutualisé — « Perspective », « Rendu », « Vue »…
 * reviennent dans plusieurs projets.
 */
const GL = {
  perspective: tri('Perspective', 'Perspective', 'Perspektive', 'منظور'),
  axo: tri('Axonométrie', 'Axonometry', 'Axonometrie', 'رسم أكسونومتري'),
  axoProg: tri(
    'Axonométrie programmatique',
    'Programmatic axonometry',
    'Programmatische Axonometrie',
    'رسم أكسونومتري برنامجي'
  ),
  coupe: tri('Coupe', 'Section', 'Schnitt', 'مقطع'),
  elevEst: tri('Élévation est', 'East elevation', 'Ostansicht', 'واجهة شرقية'),
  elevSud: tri('Élévation sud', 'South elevation', 'Südansicht', 'واجهة جنوبية'),
  elevNord: tri('Élévation nord', 'North elevation', 'Nordansicht', 'واجهة شمالية'),
  elevOuest: tri('Élévation ouest', 'West elevation', 'Westansicht', 'واجهة غربية'),
  planRdc: tri('Plan RDC', 'Ground floor plan', 'Grundriss EG', 'مخطط الطابق الأرضي'),
  planR1: tri('Plan R+1', 'First floor plan', 'Grundriss 1. OG', 'مخطط الطابق الأول'),
  planMasse: tri('Plan-masse & flux', 'Site plan & flows', 'Lageplan & Wege', 'مخطط عام وحركة'),
  rendu: tri('Rendu', 'Render', 'Rendering', 'صورة تصييرية'),
  vue: tri('Vue', 'View', 'Ansicht', 'منظر'),
  maquette: tri('Maquette physique', 'Physical model', 'Physisches Modell', 'مجسّم مادي'),
  hall: tri('Hall', 'Lobby', 'Halle', 'بهو'),
  entree: tri('Entrée', 'Entrance', 'Eingang', 'مدخل'),
  detail: tri('Détail', 'Detail', 'Detail', 'تفصيل'),
  detailMurVegetal: tri(
    'Détail — mur végétal',
    'Detail — green wall',
    'Detail — begrünte Wand',
    'تفصيل — جدار نباتي'
  ),
  logotype: tri('Logotype', 'Logotype', 'Logotype', 'شعار'),
  detection: tri('Détection', 'Detection', 'Erkennung', 'كشف'),
  geometrie: tri('Géométrie', 'Geometry', 'Geometrie', 'هندسة'),
  trame: tri('Trame', 'Halftone', 'Raster', 'تنقيط'),
  modeManuel: tri('Mode manuel', 'Manual mode', 'Manueller Modus', 'وضع يدوي'),
};

// span optionnel = classe de largeur desktop de la vignette dans la galerie.
// `key` renvoie à une entrée de GL ci-dessus → légende traduite.
const g = (file, key, span) => ({ src: asset(file), label: GL[key], span });

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
    typology: tri(
      'Bien-être · Centre & logement',
      'Wellness · Centre & dwelling',
      'Wellness · Zentrum & Wohnung',
      'عافية · مركز ومسكن'
    ),
    summary: tri(
      "Un centre de bien-être holistique dans le XIVe arrondissement de Paris — soin, nature et intériorité, autour d'un patio qui relie la terre au ciel.",
      'A holistic wellness centre in the 14th arrondissement of Paris — care, nature and interiority, around a patio connecting earth to sky.',
      'Ein ganzheitliches Wellnesszentrum im 14. Arrondissement von Paris — Pflege, Natur und Innerlichkeit rund um einen Patio, der Erde und Himmel verbindet.',
      'مركز عافية شمولي في الدائرة الرابعة عشرة بباريس — عناية وطبيعة وباطن، حول فناء يصل الأرض بالسماء.'
    ),
    color: 'bubblegum',
    cover: asset('s6-pers1.webp'),
    hover: asset('s6-pers2.webp'),
    hasModel: true,
    model3d: { type: 'fbx', url: model('wellness.fbx') },
    gallery: [
      g('s6-pers1.webp', 'perspective'),
      g('s6-pers2.webp', 'perspective'),
      g('s6-pers3.webp', 'perspective'),
      g('s6-axo.webp', 'axo'),
      g('s6-coupe.webp', 'coupe'),
      g('s6-elev-est.webp', 'elevEst', 'md:col-span-8'), // grand
      g('s6-elev-sud.webp', 'elevSud', 'md:col-span-4'), // petit
      g('s6-elev-nord.webp', 'elevNord'),
      g('s6-elev-ouest.webp', 'elevOuest'),
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
      g('maison-ind-plan-rdc.webp', 'planRdc', 'md:col-span-6'),
      g('maison-ind-plan-r1.webp', 'planR1', 'md:col-span-6'),
      g('maison-ind-rend-5.webp', 'rendu'),
      g('maison-ind-rend-1.webp', 'rendu'),
      g('maison-ind-rend-2.webp', 'rendu'),
      g('maison-ind-rend-3.webp', 'rendu'),
      g('maison-ind-rend-4.webp', 'rendu'),
      g('maison-ind-1.webp', 'vue'),
      g('maison-ind-2.webp', 'vue'),
    ],
  },
  {
    slug: 'rehabilitation-tourcoing',
    num: '03',
    category: 'architecture',
    title: tri(
      'Réhabilitation — Tourcoing',
      'Rehabilitation — Tourcoing',
      'Sanierung — Tourcoing',
      'إعادة تأهيل — توركوان'
    ),
    place: tri('Tourcoing', 'Tourcoing', 'Tourcoing', 'توركوان'),
    year: '2025',
    typology: tri(
      'Réhabilitation urbaine · 195 logements',
      'Urban rehabilitation · 195 dwellings',
      'Stadtsanierung · 195 Wohnungen',
      'إعادة تأهيل حضري · ١٩٥ مسكناً'
    ),
    summary: tri(
      "Réhabilitation d'un îlot à Tourcoing — 195 logements, cœurs d'îlot désimperméabilisés et maquette physique comme outil de projet.",
      'Rehabilitation of an urban block in Tourcoing — 195 dwellings, de-paved block cores and a physical model as a design tool.',
      'Sanierung eines Blocks in Tourcoing — 195 Wohnungen, entsiegelte Blockinnenbereiche und ein physisches Modell als Entwurfswerkzeug.',
      'إعادة تأهيل جزيرة عمرانية في توركوان — ١٩٥ مسكناً، وقلوب جزر مُزالة الإسمنت، ومجسّم مادي كأداة تصميم.'
    ),
    color: 'acid',
    cover: asset('tourcoing-1.webp'), // 1re photo de la maquette physique (imposée)
    hover: asset('tourcoing-2.webp'),
    hasModel: false,
    gallery: [
      g('tourcoing-1.webp', 'maquette'),
      g('tourcoing-2.webp', 'perspective'),
      g('tourcoing-3.webp', 'axoProg'),
      g('tourcoing-4.webp', 'planMasse'),
    ],
  },
  {
    slug: 'cuisine',
    num: '04',
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
    cover: asset('cuisine-3.webp'), // vignette imposée : cuisine-3
    hover: asset('cuisine-1.webp'),
    hasModel: true,
    // `scene.interior` : caméra placée DANS la géométrie → visite panoramique (voir ModelViewer)
    model3d: { type: 'fbx', url: model('kitchen.fbx'), scene: { interior: true } },
    gallery: [
      g('cuisine-1.webp', 'rendu'),
      g('cuisine-3.webp', 'rendu'),
      g('cuisine-2.webp', 'rendu'),
    ],
  },
  {
    slug: 'villa-montagnes-liban',
    num: '05',
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
    gallery: [g('villa-fond.webp', 'vue')],
  },
  {
    slug: 'dat',
    num: '06',
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
    gallery: [g('dat-1.webp', 'hall'), g('dat-2.webp', 'vue'), g('dat-3.webp', 'vue')],
  },
  {
    slug: 'entree-de-bureaux',
    num: '07',
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
    cover: asset('hamra-3.webp'), // vignette imposée : hamra-3
    hover: asset('hamra-1.webp'),
    hasModel: false,
    gallery: [
      g('hamra-1.webp', 'entree'),
      g('hamra-2.webp', 'hall'),
      g('hamra-3.webp', 'detailMurVegetal'),
      g('hamra-4.webp', 'detail'),
    ],
  },
  {
    slug: 'details-berlin',
    num: '08',
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
    // Le cartouche (title block) a été rogné à la SOURCE (image recadrée à
    // 1570px) → il n'apparaît nulle part, plus besoin de zoom CSS.
    hasModel: false,
    // dp-1/2/3 retirées : elles inaugurent désormais la section « Art »
    gallery: [g('berlin-detail.webp', 'detail')],
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
      g('dp-1.webp', 'detection'),
      g('dp-2.webp', 'geometrie'),
      g('dp-3.webp', 'trame'),
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
      g('photo-manuel-1.webp', 'modeManuel'),
      g('photo-manuel-2.webp', 'modeManuel'),
      g('photo-manuel-3.webp', 'modeManuel'),
      g('photo-manuel-4.webp', 'modeManuel'),
    ],
  },
  {
    slug: 'bague-blender',
    num: '03',
    category: 'art',
    title: tri('Bague — design 3D', 'Ring — 3D design', 'Ring — 3D-Design', 'خاتم — تصميم ثلاثي الأبعاد'),
    place: tri('Modélisation Blender', 'Blender modelling', 'Blender-Modellierung', 'نمذجة بـ Blender'),
    year: '2026',
    typology: tri(
      "Design d'objet · Bijou 3D",
      'Object design · 3D jewellery',
      'Objektdesign · 3D-Schmuck',
      'تصميم منتج · مجوهرات ثلاثية الأبعاد'
    ),
    summary: tri(
      "Une bague modélisée sous Blender — passage de l'échelle du bâtiment à celle du bijou, explorée en 3D interactive.",
      'A ring modelled in Blender — a shift from the scale of the building to that of jewellery, explored in interactive 3D.',
      'Ein in Blender modellierter Ring — vom Maßstab des Gebäudes zu dem des Schmucks, interaktiv in 3D erkundet.',
      'خاتم مُنمذج بـ Blender — انتقال من مقياس المبنى إلى مقياس المجوهرات، بتجربة ثلاثية الأبعاد تفاعلية.'
    ),
    color: 'bubblegum',
    // Couverture = capture PDV 3/4 générée depuis le modèle 3D lui-même.
    cover: asset('bague-cover.webp'),
    hover: asset('bague-cover.webp'),
    hasModel: true,
    model3d: { type: 'glb', url: model('bague.glb') },
    gallery: [],
  },
  {
    slug: 'tabouret',
    num: '04',
    category: 'art',
    title: tri('Tabouret', 'Stool', 'Hocker', 'مقعد'),
    place: tri("Design d'objet", 'Object design', 'Objektdesign', 'تصميم منتج'),
    year: '2025',
    typology: tri(
      'Design de mobilier · Assise',
      'Furniture design · Seat',
      'Möbeldesign · Sitzmöbel',
      'تصميم أثاث · مقعد'
    ),
    summary: tri(
      "Un tabouret dessiné comme un petit manifeste d'assise — structure, matière et équilibre à l'échelle du corps.",
      'A stool designed as a small manifesto of seating — structure, material and balance at the scale of the body.',
      'Ein Hocker, entworfen als kleines Manifest des Sitzens — Struktur, Material und Gleichgewicht im Maßstab des Körpers.',
      'مقعد مُصمَّم كبيانٍ صغير للجلوس — بنية ومادة وتوازن على مقياس الجسد.'
    ),
    color: 'butter',
    cover: asset('tabouret-couv.webp'),
    hover: asset('tabouret-1.webp'), // survol A→B
    hasModel: true,
    // Export SimLab (CAO) : son unique matériau hérite de `metallicFactor: 1`
    // sans environnement → rendrait noir. `forceColor` applique la couleur
    // d'accent du projet (voir ModelViewer.GLBModel).
    model3d: { type: 'glb', url: model('tabouret.glb'), scene: { forceColor: true } },
    // 2 photos distinctes : l'ancienne « tabouret-3 » était un doublon exact de
    // « tabouret-1 » (même MD5) → retirée.
    gallery: [g('tabouret-1.webp', 'vue'), g('tabouret-2.webp', 'vue')],
  },
  {
    slug: 'logo-ajfl',
    num: '05',
    category: 'art',
    title: tri('Logo AJFL', 'AJFL Logo', 'AJFL-Logo', 'شعار AJFL'),
    place: tri(
      'Association des Juristes Franco-Libanais',
      'French-Lebanese Lawyers Association',
      'Vereinigung franko-libanesischer Juristen',
      'جمعية الحقوقيين الفرنسيين اللبنانيين'
    ),
    year: '2025',
    typology: tri(
      'Identité visuelle · Logotype',
      'Visual identity · Logotype',
      'Visuelle Identität · Logotype',
      'هوية بصرية · شعار'
    ),
    summary: tri(
      "Un logotype qui fait tenir trois symboles en une seule silhouette : la Tour Eiffel, le Cèdre du Liban et la Balance de la Justice.",
      'A logotype holding three symbols in a single silhouette: the Eiffel Tower, the Cedar of Lebanon and the Scales of Justice.',
      'Ein Logo, das drei Symbole in einer einzigen Silhouette vereint: Eiffelturm, Libanon-Zeder und Waage der Justitia.',
      'شعار يجمع ثلاثة رموز في صورة ظلية واحدة: برج إيفل، وأرزة لبنان، وميزان العدالة.'
    ),
    color: 'acid',
    cover: asset('logo-ajfl.webp'),
    hover: asset('logo-ajfl.webp'),
    hasModel: false,
    gallery: [g('logo-ajfl.webp', 'logotype')],
    // Section « genèse » : les trois signes de référence puis leur fusion.
    // ⚠️ Visuels de référence = placeholders SVG (voir ui/GenesisMarks.jsx).
    genesis: {
      title: tri('Genèse du logo', 'Genesis of the logo', 'Entstehung des Logos', 'نشأة الشعار'),
      intro: tri(
        "Trois signes, trois appartenances. Le logotype ne les juxtapose pas : il les emboîte, jusqu'à ce qu'on ne sache plus où finit l'un et où commence l'autre.",
        'Three signs, three belongings. The logotype does not juxtapose them: it nests them, until one no longer knows where one ends and the next begins.',
        'Drei Zeichen, drei Zugehörigkeiten. Das Logo stellt sie nicht nebeneinander, sondern verschränkt sie, bis man nicht mehr weiß, wo das eine endet und das andere beginnt.',
        'ثلاثة رموز، ثلاثة انتماءات. لا يضعها الشعار جنباً إلى جنب، بل يُشابكها حتى لا يُعرف أين ينتهي أحدها ويبدأ الآخر.'
      ),
      items: [
        {
          key: 'eiffel',
          label: tri('La Tour Eiffel', 'The Eiffel Tower', 'Der Eiffelturm', 'برج إيفل'),
          note: tri(
            'La France — structure et verticalité, ossature du logotype.',
            'France — structure and verticality, the backbone of the logotype.',
            'Frankreich — Struktur und Vertikalität, das Rückgrat des Logos.',
            'فرنسا — البنية والارتفاع، هيكل الشعار.'
          ),
        },
        {
          key: 'cedar',
          label: tri('Le Cèdre du Liban', 'The Cedar of Lebanon', 'Die Libanon-Zeder', 'أرزة لبنان'),
          note: tri(
            'Le Liban — étagement horizontal, qui vient coiffer la structure.',
            'Lebanon — horizontal tiers, crowning the structure.',
            'Libanon — horizontale Staffelung, die die Struktur krönt.',
            'لبنان — تدرّج أفقي يتوّج البنية.'
          ),
        },
        {
          key: 'scales',
          label: tri('La Balance de la Justice', 'The Scales of Justice', 'Die Waage der Justitia', 'ميزان العدالة'),
          note: tri(
            "Le droit — le fléau s'accroche à la première plateforme, plateaux en suspens.",
            'The law — the beam hooks onto the first platform, pans in suspension.',
            'Das Recht — der Waagebalken hängt sich an die erste Plattform, die Schalen schweben.',
            'القانون — تتعلّق الذراع بالمنصّة الأولى، والكفّتان معلّقتان.'
          ),
        },
      ],
      // Crédit affiché sous CHAQUE visuel de référence.
      credit: tri(
        'Illustration de substitution — à remplacer par le visuel de référence et son crédit source.',
        'Placeholder illustration — to be replaced by the reference image and its source credit.',
        'Platzhalter-Illustration — durch das Referenzbild und seinen Quellennachweis zu ersetzen.',
        'رسم بديل مؤقّت — يُستبدل بالصورة المرجعية ومصدرها.'
      ),
      resultLabel: tri(
        'Fusion — le logotype AJFL',
        'Fusion — the AJFL logotype',
        'Fusion — das AJFL-Logo',
        'الدمج — شعار AJFL'
      ),
    },
  },
];

/**
 * Articles éditoriaux façon magazine de design — TEXTES D'ATTENTE (à remplacer
 * par les vrais textes de Dana). Chaque entrée : { lead (chapô), body[] (corps
 * en colonnes), quote (citation mise en avant) } × { FR, EN, DE }.
 * (AR non fourni ici → repli sur FR côté rendu ; Dana n'a demandé que 3 langues.)
 */
const ARTICLES = {
  // Wellness : chapô + citation. Le corps du texte est découpé en CHAPITRES
  // (voir CHAPTERS ci-dessous) — d'où un `body` vide ici.
  'wellness-rochefoucauld': {
    FR: {
      lead: "Situé dans le XIVe arrondissement de Paris, sur le site de l'ancien hôpital de la Rochefoucauld, ce centre de bien-être a été pensé pour un couple de praticiens formés à la kinésithérapie, dont l'approche du soin s'est élargie vers une pratique plus somatique : consultations individuelles, yoga, méditation guidée, massages et thérapies corporelles globales. Le programme répond à un double besoin : une activité en rez-de-chaussée, et un logement aux étages supérieurs.",
      body: [],
      quote: "Le patio relie la terre au ciel à travers tout le bâtiment.",
    },
    EN: {
      lead: 'Located in the 14th arrondissement of Paris, on the site of the former Rochefoucauld hospital, this wellness centre was designed for a couple of practitioners trained in physiotherapy, whose approach to care has broadened towards a more somatic practice: individual consultations, yoga, guided meditation, massage and whole-body therapies. The brief answers a twofold need: a practice on the ground floor, and a dwelling on the upper levels.',
      body: [],
      quote: 'The patio connects earth to sky through the entire building.',
    },
    DE: {
      lead: 'Im 14. Arrondissement von Paris, auf dem Gelände des ehemaligen Krankenhauses La Rochefoucauld, entstand dieses Wellnesszentrum für ein Therapeutenpaar mit physiotherapeutischer Ausbildung, dessen Verständnis von Pflege sich zu einer stärker somatischen Praxis erweitert hat: Einzelkonsultationen, Yoga, geführte Meditation, Massagen und ganzheitliche Körpertherapien. Das Programm beantwortet einen doppelten Bedarf: eine Praxis im Erdgeschoss und eine Wohnung in den Obergeschossen.',
      body: [],
      quote: 'Der Patio verbindet Erde und Himmel durch das gesamte Gebäude.',
    },
    AR: {
      lead: 'يقع هذا المركز للعافية في الدائرة الرابعة عشرة من باريس، على أرض مستشفى لا روشفوكو السابق، وقد صُمِّم لزوجين معالِجَين تكوَّنا في العلاج الفيزيائي، ثم اتّسعت مقاربتهما للعناية نحو ممارسة أكثر جسدانية: استشارات فردية، ويوغا، وتأمّل موجَّه، وتدليك، وعلاجات جسدية شاملة. يستجيب البرنامج لحاجة مزدوجة: نشاط مهني في الطابق الأرضي، ومسكن في الطوابق العليا.',
      body: [],
      quote: 'الفناء يصل الأرض بالسماء عبر المبنى بأكمله.',
    },
  },
  'maison-residentielle-etude': {
    FR: {
      lead: "Exercice d'école devenu manifeste domestique, la Maison résidentielle explore la manière dont une famille habite la lumière autant que les murs.",
      body: [
        "Le plan distingue clairement le jour et la nuit : un socle ouvert et traversant accueille la vie commune, tandis que l'étage se replie autour de l'intimité des chambres.",
        "Les rendus, produits sous Revit, servent moins à séduire qu'à vérifier : matières, ombres portées et cadrages sont testés jusqu'à ce que le projet tienne debout dans le détail.",
      ],
      quote: "Dessiner une maison, c'est écrire une journée entière.",
    },
    EN: {
      lead: "A school exercise turned domestic manifesto, the Residential House explores how a family inhabits light as much as walls.",
      body: [
        "The plan clearly separates day from night: an open, through-flowing base holds the shared life, while the upper floor folds around the privacy of the bedrooms.",
        "Produced in Revit, the renders are less about seduction than verification: materials, cast shadows and framings are tested until the project holds together in detail.",
      ],
      quote: "To draw a house is to write a whole day.",
    },
    DE: {
      lead: "Eine Schulübung, die zum häuslichen Manifest wird: Das Wohnhaus erkundet, wie eine Familie ebenso das Licht wie die Wände bewohnt.",
      body: [
        "Der Grundriss trennt Tag und Nacht klar: Ein offener, durchlässiger Sockel nimmt das gemeinsame Leben auf, während sich das Obergeschoss um die Privatheit der Schlafräume legt.",
        "Die in Revit erstellten Renderings dienen weniger der Verführung als der Prüfung: Materialien, Schlagschatten und Bildausschnitte werden getestet, bis das Projekt im Detail trägt.",
      ],
      quote: "Ein Haus zeichnen heißt, einen ganzen Tag schreiben.",
    },
    AR: {
      lead: "تمرين دراسي صار بياناً منزلياً: يستكشف «المنزل السكني» كيف تسكن عائلةٌ الضوءَ بقدر ما تسكن الجدران.",
      body: [
        "يفصل المخطط بوضوح بين النهار والليل: قاعدة مفتوحة ونافذة تستقبل الحياة المشتركة، بينما ينطوي الطابق العلوي حول خصوصية الغرف.",
        "الصور المُنتَجة عبر Revit لا تسعى إلى الإغراء بل إلى التحقّق: تُختبر المواد والظلال والتأطيرات حتى يصمد المشروع في تفاصيله.",
      ],
      quote: "أن ترسم منزلاً يعني أن تكتب يوماً بأكمله.",
    },
  },
  cuisine: {
    FR: {
      lead: "Pièce de la vie quotidienne portée au rang de scène, cette cuisine se visite de l'intérieur, à 360°, comme on tournerait sur soi-même au centre d'un espace.",
      body: [
        "Le dessin cherche la continuité : plans de travail, rangements et circulations forment une seule ligne qui enveloppe l'usager sans jamais l'enfermer.",
        "La maquette immersive permet d'éprouver les proportions réelles — hauteur des meubles, largeur des passages — avant même la première découpe.",
      ],
      quote: "Habiter la cuisine, c'est habiter le geste.",
    },
    EN: {
      lead: "An everyday room raised to the status of a stage, this kitchen is visited from the inside, at 360°, as if turning on oneself at the centre of a space.",
      body: [
        "The design seeks continuity: worktops, storage and circulation form a single line that wraps around the user without ever confining them.",
        "The immersive model makes it possible to test real proportions — cabinet heights, passage widths — before the very first cut.",
      ],
      quote: "To inhabit the kitchen is to inhabit the gesture.",
    },
    DE: {
      lead: "Ein Alltagsraum, der zur Bühne erhoben wird: Diese Küche wird von innen erlebt, in 360°, als drehte man sich in der Mitte eines Raums um sich selbst.",
      body: [
        "Der Entwurf sucht Kontinuität: Arbeitsflächen, Stauraum und Wege bilden eine einzige Linie, die den Nutzer umschließt, ohne ihn je einzuengen.",
        "Das immersive Modell erlaubt es, reale Proportionen zu prüfen — Möbelhöhen, Durchgangsbreiten — noch vor dem ersten Schnitt.",
      ],
      quote: "Die Küche bewohnen heißt, die Geste bewohnen.",
    },
    AR: {
      lead: "غرفةٌ من الحياة اليومية تُرفَع إلى مرتبة المشهد: يُزار هذا المطبخ من الداخل، بزاوية ٣٦٠°، كمن يدور حول نفسه في وسط الفضاء.",
      body: [
        "يبحث التصميم عن الاستمرارية: تشكّل أسطح العمل والخزائن والممرات خطاً واحداً يحيط بالمستخدم دون أن يحبسه.",
        "يتيح المجسّم الغامر اختبار النسب الحقيقية — ارتفاع الأثاث، عرض الممرات — قبل أول قطعٍ للمواد.",
      ],
      quote: "أن تسكن المطبخ يعني أن تسكن الحركة.",
    },
  },
  'villa-montagnes-liban': {
    FR: {
      lead: "Posée dans le relief libanais, la villa négocie sa présence avec la pente : elle s'ancre, s'étire et cadre le paysage plutôt que de le dominer.",
      body: [
        "Les terrasses successives prolongent les pièces vers l'extérieur et transforment la topographie en séquence d'usages : on descend d'un salon à un jardin comme on descendrait la montagne.",
        "La maquette 3D interactive donne à lire les volumes dans leur épaisseur, et révèle comment la lumière rasante du soir sculpte les façades.",
      ],
      quote: "Construire en pente, c'est composer avec plus grand que soi.",
    },
    EN: {
      lead: "Set into the Lebanese relief, the villa negotiates its presence with the slope: it anchors, stretches and frames the landscape rather than dominating it.",
      body: [
        "Successive terraces extend the rooms outward and turn the topography into a sequence of uses: one descends from a living room to a garden as one would descend the mountain.",
        "The interactive 3D model reveals the volumes in their depth, and shows how the low evening light sculpts the façades.",
      ],
      quote: "To build on a slope is to compose with something greater than oneself.",
    },
    DE: {
      lead: "In das libanesische Relief gesetzt, verhandelt die Villa ihre Präsenz mit dem Hang: Sie verankert sich, streckt sich und rahmt die Landschaft, statt sie zu beherrschen.",
      body: [
        "Aufeinanderfolgende Terrassen führen die Räume nach außen und verwandeln die Topografie in eine Abfolge von Nutzungen: Man steigt von einem Wohnraum zu einem Garten hinab wie den Berg hinunter.",
        "Das interaktive 3D-Modell macht die Volumen in ihrer Tiefe lesbar und zeigt, wie das flache Abendlicht die Fassaden formt.",
      ],
      quote: "Am Hang bauen heißt, mit etwas Größerem als man selbst komponieren.",
    },
    AR: {
      lead: "مستقرّة في التضاريس اللبنانية، تفاوض الفيلا حضورها مع المنحدر: ترتكز، وتتمدّد، وتؤطّر المشهد بدل أن تهيمن عليه.",
      body: [
        "تمدّد الشرفات المتتابعة الغرفَ نحو الخارج وتحوّل الطوبوغرافيا إلى تتابع استعمالات: ننزل من صالة إلى حديقة كما ننزل الجبل.",
        "يكشف المجسّم الثلاثي الأبعاد التفاعلي الكتلَ في سماكتها، ويُظهر كيف ينحت ضوء المساء المائل الواجهات.",
      ],
      quote: "البناء على منحدر قبولٌ بالتأليف مع ما هو أكبر منّا.",
    },
  },
  dat: {
    FR: {
      lead: "Immeuble à usages multiples, D.A.T. met en scène la rencontre entre l'échelle du bureau et celle de la rue, autour d'un vocabulaire contemporain de moucharabiehs.",
      body: [
        "La façade filtre la lumière du désert : la trame ajourée protège de la chaleur tout en dessinant, à l'intérieur, une géométrie mouvante d'ombres.",
        "Halls d'accueil, commerces et plateaux de bureaux s'empilent et se répondent ; le projet cherche l'urbanité verticale plutôt que la simple superposition.",
      ],
      quote: "Le moucharabieh, ou comment habiter la lumière sans la subir.",
    },
    EN: {
      lead: "A mixed-use building, D.A.T. stages the meeting between the scale of the office and that of the street, around a contemporary vocabulary of mashrabiyas.",
      body: [
        "The façade filters the desert light: the perforated screen shields from the heat while drawing, inside, a shifting geometry of shadows.",
        "Reception lobbies, retail and office floors stack and answer one another; the project seeks vertical urbanity rather than mere superposition.",
      ],
      quote: "The mashrabiya, or how to inhabit light without enduring it.",
    },
    DE: {
      lead: "Ein Gebäude mit gemischter Nutzung: D.A.T. inszeniert die Begegnung zwischen dem Maßstab des Büros und dem der Straße, um ein zeitgenössisches Vokabular der Maschrabiyya.",
      body: [
        "Die Fassade filtert das Wüstenlicht: Der durchbrochene Schirm schützt vor der Hitze und zeichnet im Inneren eine bewegte Geometrie von Schatten.",
        "Empfangshallen, Handel und Büroetagen stapeln sich und antworten einander; das Projekt sucht vertikale Urbanität statt bloßer Überlagerung.",
      ],
      quote: "Die Maschrabiyya — oder wie man Licht bewohnt, ohne es zu erleiden.",
    },
    AR: {
      lead: "مبنى متعدّد الاستخدامات، يُخرج D.A.T. لقاءَ مقياس المكتب بمقياس الشارع، حول مفردات معاصرة للمشربية.",
      body: [
        "ترشّح الواجهة ضوء الصحراء: تحمي الشبكة المخرّمة من الحرارة، وترسم في الداخل هندسةً متحرّكة من الظلال.",
        "تتراكم بهوات الاستقبال والمحلات وطوابق المكاتب ويجيب بعضها بعضاً؛ يبحث المشروع عن حضريّة عمودية لا عن مجرّد تكديس.",
      ],
      quote: "المشربية، أو كيف نسكن الضوء دون أن نحتمله.",
    },
  },
  'entree-de-bureaux': {
    FR: {
      lead: "Première image d'une entreprise, l'entrée de bureaux condense en quelques mètres carrés une identité : accueillir, orienter, impressionner sans intimider.",
      body: [
        "Le hall joue de la matière et de la signalétique pour installer une ambiance ; un mur végétal introduit le vivant au seuil du travail.",
        "Le parcours du visiteur est chorégraphié : de la porte à l'accueil, chaque plan et chaque lumière préparent la rencontre.",
      ],
      quote: "Une entrée, c'est une poignée de main construite.",
    },
    EN: {
      lead: "The first image of a company, the office entrance condenses an identity into a few square metres: to welcome, to orient, to impress without intimidating.",
      body: [
        "The lobby plays on material and signage to set a mood; a green wall brings the living world to the threshold of work.",
        "The visitor's path is choreographed: from door to reception, every surface and every light prepares the encounter.",
      ],
      quote: "An entrance is a handshake made of architecture.",
    },
    DE: {
      lead: "Das erste Bild eines Unternehmens: Der Büroeingang verdichtet auf wenigen Quadratmetern eine Identität — empfangen, orientieren, beeindrucken, ohne einzuschüchtern.",
      body: [
        "Die Halle spielt mit Material und Beschilderung, um eine Stimmung zu schaffen; eine begrünte Wand bringt das Lebendige an die Schwelle der Arbeit.",
        "Der Weg des Besuchers ist choreografiert: von der Tür bis zum Empfang bereiten jede Fläche und jedes Licht die Begegnung vor.",
      ],
      quote: "Ein Eingang ist ein gebauter Händedruck.",
    },
    AR: {
      lead: "الصورة الأولى لشركة: يكثّف مدخل المكاتب هويةً كاملة في أمتار قليلة — أن يستقبل، وأن يوجّه، وأن يُبهر دون أن يُرهب.",
      body: [
        "يلعب البهو على المادة واللوحات الإرشادية لتثبيت أجواء؛ ويُدخل جدارٌ نباتي الحياةَ إلى عتبة العمل.",
        "مسار الزائر مُصمَّم كرقصة: من الباب إلى الاستقبال، يهيّئ كل سطح وكل ضوء للقاء.",
      ],
      quote: "المدخل مصافحةٌ مبنيّة.",
    },
  },
  'details-berlin': {
    FR: {
      lead: "Loin des grandes perspectives, le projet se joue ici à l'échelle du millimètre : celle des détails d'enveloppe et de menuiserie qui font tenir — et durer — l'architecture.",
      body: [
        "Chaque nœud constructif est un petit projet en soi : jonction, étanchéité, rejet d'eau et geste de l'artisan y sont négociés ensemble.",
        "Réalisés lors d'un stage en agence à Berlin, ces détails rappellent que la qualité d'un bâtiment se lit d'abord dans ce qu'on ne voit presque pas.",
      ],
      quote: "Le détail n'est pas un ornement : c'est la promesse tenue du dessin.",
    },
    EN: {
      lead: "Far from grand perspectives, the project plays out here at the scale of the millimetre: that of the envelope and joinery details that make architecture hold — and last.",
      body: [
        "Each constructive junction is a small project in itself: connection, waterproofing, water shedding and the craftsman's gesture are negotiated together.",
        "Produced during an office internship in Berlin, these details recall that a building's quality is first read in what one barely sees.",
      ],
      quote: "The detail is no ornament: it is the drawing's promise, kept.",
    },
    DE: {
      lead: "Fern der großen Perspektiven spielt sich das Projekt hier im Maßstab des Millimeters ab: bei den Fassaden- und Tischlerdetails, die Architektur halten — und dauern — lassen.",
      body: [
        "Jeder konstruktive Knoten ist ein kleines Projekt für sich: Anschluss, Abdichtung, Wasserabweisung und die Geste des Handwerkers werden zusammen verhandelt.",
        "Während eines Praktikums in einem Berliner Büro entstanden, erinnern diese Details daran, dass sich die Qualität eines Gebäudes zuerst in dem liest, was man kaum sieht.",
      ],
      quote: "Das Detail ist kein Ornament: Es ist das eingelöste Versprechen der Zeichnung.",
    },
    AR: {
      lead: "بعيداً عن المنظورات الكبرى، يُلعب المشروع هنا على مقياس الميليمتر: تفاصيل الغلاف والنجارة التي تجعل العمارة تصمد — وتدوم.",
      body: [
        "كل عقدة إنشائية مشروع صغير بذاته: يُتفاوض فيها على الوصل والعزل وتصريف المياه وحركة الحرفي معاً.",
        "أُنجزت خلال تدريب في مكتب معماري ببرلين، وتذكّر هذه التفاصيل بأن جودة المبنى تُقرأ أولاً فيما لا نكاد نراه.",
      ],
      quote: "التفصيل ليس زخرفاً: إنه وعد الرسم وقد تحقّق.",
    },
  },
  'littoral-variations': {
    FR: {
      lead: "Un même littoral, relu trois fois. La série interroge ce que voir veut dire, en passant la côte au filtre de la détection, de la géométrie et de la trame.",
      body: [
        "Chaque traitement révèle une strate différente de l'image : le trait cherche la limite, la géométrie recompose le paysage, la trame le fait vibrer.",
        "Ni tout à fait photographie, ni tout à fait dessin, ces variations utilisent la côte comme un terrain d'expérimentation graphique.",
      ],
      quote: "Regarder, c'est déjà transformer.",
    },
    EN: {
      lead: "One shoreline, read three times. The series questions what seeing means, passing the coast through the filters of detection, geometry and halftone.",
      body: [
        "Each treatment reveals a different layer of the image: the line searches for the edge, geometry recomposes the landscape, the halftone makes it vibrate.",
        "Neither quite photography nor quite drawing, these variations use the coast as a field for graphic experiment.",
      ],
      quote: "To look is already to transform.",
    },
    DE: {
      lead: "Eine Küste, dreimal gelesen. Die Serie fragt, was Sehen bedeutet, und schickt die Küste durch die Filter von Erkennung, Geometrie und Raster.",
      body: [
        "Jede Bearbeitung enthüllt eine andere Schicht des Bildes: Die Linie sucht die Grenze, die Geometrie setzt die Landschaft neu zusammen, das Raster bringt sie zum Schwingen.",
        "Weder ganz Fotografie noch ganz Zeichnung, nutzen diese Variationen die Küste als Feld grafischer Experimente.",
      ],
      quote: "Sehen heißt schon verwandeln.",
    },
    AR: {
      lead: "ساحل واحد، يُقرأ ثلاث مرات. تتساءل السلسلة عمّا يعنيه أن نرى، بتمرير الساحل عبر مرشّحات الكشف والهندسة والتنقيط.",
      body: [
        "تكشف كل معالجة طبقة مختلفة من الصورة: يبحث الخط عن الحدّ، وتعيد الهندسة تركيب المشهد، ويجعله التنقيط يهتزّ.",
        "لا هي فوتوغرافيا تماماً ولا رسمٌ تماماً؛ تستعمل هذه التنويعات الساحلَ كأرض للتجريب البصري.",
      ],
      quote: "أن ننظر هو أن نحوّل سلفاً.",
    },
  },
  tabouret: {
    FR: {
      lead: "Descendre encore d'une échelle : le tabouret. Objet du quotidien réduit à l'essentiel, il condense en quelques appuis toute une réflexion sur la structure et le corps.",
      body: [
        "Le dessin cherche le juste équilibre entre légèreté et stabilité : assez de matière pour tenir, assez de vide pour ne pas peser.",
        "Assise modeste, le tabouret est aussi un terrain d'expérimentation : proportions, assemblages et matières s'y testent à taille réelle, prêts à passer à l'atelier.",
      ],
      quote: "Un tabouret, c'est le plus court chemin entre le corps et le sol.",
    },
    EN: {
      lead: "One scale further down: the stool. An everyday object pared to the essential, it condenses into a few supports a whole reflection on structure and the body.",
      body: [
        "The design seeks the right balance between lightness and stability: enough material to hold, enough void not to weigh.",
        "A modest seat, the stool is also a testing ground: proportions, joints and materials are tried at full scale, ready for the workshop.",
      ],
      quote: "A stool is the shortest path between the body and the ground.",
    },
    DE: {
      lead: "Eine Stufe kleiner: der Hocker. Ein auf das Wesentliche reduziertes Alltagsobjekt, das in wenigen Stützen eine ganze Überlegung zu Struktur und Körper verdichtet.",
      body: [
        "Der Entwurf sucht die richtige Balance zwischen Leichtigkeit und Stabilität: genug Material, um zu tragen, genug Leere, um nicht zu lasten.",
        "Als bescheidener Sitz ist der Hocker auch ein Versuchsfeld: Proportionen, Verbindungen und Materialien werden im Maßstab 1:1 erprobt, bereit für die Werkstatt.",
      ],
      quote: "Ein Hocker ist der kürzeste Weg zwischen Körper und Boden.",
    },
    AR: {
      lead: "درجة أصغر في المقياس: المقعد. غرضٌ يومي مُختزَل إلى جوهره، يكثّف في بضع ركائز تفكيراً كاملاً في البنية والجسد.",
      body: [
        "يبحث التصميم عن التوازن الصحيح بين الخفّة والثبات: مادة تكفي للحمل، وفراغ يكفي كي لا يثقل.",
        "المقعد المتواضع أرضُ تجريب أيضاً: تُختبر النسب والوصلات والمواد بالحجم الطبيعي، جاهزةً للورشة.",
      ],
      quote: "المقعد أقصر طريق بين الجسد والأرض.",
    },
  },
  'bague-blender': {
    FR: {
      lead: "Changer d'échelle : après le bâtiment, la bague. L'objet explore la même attention à la matière et au volume, mais tient dans le creux de la main.",
      body: [
        "Modélisée sous Blender, la pièce joue des courbures continues et d'un rapport de pleins et de vides qui accroche la lumière comme le ferait une façade.",
        "Le passage vers l'impression ou la fonte impose la précision du dessin 3D : chaque congé, chaque épaisseur y est déjà une décision de fabrication.",
      ],
      quote: "Un bijou, c'est de l'architecture portée sur soi.",
    },
    EN: {
      lead: "A change of scale: after the building, the ring. The object explores the same attention to material and volume, yet fits in the palm of a hand.",
      body: [
        "Modelled in Blender, the piece plays on continuous curvatures and on a balance of solids and voids that catches the light as a façade would.",
        "Moving towards printing or casting demands the precision of the 3D drawing: every fillet, every thickness is already a manufacturing decision.",
      ],
      quote: "A jewel is architecture worn on the body.",
    },
    DE: {
      lead: "Ein Maßstabswechsel: nach dem Gebäude der Ring. Das Objekt erkundet dieselbe Aufmerksamkeit für Material und Volumen — und passt doch in eine Handfläche.",
      body: [
        "In Blender modelliert, spielt das Stück mit fließenden Krümmungen und einem Verhältnis von Massen und Leerräumen, das das Licht fängt wie eine Fassade.",
        "Der Weg zum Druck oder Guss verlangt die Präzision der 3D-Zeichnung: jede Rundung, jede Stärke ist bereits eine Fertigungsentscheidung.",
      ],
      quote: "Ein Schmuckstück ist am Körper getragene Architektur.",
    },
    AR: {
      lead: "تغيير في المقياس: بعد المبنى، الخاتم. يستكشف الغرض العناية نفسها بالمادة والكتلة، لكنه يسع راحة اليد.",
      body: [
        "مُنمذجة في Blender، تلعب القطعة على انحناءات متّصلة وعلى علاقة بين المصمت والمفرّغ تلتقط الضوء كما تفعل الواجهة.",
        "الانتقال إلى الطباعة أو السبك يفرض دقّة الرسم الثلاثي الأبعاد: كل تدوير وكل سماكة هي أصلاً قرار تصنيع.",
      ],
      quote: "المجوهرة عمارةٌ تُلبَس.",
    },
  },
  'photographie-mode-manuel': {
    FR: {
      lead: "Quatre images, quatre décisions. La série est née d'un exercice simple : tout régler à la main, et apprendre la lumière au lieu de la subir.",
      body: [
        "Ouverture, vitesse, sensibilité : chaque paramètre devient un choix conscient, une manière d'écrire le temps et la profondeur dans le cadre.",
        "Le mode manuel impose la lenteur ; il transforme la prise de vue en observation patiente, presque architecturale, du réel.",
      ],
      quote: "Photographier en manuel, c'est reprendre la main sur le regard.",
    },
    EN: {
      lead: "Four images, four decisions. The series was born from a simple exercise: to set everything by hand, and learn light instead of enduring it.",
      body: [
        "Aperture, shutter, ISO: each parameter becomes a conscious choice, a way of writing time and depth into the frame.",
        "Manual mode imposes slowness; it turns the shot into a patient, almost architectural observation of the real.",
      ],
      quote: "To shoot in manual is to take the gaze back into your own hands.",
    },
    DE: {
      lead: "Vier Bilder, vier Entscheidungen. Die Serie entstand aus einer einfachen Übung: alles von Hand einzustellen und das Licht zu lernen, statt es zu erleiden.",
      body: [
        "Blende, Zeit, ISO: Jeder Parameter wird zur bewussten Entscheidung, zu einer Art, Zeit und Tiefe in den Bildausschnitt zu schreiben.",
        "Der manuelle Modus erzwingt Langsamkeit; er verwandelt die Aufnahme in eine geduldige, fast architektonische Beobachtung des Realen.",
      ],
      quote: "Manuell zu fotografieren heißt, den Blick wieder selbst in die Hand zu nehmen.",
    },
    AR: {
      lead: "أربع صور، أربعة قرارات. وُلدت السلسلة من تمرين بسيط: ضبط كل شيء يدوياً، وتعلّم الضوء بدل احتماله.",
      body: [
        "الفتحة، السرعة، الحساسية: يصير كل معيار خياراً واعياً، وطريقةً لكتابة الزمن والعمق داخل الكادر.",
        "يفرض الوضع اليدوي البطء؛ ويحوّل الالتقاط إلى ملاحظة صبورة، شبه معمارية، للواقع.",
      ],
      quote: "التصوير اليدوي استعادةٌ لليد على النظر.",
    },
  },
  'rehabilitation-tourcoing': {
    FR: {
      lead: "Réhabiliter plutôt que démolir : à Tourcoing, le projet ouvre les cœurs d'îlot, désimperméabilise les sols et réinvente 195 logements dans un tissu déjà là.",
      body: [
        "La maquette physique a servi d'outil de projet autant que de représentation : c'est en manipulant les volumes de carton que se sont décidés les percements, les retraits et les continuités piétonnes.",
        "L'axonométrie programmatique répartit une typologie très variée — du T1 au T5 — pour éviter l'uniformité sociale, tandis que le plan-masse organise les flux entre les deux cœurs d'îlot végétalisés.",
      ],
      quote: "Réhabiliter, c'est écrire dans les marges d'un texte déjà écrit.",
    },
    EN: {
      lead: "Rehabilitating rather than demolishing: in Tourcoing, the project opens the block cores, de-paves the ground and reinvents 195 dwellings within a fabric already there.",
      body: [
        "The physical model served as a design tool as much as a representation: it was by handling the card volumes that the openings, setbacks and pedestrian continuities were decided.",
        "The programmatic axonometry distributes a highly varied typology — from studios to five-room flats — to avoid social uniformity, while the site plan organises the flows between the two planted block cores.",
      ],
      quote: "To rehabilitate is to write in the margins of an already written text.",
    },
    DE: {
      lead: "Sanieren statt abreißen: In Tourcoing öffnet das Projekt die Blockinnenbereiche, entsiegelt den Boden und erfindet 195 Wohnungen im Bestand neu.",
      body: [
        "Das physische Modell diente ebenso als Entwurfswerkzeug wie als Darstellung: Beim Bewegen der Kartonvolumen wurden Öffnungen, Rücksprünge und fußläufige Verbindungen entschieden.",
        "Die programmatische Axonometrie verteilt eine sehr vielfältige Typologie — vom Ein- bis zum Fünfzimmer — um soziale Gleichförmigkeit zu vermeiden, während der Lageplan die Wege zwischen den beiden begrünten Blockinnenbereichen ordnet.",
      ],
      quote: "Sanieren heißt, an den Rändern eines bereits geschriebenen Textes zu schreiben.",
    },
    AR: {
      lead: "إعادة التأهيل بدل الهدم: في توركوان، يفتح المشروع قلوب الجزر العمرانية، ويزيل الإسمنت عن الأرض، ويعيد ابتكار ١٩٥ مسكناً داخل نسيج قائم.",
      body: [
        "كان المجسّم المادي أداة تصميم بقدر ما كان وسيلة تمثيل: فبتحريك كتل الكرتون تقرّرت الفتحات والانكفاءات والاستمراريات المخصّصة للمشاة.",
        "يوزّع الرسم الأكسونومتري البرنامجي تنويعة واسعة من الشقق تفادياً للتجانس الاجتماعي، بينما ينظّم المخطط العام الحركة بين قلبَي الجزيرتين المشجّرين.",
      ],
      quote: "إعادة التأهيل كتابةٌ على هوامش نصٍّ مكتوب سلفاً.",
    },
  },
  'logo-ajfl': {
    FR: {
      lead: "Comment faire tenir deux pays et une profession dans un seul dessin ? Le logotype de l'AJFL répond par la superposition plutôt que par l'addition.",
      body: [
        "La Tour Eiffel fournit l'ossature verticale ; le Cèdre du Liban vient l'habiter en s'étageant à l'horizontale ; la Balance s'accroche à la première plateforme et met l'ensemble en équilibre.",
        "Le trait reste volontairement dessiné à la main, presque hésitant : il évite l'effet d'emblème officiel et rappelle que l'association est d'abord une communauté de personnes.",
      ],
      quote: "Trois symboles, une seule silhouette.",
    },
    EN: {
      lead: "How do you fit two countries and a profession into a single drawing? The AJFL logotype answers by superimposition rather than addition.",
      body: [
        "The Eiffel Tower provides the vertical backbone; the Cedar of Lebanon inhabits it, tiering horizontally; the Scales hook onto the first platform and bring the whole into balance.",
        "The line remains deliberately hand-drawn, almost hesitant: it avoids the official-emblem effect and recalls that the association is first of all a community of people.",
      ],
      quote: "Three symbols, a single silhouette.",
    },
    DE: {
      lead: "Wie bringt man zwei Länder und einen Berufsstand in eine einzige Zeichnung? Das AJFL-Logo antwortet mit Überlagerung statt Addition.",
      body: [
        "Der Eiffelturm liefert das vertikale Rückgrat; die Libanon-Zeder bewohnt es und staffelt sich horizontal; die Waage hängt sich an die erste Plattform und bringt das Ganze ins Gleichgewicht.",
        "Die Linie bleibt bewusst handgezeichnet, fast zögernd: Sie vermeidet den Effekt eines offiziellen Emblems und erinnert daran, dass der Verein zuallererst eine Gemeinschaft von Menschen ist.",
      ],
      quote: "Drei Symbole, eine einzige Silhouette.",
    },
    AR: {
      lead: "كيف نُدخل بلدين ومهنةً في رسم واحد؟ يجيب شعار AJFL بالتراكب لا بالجمع.",
      body: [
        "يمنح برج إيفل الهيكل العمودي؛ وتسكنه أرزة لبنان متدرّجةً أفقياً؛ ويتعلّق الميزان بالمنصّة الأولى فيضع الكل في توازن.",
        "يبقى الخط مرسوماً باليد عن قصد، شبه متردّد: يتفادى أثر الشعار الرسمي ويذكّر بأن الجمعية هي أولاً جماعة من الأشخاص.",
      ],
      quote: "ثلاثة رموز، صورة ظلية واحدة.",
    },
  },
};

/**
 * FAUX TEXTE — paragraphes de remplissage, en attendant les textes réels de
 * Dana. Latin (« lorem ipsum ») pour FR/EN/DE, placeholder arabe pour AR : un
 * bloc latin au milieu d'une page RTL casserait la mise en page et la lecture.
 * Tout chapitre qui en contient est marqué `draft: true` → mention visible
 * « Texte provisoire » sur la page, pour ne jamais confondre avec du définitif.
 */
const LOREM = [
  tri(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    undefined,
    undefined,
    'لوريم إيبسوم هو ببساطة نص شكلي يُستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم النص الشكلي القياسي للصناعة منذ القرن الخامس عشر، حين أخذت مطبعة مجهولة لوحة من الحروف وخلطتها لتصنع كتاب عيّنة من الحروف.'
  ),
  tri(
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    undefined,
    undefined,
    'لقد نجا هذا النص ليس فقط خمسة قرون، بل انتقل أيضاً إلى التنضيد الإلكتروني وبقي كما هو دون تغيير يُذكر. وقد شاع استعماله في ستينيات القرن الماضي مع صدور أوراق تحتوي مقاطع من لوريم إيبسوم.'
  ),
  tri(
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    undefined,
    undefined,
    'وفي الآونة الأخيرة انتشر مع برامج النشر المكتبي التي تضمّنت نسخاً من لوريم إيبسوم. الغاية من هذا النص هي ملء المساحة ريثما يُكتب المحتوى النهائي للمشروع.'
  ),
  tri(
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.',
    undefined,
    undefined,
    'من المعروف أن المحتوى المقروء لصفحةٍ ما سيصرف انتباه القارئ عن التركيز على الشكل الخارجي للنص أو على طريقة توزيع الفقرات في الصفحة التي يقرأها.'
  ),
];

/**
 * CHAPITRES rédigés à la main — mise en page « double-page magazine » :
 * chaque chapitre est un bloc texte + images, affiché en alternance
 * gauche/droite par ProjectChapters.jsx.
 *
 * `images` : noms de fichiers + clé de légende (mêmes clés que GL). Les images
 * consommées ici ne sont PAS répétées dans la galerie de bas de page.
 */
const CHAPTERS = {
  'wellness-rochefoucauld': [
    {
      title: tri(
        'Un patio comme cœur du projet',
        'A patio at the heart of the project',
        'Ein Patio als Herz des Projekts',
        'فناء في قلب المشروع'
      ),
      images: [g('s6-coupe.webp', 'coupe'), g('s6-pers2.webp', 'perspective')],
      body: [
        tri(
          "Le patio est le point de convergence du projet : il concentre l'énergie et accompagne la libération du corps et de l'esprit pendant les séances, tout en incarnant le lien entre nature et intériorité. Sa conception s'inspire du principe de la kundalini en yoga — le serpent le long duquel l'énergie circule vers le ciel — d'où sa structure verticale, qui relie la terre au ciel à travers tout le bâtiment.",
          "The patio is the project's point of convergence: it concentrates energy and accompanies the release of body and mind during sessions, while embodying the link between nature and interiority. Its design draws on the principle of kundalini in yoga — the serpent along which energy rises towards the sky — hence its vertical structure, which connects earth to sky through the entire building.",
          'Der Patio ist der Konvergenzpunkt des Projekts: Er bündelt die Energie und begleitet während der Sitzungen das Loslassen von Körper und Geist; zugleich verkörpert er die Verbindung von Natur und Innerlichkeit. Seine Gestaltung greift das Prinzip der Kundalini im Yoga auf — die Schlange, entlang derer die Energie zum Himmel steigt — daher seine vertikale Struktur, die Erde und Himmel durch das gesamte Gebäude hindurch verbindet.',
          'الفناء الداخلي هو نقطة التقاء المشروع: يركّز الطاقة ويرافق تحرّر الجسد والذهن أثناء الجلسات، ويجسّد في الوقت نفسه الصلة بين الطبيعة والباطن. يستلهم تصميمه مبدأ الكونداليني في اليوغا — الأفعى التي تصعد الطاقة على امتدادها نحو السماء — ومن هنا بنيته العمودية التي تصل الأرض بالسماء عبر المبنى بأكمله.'
        ),
      ],
    },
    {
      title: tri(
        'Organisation des espaces',
        'Organisation of the spaces',
        'Organisation der Räume',
        'تنظيم الفضاءات'
      ),
      images: [g('s6-axo.webp', 'axo'), g('s6-pers3.webp', 'perspective')],
      body: [
        tri(
          "Le rez-de-chaussée regroupe les vestiaires hommes et femmes, une grande salle de prise en charge individuelle, des sanitaires et un espace de détente ouvert sur le patio et sur le niveau supérieur, où se trouve la grande salle de yoga et d'activités de groupe.",
          "The ground floor brings together the men's and women's changing rooms, a large room for individual treatment, sanitary facilities and a relaxation area opening onto the patio and onto the level above, where the large yoga and group-activity room is located.",
          'Im Erdgeschoss liegen die Umkleiden für Damen und Herren, ein großer Raum für Einzelbehandlungen, Sanitärräume sowie ein Ruhebereich, der sich zum Patio und zum darüberliegenden Geschoss öffnet, in dem sich der große Raum für Yoga und Gruppenaktivitäten befindet.',
          'يضم الطابق الأرضي غرف تبديل الملابس للرجال والنساء، وقاعة كبيرة للجلسات الفردية، ومرافق صحية، ومساحة استرخاء تنفتح على الفناء وعلى الطابق العلوي حيث تقع قاعة اليوغا والأنشطة الجماعية الكبرى.'
        ),
        tri(
          "Au premier étage cohabitent cet espace d'activité et la partie inférieure du logement, accessible depuis les locaux communs partagés avec le centre de médiation artistique voisin. L'entrée du logement se fait par un vestibule abritant l'escalier vers le deuxième étage, et qui dessert également le salon, lui-même ouvert sur une terrasse surplombant le parc, ancrant une fois de plus le bâtiment dans son environnement naturel.",
          'On the first floor, this activity space coexists with the lower part of the dwelling, reached from the communal areas shared with the neighbouring art mediation centre. The dwelling is entered through a vestibule housing the stair to the second floor, which also serves the living room, itself opening onto a terrace overlooking the park — anchoring the building once again in its natural setting.',
          'Im ersten Obergeschoss teilen sich dieser Aktivitätsbereich und der untere Teil der Wohnung das Geschoss; letztere ist über die Gemeinschaftsräume erschlossen, die mit dem benachbarten Zentrum für Kunstvermittlung geteilt werden. Der Zugang zur Wohnung erfolgt über einen Vorraum, der die Treppe ins zweite Obergeschoss aufnimmt und zugleich das Wohnzimmer erschließt, das sich auf eine Terrasse mit Blick über den Park öffnet — und das Gebäude erneut in seiner natürlichen Umgebung verankert.',
          'في الطابق الأول يتجاور فضاء النشاط هذا مع الجزء السفلي من المسكن، الذي يُدخل إليه من المرافق المشتركة مع مركز الوساطة الفنية المجاور. يتم الدخول إلى المسكن عبر ردهة تحتضن الدَّرَج المؤدّي إلى الطابق الثاني، وتخدم كذلك الصالة المنفتحة على شرفة تطلّ على الحديقة، فترسّخ المبنى مرة أخرى في محيطه الطبيعي.'
        ),
        tri(
          "Le deuxième étage réunit toutes les pièces de vie : une grande chambre parentale orientée à l'Est avec son propre dressing, une salle d'eau, une salle de bain, une buanderie, un cellier, ainsi qu'une vaste cuisine traversante offrant à la fois une vue sur le patio et sur le parc. Une seconde terrasse mène encore plus haut, vers un toit-terrasse panoramique dominant l'ensemble du projet, un espace pensé pour les dîners entre amis, complété par un édicule de rangement pour le mobilier d'extérieur.",
          'The second floor gathers all the living spaces: a large east-facing main bedroom with its own dressing room, a shower room, a bathroom, a laundry, a pantry, and a vast through-kitchen offering views of both the patio and the park. A second terrace leads higher still, to a panoramic roof terrace overlooking the whole project — a space conceived for dinners with friends, completed by a small storage structure for the outdoor furniture.',
          'Das zweite Obergeschoss versammelt alle Wohnräume: ein großes, nach Osten orientiertes Elternschlafzimmer mit eigenem Ankleidezimmer, ein Duschbad, ein Badezimmer, eine Waschküche, eine Speisekammer sowie eine weitläufige, durchgesteckte Küche mit Blick auf den Patio und den Park. Eine zweite Terrasse führt noch höher, zu einer panoramischen Dachterrasse über dem gesamten Projekt — ein Ort für Abendessen mit Freunden, ergänzt durch einen kleinen Aufbau für die Außenmöbel.',
          'يجمع الطابق الثاني كل غرف المعيشة: غرفة نوم رئيسية واسعة موجّهة نحو الشرق مع غرفة ملابس خاصة بها، وغرفة استحمام، وحمّام، وغرفة غسيل، ومخزن مؤن، ومطبخ فسيح نافذ يطلّ على الفناء والحديقة معاً. وتقود شرفة ثانية إلى ما هو أعلى: سطح بانورامي يهيمن على المشروع بأكمله، فضاء مُصمَّم للعشاء بين الأصدقاء، يكمّله كُشك صغير لحفظ أثاث الخارج.'
        ),
      ],
    },
    {
      title: tri(
        'Matérialité et structure',
        'Materiality and structure',
        'Materialität und Struktur',
        'المادية والبنية'
      ),
      images: [g('s6-elev-est.webp', 'elevEst')],
      body: [
        tri(
          "Le couple souhaitait une atmosphère brute et naturelle, en écho à leur philosophie du soin et aux espaces traditionnels tels que les temazcalli mexicains. Le rez-de-chaussée adopte ainsi une structure massive en pierre de Saint-Maximin beige (50 x 30 x 40 cm), tandis que les planchers, en prédalles de béton apparentes en sous-face et traitées au bouche-pores, renforcent cette matérialité brute. Les sols, en béton ciré, assurent une continuité visuelle à travers tout le bâtiment.",
          'The couple wanted a raw, natural atmosphere, echoing their philosophy of care and traditional spaces such as the Mexican temazcalli. The ground floor therefore adopts a massive structure in beige Saint-Maximin stone (50 × 30 × 40 cm), while the floors — precast concrete slabs left exposed on their underside and treated with a pore filler — reinforce this raw materiality. Polished concrete floors ensure visual continuity throughout the building.',
          'Das Paar wünschte sich eine rohe, natürliche Atmosphäre — im Einklang mit seiner Philosophie der Pflege und mit traditionellen Räumen wie den mexikanischen Temazcalli. Das Erdgeschoss erhält daher eine massive Struktur aus beigem Saint-Maximin-Stein (50 × 30 × 40 cm), während die Decken aus Betonfertigteilplatten, an der Unterseite sichtbar belassen und porenverschlossen behandelt, diese rohe Materialität verstärken. Böden aus geglättetem Sichtbeton sorgen für visuelle Kontinuität durch das gesamte Gebäude.',
          'أراد الزوجان أجواءً خاماً وطبيعية، صدىً لفلسفتهما في العناية وللفضاءات التقليدية مثل التيمازكالي المكسيكية. لذلك يعتمد الطابق الأرضي بنية مصمتة من حجر سان-مكسيمان البيج (٥٠ × ٣٠ × ٤٠ سم)، بينما تعزّز الأرضيات — بلاطات خرسانية سابقة الصب مكشوفة من الأسفل ومعالَجة بسادّ المسام — هذه المادية الخام. أما أرضيات الخرسانة المصقولة فتؤمّن استمرارية بصرية عبر المبنى كله.'
        ),
        tri(
          "Ce principe structurel se retrouve à chaque étage. Aux niveaux supérieurs, les murs en briques beiges apportent chaleur et douceur aux espaces plus intimes, tout en conservant l'esprit naturel voulu par les praticiens.",
          'This structural principle recurs on every floor. On the upper levels, beige brick walls bring warmth and softness to the more intimate spaces, while preserving the natural spirit sought by the practitioners.',
          'Dieses Konstruktionsprinzip kehrt in jedem Geschoss wieder. In den oberen Ebenen verleihen Wände aus beigem Ziegel den intimeren Räumen Wärme und Sanftheit und bewahren zugleich den natürlichen Geist, den sich die Therapeuten gewünscht haben.',
          'يتكرّر هذا المبدأ الإنشائي في كل طابق. في المستويات العليا، تمنح جدران الطوب البيج دفئاً ونعومةً للفضاءات الأكثر حميمية، مع الحفاظ على الروح الطبيعية التي أرادها المعالِجان.'
        ),
        tri(
          "À l'extérieur, les deux terrasses côté ouest reprennent le béton ciré pour prolonger le dialogue entre intérieur et extérieur. Le toit-terrasse combine une partie végétalisée et une partie praticable en dalles sur plots. Les essences choisies — géranium, campanule, pennisetum, heuchère, lavande, achillée — sont à la fois décoratives et adaptées au climat parisien, fleurissant d'avril à octobre, soit précisément la période d'usage de la terrasse.",
          'Outside, the two west-facing terraces take up the same polished concrete to extend the dialogue between inside and out. The roof terrace combines a planted area with a walkable surface of pedestal-mounted paving. The chosen species — geranium, campanula, pennisetum, heuchera, lavender, yarrow — are both decorative and suited to the Parisian climate, flowering from April to October, precisely the period when the terrace is in use.',
          'Außen nehmen die beiden westseitigen Terrassen denselben geglätteten Sichtbeton auf und verlängern so den Dialog zwischen Innen und Außen. Die Dachterrasse verbindet eine begrünte Fläche mit einem begehbaren Belag aus Platten auf Stelzlagern. Die gewählten Arten — Geranie, Glockenblume, Pennisetum, Purpurglöckchen, Lavendel, Schafgarbe — sind zugleich dekorativ und an das Pariser Klima angepasst; sie blühen von April bis Oktober, genau in der Nutzungszeit der Terrasse.',
          'في الخارج، تستعيد الشرفتان الغربيتان الخرسانة المصقولة نفسها لتمديد الحوار بين الداخل والخارج. ويجمع سطح المبنى بين جزء مشجَّر وجزء قابل للسير عليه ببلاطات على قواعد. أما الأنواع النباتية المختارة — الغرنوقي، الجريس، البِنِّيسيتوم، الهيوكيرا، الخزامى، الأخيلية — فهي زخرفية وملائمة لمناخ باريس في آن، تُزهر من نيسان إلى تشرين الأول، أي تماماً في فترة استعمال الشرفة.'
        ),
      ],
    },
    {
      title: tri("L'enveloppe", 'The envelope', 'Die Gebäudehülle', 'الغلاف'),
      images: [g('s6-elev-sud.webp', 'elevSud'), g('s6-elev-nord.webp', 'elevNord')],
      body: [
        tri(
          "L'enveloppe du bâtiment se compose d'une tôle d'acier perforée, qui habille les deux étages supérieurs en deux variantes complémentaires : des panneaux fixes de 1,85 x 1 m sur les parties non vitrées, et des panneaux aux dimensions identiques mais aux perforations plus larges devant les parties vitrées, laissant passer davantage de lumière et pouvant s'ouvrir pour maximiser les apports lumineux. Les garde-corps sont eux aussi traités en panneaux d'acier fixes.",
          "The building's envelope is made of perforated sheet steel, clothing the two upper floors in two complementary variants: fixed panels of 1.85 × 1 m on the solid parts, and panels of identical dimensions but with wider perforations in front of the glazed parts, letting in more light and able to open in order to maximise daylight. The balustrades are likewise treated as fixed steel panels.",
          'Die Gebäudehülle besteht aus perforiertem Stahlblech, das die beiden Obergeschosse in zwei einander ergänzenden Varianten bekleidet: feste Paneele von 1,85 × 1 m vor den geschlossenen Flächen und Paneele gleicher Abmessung, jedoch mit größeren Perforationen vor den verglasten Flächen, die mehr Licht einlassen und sich öffnen lassen, um den Lichteintrag zu maximieren. Auch die Geländer sind als feste Stahlpaneele ausgeführt.',
          'يتكوّن غلاف المبنى من صفائح فولاذية مثقّبة تكسو الطابقين العلويين في صيغتين متكاملتين: ألواح ثابتة بقياس ١٫٨٥ × ١ م أمام الأجزاء المصمتة، وألواح بالقياس نفسه لكن بثقوب أوسع أمام الأجزاء الزجاجية، تسمح بمرور ضوء أكبر ويمكن فتحها لتعظيم الإضاءة الطبيعية. كما عولجت الدرابزينات هي أيضاً بألواح فولاذية ثابتة.'
        ),
        tri(
          "Le vitrage se décline également en deux versions : du verre dépoli Saint-Gobain pour les espaces nécessitant de l'intimité, comme ceux du rez-de-chaussée, et du verre transparent pour les autres ouvertures.",
          'The glazing also comes in two versions: frosted Saint-Gobain glass for spaces requiring privacy, such as those on the ground floor, and clear glass for the other openings.',
          'Auch die Verglasung gibt es in zwei Ausführungen: mattiertes Saint-Gobain-Glas für Räume, die Privatheit erfordern — etwa im Erdgeschoss — und Klarglas für die übrigen Öffnungen.',
          'ويأتي الزجاج كذلك في صيغتين: زجاج معتِم من سان-غوبان للفضاءات التي تتطلّب خصوصية، كتلك الموجودة في الطابق الأرضي، وزجاج شفاف لسائر الفتحات.'
        ),
      ],
    },
    {
      title: tri('En conclusion', 'In conclusion', 'Fazit', 'خلاصة'),
      images: [g('s6-elev-ouest.webp', 'elevOuest')],
      body: [
        tri(
          "Le projet répond pleinement à la demande initiale : concevoir un espace holistique, à la fois professionnel et privé, dédié au soin et au bien-être, où la nature reste omniprésente, à travers la conception architecturale, les espaces extérieurs, le patio vitré et le choix des matériaux.",
          'The project fully answers the initial brief: to design a holistic space, at once professional and private, dedicated to care and well-being, where nature remains omnipresent — through the architectural design, the outdoor spaces, the glazed patio and the choice of materials.',
          'Das Projekt erfüllt die ursprüngliche Aufgabe vollständig: einen ganzheitlichen Ort zu entwerfen, zugleich beruflich und privat, der Pflege und Wohlbefinden gewidmet ist und in dem die Natur allgegenwärtig bleibt — durch den architektonischen Entwurf, die Außenräume, den verglasten Patio und die Materialwahl.',
          'يستجيب المشروع بالكامل للطلب الأولي: تصميم فضاء شمولي، مهني وخاص في آن، مكرَّس للعناية والعافية، تبقى فيه الطبيعة حاضرة في كل مكان — عبر التصميم المعماري والفضاءات الخارجية والفناء المزجَّج واختيار المواد.'
        ),
      ],
    },
  ],
};

// Titre de chapitre générique, repris des libellés d'interface (4 langues).
const uiTitle = (key) => ({
  FR: ui.FR.project[key],
  EN: ui.EN.project[key],
  DE: ui.DE.project[key],
  AR: ui.AR.project[key],
});

/**
 * Construit des chapitres pour les projets qui n'en ont pas encore de rédigés :
 * on réutilise le texte d'article EXISTANT (chapô + corps, déjà traduit) et on
 * complète avec du faux texte pour tenir la mise en page magazine. Les images
 * de la galerie sont réparties entre les chapitres, deux par deux.
 *
 * Les chapitres contenant du faux texte sont marqués `draft` → mention visible
 * sur la page, pour que Dana repère d'un coup d'œil ce qui reste à écrire.
 */
function buildChapters(p) {
  const article = ARTICLES[p.slug];
  const paras = article ? article.FR.body.map((_, i) => i) : [];
  // Un paragraphe d'article devient un objet i18n reconstruit langue par langue.
  const fromArticle = (i) => ({
    FR: article.FR.body[i],
    EN: article.EN.body[i],
    DE: article.DE.body[i],
    AR: article.AR.body[i],
  });
  // Répartition ÉQUILIBRÉE des images entre les chapitres, en gardant l'ordre
  // d'origine (les plans doivent rester avant les rendus). Découpe en tranches
  // contiguës de tailles aussi proches que possible : 4 images → 2/1/1,
  // 9 images → 3/3/3. Sans cela, les premiers chapitres prenaient tout et le
  // dernier se retrouvait sans aucune image.
  const chunk = (arr, n) => {
    const out = [];
    let i = 0;
    for (let k = 0; k < n; k += 1) {
      const size = Math.ceil((arr.length - i) / (n - k));
      out.push(arr.slice(i, i + size));
      i += size;
    }
    return out;
  };

  const [imgsA, imgsB, imgsC] = chunk(p.gallery || [], 3);

  return [
    {
      title: uiTitle('chIntention'),
      images: imgsA,
      body: paras.length > 0 ? [fromArticle(0), LOREM[0]] : [LOREM[0], LOREM[1]],
      draft: true,
    },
    {
      title: uiTitle('chProjet'),
      images: imgsB,
      body: paras.length > 1 ? [fromArticle(1), LOREM[1]] : [LOREM[2]],
      draft: true,
    },
    {
      title: uiTitle('chMatiere'),
      images: imgsC,
      body: paras.length > 2 ? [fromArticle(2), LOREM[2]] : [LOREM[3]],
      draft: true,
    },
  ];
}

// Rattache article ET chapitres à chaque projet.
projects.forEach((p) => {
  p.article = ARTICLES[p.slug] || null;
  p.chapters = CHAPTERS[p.slug] || buildChapters(p);
  // Images déjà montrées dans les chapitres → retirées de la galerie de fin,
  // pour ne pas afficher deux fois le même document sur la page.
  const used = new Set(p.chapters.flatMap((c) => (c.images || []).map((i) => i.src)));
  p.restGallery = (p.gallery || []).filter((item) => !used.has(item.src));
});

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
