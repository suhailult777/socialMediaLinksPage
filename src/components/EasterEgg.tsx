'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg() {
  const [keys, setKeys] = useState<string[]>([]);
  const [hacked, setHacked] = useState(false);
  const secret = ['h', 'a', 'c', 'k'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in the terminal input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      setKeys(prev => {
        const newKeys = [...prev, e.key.toLowerCase()].slice(-secret.length);
        if (newKeys.join('') === secret.join('')) {
          setHacked(true);
          setTimeout(() => setHacked(false), 8000); // Revert after 8 seconds
        }
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        ${hacked ? `
          :root {
            color-scheme: dark;
          }
          body {
            /* Force global text color to deep red */
            --tw-text-opacity: 1 !important;
            color: rgb(239 68 68 / var(--tw-text-opacity)) !important; 
          }
          /* Override all green text utility classes */
          .text-green-500, .text-green-400, .bg-green-500, .border-green-500, .selection\\:bg-green-500 ::selection, .selection\\:text-green-500 ::selection {
            color: red !important;
            border-color: red !important;
          }
          .bg-green-500 { background-color: red !important; }
        ` : ''}
      `}} />
      <AnimatePresence>
        {hacked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] pointer-events-none bg-red-900/40 mix-blend-screen flex items-center justify-center flex-col animate-[pulse_0.5s_ease-in-out_infinite]"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAwMGIiPjwvcmVjdD48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSIjNDQwMDAwIj48L3JlY3Q+PC9zdmc+')] opacity-50" />
            <h1 className="relative z-10 text-[8vw] md:text-9xl font-black text-red-500 uppercase tracking-widest text-center shadow-[0_0_50px_rgba(239,68,68,1)]">
              SYSTEM OVERRIDE
            </h1>
            <p className="relative z-10 text-xl md:text-3xl text-white mt-8 tracking-[1em] uppercase bg-red-900/50 px-8 py-2">
              Critical Failure
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
