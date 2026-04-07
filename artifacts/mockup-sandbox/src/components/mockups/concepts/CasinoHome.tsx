import React from "react";
import { ArrowRight, Trophy, History, Settings } from "lucide-react";

export function CasinoHome() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-sans flex flex-col font-['Inter'] selection:bg-[#A32D2D]/30 max-w-md mx-auto relative overflow-hidden pb-20">
      
      {/* Top: Player "Comp Card" */}
      <div className="p-4 pt-8">
        <div className="bg-[#f5f0e8] rounded-xl overflow-hidden shadow-xl border border-[#e8e4d9] flex flex-col relative text-[#1a1a18]">
          {/* Tier Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#A32D2D]"></div>
          
          <div className="p-5 pl-8 flex justify-between items-start">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight uppercase">@JSMITH94</h1>
              <span className="text-[10px] font-bold tracking-widest text-[#D4870A] uppercase mt-1">SURVIVOR ELITE</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-3xl font-mono font-bold text-[#A32D2D] leading-none">4,280</span>
              <span className="text-[10px] font-mono tracking-widest text-[#8a8578] mt-1">PTS</span>
            </div>
          </div>
          
          <div className="h-px bg-[#1a1a18]/10 mx-8"></div>
          
          <div className="px-8 py-3 bg-[#f9f6ef] flex justify-between text-[10px] font-mono font-bold tracking-wider text-[#8a8578]">
            <span>HANDS PLAYED: 47</span>
            <span>WIN RATE: 84%</span>
            <span>STREAK: 3 DAYS</span>
          </div>
        </div>
      </div>

      {/* Center: Game Selection buttons */}
      <div className="px-4 py-6 flex flex-col gap-4 flex-1 justify-center">
        <button className="w-full bg-[#A32D2D] text-[#e8e4d9] py-8 rounded-xl flex flex-col items-center justify-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] border border-[#A32D2D] hover:brightness-110 transition-all transform active:scale-[0.98]">
          <span className="text-2xl font-bold tracking-widest uppercase shadow-black drop-shadow-md">DEAL NEXT HAND</span>
        </button>

        <button className="w-full bg-[#1a1a18] border-2 border-[#D4870A] text-[#e8e4d9] py-5 rounded-xl flex flex-col items-center justify-center shadow-[inset_0_2px_8px_rgba(212,135,10,0.15)] hover:bg-[#D4870A]/5 transition-all transform active:scale-[0.98]">
          <span className="text-[10px] font-bold tracking-widest text-[#D4870A] uppercase mb-1">DAILY HIGH STAKES</span>
          <span className="text-lg font-bold tracking-wider uppercase mb-1">BOSS: DEBORAH M.</span>
          <span className="text-xs font-mono text-[#8a8578]">ENDS IN 06:42:18</span>
        </button>
      </div>

      {/* Bottom: Leaderboard strip */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-end mb-3">
          <h2 className="text-xs font-bold tracking-widest text-[#8a8578] uppercase">HIGH ROLLERS</h2>
          <a href="#" className="text-[10px] font-bold tracking-wider text-[#A32D2D] uppercase flex items-center hover:underline">
            FULL LEADERBOARD <ArrowRight size={12} className="ml-1" />
          </a>
        </div>
        
        <div className="bg-[#1a1a18] border border-[#2e2e2a] rounded-lg overflow-hidden flex flex-col">
          {/* Row 1 */}
          <div className="flex items-center px-4 py-3 border-b border-[#2e2e2a] bg-[#D4870A]/10">
            <span className="font-mono text-lg font-bold text-[#D4870A] w-8">1</span>
            <span className="font-bold text-sm text-[#e8e4d9] flex-1 truncate">@KarenSlayer99</span>
            <span className="font-mono text-sm font-bold text-[#D4870A]">12,450</span>
          </div>
          {/* Row 2 */}
          <div className="flex items-center px-4 py-3 border-b border-[#2e2e2a]">
            <span className="font-mono text-lg font-bold text-[#8a8578] w-8">2</span>
            <span className="font-bold text-sm text-[#e8e4d9] flex-1 truncate">@RetailVet</span>
            <span className="font-mono text-sm font-bold text-[#8a8578]">10,890</span>
          </div>
          {/* Row 3 */}
          <div className="flex items-center px-4 py-3">
            <span className="font-mono text-lg font-bold text-[#8a8578] w-8">3</span>
            <span className="font-bold text-sm text-[#e8e4d9] flex-1 truncate">@jsmith94</span>
            <span className="font-mono text-sm font-bold text-[#8a8578]">4,280</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 inset-x-0 bg-[#1a1a18] border-t border-[#2e2e2a] px-4 py-3">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          <button className="flex flex-col items-center gap-1 text-[#8a8578] hover:text-[#e8e4d9] transition-colors w-20">
            <Trophy size={20} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase mt-1">RANKINGS</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-[#D4870A] w-20">
            <History size={20} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase mt-1">HISTORY</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-[#8a8578] hover:text-[#e8e4d9] transition-colors w-20">
            <Settings size={20} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase mt-1">SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
