import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useInViewport } from '../../hooks/useScrollPosition';
import '../../styles/components/card.css';

/**
 * Card component for displaying content in a visually appealing container
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Whether card has hover effects
 * @param {boolean} props.interactive - Whether card has 3D tilt effect
 * @param {boolean} props.animated - Whether card animates on scroll
 * @param {string} props.variant - Card variant: 'default', 'elevated', 'outlined'
 * @returns {JSX.Element} Card component
 */
const Card = ({
  children,
  className = '',
  hoverable = true,
  interactive = false,
  animated = true,
  variant = 'default',
  ...props
}) => {
  const cardRef = useRef(null);
  const isInViewport = useInViewport(cardRef, { threshold: 0.1, once: true });
  
  // Add 3D tilt effect for interactive cards
  useEffect(() => {
    if (!interactive || !cardRef.current) return;
    
    const card = cardRef.current;
    
    // Variables for the tilt effect
    let bounds;
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      bounds = card.getBoundingClientRect();
      mouseX = e.clientX - bounds.left - bounds.width / 2;
      mouseY = e.clientY - bounds.top - bounds.height / 2;
      
      const rotateX = (mouseY / bounds.height) * 5;
      const rotateY = (mouseX / bounds.width) * -5;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Glow effect based on mouse position
      const glowX = (mouseX / bounds.width) * 100 + 50;
      const glowY = (mouseY / bounds.height) * 100 + 50;
      
      gsap.to(card.querySelector('.card-glow'), {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 240, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)`,
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
      
      gsap.to(card.querySelector('.card-glow'), {
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
  }, [interactive]);
  
  // Combine classes
  const classes = `card card-${variant} ${hoverable ? 'hoverable' : ''} ${interactive ? 'interactive' : ''} ${className}`;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <motion.div
      className={classes}
      ref={cardRef}
      initial={animated ? "hidden" : false}
      animate={animated && isInViewport ? "visible" : false}
      variants={cardVariants}
      {...props}
    >
      {interactive && <div className="card-glow"></div>}
      <div className="card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;