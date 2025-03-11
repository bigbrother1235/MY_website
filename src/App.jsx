import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Layout from './components/layout/Layout';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// UI Components
import CustomCursor from './components/ui/CustomCursor';

// Data
import data from './data/data.json';

// Context for theme and data
import { ThemeContext } from './contexts/ThemeContext';
import { DataContext } from './contexts/DataContext';

// Wrapper for AnimatePresence (needed for route animations)
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:projectId" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:articleId" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [siteData, setSiteData] = useState(data);
  const [darkMode, setDarkMode] = useState(true);
  
  // Debug: 查看数据是否正确加载
  useEffect(() => {
    console.log('网站数据已加载:', siteData);
  }, [siteData]);
  
  // Use system preference for dark mode if available
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode === null) {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    } else {
      setDarkMode(isDarkMode === 'true');
    }
  }, []);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    // Update document classes for theming
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <DataContext.Provider value={{ data: siteData, setData: setSiteData }}>
        <Router>
          <CustomCursor />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;