import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useData } from '../../hooks/useData';
import '../../styles/components/projectDetail.css';

/**
 * ProjectDetail component for displaying a single project
 * @param {Object} props Component props
 * @param {Object} props.project Project object to display
 * @param {Function} props.onClose Function to close the detail view
 * @returns {JSX.Element} Project detail component
 */
const ProjectDetail = ({ project, onClose }) => {
  const { data } = useData();
  const detailRef = useRef(null);
  const imageContainerRef = useRef(null);
  
  // Get related projects (same category, excluding current project)
  const relatedProjects = data.portfolio?.projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);
  
  // Initialize parallax scroll effect
  useEffect(() => {
    if (!imageContainerRef.current) return;
    
    const images = imageContainerRef.current.querySelectorAll('.project-image');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      images.forEach((image, index) => {
        const speed = 0.1 + (index * 0.05);
        gsap.to(image, {
          y: scrollY * speed,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation variants - 修复缓动函数
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" // 修改为命名缓动函数
      }
    }
  };
  
  // Split description into paragraphs
  const descriptionParagraphs = project.description.split('\n\n');
  
  return (
    <div className="project-detail" ref={detailRef}>
      {/* Project Header */}
      <div className="project-header">
        <div className="container">
          <motion.div
            className="back-button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button onClick={onClose} className="button text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              返回作品集
            </button>
          </motion.div>
          
          <motion.h1 
            className="project-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          
          <motion.h2 
            className="project-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.subtitle}
          </motion.h2>
          
          <motion.div 
            className="project-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="project-category">
              <span className="meta-label">分类：</span>
              <span className="meta-value">{project.category}</span>
            </div>
            
            <div className="project-technologies">
              <span className="meta-label">技术：</span>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="project-content">
        <div className="container">
          <div className="project-grid">
            {/* Project Details */}
            <motion.div 
              className="project-details"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              {descriptionParagraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  {paragraph}
                </motion.p>
              ))}
              
              <motion.div 
                className="project-links"
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
              >
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button primary"
                  >
                    访问项目
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon-right">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button outline"
                  >
                    查看代码
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon-right">
                      <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5C19.9988 8.12197 19.4626 6.80354 18.5 5.8C18.9561 4.5741 18.9161 3.22574 18.4 2C18.4 2 17.1 1.7 15 3.2C13.275 2.71102 11.4583 2.71102 9.7 3.2C7.6 1.7 6.3 2 6.3 2C5.78393 3.22574 5.74387 4.5741 6.2 5.8C5.24 6.79 4.7 8.1 4.7 9.5C4.7 14.1 7.4 15.2 10.2 15.5C9.6 16.1 9.5 16.7 9.5 17.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            </motion.div>
            
            {/* Project Images */}
            <motion.div 
              className="project-images"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              ref={imageContainerRef}
            >
              <div className="featured-image">
                <img 
                  src={project.featuredImage || '/placeholder-image.jpg'} // 添加占位图防止404
                  alt={project.title} 
                  className="project-image" 
                  onError={(e) => {e.target.src = '/placeholder-image.jpg'}} // 图片加载失败时显示占位图
                />
              </div>
              
              {project.images && project.images.map((image, index) => (
                <div key={index} className="additional-image">
                  <img 
                    src={image || '/placeholder-image.jpg'} 
                    alt={`${project.title} - ${index + 1}`} 
                    className="project-image" 
                    onError={(e) => {e.target.src = '/placeholder-image.jpg'}}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="related-projects">
          <div className="container">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="related-title"
            >
              相关项目
            </motion.h3>
            
            <div className="related-grid">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  className="related-project"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Link to={`/portfolio/${relatedProject.id}`} className="related-link">
                    <div className="related-image">
                      <img 
                        src={relatedProject.thumbnailImage || '/placeholder-image.jpg'} 
                        alt={relatedProject.title}
                        onError={(e) => {e.target.src = '/placeholder-image.jpg'}}
                      />
                    </div>
                    <h4 className="related-project-title">{relatedProject.title}</h4>
                    <p className="related-project-category">{relatedProject.category}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;