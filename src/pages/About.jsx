import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import { useData } from '../hooks/useData';
import Biography from '../components/about/Biography';
import Skills from '../components/about/Skills';
import Timeline from '../components/about/Timeline';
import ParticleBackground from '../components/animations/ParticleBackground';
import '../styles/pages/about.css';

/**
 * About page component
 * @returns {JSX.Element} About page
 */
const About = () => {
  const { data } = useData();
  
  // 打印数据，用于调试
  useEffect(() => {
    console.log('About页面数据:', data);
  }, [data]);
  
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 安全地访问数据
  const siteTitle = data?.siteInfo?.title || '个人网站';
  const aboutData = data?.about || {};
  
  return (
    <PageTransition>
      <Helmet>
        <title>关于 | {siteTitle}</title>
        <meta 
          name="description" 
          content="了解更多关于我的背景、技能和经验。"
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="particle-container">
          <ParticleBackground density={40} speed={0.3} />
        </div>
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About me</h1>
            <p className="about-subtitle">
              我的经历、技能和专业经验
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Biography Section */}
      {aboutData.biography && (
        <Biography biography={aboutData.biography} />
      )}
      
      {/* Skills Section */}
      {aboutData.skills && aboutData.skills.length > 0 && (
        <Skills skills={aboutData.skills} />
      )}
      
      {/* Experience Timeline */}
      {(aboutData.experience || aboutData.education) && (
        <Timeline 
          experience={aboutData.experience || []} 
          education={aboutData.education || []} 
        />
      )}
      
      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>有兴趣一起合作吗？</h2>
            <p>让我们一起将您的想法转化为出色的产品。</p>
            <div className="cta-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/contact" className="button primary">Contact me</a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/portfolio" className="button outline">About my work</a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;