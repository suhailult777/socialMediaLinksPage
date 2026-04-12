'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add hover listeners to all interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, select, textarea';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-green-500 pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 20 }}
      >
        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-[-4px] w-2 h-[2px] bg-green-500 -translate-y-1/2" />
        <div className="absolute top-1/2 right-[-4px] w-2 h-[2px] bg-green-500 -translate-y-1/2" />
        <div className="absolute left-1/2 top-[-4px] w-[2px] h-2 bg-green-500 -translate-x-1/2" />
        <div className="absolute left-1/2 bottom-[-4px] w-[2px] h-2 bg-green-500 -translate-x-1/2" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[101]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 10, mass: 1 }}
      />
    </>
  );
}
