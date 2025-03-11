import { createContext, useContext } from 'react';

// Create a context with default values
export const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

// Custom hook for using the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
};