import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ParticleBackground from '../components/animations/ParticleBackground';
import { useData } from '../hooks/useData';
import '../styles/pages/contact.css';

/**
 * Contact page component
 * @returns {JSX.Element} Contact page
 */
const Contact = () => {
  const { data } = useData();
  const { siteInfo, contact } = data;
  
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageTransition>
      <Helmet>
        <title>Contact | {siteInfo.title}</title>
        <meta 
          name="description" 
          content="Get in touch with me for project inquiries or collaboration opportunities."
        />
      </Helmet>
      
      <section className="contact-page">
        <div className="particle-container">
          <ParticleBackground density={30} speed={0.2} />
        </div>
        
        <div className="container">
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Get in Touch</h1>
            <p className="contact-subtitle">
              Have a project in mind or want to collaborate? Let's talk.
            </p>
          </motion.div>
          
          <div className="contact-content">
            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm endpoint={contact.formEndpoint} />
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              className="contact-info-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactInfo contact={contact} />
              
              {/* Availability Status */}
              {contact.availabilityText && (
                <div className="availability-status">
                  <div className="availability-indicator"></div>
                  <p>{contact.availabilityText}</p>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Map or Location Visual */}
          <motion.div
            className="contact-map"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="map-placeholder">
              <div className="map-pin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="location-text">{contact.location}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;