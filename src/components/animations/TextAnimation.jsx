import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * TextAnimation component for various text animation effects
 * @param {Object} props Component props
 * @param {string} props.text Text to animate
 * @param {string} props.type Animation type: 'typing', 'reveal', 'glitch', or 'highlight'
 * @param {number} props.delay Delay before animation starts (ms)
 * @param {number} props.duration Animation duration (ms)
 * @param {string} props.className Additional CSS classes
 * @returns {JSX.Element} Animated text component
 */
const TextAnimation = ({ 
  text, 
  type = 'typing', 
  delay = 2,
  duration = 2000,
  className = '',
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Typing animation
  if (type === 'typing') {
    return (
      <span
        className={`typing-animation ${className}`}
        ref={containerRef}
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRight: '0.15em solid var(--color-primary)',
          width: isVisible ? '100%' : '0',
          transition: `width ${duration}ms steps(${text.length}, end)`,
          animationDelay: `${delay}ms`,
        }}
      >
        {text}
      </span>
    );
  }
  
  // Character-by-character reveal animation
  if (type === 'reveal') {
    return (
      <span className={`reveal-animation ${className}`} ref={containerRef}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20 
            }}
            transition={{ 
              duration: 0.3, 
              delay: delay / 1000 + index * 0.03, 
              ease: 'easeOut' 
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  }
  
  // Glitch animation
  if (type === 'glitch') {
    return (
      <span 
        className={`glitch-animation ${className}`}
        ref={containerRef}
        data-text={text}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: delay / 1000 }}
          style={{ position: 'relative' }}
        >
          {text}
          <span className="glitch-layer" aria-hidden="true">{text}</span>
          <span className="glitch-layer" aria-hidden="true">{text}</span>
        </motion.span>
      </span>
    );
  }
  
  // Highlight animation
  if (type === 'highlight') {
    return (
      <span 
        className={`highlight-animation ${className}`}
        ref={containerRef}
      >
        <motion.span
          initial={{ backgroundSize: '0% 100%' }}
          animate={{ 
            backgroundSize: isVisible ? '100% 100%' : '0% 100%',
            backgroundPosition: isVisible ? '0% 0%' : '100% 0%'
          }}
          transition={{ 
            duration: duration / 1000, 
            delay: delay / 1000,
            ease: 'easeInOut'
          }}
          style={{
            background: 'linear-gradient(to right, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.2))',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 0%',
            color: 'inherit',
            padding: '0 0.2em',
          }}
        >
          {text}
        </motion.span>
      </span>
    );
  }
  
  // Default fallback
  return <span className={className}>{text}</span>;
};

export default TextAnimation;