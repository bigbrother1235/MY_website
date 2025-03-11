import { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/components/contactForm.css';

/**
 * Contact form component
 * @param {Object} props Component props
 * @param {string} props.endpoint Form submission endpoint
 * @returns {JSX.Element} Contact form
 */
const ContactForm = ({ endpoint = '#' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
    success: false
  });
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set submitting state
    setFormStatus({
      ...formStatus,
      submitting: true
    });
    
    try {
      // In a real implementation, you would send the form data to your endpoint
      // For now, we'll simulate a successful submission after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set success state
      setFormStatus({
        submitted: true,
        submitting: false,
        error: null,
        success: true
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      // Set error state
      setFormStatus({
        ...formStatus,
        submitting: false,
        error: 'There was an error submitting the form. Please try again.'
      });
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const inputVariants = {
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
    <div className="contact-form-wrapper">
      <div className="form-card">
        <h2 className="form-title">Send a Message</h2>
        
        {formStatus.success ? (
          <motion.div
            className="form-success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              className="button primary"
              onClick={() => setFormStatus({
                submitted: false,
                submitting: false,
                error: null,
                success: false
              })}
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            {/* Name Field */}
            <motion.div className="form-group" variants={inputVariants}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                disabled={formStatus.submitting}
              />
            </motion.div>
            
            {/* Email Field */}
            <motion.div className="form-group" variants={inputVariants}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                disabled={formStatus.submitting}
              />
            </motion.div>
            
            {/* Subject Field */}
            <motion.div className="form-group" variants={inputVariants}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                required
                placeholder="Project Inquiry"
                disabled={formStatus.submitting}
              />
            </motion.div>
            
            {/* Message Field */}
            <motion.div className="form-group" variants={inputVariants}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                required
                placeholder="Tell me about your project..."
                rows="5"
                disabled={formStatus.submitting}
              ></textarea>
            </motion.div>
            
            {/* Error Message */}
            {formStatus.error && (
              <motion.div 
                className="form-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{formStatus.error}</span>
              </motion.div>
            )}
            
            {/* Submit Button */}
            <motion.div className="form-submit" variants={inputVariants}>
              <button
                type="submit"
                className={`button primary ${formStatus.submitting ? 'submitting' : ''}`}
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : 'Send Message'}
              </button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;