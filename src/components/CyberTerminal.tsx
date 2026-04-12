'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{command: string, response: string | React.ReactNode}[]>([
    { command: 'system_init', response: 'Welcome to SYS_V.04. Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = 'Commands: whoami, skills, clear, echo, root, sudo';
        break;
      case 'whoami':
        response = 'Suhail Idrisi - Software Engineer. Exploring the digital frontier.';
        break;
      case 'skills':
        response = 'React, Next.js, Node.js, Frontend Architecture, Cybernetics, Terminal Hacking.';
        break;
      case 'root':
      case 'sudo':
        response = 'ACCESS DENIED. Your IP has been logged.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        if (cmd.startsWith('echo ')) {
          response = input.substring(5);
        } else {
          response = `Command not found: ${cmd}`;
        }
    }

    setHistory([...history, { command: input, response }]);
    setInput('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] border border-green-500 bg-black/80 text-green-400 px-4 py-2 font-mono text-xs tracking-widest uppercase hover:bg-green-500 hover:text-black transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)] backdrop-blur-sm cursor-pointer"
      >
        {isOpen ? '_CLOSE_TERMINAL' : '>_OPEN_TERMINAL'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-[90vw] md:w-[450px] h-[350px] bg-black/95 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)] z-[90] font-mono text-sm flex flex-col backdrop-blur-xl sm:text-xs"
          >
            <div className="flex justify-between items-center border-b border-green-500/30 bg-green-500/10 px-3 py-2">
              <span className="text-green-400 font-bold uppercase text-[10px] tracking-wider">/bin/bash - root@suhail-sys</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-red-500 animate-pulse" />
                <div className="w-2 h-2 bg-yellow-500" />
                <div className="w-2 h-2 bg-green-500" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {history.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-green-500/70">
                    <span className="text-blue-400 mr-2">root@sys:~#</span>{item.command}
                  </div>
                  <div className="text-green-300 pl-2 opacity-90">{item.response}</div>
                </div>
              ))}
              <div ref={bottomRef} className="h-1" />
            </div>

            <form onSubmit={handleCommand} className="flex p-3 border-t border-green-500/30 bg-black/50">
              <span className="text-blue-400 mr-2">root@sys:~#</span>
              <input 
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 outline-none caret-green-500 font-mono w-full"
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
