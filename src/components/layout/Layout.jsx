import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useScrollPosition } from '../../hooks/useScrollPosition';

/**
 * Main Layout component that wraps the entire application
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @returns {JSX.Element} Layout wrapper with header and footer
 */
const Layout = ({ children }) => {
  const location = useLocation();
  const { y: scrollY } = useScrollPosition();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Add scroll class to body when scrolled
  useEffect(() => {
    if (scrollY > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }, [scrollY]);
  
  return (
    <div className="layout">
      <Header scrolled={scrollY > 50} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;