import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';

// basename absolu pour GitHub Pages project-site (dérivé du base Vite).
// base '/' → '' (racine) ; base '/repo/' → '/repo'.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Routage global.
 *   /                    → Accueil (zine)
 *   /projet/:slug        → Page projet dédiée
 *   *                    → 404
 * Toutes les routes partagent le Layout (curseur, header, smooth-scroll).
 */
export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projet/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
