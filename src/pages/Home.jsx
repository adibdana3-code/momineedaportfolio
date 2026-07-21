import CoverHome from '../components/sections/CoverHome.jsx';
import ArtStrip from '../components/sections/ArtStrip.jsx';
import Skills from '../components/sections/Skills.jsx';
import Contact from '../components/sections/Contact.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.jsx';

/**
 * Accueil « Magazine Éditorial ».
 * La page d'accueil est une COUVERTURE (CoverHome) : image de fond, masthead
 * central bilingue, menu des projets à gauche. Plus de long défilement détaillant
 * les projets (redondant avec les pages projet dédiées).
 * Suivent : Art (horizontal), Logiciels, Contact.
 */
export default function Home() {
  useDocumentMeta();
  return (
    <>
      <CoverHome />
      <ArtStrip />
      <Skills />
      <Contact />
    </>
  );
}
