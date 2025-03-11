import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/biography.css';

/**
 * Biography component for About page
 * @param {Object} props Component props
 * @param {string} props.biography Biography text
 * @returns {JSX.Element} Biography section
 */
const Biography = ({ biography = '' }) => {
  const sectionRef = useRef(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.2, once: true });
  
  // 调试信息
  useEffect(() => {
    console.log('Biography组件收到的数据:', biography);
  }, [biography]);
  
  // Parse biography paragraphs
  const paragraphs = biography ? biography.split('\n\n').filter(Boolean) : [];
  
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
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="biography" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">个人简介</h2>
          <div className="section-title-line"></div>
        </motion.div>
        
        <div className="biography-content">
          <motion.div
            className="biography-text"
            initial="hidden"
            animate={isInViewport ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                >
                  {paragraph}
                </motion.p>
              ))
            ) : (
              <motion.p variants={itemVariants}>
                暂无个人简介信息。
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            className="biography-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInViewport ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="image-container">
              <img src="/assets/images/portrait.png" alt="肖像" />
              <div className="image-glow"></div>
            </div>
            
            <div className="biography-quote">
              <blockquote>
                "我相信创造既视觉冲击又功能强大的数字体验。"
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Biography;