import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import PageTransition from '../components/animations/PageTransition';
import ParticleBackground from '../components/animations/ParticleBackground';
import '../styles/pages/notFound.css';

/**
 * 404 Not Found page component
 * @returns {JSX.Element} Not Found page
 */
const NotFound = () => {
  // Animation variants
  const textVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  const glitchVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="not-found-page">
        <ParticleBackground density={30} speed={0.3} />
        
        <div className="not-found-content">
          <motion.div 
            className="not-found-code"
            initial="initial"
            animate="animate"
            variants={glitchVariants}
          >
            <div className="glitch" data-text="404">404</div>
            <div className="glow">404</div>
            <div className="scanlines"></div>
          </motion.div>
          
          <motion.h1 
            className="not-found-title"
            initial="initial"
            animate="animate"
            variants={textVariants}
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            className="not-found-message"
            initial="initial"
            animate="animate"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            The page you are looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            className="not-found-actions"
            initial="initial"
            animate="animate"
            variants={textVariants}
            transition={{ delay: 0.4 }}
          >
            <Link to="/" className="button primary">
              Return Home
            </Link>
            
            <Link to="/contact" className="button outline">
              Contact Me
            </Link>
          </motion.div>
          
          <motion.div
            className="not-found-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="terminal-header">
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-button"></div>
              <div className="terminal-title">Terminal</div>
            </div>
            <div className="terminal-content">
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> find / -name "requested-page"
              </p>
              <p className="terminal-line">
                <span className="terminal-error">Error: File not found in directory.</span>
              </p>
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> redirecting to home...
              </p>
              <p className="terminal-cursor"></p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;