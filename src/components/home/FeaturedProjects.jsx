import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInViewport } from '../../hooks/useScrollPosition';
import { useData } from '../../hooks/useData';
import ProjectCard from '../portfolio/ProjectCard';
import '../../styles/components/featuredProjects.css';

/**
 * FeaturedProjects component for homepage
 * @returns {JSX.Element} Featured projects section
 */
const FeaturedProjects = () => {
  const { data } = useData();
  const { homePage, portfolio } = data;
  const sectionRef = useRef(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.1, once: true });
  
  // Get featured projects based on IDs in homePage.featuredProjects
  const getFeaturedProjects = () => {
    if (!homePage.featuredProjects || !portfolio.projects) {
      return [];
    }
    
    // Only take the first project
    const projectId = homePage.featuredProjects[0];
    const project = portfolio.projects.find(project => project.id === projectId);
    return project ? [project] : []; // Return an array with one project
  };
  
  const featuredProjects = getFeaturedProjects();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2 // Only delay children
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  return (
    <section className="section featured-projects" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
          <div className="section-title-container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="section-subtitle">A selection of my recent work</p>
        </motion.div>
        
        <motion.div
          className="featured-projects-grid"
          initial="hidden"
          animate={isInViewport ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              custom={index}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="featured-projects-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
          <Link to="/portfolio" className="button primary">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;