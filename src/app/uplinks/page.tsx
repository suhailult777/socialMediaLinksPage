import HackerHeatmap from "@/components/HackerHeatmap";
import LeetCodeMetrics from "@/components/LeetCodeMetrics";
import Link from "next/link";

export default function UplinksPage() {
  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen p-4 md:p-12 border-x-[8px] md:border-x-[16px] border-green-500/10 max-w-7xl mx-auto shadow-[0_0_50px_rgba(34,197,94,0.05)] mt-16 pb-24">
      
      {/* Glitching Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      <div className="w-full max-w-4xl mx-auto flex justify-start mb-8 relative z-50">
        <Link href="/" className="text-green-500 hover:text-black hover:bg-green-500 uppercase text-xs font-bold tracking-widest border border-green-500/50 px-6 py-3 transition-colors flex items-center gap-2">
          &lt; RETURN_KEY
        </Link>
      </div>
      
      <div className="relative z-50 flex flex-col items-center w-full">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-center mb-2 mx-auto mix-blend-screen hover:skew-x-6 transition-transform duration-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">
            NEURAL UPLINKS
          </span>
        </h1>
        <p className="text-green-500/50 uppercase tracking-[0.3em] text-xs font-bold mb-12 animate-pulse text-center">
          SYSTEM TELEMETRICS ONLINE
        </p>

        <HackerHeatmap />
        <LeetCodeMetrics />
        
      </div>
    </main>
  );
}
