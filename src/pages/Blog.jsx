import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useData, getArticleById } from '../hooks/useData';
import PageTransition from '../components/animations/PageTransition';
import ArticleList from '../components/blog/ArticleList';
import ArticleDetail from '../components/blog/ArticleDetail';
import '../styles/pages/blog.css';

/**
 * Blog page component
 * @returns {JSX.Element} Blog page
 */
const Blog = () => {
  const { data } = useData();
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // 调试信息
  useEffect(() => {
    console.log('Blog页面数据:', data);
    console.log('Blog文章数据:', data?.blog?.articles || []);
    console.log('当前articleId:', articleId);
  }, [data, articleId]);
  
  // Set page title and description
  const pageTitle = selectedArticle 
    ? `${selectedArticle.title} | 博客` 
    : '博客 | 文章与见解';
  
  const pageDescription = selectedArticle
    ? selectedArticle.excerpt?.slice(0, 160)
    : '阅读我关于开发和创意见解的最新文章。';
  
  // Initialize articles and categories
  useEffect(() => {
    if (data?.blog?.articles) {
      setFilteredArticles(data.blog.articles);
    }
  }, [data?.blog?.articles]);
  
  // Handle article selection from URL parameter
  useEffect(() => {
    if (articleId && data?.blog?.articles) {
      const article = getArticleById(data, articleId);
      setSelectedArticle(article);
      
      // If article not found, navigate to blog page
      if (!article) {
        console.warn('未找到指定文章，重定向到博客首页');
        navigate('/blog', { replace: true });
      }
    } else {
      setSelectedArticle(null);
    }
  }, [articleId, data, navigate]);
  
  // Filter articles by category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredArticles(data?.blog?.articles || []);
    } else {
      setFilteredArticles(
        (data?.blog?.articles || []).filter(article => 
          article.categories && article.categories.includes(category)
        )
      );
    }
  };
  
  // Close article detail view
  const handleCloseDetail = () => {
    navigate('/blog');
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          // Article Detail View
          <motion.div
            key="article-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ArticleDetail 
              article={selectedArticle} 
              onClose={handleCloseDetail} 
            />
          </motion.div>
        ) : (
          // Articles List View
          <motion.div
            key="article-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <section className="blog-hero">
              <div className="container">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  博客
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="blog-subtitle"
                >
                  思考、教程和见解
                </motion.p>
              </div>
            </section>
            
            <section className="blog-content">
              <div className="container">
                {/* Category Filter */}
                {data?.blog?.categories && data.blog.categories.length > 0 && (
                  <motion.div
                    className="blog-filter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  >
                    <button
                      className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      全部文章
                    </button>
                    
                    {data.blog.categories.map((category, index) => (
                      <button
                        key={index}
                        className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
                
                {/* 加载状态 */}
                {!data?.blog?.articles && (
                  <div className="blog-loading">
                    <p>正在加载文章数据...</p>
                  </div>
                )}
                
                {/* 空数据状态 */}
                {data?.blog?.articles && filteredArticles.length === 0 && (
                  <div className="blog-empty">
                    <p>该分类下暂无文章。</p>
                  </div>
                )}
                
                {/* Articles List */}
                {filteredArticles.length > 0 && (
                  <ArticleList articles={filteredArticles} />
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Blog;