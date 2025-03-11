import { useEffect } from 'react';
import gsap from 'gsap';
import { useScrollPosition } from './useScrollPosition';

/**
 * Custom hook for managing text typing animation
 * @param {Object} options Configuration options
 * @param {string} options.text Text to animate
 * @param {HTMLElement} options.element DOM element to animate
 * @param {number} options.speed Typing speed in ms per character
 * @param {number} options.delay Initial delay before animation starts
 * @param {Function} options.onComplete Callback function when animation completes
 * @returns {Object} Animation controls
 */
export const useTypingAnimation = ({ 
  text, 
  element, 
  speed = 50, 
  delay = 0, 
  onComplete 
}) => {
  useEffect(() => {
    if (!element || !text) return;
    
    let currentIndex = 0;
    let timeoutId;
    
    // Clear element initially
    element.textContent = '';
    
    // Add delay before starting
    const startTimeout = setTimeout(() => {
      // Animation function
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          element.textContent += text[currentIndex];
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }
      };
      
      // Start typing
      typeNextChar();
      
    }, delay);
    
    // Cleanup function
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, element, speed, delay, onComplete]);
  
  return {
    // Could add reset or other controls here
  };
};

/**
 * Custom hook for creating parallax scroll effects
 * @param {Object} options Configuration options
 * @param {React.RefObject} options.elementRef Reference to the element to animate
 * @param {number} options.speed Parallax speed factor
 * @param {boolean} options.reverse Reverse the direction of parallax
 * @returns {void}
 */
export const useParallaxScroll = ({ 
  elementRef, 
  speed = 0.2, 
  reverse = false 
}) => {
  const { y: scrollY } = useScrollPosition();
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const directionFactor = reverse ? -1 : 1;
    const parallaxEffect = scrollY * speed * directionFactor;
    
    // Apply parallax transform
    gsap.to(elementRef.current, {
      y: parallaxEffect,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [scrollY, elementRef, speed, reverse]);
};

/**
 * Custom hook for creating tilt effect on hover
 * @param {Object} options Configuration options
 * @param {React.RefObject} options.elementRef Reference to the element to animate
 * @param {number} options.max Maximum tilt in degrees
 * @param {number} options.perspective Perspective value for 3D effect
 * @param {number} options.scale Scale factor on hover
 * @param {number} options.duration Animation duration in seconds
 * @returns {void}
 */
export const useTiltEffect = ({
  elementRef,
  max = 10,
  perspective = 1000,
  scale = 1.05,
  duration = 0.4
}) => {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    const handleMouseMove = (e) => {
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (bounds.height / 2)) * -max;
      const rotateY = (mouseX / (bounds.width / 2)) * max;
      
      gsap.to(element, {
        rotateX,
        rotateY,
        transformPerspective: perspective,
        scale,
        duration,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration,
        ease: 'power2.out'
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, max, perspective, scale, duration]);
};

/**
 * Custom hook for animating counter from zero to target number
 * @param {Object} options Configuration options
 * @param {number} options.target Target number to count to
 * @param {React.RefObject} options.elementRef Reference to the element to update
 * @param {number} options.duration Animation duration in seconds
 * @param {number} options.delay Delay before animation starts in seconds
 * @param {boolean} options.startOnInView Whether to start counter when element is in viewport
 * @returns {void}
 */
export const useCounterAnimation = ({
  target,
  elementRef,
  duration = 2,
  delay = 0,
  startOnInView = true
}) => {
  const { y: scrollY } = useScrollPosition();
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    const startAnimation = () => {
      const startValue = 0;
      const incrementValue = (val) => Math.round(val);
      
      gsap.fromTo(
        { value: startValue },
        {
          value: target,
          duration,
          delay,
          ease: 'power2.out',
          onUpdate: function() {
            if (element) {
              element.textContent = incrementValue(this.targets()[0].value);
            }
          }
        }
      );
    };
    
    if (startOnInView) {
      const checkIfInView = () => {
        const bounds = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (bounds.top < windowHeight * 0.8 && bounds.bottom > 0) {
          startAnimation();
          window.removeEventListener('scroll', checkIfInView);
        }
      };
      
      checkIfInView();
      window.addEventListener('scroll', checkIfInView);
      
      return () => {
        window.removeEventListener('scroll', checkIfInView);
      };
    } else {
      startAnimation();
    }
  }, [target, elementRef, duration, delay, startOnInView, scrollY]);
};