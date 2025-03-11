import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInViewport } from '../../hooks/useScrollPosition';
import { useData } from '../../hooks/useData';
import TextAnimation from '../animations/TextAnimation';
import '../../styles/components/introduction.css';

/**
 * Introduction section component for homepage
 * @returns {JSX.Element} Introduction section
 */
const Introduction = () => {
  const { data } = useData();
  const { homePage, about } = data;
  const sectionRef = useRef(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.2, once: true });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
  
  // Parse introduction text to highlight important parts
  const highlightText = (text) => {
    if (!text) return null;
    
    // Replace text between ** with highlighted spans
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const highlighted = part.slice(2, -2);
        return (
          <span key={index} className="highlight">
            {highlighted}
          </span>
        );
      }
      return part;
    });
  };
  
  return (
    <section className="section introduction" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="introduction-content"
          initial="hidden"
          animate={isInViewport ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="introduction-heading" variants={itemVariants}>
            <h2>About Me</h2>
            <div className="heading-line"></div>
          </motion.div>
          
          <motion.div className="introduction-grid" variants={itemVariants}>
            <div className="introduction-text">
              <motion.p className="introduction-paragraph">
                {highlightText(homePage.introduction)}
              </motion.p>
              
              <motion.div 
                className="introduction-cta"
                variants={itemVariants}
                custom={1}
              >
                <Link to="/about" className="button outline">
                  Learn More About Me
                </Link>
              </motion.div>
            </div>
            
            <div className="introduction-stats">
              <motion.div 
                className="stat-item"
                variants={itemVariants}
                custom={2}
              >
                <div className="stat-value">
                  <TextAnimation 
                    text={about.experience?.length.toString() || "8"} 
                    type="highlight"
                    delay={800}
                  />
                  <span className="stat-plus">+</span>
                </div>
                <div className="stat-label">Years of Experience</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                variants={itemVariants}
                custom={3}
              >
                <div className="stat-value">
                  <TextAnimation 
                    text={about.skills?.reduce((total, category) => total + category.items.length, 0).toString() || "20"} 
                    type="highlight"
                    delay={1000}
                  />
                  <span className="stat-plus">+</span>
                </div>
                <div className="stat-label">Skills & Technologies</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                variants={itemVariants}
                custom={4}
              >
                <div className="stat-value">
                  <TextAnimation 
                    text={data.portfolio?.projects?.length.toString() || "30"} 
                    type="highlight"
                    delay={1200}
                  />
                  <span className="stat-plus">+</span>
                </div>
                <div className="stat-label">Projects Completed</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;