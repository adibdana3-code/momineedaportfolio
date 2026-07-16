import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../../hooks/useSmoothScroll.jsx';
import CustomCursor from './CustomCursor.jsx';
import Header from './Header.jsx';

/**
 * Layout global partagé par toutes les routes : curseur, header, smooth-scroll
 * Lenis, et remise en haut de page à chaque changement de route.
 */
export default function Layout() {
  const lenisRef = useRef(null);
  useSmoothScroll((lenis) => {
    lenisRef.current = lenis;
    // Exposé globalement pour le scroll fluide déclenché depuis le menu.
    window.__lenis = lenis;
  });

  const { pathname } = useLocation();
  useEffect(() => {
    // Remonte instantanément en haut à chaque navigation
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="relative min-h-screen bg-paper text-ink">
        <Outlet />
      </main>
    </>
  );
}
