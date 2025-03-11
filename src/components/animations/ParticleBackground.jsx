import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import '../../styles/components/particleBackground.css';

const ParticleBackground = ({ density = 50, speed = 0.5, reactToMouse = true }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const { darkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Define particle class
  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.baseX = x;
      this.baseY = y;
      this.density = (Math.random() * 30) + 1;
      this.color = color;
      this.distance = 0;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(mouse, width, height, speed) {
      // Check mouse position and particle interaction
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      this.distance = distance;
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density * speed;
      let directionY = forceDirectionY * force * this.density * speed;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }

    // Method to connect particles with lines if they're close enough
    connect(particles, ctx, distance, width, height) {
      for (let i = 0; i < particles.length; i++) {
        let dx = this.x - particles[i].x;
        let dy = this.y - particles[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          // Create gradient based on distance
          const opacity = 1 - distance / 120;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
        }
      }
    }
  }

  // Initialize particles
  const initParticles = (width, height, darkMode) => {
    particlesRef.current = [];
    const particleCount = Math.min(Math.floor((width * height) / 10000) * density, 300);
    const primaryColor = 'rgba(0, 240, 255, 0.7)';
    const secondaryColor = 'rgba(191, 0, 255, 0.7)';
    const tertiaryColor = 'rgba(57, 255, 20, 0.7)';
    
    const colors = [primaryColor, secondaryColor, tertiaryColor];
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particlesRef.current.push(new Particle(x, y, size, color));
    }
  };

  // Animation function
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw each particle
    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      particle.draw(ctx);
      
      if (reactToMouse) {
        particle.update(mouseRef.current, canvas.width, canvas.height, speed);
      }
      
      // Connect particles with lines
      particle.connect(particlesRef.current.slice(i), ctx, 100, canvas.width, canvas.height);
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };

  // Set up canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Set canvas dimensions
    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
    };
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 120
      };
    };
    
    // Handle touch for mobile
    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          radius: 50 // Smaller radius for touch
        };
      }
    };
    
    // Update canvas size when window resizes
    window.addEventListener('resize', updateDimensions);
    
    // Add mouse/touch event listeners if interaction is enabled
    if (reactToMouse) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('touchmove', handleTouch);
      canvas.addEventListener('touchstart', handleTouch);
    }
    
    updateDimensions();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateDimensions);
      
      if (reactToMouse) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchmove', handleTouch);
        canvas.removeEventListener('touchstart', handleTouch);
      }
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [reactToMouse]);

  // Initialize particles and start animation when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles(dimensions.width, dimensions.height, darkMode);
      animate();
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, darkMode, speed, density]);

  return (
    <div ref={containerRef} className="particle-background">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleBackground;