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
    cover: null, // pas d'image : carte colorée dans la strip ; la 3D est le contenu de la page
    hover: null,
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
    hasModel: false,
    // 2 photos distinctes : l'ancienne « tabouret-3 » était un doublon exact de
    // « tabouret-1 » (même MD5) → retirée.
    gallery: [g('tabouret-1.webp', 'Vue'), g('tabouret-2.webp', 'Vue')],
  },
];

/**
 * Articles éditoriaux façon magazine de design — TEXTES D'ATTENTE (à remplacer
 * par les vrais textes de Dana). Chaque entrée : { lead (chapô), body[] (corps
 * en colonnes), quote (citation mise en avant) } × { FR, EN, DE }.
 * (AR non fourni ici → repli sur FR côté rendu ; Dana n'a demandé que 3 langues.)
 */
const ARTICLES = {
  'wellness-rochefoucauld': {
    FR: {
      lead: "Au cœur de Paris, Le Wellness Rochefoucauld propose une parenthèse de silence : un lieu où l'architecture se fait soin, et où la lumière descend du ciel pour rythmer le corps.",
      body: [
        "Le projet s'organise autour d'une coupe généreuse. En creusant le volume, on libère un puits de lumière zénithale qui irrigue les niveaux inférieurs et guide le visiteur vers les espaces d'eau.",
        "L'enveloppe, sobre depuis la rue, contraste avec l'intériorité travaillée des bains. Les matériaux — pierre claire, bois, béton adouci — cherchent une acoustique feutrée et une température visuelle apaisante.",
        "Chaque seuil est pensé comme une transition sensorielle : on passe du bruit de la ville au murmure de l'eau par une séquence d'espaces de plus en plus calmes.",
      ],
      quote: "Faire du silence un matériau de projet.",
    },
    EN: {
      lead: "In the heart of Paris, Le Wellness Rochefoucauld offers a parenthesis of silence: a place where architecture becomes care, and where light falls from above to set the rhythm of the body.",
      body: [
        "The project is organised around a generous section. Carving into the volume releases a shaft of zenithal light that feeds the lower levels and leads visitors towards the water spaces.",
        "Restrained from the street, the envelope contrasts with the crafted interiority of the baths. The materials — pale stone, wood, softened concrete — seek a muffled acoustic and a soothing visual temperature.",
        "Each threshold is conceived as a sensory transition: one moves from the city's noise to the murmur of water through a sequence of increasingly calm spaces.",
      ],
      quote: "Turning silence into a building material.",
    },
    DE: {
      lead: "Im Herzen von Paris bietet Le Wellness Rochefoucauld eine Klammer der Stille: ein Ort, an dem Architektur zur Pflege wird und Licht von oben den Rhythmus des Körpers vorgibt.",
      body: [
        "Das Projekt ist um einen großzügigen Schnitt organisiert. Das Aushöhlen des Volumens öffnet einen Schacht aus Zenitlicht, der die unteren Ebenen versorgt und die Besucher zu den Wasserräumen führt.",
        "Von der Straße zurückhaltend, kontrastiert die Hülle mit der sorgfältig gestalteten Innerlichkeit der Bäder. Die Materialien — heller Stein, Holz, geglätteter Beton — suchen eine gedämpfte Akustik und eine beruhigende visuelle Temperatur.",
        "Jede Schwelle ist als sinnlicher Übergang gedacht: Vom Lärm der Stadt gelangt man durch eine Folge zunehmend ruhiger Räume zum Murmeln des Wassers.",
      ],
      quote: "Stille als Baumaterial.",
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
  },
};

// Rattache chaque article à son projet (champ `project.article` = { FR, EN, DE }).
projects.forEach((p) => {
  p.article = ARTICLES[p.slug] || null;
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
