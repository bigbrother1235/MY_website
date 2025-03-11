import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/skills.css';

/**
 * Skills component for About page
 * @param {Object} props Component props
 * @param {Array} props.skills Array of skill categories
 * @returns {JSX.Element} Skills section
 */
const Skills = ({ skills = [] }) => {
  const sectionRef = useRef(null);
  const isInViewport = useInViewport(sectionRef, { threshold: 0.1, once: true });
  const [activeCategory, setActiveCategory] = useState('');
  
  // 调试信息
  useEffect(() => {
    console.log('Skills组件收到的数据:', skills);
  }, [skills]);
  
  // 初始化激活的分类
  useEffect(() => {
    if (skills && skills.length > 0) {
      setActiveCategory(skills[0].category);
    }
  }, [skills]);
  
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
  
  // Get skills by active category
  const getActiveSkills = () => {
    if (!skills || !skills.length) return [];
    
    const category = skills.find(cat => cat.category === activeCategory);
    return category && category.items ? category.items : [];
  };
  
  // Switch category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Get active skills
  const activeSkills = getActiveSkills();
  
  if (!skills || skills.length === 0) {
    return null; // 如果没有技能数据，不渲染组件
  }
  
  return (
    <section className="skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">技能 & 专长</h2>
          <div className="section-title-line"></div>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div
          className="skills-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skills.map((category, index) => (
            <button
              key={index}
              className={`tab-button ${category.category === activeCategory ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.category)}
            >
              {category.category}
            </button>
          ))}
        </motion.div>
        
        {/* Skills Grid */}
        <motion.div
          className="skills-grid"
          initial="hidden"
          animate={isInViewport ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {activeSkills.length > 0 ? (
            activeSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="skill-item"
                variants={itemVariants}
                custom={index}
              >
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-level-text">{skill.level}%</div>
                </div>
                
                <div className="skill-bar-container">
                  <motion.div 
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={isInViewport ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + (index * 0.1) }}
                  ></motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="no-skills-message">
              该分类下暂无技能项目。
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="skills-bg-element skills-bg-1"></div>
      <div className="skills-bg-element skills-bg-2"></div>
    </section>
  );
};

export default Skills;