/**
 * Animation utility functions and configurations
 */

/**
 * Standard animation variants for Framer Motion
 */

// Fade up animation (element fades in from bottom)
export const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  // Fade down animation (element fades in from top)
  export const fadeDownVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  // Fade in animation (simple opacity fade)
  export const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  // Scale up animation (element scales up from smaller size)
  export const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  // Container variant with staggered children
  export const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  // List item variants for use with containerVariant
  export const listItemVariant = {
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
  
  // Page transition variants
  export const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.61, 1, 0.88, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1]
      }
    }
  };
  
  // Slide in from right
  export const slideInRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  // Slide in from left
  export const slideInLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };
  
  /**
   * Animation transition presets
   */
  export const transitions = {
    // Default transition
    default: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.9]
    },
    // Fast transition
    fast: {
      duration: 0.3,
      ease: [0.6, 0.05, -0.01, 0.9]
    },
    // Slow transition
    slow: {
      duration: 0.9,
      ease: [0.6, 0.05, -0.01, 0.9]
    },
    // Bounce transition
    bounce: {
      duration: 0.6,
      ease: [0.16, 1.8, 0.3, 0.85]
    },
    // Spring transition
    spring: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };
  
  /**
   * Custom animation helpers
   */
  
  // Creates a typing animation delay array for staggered text animations
  export const createTypingDelays = (text, baseDelay = 0, charDelay = 0.05) => {
    return Array.from(text).map((_, i) => baseDelay + i * charDelay);
  };
  
  // Creates a staggered animation sequence for a list of elements
  export const createStaggeredAnimations = (elements, animation, staggerDelay = 0.1) => {
    return elements.map((element, index) => ({
      element,
      animation,
      delay: index * staggerDelay
    }));
  };
  
  // Easing functions
  export const easings = {
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeOutBack: [0.34, 1.56, 0.64, 1]
  };