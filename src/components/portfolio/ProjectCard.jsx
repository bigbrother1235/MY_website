import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import '../../styles/components/projectCard.css';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  // 在组件挂载时输出调试信息
  useEffect(() => {
    console.log(`ProjectCard 渲染项目:`, project);
  }, [project]);
  
  // Create 3D tilt effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    // Variables for the tilt effect
    let bounds;
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      bounds = card.getBoundingClientRect();
      mouseX = e.clientX - bounds.left - bounds.width / 2;
      mouseY = e.clientY - bounds.top - bounds.height / 2;
      
      const rotateX = (mouseY / bounds.height) * 10;
      const rotateY = (mouseX / bounds.width) * -10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Move the card content slightly for a parallax effect
      gsap.to(card.querySelector('.project-card-content'), {
        x: mouseX * 0.02,
        y: mouseY * 0.02,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Glow effect based on mouse position
      const glowX = (mouseX / bounds.width) * 100 + 50;
      const glowY = (mouseY / bounds.height) * 100 + 50;
      
      gsap.to(card.querySelector('.project-card-glow'), {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 240, 255, 0.5) 0%, rgba(0, 0, 0, 0) 70%)`,
        opacity: 0.8,
        duration: 0.4
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-card-content'), {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-card-glow'), {
        opacity: 0,
        duration: 0.6
      });
    };
    
    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // 安全获取项目属性，提供默认值防止错误
  const {
    id = `project-${index}`,
    title = '未命名项目',
    subtitle = '',
    category = '未分类',
    thumbnailImage = window.placeholderImageUrl || '/placeholder-image.jpg',
    technologies = []
  } = project || {};
  
  return (
    <motion.div 
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }} // 修复动画缓动函数
    >
      <Link to={`/portfolio/${id}`} className="project-card-link">
        <div className="project-card" ref={cardRef}>
          <div className="project-card-glow"></div>
          
          <div className="project-card-image">
            <img 
              src={thumbnailImage} 
              alt={title} 
              loading="lazy"
              onError={(e) => {
                console.log(`图片加载失败: ${thumbnailImage}`);
                if (window.placeholderImageUrl) {
                  e.target.src = window.placeholderImageUrl;
                }
              }}
            />
          </div>
          
          <div className="project-card-content">
            <div className="project-card-category">
              <span>{category}</span>
            </div>
            
            <h3 className="project-card-title">{title}</h3>
            <p className="project-card-subtitle">{subtitle}</p>
            
            <div className="project-card-tech">
              {technologies && technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-card-cta">
              <span className="view-project">
                查看项目
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;