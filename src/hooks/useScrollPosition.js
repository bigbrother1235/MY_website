import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param {boolean} throttle Whether to throttle the scroll event
 * @returns {Object} Scroll position with x and y coordinates
 */
export const useScrollPosition = (throttle = true) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
      };

      if (throttle) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollPosition(position);
            setTicking(false);
          });
          setTicking(true);
        }
      } else {
        setScrollPosition(position);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Get initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttle]);

  return scrollPosition;
};

/**
 * Custom hook to detect if an element is in viewport
 * @param {React.RefObject} elementRef Reference to the element to track
 * @param {Object} options Configuration options
 * @param {number} options.threshold Percentage of element that needs to be visible (0-1)
 * @param {boolean} options.once Whether to stop tracking once element is visible
 * @returns {boolean} Whether the element is in viewport
 */
export const useInViewport = (elementRef, { threshold = 0.1, once = false } = {}) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInViewport(isVisible);

        if (isVisible && once && element) {
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, once]);

  return isInViewport;
};