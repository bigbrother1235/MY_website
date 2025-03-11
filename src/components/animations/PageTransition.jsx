import { motion } from 'framer-motion';

/**
 * PageTransition component for animated page transitions
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {string} props.className Additional CSS classes
 * @param {Object} props.variants Custom animation variants
 * @returns {JSX.Element} Page transition wrapper
 */
const PageTransition = ({ 
  children, 
  className = '', 
  variants = defaultPageVariants 
}) => {
  return (
    <motion.div
      className={`page-transition ${className}`}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Default transition animation variants
const defaultPageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.61, 1, 0.88, 1],
    }
  }
};

// Export additional animation variants that can be used
export const slidePageVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1],
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: [0.61, 1, 0.88, 1],
    }
  }
};

export const fadePageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    }
  }
};

export const scalePageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    }
  }
};

export default PageTransition;