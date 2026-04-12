'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import projectsData from '../data/projects.json';
import CyberTerminal from '../components/CyberTerminal';

export default function CyberpunkPortfolio() {
  const [filter, setFilter] = useState('All');
  
  // Deduplicate on the fly and compute categories
  const { uniqueProjects, categories } = useMemo(() => {
    const seen = new Set();
    const unique = projectsData.filter((repo: any) => {
      const key = repo.fullName.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const cats = new Set<string>();
    cats.add('All');
    unique.forEach((repo: any) => {
        const lang = (repo.language && repo.language !== '-' && repo.language !== 'null') ? repo.language : 'Other';
        cats.add(lang);
    });

    return { uniqueProjects: unique, categories: Array.from(cats).sort() };
  }, []);

  
  
  const displayedProjects = filter === 'All' 
    ? uniqueProjects 
    : uniqueProjects.filter((repo: any) => {
        const lang = (repo.language && repo.language !== '-' && repo.language !== 'null') ? repo.language : 'Other';
        return lang === filter;
      });

  const featured = ['AI-VsCode-extension', 'AI-multi-code-agent', 'CryptoPriceTracker'];
  const ongoing = ['java-employee-management-system', 'blogging-website-s', 'MedicalExperts'];

  const splitProjects = {
    "PRIME_DIRECTIVES [FEATURED]": displayedProjects.filter(p => featured.includes(p.name)),
    "ACTIVE_THREADS [ONGOING]": displayedProjects.filter(p => ongoing.includes(p.name)),
    "DECRYPTED_ARCHIVES [COMPLETED]": displayedProjects.filter(p => !featured.includes(p.name) && !ongoing.includes(p.name))
  };

  return (
    <div className="min-h-screen bg-black font-mono text-green-500 selection:bg-green-500 selection:text-black">
      <CyberTerminal />
      
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDBiIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDIyMDAiPjwvcmVjdD4KPC9zdmc+')] animate-scan" />
      
      {/* Glitching Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      <nav className="fixed top-0 w-full flex justify-between p-6 uppercase text-xs md:text-sm font-bold tracking-widest z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-sm">
        <Link href="/" className="hover:text-white transition-colors animate-pulse text-green-400">{"< SUHAIL IDRISI />"}</Link>
        <span className="text-red-500 animate-bounce">SYS_V.04_ONLINE</span>
      </nav>

      <main className="relative flex flex-col items-center justify-start min-h-screen p-4 md:p-12 border-x-[8px] md:border-x-[16px] border-green-500/10 max-w-7xl mx-auto shadow-[0_0_50px_rgba(34,197,94,0.05)] mt-16 pb-24">
        
        {/* Cyberpunk Hero Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-[12vw] leading-none font-black uppercase tracking-tighter mix-blend-screen relative z-20 hover:skew-x-6 hover:-skew-y-3 transition-transform duration-100 text-center">
              SUHAIL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                IDRISI
              </span>
            </h1>
            
            {/* Glitch layers */}
            <h1 className="absolute top-0 left-[6px] text-[12vw] leading-none font-black uppercase tracking-tighter text-red-500 opacity-60 z-10 blur-[2px] animate-pulse text-center">
              SUHAIL <br/> IDRISI
            </h1>
            <h1 className="absolute -top-[4px] -left-[6px] text-[12vw] leading-none font-black uppercase tracking-tighter text-blue-500 opacity-50 z-0 blur-[1px] text-center">
              SUHAIL <br/> IDRISI
            </h1>
          </motion.div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "anticipate" }}
            className="h-[2px] bg-green-500 my-8 w-full max-w-3xl shadow-[0_0_10px_#22c55e]"
          />
          
          <p className="max-w-2xl text-center text-green-300/70 text-lg sm:text-xl font-light leading-relaxed mb-6 px-4">
            SOFTWARE ENGINEER. ROOT ACCESS GRANTED. EXPLORING DIGITAL FRONTIERS.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 uppercase font-bold text-xs tracking-widest mt-4">
            <a href="https://github.com/suhailult777" target="_blank" rel="noreferrer" className="border border-green-500 px-6 py-3 hover:bg-green-500 hover:text-black transition-all group overflow-hidden relative">
              <span className="relative z-10">GITHUB_NODE</span>
              <span className="absolute inset-0 bg-green-500 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            
            <Link href="/uplinks" className="border border-green-500 px-6 py-3 hover:bg-green-500 hover:text-black transition-all group overflow-hidden relative shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <span className="relative z-10">NEURAL_UPLINKS</span>
              <span className="absolute inset-0 bg-green-500 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>
        </section>

        {/* Filters */}
        <section className="w-full mt-12 mb-12">
          <div className="flex justify-between items-end mb-6 border-b border-green-500/30 pb-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase group flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 inline-block animate-pulse" />
              DATABASE_ARCHIVE
            </h2>
            <div className="text-xs uppercase tracking-widest text-green-400/50">
              COUNT: [{displayedProjects.length}/{uniqueProjects.length}]
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setFilter(cat)}
                className={`border text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 transition-all duration-300 ${
                  filter === cat 
                  ? 'border-green-400 bg-green-500/20 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                  : 'border-green-500/30 text-green-500/60 hover:border-green-500 hover:text-green-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Cyberpunk Grid */}
        <div className="w-full space-y-16">
          {Object.entries(splitProjects).map(([categoryName, projects]) => {
            if (projects.length === 0) return null;
            return (
              <div key={categoryName} className="w-full">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: "2rem" }} 
                    viewport={{ once: true }}
                    className="h-[2px] bg-green-500 shadow-[0_0_8px_#22c55e]"
                  />
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {categoryName}
                  </h3>
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: "100%" }} 
                    viewport={{ once: true }}
                    className="h-[1px] flex-1 bg-green-500/20"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <AnimatePresence mode="popLayout">
                    {projects.map((repo: any) => {
              const lang = (repo.language && repo.language !== '-' && repo.language !== 'null') ? repo.language : 'Other';
              
              return (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4 }}
                  key={repo.fullName}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col justify-between border border-green-500/20 bg-black p-5 overflow-hidden hover:border-green-400 transition-colors h-[300px]"
                >
                  {/* Cyberpunk Decorative Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500" />
                  
                  {/* Scanline hover effect layer */}
                  <div className="absolute inset-0 bg-green-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 z-0 mix-blend-overlay" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* OpenGraph Cyberpunk Fallback or Actual Image */}
                    <div className="relative w-full h-32 border border-green-900/50 mb-4 bg-[#0a0a0a] overflow-hidden group-hover:shadow-[0_0_15px_#22c55e_inset] transition-shadow">
                       <img 
                          src={`https://opengraph.githubassets.com/1/${repo.fullName}`} 
                          alt={repo.name}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity mix-blend-luminosity saturate-0 group-hover:saturate-100 invert group-hover:invert-0"
                       />
                    </div>

                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2 leading-tight break-words truncate" title={repo.name}>
                      {repo.name}
                    </h3>
                    
                    <div className="mt-auto flex justify-between items-center bg-black border border-green-500/20 px-2 py-1">
                      <span className="text-[10px] uppercase text-green-400 tracking-wider">
                        LANG: {lang}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider ${repo.visibility === 'public' ? 'text-blue-400' : 'text-red-400'}`}>
                        {repo.visibility}
                      </span>
                    </div>
                  </div>

                  {/* Datastream Glitch Hover Text */}
                  <div className="absolute bottom-[-20%] right-[-10%] text-6xl font-black text-green-500/5 mix-blend-screen -rotate-12 pointer-events-none group-hover:animate-pulse z-0">
                    {repo.name.replace(/[^a-zA-Z]/g, '').substring(0,4)}
                  </div>
                </motion.a>
              );
            })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
