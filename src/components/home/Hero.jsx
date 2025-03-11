import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useData } from '../../hooks/useData';
import ParticleBackground from '../animations/ParticleBackground';
import TextAnimation from '../animations/TextAnimation';
import '../../styles/components/hero.css';

const Hero = () => {
  const { data } = useData();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const { hero } = data.homePage;
  
  // Initialize animations
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate hero section elements
    tl.fromTo(
      heroRef.current.querySelector('.hero-background'),
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )
    .fromTo(
      heroRef.current.querySelector('.hero-content'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=1'
    )
    .fromTo(
      heroRef.current.querySelector('.hero-image'),
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      '-=0.6'
    )
    .fromTo(
      heroRef.current.querySelector('.scroll-indicator'),
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );
    
    // Add scroll animation for parallax effect
    gsap.to(heroRef.current.querySelector('.hero-background'), {
      backgroundPositionY: '30%',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Add hover animation for the hero image
    if (imageRef.current) {
      const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        gsap.to(imageRef.current, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 1000,
          duration: 0.5
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5
        });
      };
      
      imageRef.current.addEventListener('mousemove', handleMouseMove);
      imageRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener('mousemove', handleMouseMove);
          imageRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);
  
  return (
    <section className="hero" ref={heroRef}>
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="hero-overlay"></div>
        <ParticleBackground density={30} />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextAnimation text={hero.title} type="typing" />
          </motion.h1>
          
          <motion.h2 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {hero.subtitle}
          </motion.h2>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {hero.description}
          </motion.p>
          
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to={hero.ctaUrl} className="button primary">
              {hero.ctaText}
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="hero-image-wrapper" ref={imageRef}>
            <img 
              src={hero.portraitImage} 
              alt="Portrait" 
              className="hero-image"
            />
            <div className="hero-image-glow"></div>
          </div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator bounce">
        <span>Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;