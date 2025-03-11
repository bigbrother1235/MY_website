import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useData } from '../../hooks/useData';
import '../../styles/components/articleDetail.css';

/**
 * ArticleDetail component for displaying the full blog article
 * @param {Object} props Component props
 * @param {Object} props.article Article object to display
 * @param {Function} props.onClose Function to close the article detail
 * @returns {JSX.Element} Article detail component
 */
const ArticleDetail = ({ article, onClose }) => {
  const { data } = useData();
  const contentRef = useRef(null);
  
  // 调试信息
  useEffect(() => {
    console.log('ArticleDetail 显示文章:', article);
  }, [article]);
  
  // 安全获取文章属性
  const {
    id = '',
    title = '未命名文章',
    subtitle = '',
    content = '',
    publishDate = '',
    featuredImage = window.placeholderImageUrl || '/placeholder-image.jpg',
    readTime = 5,
    categories = [],
    tags = [],
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
  
  // Get related articles (same category, excluding current article)
  const getRelatedArticles = () => {
    if (!data?.blog?.articles || !categories || categories.length === 0) return [];
    
    return data.blog.articles
      .filter(a => a.id !== id)
      .filter(a => {
        // Check if there's any category overlap
        return a.categories && a.categories.some(cat => categories.includes(cat));
      })
      .slice(0, 3);
  };
  
  // Set up smooth scrolling for article content
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Scroll to top when article loads
    window.scrollTo(0, 0);
    
    // Add ids to headings for anchor links
    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (!heading.id) {
        const id = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        heading.id = id;
      }
    });
  }, [article]);
  
  const relatedArticles = getRelatedArticles();
  
  return (
    <article className="article-detail">
      {/* Article Header */}
      <header className="article-header">
        <div className="container">
          <motion.div
            className="back-button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button onClick={onClose} className="button text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              返回博客
            </button>
          </motion.div>
          
          {/* Article Meta */}
          <motion.div
            className="article-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="article-categories">
              {categories.map((category, index) => (
                <span key={index} className="article-category">
                  {category}
                </span>
              ))}
            </div>
            
            <div className="article-date-info">
              <span className="article-date">{formatDate(publishDate)}</span>
              {readTime && (
                <span className="article-read-time">{readTime} 分钟阅读</span>
              )}
            </div>
          </motion.div>
          
          {/* Article Title */}
          <motion.h1
            className="article-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.h2
              className="article-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {subtitle}
            </motion.h2>
          )}
          
          {/* Author Info */}
          {author && (
            <motion.div
              className="article-author"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
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
              <span className="author-name">作者：{author.name}</span>
            </motion.div>
          )}
        </div>
      </header>
      
      {/* Featured Image */}
      {featuredImage && (
        <motion.div
          className="article-featured-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="container">
            <img 
              src={featuredImage} 
              alt={title}
              onError={(e) => {
                if (window.placeholderImageUrl) {
                  e.target.src = window.placeholderImageUrl;
                }
              }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Article Content */}
      <div className="article-content-wrapper">
        <div className="container">
          <motion.div
            className="article-content"
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {content ? (
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            ) : (
              <p className="article-empty-content">该文章暂无内容。</p>
            )}
          </motion.div>
          
          {/* Article Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              className="article-tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <h3>标签：</h3>
              <div className="tags-list">
                {tags.map((tag, index) => (
                  <span key={index} className="article-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Social Share */}
          <motion.div
            className="article-share"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <h3>分享文章：</h3>
            <div className="share-buttons">
              <button className="share-button twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Twitter
              </button>
              <button className="share-button facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Facebook
              </button>
              <button className="share-button linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="related-articles">
          <div className="container">
            <motion.h3
              className="related-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              相关文章
            </motion.h3>
            
            <div className="related-grid">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  className="related-article"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                >
                  <Link to={`/blog/${relatedArticle.id}`} className="related-link">
                    <div className="related-image">
                      <img 
                        src={relatedArticle.featuredImage} 
                        alt={relatedArticle.title}
                        onError={(e) => {
                          if (window.placeholderImageUrl) {
                            e.target.src = window.placeholderImageUrl;
                          }
                        }}
                      />
                    </div>
                    <h4 className="related-article-title">{relatedArticle.title}</h4>
                    <p className="related-article-date">{formatDate(relatedArticle.publishDate)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ArticleDetail;