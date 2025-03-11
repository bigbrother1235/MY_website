import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import { useData, getProjectById } from '../hooks/useData';
import ProjectGrid from '../components/portfolio/ProjectGrid';
import ProjectDetail from '../components/portfolio/ProjectDetail';
import '../styles/pages/portfolio.css';

/**
 * Portfolio page component
 * @returns {JSX.Element} Portfolio page
 */
const Portfolio = () => {
  const { data } = useData();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // 增加调试信息
  useEffect(() => {
    console.log('Portfolio原始数据:', data);
    console.log('Portfolio项目数据:', data?.portfolio?.projects || []);
    console.log('当前projectId:', projectId);
  }, [data, projectId]);

  // Initialize projects and categories on data load
  useEffect(() => {
    if (data?.portfolio?.projects) {
      setFilteredProjects(data.portfolio.projects);
    }
  }, [data?.portfolio?.projects]);
  
  // Handle project selection from URL parameter
  useEffect(() => {
    if (projectId && data?.portfolio?.projects) {
      const project = getProjectById(data, projectId);
      setSelectedProject(project);
      
      // If project not found, navigate to portfolio page
      if (!project) {
        navigate('/portfolio', { replace: true });
      }
    } else {
      setSelectedProject(null);
    }
  }, [projectId, data, navigate]);
  
  // Filter projects by category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredProjects(data?.portfolio?.projects || []);
    } else {
      setFilteredProjects(
        (data?.portfolio?.projects || []).filter(project => project.category === category)
      );
    }
  };
  
  // Close project detail view
  const handleCloseDetail = () => {
    navigate('/portfolio');
  };
  
  // Default title and description
  const title = selectedProject 
    ? `${selectedProject.title} | Portfolio` 
    : 'Portfolio | My Creative Works';
  
  const description = selectedProject
    ? selectedProject.description?.split('\n\n')[0]
    : 'Explore my portfolio of interactive and creative digital projects.';
  
  return (
    <PageTransition>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      {selectedProject ? (
        // Project Detail View
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleCloseDetail} 
        />
      ) : (
        // Projects Grid View
        <>
          <section className="portfolio-hero">
            <div className="container">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                作品集
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="portfolio-subtitle"
              >
                我的项目和创意作品展示
              </motion.p>
            </div>
          </section>
          
          <section className="portfolio-content">
            <div className="container">
              {/* Category Filter */}
              {data?.portfolio?.categories && (
                <motion.div
                  className="portfolio-filter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <button
                    className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('all')}
                  >
                    全部项目
                  </button>
                  
                  {data.portfolio.categories.map((category, index) => (
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
              
              {/* Fallback message when no projects data */}
              {!data?.portfolio?.projects && (
                <div className="portfolio-loading">
                  <p>正在加载项目数据...</p>
                </div>
              )}
              
              {/* Fallback message when no filtered projects */}
              {data?.portfolio?.projects && filteredProjects.length === 0 && (
                <div className="portfolio-empty">
                  <p>该分类下暂无项目。</p>
                </div>
              )}
              
              {/* Projects Grid */}
              {filteredProjects.length > 0 && (
                <ProjectGrid projects={filteredProjects} />
              )}
            </div>
          </section>
        </>
      )}
    </PageTransition>
  );
};

export default Portfolio;