import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import PageTransition from '../components/animations/PageTransition';
import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import FeaturedProjects from '../components/home/FeaturedProjects';
import { useData } from '../hooks/useData';

/**
 * Home page component
 * @returns {JSX.Element} Home page
 */
const Home = () => {
  const { data } = useData();
  const { siteInfo, homePage } = data;
  
  // Reset scroll position when navigating to homepage
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageTransition>
      <Helmet>
        <title>{siteInfo?.title || '个人网站'}</title>
        <meta name="description" content={siteInfo?.description || ''} />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Introduction Section */}
      <Introduction />
      
      {/* Featured Projects Section */}
      <FeaturedProjects />
      
      {/* Call to Action Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2>有兴趣一起合作吗？</h2>
            <p>让我们讨论您的项目，共同创造精彩。</p>
            <div className="cta-buttons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/contact" className="button primary">contact me</a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/portfolio" className="button outline">查看作品集</a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;