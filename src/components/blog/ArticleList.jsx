import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/articleList.css';

/**
 * ArticleList component for displaying a list of blog articles
 * @param {Object} props Component props
 * @param {Array} props.articles Array of article objects
 * @returns {JSX.Element} Article list component
 */
const ArticleList = ({ articles = [] }) => {
  const listRef = useRef(null);
  const isInViewport = useInViewport(listRef, { threshold: 0.1, once: true });
  
  // 调试信息
  useEffect(() => {
    console.log('ArticleList组件收到的数据:', articles);
    if (articles.length > 0) {
      console.log('第一篇文章示例:', articles[0]);
    } else {
      console.warn('ArticleList没有收到任何文章数据!');
    }
  }, [articles]);
  
  // 确认所有文章数据是否具有必要的字段
  const validateArticles = () => {
    if (!articles || articles.length === 0) return [];
    
    return articles.map(article => ({
      ...article,
      // 确保必要的字段存在，否则提供默认值
      id: article.id || `article-${Math.random().toString(36).substring(2, 9)}`,
      title: article.title || '未命名文章',
      excerpt: article.excerpt || '暂无摘要信息',
      categories: article.categories || []
    }));
  };
  
  // 获取验证后的文章数据
  const validatedArticles = validateArticles();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut" // 使用命名缓动函数
      }
    }
  };
  
  // If no articles, show placeholder
  if (!articles || articles.length === 0) {
    return (
      <div className="article-list-empty">
        <p>暂无文章。请在data.json中添加文章数据。</p>
      </div>
    );
  }
  
  return (
    <motion.div
      className="article-list"
      ref={listRef}
      initial="hidden"
      animate={isInViewport ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {validatedArticles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </motion.div>
  );
};

export default ArticleList;