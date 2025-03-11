import { createContext, useContext } from 'react';

// Create a context with default values
export const DataContext = createContext({
  data: {},
  setData: () => {},
});

// Custom hook for using the data context
export const useDataContext = () => {
  const context = useContext(DataContext);
  
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  
  return context;
};
