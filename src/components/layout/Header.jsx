import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../hooks/useData';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../ui/ThemeToggle';
import '../../styles/components/header.css';

const Header = ({ scrolled = false }) => {
  const { data } = useData();
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Get site info and navigation from data
  const { siteInfo, navigation } = data;
  
  // Manually define the links you want to show in mobile menu
  const allowedLinks = [
    { url: '/', text: '首页' },
    { url: '/about', text: '关于' },
    {
      "text": "作品集",
      "url": "/portfolio"
    },
    {
      "text": "博客",
      "url": "/blog"
    },
    {
      "text": "联系",
      "url": "/contact"
    }
  ];
  
  // Handle window resize to close mobile menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle initial animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };
  
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Mobile Menu Button - Leftmost */}
          <motion.button
            className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </motion.button>
          
          {/* Theme Toggle - Middle */}
          <motion.div
            className="theme-toggle-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </motion.div>
          
          {/* Logo - Rightmost */}
          <Link to="/" className="logo">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {siteInfo.logo ? (
                <img src={siteInfo.logo} alt={siteInfo.title} />
              ) : (
                <span className="logo-text">{siteInfo.title?.split('|')[0].trim()}</span>
              )}
            </motion.div>
          </Link>
        </div>
        
        {/* Mobile Navigation - Sliding from Left */}
        <motion.nav
          className="mobile-nav"
          initial="closed"
          animate={mobileMenuOpen ? 'open' : 'closed'}
          variants={mobileMenuVariants}
        >
          <motion.ul>
            {allowedLinks.map((link, index) => (
              <motion.li key={index} variants={mobileItemVariants}>
                <NavLink
                  to={link.url}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.classList.remove('menu-open');
                  }}
                >
                  {link.text}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Social Links in Mobile Menu */}
          <motion.div className="mobile-social-links" variants={mobileItemVariants}>
            <div className="social-links-container">
              {navigation.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="social-link"
                >
                  <i className={`icon-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;