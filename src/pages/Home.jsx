import HeroZine from '../components/sections/HeroZine.jsx';
import ProjectsMagazine from '../components/sections/ProjectsMagazine.jsx';
import ArtStrip from '../components/sections/ArtStrip.jsx';
import Skills from '../components/sections/Skills.jsx';
import Contact from '../components/sections/Contact.jsx';

/**
 * Accueil « zine ».
 * Ordre : Hero → Projets → Art (horizontal) → Logiciels → Contact.
 * Chaque projet mène à sa page dédiée (/projet/:slug).
 */
export default function Home() {
  return (
    <>
      <HeroZine />
      <ProjectsMagazine />
      <ArtStrip />
      <Skills />
      <Contact />
    </>
  );
}
