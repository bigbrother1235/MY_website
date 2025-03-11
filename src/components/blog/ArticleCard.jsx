import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/components/articleCard.css';

/**
 * ArticleCard component for displaying blog article preview
 * @param {Object} props Component props
 * @param {Object} props.article Article object
 * @param {number} props.index Article index for staggered animation
 * @returns {JSX.Element} Article card component
 */
const ArticleCard = ({ article, index }) => {
  // 调试信息
  useEffect(() => {
    console.log(`ArticleCard 渲染文章:`, article);
  }, [article]);
  
  // 安全获取文章属性，提供默认值防止错误
  const {
    id = `article-${index}`,
    title = '未命名文章',
    excerpt = '',
    featuredImage = window.placeholderImageUrl || '/placeholder-image.jpg',
    publishDate = '',
    readTime = 5,
    categories = [],
    author = null
  } = article || {};
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      className="article-card"
      variants={cardVariants}
      custom={index}
    >
      <Link to={`/blog/${id}`} className="article-card-link">
        <div className="article-image">
          <img 
            src={featuredImage} 
            alt={title} 
            loading="lazy"
            onError={(e) => {
              console.log(`图片加载失败: ${featuredImage}`);
              if (window.placeholderImageUrl) {
                e.target.src = window.placeholderImageUrl;
              }
            }}
          />
          
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="article-categories">
              {categories.map((category, idx) => (
                <span key={idx} className="article-category">
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="article-content">
          <div className="article-meta">
            <span className="article-date">{formatDate(publishDate)}</span>
            <span className="article-read-time">{readTime} 分钟阅读</span>
          </div>
          
          <h2 className="article-title">{title}</h2>
          <p className="article-excerpt">{excerpt}</p>
          
          <div className="article-footer">
            <div className="article-author">
              {author && (
                <>
                  {author.avatar && (
                    <img 
                      src={author.avatar} 
                      alt={author.name} 
                      className="author-avatar"
                      onError={(e) => {
                        if (window.placeholderImageUrl) {
                          e.target.src = window.placeholderImageUrl;
                        }
                      }}
                    />
                  )}
                  <span className="author-name">{author.name}</span>
                </>
              )}
            </div>
            
            <div className="read-more">
              阅读文章
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;