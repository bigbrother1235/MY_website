import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/components/button.css';

/**
 * Button component that can be rendered as a button or link
 * @param {Object} props - Component props
 * @param {string} props.children - Button text or content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'outline', 'text'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {string} props.href - URL for external link
 * @param {string} props.to - Route path for internal link
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Button component
 */
const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  to,
  disabled = false,
  fullWidth = false,
  onClick,
  ...props
}, ref) => {
  // Combine classes
  const classes = `button button-${variant} button-${size} ${fullWidth ? 'full-width' : ''} ${className}`;
  
  // Animation variants
  const buttonVariants = {
    hover: {
      y: -2,
      boxShadow: `0 0 10px var(--color-${variant === 'primary' ? 'primary' : 'secondary'})`,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: {
      y: 0,
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: 'easeInOut'
      }
    }
  };
  
  // Determine button type based on props
  if (to) {
    return (
      <motion.div
        className="button-wrapper"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Link 
          to={to}
          className={classes}
          ref={ref}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }
  
  if (href) {
    return (
      <motion.div
        className="button-wrapper"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <a 
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {children}
        </a>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="button-wrapper"
      whileHover={!disabled && "hover"}
      whileTap={!disabled && "tap"}
      variants={buttonVariants}
    >
      <button 
        className={classes}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
});

Button.displayName = 'Button';

export default Button;