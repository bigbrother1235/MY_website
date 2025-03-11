import { motion } from 'framer-motion';
import '../../styles/components/themeToggle.css';

/**
 * Theme Toggle component for switching between dark and light mode
 * @param {Object} props Component props
 * @param {boolean} props.darkMode Current theme mode
 * @param {Function} props.toggleTheme Function to toggle theme
 * @returns {JSX.Element} Theme toggle button
 */
const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <motion.button
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="toggle-track">
        <div className="toggle-indicator">
          <motion.div
            className="indicator-icons"
            animate={{
              rotate: darkMode ? 0 : 180
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Sun Icon for Light Mode */}
            <svg 
              className="sun-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.7778 4.22217L17.5558 6.25375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4.22217 4.22217L6.44418 6.25375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.7778 19.7778L17.5558 17.5555" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            
            {/* Moon Icon for Dark Mode */}
            <svg 
              className="moon-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="toggle-glow"></div>
    </motion.button>
  );
};

export default ThemeToggle;