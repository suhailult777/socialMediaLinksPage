'use client';
import { useState, useEffect, useRef } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';

export default function DecodeText({ text, className = '', speed = 50 }: { text: string, className?: string, speed?: number }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, 'X'));
  const [isHovered, setIsHovered] = useState(false);
  const isInitialRender = useRef(true);

  const decode = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            // Preserve spaces
            if (text[index] === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      decode();
      // Only do the initial decode once
      isInitialRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (isHovered && !isInitialRender.current) {
      decode();
    }
  }, [isHovered]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
