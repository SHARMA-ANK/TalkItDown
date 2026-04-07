import React from "react";
import { AlertTriangle, Clock, Trophy } from "lucide-react";

export function BossScreen() {
  return (
    <div className="min-h-screen bg-[#1a1a18] text-[#e8e4d9] flex flex-col font-['Inter']">
      <div className="bg-[#D4870A] text-black text-center py-4 px-4 shadow-[0_4px_20px_rgba(212,135,10,0.2)]">
        <h1 className="font-['Space_Mono'] font-bold text-2xl tracking-widest uppercase flex items-center justify-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          TODAY'S BOSS
          <AlertTriangle className="w-6 h-6" />
        </h1>
      </div>

      <div className="flex-1 p-4 flex flex-col pb-8">
        {/* Boss Profile Card */}
        <div className="bg-[#f5f0e8] text-black border-8 border-[#D4870A] p-6 mb-6 mt-4 relative">
          <div className="absolute -top-3 -right-3 bg-black text-[#D4870A] font-['Space_Mono'] font-bold text-xs px-2 py-1 border-2 border-[#D4870A] transform rotate-3">
            LVL 99
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center mb-4 border-4 border-[#D4870A] shadow-[0_0_15px_rgba(212,135,10,0.6)]">
              <span className="font-bold text-5xl text-[#D4870A] font-['Space_Mono']">D</span>
            </div>
            
            <h2 className="font-['Space_Mono'] text-3xl font-bold tracking-tighter uppercase mb-1">
              DEBORAH M.
            </h2>
            <div className="bg-black text-[#e8e4d9] px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">
              REGIONAL MANAGER'S WIFE
            </div>
            
            <div className="text-sm border-t-2 border-dashed border-gray-400 pt-4 font-medium italic text-gray-700">
              "Armed with a coupon from 2019, a Facebook group admin badge, and absolutely nothing to lose."
            </div>
          </div>
        </div>

        {/* Global Stats Strip */}
        <div className="bg-black border border-gray-800 py-3 px-4 mb-6 font-['Space_Mono'] text-xs text-center">
          <div className="text-[#D4870A] mb-1">7,432 PLAYERS ATTEMPTED · 23% SURVIVED</div>
          <div className="text-gray-500 uppercase flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> NEW BOSS IN 06:42:18
          </div>
        </div>

        {/* Mini Leaderboard */}
        <div className="bg-[#2a2a28] rounded mb-8 border border-gray-700 overflow-hidden">
          <div className="bg-black p-2 font-['Space_Mono'] text-[10px] text-gray-400 font-bold tracking-widest flex items-center gap-2">
            <Trophy className="w-3 h-3" /> TOP SURVIVORS
          </div>
          <div className="font-['Space_Mono'] text-xs divide-y divide-gray-800">
            {[
              { rank: 1, name: "@karenslayer99", score: "8,940", time: "0:42", mgr: false },
              { rank: 2, name: "@manager_mike", score: "8,200", time: "0:51", mgr: false },
              { rank: 3, name: "@newhire_tears", score: "7,450", time: "1:04", mgr: true },
              { rank: 4, name: "@retail_king", score: "7,100", time: "1:15", mgr: false },
              { rank: 5, name: "@just_quit", score: "6,900", time: "1:22", mgr: true },
            ].map((row) => (
              <div key={row.rank} className="p-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-4 text-center ${row.rank === 1 ? 'text-yellow-500' : row.rank === 2 ? 'text-gray-300' : row.rank === 3 ? 'text-amber-600' : 'text-gray-600'}`}>
                    #{row.rank}
                  </span>
                  <span className="font-bold truncate max-w-[100px]">{row.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>{row.time}</span>
                  <span className="text-white w-12 text-right">{row.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-auto w-full bg-[#D4870A] text-black py-5 font-['Space_Mono'] font-bold text-xl uppercase tracking-widest shadow-[0_0_15px_rgba(212,135,10,0.3)] hover:bg-[#b57308] active:scale-[0.98] transition-all">
          CHALLENGE BOSS
        </button>
      </div>
    </div>
  );
}
