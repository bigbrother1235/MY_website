import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/timeline.css';

/**
 * Timeline component for displaying experience and education
 * @param {Object} props Component props
 * @param {Array} props.experience Array of experience items
 * @param {Array} props.education Array of education items
 * @returns {JSX.Element} Timeline section
 */
const Timeline = ({ experience = [], education = [] }) => {
  const sectionRef = useRef(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.1, once: true });
  const [activeTab, setActiveTab] = useState('experience');
  
  // 调试信息
  useEffect(() => {
    console.log('Timeline组件收到的数据:', { experience, education });
  }, [experience, education]);
  
  // Format date string
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long' 
      });
    } catch (error) {
      console.error('日期格式化错误:', error);
      return dateString;
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
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
  
  // 检查是否有数据显示
  if ((!experience || experience.length === 0) && (!education || education.length === 0)) {
    return null; // 如果没有数据，不渲染组件
  }
  
  return (
    <section className="timeline" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">职业生涯</h2>
          <div className="section-title-line"></div>
        </motion.div>
        
        {/* Tab Buttons */}
        <motion.div
          className="timeline-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            工作经历
          </button>
          <button
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            教育背景
          </button>
        </motion.div>
        
        {/* Timeline Content */}
        <div className="timeline-content">
          {/* Experience Timeline */}
          {activeTab === 'experience' && (
            <motion.div
              className="timeline-items"
              initial="hidden"
              animate={isInViewport ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {experience && experience.length > 0 ? (
                experience.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="timeline-item"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="timeline-marker"></div>
                    
                    <div className="timeline-item-content">
                      <div className="timeline-item-header">
                        <h3 className="timeline-item-title">{item.title}</h3>
                        <span className="timeline-item-company">{item.company}</span>
                        <span className="timeline-item-period">
                          {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : '至今'}
                        </span>
                      </div>
                      
                      <p className="timeline-item-description">{item.description}</p>
                      
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="timeline-item-highlights">
                          {item.highlights.map((highlight, hIndex) => (
                            <li key={hIndex}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="timeline-empty-message"
                  variants={itemVariants}
                >
                  暂无工作经历信息。
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Education Timeline */}
          {activeTab === 'education' && (
            <motion.div
              className="timeline-items"
              initial="hidden"
              animate={isInViewport ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {education && education.length > 0 ? (
                education.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="timeline-item"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="timeline-marker education"></div>
                    
                    <div className="timeline-item-content">
                      <div className="timeline-item-header">
                        <h3 className="timeline-item-title">{item.degree}</h3>
                        <span className="timeline-item-company">{item.institution}</span>
                        <span className="timeline-item-period">
                          {formatDate(item.startDate)} — {formatDate(item.endDate)}
                        </span>
                      </div>
                      
                      <p className="timeline-item-description">{item.description}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="timeline-empty-message"
                  variants={itemVariants}
                >
                  暂无教育背景信息。
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;