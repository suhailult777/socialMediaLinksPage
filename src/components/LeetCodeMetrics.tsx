'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LeetCodeMetrics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const res = await fetch('/api/leetcode');
        const json = await res.json();
        if (json.data && json.data.matchedUser) {
          setStats(json.data.matchedUser);
        }
      } catch (error) {
        console.error('Failed to fetch LeetCode data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeetCode();
  }, []);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
      case 'Medium': return 'text-yellow-400 border-yellow-500/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]';
      case 'Hard': return 'text-red-500 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      default: return 'text-green-500 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-green-500/30 bg-black/60 backdrop-blur-md p-6 font-mono text-green-500 rounded-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-green-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
            Algorithmic Core
          </h2>
          <p className="text-green-500/70 text-sm">LeetCode problem-solving telemetrics</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:items-end uppercase">
          <p className="text-xs text-green-500/50 mb-1">Global Rank</p>
          <p className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {loading ? 'CALCULATING...' : (stats?.profile?.ranking?.toLocaleString() || 'UNRANKED')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-green-900/10 animate-pulse border border-green-900/30 rounded-sm" />
             ))
        ) : (
          stats?.submitStats?.acSubmissionNum?.map((item: any, i: number) => (
            <motion.div
              key={item.difficulty}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 border bg-black/40 flex flex-col justify-center items-center rounded-sm hover:-translate-y-1 transition-transform ${getDifficultyColor(item.difficulty)}`}
            >
              <p className="text-xs uppercase opacity-70 mb-2">{item.difficulty === 'All' ? 'Total Solved' : item.difficulty}</p>
              <p className="text-3xl md:text-4xl font-black">{item.count}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
