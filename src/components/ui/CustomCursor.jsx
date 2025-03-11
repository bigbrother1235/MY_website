import { useState, useEffect, useRef } from 'react';
import '../../styles/components/customCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device (don't show custom cursor on touch devices)
    const checkTouchDevice = () => {
      return ('ontouchstart' in window) || 
             (navigator.maxTouchPoints > 0) || 
             (navigator.msMaxTouchPoints > 0);
    };
    
    setIsTouchDevice(checkTouchDevice());
    
    if (!checkTouchDevice()) {
      // Add custom-cursor class to body
      document.body.classList.add('custom-cursor');
      setIsVisible(true);
    }
    
    const handleMouseMove = (e) => {
      if (cursorRef.current && cursorOuterRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        // Add slight delay for trailing effect
        setTimeout(() => {
          if (cursorOuterRef.current) {
            cursorOuterRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
        }, 100);
      }
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .hoverable')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .hoverable')) {
        setIsHovering(false);
      }
    };
    
    // Add all event listeners
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handleMouseOver, true);
      document.addEventListener('mouseout', handleMouseOut, true);
    }
    
    // Cleanup function to remove event listeners
    return () => {
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [isTouchDevice]);

  // Don't render the cursor on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      <div 
        ref={cursorOuterRef} 
        className={`cursor-outer ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
};

export default CustomCursor;