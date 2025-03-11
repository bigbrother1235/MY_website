import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/projectGrid.css';

/**
 * ProjectGrid component for displaying a grid of projects
 * @param {Object} props Component props
 * @param {Array} props.projects Array of project objects
 * @returns {JSX.Element} Project grid component
 */
const ProjectGrid = ({ projects = [] }) => {
  const gridRef = useRef(null);
  const isInViewport = useInViewport(gridRef, { threshold: 0.1, once: true });
  
  // 增强的调试信息
  useEffect(() => {
    console.log('ProjectGrid组件收到的数据:', projects);
    if (projects.length > 0) {
      console.log('第一个项目示例:', projects[0]);
    } else {
      console.warn('ProjectGrid没有收到任何项目数据!');
    }
  }, [projects]);
  
  // 确认所有项目数据是否具有必要的字段
  const validateProjects = () => {
    if (!projects || projects.length === 0) return [];
    
    return projects.map(project => ({
      ...project,
      // 确保必要的字段存在，否则提供默认值
      id: project.id || `project-${Math.random().toString(36).substring(2, 9)}`,
      title: project.title || '未命名项目',
      category: project.category || '未分类',
      technologies: project.technologies || [],
      thumbnailImage: project.thumbnailImage || window.placeholderImageUrl || '/placeholder-image.jpg'
    }));
  };
  
  // 获取验证后的项目数据
  const validatedProjects = validateProjects();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut" // 使用命名缓动函数
      }
    }
  };
  
  // 如果没有项目，显示提示信息
  if (!projects || projects.length === 0) {
    return (
      <div className="project-grid-empty">
        <p>暂无项目。请在data.json中添加项目数据。</p>
      </div>
    );
  }
  
  return (
    <motion.div
      className="project-grid"
      ref={gridRef}
      initial="hidden"
      animate={isInViewport ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {validatedProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;