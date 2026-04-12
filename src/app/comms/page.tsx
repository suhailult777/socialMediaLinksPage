'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CommsPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'encrypting' | 'routing' | 'delivered'>('idle');

  const handleSend = () => {
    if (!message) return;
    
    setStatus('encrypting');
    
    setTimeout(() => {
      setStatus('routing');
      
      setTimeout(() => {
        setStatus('delivered');
        
        setTimeout(() => {
          // Open email client with pre-filled subject and body
          const mailtoURL = `mailto:suhailult123@gmail.com?subject=${encodeURIComponent(subject || 'Encrypted Transmission')}&body=${encodeURIComponent(message)}`;
          window.location.href = mailtoURL;
          
          setTimeout(() => {
            setStatus('idle');
            setSubject('');
            setMessage('');
          }, 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen p-4 md:p-12 border-x-[8px] md:border-x-[16px] border-green-500/10 max-w-7xl mx-auto shadow-[0_0_50px_rgba(34,197,94,0.05)] mt-16 pb-24 font-mono">
      
      {/* Glitching Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      <div className="w-full max-w-2xl mx-auto flex justify-start mb-8 relative z-50">
        <Link href="/" className="text-green-500 hover:text-black hover:bg-green-500 uppercase text-xs font-bold tracking-widest border border-green-500/50 px-6 py-3 transition-colors flex items-center gap-2">
          &lt; RETURN_KEY
        </Link>
      </div>

      <div className="relative z-50 flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-center mb-2 mx-auto mix-blend-screen hover:skew-x-6 transition-transform duration-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
            DIRECT COMMS
          </span>
        </h1>
        <p className="text-red-500/60 uppercase tracking-[0.3em] text-xs font-bold mb-12 animate-pulse text-center">
          SECURE CHANNEL ESTABLISHED
        </p>

        <div className="w-full border border-red-500/30 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden group">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500" />

          {status === 'idle' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
              <div className="flex border-b border-red-500/30 pb-2 mb-4 justify-between items-end">
                <span className="text-red-500 text-sm font-bold tracking-widest">TRANSMISSION_PROTOCOL</span>
                <span className="text-red-500/50 text-xs">DEST: suhailult123@gmail.com</span>
              </div>
              
              <div className="group/input relative">
                <label className="text-[10px] text-red-500/70 absolute -top-4 left-0 uppercase">SUBJECT_LINE</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-red-500/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all"
                  placeholder="Enter subject..."
                />
              </div>

              <div className="group/input relative mt-4">
                <label className="text-[10px] text-red-500/70 absolute -top-4 left-0 uppercase">PAYLOAD (BODY)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="w-full bg-black/50 border border-red-500/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all resize-none scrollbar-thin scrollbar-thumb-red-500/50"
                  placeholder="Type encrypted message here..."
                />
              </div>

              <button 
                onClick={handleSend}
                disabled={!message}
                className="mt-6 w-full border border-red-500 text-red-500 font-bold uppercase tracking-widest py-4 hover:bg-red-500 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="relative z-10">SEND_TRANSMISSION</span>
                <div className="absolute inset-0 bg-red-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </button>
            </motion.div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {status === 'encrypting' && (
                  <motion.div key="encrypting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-orange-500">
                    <div className="text-4xl mb-4 animate-spin">🔒</div>
                    <p className="tracking-widest font-bold text-lg animate-pulse">PACKET ENCRYPTING...</p>
                    <p className="text-xs text-orange-500/50 mt-2 font-mono">0x2F84A9B... GENERATING RSA-4096 KEYS</p>
                  </motion.div>
                )}
                {status === 'routing' && (
                  <motion.div key="routing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-blue-500">
                    <div className="text-6xl mb-4 animate-[ping_1s_infinite]">📡</div>
                    <p className="tracking-widest font-bold text-lg animate-pulse">ROUTING THROUGH PROXIES...</p>
                    <p className="text-xs text-blue-500/50 mt-2 font-mono">BOUNCING: TOKYO {'>'} BERLIN {'>'} NODE_XYZ</p>
                  </motion.div>
                )}
                {status === 'delivered' && (
                  <motion.div key="delivered" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-green-500">
                    <div className="text-6xl mb-4">✔️</div>
                    <p className="tracking-widest font-bold text-2xl">DECRYPTED & DELIVERED</p>
                    <p className="text-xs text-green-500/70 mt-2 font-mono">REDIRECTING TO EXTERNAL MAIL CLIENT...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
