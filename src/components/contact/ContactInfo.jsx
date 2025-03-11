import { motion } from 'framer-motion';
import '../../styles/components/contactInfo.css';

/**
 * Contact info component with contact details and social links
 * @param {Object} props Component props
 * @param {Object} props.contact Contact information
 * @returns {JSX.Element} Contact info component
 */
const ContactInfo = ({ contact = {} }) => {
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
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  return (
    <motion.div
      className="contact-info"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="info-title" variants={itemVariants}>
        Contact Information
      </motion.h2>
      
      <motion.p className="info-subtitle" variants={itemVariants}>
        Feel free to reach out through any of these channels:
      </motion.p>
      
      <motion.div className="info-items" variants={containerVariants}>
        {/* Email Info */}
        {contact.email && (
          <motion.div className="info-item" variants={itemVariants}>
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Email</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </motion.div>
        )}
        
        {/* Phone Info */}
        {contact.phone && (
          <motion.div className="info-item" variants={itemVariants}>
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6408 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62477 2.2165 3.36163C2.30513 3.09849 2.44757 2.85669 2.63477 2.65163C2.82196 2.44656 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4136 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Phone</h3>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
        
        {/* Location Info */}
        {contact.location && (
          <motion.div className="info-item" variants={itemVariants}>
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Location</h3>
              <p>{contact.location}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Social Profiles */}
      {contact.socialProfiles && Object.keys(contact.socialProfiles).length > 0 && (
        <motion.div className="social-profiles" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>Connect With Me</motion.h3>
          
          <motion.div className="social-links" variants={containerVariants}>
            {Object.entries(contact.socialProfiles).map(([platform, url], index) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className={`social-icon icon-${platform.toLowerCase()}`}>
                  {/* Icon will be added via CSS */}
                </span>
                <span className="social-platform">{platform}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactInfo;