import { lazy, Suspense } from 'react';
import DrawLine from '../ui/DrawLine.jsx';
import ProjectCard from '../ui/ProjectCard.jsx';
import fr from '../../content/fr.js';

// Le module 3D (Three.js) est lazy-loadé pour ne pas alourdir le chargement initial
const Canvas3DViewer = lazy(() => import('./Canvas3DViewer.jsx'));

/**
 * Galerie de projets : en-tête éditorial + grille asymétrique 12 colonnes.
 * Intègre un bloc « Espace 3D réservé » (encadré, coins techniques) en
 * attendant le module React Three Fiber.
 */
export default function ProjectGallery() {
  const { tag, count, projects } = fr.gallery;

  return (
    <section id="projets">
      {/* En-tête */}
      <div className="px-10 pt-10">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-[10px] uppercase tracking-editorial text-amaranth">
            {tag}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-editorial text-olive">
            {count}
          </span>
        </div>
        <DrawLine className="mt-5" />
      </div>

      {/* Grille */}
      <div className="grid grid-cols-12 gap-x-10 gap-y-[150px] px-10 pb-[120px] pt-[70px]">
        <ProjectCard project={projects[0]} />
        <ProjectCard project={projects[1]} />

        {/* Module 3D interactif (lazy) */}
        <Suspense
          fallback={
            <div className="col-span-5 col-start-2 mt-10 aspect-square animate-pulse border-[0.5px] border-forest/40" />
          }
        >
          <Canvas3DViewer />
        </Suspense>

        <ProjectCard project={projects[2]} />
        <ProjectCard project={projects[3]} />
      </div>
    </section>
  );
}
