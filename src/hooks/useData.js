import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

/**
 * Custom hook to access website data context
 * @returns {Object} Data context with data state and setData function
 */
export const useData = () => {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    throw new Error('useData must be used within a DataContext.Provider');
  }
  
  // 为方便调试，添加数据验证
  if (process.env.NODE_ENV !== 'production') {
    if (!context.data) {
      console.warn('useData 警告: 数据上下文中未找到 "data" 属性');
    }
  }
  
  return context;
};

/**
 * Helper function to get a specific project by ID
 * @param {Object} data The website data object
 * @param {String} id The project ID to find
 * @returns {Object|null} The project object or null if not found
 */
export const getProjectById = (data, id) => {
  if (!data || !data.portfolio || !data.portfolio.projects) {
    return null;
  }
  
  return data.portfolio.projects.find(project => project.id === id) || null;
};

/**
 * Helper function to get a specific article by ID
 * @param {Object} data The website data object
 * @param {String} id The article ID to find
 * @returns {Object|null} The article object or null if not found
 */
export const getArticleById = (data, id) => {
  if (!data || !data.blog || !data.blog.articles) {
    return null;
  }
  
  return data.blog.articles.find(article => article.id === id) || null;
};