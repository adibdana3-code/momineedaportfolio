# **📐 Projet : Portfolio Master Architecture ("Magazine Éditorial & Neo-Brutalisme")**

## **1\. CONTEXTE ET OBJECTIF**

Ce projet est le portfolio interactif d'une étudiante en Master d'Architecture. Il ne s'agit pas d'un simple site vitrine, mais d'une "œuvre spatiale" digne des sites primés sur Awwwards.

Le site adopte une esthétique **"Magazine Éditorial / Pop Neo-Brutalism"**. L'accueil est conçu comme une couverture de magazine d'art, et les pages projets comme des doubles-pages éditoriales.

## **2\. STACK TECHNIQUE**

* **Framework :** React.js (via Vite)  
* **Styling :** Tailwind CSS  
* **Animations :** GSAP (ScrollTrigger) & Framer Motion (Smooth Scroll via Lenis)  
* **Web 3D :** Three.js, @react-three/fiber, @react-three/drei  
* **Multilinguisme :** i18next (FR, EN, DE, AR) avec support RTL pour l'Arabe.

## **3\. DESIGN SYSTEM (Éditorial Magazine)**

### **3.1. Palette de Couleurs (Organique & Contrastée)**

* **Chalk (Fond principal) :** \#E3D6BF (Crème minéral)  
* **Deep Forest (Texte & Lignes) :** \#2C3A2E (Vert anthracite très sombre)  
* **Amaranth (Accent & Contact) :** \#933B5B (Framboise sombre)  
* **Brook Green :** \#AABAAE (Vert sauge clair)  
* **Thulian Pink :** \#B5728A (Vieux rose)  
* **Pomelo Olive :** \#9F9679 (Kaki clair)

### **3.2. Typographie (Expressive & Loud)**

* **Titres Géants (Display) :** Police Serif très élégante (ex: Playfair Display), utilisée en tailles immenses (text-\[10vw\]), mélangeant parfois le style Regular et *Italic* dans la même phrase.  
* **Micro-copie & Menus :** Police Sans-Serif géométrique (Space Grotesk ou Inter), très petite et espacée (uppercase tracking-widest).  
* **Arabe :** Police Reem Kufi obligatoire pour les titres et le nom.

### **3.3. Règles de Mise en page (Layout)**

* **Page d'accueil ("La Couverture") :** Pas de long défilement pour les projets. Un grand titre central immense, une image en arrière-plan (fond), le menu des projets aligné à gauche, et des petites vignettes flottantes pour illustrer.  
* **Pages Projets ("Les Articles") :** Mise en page asymétrique type magazine. Textes structurés en colonnes, grandes images juxtaposées à des petits détails, avec le module 3D intégré.

## **4\. DIRECTIVES CLÉS**

* **Menu de Navigation :** Placé en haut à gauche, juste à côté du nom de l'architecte.  
* **Curseur :** Personnalisé, inversé (mix-blend-difference) pour rester visible partout.