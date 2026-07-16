# **📐 Projet : Portfolio Master Architecture ("Éditorial Cinématique")**

## **1\. CONTEXTE ET OBJECTIF**

Ce projet est le portfolio interactif d'une étudiante en Master d'Architecture. Il ne s'agit pas d'un simple site vitrine, mais d'une "œuvre spatiale" démontrant sa maîtrise de l'espace, du design et des outils numériques.

Le site doit être hébergé sur GitHub Pages (Full statique) et offrir une expérience utilisateur (UX) digne des sites primés sur Awwwards : fluide, cinématique, et avec un fort contraste typographique (Brutalisme Éditorial).

## **2\. STACK TECHNIQUE (À respecter strictement)**

* **Framework :** React.js (via Vite)  
* **Styling :** Tailwind CSS  
* **Animations complexes & Scroll :** GSAP (ScrollTrigger) & Framer Motion  
* **Défilement fluide (Smooth Scroll) :** Lenis (Studio Freight)  
* **Web 3D :** Three.js, @react-three/fiber, @react-three/drei  
* **Multilinguisme :** i18next (ou un contexte React simple gérant FR, EN, DE)

## **3\. DESIGN SYSTEM (Variables CSS / Tailwind)**

### **3.1. Palette de Couleurs**

* **Background principal (Chalk) :** \#E3D6BF (Beige/Crème minéral)  
* **Texte & Lignes (Deep Forest) :** \#2C3A2E (Vert très sombre, presqu'anthracite)  
* **Accentuation (Amaranth) :** \#933B5B (Framboise sombre pour les états actifs, menus, soulignements)  
* **Fond secondaire (Optionnel) :** \#9F9679 (Pomelo Olive) ou \#AABAAE (Brook Green) pour les sections en rupture.

### **3.2. Typographie**

* **Title / Display (Titres) :** Police Serif élégante (ex: Playfair Display, Cormorant Garamond ou police locale .woff2). Classes Tailwind associées : font-serif tracking-tighter.  
* **Body / Micro-copie :** Police Sans-Serif géométrique (ex: Space Grotesk, Inter). Classes Tailwind : font-sans uppercase tracking-\[0.3em\] text-\[10px\].

### **3.3. Règles d'Animation (Physique)**

* **Courbe de Bézier globale :** ease: \[0.76, 0, 0.24, 1\] (Mouvement lourd, luxueux, lent au démarrage et à la fin).  
* **Durée standard :** 0.8s à 1.2s.

## **4\. ARCHITECTURE DES DOSSIERS (Proposition)**

/src  
 ├── /assets  
 │    ├── /3d         \# Fichiers .glb optimisés (Draco)  
 │    ├── /images     \# Fichiers .webp / .avif (Photos, rendus)  
 │    └── /vector     \# Fichiers .svg (Plans AutoCAD optimisés)  
 ├── /components  
 │    ├── /layout  
 │    │    ├── CustomCursor.jsx    \# Curseur interactif  
 │    │    ├── Header.jsx          \# Menu fixe et sélecteur de langue (FR|EN|DE)  
 │    │    └── Footer.jsx  
 │    ├── /sections  
 │    │    ├── HeroScrollText.jsx  \# Mot géant lié au scroll (Framer Motion)  
 │    │    ├── ProjectGallery.jsx  \# Grille asymétrique avec Hover Reveal  
 │    │    ├── Canvas3DViewer.jsx  \# Module React Three Fiber épinglé au scroll  
 │    │    ├── SkillsGrid.jsx      \# Pastilles logicielles CSS  
 │    │    └── ArtScroll.jsx       \# Défilement horizontal pour les autres arts  
 │    └── /ui  
 │         └── HoverImage.jsx      \# Composant générique pour le fondu A-\>B au survol  
 ├── /context  
 │    └── LanguageContext.jsx      \# Gestion d'état FR/EN/DE  
 ├── /hooks  
 │    └── useSmoothScroll.jsx      \# Initialisation de Lenis  
 ├── App.jsx                       \# Orchestration des sections  
 └── index.css                     \# Imports Tailwind et masquage du curseur par défaut

## **5\. DIRECTIVES DES FONCTIONNALITÉS CLÉS**

### **A. Le Curseur Personnalisé (CustomCursor.jsx)**

* Masquer le curseur système (cursor: none sur le body).  
* Créer un div stylisé (Point \#933B5B par défaut).  
* Utiliser un event listener mousemove (ou un store Zustand/Context) pour suivre la souris avec un léger *lag/spring* (Framer Motion).  
* S'il survole un élément cliquable (a, button, ou .project-card), le point s'agrandit, devient un cercle transparent avec une bordure fine, et affiche le texte "VOIR" ou "DRAG".

### **B. Le Multilinguisme (Header)**

* Header ultra-fin et fixed mix-blend-difference (pour rester lisible sur tout fond).  
* Sélecteur simple : FR , EN , DE.  
* La langue active prend la couleur \#933B5B (Amaranth) ou un soulignement fin.

### **C. Hero Section & "Mot Géant au Scroll"**

* Un titre énorme. Au défilement (useScroll), ce titre subit une transformation : opacity de 0 à 1 puis à 0, et un scale léger (zoom arrière).

### **D. Grille de Projets & Hover Reveal (ProjectGallery.jsx)**

* Structure asymétrique avec des bordures fines (border-\[\#2C3A2E\]/20).  
* **Interaction :** Par défaut, afficher une image type "croquis/plan". Au onMouseEnter, effectuer un fondu CSS ou Framer Motion vers la vraie image 3D/photo.

### **E. Pastilles de Compétences (SkillsGrid.jsx)**

* Titre : "LOGICIELS" (Couleur Amaranth).  
* Les pastilles (AutoCAD, SketchUp, Rhino, Illustrator, Photoshop, InDesign) sont créées en pur CSS/Tailwind (pas d'images).  
* Forme : rounded-2xl ou rounded-3xl (Squircle), bordure fine, fond très légèrement assombri.  
* Intérieur : Initiales (ex: "Ac") en grande police Serif au centre. Nom complet ("AutoCAD") en micro-copie en dessous de la pastille.  
* Animation : hover:-translate-y-2 avec transition douce.

### **F. Le Module 3D (Canvas3DViewer.jsx)**

* Intégrer un \<Canvas\> de @react-three/fiber.  
* Charger un modèle .glb (ex: villa.glb) via useGLTF.  
* **Interaction :** Lier la rotation Y du modèle à la progression du scroll de la page via GSAP ScrollTrigger ou Framer Motion useScroll.  
* Le modèle doit être au centre d'une section "encadrée" (border 1px) avec un label "SCÈNE 3D".

## **6\. INSTRUCTIONS POUR L'AGENT (CLAUDE CODE)**

* **Itération :** Ne génère pas tout le site d'un coup. Commence par initialiser l'app, configure le index.css avec les couleurs, installe les dépendances (Lenis, GSAP, R3F). Ensuite, nous créerons les composants un par un.  
* **Performance :** Lazy-load les modèles 3D avec \<Suspense\> pour ne pas bloquer le chargement initial. Utilise des images .webp.  
* **Qualité de code :** Garde des composants propres et modulaires. Commente les parties liées aux calculs GSAP/Framer Motion.