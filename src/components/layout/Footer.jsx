import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../hooks/useData';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/footer.css';
import { useRef } from 'react';

const Footer = () => {
  const { data } = useData();
  const { siteInfo, navigation, contact } = data;
  const footerRef = useRef(null);
  const isInViewport = useInViewport(footerRef, { threshold: 0.2 });
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
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
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-border"></div>
      
      <motion.div
        className="container"
        initial="hidden"
        animate={isInViewport ? 'visible' : 'hidden'}
        variants={footerVariants}
      >
        <div className="footer-grid">
          {/* Logo and Info */}
          <motion.div className="footer-info" variants={itemVariants}>
            <Link to="/" className="footer-logo">
              {siteInfo.logo ? (
                <img src={siteInfo.logo} alt={siteInfo.title} />
              ) : (
                <span className="logo-text">{siteInfo.title?.split('|')[0].trim()}</span>
              )}
            </Link>
            <p className="footer-description">{siteInfo.description}</p>
            
            <div className="social-links">
              {navigation.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="social-link"
                >
                  <i className={`icon-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div className="footer-nav" variants={itemVariants}>
            <h4>Navigation</h4>
            <ul>
              {navigation.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div className="footer-contact" variants={itemVariants}>
            <h4>Contact</h4>
            <ul>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <i className="icon-mail"></i>
                    <span>{contact.email}</span>
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                    <i className="icon-phone"></i>
                    <span>{contact.phone}</span>
                  </a>
                </li>
              )}
              {contact.location && (
                <li>
                  <i className="icon-map-pin"></i>
                  <span>{contact.location}</span>
                </li>
              )}
            </ul>
          </motion.div>
          
          {/* Newsletter or CTA */}
          <motion.div className="footer-newsletter" variants={itemVariants}>
            <h4>Stay Updated</h4>
            <p>Subscribe to receive updates about new projects and articles.</p>
            
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="button primary">Subscribe</button>
            </form>
          </motion.div>
        </div>
        
        {/* Bottom Copyright */}
        <motion.div className="footer-bottom" variants={itemVariants}>
          <div className="copyright">
            &copy; {currentYear} {siteInfo.title?.split('|')[0].trim()}. All rights reserved.
          </div>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;