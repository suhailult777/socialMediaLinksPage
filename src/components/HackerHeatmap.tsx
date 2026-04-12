'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HackerHeatmap() {
  const [grid, setGrid] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch actual GitHub contribution levels
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        
        if (data.levels && data.levels.length > 0) {
          // GitHub returns roughly 371 days (up to 53 weeks)
          setGrid(data.levels);
        } else {
          // Fallback if scraping fails (for safety)
          fallbackGrid();
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
        fallbackGrid();
      } finally {
        setLoading(false);
      }
    };

    const fallbackGrid = () => {
      const newGrid = Array.from({ length: 364 }, () => {
        const r = Math.random();
        if (r < 0.5) return 0;
        if (r < 0.75) return 1;
        if (r < 0.9) return 2;
        if (r < 0.97) return 3;
        return 4;
      });
      setGrid(newGrid);
    };

    fetchGitHubData();
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-900/50 border border-green-900/20'; // no commits
      case 1: return 'bg-green-950 border border-green-800/40';   // light
      case 2: return 'bg-green-800 border border-green-600/60 shadow-[0_0_5px_rgba(22,163,74,0.3)]'; // medium
      case 3: return 'bg-green-600 border border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]';   // high
      case 4: return 'bg-green-400 border border-green-300 shadow-[0_0_12px_rgba(74,222,128,0.8)]'; // core
      default: return 'bg-gray-900/50 border border-green-900/20';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 border border-green-500/30 bg-black/60 backdrop-blur-md p-6 font-mono text-green-500 rounded-sm relative overflow-hidden group">
      
      {/* Background ambient glow effect on hover */}
      <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-green-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
            Neural Uplinks
          </h2>
          <p className="text-green-500/70 text-sm">System activity logs & core proficiencies</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col md:items-end">
          <p className="text-xs uppercase text-green-500/50 mb-2 invisible md:visible">Current Skill Arsenal</p>
          <div className="flex flex-wrap gap-2">
             <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,ts,nodejs,git,figma&theme=dark" alt="Frontend Skills" className="h-10 opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-transparent">
        <div className="min-w-[800px]">
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {!loading ? grid.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: (i % 52) * 0.02 + (i % 7) * 0.05
                }}
                whileHover={{ 
                  scale: 1.5, 
                  zIndex: 10,
                  transition: { duration: 0.1 }
                }}
                className={`w-[11px] h-[11px] rounded-[1px] ${getColor(level)} transition-colors duration-300`}
                title={`${level} interactions`}
              />
            )) : (
              // Loading skeleton
              Array.from({ length: 364 }).map((_, i) => (
                <div key={i} className="w-[11px] h-[11px] rounded-[1px] bg-green-900/10 animate-pulse" />
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-green-500/60 uppercase">
        <span>Targeting Subsystems</span>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className={`w-[11px] h-[11px] rounded-[1px] ${getColor(0)}`} />
            <div className={`w-[11px] h-[11px] rounded-[1px] ${getColor(1)}`} />
            <div className={`w-[11px] h-[11px] rounded-[1px] ${getColor(2)}`} />
            <div className={`w-[11px] h-[11px] rounded-[1px] ${getColor(3)}`} />
            <div className={`w-[11px] h-[11px] rounded-[1px] ${getColor(4)}`} />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
