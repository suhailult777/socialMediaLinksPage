'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootSequence() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const bootText = [
    "BIOS Date 04/05/26 13:33:37 Ver 09.00.04",
    "CPU: Neural-Net Processor, Speed: 4.2 GHz",
    "Memory Test: 64000K OK",
    "Initializing... OK",
    "Loading Cyber_Engine.sys... DONE",
    "Loading matrix_protocol.dll... DONE",
    "Establishing secure connection...",
    "ACCESS GRANTED."
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (!hasBooted) {
      setShow(true);
      
      // Reveal text lines one by one
      const interval = setInterval(() => {
        setVisibleLines(prev => {
          if (prev < bootText.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 300);

      // Unmount after 3.5 seconds
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('hasBooted', 'true');
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono p-8 overflow-hidden pointer-events-none flex flex-col justify-start"
        >
          {/* CRT Overlay inside Boot Sequence */}
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDBiIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDIyMDAiPjwvcmVjdD4KPC9zdmc+')] animate-scan pointer-events-none" />
          
          <div className="relative z-10 text-sm md:text-base space-y-2">
            <div className="mb-6 flex gap-4">
              <div className="w-16 h-16 border-2 border-green-500 flex items-center justify-center font-bold text-2xl animate-pulse">
                SYS
              </div>
              <div>
                <p className="font-bold text-xl">SUHAIL_OS(tm) SYSTEM BOOT</p>
                <p>Copyright (C) 2026, Suhail Idrisi Core</p>
              </div>
            </div>
            
            {bootText.slice(0, visibleLines).map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="tracking-widest"
              >
                {line}
              </motion.div>
            ))}
            
            {visibleLines < bootText.length && (
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-5 bg-green-500 inline-block align-middle ml-2"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
