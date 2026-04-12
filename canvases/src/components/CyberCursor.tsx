'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === 'a' || 
        target.tagName?.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          body * { cursor: none !important; }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30, mass: 1 }}
      >
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-green-400 shadow-[0_0_8px_#4ade80] -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-green-400 shadow-[0_0_8px_#4ade80] -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-red-500 rounded-full shadow-[0_0_8px_#ef4444] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
