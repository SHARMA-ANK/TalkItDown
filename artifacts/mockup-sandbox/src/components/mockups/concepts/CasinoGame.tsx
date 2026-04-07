import React from "react";
import { Mic, ShieldAlert } from "lucide-react";

export function CasinoGame() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] font-sans flex flex-col max-w-md mx-auto relative perspective-1000">
      
      {/* Status bar */}
      <div className="bg-[#1a1a18] border-b border-[#2e2e2a] px-4 py-3 flex justify-between items-center z-10 shadow-sm">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#8a8578]">TABLE: McDONALD'S DRIVE-THRU</span>
        <span className="text-xs font-mono font-bold tracking-wider text-[#e8e4d9] border border-[#2e2e2a] px-2 py-1 rounded bg-[#1a1a18]">HAND #47</span>
        <span className="text-xs font-mono font-bold text-[#8a8578]">02:14</span>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-6 items-center justify-center relative">
        
        {/* Top controls / badge */}
        <div className="w-full flex justify-between items-start absolute top-4 inset-x-4">
           <button className="bg-[#1a1a18] border border-[#D4870A] rounded-full w-10 h-10 flex items-center justify-center relative overflow-hidden group shadow-lg">
            <span className="text-[9px] font-bold text-[#D4870A] tracking-tighter">MGR</span>
            <div className="absolute -top-1 -right-1 bg-[#D4870A] text-[#1a1a18] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1×</div>
          </button>
        </div>

        {/* Customer "Hand" Card */}
        <div 
          className="w-full max-w-[320px] bg-[#f5f0e8] text-[#1a1a18] rounded-xl shadow-2xl border border-[#e8e4d9] p-6 flex flex-col items-center text-center mt-8 transition-transform duration-500 ease-out"
          style={{ transform: "perspective(800px) rotateX(5deg) translateY(-10px)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.5)" }}
        >
          <span className="text-[10px] font-bold text-[#A32D2D] tracking-widest uppercase mb-4 w-full text-left">OPPONENT</span>
          
          <div className="w-20 h-20 rounded-full bg-[#1a1a18] text-[#f9f6ef] flex items-center justify-center text-4xl font-serif font-bold border-4 border-[#D4870A] shadow-inner mb-4">
            B
          </div>
          
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">Brenda K.</h2>
          <span className="text-[10px] text-[#8a8578] font-mono tracking-wider uppercase mb-6">HOA President / Coupon Collector</span>

          <div className="w-full border-2 border-[#1a1a18] p-4 bg-[#f9f6ef] relative shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f5f0e8] px-2 text-[10px] font-bold text-[#1a1a18] uppercase tracking-widest border-x border-[#1a1a18]">REVEAL</div>
            <p className="font-mono text-lg leading-snug text-[#1a1a18] font-bold uppercase">
              "I HAVE SHOPPED HERE FOR THIRTY YEARS!!"
            </p>
          </div>
        </div>

        {/* House Odds Panel */}
        <div className="w-full max-w-[320px] bg-[#1a1a18] border border-[#2e2e2a] p-3 rounded-lg flex flex-col gap-2 mt-4 shadow-xl">
          <div className="flex justify-between text-[9px] font-bold tracking-widest uppercase">
            <span className="text-[#2D7A3A]">PLAYER ODDS</span>
            <span className="text-[#A32D2D]">HOUSE WINS</span>
          </div>
          
          <div className="h-2 bg-[#2e2e2a] rounded-full relative overflow-hidden flex items-center">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2D7A3A] via-[#D4870A] to-[#A32D2D] w-[67%]"></div>
            {/* Dealer marker */}
            <div className="absolute top-0 bottom-0 left-[67%] w-1 bg-[#e8e4d9] shadow-[0_0_4px_rgba(255,255,255,0.8)] z-10"></div>
          </div>
          <div className="text-center text-[10px] font-mono text-[#D4870A] font-bold tracking-wider mt-1">
            RAGE ODDS: 67% AGAINST YOU
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="bg-[#1a1a18] px-4 pb-8 pt-4 flex flex-col items-center gap-5 z-10 relative">
        <div className="text-[10px] font-mono tracking-widest text-[#8a8578] uppercase mb-2">
          CURRENT BET: <span className="text-[#e8e4d9] font-bold">340 PTS AT RISK</span>
        </div>

        <button className="w-24 h-24 rounded-full bg-[#1a1a18] border-4 border-[#A32D2D] flex flex-col items-center justify-center gap-1 relative group hover:bg-[#A32D2D]/10 transition-colors shadow-[0_0_15px_rgba(163,45,45,0.3)]">
          <Mic size={28} className="text-[#e8e4d9] mb-1" />
          <span className="text-[8px] font-bold tracking-widest text-[#e8e4d9] uppercase leading-none">PLAY YOUR</span>
          <span className="text-[8px] font-bold tracking-widest text-[#e8e4d9] uppercase leading-none">HAND</span>
          
          {/* Waveforms */}
          <div className="absolute -bottom-1 flex gap-0.5 items-end h-3">
            <div className="w-1 bg-[#A32D2D] h-1 rounded-full"></div>
            <div className="w-1 bg-[#A32D2D] h-3 rounded-full"></div>
            <div className="w-1 bg-[#A32D2D] h-2 rounded-full"></div>
            <div className="w-1 bg-[#A32D2D] h-4 rounded-full"></div>
            <div className="w-1 bg-[#A32D2D] h-2 rounded-full"></div>
          </div>
        </button>

        <button className="w-full max-w-[320px] bg-transparent border border-[#D4870A] text-[#D4870A] py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D4870A]/10 transition-colors mt-2">
          <ShieldAlert size={14} />
          <span className="text-[10px] font-bold tracking-widest uppercase">CALL FLOOR MANAGER — 1 USE</span>
        </button>
      </div>

    </div>
  );
}
